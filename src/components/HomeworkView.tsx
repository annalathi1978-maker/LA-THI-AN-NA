import { useState, useMemo } from 'react';
import { 
  Lesson, 
  PracticeQuestion, 
  SituationItem, 
  ApplyThoughtTask, 
  ApplyActionTask, 
  ApplyCreativeTask, 
  StudentProgress,
  LessonUploadedExercise 
} from '../types';
import { 
  FileEdit, 
  PenTool, 
  Lightbulb, 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  Filter, 
  Printer, 
  ArrowRight,
  BookOpen,
  Award,
  Layers,
  Check,
  HelpCircle,
  Lock,
  Clock,
  Send
} from 'lucide-react';
import { playClickSound, playCorrectSound } from '../utils/audio';
import { getStoredLessonExercises, DEFAULT_ADMIN_NAME } from '../utils/storage';
import PracticeView from './PracticeView';
import SituationsView from './SituationsView';
import ApplyView from './ApplyView';
import FamilyTreasureQuest from './FamilyTreasureQuest';
import InteractiveLesson1Worksheet from './InteractiveLesson1Worksheet';

export type HomeworkSubTab = 'all' | 'practice' | 'situations' | 'apply' | 'quest';

interface HomeworkViewProps {
  lessons: Lesson[];
  initialLessonFilter?: number | null;
  initialSubTab?: HomeworkSubTab;
  practiceQuestions: PracticeQuestion[];
  completedPracticeQuestionIds: string[];
  onCompletePracticeQuestion: (questionId: string) => void;
  situations: SituationItem[];
  solvedSituationIds: string[];
  onSolveSituation: (situationId: string) => void;
  thoughtTasks: ApplyThoughtTask[];
  actionTasks: ApplyActionTask[];
  creativeTasks: ApplyCreativeTask[];
  progress: StudentProgress;
  onSaveThoughtAnswer: (taskId: string, answer: string) => void;
  onToggleActionTask: (taskId: string) => void;
  onSubmitCreative: (submission: { id: string; taskId: string; title: string; type: string; content: string; submittedAt: string }) => void;
  onSaveQuestProgress: (score: number, commitment: { tradition: string; lessonLearned: string; sevenDayAction: string; completedAt: string }) => void;
  onOpenExportModal?: (defaultTab?: 'print' | 'save' | 'export') => void;
}

