import { useState } from 'react';
import { Lesson, LessonPartType, QuickQuizQuestion } from '../types';
import { BookOpen, Sparkles, CheckCircle2, ArrowLeft, ArrowRight, HelpCircle, Lightbulb, Compass, Share2, Award, RefreshCw } from 'lucide-react';
import { playClickSound, playCorrectSound, playWrongSound, playFanfareSound } from '../utils/audio';
import AiAssistantModal from './AiAssistantModal';
import confetti from 'canvas-confetti';

interface LessonsViewProps {
  lessons: Lesson[];
  selectedLessonId: number | null;
  onSelectLesson: (id: number | null) => void;
  completedLessonIds: number[];
  quizScores: Record<number, number>;
  onCompleteQuiz: (lessonId: number, score: number) => void;
}

export default function LessonsView({
  lessons,
  selectedLessonId,
  onSelectLesson,
  completedLessonIds,
  quizScores,
  onCompleteQuiz
}: LessonsViewProps) {
  const [activePart, setActivePart] = useState<LessonPartType | 'textbook'>('intro');
  const [activeBookTab, setActiveBookTab] = useState<'all' | 'canhdieu' | 'chantroi' | 'ketnoi'>('all');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  
  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedMindmapNode, setSelectedMindmapNode] = useState<string | null>(null);

  const selectedLesson = lessons.find((l) => l.id === selectedLessonId);

  const handleOpenLesson = (id: number) => {
    playClickSound();
    onSelectLesson(id);
    setActivePart('intro');
    setUserAnswers({});
    setQuizSubmitted(false);
    setSelectedMindmapNode(null);
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    playClickSound();
    setUserAnswers({ ...userAnswers, [questionIndex]: optionIndex });
  };

  const handleSubmitQuiz = () => {
    if (!selectedLesson) return;
    if (Object.keys(userAnswers).length < selectedLesson.quiz.length) {
      alert("Em hãy chọn đáp án cho cả 5 câu hỏi trước khi nộp bài nhé!");
      return;
    }

    let correctCount = 0;
    selectedLesson.quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    setQuizSubmitted(true);
    onCompleteQuiz(selectedLesson.id, correctCount);

    if (correctCount >= 4) {
      playCorrectSound();
      playFanfareSound();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      playClickSound();
    }
  };

  const handleResetQuiz = () => {
    playClickSound();
    setUserAnswers({});
    setQuizSubmitted(false);
  };

  // --- VIEW 1: LESSON LIST ---
  if (!selectedLesson) {
    return (
      <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-12">
        {/* Header banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">📚</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Khám Phá 10 Bài Học GDCD 6
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Chương trình Giáo dục Công dân lớp 6 theo chuẩn Giáo dục phổ thông 2018
            </p>
          </div>
          <div className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-4 py-2 rounded-2xl flex items-center space-x-2">
            <span>Đã hoàn thành:</span>
            <span className="text-amber-600 text-sm font-black">{completedLessonIds.length}/10 bài</span>
          </div>
        </div>

        {/* 10 Lessons Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {lessons.map((lesson) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const score = quizScores[lesson.id];
            const progressPercent = isCompleted ? 100 : score ? (score / 5) * 80 : 0;

            return (
              <div
                key={lesson.id}
                className="bg-white rounded-3xl border-2 border-slate-100 hover:border-amber-300 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider">
                      BÀI {lesson.order}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Hoàn thành
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        Chưa hoàn thành
                      </span>
                    )}
                  </div>

                  <div className="flex items-start space-x-3.5 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-2xl flex items-center justify-center border border-amber-200 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                      {lesson.icon}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-800 leading-snug group-hover:text-amber-600 transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {lesson.shortDesc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-500">Khám phá kiến thức</span>
                    <span className="text-amber-600">{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <button
                    onClick={() => handleOpenLesson(lesson.id)}
                    className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-sm shadow-orange-200 hover:shadow active:scale-98 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>{isCompleted ? "ÔN LẠI BÀI" : "HỌC BÀI"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- VIEW 2: LESSON DETAIL (6 PARTS) ---
  const partTabs: { id: LessonPartType | 'textbook'; label: string; icon: string }[] = [
    { id: 'intro', label: '1. Khởi động', icon: '🚀' },
    { id: 'textbook', label: '2. Tư liệu 3 Bộ SGK', icon: '📚' },
    { id: 'knowledge', label: '3. Kiến thức trọng tâm', icon: '📖' },
    { id: 'summary', label: '4. Ghi nhớ', icon: '⭐' },
    { id: 'mindmap', label: '5. Sơ đồ kiến thức', icon: '🧠' },
    { id: 'quiz', label: '6. Kiểm tra nhanh', icon: '✍️' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Header bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              playClickSound();
              onSelectLesson(null);
            }}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Quay lại danh sách bài"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{selectedLesson.icon}</span>
              <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                BÀI {selectedLesson.order}
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-slate-800 mt-0.5">
              {selectedLesson.title}
            </h2>
          </div>
        </div>

        {/* Nút Hỏi Trợ Lý AI về bài này */}
        <button
          onClick={() => {
            playClickSound();
            setIsAiModalOpen(true);
          }}
          className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl shadow-md shadow-indigo-100 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span>HỎI AI VỀ BÀI NÀY</span>
        </button>
      </div>

      {/* 5 Tabs Navigation */}
      <div className="flex overflow-x-auto p-1.5 bg-slate-100/80 rounded-2xl gap-1 no-scrollbar">
        {partTabs.map((tab) => {
          const isActive = activePart === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setActivePart(tab.id);
              }}
              className={`whitespace-nowrap px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-1.5 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: KHỞI ĐỘNG */}
      {activePart === 'intro' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center space-x-2 text-rose-500 font-extrabold text-sm uppercase tracking-wider">
            <span>🚀 Khởi động gợi mở</span>
          </div>

          <div className="bg-rose-50/70 border-2 border-rose-100 rounded-2xl p-5 sm:p-6 space-y-3">
            <h3 className="text-lg font-black text-rose-900">
              {selectedLesson.intro.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {selectedLesson.intro.scenario}
            </p>
          </div>

          <div className="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Câu hỏi gợi mở tư duy:</span>
            </div>
            <p className="text-base font-bold text-slate-800">
              "{selectedLesson.intro.question}"
            </p>
            {selectedLesson.intro.suggestedThought && (
              <div className="pt-2 border-t border-amber-200/60 text-xs sm:text-sm text-slate-600">
                <span className="font-semibold text-amber-900">💡 Gợi ý nhận thức: </span>
                {selectedLesson.intro.suggestedThought}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                playClickSound();
                setActivePart('textbook');
              }}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-6 py-2.5 rounded-2xl flex items-center space-x-2 shadow-sm transition-all"
            >
              <span>Đọc Tư Liệu 3 Bộ SGK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: TƯ LIỆU 3 BỘ SÁCH GIÁO KHOA */}
      {activePart === 'textbook' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2 text-indigo-700 font-extrabold text-sm uppercase tracking-wider">
                  <span>📚 Tư liệu & Điển tích từ 3 Bộ SGK GDCD 6</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Khám phá những câu chuyện cảm động và tình huống giáo dục chuẩn xác từ từng bộ sách
                </p>
              </div>

              {/* Book filter badges */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'Tất cả 3 bộ', color: 'bg-slate-100 text-slate-800' },
                  { id: 'canhdieu', label: 'Cánh Diều', color: 'bg-amber-100 text-amber-900 border border-amber-300' },
                  { id: 'chantroi', label: 'Chân Trời Sáng Tạo', color: 'bg-cyan-100 text-cyan-900 border border-cyan-300' },
                  { id: 'ketnoi', label: 'Kết Nối Tri Thức', color: 'bg-emerald-100 text-emerald-900 border border-emerald-300' },
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      playClickSound();
                      setActiveBookTab(b.id as any);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                      activeBookTab === b.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : `${b.color} hover:opacity-80`
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Studies Cards */}
            <div className="space-y-5">
              {selectedLesson.textbookCaseStudies
                .filter(cs => {
                  if (activeBookTab === 'canhdieu') return cs.bookName.includes('Cánh Diều');
                  if (activeBookTab === 'chantroi') return cs.bookName.includes('Chân Trời');
                  if (activeBookTab === 'ketnoi') return cs.bookName.includes('Kết Nối');
                  return true;
                })
                .map((cs, idx) => {
                  let themeBadge = 'bg-amber-100 text-amber-900 border-amber-300';
                  let borderTheme = 'border-amber-200 hover:border-amber-400 bg-amber-50/20';

                  if (cs.bookName.includes('Chân Trời')) {
                    themeBadge = 'bg-cyan-100 text-cyan-900 border-cyan-300';
                    borderTheme = 'border-cyan-200 hover:border-cyan-400 bg-cyan-50/20';
                  } else if (cs.bookName.includes('Kết Nối')) {
                    themeBadge = 'bg-emerald-100 text-emerald-900 border-emerald-300';
                    borderTheme = 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/20';
                  }

                  return (
                    <div
                      key={idx}
                      className={`p-5 sm:p-6 rounded-3xl border-2 transition-all space-y-4 shadow-2xs ${borderTheme}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-black border ${themeBadge}`}>
                            Bộ sách: {cs.bookName}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-500">
                          {cs.chapter || `Bài ${selectedLesson.order}`}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2">
                          📖 {cs.title}
                        </h4>
                        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-white/80 p-4 rounded-2xl border border-slate-200/80">
                          {cs.content}
                        </p>
                      </div>

                      <div className="p-3.5 bg-white rounded-2xl border border-blue-200 flex items-start space-x-3 text-xs sm:text-sm">
                        <span className="text-lg">💡</span>
                        <div>
                          <span className="font-extrabold text-blue-900">Bài học sâu sắc: </span>
                          <span className="text-slate-700 font-medium">{cs.lessonTakeaway}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  playClickSound();
                  setActivePart('intro');
                }}
                className="text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Khởi động</span>
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setActivePart('knowledge');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-2xl flex items-center space-x-2 shadow-sm transition-all"
              >
                <span>Xem Kiến Thức Trọng Tâm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: KIẾN THỨC TRỌNG TÂM */}
      {activePart === 'knowledge' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm uppercase tracking-wider">
              <span>📖 {selectedLesson.knowledge.sectionTitle}</span>
            </div>

            <div className="space-y-5">
              {selectedLesson.knowledge.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-3 hover:bg-blue-50/30 hover:border-blue-200 transition-all"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xl">{point.icon || '📌'}</span>
                    <h4 className="font-extrabold text-base sm:text-lg text-slate-800">
                      {point.heading}
                    </h4>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line pl-8">
                    {point.content}
                  </p>
                  {point.example && (
                    <div className="ml-8 mt-2 p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs sm:text-sm text-slate-700">
                      <span className="font-bold text-amber-800">🌱 Ví dụ thực tế: </span>
                      <span>{point.example}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  playClickSound();
                  setActivePart('textbook');
                }}
                className="text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Tư liệu 3 bộ SGK</span>
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setActivePart('summary');
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-6 py-2.5 rounded-2xl flex items-center space-x-2 shadow-sm transition-all"
              >
                <span>Đến phần Ghi Nhớ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: GHI NHỚ */}
      {activePart === 'summary' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center space-x-2 text-amber-600 font-extrabold text-sm uppercase tracking-wider">
            <span>⭐ Ghi nhớ cốt lõi ({selectedLesson.summary.length} ý quan trọng)</span>
          </div>

          <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-black text-amber-900 flex items-center space-x-2">
              <span>🌟 Các ý cốt lõi cần nhớ:</span>
            </h3>
            <ul className="space-y-3">
              {selectedLesson.summary.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm sm:text-base text-slate-800 font-medium">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                playClickSound();
                setActivePart('knowledge');
              }}
              className="text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kiến thức</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setActivePart('mindmap');
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-6 py-2.5 rounded-2xl flex items-center space-x-2 shadow-sm transition-all"
            >
              <span>Xem Sơ Đồ Tư Duy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: SƠ ĐỒ KIẾN THỨC (MINDMAP) */}
      {activePart === 'mindmap' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-purple-600 font-extrabold text-sm uppercase tracking-wider">
              <span>🧠 Sơ đồ kiến thức tương tác (Mindmap)</span>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Bấm vào từng nhánh để xem chi tiết
            </span>
          </div>

          {/* Central Mindmap visual layout */}
          <div className="bg-slate-50 border-2 border-slate-200/80 rounded-3xl p-6 sm:p-10 flex flex-col items-center">
            {/* Center Node */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black text-base sm:text-xl px-6 py-4 rounded-3xl shadow-lg shadow-orange-100 text-center max-w-md mb-8 ring-4 ring-orange-200 animate-pulse">
              🎯 {selectedLesson.mindmap.centerTitle}
            </div>

            {/* Branches */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
              {selectedLesson.mindmap.nodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedMindmapNode(selectedMindmapNode === node.id ? null : node.id);
                  }}
                  className={`p-5 rounded-3xl border-2 cursor-pointer transition-all ${node.color} shadow-xs hover:shadow-md hover:scale-102`}
                >
                  <h4 className="font-extrabold text-base mb-3 flex items-center justify-between">
                    <span>{node.label}</span>
                    <span className="text-xs bg-white/80 px-2 py-0.5 rounded-full font-bold">
                      {node.children?.length || 0} ý
                    </span>
                  </h4>
                  <div className="space-y-2">
                    {node.children?.map((child) => (
                      <div
                        key={child.id}
                        className="bg-white/90 p-2.5 rounded-xl text-xs sm:text-sm font-medium border border-black/5 shadow-2xs"
                      >
                        • {child.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                playClickSound();
                setActivePart('summary');
              }}
              className="text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ghi nhớ</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setActivePart('quiz');
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-2.5 rounded-2xl flex items-center space-x-2 shadow-sm transition-all"
            >
              <span>Làm Kiểm Tra Nhanh (5 câu)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: KIỂM TRA NHANH (5 CÂU) */}
      {activePart === 'quiz' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-600 font-extrabold text-sm uppercase tracking-wider">
              <span>✍️ Kiểm tra nhanh 5 câu (Chấm điểm ngay)</span>
            </div>
            {quizSubmitted && (
              <button
                onClick={handleResetQuiz}
                className="text-xs font-bold text-slate-600 hover:text-emerald-600 flex items-center space-x-1 bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-xl border border-slate-200"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Làm lại</span>
              </button>
            )}
          </div>

          {/* 5 Questions */}
          <div className="space-y-6">
            {selectedLesson.quiz.map((q, qIndex) => {
              const selectedOpt = userAnswers[qIndex];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-3xl border-2 transition-all ${
                    quizSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-rose-50/60 border-rose-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start space-x-3 mb-4">
                    <span className="w-7 h-7 rounded-xl bg-slate-800 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      Câu {qIndex + 1}
                    </span>
                    <h4 className="font-bold text-sm sm:text-base text-slate-800 leading-snug">
                      {q.question}
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2.5 pl-0 sm:pl-10">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedOpt === optIndex;
                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400';

                      if (isSelected) {
                        btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs';
                      }

                      if (quizSubmitted) {
                        if (optIndex === q.correctAnswer) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-600 text-white border-rose-600 font-bold';
                        } else {
                          btnStyle = 'bg-white/60 border-slate-200 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          disabled={quizSubmitted}
                          onClick={() => handleAnswerSelect(qIndex, optIndex)}
                          className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border-2 text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && optIndex === q.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {quizSubmitted && (
                    <div className="mt-4 pt-3 border-t border-black/10 pl-0 sm:pl-10 text-xs sm:text-sm">
                      <p className={`font-bold ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {isCorrect ? "✓ Chính xác!" : "✗ Chưa đúng rồi!"}
                      </p>
                      <p className="text-slate-600 mt-1">
                        <span className="font-semibold">Giải thích: </span>
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action button */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              Đã chọn: <span className="font-bold text-slate-800">{Object.keys(userAnswers).length}/5 câu</span>
            </div>

            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3 rounded-2xl shadow-md shadow-emerald-200 hover:shadow-lg active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>NỘP BÀI CHẤM ĐIỂM</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-bold text-emerald-800">
                  🎉 Kết quả: {Object.values(userAnswers).filter((ans, idx) => ans === selectedLesson.quiz[idx].correctAnswer).length}/5 câu đúng
                </span>
                <button
                  onClick={() => {
                    playClickSound();
                    onSelectLesson(null);
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-sm transition-all"
                >
                  Hoàn thành & Về danh sách bài
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        lessonTitle={selectedLesson.title}
        lessonContext={selectedLesson.knowledge.keyPoints.map(k => `${k.heading}: ${k.content}`).join('\n')}
      />
    </div>
  );
}
