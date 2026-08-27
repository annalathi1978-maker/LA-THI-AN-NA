import { TabType, Lesson, TeacherAssignment } from '../types';
import { BookOpen, PenTool, Lightbulb, ArrowRight, Sparkles, CheckCircle2, Award, Calendar, Bell, Rocket } from 'lucide-react';
import { playClickSound, playCorrectSound, playFanfareSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface HomeViewProps {
  onNavigate: (tab: TabType, lessonId?: number) => void;
  lastActiveLesson: Lesson;
  assignments: TeacherAssignment[];
  todayChallengeCompleted: boolean;
  onCompleteTodayChallenge: () => void;
  completedLessonsCount: number;
  totalLessons: number;
}

export default function HomeView({
  onNavigate,
  lastActiveLesson,
  assignments,
  todayChallengeCompleted,
  onCompleteTodayChallenge,
  completedLessonsCount,
  totalLessons
}: HomeViewProps) {
  const latestAssignment = assignments.length > 0 ? assignments[assignments.length - 1] : null;

  const handleChallenge = () => {
    if (todayChallengeCompleted) return;
    playCorrectSound();
    playFanfareSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onCompleteTodayChallenge();
  };

  return (
    <div className="space-y-8 sm:space-y-10 pb-12 animate-fadeIn">
      {/* KHU VỰC 1: HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-6 sm:p-10 shadow-xl shadow-orange-100">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold text-amber-50 mb-3 border border-white/25">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>Môn Giáo Dục Công Dân 6 • GDPT 2018</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-2">
            HÀNH TRANG CÔNG DÂN 6
          </h1>
          <p className="text-base sm:text-xl font-medium text-amber-100 mb-6">
            Học để hiểu – Hiểu để hành động 🌱
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold">
            <div className="bg-black/15 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/20 flex items-center space-x-1.5">
              <span>📚 Tiến độ:</span>
              <span className="text-yellow-300 font-bold">{completedLessonsCount}/{totalLessons} bài</span>
            </div>
            <div className="bg-black/15 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/20 flex items-center space-x-1.5">
              <span>🎯 Mục tiêu:</span>
              <span>Tự tin, Trung thực, Tự lập</span>
            </div>
          </div>
        </div>

        {/* Decorative Floating Emoticons */}
        <div className="absolute right-4 -bottom-6 text-7xl sm:text-9xl opacity-20 select-none pointer-events-none">
          🎒
        </div>
      </section>

      {/* Thông báo từ Giáo viên nếu có */}
      {latestAssignment && (
        <div className="p-4 sm:p-5 rounded-2xl bg-purple-50 border-2 border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs animate-slideDown">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-purple-900">
                  {latestAssignment.teacherName} vừa giao cho em nhiệm vụ mới!
                </span>
                <span className="text-[10px] bg-purple-200 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                  {latestAssignment.targetClass}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-purple-800 mt-0.5">
                Nhiệm vụ: <span className="font-bold">{latestAssignment.lessonTitle}</span> ({latestAssignment.type === 'practice' ? 'Luyện tập' : 'Tình huống'} • {latestAssignment.questionCount} câu) — Hạn nộp: <span className="font-semibold text-rose-600">{latestAssignment.dueDate}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onNavigate(latestAssignment.type === 'situation' ? 'situations' : 'practice', latestAssignment.lessonId);
            }}
            className="shrink-0 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center space-x-1.5 active:scale-95"
          >
            <span>Làm bài ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KHU VỰC 2: TIẾP TỤC HỌC */}
      <section className="bg-white rounded-3xl border-2 border-slate-100 p-6 sm:p-7 shadow-sm hover:border-amber-200 transition-all">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Tiếp tục học
          </span>
          <span className="text-xs font-semibold text-slate-600">
            Bài gần nhất của em
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-3xl flex items-center justify-center border border-amber-200 shadow-inner">
              {lastActiveLesson.icon}
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-800">
                {lastActiveLesson.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 line-clamp-1 mt-0.5">
                {lastActiveLesson.shortDesc}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onNavigate('lessons', lastActiveLesson.id);
            }}
            className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm sm:text-base px-6 py-3 rounded-2xl shadow-md shadow-orange-200 hover:shadow-lg active:scale-95 transition-all"
          >
            <span>TIẾP TỤC HỌC</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* KHU VỰC 3: 3 NÚT LỚN */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight flex items-center space-x-2">
            <span>3 Bước Học Tập Cốt Lõi</span>
          </h2>
          <span className="text-xs font-semibold text-slate-600">
            Khám phá kiến thức toàn diện
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* NÚT 1: HỌC BÀI */}
          <button
            onClick={() => {
              playClickSound();
              onNavigate('lessons');
            }}
            className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 sm:p-7 rounded-3xl shadow-lg shadow-blue-100 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 active:translate-y-0 transition-all text-left flex flex-col justify-between min-h-[170px]"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                📖
              </div>
              <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Bước 1
              </span>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black mb-1">
                HỌC BÀI
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-snug">
                10 bài chuẩn GDCD 6 • Sơ đồ tư duy & Ghi nhớ
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-blue-100 group-hover:text-white mt-3 pt-2 border-t border-white/15">
              <span>Bắt đầu học</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* NÚT 2: LUYỆN TẬP */}
          <button
            onClick={() => {
              playClickSound();
              onNavigate('practice');
            }}
            className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 sm:p-7 rounded-3xl shadow-lg shadow-emerald-100 hover:shadow-xl hover:shadow-emerald-200 hover:-translate-y-1 active:translate-y-0 transition-all text-left flex flex-col justify-between min-h-[170px]"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                ✍️
              </div>
              <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Bước 2
              </span>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black mb-1">
                LUYỆN TẬP
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-snug">
                Trắc nghiệm ABCD • Đúng - Sai • Phản xạ nhanh
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-100 group-hover:text-white mt-3 pt-2 border-t border-white/15">
              <span>Luyện tập ngay</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* NÚT 3: TÌNH HUỐNG */}
          <button
            onClick={() => {
              playClickSound();
              onNavigate('situations');
            }}
            className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 sm:p-7 rounded-3xl shadow-lg shadow-purple-100 hover:shadow-xl hover:shadow-purple-200 hover:-translate-y-1 active:translate-y-0 transition-all text-left flex flex-col justify-between min-h-[170px]"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                💡
              </div>
              <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Bước 3
              </span>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black mb-1">
                TÌNH HUỐNG
              </h3>
              <p className="text-xs sm:text-sm text-purple-100 leading-snug">
                "Em sẽ làm gì?" • Xử lý khéo léo đời sống thực tế
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-purple-100 group-hover:text-white mt-3 pt-2 border-t border-white/15">
              <span>Giải quyết tình huống</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </section>

      {/* KHU VỰC 4: THỬ THÁCH HÔM NAY */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
              ⚡
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-amber-800 uppercase tracking-wide bg-amber-200/70 px-2.5 py-0.5 rounded-full">
                  Thử Thách Hôm Nay
                </span>
                <span className="text-xs text-amber-900 font-semibold flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> Mỗi ngày một việc tốt
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mt-1">
                "Nói lời cảm ơn ít nhất 3 người (cha mẹ, thầy cô, bạn bè) trong hôm nay và tắt hết quạt, đèn trước khi rời khỏi lớp học."
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Hoàn thành để rèn luyện thói quen công dân văn minh và nhận thêm điểm rèn luyện!
              </p>
            </div>
          </div>

          <button
            onClick={handleChallenge}
            disabled={todayChallengeCompleted}
            className={`shrink-0 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all ${
              todayChallengeCompleted
                ? 'bg-emerald-600 text-white cursor-default shadow-sm'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-200 hover:shadow-lg active:scale-95'
            }`}
          >
            {todayChallengeCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Đã Hoàn Thành ✨</span>
              </>
            ) : (
              <>
                <Award className="w-4 h-4" />
                <span>Hoàn Thành Thử Thách</span>
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