export default function HomeworkView({
  lessons,
  initialLessonFilter = null,
  initialSubTab = 'all',
  practiceQuestions,
  completedPracticeQuestionIds,
  onCompletePracticeQuestion,
  situations,
  solvedSituationIds,
  onSolveSituation,
  thoughtTasks,
  actionTasks,
  creativeTasks,
  progress,
  onSaveThoughtAnswer,
  onToggleActionTask,
  onSubmitCreative,
  onSaveQuestProgress,
  onOpenExportModal
}: HomeworkViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<HomeworkSubTab>(initialSubTab);
  const [selectedLessonId, setSelectedLessonId] = useState<number | 'all'>(initialLessonFilter || 'all');

  // Custom exercises uploaded by Cô An Na
  const [customExercises] = useState<LessonUploadedExercise[]>(getStoredLessonExercises());
  const [answeredCustom, setAnsweredCustom] = useState<Record<string, number>>({});
  const [multiAnswersCustom, setMultiAnswersCustom] = useState<Record<string, number[]>>({});
  const [essayAnswersCustom, setEssayAnswersCustom] = useState<Record<string, string>>({});
  const [submittedCustom, setSubmittedCustom] = useState<Record<string, boolean>>({});
  const [showExplanationCustom, setShowExplanationCustom] = useState<Record<string, boolean>>({});

  // Filter custom exercises by selected lesson
  const currentLessonCustomExercises = useMemo(() => {
    if (selectedLessonId === 'all') return customExercises;
    return customExercises.filter(e => e.lessonId === selectedLessonId);
  }, [customExercises, selectedLessonId]);

  // Stats calculation
  const totalPracticeCount = practiceQuestions.length;
  const completedPracticeCount = completedPracticeQuestionIds.length;
  const totalSituationsCount = situations.length;
  const solvedSituationsCount = solvedSituationIds.length;
  const thoughtAnswersCount = Object.keys(progress.thoughtAnswers || {}).length;
  const actionDoneCount = (progress.completedActionTaskIds || []).length;
  const creativeCount = (progress.creativeSubmissions || []).length;
  const totalApplyDone = thoughtAnswersCount + actionDoneCount + creativeCount;

  // Selected lesson data
  const currentLesson = typeof selectedLessonId === 'number' 
    ? lessons.find(l => l.id === selectedLessonId) 
    : null;

  // Filtered counts for selected lesson
  const lessonQuestions = useMemo(() => {
    if (selectedLessonId === 'all') return practiceQuestions;
    return practiceQuestions.filter(q => q.lessonId === selectedLessonId);
  }, [practiceQuestions, selectedLessonId]);

  const lessonSituations = useMemo(() => {
    if (selectedLessonId === 'all') return situations;
    return situations.filter(s => s.lessonId === selectedLessonId);
  }, [situations, selectedLessonId]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16">
      {/* Top Banner: BÀI TẬP Ở NHÀ */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl shadow-indigo-100">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-blue-100 border border-white/20">
            <FileEdit className="w-3.5 h-3.5 text-yellow-300" />
            <span>MÔN GIÁO DỤC CÔNG DÂN 6 • CHUẨN GDPT 2018</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            BÀI TẬP Ở NHÀ
          </h1>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-medium">
            Hệ thống bài tập tự luyện và rèn luyện kỹ năng công dân: Trắc nghiệm củng cố • Xử lý tình huống thực tế • Vận dụng hành động • Phiếu học tập tương tác!
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold">
            <div className="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/15 flex items-center space-x-1.5">
              <span>✍️ Trắc nghiệm:</span>
              <span className="text-yellow-300 font-bold">{completedPracticeCount}/{totalPracticeCount} câu</span>
            </div>
            <div className="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/15 flex items-center space-x-1.5">
              <span>💡 Tình huống:</span>
              <span className="text-yellow-300 font-bold">{solvedSituationsCount}/{totalSituationsCount}</span>
            </div>
            <div className="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/15 flex items-center space-x-1.5">
              <span>🚀 Vận dụng:</span>
              <span className="text-yellow-300 font-bold">{totalApplyDone} đã làm</span>
            </div>
            {progress.familyTreasureQuestCompleted && (
              <div className="bg-amber-400 text-slate-950 px-3 py-1.5 rounded-xl font-black flex items-center space-x-1 shadow-sm">
                <span>🏆 Phiếu Bài 1: Đạt {progress.familyTreasureQuestScore || 10}/10đ</span>
              </div>
            )}
          </div>
        </div>

        {/* Decorative corner icon */}
        <div className="absolute right-4 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
          📝
        </div>
      </section>

      {/* NAVIGATION SUB-TABS (GỘP LUYỆN TẬP, TÌNH HUỐNG, VẬN DỤNG & PHIẾU TƯƠNG TÁC) */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'Tất cả bài tập', icon: Layers, color: 'text-indigo-600' },
            { id: 'practice', label: '1. Luyện tập trắc nghiệm', icon: PenTool, color: 'text-emerald-600' },
            { id: 'situations', label: '2. Xử lý tình huống', icon: Lightbulb, color: 'text-purple-600' },
            { id: 'apply', label: '3. Vận dụng thực hành', icon: Rocket, color: 'text-rose-600' },
            { id: 'quest', label: '4. Phiếu tương tác (Bài 1)', icon: Sparkles, color: 'text-amber-600' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClickSound();
                  setActiveSubTab(tab.id as HomeworkSubTab);
                }}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {onOpenExportModal && (
          <button
            onClick={() => {
              playClickSound();
              onOpenExportModal('print');
            }}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            title="In phiếu bài tập về nhà"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In bài tập nộp cô</span>
          </button>
        )}
      </div>

      {/* FILTER BY LESSON SELECTOR */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span>Lọc bài tập theo bài học:</span>
          </label>
          {selectedLessonId !== 'all' && (
            <button
              onClick={() => {
                playClickSound();
                setSelectedLessonId('all');
              }}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Xem tất cả bài học
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => {
              playClickSound();
              setSelectedLessonId('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedLessonId === 'all'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
          >
            Tất cả 12 bài học
          </button>

          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => {
                playClickSound();
                setSelectedLessonId(lesson.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                selectedLessonId === lesson.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              <span>{lesson.icon}</span>
              <span>Bài {lesson.id}: {lesson.title.split(':')[1] || lesson.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW SUB-TAB 1: TẤT CẢ BÀI TẬP (DASHBOARD TỔNG HỢP THEO BÀI) */}
      {/* ========================================================================= */}
      {activeSubTab === 'all' && (
        <div className="space-y-6">
          {/* BANNER PHIẾU BÀI 1 NỔI BẬT NẾU CHỌN TẤT CẢ HOẶC CHỌN BÀI 1 */}
          {(selectedLessonId === 'all' || selectedLessonId === 1) && (
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 text-white shadow-lg shadow-orange-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-orange-300">
              <div className="space-y-1 max-w-2xl">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-100">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                  <span>PHIẾU HỌC TẬP TƯƠNG TÁC ĐẶC BIỆT • BÀI 1</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">
                  🏡 Giải Mã Kho Báu Gia Đình (12 màn tương tác 3D)
                </h3>
                <p className="text-xs sm:text-sm text-amber-100">
                  Hành trình 5 chặng: Cánh cửa gia đình → Giải mã truyền thống → Hiểu giá trị → Chọn hành động → Mở khóa kho báu & Cam kết 7 ngày!
                </p>
                {progress.familyTreasureQuestCompleted && (
                  <div className="pt-1 flex items-center space-x-1.5 text-xs font-bold text-yellow-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Em đã hoàn thành xuất sắc ({progress.familyTreasureQuestScore || 10}/10đ). Em có thể làm lại bất cứ lúc nào!</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setActiveSubTab('quest');
                }}
                className="shrink-0 bg-white text-orange-600 hover:bg-amber-50 font-black text-sm px-6 py-3.5 rounded-2xl shadow-md active:scale-95 transition-all flex items-center space-x-2"
              >
                <span>{progress.familyTreasureQuestCompleted ? 'LÀM LẠI PHIẾU' : 'BẮT ĐẦU GIẢI MÃ (+30 ⭐)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* DANH SÁCH 3 KHỐI BÀI TẬP CHÍNH */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* KHỐI 1: TRẮC NGHIỆM */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
                  ✍️
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Luyện Tập Trắc Nghiệm
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Trắc nghiệm ABCD, Đúng - Sai và câu hỏi tình huống có chấm điểm tức thì và giải thích chi tiết.
                  </p>
                </div>
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl inline-block border border-emerald-200">
                  {selectedLessonId === 'all'
                    ? `Tổng số: ${totalPracticeCount} câu (${completedPracticeCount} đã làm)`
                    : `Bài ${selectedLessonId}: ${lessonQuestions.length} câu hỏi`}
                </div>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveSubTab('practice');
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5 active:scale-95"
              >
                <span>Làm trắc nghiệm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* KHỐI 2: TÌNH HUỐNG */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl">
                  💡
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Xử Lý Tình Huống
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    "Em sẽ làm gì?" — Xử lý các tình huống đạo đức và pháp luật diễn ra hàng ngày trong gia đình và trường lớp.
                  </p>
                </div>
                <div className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl inline-block border border-purple-200">
                  {selectedLessonId === 'all'
                    ? `Tổng số: ${totalSituationsCount} tình huống (${solvedSituationsCount} đã giải)`
                    : `Bài ${selectedLessonId}: ${lessonSituations.length} tình huống`}
                </div>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveSubTab('situations');
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5 active:scale-95"
              >
                <span>Xử lý tình huống</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* KHỐI 3: VẬN DỤNG */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs flex flex-col justify-between hover:border-rose-300 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl">
                  🚀
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Vận Dụng Thực Hành
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Góc suy ngẫm cá nhân, kế hoạch hành động 7 ngày và dự án sáng tạo (viết thư, vẽ tranh, khẩu hiệu).
                  </p>
                </div>
                <div className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl inline-block border border-rose-200">
                  {totalApplyDone} nhiệm vụ đã hoàn thành
                </div>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  setActiveSubTab('apply');
                }}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm py-2.5 px-4 rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1.5 active:scale-95"
              >
                <span>Làm bài vận dụng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* GIAO BÀI TẬP VỀ NHÀ CHI TIẾT THEO BÀI ĐÃ CHỌN NẾU CHỌN CỤ THỂ 1 BÀI */}
          {currentLesson && (
            <div className="bg-white rounded-3xl border border-indigo-200 p-6 sm:p-7 space-y-5 shadow-xs">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                <span className="text-3xl">{currentLesson.icon}</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    Gói bài tập về nhà: {currentLesson.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    {currentLesson.shortDesc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <h4 className="font-extrabold text-xs text-emerald-900 uppercase">
                    1. Trắc nghiệm ({lessonQuestions.length} câu)
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Kiểm tra và củng cố kiến thức trọng tâm của bài.
                  </p>
                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveSubTab('practice');
                    }}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline flex items-center space-x-1 pt-1"
                  >
                    <span>Làm ngay</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
                  <h4 className="font-extrabold text-xs text-purple-900 uppercase">
                    2. Tình huống ({lessonSituations.length} tình huống)
                  </h4>
                  <p className="text-xs text-purple-800">
                    Đưa ra giải pháp đúng đắn, nhân văn và có trách nhiệm.
                  </p>
                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveSubTab('situations');
                    }}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900 underline flex items-center space-x-1 pt-1"
                  >
                    <span>Giải quyết ngay</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                  <h4 className="font-extrabold text-xs text-rose-900 uppercase">
                    3. Vận dụng & Kế hoạch
                  </h4>
                  <p className="text-xs text-rose-800">
                    Áp dụng vào cuộc sống thực tế hàng ngày của em.
                  </p>
                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveSubTab('apply');
                    }}
                    className="text-xs font-bold text-rose-700 hover:text-rose-900 underline flex items-center space-x-1 pt-1"
                  >
                    <span>Thực hành ngay</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PHẦN BÀI TẬP ĐƯỢC CÔ AN NA TẢI LÊN CHO BÀI HỌC (NẾU CÓ) */}
          {currentLessonCustomExercises.length > 0 && (
            <div className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 rounded-3xl border-2 border-purple-200 p-6 sm:p-7 space-y-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center text-lg font-black shadow-xs">
                    ✍️
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                      BÀI TẬP DO CÔ AN NA TẢI LÊN
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                      {selectedLessonId === 'all' 
                        ? `Đề bài tập tự tạo (${currentLessonCustomExercises.length} câu toàn khóa)` 
                        : `Bài tập riêng cho Bài ${selectedLessonId} (${currentLessonCustomExercises.length} câu)`}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-bold text-purple-800 bg-purple-100/80 px-3 py-1 rounded-xl self-start sm:self-auto border border-purple-200">
                  {DEFAULT_ADMIN_NAME} biên soạn
                </span>
              </div>

              <div className="space-y-4">
                {currentLessonCustomExercises.map((q, qIdx) => {
                  const isSubmitted = submittedCustom[q.id] || false;
                  const studentAnswer = answeredCustom[q.id];
                  const studentMulti = multiAnswersCustom[q.id] || [];
                  const studentEssay = essayAnswersCustom[q.id] || '';
                  const isShowingExplain = showExplanationCustom[q.id];

                  // Grade calculation
                  let isCorrect = false;
                  if (q.type === 'choice' || q.type === 'true_false') {
                    isCorrect = isSubmitted && q.correctAnswer !== undefined && studentAnswer === q.correctAnswer;
                  } else if (q.type === 'multiselect' && q.correctAnswers) {
                    const sortedCorrect = [...q.correctAnswers].sort();
                    const sortedStudent = [...studentMulti].sort();
                    isCorrect = isSubmitted && sortedCorrect.length === sortedStudent.length && sortedCorrect.every((val, i) => val === sortedStudent[i]);
                  }

                  return (
                    <div 
                      key={q.id}
                      className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs space-y-3.5 transition-all"
                    >
                      {/* Question Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                        <div className="flex items-start space-x-2.5">
                          <span className="bg-purple-700 text-white text-xs font-black px-2.5 py-1 rounded-lg shrink-0 mt-0.5">
                            Câu {qIdx + 1}
                          </span>
                          <div>
                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                              <span className="text-[11px] font-bold text-purple-600">
                                {q.lessonTitle}
                              </span>
                              {q.stageName && (
                                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                                  {q.stageName}
                                </span>
                              )}
                              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                {q.type === 'multiselect' ? 'Chọn nhiều đáp án' :
                                 q.type === 'true_false' ? 'Đúng / Sai' :
                                 q.type === 'situation' ? 'Tình huống' :
                                 q.type === 'essay' ? 'Tự luận' : 'Trắc nghiệm ABCD'}
                              </span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                              {q.question}
                            </h4>
                          </div>
                        </div>

                        {/* Submission status */}
                        {isSubmitted ? (
                          <div className="flex items-center space-x-2 self-start sm:self-auto shrink-0">
                            <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-lg flex items-center space-x-1 border border-slate-200">
                              <Lock className="w-3 h-3 text-slate-500" />
                              <span>Đã nộp (Khóa)</span>
                            </span>
                            {(q.type === 'choice' || q.type === 'true_false' || (q.type === 'multiselect' && q.correctAnswers)) && (
                              <span className={`text-xs font-black px-2.5 py-1 rounded-lg flex items-center space-x-1 ${
                                isCorrect 
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                                  : 'bg-rose-100 text-rose-800 border border-rose-300'
                              }`}>
                                <span>{isCorrect ? '✓ Đúng (+10đ)' : '✕ Chưa chính xác'}</span>
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 flex items-center space-x-1 self-start shrink-0">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Đang làm bài</span>
                          </span>
                        )}
                      </div>

                      {/* 1. TYPE: MULTISELECT (Checkboxes) */}
                      {q.type === 'multiselect' && q.options && (
                        <div className="space-y-2 pt-1">
                          <p className="text-xs text-purple-800 font-semibold italic">
                            * Nhấp vào các ô bên dưới để chọn nhiều đáp án đúng, sau đó nhấn "Nộp câu trả lời":
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, oIdx) => {
                              const isChecked = studentMulti.includes(oIdx);
                              const isOptionCorrect = q.correctAnswers?.includes(oIdx);

                              let cardStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-purple-50";
                              if (isSubmitted) {
                                if (isOptionCorrect && isChecked) {
                                  cardStyle = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold";
                                } else if (!isOptionCorrect && isChecked) {
                                  cardStyle = "bg-rose-100 border-rose-300 text-rose-950 font-bold";
                                } else if (isOptionCorrect && !isChecked) {
                                  cardStyle = "bg-amber-50 border-amber-300 text-amber-900 border-dashed";
                                } else {
                                  cardStyle = "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60";
                                }
                              } else if (isChecked) {
                                cardStyle = "bg-purple-100 border-purple-400 text-purple-950 font-bold shadow-xs";
                              }

                              return (
                                <button
                                  key={oIdx}
                                  type="button"
                                  disabled={isSubmitted}
                                  onClick={() => {
                                    playClickSound();
                                    setMultiAnswersCustom(prev => {
                                      const current = prev[q.id] || [];
                                      const updated = current.includes(oIdx)
                                        ? current.filter(i => i !== oIdx)
                                        : [...current, oIdx];
                                      return { ...prev, [q.id]: updated };
                                    });
                                  }}
                                  className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center space-x-2.5 ${cardStyle}`}
                                >
                                  <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold border transition-colors shrink-0 ${
                                    isChecked 
                                      ? 'bg-purple-700 text-white border-purple-700' 
                                      : 'bg-white border-slate-300 text-transparent'
                                  }`}>
                                    ✓
                                  </div>
                                  <span className="grow">{opt.replace(/^[A-Da-d][\s.):-]\s*/, '')}</span>
                                  {isSubmitted && isOptionCorrect && (
                                    <span className="text-[10px] text-emerald-700 font-black">Đáp án đúng</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {!isSubmitted && (
                            <div className="pt-2 flex justify-end">
                              <button
                                type="button"
                                disabled={studentMulti.length === 0}
                                onClick={() => {
                                  playClickSound();
                                  setSubmittedCustom(prev => ({ ...prev, [q.id]: true }));
                                  if (isCorrect) playCorrectSound();
                                }}
                                className="bg-purple-700 hover:bg-purple-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm active:scale-95 transition-all"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>NỘP CÂU TRẢ LỜI ({studentMulti.length} đã chọn)</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 2. TYPE: TRUE / FALSE */}
                      {q.type === 'true_false' && (
                        <div className="space-y-2 pt-1">
                          <p className="text-xs text-purple-800 font-semibold italic">
                            * Em hãy lựa chọn nhận định trên là Đúng hay Sai:
                          </p>
                          <div className="grid grid-cols-2 gap-3 max-w-md">
                            {[
                              { label: '✓ ĐÚNG', value: 0 },
                              { label: '✕ SAI', value: 1 }
                            ].map((item) => {
                              const isChosen = studentAnswer === item.value;
                              const isOptionCorrect = q.correctAnswer === item.value;

                              let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-purple-50";
                              if (isSubmitted) {
                                if (isOptionCorrect) {
                                  btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold";
                                } else if (isChosen) {
                                  btnStyle = "bg-rose-100 border-rose-300 text-rose-900";
                                } else {
                                  btnStyle = "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60";
                                }
                              } else if (isChosen) {
                                btnStyle = "bg-purple-100 border-purple-400 text-purple-950 font-bold";
                              }

                              return (
                                <button
                                  key={item.value}
                                  type="button"
                                  disabled={isSubmitted}
                                  onClick={() => {
                                    playClickSound();
                                    setAnsweredCustom(prev => ({ ...prev, [q.id]: item.value }));
                                    setSubmittedCustom(prev => ({ ...prev, [q.id]: true }));
                                    if (q.correctAnswer === item.value) playCorrectSound();
                                  }}
                                  className={`p-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all ${btnStyle}`}
                                >
                                  {item.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 3. TYPE: CHOICE (Standard ABCD) */}
                      {q.type === 'choice' && q.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          {q.options.map((opt, oIdx) => {
                            const isChosen = studentAnswer === oIdx;
                            const isOptionCorrect = q.correctAnswer === oIdx;

                            let btnStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-purple-50 hover:border-purple-300";
                            if (isSubmitted) {
                              if (isOptionCorrect) {
                                btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold";
                              } else if (isChosen) {
                                btnStyle = "bg-rose-100 border-rose-300 text-rose-900";
                              } else {
                                btnStyle = "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60";
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                type="button"
                                disabled={isSubmitted}
                                onClick={() => {
                                  playClickSound();
                                  setAnsweredCustom(prev => ({ ...prev, [q.id]: oIdx }));
                                  setSubmittedCustom(prev => ({ ...prev, [q.id]: true }));
                                  if (q.correctAnswer === oIdx) {
                                    playCorrectSound();
                                  }
                                }}
                                className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start space-x-2 ${btnStyle}`}
                              >
                                <span className="font-bold shrink-0">{String.fromCharCode(65 + oIdx)}.</span>
                                <span className="grow">{opt.replace(/^[A-Da-d][\s.):-]\s*/, '')}</span>
                                {isSubmitted && isOptionCorrect && (
                                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* 4. TYPE: SITUATION / ESSAY */}
                      {(q.type === 'situation' || q.type === 'essay') && (
                        <div className="space-y-2 pt-1">
                          <textarea
                            rows={3}
                            disabled={isSubmitted}
                            value={studentEssay}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEssayAnswersCustom(prev => ({ ...prev, [q.id]: val }));
                            }}
                            placeholder="Nhập câu trả lời hoặc cách giải quyết tình huống của em tại đây..."
                            className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-slate-100 disabled:text-slate-600"
                          />
                          {!isSubmitted && (
                            <div className="flex justify-end">
                              <button
                                type="button"
                                disabled={!studentEssay.trim()}
                                onClick={() => {
                                  playClickSound();
                                  setSubmittedCustom(prev => ({ ...prev, [q.id]: true }));
                                  playCorrectSound();
                                }}
                                className="bg-purple-700 hover:bg-purple-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm active:scale-95 transition-all"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>NỘP BÀI TỰ LUẬN (KHÔNG ĐƯỢC SỬA LẠI)</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Explanation toggle / display (available after submission) */}
                      {isSubmitted && (
                        <div className="pt-2 border-t border-slate-100 space-y-2">
                          <button
                            type="button"
                            onClick={() => {
                              playClickSound();
                              setShowExplanationCustom(prev => ({ ...prev, [q.id]: !prev[q.id] }));
                            }}
                            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center space-x-1"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>{isShowingExplain ? 'Ẩn lời giải & hướng dẫn' : 'Xem lời giải & hướng dẫn của Cô An Na'}</span>
                          </button>

                          {isShowingExplain && (
                            <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 space-y-1.5 animate-fadeIn">
                              {q.explanation && (
                                <p><strong>Lời giải & gợi ý chi tiết:</strong> {q.explanation}</p>
                              )}
                              {q.teacherNote && (
                                <p className="text-purple-800 italic">
                                  <strong>Ghi chú giáo viên:</strong> {q.teacherNote}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW SUB-TAB 2: LUYỆN TẬP TRẮC NGHIỆM */}
      {/* ========================================================================= */}
      {activeSubTab === 'practice' && (
        <PracticeView
          questions={practiceQuestions}
          lessons={lessons}
          initialLessonFilter={typeof selectedLessonId === 'number' ? selectedLessonId : null}
          completedQuestionIds={completedPracticeQuestionIds}
          onCompleteQuestion={onCompletePracticeQuestion}
        />
      )}

      {/* ========================================================================= */}
      {/* VIEW SUB-TAB 3: XỬ LÝ TÌNH HUỐNG */}
      {/* ========================================================================= */}
      {activeSubTab === 'situations' && (
        <SituationsView
          situations={lessonSituations.length > 0 ? lessonSituations : situations}
          solvedSituationIds={solvedSituationIds}
          onSolveSituation={onSolveSituation}
        />
      )}

      {/* ========================================================================= */}
      {/* VIEW SUB-TAB 4: VẬN DỤNG THỰC HÀNH */}
      {/* ========================================================================= */}
      {activeSubTab === 'apply' && (
        <ApplyView
          thoughtTasks={thoughtTasks}
          actionTasks={actionTasks}
          creativeTasks={creativeTasks}
          progress={progress}
          onSaveThoughtAnswer={onSaveThoughtAnswer}
          onToggleActionTask={onToggleActionTask}
          onSubmitCreative={onSubmitCreative}
        />
      )}

      {/* ========================================================================= */}
      {/* VIEW SUB-TAB 5: PHIẾU BÀI TẬP TƯƠNG TÁC (BÀI 1 - 5 CHẶNG THỬ THÁCH) */}
      {/* ========================================================================= */}
      {activeSubTab === 'quest' && (
        <InteractiveLesson1Worksheet
          onBack={() => setActiveSubTab('all')}
          progress={progress}
          onSaveProgress={onSaveQuestProgress}
        />
      )}
    </div>
  );
}
