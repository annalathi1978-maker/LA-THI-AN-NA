import React, { useState, useRef } from 'react';
import { Lesson, LessonUploadedExercise } from '../types';
import { 
  PlusCircle, Upload, FileText, Trash2, CheckCircle2, AlertCircle, 
  HelpCircle, Eye, EyeOff, BookOpen, Sparkles, Download, Search, 
  Filter, Check, X, ArrowRight, Printer, RefreshCw
} from 'lucide-react';
import { 
  addLessonUploadedExercise, 
  batchAddLessonUploadedExercises, 
  deleteLessonUploadedExercise, 
  deleteLessonExercisesByLesson,
  downloadExerciseSampleTxt,
  DEFAULT_ADMIN_NAME
} from '../utils/storage';
import { parseExerciseText } from '../utils/exerciseParser';
import { playClickSound, playCorrectSound } from '../utils/audio';

interface LessonExerciseManagerProps {
  lessons: Lesson[];
  customExercises: LessonUploadedExercise[];
  onRefreshCustomExercises: () => void;
  onOpenHomework?: () => void;
}

export default function LessonExerciseManager({
  lessons,
  customExercises,
  onRefreshCustomExercises,
  onOpenHomework
}: LessonExerciseManagerProps) {
  // Active lesson selected for uploading or managing
  const [selectedLessonForUpload, setSelectedLessonForUpload] = useState<Lesson | null>(null);
  const [selectedLessonForView, setSelectedLessonForView] = useState<Lesson | null>(null);
  
  // Upload Mode: 'smart_paste' | 'form' | 'file'
  const [uploadMode, setUploadMode] = useState<'smart_paste' | 'form' | 'file'>('smart_paste');
  
  // Smart paste state
  const [pastedContent, setPastedContent] = useState('');
  const [parsedPreview, setParsedPreview] = useState<LessonUploadedExercise[]>([]);
  const [parseError, setParseError] = useState('');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');

  // Manual Form State
  const [manualQuestion, setManualQuestion] = useState('');
  const [manualType, setManualType] = useState<'choice' | 'situation' | 'essay'>('choice');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOptIndex, setCorrectOptIndex] = useState<number>(0);
  const [explanation, setExplanation] = useState('');
  const [teacherNote, setTeacherNote] = useState('');

  // File upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search filter inside 12 boxes
  const [searchQuery, setSearchQuery] = useState('');

  // Smart Parser for pasting questions from Word / Text
  const parsePastedQuestions = (text: string, lesson: Lesson): LessonUploadedExercise[] => {
    if (!text.trim()) return [];

    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const results: LessonUploadedExercise[] = [];

    let currentQuestion: Partial<LessonUploadedExercise> | null = null;
    let currentOptions: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Detect Question starts like: "Câu 1:", "Câu 1.", "1.", "1/ "
      const questionMatch = line.match(/^(?:Câu\s*\d+[\s.:]|câu\s*\d+[\s.:]|\d+[\s.)/:])\s*(.*)/i);
      
      // Detect Options like: "A.", "A)", "A:", "a."
      const optionMatch = line.match(/^([A-Da-d])[\s.):-]\s*(.*)/);

      // Detect Answer like: "Đáp án:", "Đáp án đúng:", "Đ/A:", "ĐA:"
      const answerMatch = line.match(/^(?:Đáp án|Đ\/A|ĐA|Đáp số|Ket qua)[\s.:]*([A-Da-d0-3])/i);

      // Detect Explanation like: "Giải thích:", "Hướng dẫn:"
      const explainMatch = line.match(/^(?:Giải thích|Hướng dẫn|Ghi chú)[\s.:]*\s*(.*)/i);

      if (questionMatch && (!optionMatch || !line.match(/^[A-Da-d][\s.):-]/))) {
        // Push previous question if valid
        if (currentQuestion && currentQuestion.question) {
          results.push({
            id: `custom-${lesson.id}-${Date.now()}-${results.length + 1}`,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            type: currentOptions.length >= 2 ? 'choice' : 'essay',
            question: currentQuestion.question,
            options: currentOptions.length >= 2 ? currentOptions : undefined,
            correctAnswer: currentQuestion.correctAnswer ?? 0,
            explanation: currentQuestion.explanation || 'Đáp án theo hướng dẫn của giáo viên.',
            teacherNote: currentQuestion.teacherNote,
            createdAt: new Date().toISOString().slice(0, 10),
            uploadedBy: DEFAULT_ADMIN_NAME
          });
        }

        // Start new question
        const qText = questionMatch[1] ? questionMatch[1].trim() : line;
        currentQuestion = {
          question: qText || line,
          correctAnswer: 0
        };
        currentOptions = [];
      } else if (optionMatch && currentQuestion) {
        const letter = optionMatch[1].toUpperCase();
        const optText = optionMatch[2].trim();
        currentOptions.push(`${letter}. ${optText}`);
      } else if (answerMatch && currentQuestion) {
        const rawAns = answerMatch[1].toUpperCase();
        let idx = 0;
        if (rawAns === 'A' || rawAns === '0') idx = 0;
        else if (rawAns === 'B' || rawAns === '1') idx = 1;
        else if (rawAns === 'C' || rawAns === '2') idx = 2;
        else if (rawAns === 'D' || rawAns === '3') idx = 3;
        currentQuestion.correctAnswer = idx;
      } else if (explainMatch && currentQuestion) {
        currentQuestion.explanation = explainMatch[1].trim();
      } else if (currentQuestion) {
        // Append to question text if no options yet, or to last option
        if (currentOptions.length === 0) {
          currentQuestion.question += ' ' + line;
        } else {
          currentOptions[currentOptions.length - 1] += ' ' + line;
        }
      }
    }

    // Push the last question
    if (currentQuestion && currentQuestion.question) {
      results.push({
        id: `custom-${lesson.id}-${Date.now()}-${results.length + 1}`,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        type: currentOptions.length >= 2 ? 'choice' : 'essay',
        question: currentQuestion.question,
        options: currentOptions.length >= 2 ? currentOptions : undefined,
        correctAnswer: currentQuestion.correctAnswer ?? 0,
        explanation: currentQuestion.explanation || 'Đáp án theo hướng dẫn của giáo viên.',
        teacherNote: currentQuestion.teacherNote,
        createdAt: new Date().toISOString().slice(0, 10),
        uploadedBy: DEFAULT_ADMIN_NAME
      });
    }

    return results;
  };

  // Handle previewing parsed questions
  const handlePreviewParse = () => {
    if (!selectedLessonForUpload) return;
    setParseError('');
    if (!pastedContent.trim()) {
      setParseError('Vui lòng dán nội dung đề bài vào ô bên dưới.');
      return;
    }

    const parsed = parseExerciseText(pastedContent, selectedLessonForUpload);
    if (parsed.length === 0) {
      setParseError('Không nhận diện được câu hỏi. Xin đảm bảo nội dung có các câu hỏi (VD: Câu 1, Chặng 1, các phương án lựa chọn, hoặc hộp kiểm).');
      return;
    }

    setParsedPreview(parsed);
    playClickSound();
  };

  // Handle saving parsed questions
  const handleSaveParsedQuestions = () => {
    if (!selectedLessonForUpload || parsedPreview.length === 0) return;
    batchAddLessonUploadedExercises(parsedPreview);
    onRefreshCustomExercises();
    playCorrectSound();
    setUploadSuccessMsg(`Đã tải lên thành công ${parsedPreview.length} câu hỏi cho ${selectedLessonForUpload.title}!`);
    setPastedContent('');
    setParsedPreview([]);
    setTimeout(() => {
      setUploadSuccessMsg('');
      setSelectedLessonForUpload(null);
    }, 2500);
  };

  // Handle manual question submit
  const handleSaveManualQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLessonForUpload) return;
    if (!manualQuestion.trim()) {
      alert('Vui lòng nhập nội dung câu hỏi!');
      return;
    }

    const newEx: LessonUploadedExercise = {
      id: `custom-${selectedLessonForUpload.id}-${Date.now()}`,
      lessonId: selectedLessonForUpload.id,
      lessonTitle: selectedLessonForUpload.title,
      type: manualType,
      question: manualQuestion.trim(),
      options: manualType === 'choice' ? [
        `A. ${optA.trim() || 'Lựa chọn A'}`,
        `B. ${optB.trim() || 'Lựa chọn B'}`,
        `C. ${optC.trim() || 'Lựa chọn C'}`,
        `D. ${optD.trim() || 'Lựa chọn D'}`
      ] : undefined,
      correctAnswer: manualType === 'choice' ? correctOptIndex : undefined,
      explanation: explanation.trim() || 'Đáp án theo hướng dẫn của giáo viên.',
      teacherNote: teacherNote.trim() || undefined,
      createdAt: new Date().toISOString().slice(0, 10),
      uploadedBy: DEFAULT_ADMIN_NAME
    };

    addLessonUploadedExercise(newEx);
    onRefreshCustomExercises();
    playCorrectSound();
    setUploadSuccessMsg(`Đã thêm thành công 1 câu hỏi mới vào ${selectedLessonForUpload.title}!`);
    
    // Reset form
    setManualQuestion('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setExplanation('');
    setTeacherNote('');

    setTimeout(() => {
      setUploadSuccessMsg('');
    }, 2500);
  };

  // Handle file upload (.txt or .json)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedLessonForUpload) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (file.name.endsWith('.json')) {
          const json = JSON.parse(text);
          if (Array.isArray(json)) {
            const formatted: LessonUploadedExercise[] = json.map((item, idx) => ({
              id: `custom-${selectedLessonForUpload.id}-${Date.now()}-${idx}`,
              lessonId: selectedLessonForUpload.id,
              lessonTitle: selectedLessonForUpload.title,
              type: item.type || 'choice',
              question: item.question || `Câu hỏi ${idx + 1}`,
              options: item.options || undefined,
              correctAnswer: item.correctAnswer ?? 0,
              explanation: item.explanation || 'Theo hướng dẫn giáo viên',
              createdAt: new Date().toISOString().slice(0, 10),
              uploadedBy: DEFAULT_ADMIN_NAME
            }));
            batchAddLessonUploadedExercises(formatted);
            onRefreshCustomExercises();
            playCorrectSound();
            setUploadSuccessMsg(`Đã nạp thành công ${formatted.length} câu hỏi từ tệp JSON vào ${selectedLessonForUpload.title}!`);
            setTimeout(() => {
              setUploadSuccessMsg('');
              setSelectedLessonForUpload(null);
            }, 2500);
          }
        } else {
          // Parse as text with intelligent categorization
          const parsed = parseExerciseText(text, selectedLessonForUpload);
          if (parsed.length > 0) {
            batchAddLessonUploadedExercises(parsed);
            onRefreshCustomExercises();
            playCorrectSound();
            setUploadSuccessMsg(`Đã phân tích và tải lên thành công ${parsed.length} câu hỏi từ tệp văn bản!`);
            setTimeout(() => {
              setUploadSuccessMsg('');
              setSelectedLessonForUpload(null);
            }, 2500);
          } else {
            setParseError('Không tìm thấy câu hỏi hợp lệ trong tệp. Vui lòng kiểm tra định dạng!');
          }
        }
      } catch (err) {
        alert('Lỗi khi đọc tệp tin. Vui lòng đảm bảo tệp văn bản (.txt) hoặc JSON hợp lệ.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Delete single custom question
  const handleDeleteCustomExercise = (id: string, qText: string) => {
    playClickSound();
    if (window.confirm(`Bạn có chắc muốn xóa câu hỏi này?\n"${qText.slice(0, 80)}..."`)) {
      deleteLessonUploadedExercise(id);
      onRefreshCustomExercises();
      playCorrectSound();
    }
  };

  // Clear all uploaded questions for a specific lesson
  const handleClearLessonCustomExercises = (lessonId: number, lessonTitle: string) => {
    playClickSound();
    if (window.confirm(`Bạn có chắc muốn xóa TẤT CẢ câu hỏi đã tải lên của "${lessonTitle}"?`)) {
      deleteLessonExercisesByLesson(lessonId);
      onRefreshCustomExercises();
      playCorrectSound();
    }
  };

  // Filter lessons based on search query
  const filteredLessons = lessons.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.id.toString() === searchQuery.trim()
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                12 BÀI HỌC GDCD 6 CHUẨN GDPT 2018
              </span>
              <span className="bg-purple-700/80 text-purple-200 px-3 py-1 rounded-full text-xs font-bold border border-purple-400/30">
                Cô An Na Quản Trị
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/30">
                {customExercises.length} Câu Đã Tải Lên
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight">
              TẢI BÀI TẬP LÊN THEO TỪNG BÀI HỌC
            </h2>
            <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-3xl leading-relaxed">
              Dưới đây là <strong>12 Ô bài học</strong> từ Bài 1 đến Bài 12. Cô An Na có thể bấm trực tiếp vào nút <strong>"Tải Bài Tập"</strong> ở bất kỳ ô bài nào để dán đề từ Word, tải tệp hoặc nhập câu hỏi mới cho riêng bài đó.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                playClickSound();
                downloadExerciseSampleTxt();
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-md flex items-center space-x-1.5 transition-all active:scale-95"
              title="Tải tệp mẫu hướng dẫn soạn đề (.txt)"
            >
              <Download className="w-4 h-4" />
              <span>TẢI ĐỀ MẪU (.TXT)</span>
            </button>

            {onOpenHomework && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenHomework();
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-md flex items-center space-x-1.5 transition-all active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>XEM GIAO DIỆN HỌC SINH</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Search & Summary Stat Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-purple-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo số bài hoặc tên bài học..."
              className="w-full pl-9.5 pr-4 py-2 bg-white/10 text-white placeholder-purple-300 text-xs sm:text-sm rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4 text-xs text-purple-200">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
              <span>Đầy đủ 12 bài chuẩn SGK Kết Nối Tri Thức</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              <span>Đã tích hợp bảo vệ bản quyền Cô An Na</span>
            </span>
          </div>
        </div>
      </div>

      {/* 12 Ô BÀI HỌC GRID (12 LESSON BOXES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLessons.map((lesson) => {
          // Count custom exercises for this lesson
          const lessonCustomCount = customExercises.filter(e => e.lessonId === lesson.id).length;
          const totalBuiltInQuestions = (lesson.quiz?.length || 5);

          return (
            <div 
              key={lesson.id}
              className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-purple-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Top Header */}
              <div className="p-5 sm:p-6 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-950 flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                      {lesson.icon}
                    </div>
                    <div>
                      <span className="inline-block text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full mb-1">
                        Ô BÀI {lesson.id}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-purple-900 transition-colors">
                        {lesson.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-2.5 line-clamp-2 leading-relaxed">
                  {lesson.shortDesc}
                </p>

                {/* Badges / Metrics */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                    📘 SGK: {totalBuiltInQuestions} câu trắc nghiệm
                  </span>
                  {lessonCustomCount > 0 ? (
                    <span className="text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-lg flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>Cô An Na đã tải: {lessonCustomCount} câu</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-lg">
                      Chưa có câu tải lên thêm
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="bg-slate-50/90 px-5 sm:px-6 py-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedLessonForUpload(lesson);
                    setPastedContent('');
                    setParsedPreview([]);
                    setParseError('');
                    setUploadMode('smart_paste');
                  }}
                  className="flex-1 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs hover:shadow-md flex items-center justify-center space-x-1.5 transition-all active:scale-95"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>TẢI BÀI TẬP LÊN</span>
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    setSelectedLessonForView(lesson);
                  }}
                  className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-1 transition-all active:scale-95"
                  title="Xem tất cả câu hỏi của bài này"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Xem ({totalBuiltInQuestions + lessonCustomCount})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* UPLOAD MODAL FOR SELECTED LESSON */}
      {selectedLessonForUpload && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden my-auto animate-fadeIn max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-5 sm:p-6 shrink-0 flex items-start justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-xl font-bold">
                  {selectedLessonForUpload.icon}
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase text-amber-300 tracking-wider">
                    TẢI BÀI TẬP LÊN CHO Ô BÀI {selectedLessonForUpload.id}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-white">
                    {selectedLessonForUpload.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedLessonForUpload(null)}
                className="text-purple-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success Banner if any */}
            {uploadSuccessMsg && (
              <div className="bg-emerald-600 text-white text-xs sm:text-sm font-bold p-3 text-center flex items-center justify-center space-x-2 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
                <span>{uploadSuccessMsg}</span>
              </div>
            )}

            {/* Sub-mode selector tabs */}
            <div className="flex border-b border-slate-200 px-5 sm:px-6 pt-3 gap-2 shrink-0 bg-slate-50">
              <button
                onClick={() => {
                  playClickSound();
                  setUploadMode('smart_paste');
                }}
                className={`pb-2.5 px-3 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center space-x-1.5 ${
                  uploadMode === 'smart_paste'
                    ? 'border-purple-700 text-purple-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>1. Dán Đề Bài Nhanh (Từ Word)</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setUploadMode('form');
                }}
                className={`pb-2.5 px-3 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center space-x-1.5 ${
                  uploadMode === 'form'
                    ? 'border-purple-700 text-purple-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>2. Nhập Từng Câu Bằng Form</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setUploadMode('file');
                }}
                className={`pb-2.5 px-3 font-bold text-xs sm:text-sm border-b-2 transition-all flex items-center space-x-1.5 ${
                  uploadMode === 'file'
                    ? 'border-purple-700 text-purple-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>3. Tải Tệp (.txt / .json)</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 grow">
              {/* MODE 1: SMART PASTE */}
              {uploadMode === 'smart_paste' && (
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-xs text-purple-900 leading-relaxed">
                    <p className="font-bold flex items-center space-x-1 text-purple-950 mb-1">
                      <Sparkles className="w-4 h-4 text-purple-700" />
                      <span>Hướng dẫn dán đề bài tự động:</span>
                    </p>
                    <p>
                      Cô An Na chỉ cần sao chép các câu hỏi từ giáo án hoặc tệp Word và dán vào ô bên dưới. Hệ thống sẽ tự động tách câu hỏi, đáp án A-B-C-D và nhận diện đáp án đúng:
                    </p>
                    <div className="mt-2 bg-white/80 p-2.5 rounded-xl font-mono text-[11px] text-slate-700 border border-purple-100">
                      Câu 1: ...<br />
                      A. Phương án 1<br />
                      B. Phương án 2<br />
                      C. Phương án 3<br />
                      D. Phương án 4<br />
                      Đáp án: A<br />
                      Giải thích: ...
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Dán nội dung đề bài tại đây:
                    </label>
                    <textarea
                      rows={8}
                      value={pastedContent}
                      onChange={(e) => setPastedContent(e.target.value)}
                      placeholder={`Ví dụ:
Câu 1: Nhận định nào dưới đây là đúng?
A. Tiết kiệm điện giúp bảo vệ môi trường
B. Mở quạt suốt ngày dù không có ai
C. Vứt rác bừa bãi ra lớp học
D. Không cần học bài cũ
Đáp án: A
Giải thích: Tiết kiệm điện giúp giảm chi phí và bảo vệ tài nguyên.`}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
                    />
                  </div>

                  {parseError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{parseError}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handlePreviewParse}
                      className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-sm flex items-center space-x-1.5 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>PHÂN TÍCH & XEM TRƯỚC</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPastedContent(`Câu 1: Câu thành ngữ nào sau đây thể hiện đức tính siêng năng, kiên trì?
A. Nước chảy đá mòn
B. Há miệng chờ sung
C. Đẽo cày giữa đường
D. Bắt cá hai tay
Đáp án: A
Giải thích: "Nước chảy đá mòn" khuyên con người cần nhẫn nại, kiên trì theo đuổi mục tiêu.

Câu 2: Hành động nào dưới đây là bảo vệ quyền trẻ em?
A. Tạo điều kiện cho trẻ em được học tập, vui chơi và tiêm chủng y tế
B. Bắt trẻ em làm việc nặng nhọc kiếm tiền
C. Đọc trộm thư và tin nhắn riêng của con
D. Đánh đập trẻ khi bị điểm kém
Đáp án: A
Giải thích: Trẻ em có quyền được học tập, phát triển và chăm sóc sức khỏe toàn diện.`);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all"
                    >
                      Dán đề mẫu thử nghiệm
                    </button>
                  </div>

                  {/* Preview of parsed questions */}
                  {parsedPreview.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Đã nhận diện thành công {parsedPreview.length} câu hỏi:</span>
                        </h4>

                        <button
                          onClick={handleSaveParsedQuestions}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm flex items-center space-x-1.5 active:scale-95 transition-all"
                        >
                          <Check className="w-4 h-4" />
                          <span>LƯU TẤT CẢ {parsedPreview.length} CÂU VÀO BÀI {selectedLessonForUpload.id}</span>
                        </button>
                      </div>

                      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                        {parsedPreview.map((q, idx) => (
                          <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-200 pb-1.5">
                              <div className="flex items-center space-x-2">
                                <span className="font-black bg-purple-700 text-white px-2 py-0.5 rounded-md text-[10px]">
                                  Câu {idx + 1}
                                </span>
                                {q.stageName && (
                                  <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md text-[10px]">
                                    {q.stageName}
                                  </span>
                                )}
                              </div>
                              <span className="font-bold text-[10px] px-2 py-0.5 rounded-full border bg-white text-slate-700">
                                {q.type === 'multiselect' ? '🟢 Chọn nhiều đáp án (Hộp kiểm)' :
                                 q.type === 'true_false' ? '🟣 Nhận định Đúng / Sai' :
                                 q.type === 'situation' ? '🟠 Xử lý tình huống' :
                                 q.type === 'essay' ? '🟡 Tự luận suy ngẫm' : '🔵 Trắc nghiệm ABCD'}
                              </span>
                            </div>

                            <p className="font-bold text-slate-900 leading-snug">
                              {q.question}
                            </p>

                            {q.options && q.options.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-700 pl-1">
                                {q.options.map((opt, oIdx) => {
                                  const isCorrect = q.type === 'multiselect'
                                    ? q.correctAnswers?.includes(oIdx)
                                    : q.correctAnswer === oIdx;
                                  return (
                                    <div 
                                      key={oIdx} 
                                      className={`p-2 rounded-xl flex items-center space-x-2 border ${
                                        isCorrect 
                                          ? 'bg-emerald-50 text-emerald-950 font-bold border-emerald-300' 
                                          : 'bg-white border-slate-200'
                                      }`}
                                    >
                                      <span>{q.type === 'multiselect' ? (isCorrect ? '☑' : '☐') : String.fromCharCode(65 + oIdx) + '.'}</span>
                                      <span className="grow">{opt.replace(/^[A-Da-d][\s.):-]\s*/, '')}</span>
                                      {isCorrect && <span className="text-[10px] text-emerald-700 font-black">✓ Đúng</span>}
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {q.explanation && (
                              <p className="text-[11px] text-slate-500 italic pl-1 border-t border-slate-100 pt-1">
                                <strong>Hướng dẫn:</strong> {q.explanation}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2: MANUAL FORM */}
              {uploadMode === 'form' && (
                <form onSubmit={handleSaveManualQuestion} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Dạng câu hỏi:
                      </label>
                      <select
                        value={manualType}
                        onChange={(e) => setManualType(e.target.value as any)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                      >
                        <option value="choice">Trắc nghiệm ABCD (4 lựa chọn)</option>
                        <option value="situation">Tình huống đạo đức thực tế</option>
                        <option value="essay">Câu hỏi tự luận / suy ngẫm</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Giáo viên biên soạn:
                      </label>
                      <input
                        type="text"
                        disabled
                        value={DEFAULT_ADMIN_NAME}
                        className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nội dung câu hỏi: *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={manualQuestion}
                      onChange={(e) => setManualQuestion(e.target.value)}
                      placeholder="Nhập nội dung câu hỏi hoặc tình huống cần học sinh giải quyết..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  {manualType === 'choice' && (
                    <div className="space-y-3 pt-2">
                      <label className="block text-xs font-bold text-slate-700">
                        4 Lựa chọn đáp án (Tích chọn đáp án đúng):
                      </label>
                      
                      {[
                        { label: 'A', val: optA, set: setOptA, idx: 0 },
                        { label: 'B', val: optB, set: setOptB, idx: 1 },
                        { label: 'C', val: optC, set: setOptC, idx: 2 },
                        { label: 'D', val: optD, set: setOptD, idx: 3 },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => setCorrectOptIndex(item.idx)}
                            className={`w-7 h-7 rounded-lg font-black text-xs shrink-0 flex items-center justify-center transition-all ${
                              correctOptIndex === item.idx
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                            title="Bấm để chọn làm đáp án đúng"
                          >
                            {correctOptIndex === item.idx ? '✓' : item.label}
                          </button>
                          <input
                            type="text"
                            required
                            value={item.val}
                            onChange={(e) => item.set(e.target.value)}
                            placeholder={`Nội dung lựa chọn ${item.label}...`}
                            className={`w-full p-2.5 text-xs rounded-xl border ${
                              correctOptIndex === item.idx
                                ? 'border-emerald-500 bg-emerald-50/40 text-emerald-950 font-medium'
                                : 'border-slate-200 bg-slate-50'
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Lời giải chi tiết / Hướng dẫn:
                      </label>
                      <input
                        type="text"
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                        placeholder="Giải thích vì sao chọn đáp án này..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Lời khuyên / Ghi chú của Cô An Na:
                      </label>
                      <input
                        type="text"
                        value={teacherNote}
                        onChange={(e) => setTeacherNote(e.target.value)}
                        placeholder="Ví dụ: Các em chú ý quy định tại Điều 20 Hiến pháp..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md flex items-center space-x-2 transition-all active:scale-95"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>THÊM CÂU HỎI VÀO BÀI {selectedLessonForUpload.id}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* MODE 3: FILE UPLOAD */}
              {uploadMode === 'file' && (
                <div className="space-y-4 py-4">
                  <div className="border-2 border-dashed border-purple-300 rounded-3xl p-8 text-center bg-purple-50/50 hover:bg-purple-50 transition-colors">
                    <Upload className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                      Tải lên tệp câu hỏi cho Bài {selectedLessonForUpload.id}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                      Hỗ trợ tệp văn bản <strong>.txt</strong> định dạng câu hỏi hoặc tệp <strong>.json</strong> chứa danh sách câu hỏi.
                    </p>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt,.json"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="lesson-file-upload-input"
                    />

                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                      <label
                        htmlFor="lesson-file-upload-input"
                        className="cursor-pointer bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md inline-flex items-center space-x-1.5 transition-all active:scale-95"
                      >
                        <Upload className="w-4 h-4" />
                        <span>CHỌN TỆP TỪ MÁY TÍNH</span>
                      </label>

                      <button
                        type="button"
                        onClick={downloadExerciseSampleTxt}
                        className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center space-x-1.5"
                      >
                        <Download className="w-4 h-4 text-purple-600" />
                        <span>Tải Tệp Mẫu .txt</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-5 sm:px-6 py-3.5 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500">
                Ô bài học: <strong>Bài {selectedLessonForUpload.id}</strong> ({selectedLessonForUpload.title.slice(0, 30)}...)
              </span>
              <button
                onClick={() => setSelectedLessonForUpload(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW ALL EXERCISES OF A SELECTED LESSON MODAL */}
      {selectedLessonForView && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden my-auto animate-fadeIn max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-5 sm:p-6 shrink-0 flex items-start justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl font-bold shadow-sm">
                  {selectedLessonForView.icon}
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase text-amber-300 tracking-wider">
                    DANH SÁCH BÀI TẬP HIỆN CÓ CỦA Ô BÀI {selectedLessonForView.id}
                  </span>
                  <h3 className="font-bold text-base sm:text-xl text-white">
                    {selectedLessonForView.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedLessonForView(null)}
                className="text-purple-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub header toolbar */}
            <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <span>Tổng số câu:</span>
                <span className="bg-purple-100 text-purple-900 px-2 py-0.5 rounded-md">
                  {(selectedLessonForView.quiz?.length || 5) + customExercises.filter(e => e.lessonId === selectedLessonForView.id).length} câu
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-700">
                  ({customExercises.filter(e => e.lessonId === selectedLessonForView.id).length} câu do Cô An Na tải lên)
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {customExercises.filter(e => e.lessonId === selectedLessonForView.id).length > 0 && (
                  <button
                    onClick={() => handleClearLessonCustomExercises(selectedLessonForView.id, selectedLessonForView.title)}
                    className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-bold text-xs px-3 py-1.5 rounded-lg border border-rose-200 transition-colors flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa toàn bộ câu tự tải của bài này</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedLessonForUpload(selectedLessonForView);
                    setSelectedLessonForView(null);
                  }}
                  className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Tải thêm câu hỏi</span>
                </button>
              </div>
            </div>

            {/* List of Questions */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 grow">
              {/* 1. Custom Uploaded Questions First */}
              {customExercises.filter(e => e.lessonId === selectedLessonForView.id).length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <h4 className="font-bold text-xs sm:text-sm text-emerald-900 uppercase tracking-wider">
                      CÂU HỎI DO CÔ AN NA TẢI LÊN ({customExercises.filter(e => e.lessonId === selectedLessonForView.id).length} câu)
                    </h4>
                  </div>

                  {customExercises.filter(e => e.lessonId === selectedLessonForView.id).map((q, qIdx) => (
                    <div key={q.id} className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-2xl space-y-2 relative group">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-2">
                          <span className="bg-emerald-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shrink-0">
                            CÂU {qIdx + 1} (TỰ TẠO)
                          </span>
                          <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                            {q.question}
                          </h5>
                        </div>

                        <button
                          onClick={() => handleDeleteCustomExercise(q.id, q.question)}
                          className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-100 transition-colors shrink-0"
                          title="Xóa câu hỏi này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {q.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pl-2 pt-1">
                          {q.options.map((opt, oIdx) => (
                            <div 
                              key={oIdx}
                              className={`p-2 rounded-xl border ${
                                q.correctAnswer === oIdx
                                  ? 'bg-emerald-100/80 border-emerald-400 font-bold text-emerald-950'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              {opt} {q.correctAnswer === oIdx && '✓'}
                            </div>
                          ))}
                        </div>
                      )}

                      {q.explanation && (
                        <p className="text-xs text-slate-600 italic bg-white/70 p-2 rounded-xl border border-slate-200/60 mt-1">
                          <strong>Lời giải:</strong> {q.explanation}
                        </p>
                      )}

                      {q.teacherNote && (
                        <p className="text-xs text-purple-800 bg-purple-50 p-2 rounded-xl border border-purple-200 mt-1">
                          <strong>Ghi chú giáo viên:</strong> {q.teacherNote}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 2. Built-in Quiz Questions */}
              <div className="space-y-3 pt-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <h4 className="font-bold text-xs sm:text-sm text-indigo-900 uppercase tracking-wider">
                    BÀI TẬP CHUẨN SGK (KẾT NỐI TRI THỨC / CÁNH DIỀU / CHÂN TRỜI SÁNG TẠO)
                  </h4>
                </div>

                {selectedLessonForView.quiz?.map((q, qIdx) => (
                  <div key={q.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="bg-indigo-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shrink-0">
                        CÂU {qIdx + 1}
                      </span>
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {q.question}
                      </h5>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pl-2 pt-1">
                      {q.options.map((opt, oIdx) => (
                        <div 
                          key={oIdx}
                          className={`p-2 rounded-xl border ${
                            q.correctAnswer === oIdx
                              ? 'bg-emerald-100/80 border-emerald-400 font-bold text-emerald-950'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          {opt} {q.correctAnswer === oIdx && '✓'}
                        </div>
                      ))}
                    </div>

                    {q.explanation && (
                      <p className="text-xs text-slate-600 italic bg-white/70 p-2 rounded-xl border border-slate-200/60 mt-1">
                        <strong>Lời giải:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-5 sm:px-6 py-3.5 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500">
                Hiển thị {selectedLessonForView.title}
              </span>
              <button
                onClick={() => setSelectedLessonForView(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
