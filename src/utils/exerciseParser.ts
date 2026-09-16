import { Lesson, LessonUploadedExercise } from '../types';
import { DEFAULT_ADMIN_NAME } from './storage';

export interface ParsedExerciseGroup {
  stageName?: string;
  exercises: LessonUploadedExercise[];
}

/**
 * Intelligent parser that converts raw pasted text (from Word, PDF, or textbooks)
 * into classified, interactive digital exercises for mobile and desktop.
 */
export function parseExerciseText(rawText: string, lesson: Lesson): LessonUploadedExercise[] {
  if (!rawText || !rawText.trim()) return [];

  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  const results: LessonUploadedExercise[] = [];

  let currentStage = '';
  let currentQuestionText = '';
  let currentOptions: string[] = [];
  let currentCorrectAnswer: number | undefined = undefined;
  let currentCorrectAnswers: number[] = [];
  let currentExplanation = '';
  let currentType: 'choice' | 'situation' | 'essay' | 'true_false' | 'multiselect' = 'choice';
  let isCollectingSituation = false;

  const flushCurrent = () => {
    if (!currentQuestionText.trim()) return;

    // Determine final type if not explicitly set
    let finalType = currentType;
    if (currentOptions.length >= 2) {
      if (finalType !== 'multiselect' && finalType !== 'true_false') {
        finalType = 'choice';
      }
    } else if (finalType === 'choice') {
      finalType = currentQuestionText.toLowerCase().includes('tình huống') ? 'situation' : 'essay';
    }

    results.push({
      id: `custom-${lesson.id}-${Date.now()}-${results.length + 1}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      stageName: currentStage || undefined,
      type: finalType,
      question: currentQuestionText.trim(),
      options: currentOptions.length > 0 ? currentOptions : undefined,
      correctAnswer: finalType === 'choice' || finalType === 'true_false' ? (currentCorrectAnswer ?? 0) : undefined,
      correctAnswers: finalType === 'multiselect' ? (currentCorrectAnswers.length > 0 ? currentCorrectAnswers : undefined) : undefined,
      explanation: currentExplanation.trim() || 'Đáp án và hướng dẫn chuẩn theo chương trình GDCD 6.',
      createdAt: new Date().toISOString().slice(0, 10),
      uploadedBy: DEFAULT_ADMIN_NAME
    });

    // Reset accumulator
    currentQuestionText = '';
    currentOptions = [];
    currentCorrectAnswer = undefined;
    currentCorrectAnswers = [];
    currentExplanation = '';
    currentType = 'choice';
    isCollectingSituation = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 1. Detect Stage / Part / Header: e.g., "🌱 CHẶNG 1 — EM NHẬN RA", "PHẦN I: TRẮC NGHIỆM"
    const stageMatch = line.match(/^(?:(?:🌱|🌿|⭐|🏆|🔍|📌)?\s*(?:CHẶNG|Chặng|Phần|PHẦN|BÀI TẬP)\s*\d+[\s:—–-].*)/i);
    if (stageMatch) {
      flushCurrent();
      currentStage = line.replace(/^[🌱🌿⭐🏆🔍📌\s]+/, '').trim();
      continue;
    }

    // 2. Detect Question start: "Câu 1:", "Câu 1.", "Câu 1 -", "1.", "1/"
    const questionMatch = line.match(/^(?:Câu\s*\d+[\s.:–-]|câu\s*\d+[\s.:–-]|\d+[\s.)/:])\s*(.*)/i);

    // 3. Detect standard ABCD options: "A.", "A)", "A:", "a."
    const abcdMatch = line.match(/^([A-Da-d])[\s.):-]\s*(.*)/);

    // 4. Detect checkbox options: "☐", "[ ]", "☑", "[x]", "- [ ]", "•", "*", "✓", "✔"
    const checkboxMatch = line.match(/^(?:[☐☑✔✓]|\([xX ]\)|\[[xX ]?\]|[-•*]\s*\[[xX ]?\])\s*(.*)/);

    // 5. Detect Answer declarations: "Đáp án:", "Đ/A:", "Key:"
    const answerMatch = line.match(/^(?:Đáp án|Đ\/A|ĐA|Hướng dẫn đáp án|Key|Kết quả)[\s.:]*(.*)/i);

    // 6. Detect Explanation: "Giải thích:", "Lời giải:", "Ghi chú:"
    const explainMatch = line.match(/^(?:Giải thích|Lời giải|Ghi chú|Nhận xét)[\s.:]*(.*)/i);

    if (questionMatch) {
      flushCurrent();
      currentQuestionText = line;
      // Heuristic check if question mentions checkbox / multiselect
      const lower = line.toLowerCase();
      if (lower.includes('đánh dấu') || lower.includes('chọn những') || lower.includes('các truyền thống') || lower.includes('những việc')) {
        currentType = 'multiselect';
      } else if (lower.includes('đúng / sai') || lower.includes('đúng hay sai') || lower.includes('(đ/s)')) {
        currentType = 'true_false';
      } else if (lower.includes('tình huống')) {
        currentType = 'situation';
        isCollectingSituation = true;
      }
    } else if (abcdMatch) {
      // Standard Multiple Choice
      currentType = 'choice';
      const letter = abcdMatch[1].toUpperCase();
      const content = abcdMatch[2].trim();
      currentOptions.push(`${letter}. ${content}`);
    } else if (checkboxMatch) {
      // Checkbox multi-select item
      currentType = 'multiselect';
      const optText = checkboxMatch[1].trim();
      if (optText) {
        const optionIndex = currentOptions.length;
        currentOptions.push(optText);

        // If line had checked mark like ☑ or [x] or ✓, mark as correct
        if (/^[☑✔✓]|\[[xX]\]/.test(line)) {
          currentCorrectAnswers.push(optionIndex);
        }
      }
    } else if (answerMatch) {
      const ansVal = answerMatch[1].trim();
      if (currentType === 'multiselect') {
        // Parse answers like "Hiếu học, Cần cù" or "1, 2, 3" or "A, B, C"
        currentOptions.forEach((opt, idx) => {
          const cleanOpt = opt.toLowerCase().replace(/^[a-d\d][\s.):-]/, '').trim();
          if (ansVal.toLowerCase().includes(cleanOpt) || ansVal.includes(`${idx + 1}`)) {
            if (!currentCorrectAnswers.includes(idx)) {
              currentCorrectAnswers.push(idx);
            }
          }
        });
      } else {
        // Choice: A, B, C, D
        const letter = ansVal.toUpperCase().match(/[A-D]/);
        if (letter) {
          const map: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
          currentCorrectAnswer = map[letter[0]];
        }
      }
    } else if (explainMatch) {
      currentExplanation = explainMatch[1].trim();
    } else {
      // Continuation line
      if (currentOptions.length > 0) {
        currentOptions[currentOptions.length - 1] += ' ' + line;
      } else if (currentQuestionText) {
        currentQuestionText += '\n' + line;
      } else {
        // Start as new question if none active
        currentQuestionText = line;
      }
    }
  }

  flushCurrent();
  return results;
}
