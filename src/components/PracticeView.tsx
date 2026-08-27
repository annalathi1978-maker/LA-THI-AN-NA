import { useState, useMemo } from 'react';
import { PracticeQuestion, QuestionType, Lesson } from '../types';
import { CheckCircle2, XCircle, Filter, Sparkles, RefreshCw, Check, X, ArrowRight, Lightbulb, Trophy } from 'lucide-react';
import { playClickSound, playCorrectSound, playWrongSound, playFanfareSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface PracticeViewProps {
  questions: PracticeQuestion[];
  lessons: Lesson[];
  initialLessonFilter?: number | null;
  completedQuestionIds: string[];
  onCompleteQuestion: (questionId: string) => void;
}

export default function PracticeView({
  questions,
  lessons,
  initialLessonFilter,
  completedQuestionIds,
  onCompleteQuestion
}: PracticeViewProps) {
  const [selectedLessonId, setSelectedLessonId] = useState<number | 'all'>(initialLessonFilter || 'all');
  const [selectedType, setSelectedType] = useState<QuestionType | 'all'>('all');
  
  interface AnswerState {
    answer: any;
    isCorrect: boolean;
  }
  const [userAnswers, setUserAnswers] = useState<Record<string, AnswerState>>({});

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchLesson = selectedLessonId === 'all' || q.lessonId === selectedLessonId;
      const matchType = selectedType === 'all' || q.type === selectedType;
      return matchLesson && matchType;
    });
  }, [questions, selectedLessonId, selectedType]);

  const handleSelectAnswer = (q: PracticeQuestion, chosenAnswer: number | boolean) => {
    if (userAnswers[q.id]) return; // Already answered

    const isCorrect = chosenAnswer === q.correctAnswer;
    setUserAnswers((prev) => ({
      ...prev,
      [q.id]: { answer: chosenAnswer, isCorrect }
    }));

    if (isCorrect) {
      playCorrectSound();
      onCompleteQuestion(q.id);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      playWrongSound();
    }
  };

  const handleReset = () => {
    playClickSound();
    setUserAnswers({});
  };

  const totalAnswered = Object.keys(userAnswers).length;
  const totalCorrect = (Object.values(userAnswers) as AnswerState[]).filter((a) => a.isCorrect).length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16">
      {/* Top Header & Filters */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">✍️</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Luyện Tập GDCD 6
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              3 dạng câu hỏi tinh gọn: Trắc nghiệm ABCD • Đúng - Sai • Xử lý tình huống
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-2xl text-xs font-bold flex items-center space-x-1.5">
              <Trophy className="w-3.5 h-3.5 text-emerald-600" />
              <span>Đúng: {totalCorrect}/{totalAnswered}</span>
            </div>
            {totalAnswered > 0 && (
              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors text-xs font-bold flex items-center space-x-1"
                title="Làm lại từ đầu"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Làm lại</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters Controls */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Filter by Type */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Dạng bài tập:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'Tất cả (3 dạng)' },
                { id: 'choice', label: 'Trắc nghiệm ABCD' },
                { id: 'true_false', label: 'Đúng – Sai' },
                { id: 'situation', label: 'Tình huống' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedType(t.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedType === t.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter by Lesson */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Theo bài học:
            </label>
            <select
              value={selectedLessonId}
              onChange={(e) => {
                playClickSound();
                setSelectedLessonId(e.target.value === 'all' ? 'all' : Number(e.target.value));
              }}
              className="w-full bg-slate-100 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-300"
            >
              <option value="all">🌟 Toàn bộ 10 bài (Tổng hợp)</option>
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  Bài {l.order}: {l.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500">
            <p className="text-sm font-medium">Không tìm thấy câu hỏi phù hợp với bộ lọc hiện tại.</p>
          </div>
        ) : (
          filteredQuestions.map((q, index) => {
            const answeredData = userAnswers[q.id];
            const isAnswered = !!answeredData;
            const isCorrect = answeredData?.isCorrect;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-3xl border-2 p-5 sm:p-7 shadow-xs transition-all ${
                  isAnswered
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : 'border-rose-300 bg-rose-50/20'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                {/* Header question meta */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                      Câu {index + 1}
                    </span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      {q.lessonTitle}
                    </span>
                    {q.sourceBook && (
                      <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                        📖 SGK {q.sourceBook}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-slate-500">
                      {q.type === 'choice' && '🎯 Trắc nghiệm ABCD'}
                      {q.type === 'true_false' && '⚖️ Nhận định Đúng - Sai'}
                      {q.type === 'situation' && '💡 Ứng xử tình huống'}
                    </span>
                  </div>

                  {isAnswered && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>{isCorrect ? "Chính xác (+10đ)" : "Chưa chính xác"}</span>
                    </span>
                  )}
                </div>

                {/* Question text */}
                <h3 className="font-bold text-sm sm:text-base text-slate-800 leading-snug mb-4">
                  {q.question}
                </h3>

                {/* Question Type: ABCD or Situation */}
                {(q.type === 'choice' || q.type === 'situation') && q.options && (
                  <div className="grid grid-cols-1 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = answeredData?.answer === optIdx;
                      const isTheCorrectOpt = optIdx === q.correctAnswer;

                      let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700';

                      if (isAnswered) {
                        if (isTheCorrectOpt) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-600 text-white border-rose-600 font-bold';
                        } else {
                          btnStyle = 'bg-white text-slate-400 border-slate-200 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectAnswer(q, optIdx)}
                          className={`w-full text-left p-3.5 rounded-2xl border-2 text-xs sm:text-sm transition-all flex items-center justify-between active:scale-98 ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isTheCorrectOpt && (
                            <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />
                          )}
                          {isAnswered && isChosen && !isCorrect && (
                            <XCircle className="w-4 h-4 text-white shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Question Type: True/False */}
                {q.type === 'true_false' && (
                  <div className="grid grid-cols-2 gap-3 max-w-sm">
                    {[
                      { val: true, label: "ĐÚNG 👍", color: "hover:border-emerald-400" },
                      { val: false, label: "SAI 👎", color: "hover:border-rose-400" }
                    ].map((item) => {
                      const isChosen = answeredData?.answer === item.val;
                      const isTheCorrectChoice = item.val === q.correctAnswer;

                      let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800';

                      if (isAnswered) {
                        if (isTheCorrectChoice) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-600 text-white border-rose-600 font-bold';
                        } else {
                          btnStyle = 'bg-white text-slate-400 border-slate-200 opacity-50';
                        }
                      }

                      return (
                        <button
                          key={String(item.val)}
                          disabled={isAnswered}
                          onClick={() => handleSelectAnswer(q, item.val)}
                          className={`p-3.5 rounded-2xl border-2 font-bold text-center text-xs sm:text-sm transition-all active:scale-95 ${btnStyle} ${item.color}`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Explanation Box */}
                {isAnswered && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm animate-fadeIn">
                    <p className="text-slate-700">
                      <span className="font-bold text-slate-900">💡 Giải thích: </span>
                      {q.explanation}
                    </p>
                    {q.practicalTip && (
                      <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-slate-700 flex items-start space-x-2">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-900">Bài học thực tiễn: </span>
                          <span>{q.practicalTip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
