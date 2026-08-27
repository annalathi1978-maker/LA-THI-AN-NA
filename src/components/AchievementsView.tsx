import { StudentProgress, Badge } from '../types';
import { Trophy, Award, CheckCircle2, Lock, Sparkles, Star, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';
import { playClickSound, playFanfareSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface AchievementsViewProps {
  progress: StudentProgress;
  badges: Badge[];
  totalLessons: number;
}

export default function AchievementsView({
  progress,
  badges,
  totalLessons
}: AchievementsViewProps) {
  // 1. Điểm số: Tính điểm trung bình các bài kiểm tra (thang điểm 10)
  const quizValues = Object.values(progress.quizScores);
  const averageScore = quizValues.length > 0
    ? ((quizValues.reduce((a, b) => a + b, 0) / (quizValues.length * 5)) * 10).toFixed(1)
    : '0.0';

  // 2. Tiến độ: Đã học X / 10 bài
  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  const handleCelebrateBadge = (badge: Badge) => {
    if (!badge.unlocked) return;
    playClickSound();
    playFanfareSound();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Trophy className="w-4 h-4 text-yellow-200" />
            <span>Hồ Sơ Rèn Luyện Cá Nhân</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            BẢNG THÀNH TÍCH CÔNG DÂN
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 mt-1 max-w-xl">
            Ghi nhận Điểm số, Tiến độ học tập và 5 Huy hiệu danh dự của em.
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/25 flex items-center space-x-3 shrink-0">
          <span className="text-3xl">🎖️</span>
          <div>
            <div className="text-xs font-semibold text-amber-100">Huy hiệu đạt được</div>
            <div className="text-xl font-black text-white">{unlockedBadgesCount}/5 Huy hiệu</div>
          </div>
        </div>
      </div>

      {/* 2 CỘT CHÍNH: 1. ĐIỂM SỐ & 2. TIẾN ĐỘ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* KHU VỰC 1: ĐIỂM SỐ */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                1. Điểm Số
              </span>
              <span className="text-xs font-semibold text-slate-500">Thang điểm 10</span>
            </div>

            <div className="flex items-center space-x-5 mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white font-black text-3xl sm:text-4xl flex items-center justify-center shadow-lg shadow-emerald-200">
                {averageScore}
              </div>
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-800">
                  {Number(averageScore) >= 8.5
                    ? "Học Lực Xuất Sắc 🌟"
                    : Number(averageScore) >= 6.5
                    ? "Học Lực Khá Giỏi 👍"
                    : "Đang Cố Gắng 🌱"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Điểm trung bình cộng các bài kiểm tra nhanh 5 câu sau mỗi bài học.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
            <div className="bg-slate-50 p-3 rounded-2xl">
              <span className="block text-[11px] font-bold text-slate-400">Số bài đã thi</span>
              <span className="text-base font-extrabold text-slate-800">{quizValues.length} bài</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl">
              <span className="block text-[11px] font-bold text-slate-400">Tình huống xử lý</span>
              <span className="text-base font-extrabold text-slate-800">{progress.solvedSituationIds.length} TH</span>
            </div>
          </div>
        </div>

        {/* KHU VỰC 2: TIẾN ĐỘ */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                2. Tiến Độ
              </span>
              <span className="text-xs font-bold text-blue-600">{progressPercent}% Hoàn thành</span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-800">
                  Đã học: {completedCount}/{totalLessons} bài
                </h3>
                <span className="text-xs font-bold text-slate-500">Mục tiêu: 10 bài</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="text-xs text-slate-500">
                Chỉ còn <span className="font-bold text-slate-800">{totalLessons - completedCount} bài</span> nữa là em sẽ hoàn thành toàn bộ chương trình GDCD 6!
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>🌱 Hành động thực tế: {progress.completedActionTaskIds.length} nhiệm vụ</span>
            <span>💡 Suy nghĩ: {Object.keys(progress.thoughtAnswers || {}).length} bài</span>
          </div>
        </div>
      </div>

      {/* KHU VỰC 3: 5 HUY HIỆU Ý NGHĨA */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              3. Bộ 5 Huy Hiệu Danh Dự
            </span>
            <h3 className="text-xl font-black text-slate-800 mt-2">
              Huy Hiệu Rèn Luyện Đạo Đức & Kỹ Năng
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Bấm vào huy hiệu đã mở để ăn mừng 🎉
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                onClick={() => handleCelebrateBadge(badge)}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center text-center justify-between ${
                  badge.unlocked
                    ? 'bg-gradient-to-b from-amber-50/70 to-yellow-50/40 border-amber-300 shadow-xs hover:shadow-md hover:scale-103 cursor-pointer'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="relative mb-3">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${
                      badge.unlocked ? 'bg-white border-2 border-amber-200' : 'bg-slate-200 grayscale'
                    }`}
                  >
                    {badge.icon}
                  </div>
                  {badge.unlocked ? (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs">
                      ✓
                    </div>
                  ) : (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-400 text-white rounded-full flex items-center justify-center text-[10px] shadow-xs">
                      <Lock className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-800 mb-1">
                    {badge.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-black/5 w-full">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      badge.unlocked
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {badge.unlocked ? "ĐÃ ĐẠT ĐƯỢC" : "CHƯA MỞ KHÓA"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
