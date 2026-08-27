import { useState } from 'react';
import { SituationItem } from '../types';
import { Lightbulb, CheckCircle2, Award, Sparkles, ArrowRight, ShieldCheck, HeartHandshake, BookOpen } from 'lucide-react';
import { playClickSound, playCorrectSound, playWrongSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface SituationsViewProps {
  situations: SituationItem[];
  solvedSituationIds: string[];
  onSolveSituation: (situationId: string) => void;
}

export default function SituationsView({
  situations,
  solvedSituationIds,
  onSolveSituation
}: SituationsViewProps) {
  const [activeSituationId, setActiveSituationId] = useState<string>(situations[0]?.id || '');
  const [selectedOptionId, setSelectedOptionId] = useState<Record<string, string>>({});

  const currentSituation = situations.find((s) => s.id === activeSituationId) || situations[0];

  const handleSelectOption = (situationId: string, optId: string, isOptimal: boolean) => {
    setSelectedOptionId((prev) => ({ ...prev, [situationId]: optId }));
    
    if (isOptimal) {
      playCorrectSound();
      onSolveSituation(situationId);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      playWrongSound();
    }
  };

  const solvedCount = solvedSituationIds.length;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Lightbulb className="w-4 h-4 text-yellow-300" />
            <span>Chuyên mục đặc trưng GDCD 6</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            EM SẼ LÀM GÌ?
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
            Rèn luyện kỹ năng ứng xử thông minh, nhân văn và có trách nhiệm trước các tình huống thực tế đời sống học đường và xã hội.
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 flex items-center space-x-2 text-xs sm:text-sm font-bold shrink-0">
          <span>Đã giải quyết:</span>
          <span className="text-yellow-300 font-extrabold text-base">{solvedCount}/{situations.length}</span>
        </div>
      </div>

      {/* Situations Selector Pills */}
      <div className="flex overflow-x-auto p-1.5 bg-slate-100 rounded-2xl gap-2 no-scrollbar">
        {situations.map((sit, idx) => {
          const isSolved = solvedSituationIds.includes(sit.id);
          const isActive = activeSituationId === sit.id;

          return (
            <button
              key={sit.id}
              onClick={() => {
                playClickSound();
                setActiveSituationId(sit.id);
              }}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
                isActive
                  ? 'bg-purple-600 text-white shadow-sm scale-102'
                  : 'bg-white hover:bg-purple-50 text-slate-700'
              }`}
            >
              <span>{sit.avatar}</span>
              <span>Tình huống {idx + 1}</span>
              {isSolved && (
                <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-yellow-300' : 'text-emerald-500'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Situation Card */}
      {currentSituation && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-9 shadow-xs space-y-6">
          {/* Situation Title & Scenario */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-black text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                {currentSituation.lessonTitle}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Nhân vật: <span className="font-bold text-slate-800">{currentSituation.character}</span>
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-slate-800 leading-tight">
              {currentSituation.title}
            </h3>
          </div>

          {/* Scenario box */}
          <div className="bg-purple-50/70 border-2 border-purple-100 rounded-3xl p-5 sm:p-7 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-900 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Nội dung tình huống:</span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              {currentSituation.scenario}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-600 uppercase tracking-wider flex items-center space-x-1.5">
              <span>👉 Em hãy chọn cách ứng xử đúng đắn nhất:</span>
            </h4>

            <div className="space-y-3">
              {currentSituation.options.map((opt) => {
                const isSelected = selectedOptionId[currentSituation.id] === opt.id;
                const hasAnswered = !!selectedOptionId[currentSituation.id];

                let btnClass = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50/40';

                if (hasAnswered) {
                  if (opt.isOptimal) {
                    btnClass = 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-md shadow-emerald-100';
                  } else if (isSelected && !opt.isOptimal) {
                    btnClass = 'bg-rose-600 text-white border-rose-600 font-bold';
                  } else {
                    btnClass = 'bg-white text-slate-400 border-slate-200 opacity-50';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(currentSituation.id, opt.id, opt.isOptimal)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 text-xs sm:text-sm leading-relaxed transition-all flex items-start justify-between active:scale-99 ${btnClass}`}
                  >
                    <span>{opt.text}</span>
                    {hasAnswered && opt.isOptimal && (
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0 ml-3 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Solution & Explanation breakdown as required */}
          {selectedOptionId[currentSituation.id] && (
            <div className="space-y-4 pt-6 border-t-2 border-slate-100 animate-slideDown">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Phân tích & Lời khuyên chuẩn mực</span>
              </div>

              {/* 1. Đáp án */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5">
                <div className="font-bold text-xs text-emerald-800 uppercase tracking-wide mb-1">
                  1. Lựa chọn tối ưu:
                </div>
                <p className="text-sm sm:text-base font-bold text-emerald-950">
                  {currentSituation.optimalAnswer}
                </p>
              </div>

              {/* 2. Giải thích */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5">
                <div className="font-bold text-xs text-blue-800 uppercase tracking-wide mb-1">
                  2. Giải thích lý do:
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {currentSituation.explanation}
                </p>
              </div>

              {/* 3. Bài học rút ra */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5">
                <div className="font-bold text-xs text-amber-900 uppercase tracking-wide mb-1 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>3. Bài học rút ra cho em:</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                  {currentSituation.lessonLearned}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
