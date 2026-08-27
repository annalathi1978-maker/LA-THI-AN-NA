import React, { useState } from 'react';
import { StudentProgress, Lesson } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { SITUATIONS_DATA } from '../data/situationsData';
import { APPLY_THOUGHT_TASKS, APPLY_ACTION_TASKS } from '../data/applyData';
import { History, CheckCircle2, Award, Calendar, Clock, BookOpen, PenTool, Lightbulb, Rocket, Printer, Download, Sparkles, Filter, FileText, ArrowRight } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HistoryViewProps {
  progress: StudentProgress;
  onNavigate: (tab: any, lessonId?: number) => void;
  onOpenExportModal: (defaultTab?: 'print' | 'save' | 'export') => void;
}

type HistoryFilterType = 'all' | 'quiz' | 'practice' | 'situation' | 'apply';

export default function HistoryView({
  progress,
  onNavigate,
  onOpenExportModal
}: HistoryViewProps) {
  const [filterType, setFilterType] = useState<HistoryFilterType>('all');
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<number | 'all'>('all');

  const quizAttempts = progress.quizAttempts || [];
  const completedLessons = progress.completedLessons || [];
  const solvedSituations = progress.solvedSituationIds || [];
  const creativeSubmissions = progress.creativeSubmissions || [];
  const thoughtAnswers = progress.thoughtAnswers || {};
  const thoughtDates = progress.thoughtAnswerDates || {};
  const completedActions = progress.completedActionTaskIds || [];

  // Calculate stats
  const totalQuizScore = Object.values(progress.quizScores || {});
  const avgQuizScore = totalQuizScore.length > 0
    ? (totalQuizScore.reduce((a, b) => a + b, 0) / (totalQuizScore.length * 5)) * 10
    : 0;

  // Filter items
  const filteredQuizAttempts = quizAttempts.filter(q => 
    (selectedLessonFilter === 'all' || q.lessonId === selectedLessonFilter)
  );

  const filteredCreativeSubmissions = creativeSubmissions.filter(s => {
    const task = APPLY_ACTION_TASKS.find(t => t.id === s.taskId);
    return true;
  });

  const handlePrintHistory = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16">
      {/* Top Banner & Quick Actions */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-blue-100 text-xs font-bold backdrop-blur-md">
              <History className="w-3.5 h-3.5" />
              <span>HỒ SƠ HỌC TẬP CÔNG DÂN NHÍ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Lịch Sử & Tiến Độ Học Tập
            </h1>
            <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
              Theo dõi chi tiết các lần làm bài kiểm tra 10 bài học, lịch sử giải quyết tình huống từ 3 bộ SGK (Cánh Diều, Chân Trời Sáng Tạo, Kết Nối Tri Thức), bài nộp tự luận và sản phẩm sáng tạo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrintHistory}
              className="px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-2xl text-xs sm:text-sm shadow-md flex items-center space-x-2 transition-transform active:scale-95"
            >
              <Printer className="w-4 h-4 text-blue-700" />
              <span>In Lịch Sử</span>
            </button>
            <button
              onClick={() => onOpenExportModal('export')}
              className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl text-xs sm:text-sm backdrop-blur-md flex items-center space-x-2 transition-transform active:scale-95 border border-white/30"
            >
              <Download className="w-4 h-4" />
              <span>Xuất Dữ Liệu</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/20">
          <div className="bg-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-xs">
            <p className="text-xs text-blue-200 font-medium">Bài học hoàn thành</p>
            <p className="text-xl sm:text-2xl font-black text-white mt-1">
              {completedLessons.length} / 10
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-xs">
            <p className="text-xs text-blue-200 font-medium">Điểm TB Kiểm tra</p>
            <p className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
              {avgQuizScore.toFixed(1)} <span className="text-xs text-white/80 font-normal">/ 10</span>
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-xs">
            <p className="text-xs text-blue-200 font-medium">Tình huống đã xử lý</p>
            <p className="text-xl sm:text-2xl font-black text-emerald-300 mt-1">
              {solvedSituations.length} <span className="text-xs text-white/80 font-normal">tình huống</span>
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-xs">
            <p className="text-xs text-blue-200 font-medium">Bài nộp & Sáng tạo</p>
            <p className="text-xl sm:text-2xl font-black text-pink-300 mt-1">
              {Object.keys(thoughtAnswers).length + creativeSubmissions.length} <span className="text-xs text-white/80 font-normal">bài nộp</span>
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Type Filter */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'Tất cả hoạt động', icon: Sparkles },
            { id: 'quiz', label: 'Kiểm tra 10 bài', icon: BookOpen },
            { id: 'situation', label: 'Tình huống thực tế', icon: Lightbulb },
            { id: 'apply', label: 'Bài nộp tự luận & sáng tạo', icon: Rocket },
          ].map(f => {
            const Icon = f.icon;
            const active = filterType === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  playClickSound();
                  setFilterType(f.id as HistoryFilterType);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Lesson Filter */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedLessonFilter}
            onChange={(e) => setSelectedLessonFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="all">Tất cả 10 bài học</option>
            {LESSONS_DATA.map(l => (
              <option key={l.id} value={l.id}>
                Bài {l.id}: {l.title.split(':')[1]?.trim() || l.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content History Streams */}
      <div className="space-y-6">
        {/* 1. SECTION: Quizzes History */}
        {(filterType === 'all' || filterType === 'quiz') && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                  📝
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800">
                    Lịch Sử Kiểm Tra Trắc Nghiệm (10 Bài Học)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Ghi nhận tất cả các lần làm bài kiểm tra nhanh 5 câu hỏi của học sinh
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {filteredQuizAttempts.length} lần kiểm tra
              </span>
            </div>

            {filteredQuizAttempts.length === 0 ? (
              <div className="text-center py-8 text-slate-400 space-y-3">
                <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
                <p className="text-sm">Chưa có bản ghi kiểm tra nào cho bộ lọc này.</p>
                <button
                  onClick={() => onNavigate('lessons', 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                >
                  Học bài và làm kiểm tra ngay
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredQuizAttempts.map((attempt) => {
                  const lesson = LESSONS_DATA.find(l => l.id === attempt.lessonId);
                  const isPerfect = attempt.score === 5;
                  return (
                    <div
                      key={attempt.id}
                      className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all bg-slate-50/50 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-2xl">{lesson?.icon || "📖"}</span>
                          <div>
                            <h3 className="text-sm font-extrabold text-slate-800 line-clamp-1">
                              {attempt.lessonTitle}
                            </h3>
                            <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{attempt.timestamp}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Score Badge */}
                        <div className={`text-right px-3 py-1 rounded-xl text-xs font-black ${
                          isPerfect
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : attempt.score >= 4
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {attempt.score} / 5 câu
                          <span className="block text-[10px] font-bold text-slate-500">
                            {attempt.percentage}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200">
                        <span className="flex items-center space-x-1 text-emerald-600 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Đã lưu vào học bạ</span>
                        </span>

                        <button
                          onClick={() => {
                            playClickSound();
                            onNavigate('lessons', attempt.lessonId);
                          }}
                          className="font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                        >
                          <span>Làm lại bài</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 2. SECTION: Situations Solved History */}
        {(filterType === 'all' || filterType === 'situation') && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
                  💡
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800">
                    Tình Huống Thực Tế Đã Xử Lý Thành Công
                  </h2>
                  <p className="text-xs text-slate-500">
                    Các bài toán ứng xử công dân từ 3 bộ sách (phòng chống bắt nạt, báo cháy 114, lòng trung thực...)
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                {solvedSituations.length} tình huống
              </span>
            </div>

            {solvedSituations.length === 0 ? (
              <div className="text-center py-8 text-slate-400 space-y-3">
                <Lightbulb className="w-12 h-12 mx-auto text-slate-300" />
                <p className="text-sm">Chưa có tình huống nào được giải quyết.</p>
                <button
                  onClick={() => onNavigate('situations')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700"
                >
                  Khám phá tình huống ngay
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solvedSituations.map(sitId => {
                  const sit = SITUATIONS_DATA.find(s => s.id === sitId);
                  if (!sit) return null;
                  if (selectedLessonFilter !== 'all' && sit.lessonId !== selectedLessonFilter) return null;
                  
                  return (
                    <div
                      key={sit.id}
                      className="p-4 sm:p-5 rounded-2xl border border-purple-100 bg-purple-50/30 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                          {sit.lessonTitle}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Đạt chuẩn</span>
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-800">
                        {sit.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 italic">
                        "{sit.scenario}"
                      </p>

                      <div className="pt-2 border-t border-purple-100 text-[11px] text-purple-900 bg-white/80 p-2.5 rounded-xl">
                        <span className="font-bold text-purple-700">Bài học rút ra: </span>
                        {sit.lessonLearned}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 3. SECTION: Apply & Submissions History */}
        {(filterType === 'all' || filterType === 'apply') && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
                  🚀
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800">
                    Bài Nộp Tự Luận & Sản Phẩm Sáng Tạo
                  </h2>
                  <p className="text-xs text-slate-500">
                    Nhật ký rèn luyện tự lập, thông điệp yêu thương, poster và bài suy nghĩ của học sinh
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                {Object.keys(thoughtAnswers).length + creativeSubmissions.length} bài nộp
              </span>
            </div>

            {/* Submissions Cards */}
            <div className="space-y-4">
              {/* Creative Submissions */}
              {filteredCreativeSubmissions.map(sub => (
                <div key={sub.id} className="p-5 rounded-2xl border border-rose-200 bg-rose-50/20 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full uppercase">
                        Sản phẩm {sub.type}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-800 mt-1">
                        {sub.title}
                      </h3>
                      <p className="text-[11px] text-slate-500">Đã nộp ngày: {sub.submittedAt}</p>
                    </div>
                    {sub.score && (
                      <div className="px-3 py-1.5 bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs font-black text-center">
                        Điểm: {sub.score} / 10
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                    {sub.content}
                  </div>

                  {sub.teacherComment && (
                    <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl text-xs text-purple-900 space-y-1">
                      <p className="font-bold flex items-center space-x-1.5 text-purple-700">
                        <Award className="w-3.5 h-3.5" />
                        <span>Lời phê của Giáo viên:</span>
                      </p>
                      <p className="italic">{sub.teacherComment}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Thought Entries */}
              {Object.entries(thoughtAnswers).map(([taskId, answer]) => {
                const task = APPLY_THOUGHT_TASKS.find(t => t.id === taskId);
                const date = thoughtDates[taskId] || "Gần đây";
                if (!task) return null;
                if (selectedLessonFilter !== 'all' && task.lessonId !== selectedLessonFilter) return null;

                return (
                  <div key={taskId} className="p-4 sm:p-5 rounded-2xl border border-blue-100 bg-blue-50/20 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                        {task.lessonTitle} • Em Suy Nghĩ
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{date}</span>
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-800">
                      Câu hỏi: {task.question}
                    </h3>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed italic">
                      "{answer}"
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
