import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Award, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, 
  HelpCircle, Lightbulb, Compass, Star, Heart, Shield, Lock, Unlock, 
  ChevronRight, BookmarkCheck, Flame, Send, Printer, Share2, AlertCircle, X
} from 'lucide-react';
import { playClickSound, playCorrectSound, playWrongSound, playFanfareSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { StudentProgress } from '../types';

interface FamilyTreasureQuestProps {
  onBack: () => void;
  studentProgress?: StudentProgress;
  onSaveQuestProgress?: (score: number, commitment: { tradition: string; lessonLearned: string; sevenDayAction: string; completedAt: string }) => void;
}

export default function FamilyTreasureQuest({ 
  onBack, 
  studentProgress, 
  onSaveQuestProgress 
}: FamilyTreasureQuestProps) {
  // Current screen index: 1 to 13 (1 to 12 + 13 is Final Commitment)
  const [currentScreen, setCurrentScreen] = useState(1);
  const [stars, setStars] = useState(0);

  // MÀN 1 STATE
  const [m1Selected, setM1Selected] = useState<string | null>(null);
  const [m1Feedback, setM1Feedback] = useState<string | null>(null);
  const [m1Passed, setM1Passed] = useState(false);

  // MÀN 2 STATE
  const initialM2Items = [
    { id: 'm2-1', text: 'Nhiều thế hệ coi trọng việc học', icon: '📚', box: null as 'good' | 'bad' | null, correct: 'good' },
    { id: 'm2-2', text: 'Con cháu kính trọng, chăm sóc ông bà', icon: '❤️', box: null as 'good' | 'bad' | null, correct: 'good' },
    { id: 'm2-3', text: 'Gia đình nhiều đời gìn giữ nghề truyền thống', icon: '🧺', box: null as 'good' | 'bad' | null, correct: 'good' },
    { id: 'm2-4', text: 'Các thành viên cần cù lao động', icon: '💪', box: null as 'good' | 'bad' | null, correct: 'good' },
    { id: 'm2-5', text: 'Luôn khoe gia đình mình giàu hơn người khác', icon: '💰', box: null as 'good' | 'bad' | null, correct: 'bad' },
    { id: 'm2-6', text: 'Coi thường những gia đình có hoàn cảnh khó khăn', icon: '😒', box: null as 'good' | 'bad' | null, correct: 'bad' },
  ];
  const [m2Items, setM2Items] = useState(initialM2Items);
  const [m2ReasonText, setM2ReasonText] = useState('');
  const [m2Evaluated, setM2Evaluated] = useState(false);
  const [m2AiFeedback, setM2AiFeedback] = useState('');

  // MÀN 3 STATE
  const [m3Slots, setM3Slots] = useState<{ [key: string]: string | null }>({
    slot1: null, // TỐT ĐẸP
    slot2: null, // THẾ HỆ
    slot3: null, // GIỮ GÌN
    slot4: null, // TIẾP NỐI
  });
  const [m3Passed, setM3Passed] = useState(false);

  // MÀN 4 STATE
  const [m4Checked, setM4Checked] = useState<number[]>([]);
  const [m4DeepChoice, setM4DeepChoice] = useState<'A' | 'B' | null>(null);
  const [m4Passed, setM4Passed] = useState(false);

  // MÀN 5 STATE
  const [m5Connections, setM5Connections] = useState<Record<number, number>>({});
  const [m5SelectedLeft, setM5SelectedLeft] = useState<number | null>(null);
  const [m5Passed, setM5Passed] = useState(false);

  // MÀN 6 STATE
  const [m6ViewChoice, setM6ViewChoice] = useState<'dung' | 'chua_dung' | 'sai' | null>(null);
  const [m6ReasonChoice, setM6ReasonChoice] = useState<'A' | 'B' | 'C' | null>(null);
  const [m6Passed, setM6Passed] = useState(false);

  // MÀN 7 STATE
  const initialM7Cards = [
    { id: 'm7-1', text: 'Hỏi ông bà về truyền thống gia đình', icon: '❤️', group: null as 'good' | 'bad' | null, correct: 'good' },
    { id: 'm7-2', text: 'Cố gắng học tập để tiếp nối truyền thống hiếu học', icon: '📚', group: null as 'good' | 'bad' | null, correct: 'good' },
    { id: 'm7-3', text: 'Học một nghề/kĩ năng tốt đẹp của gia đình', icon: '🎨', group: null as 'good' | 'bad' | null, correct: 'good' },
    { id: 'm7-4', text: 'Giới thiệu nét đẹp gia đình một cách phù hợp', icon: '📣', group: null as 'good' | 'bad' | null, correct: 'good' },
    { id: 'm7-5', text: '“Chuyện của ông bà, không liên quan đến em”', icon: '🙄', group: null as 'good' | 'bad' | null, correct: 'bad' },
    { id: 'm7-6', text: 'Chỉ khoe thành tích của người thân nhưng bản thân không cố gắng', icon: '😎', group: null as 'good' | 'bad' | null, correct: 'bad' },
  ];
  const [m7Cards, setM7Cards] = useState(initialM7Cards);
  const [m7Passed, setM7Passed] = useState(false);

  // MÀN 8 STATE
  const [m8Choice, setM8Choice] = useState<string | null>(null);
  const [m8Reason, setM8Reason] = useState('');
  const [m8HintLevel, setM8HintLevel] = useState<number>(0);
  const [m8Submitted, setM8Submitted] = useState(false);

  // MÀN 9 STATE
  const [m9Agree, setM9Agree] = useState<'yes' | 'no' | null>(null);
  const [m9Evidence, setM9Evidence] = useState<string[]>([]);
  const [m9ActionPlan, setM9ActionPlan] = useState('');
  const [m9Feedback, setM9Feedback] = useState('');
  const [m9Passed, setM9Passed] = useState(false);

  // MÀN 10 STATE
  const [m10ActiveNode, setM10ActiveNode] = useState<'re' | 'than' | 'canh' | 'hoa'>('re');

  // MÀN 11 STATE
  const [m11Flipped, setM11Flipped] = useState(false);
  const [m11Countdown, setM11Countdown] = useState(10);
  const [m11UserRecall, setM11UserRecall] = useState('');
  const [m11SelectedTags, setM11SelectedTags] = useState<string[]>([]);
  const [m11Passed, setM11Passed] = useState(false);

  // MÀN 12 STATE (60 seconds)
  const [m12Timer, setM12Timer] = useState(60);
  const [m12TimerActive, setM12TimerActive] = useState(false);
  const [m12Answers, setM12Answers] = useState<{ [qIndex: number]: string }>({});
  const [m12Finished, setM12Finished] = useState(false);

  // MÀN 13 (FINAL COMMITMENT) STATE
  const [commitTradition, setCommitTradition] = useState('');
  const [commitLesson, setCommitLesson] = useState('');
  const [commitAction, setCommitAction] = useState('');
  const [isCommitted, setIsCommitted] = useState(false);

  // 5 Stages Definition
  const stages = [
    { id: 1, name: 'Cánh cửa gia đình', icon: '🏠', screens: [1] },
    { id: 2, name: 'Giải mã truyền thống', icon: '🔎', screens: [2, 3, 4] },
    { id: 3, name: 'Hiểu giá trị', icon: '❤️', screens: [5, 6] },
    { id: 4, name: 'Chọn cách hành động', icon: '🧭', screens: [7, 8, 9] },
    { id: 5, name: 'Mở khóa kho báu', icon: '🏆', screens: [10, 11, 12, 13] },
  ];

  const currentStageIndex = stages.findIndex(s => s.screens.includes(currentScreen));
  const progressPercent = Math.min(100, Math.round(((currentScreen - 1) / 12) * 100));

  // Timer for Màn 11 (Memory Cards)
  useEffect(() => {
    if (currentScreen === 11 && !m11Flipped && m11Countdown > 0) {
      const timer = setTimeout(() => setM11Countdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (currentScreen === 11 && m11Countdown === 0 && !m11Flipped) {
      setM11Flipped(true);
      playClickSound();
    }
  }, [currentScreen, m11Countdown, m11Flipped]);

  // Timer for Màn 12 (60s Challenge)
  useEffect(() => {
    if (currentScreen === 12 && m12TimerActive && !m12Finished && m12Timer > 0) {
      const timer = setTimeout(() => setM12Timer(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (currentScreen === 12 && m12Timer === 0 && !m12Finished) {
      handleFinishM12();
    }
  }, [currentScreen, m12TimerActive, m12Timer, m12Finished]);

  // MÀN 1: Submit choice
  const handleSelectM1 = (choice: string) => {
    setM1Selected(choice);
    playClickSound();
    if (choice === 'B') {
      setM1Feedback('✨ Em đã tìm được chiếc chìa khóa đầu tiên! Những giá trị tốt đẹp được các thế hệ gìn giữ và tiếp nối tạo nên nét đẹp của gia đình, dòng họ.');
      setM1Passed(true);
      setStars(prev => prev + 10);
      playCorrectSound();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } else {
      setM1Feedback('🔍 Gợi ý: Đừng nghĩ đến việc “nổi tiếng” hay “giàu có”. Hãy nghĩ xem điều gì có thể được ông bà → cha mẹ → con cháu cùng trân trọng và tiếp nối.');
      setM1Passed(false);
      playWrongSound();
    }
  };

  // MÀN 2: Move item to box
  const handleToggleM2Box = (id: string, targetBox: 'good' | 'bad') => {
    playClickSound();
    setM2Items(prev => prev.map(item => item.id === id ? { ...item, box: targetBox } : item));
  };

  const handleEvaluateM2Reason = () => {
    if (!m2ReasonText.trim()) return;
    playClickSound();
    setM2Evaluated(true);
    const textLower = m2ReasonText.toLowerCase();
    if (textLower.includes('vật chất') || textLower.includes('đạo đức') || textLower.includes('tiền') || textLower.includes('giá trị') || textLower.includes('phẩm chất') || textLower.includes('nhân cách') || textLower.includes('tiếp nối')) {
      setM2AiFeedback('🌟 Nhận xét xuất sắc! Tiền bạc của cải chỉ là vật chất có thể hao vơi theo thời gian, còn truyền thống tốt đẹp phải là giá trị đạo đức, nhân cách và văn hóa được lưu truyền để con cháu noi gương.');
      setStars(prev => prev + 15);
      playCorrectSound();
    } else {
      setM2AiFeedback('💡 Câu trả lời rất đáng ghi nhận! Em lưu ý thêm: Sự giàu có thuộc về tài sản vật chất; còn truyền thống tốt đẹp là những giá trị tinh thần, nhân cách cao đẹp được hun đúc qua nhiều thế hệ.');
      setStars(prev => prev + 10);
      playCorrectSound();
    }
  };

  // MÀN 3: Word matching
  const handleSelectM3Word = (word: string) => {
    playClickSound();
    // Fill first empty slot
    const slots = ['slot1', 'slot2', 'slot3', 'slot4'];
    for (const s of slots) {
      if (!m3Slots[s]) {
        const next = { ...m3Slots, [s]: word };
        setM3Slots(next);
        checkM3Complete(next);
        return;
      }
    }
  };

  const handleClearM3Slot = (slotKey: string) => {
    playClickSound();
    const next = { ...m3Slots, [slotKey]: null };
    setM3Slots(next);
    setM3Passed(false);
  };

  const checkM3Complete = (slots: { [key: string]: string | null }) => {
    if (slots.slot1 === 'TỐT ĐẸP' && slots.slot2 === 'THẾ HỆ' && slots.slot3 === 'GIỮ GÌN' && slots.slot4 === 'TIẾP NỐI') {
      setM3Passed(true);
      setStars(prev => prev + 15);
      playCorrectSound();
      playFanfareSound();
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }
  };

  // MÀN 4: Handlers
  const handleToggleM4Check = (idx: number) => {
    playClickSound();
    setM4Checked(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const handleM4DeepSelect = (choice: 'A' | 'B') => {
    setM4DeepChoice(choice);
    playClickSound();
    if (choice === 'B') {
      setM4Passed(true);
      setStars(prev => prev + 15);
      playCorrectSound();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } else {
      playWrongSound();
    }
  };

  // MÀN 5: Matching pairs
  const m5LeftList = [
    { id: 1, text: 'Tự hào về người thân cần cù' },
    { id: 2, text: 'Giữ nền nếp tốt đẹp' },
    { id: 3, text: 'Hiểu truyền thống' },
    { id: 4, text: 'Tiếp nối điều tốt đẹp' },
  ];
  const m5RightList = [
    { id: 1, text: 'Có thêm động lực vượt khó' },
    { id: 2, text: 'Gia đình đoàn kết, đầm ấm' },
    { id: 3, text: 'Có thêm kinh nghiệm và sức mạnh trong cuộc sống' },
    { id: 4, text: 'Làm phong phú truyền thống, bản sắc' },
  ];

  const handleM5ClickLeft = (id: number) => {
    playClickSound();
    setM5SelectedLeft(id);
  };

  const handleM5ClickRight = (id: number) => {
    if (m5SelectedLeft === null) return;
    playClickSound();
    const next = { ...m5Connections, [m5SelectedLeft]: id };
    setM5Connections(next);
    setM5SelectedLeft(null);

    // Check if all correct
    if (Object.keys(next).length === 4) {
      const allCorrect = [1, 2, 3, 4].every(key => next[key] === key);
      if (allCorrect) {
        setM5Passed(true);
        setStars(prev => prev + 20);
        playCorrectSound();
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } else {
        playWrongSound();
      }
    }
  };

  // MÀN 7: Toggle cards
  const handleM7Assign = (id: string, group: 'good' | 'bad') => {
    playClickSound();
    const next = m7Cards.map(c => c.id === id ? { ...c, group } : c);
    setM7Cards(next);

    const allAssigned = next.every(c => c.group !== null);
    if (allAssigned) {
      const allCorrect = next.every(c => c.group === c.correct);
      if (allCorrect) {
        setM7Passed(true);
        setStars(prev => prev + 15);
        playCorrectSound();
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  // MÀN 8: Bình
  const handleM8Submit = () => {
    if (!m8Choice) return;
    playClickSound();
    setM8Submitted(true);
    setStars(prev => prev + 15);
    playCorrectSound();
  };

  // MÀN 9: Boss level
  const handleM9Submit = () => {
    if (!m9ActionPlan.trim()) return;
    playClickSound();
    setM9Passed(true);
    setStars(prev => prev + 20);
    playCorrectSound();
    playFanfareSound();
    setM9Feedback('🎉 Em đã vượt qua BOSS LEVEL! Việc tự giác học nghề truyền thống, phụ giúp người thân và tự hào bằng hành động chính là cách giữ gìn truyền thống trọn vẹn nhất.');
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
  };

  // MÀN 11: Tag toggle
  const handleToggleM11Tag = (tag: string) => {
    playClickSound();
    setM11SelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleM11Submit = () => {
    if (m11SelectedTags.length < 3 && !m11UserRecall.trim()) return;
    playClickSound();
    setM11Passed(true);
    setStars(prev => prev + 20);
    playCorrectSound();
  };

  // MÀN 12: 60s quiz
  const handleSelectM12Option = (qIdx: number, val: string) => {
    playClickSound();
    setM12Answers(prev => ({ ...prev, [qIdx]: val }));
  };

  const handleFinishM12 = () => {
    setM12Finished(true);
    playCorrectSound();
    playFanfareSound();
    setStars(prev => prev + 25);
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
  };

  // MÀN 13: Final commitment submit
  const handleFinalCommitment = () => {
    if (!commitTradition.trim() || !commitLesson.trim() || !commitAction.trim()) {
      alert('Em hãy điền đầy đủ cả 3 nội dung cam kết nhé!');
      return;
    }
    playCorrectSound();
    playFanfareSound();
    setIsCommitted(true);
    setStars(prev => prev + 30);
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });

    if (onSaveQuestProgress) {
      onSaveQuestProgress(10, {
        tradition: commitTradition,
        lessonLearned: commitLesson,
        sevenDayAction: commitAction,
        completedAt: new Date().toLocaleDateString('vi-VN')
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Banner Navigation */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-3.5">
            <button
              onClick={() => {
                playClickSound();
                onBack();
              }}
              className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white transition-all"
              title="Quay lại Bài 1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider bg-yellow-400 text-amber-950 px-2.5 py-0.5 rounded-md">
                  GDCD 6 • KẾT NỐI TRI THỨC
                </span>
                <span className="text-xs bg-white/20 text-white px-2.5 py-0.5 rounded-md font-bold">
                  BÀI 1
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black mt-1 flex items-center space-x-2">
                <span>🏡 GIẢI MÃ KHO BÁU GIA ĐÌNH</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl flex items-center space-x-1.5 font-black text-sm">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{stars} ⭐</span>
            </div>
            <div className="bg-white text-amber-900 px-3.5 py-1.5 rounded-2xl text-xs font-black shadow-xs">
              Màn {currentScreen}/13
            </div>
          </div>
        </div>

        {/* 5-Chặng Progress Bar */}
        <div className="mt-5 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <div className="flex items-center space-x-1.5">
              <span>Chặng {currentStageIndex + 1}/5:</span>
              <span className="text-yellow-200">{stages[currentStageIndex]?.name}</span>
            </div>
            <span className="text-yellow-300 font-mono font-black">{progressPercent}%</span>
          </div>

          {/* Stepper Dots */}
          <div className="grid grid-cols-5 gap-2 relative">
            {stages.map((stg, idx) => {
              const isPast = currentStageIndex > idx;
              const isCurrent = currentStageIndex === idx;
              return (
                <div key={stg.id} className="flex flex-col items-center text-center">
                  <div className={`w-full h-2 rounded-full mb-1.5 transition-all ${
                    isPast ? 'bg-yellow-400' : isCurrent ? 'bg-white shadow-md' : 'bg-white/20'
                  }`} />
                  <span className={`text-[10px] hidden sm:block truncate w-full ${
                    isCurrent ? 'font-black text-yellow-200' : 'text-white/70'
                  }`}>
                    {stg.icon} {stg.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN QUEST CARD */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 sm:p-8 shadow-sm">
        
        {/* ======================================================== */}
        {/* MÀN 1: CÁNH CỬA GIA ĐÌNH */}
        {/* ======================================================== */}
        {currentScreen === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">🎬</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    MÀN 1: CÁNH CỬA GIA ĐÌNH — ⚡ KHỞI ĐỘNG NÃO BỘ
                  </h3>
                  <p className="text-xs text-slate-500">
                    Mỗi gia đình đều có những khoảnh khắc và việc làm đầy yêu thương
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                +10 ⭐
              </span>
            </div>

            {/* 4 Thẻ Hình 3D */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-200 text-center hover:scale-102 transition-transform shadow-xs">
                <div className="text-4xl mb-2">👵🍲</div>
                <p className="text-xs font-bold text-amber-900">Bà dạy cháu làm món ăn truyền thống</p>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50/80 border-2 border-blue-200 text-center hover:scale-102 transition-transform shadow-xs">
                <div className="text-4xl mb-2">📚✏️</div>
                <p className="text-xs font-bold text-blue-900">Anh chị em cùng chăm chỉ học tập</p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50/80 border-2 border-purple-200 text-center hover:scale-102 transition-transform shadow-xs">
                <div className="text-4xl mb-2">🎸🎶</div>
                <p className="text-xs font-bold text-purple-900">Bố và con cùng chơi đàn guitar</p>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50/80 border-2 border-rose-200 text-center hover:scale-102 transition-transform shadow-xs">
                <div className="text-4xl mb-2">👨‍👩‍👧‍👦❤️</div>
                <p className="text-xs font-bold text-rose-900">Cả nhà quan tâm, chăm sóc ông bà</p>
              </div>
            </div>

            {/* Câu hỏi */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
              <p className="font-bold text-sm sm:text-base text-slate-800">
                ❓ Theo em, điều gì khiến một việc làm đẹp của gia đình có thể trở thành điều đáng trân trọng và tiếp nối?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: 'A', text: 'Vì việc đó nổi tiếng.' },
                  { key: 'B', text: 'Vì việc đó mang giá trị tốt đẹp và được các thế hệ gìn giữ, tiếp nối.' },
                  { key: 'C', text: 'Vì gia đình nào cũng phải giống nhau.' },
                  { key: 'D', text: 'Vì việc đó đem lại nhiều tiền.' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectM1(opt.key)}
                    className={`p-3.5 rounded-2xl text-left font-medium text-xs sm:text-sm border-2 transition-all flex items-start space-x-2.5 ${
                      m1Selected === opt.key
                        ? opt.key === 'B'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                          : 'bg-rose-50 border-rose-400 text-rose-900'
                        : 'bg-white border-slate-200 hover:border-amber-400 text-slate-700'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                      m1Selected === opt.key ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {opt.key}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>

              {m1Feedback && (
                <div className={`p-4 rounded-2xl text-xs sm:text-sm font-medium border flex items-start space-x-2.5 animate-fadeIn ${
                  m1Passed ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}>
                  <span className="text-lg shrink-0">{m1Passed ? '🔑' : '🔍'}</span>
                  <span>{m1Feedback}</span>
                </div>
              )}
            </div>

            {m1Passed && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setCurrentScreen(2);
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md flex items-center space-x-2 active:scale-95"
                >
                  <span>MỞ MÀN 2: EM CÓ NHẬN RA “TRUYỀN THỐNG”?</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN 2: EM CÓ NHẬN RA TRUYỀN THỐNG? */}
        {/* ======================================================== */}
        {currentScreen === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">🔎</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    MÀN 2: EM CÓ NHẬN RA “TRUYỀN THỐNG”?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kéo hoặc bấm chọn thẻ chuyển về đúng 2 chiếc hộp
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                +15 ⭐
              </span>
            </div>

            {/* 2 Chiếc Hộp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box 1: TRUYỀN THỐNG TỐT ĐẸP */}
              <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-3xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-emerald-900 text-sm sm:text-base flex items-center space-x-2">
                    <span>💎 TRUYỀN THỐNG TỐT ĐẸP</span>
                  </h4>
                  <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                    {m2Items.filter(i => i.box === 'good').length} thẻ
                  </span>
                </div>
                <div className="min-h-32 space-y-2 border-2 border-dashed border-emerald-200 rounded-2xl p-2.5 bg-white/60">
                  {m2Items.filter(i => i.box === 'good').map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleM2Box(item.id, 'bad')}
                      className="p-2.5 bg-white rounded-xl border border-emerald-300 shadow-xs flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 cursor-pointer hover:bg-rose-50 hover:border-rose-300 transition-colors"
                      title="Bấm để chuyển hộp"
                    >
                      <span className="flex items-center space-x-2">
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">↺</span>
                    </div>
                  ))}
                  {m2Items.filter(i => i.box === 'good').length === 0 && (
                    <p className="text-center text-xs text-emerald-700 py-6">
                      Bấm vào các thẻ bên dưới để đưa vào hộp này
                    </p>
                  )}
                </div>
              </div>

              {/* Box 2: KHÔNG PHẢI TRUYỀN THỐNG TỐT ĐẸP */}
              <div className="bg-rose-50/70 border-2 border-rose-300 rounded-3xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-rose-900 text-sm sm:text-base flex items-center space-x-2">
                    <span>❓ KHÔNG PHẢI TRUYỀN THỐNG TỐT ĐẸP</span>
                  </h4>
                  <span className="text-xs bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-bold">
                    {m2Items.filter(i => i.box === 'bad').length} thẻ
                  </span>
                </div>
                <div className="min-h-32 space-y-2 border-2 border-dashed border-rose-200 rounded-2xl p-2.5 bg-white/60">
                  {m2Items.filter(i => i.box === 'bad').map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleM2Box(item.id, 'good')}
                      className="p-2.5 bg-white rounded-xl border border-rose-300 shadow-xs flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
                      title="Bấm để chuyển hộp"
                    >
                      <span className="flex items-center space-x-2">
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">↺</span>
                    </div>
                  ))}
                  {m2Items.filter(i => i.box === 'bad').length === 0 && (
                    <p className="text-center text-xs text-rose-700 py-6">
                      Bấm vào các thẻ bên dưới để đưa vào hộp này
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Các thẻ chưa phân loại */}
            {m2Items.some(i => i.box === null) && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-600">
                  👉 Chọn hộp cho các thẻ còn lại:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {m2Items.filter(i => i.box === null).map(item => (
                    <div key={item.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-xs">
                      <span className="text-xs font-bold text-slate-800 flex items-center space-x-2">
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleToggleM2Box(item.id, 'good')}
                          className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-bold rounded-lg"
                        >
                          💎 Truyền thống
                        </button>
                        <button
                          onClick={() => handleToggleM2Box(item.id, 'bad')}
                          className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 text-[11px] font-bold rounded-lg"
                        >
                          ❓ Không phải
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Khi đã phân loại xong: Câu hỏi mở rộng */}
            {m2Items.every(i => i.box !== null) && (
              <div className="p-4 sm:p-5 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-3 animate-fadeIn">
                <h4 className="font-bold text-xs sm:text-sm text-indigo-950 flex items-center space-x-2">
                  <span>🧠 Câu hỏi sâu sắc: Vì sao “gia đình giàu có” chưa đủ để gọi là một truyền thống tốt đẹp?</span>
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={m2ReasonText}
                    onChange={(e) => setM2ReasonText(e.target.value)}
                    placeholder="Nhập 1 câu suy nghĩ của em (VD: Vì tiền bạc là của cải vật chất có thể mất đi...)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-indigo-200 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-400"
                  />
                  <button
                    onClick={handleEvaluateM2Reason}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 flex items-center space-x-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi AI</span>
                  </button>
                </div>

                {m2AiFeedback && (
                  <div className="p-3 bg-white rounded-xl border border-indigo-200 text-xs font-medium text-indigo-900 animate-fadeIn">
                    {m2AiFeedback}
                  </div>
                )}

                {/* Chốt kiến thức */}
                <div className="p-3 bg-amber-100/70 rounded-xl border border-amber-300 text-xs text-amber-950 font-bold flex items-start space-x-2">
                  <span className="text-base">💡</span>
                  <span>
                    <b>CHỐT KIẾN THỨC:</b> Truyền thống gia đình, dòng họ gắn với những giá trị tốt đẹp được hình thành, gìn giữ và tiếp nối qua các thế hệ.
                  </span>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setCurrentScreen(3);
                    }}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center space-x-1.5"
                  >
                    <span>MỞ MÀN 3: “DNA” CỦA MỘT TRUYỀN THỐNG</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN 3: “DNA” CỦA MỘT TRUYỀN THỐNG */}
        {/* ======================================================== */}
        {currentScreen === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">🧬</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    MÀN 3: “DNA” CỦA MỘT TRUYỀN THỐNG
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bấm chọn 4 từ khóa để hoàn thiện công thức vàng của truyền thống
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                +15 ⭐
              </span>
            </div>

            {/* Cây gia đình 3D phát sáng */}
            <div className={`p-6 rounded-3xl border-2 transition-all text-center space-y-4 ${
              m3Passed 
                ? 'bg-gradient-to-b from-amber-50 to-orange-50 border-amber-400 shadow-xl shadow-amber-100 animate-pulse' 
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-center space-x-3 sm:space-x-8 text-xs sm:text-sm font-black text-slate-700">
                <div className="px-3 py-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  👴👵 ÔNG BÀ
                </div>
                <span className="text-amber-500 font-bold">➔</span>
                <div className="px-3 py-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  👨‍👩‍👧‍👦 CHA MẸ
                </div>
                <span className="text-amber-500 font-bold">➔</span>
                <div className="px-3 py-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  🧒👧 CON CHÁU
                </div>
              </div>

              {/* Ghép câu DNA */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 text-sm sm:text-base font-medium text-slate-800 leading-loose">
                <span>Một giá trị </span>
                <button
                  onClick={() => handleClearM3Slot('slot1')}
                  className={`px-3 py-1 rounded-xl font-bold border-2 mx-1 transition-all ${
                    m3Slots.slot1 ? 'bg-amber-100 border-amber-400 text-amber-900' : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'
                  }`}
                >
                  {m3Slots.slot1 || '[ ô trống 1 ]'}
                </button>
                <span> được các </span>
                <button
                  onClick={() => handleClearM3Slot('slot2')}
                  className={`px-3 py-1 rounded-xl font-bold border-2 mx-1 transition-all ${
                    m3Slots.slot2 ? 'bg-blue-100 border-blue-400 text-blue-900' : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'
                  }`}
                >
                  {m3Slots.slot2 || '[ ô trống 2 ]'}
                </button>
                <span> trong gia đình, dòng họ </span>
                <button
                  onClick={() => handleClearM3Slot('slot3')}
                  className={`px-3 py-1 rounded-xl font-bold border-2 mx-1 transition-all ${
                    m3Slots.slot3 ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'
                  }`}
                >
                  {m3Slots.slot3 || '[ ô trống 3 ]'}
                </button>
                <span> và </span>
                <button
                  onClick={() => handleClearM3Slot('slot4')}
                  className={`px-3 py-1 rounded-xl font-bold border-2 mx-1 transition-all ${
                    m3Slots.slot4 ? 'bg-purple-100 border-purple-400 text-purple-900' : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'
                  }`}
                >
                  {m3Slots.slot4 || '[ ô trống 4 ]'}
                </button>
                <span>.</span>
              </div>

              {/* Ngân hàng từ khóa */}
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['TỐT ĐẸP', 'THẾ HỆ', 'GIỮ GÌN', 'TIẾP NỐI'].map(word => (
                  <button
                    key={word}
                    onClick={() => handleSelectM3Word(word)}
                    className="px-4 py-2 bg-white hover:bg-amber-50 text-slate-800 font-black text-xs sm:text-sm rounded-xl border-2 border-slate-200 hover:border-amber-400 shadow-xs active:scale-95 transition-all"
                  >
                    🏷️ {word}
                  </button>
                ))}
              </div>
            </div>

            {m3Passed && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-900 font-bold flex items-center justify-between animate-fadeIn">
                <span>🎉 Chính xác! Cây gia đình đã phát sáng rực rỡ với dòng chảy giá trị bền vững!</span>
                <button
                  onClick={() => {
                    playClickSound();
                    setCurrentScreen(4);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center space-x-1"
                >
                  <span>MỞ MÀN 4: GIẢI MÃ DÒNG HỌ ĐẶNG</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN 4: GIẢI MÃ DÒNG HỌ ĐẶNG */}
        {/* ======================================================== */}
        {currentScreen === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">📚</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    MÀN 4: GIẢI MÃ DÒNG HỌ ĐẶNG (SƠN LA)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tư liệu SGK Kết Nối Tri Thức về dòng họ hiếu học nổi tiếng
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                +15 ⭐
              </span>
            </div>

            {/* Đoạn tư liệu */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-950 leading-relaxed">
              📖 <b>Tư liệu SGK:</b> Dòng họ Đặng ở Sơn La là dòng họ có truyền thống hiếu học lâu đời. Nhiều thế hệ gia đình luôn quan tâm việc học của con em; trẻ em đến tuổi đều được tới trường; nhiều con cháu đạt thành tích cao trong học tập và khi trưởng thành có đóng góp tích cực cho quê hương, đất nước.
            </div>

            {/* Nhiệm vụ 1: Chọn 3 bằng chứng */}
            <div className="space-y-3">
              <p className="font-bold text-xs sm:text-sm text-slate-800">
                🎯 Hãy chọn ĐÚNG 3 “bằng chứng” chứng minh dòng họ Đặng có truyền thống HIẾU HỌC:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 1, text: 'Trẻ đến tuổi đều được tới trường.' },
                  { id: 2, text: 'Gia đình quan tâm việc học của con em.' },
                  { id: 3, text: 'Nhiều người đạt thành tích cao trong học tập.' },
                  { id: 4, text: 'Dòng họ có rất nhiều tiền.' },
                  { id: 5, text: 'Mọi người đều làm cùng một nghề.' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleToggleM4Check(item.id)}
                    className={`p-3 rounded-xl text-left text-xs font-bold border-2 transition-all flex items-center space-x-2.5 ${
                      m4Checked.includes(item.id)
                        ? [1, 2, 3].includes(item.id)
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-rose-50 border-rose-400 text-rose-950'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md border flex items-center justify-center bg-white text-slate-900">
                      {m4Checked.includes(item.id) ? '✓' : ''}
                    </span>
                    <span>{item.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Nhiệm vụ 2: Câu hỏi sâu hơn */}
            {m4Checked.includes(1) && m4Checked.includes(2) && m4Checked.includes(3) && (
              <div className="p-4 sm:p-5 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-3 animate-fadeIn">
                <p className="font-bold text-xs sm:text-sm text-indigo-950">
                  🧠 Câu hỏi mở rộng: Nếu em sinh ra trong một gia đình có truyền thống hiếu học nhưng hiện tại kết quả học tập chưa tốt, em có còn có thể tiếp nối truyền thống ấy không?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleM4DeepSelect('A')}
                    className={`p-3 rounded-xl text-left text-xs font-medium border-2 ${
                      m4DeepChoice === 'A' ? 'bg-rose-50 border-rose-400 text-rose-900' : 'bg-white border-slate-200'
                    }`}
                  >
                    <b>A.</b> Không, vì phải học giỏi mới được coi là hiếu học.
                  </button>
                  <button
                    onClick={() => handleM4DeepSelect('B')}
                    className={`p-3 rounded-xl text-left text-xs font-bold border-2 ${
                      m4DeepChoice === 'B' ? 'bg-emerald-50 border-emerald-500 text-emerald-950' : 'bg-white border-slate-200'
                    }`}
                  >
                    <b>B.</b> Có, nếu em biết cố gắng, chăm chỉ và từng bước tiến bộ.
                  </button>
                </div>

                {m4DeepChoice === 'B' && (
                  <div className="p-3 bg-white rounded-xl border border-emerald-300 text-xs text-emerald-900 font-medium">
                    🌟 <b>Chính xác!</b> Tiếp nối truyền thống không có nghĩa em phải hoàn hảo ngay lập tức. Điều quan trọng là thái độ trân trọng và hành động phù hợp để phát huy điều tốt đẹp.
                  </div>
                )}
              </div>
            )}

            {m4Passed && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setCurrentScreen(5);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <span>MỞ MÀN 5: TRUYỀN THỐNG CHO TA ĐIỀU GÌ?</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN 5: TRUYỀN THỐNG CHO TA ĐIỀU GÌ? */}
        {/* ======================================================== */}
        {currentScreen === 5 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">❤️</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    MÀN 5: TRUYỀN THỐNG CHO TA ĐIỀU GÌ?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bấm chọn 1 ô bên trái rồi nối với 1 ô tương ứng bên phải
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                +20 ⭐
              </span>
            </div>

            {/* 4 Cặp Nối Dây */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  🌱 TRUYỀN THỐNG
                </h4>
                {m5LeftList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleM5ClickLeft(item.id)}
                    className={`w-full p-3 rounded-2xl text-left text-xs font-bold border-2 transition-all flex items-center justify-between ${
                      m5SelectedLeft === item.id
                        ? 'bg-amber-100 border-amber-500 text-amber-950 scale-102'
                        : m5Connections[item.id]
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                        : 'bg-white border-slate-200 hover:border-slate-400 text-slate-700'
                    }`}
                  >
                    <span>{item.text}</span>
                    <span className="text-xs font-mono">
                      {m5Connections[item.id] ? '✨' : '👉'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  ⚡ SỨC MẠNH & Ý NGHĨA
                </h4>
                {m5RightList.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleM5ClickRight(item.id)}
                    className={`w-full p-3 rounded-2xl text-left text-xs font-bold border-2 transition-all flex items-center justify-between ${
                      Object.values(m5Connections).includes(item.id)
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                        : 'bg-white border-slate-200 hover:border-amber-400 text-slate-700'
                    }`}
                  >
                    <span>{item.text}</span>
                    <span className="text-xs font-mono">
                      {Object.values(m5Connections).includes(item.id) ? '✓' : '○'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {m5Passed && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2 animate-fadeIn">
                <p className="text-xs sm:text-sm text-rose-950 font-bold">
                  💡 <b>CHỐT BÀI HỌC:</b> Truyền thống không chỉ thuộc về quá khứ. Những giá trị tốt đẹp của gia đình, dòng họ có thể trở thành kinh nghiệm, động lực và sức mạnh cho chúng ta hôm nay.
                </p>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setCurrentScreen(6);
                    }}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center space-x-1.5"
                  >
                    <span>MỞ MÀN 6: BẪY TƯ DUY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN 6: BẪY TƯ DUY */}
        {/* ======================================================== */}
        {currentScreen === 6 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">🕵️</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    MÀN 6: BẪY TƯ DUY — NHẬN ĐỊNH CỦA BẠN MINH
                  </h3>
                  <p className="text-xs text-slate-500">
                    Vượt qua ngộ nhận thường gặp về truyền thống gia đình
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                +15 ⭐
              </span>
            </div>

            {/* Nhân vật Minh phát biểu */}
            <div className="p-5 bg-slate-50 border-2 border-slate-200 rounded-3xl flex items-start space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shrink-0 border border-amber-300">
                👦
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Bạn Minh nói:</span>
                <p className="text-sm sm:text-base font-bold text-slate-800 italic">
                  “Chỉ những gia đình, dòng họ giàu có hoặc nổi tiếng mới có truyền thống đáng tự hào.”
                </p>
              </div>
            </div>

            {/* Câu hỏi 1: Đúng hay Sai */}
            <div className="space-y-3">
              <p className="font-bold text-xs sm:text-sm text-slate-800">
                ❓ Theo em, nhận định của Minh là:
              </p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    playWrongSound();
                    setM6ViewChoice('dung');
                  }}
                  className={`p-3 rounded-2xl text-xs sm:text-sm font-bold border-2 ${
                    m6ViewChoice === 'dung' ? 'bg-rose-50 border-rose-400 text-rose-900' : 'bg-white border-slate-200'
                  }`}
                >
                  🟢 Đúng
                </button>
                <button
                  onClick={() => {
                    playWrongSound();
                    setM6ViewChoice('chua_dung');
                  }}
                  className={`p-3 rounded-2xl text-xs sm:text-sm font-bold border-2 ${
                    m6ViewChoice === 'chua_dung' ? 'bg-amber-50 border-amber-400 text-amber-900' : 'bg-white border-slate-200'
                  }`}
                >
                  🟡 Chưa hoàn toàn đúng
                </button>
                <button
                  onClick={() => {
                    playCorrectSound();
                    setM6ViewChoice('sai');
                  }}
                  className={`p-3 rounded-2xl text-xs sm:text-sm font-bold border-2 ${
                    m6ViewChoice === 'sai' ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black' : 'bg-white border-slate-200'
                  }`}
                >
                  🔴 SAI
                </button>
              </div>
            </div>

            {/* Bước 2: Chọn lí do thuyết phục nhất */}
            {m6ViewChoice === 'sai' && (
              <div className="p-4 sm:p-5 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-3 animate-fadeIn">
                <p className="font-bold text-xs sm:text-sm text-indigo-950">
                  🎤 Hãy chọn lí do thuyết phục nhất:
                </p>
                <div className="space-y-2">
                  {[
                    { key: 'A', text: 'Vì gia đình nghèo cũng có thể trở nên giàu có.' },
                    { key: 'B', text: 'Vì giá trị của truyền thống nằm ở những điều tốt đẹp được gìn giữ và phát huy, không phụ thuộc gia đình giàu hay nổi tiếng.' },
                    { key: 'C', text: 'Vì mọi gia đình đều có truyền thống giống nhau.' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setM6ReasonChoice(opt.key as any);
                        if (opt.key === 'B') {
                          playCorrectSound();
                          setM6Passed(true);
                          setStars(prev => prev + 15);
                        } else {
                          playWrongSound();
                        }
                      }}
                      className={`w-full p-3 rounded-xl text-left text-xs font-bold border-2 transition-all ${
                        m6ReasonChoice === opt.key
                          ? opt.key === 'B'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                            : 'bg-rose-50 border-rose-400 text-rose-950'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <b>{opt.key}.</b> {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {m6Passed && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setCurrentScreen(7);
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <span>MỞ MÀN 7: GIỮ GÌN HAY CHỈ “TỰ HÀO”?</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN 7: GIỮ GÌN HAY CHỈ TỰ HÀO? */}
        {/* ======================================================== */}
        {currentScreen === 7 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">🧭</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    MÀN 7: PHÂN LOẠI HÀNH ĐỘNG CỦA HỌC SINH
                  </h3>
                  <p className="text-xs text-slate-500">
                    Phân loại hành động vào 2 nhóm: Giữ gìn - Phát huy hay Chưa trách nhiệm
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
                +15 ⭐
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Group 1: GIỮ GÌN - PHÁT HUY */}
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-4 space-y-2">
                <h4 className="text-xs font-black uppercase text-emerald-900 flex items-center space-x-1.5">
                  <span>🌱 GIỮ GÌN – PHÁT HUY</span>
                </h4>
                <div className="space-y-2 min-h-36">
                  {m7Cards.filter(c => c.group === 'good').map(card => (
                    <div key={card.id} className="p-2.5 bg-white rounded-xl border border-emerald-200 text-xs font-bold text-slate-800 flex items-center justify-between shadow-xs">
                      <span>{card.icon} {card.text}</span>
                      <button onClick={() => handleM7Assign(card.id, 'bad')} className="text-slate-400 hover:text-slate-600 text-[10px]">⇄</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group 2: CHƯA THỂ HIỆN TRÁCH NHIỆM */}
              <div className="bg-slate-100 border-2 border-slate-300 rounded-3xl p-4 space-y-2">
                <h4 className="text-xs font-black uppercase text-slate-700 flex items-center space-x-1.5">
                  <span>💤 CHƯA THỂ HIỆN TRÁCH NHIỆM</span>
                </h4>
                <div className="space-y-2 min-h-36">
                  {m7Cards.filter(c => c.group === 'bad').map(card => (
                    <div key={card.id} className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between shadow-xs">
                      <span>{card.icon} {card.text}</span>
                      <button onClick={() => handleM7Assign(card.id, 'good')} className="text-slate-400 hover:text-slate-600 text-[10px]">⇄</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Thẻ chưa gán */}
            {m7Cards.some(c => c.group === null) && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <p className="text-xs font-bold text-slate-600">Chọn nhóm cho các hành động sau:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {m7Cards.filter(c => c.group === null).map(card => (
                    <div key={card.id} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between shadow-xs text-xs">
                      <span className="font-bold text-slate-800">{card.icon} {card.text}</span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleM7Assign(card.id, 'good')}
                          className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold rounded-lg text-[10px]"
                        >
                          🌱 Giữ gìn
                        </button>
                        <button
                          onClick={() => handleM7Assign(card.id, 'bad')}
                          className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg text-[10px]"
                        >
                          💤 Chưa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {m7Passed && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setCurrentScreen(8);
                  }}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <span>MỞ MÀN 8: NẾU LÀ EM (BÌNH VÀ DÒNG HỌ HIẾU HỌC)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN 8: NẾU LÀ EM? (TÌNH HUỐNG BÌNH) */}
        {/* ======================================================== */}
        {currentScreen === 8 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">🎭</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    MÀN 8: NẾU LÀ EM? — TÌNH HUỐNG BẠN BÌNH
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ra quyết định và lập luận lý do vượt qua mặc cảm
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold border border-orange-200">
                +15 ⭐
              </span>
            </div>

            {/* Bối cảnh tình huống */}
            <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-2xl text-xs sm:text-sm text-orange-950 space-y-1.5">
              <p>
                Dòng họ Nguyễn Huy của Bình có truyền thống hiếu học lâu đời. Đầu năm học, dòng họ thường tổ chức lễ trao thưởng cho con cháu có thành tích học tập cao. Nhưng năm nay Bình chưa đạt kết quả tốt nên không được nhận thưởng.
              </p>
              <p className="font-bold italic">
                😔 Bình nghĩ: “Mình học chưa tốt. Chắc mình chẳng thể làm gì để phát huy truyền thống hiếu học của dòng họ.”
              </p>
            </div>

            {/* Lựa chọn của học sinh */}
            <div className="space-y-3">
              <p className="font-bold text-xs sm:text-sm text-slate-800">
                ❓ Nếu là Bình, em chọn cách ứng xử nào?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { key: 'A', text: 'Bỏ cuộc vì mình không có năng khiếu.' },
                  { key: 'B', text: 'Chỉ cần tự hào về những người học giỏi trong dòng họ.' },
                  { key: 'C', text: 'Xác định điểm mình còn yếu, lập kế hoạch học tập và cố gắng tiến bộ từng ngày.' },
                  { key: 'D', text: 'Xin gia đình đừng tổ chức trao thưởng nữa.' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setM8Choice(opt.key);
                      if (opt.key === 'C') playCorrectSound();
                      else playWrongSound();
                    }}
                    className={`p-3 rounded-xl text-left text-xs font-bold border-2 transition-all ${
                      m8Choice === opt.key
                        ? opt.key === 'C'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-rose-50 border-rose-400 text-rose-950'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <b>{opt.key}.</b> {opt.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Vì sao C tốt hơn B? */}
            {m8Choice === 'C' && (
              <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800">
                    🧠 Vì sao phương án C tốt hơn B?
                  </h4>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setM8HintLevel(1)}
                      className="px-2 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-lg"
                    >
                      💡 Gợi ý 1
                    </button>
                    <button
                      onClick={() => setM8HintLevel(2)}
                      className="px-2 py-1 bg-amber-200 text-amber-900 text-[10px] font-bold rounded-lg"
                    >
                      💡 Gợi ý 2
                    </button>
                  </div>
                </div>

                {m8HintLevel >= 1 && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    💡 <b>Gợi ý cấp 1:</b> “Tự hào” mới chỉ là suy nghĩ trong đầu, còn truyền thống cần được tiếp nối bằng hành động thực tế nào?
                  </p>
                )}
                {m8HintLevel >= 2 && (
                  <p className="text-[11px] text-amber-900 bg-amber-100 p-2.5 rounded-xl border border-amber-300">
                    💡 <b>Gợi ý cấp 2:</b> Muốn phát huy một truyền thống, em không thể chỉ đứng nhìn người khác giỏi mà chính bản thân phải cố gắng vượt khó.
                  </p>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={m8Reason}
                    onChange={(e) => setM8Reason(e.target.value)}
                    placeholder="Nhập lí do của em (VD: Tự hào phải đi đôi với nỗ lực học tập thực tế...)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                  />
                  <button
                    onClick={handleM8Submit}
                    className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            )}

            {m8Submitted && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setCurrentScreen(9);
                  }}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <span>MỞ MÀN 9: BOSS LEVEL — EM LÀ NGƯỜI QUYẾT ĐỊNH</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN 9: BOSS LEVEL — EM LÀ NGƯỜI QUYẾT ĐỊNH */}
        {/* ======================================================== */}
        {currentScreen === 9 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">🏆</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-rose-700 flex items-center space-x-2">
                    <span>MÀN 9: BOSS LEVEL — EM LÀ NGƯỜI QUYẾT ĐỊNH</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Nhiệm vụ 3 bước giải quyết tình huống nghề truyền thống của Mai
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black border border-rose-300">
                +20 ⭐ BOSS
              </span>
            </div>

            {/* Bối cảnh Mai */}
            <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 space-y-2">
              <p>
                Gia đình Mai nhiều đời làm nghề thủ công truyền thống. Mai rất tự hào nhưng lại nói với các bạn:
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-300 font-bold italic text-slate-900">
                “Em chỉ cần nói với bạn bè rằng gia đình em có nghề truyền thống là đủ. Em không cần tìm hiểu hay làm gì thêm.”
              </div>
            </div>

            {/* Bước 1: Đồng ý hay không */}
            <div className="space-y-2">
              <p className="font-bold text-xs sm:text-sm text-slate-800">
                ① Em có đồng ý với lời nói của Mai không?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    playWrongSound();
                    setM9Agree('yes');
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold border-2 ${
                    m9Agree === 'yes' ? 'bg-rose-50 border-rose-400 text-rose-900' : 'bg-white border-slate-200'
                  }`}
                >
                  👍 Đồng ý
                </button>
                <button
                  onClick={() => {
                    playCorrectSound();
                    setM9Agree('no');
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold border-2 ${
                    m9Agree === 'no' ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black' : 'bg-white border-slate-200'
                  }`}
                >
                  👎 Không đồng ý
                </button>
              </div>
            </div>

            {/* Bước 2: Chọn bằng chứng từ bài học */}
            {m9Agree === 'no' && (
              <div className="space-y-2 animate-fadeIn">
                <p className="font-bold text-xs sm:text-sm text-slate-800">
                  ② Chọn luận điểm từ bài học để thuyết phục Mai:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Tự hào phải đi đôi với hành động giữ gìn cụ thể.',
                    'Nếu thế hệ trẻ không học nghề thì truyền thống sẽ bị mai một.',
                    'Chỉ khoe khoang mà không làm là ỷ lại, thiếu trách nhiệm.',
                    'Gia đình có nghề gì thì bắt buộc con cái phải làm y hệt.',
                  ].map((text, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        playClickSound();
                        setM9Evidence(prev => prev.includes(text) ? prev.filter(t => t !== text) : [...prev, text]);
                      }}
                      className={`p-2.5 rounded-xl text-left text-xs font-medium border-2 ${
                        m9Evidence.includes(text)
                          ? i === 3
                            ? 'bg-rose-50 border-rose-400 text-rose-950'
                            : 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      {m9Evidence.includes(text) ? '✓ ' : '○ '} {text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bước 3: Đề xuất hành động cụ thể cho Mai */}
            {m9Agree === 'no' && m9Evidence.length >= 2 && (
              <div className="space-y-3 animate-fadeIn bg-rose-50/50 p-4 rounded-2xl border border-rose-200">
                <p className="font-bold text-xs sm:text-sm text-rose-950">
                  ③ Nếu là Mai, em sẽ làm MỘT VIỆC GÌ CỤ THỂ để tiếp nối nghề truyền thống?
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={m9ActionPlan}
                    onChange={(e) => setM9ActionPlan(e.target.value)}
                    placeholder="VD: Chủ động học các công đoạn cơ bản từ ông bà, giúp bố mẹ quảng bá sản phẩm..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-rose-200 bg-white text-xs sm:text-sm"
                  />
                  <button
                    onClick={handleM9Submit}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Chốt phương án
                  </button>
                </div>

                {m9Feedback && (
                  <p className="text-xs text-rose-900 font-bold bg-white p-3 rounded-xl border border-rose-200">
                    {m9Feedback}
                  </p>
                )}
              </div>
            )}

            {m9Passed && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setCurrentScreen(10);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <span>MỞ MÀN 10: BẢN ĐỒ “KHÓA CHẶT” BÀI HỌC</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN 10: BẢN ĐỒ “KHÓA CHẶT” BÀI HỌC */}
        {/* ======================================================== */}
        {currentScreen === 10 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">🗺️</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    MÀN 10: BẢN ĐỒ CÂY TRI THỨC — “KHÓA CHẶT” BÀI HỌC
                  </h3>
                  <p className="text-xs text-slate-500">
                    Khám phá cấu trúc 4 tầng của bài học để ghi nhớ trọn đời
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                +15 ⭐
              </span>
            </div>

            {/* Tree Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 're', label: '1. RỄ: Truyền Thống', icon: '🌱' },
                { id: 'than', label: '2. THÂN: Thái Độ', icon: '🪵' },
                { id: 'canh', label: '3. CÀNH: Ý Nghĩa', icon: '🌿' },
                { id: 'hoa', label: '4. HOA/QUẢ: Hành Động', icon: '🍎' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playClickSound();
                    setM10ActiveNode(tab.id as any);
                  }}
                  className={`p-3 rounded-2xl font-bold text-xs border-2 transition-all flex items-center justify-center space-x-1.5 ${
                    m10ActiveNode === tab.id
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Node Content */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 text-xs sm:text-sm text-slate-800 space-y-3">
              {m10ActiveNode === 're' && (
                <div className="space-y-2 animate-fadeIn">
                  <h4 className="font-black text-base text-emerald-800 flex items-center space-x-2">
                    <span>🌱 CÁC TRUYỀN THỐNG TIÊU BIỂU CỦA GIA ĐÌNH, DÒNG HỌ VIỆT NAM</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                    {['❤️ Yêu thương con người', '🙏 Hiếu thảo với ông bà cha mẹ', '📚 Hiếu học, khổ luyện thành tài', '💪 Cần cù, chịu thương chịu khó', '🧵 Giữ nghề thủ công truyền thống', '🇻🇳 Yêu nước, dũng cảm'].map((t, idx) => (
                      <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200 font-bold text-slate-800 shadow-xs">
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {m10ActiveNode === 'than' && (
                <div className="space-y-2 animate-fadeIn">
                  <h4 className="font-black text-base text-amber-800 flex items-center space-x-2">
                    <span>🪵 THÁI ĐỘ: TỰ HÀO & TRÂN TRỌNG</span>
                  </h4>
                  <p className="leading-relaxed">
                    Tự hào là tình cảm thiêng liêng, xuất phát từ lòng biết ơn công lao sinh thành, dưỡng dục và gây dựng của tổ tiên, ông bà. Không tự ti mặc cảm về hoàn cảnh khó khăn, đồng thời không kiêu ngạo dựa dẫm vào danh tiếng gia đình.
                  </p>
                </div>
              )}

              {m10ActiveNode === 'canh' && (
                <div className="space-y-2 animate-fadeIn">
                  <h4 className="font-black text-base text-blue-800 flex items-center space-x-2">
                    <span>🌿 Ý NGHĨA TO LỚN</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    <div className="p-3 bg-white rounded-xl border border-blue-200 text-center">
                      <div className="text-xl">💪</div>
                      <p className="font-bold text-blue-900 mt-1">Kinh nghiệm sống</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-blue-200 text-center">
                      <div className="text-xl">🔥</div>
                      <p className="font-bold text-blue-900 mt-1">Động lực vượt khó</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-blue-200 text-center">
                      <div className="text-xl">❤️</div>
                      <p className="font-bold text-blue-900 mt-1">Sức mạnh tinh thần</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-blue-200 text-center">
                      <div className="text-xl">🤝</div>
                      <p className="font-bold text-blue-900 mt-1">Gắn kết gia đình</p>
                    </div>
                  </div>
                </div>
              )}

              {m10ActiveNode === 'hoa' && (
                <div className="space-y-2 animate-fadeIn">
                  <h4 className="font-black text-base text-rose-800 flex items-center space-x-2">
                    <span>🍎 HOA / QUẢ: HÀNH ĐỘNG CỦA HỌC SINH</span>
                  </h4>
                  <div className="space-y-1.5 pt-1">
                    <p>• <b>Tìm hiểu:</b> Hỏi han ông bà, cha mẹ về cội nguồn, nếp nhà.</p>
                    <p>• <b>Giữ gìn:</b> Chăm ngoan, lễ phép, học tập tốt, rèn luyện nhân cách.</p>
                    <p>• <b>Phát huy:</b> Sáng tạo, học nghề, giới thiệu nét đẹp với bạn bè.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  playClickSound();
                  setCurrentScreen(11);
                }}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center space-x-1.5"
              >
                <span>MỞ MÀN 11: 5 CHÌA KHÓA TRÍ NHỚ (RETRIEVAL)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN 11: 5 CHÌA KHÓA TRÍ NHỚ */}
        {/* ======================================================== */}
        {currentScreen === 11 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">🔐</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    MÀN 11: 5 CHÌA KHÓA TRÍ NHỚ — RETRIEVAL
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ghi nhớ nhanh các từ khóa trước khi thẻ úp xuống!
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 text-xs font-bold border border-yellow-300">
                +20 ⭐
              </span>
            </div>

            {/* 5 Thẻ Lật */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  {m11Flipped ? '🙈 Các thẻ đã úp xuống! Hãy tự tái hiện kiến thức:' : `⏳ Thời gian ghi nhớ: ${m11Countdown}s`}
                </span>
                {!m11Flipped && (
                  <button
                    onClick={() => {
                      playClickSound();
                      setM11Flipped(true);
                    }}
                    className="text-xs bg-slate-800 text-white px-3 py-1 rounded-lg font-bold"
                  >
                    Tôi đã nhớ, úp thẻ ngay!
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {['TRUYỀN THỐNG', 'TỰ HÀO', 'TRÂN TRỌNG', 'GIỮ GÌN', 'PHÁT HUY'].map((keyword, i) => (
                  <div
                    key={keyword}
                    className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center p-3 text-center transition-all ${
                      !m11Flipped
                        ? 'bg-amber-50 border-amber-300 text-amber-950 font-black shadow-sm'
                        : 'bg-slate-800 border-slate-700 text-slate-400 font-mono text-xl'
                    }`}
                  >
                    {!m11Flipped ? (
                      <>
                        <span className="text-xl mb-1">🔑</span>
                        <span className="text-xs font-black">{keyword}</span>
                      </>
                    ) : (
                      <span>🔒 #{i + 1}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Nhập câu tái hiện */}
            {m11Flipped && (
              <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 animate-fadeIn">
                <p className="font-bold text-xs sm:text-sm text-slate-800">
                  🧠 Dùng ít nhất 3 từ khóa vừa nhớ được để nói lại điều quan trọng nhất của bài học bằng lời của chính mình:
                </p>

                {/* Gợi ý bấm chọn nhanh các tag đã nhớ */}
                <div className="flex flex-wrap gap-2">
                  {['TRUYỀN THỐNG', 'TỰ HÀO', 'TRÂN TRỌNG', 'GIỮ GÌN', 'PHÁT HUY'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleToggleM11Tag(tag)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                        m11SelectedTags.includes(tag) ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      {m11SelectedTags.includes(tag) ? '✓ ' : '+ '} {tag}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={2}
                  value={m11UserRecall}
                  onChange={(e) => setM11UserRecall(e.target.value)}
                  placeholder="Gõ câu đúc kết của em tại đây (VD: Em luôn tự hào về truyền thống gia đình, trân trọng và cố gắng giữ gìn, phát huy bằng việc học tập tốt...)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                />

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-500">
                    Đã chọn {m11SelectedTags.length}/3 từ khóa
                  </span>
                  <button
                    onClick={handleM11Submit}
                    disabled={m11SelectedTags.length < 3 && !m11UserRecall.trim()}
                    className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md"
                  >
                    Hoàn thành Màn 11
                  </button>
                </div>
              </div>
            )}

            {m11Passed && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setCurrentScreen(12);
                    setM12TimerActive(true);
                  }}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <span>MỞ MÀN 12: THỬ THÁCH 60 GIÂY ⚡</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN 12: THỬ THÁCH 60 GIÂY */}
        {/* ======================================================== */}
        {currentScreen === 12 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    MÀN 12: THỬ THÁCH 60 GIÂY TỐC ĐỘ
                  </h3>
                  <p className="text-xs text-slate-500">
                    3 câu hỏi thần tốc để mở khóa Huy hiệu danh dự
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 font-mono font-black text-sm px-3.5 py-1.5 rounded-2xl bg-rose-100 text-rose-700 border border-rose-300">
                <span>⏱️ {m12Timer}s</span>
              </div>
            </div>

            {/* 3 Câu hỏi tốc độ */}
            <div className="space-y-4">
              {/* Q1 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  1/3 🌱 Đâu là một truyền thống tốt đẹp của gia đình, dòng họ?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Hiếu học', 'Khoe của', 'Đua đòi', 'Coi thường người khác'].map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectM12Option(1, opt)}
                      className={`p-2.5 rounded-xl text-xs font-bold border-2 ${
                        m12Answers[1] === opt
                          ? opt === 'Hiếu học' ? 'bg-emerald-50 border-emerald-500 text-emerald-950' : 'bg-rose-50 border-rose-400 text-rose-950'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q2 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  2/3 🚀 Tại sao cần tự hào về truyền thống tốt đẹp của gia đình, dòng họ?
                </p>
                <div className="space-y-2">
                  {[
                    { key: 'A', text: 'Để chứng minh gia đình mình hơn người khác.' },
                    { key: 'B', text: 'Vì truyền thống đem lại kinh nghiệm, động lực và sức mạnh, đồng thời cần được tiếp nối.' },
                    { key: 'C', text: 'Vì mọi việc của thế hệ trước đều phải giữ nguyên.' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectM12Option(2, opt.key)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-bold border-2 ${
                        m12Answers[2] === opt.key
                          ? opt.key === 'B' ? 'bg-emerald-50 border-emerald-500 text-emerald-950' : 'bg-rose-50 border-rose-400 text-rose-950'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {opt.key}. {opt.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q3 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  3/3 🏆 Lan rất tự hào vì gia đình có truyền thống hiếu học. Việc làm nào thể hiện phát huy truyền thống rõ nhất?
                </p>
                <div className="space-y-2">
                  {[
                    { key: 'A', text: 'Kể cho mọi người nghe gia đình có nhiều người học giỏi.' },
                    { key: 'B', text: 'Treo bằng khen của người thân trong phòng.' },
                    { key: 'C', text: 'Chủ động học tập, khắc phục điểm yếu và giúp em nhỏ trong nhà cùng tiến bộ.' },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectM12Option(3, opt.key)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-bold border-2 ${
                        m12Answers[3] === opt.key
                          ? opt.key === 'C' ? 'bg-emerald-50 border-emerald-500 text-emerald-950' : 'bg-rose-50 border-rose-400 text-rose-950'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {opt.key}. {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {m12Answers[1] && m12Answers[2] && m12Answers[3] && !m12Finished && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleFinishM12}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md"
                >
                  Nộp bài thử thách 60s
                </button>
              </div>
            )}

            {m12Finished && (
              <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl text-center space-y-3 animate-scaleUp">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-400 flex items-center justify-center text-3xl shadow-lg">
                  🏅
                </div>
                <h4 className="font-black text-lg text-amber-950">
                  CHÚC MỪNG EM ĐÃ ĐẠT HUY HIỆU: “NGƯỜI GIỮ LỬA GIA ĐÌNH”
                </h4>
                <p className="text-xs text-amber-900 max-w-md mx-auto">
                  Em đã vượt qua toàn bộ 12 màn thử thách trí tuệ và tư duy GDCD 6 một cách xuất sắc!
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setCurrentScreen(13);
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-black text-sm rounded-2xl shadow-lg hover:scale-102 active:scale-98 transition-all"
                  >
                    🌟 MỞ KHÓA MÀN CUỐI: “KHO BÁU CỦA GIA ĐÌNH EM”
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* MÀN CUỐI: KHO BÁU CỦA GIA ĐÌNH EM (CAM KẾT CÁ NHÂN HÓA) */}
        {/* ======================================================== */}
        {currentScreen === 13 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <span className="text-2xl">🌟</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">
                    MÀN CUỐI: “KHO BÁU CỦA GIA ĐÌNH EM” — BẢN CAM KẾT HÀNH ĐỘNG
                  </h3>
                  <p className="text-xs text-slate-500">
                    Điền cảm nhận cá nhân hóa và ký tên vào bản cam kết thiêng liêng
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black border border-amber-300">
                +30 ⭐ ĐÍCH
              </span>
            </div>

            {!isCommitted ? (
              <div className="bg-slate-50 rounded-3xl p-5 sm:p-6 border-2 border-slate-200 space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-xs sm:text-sm text-slate-800 flex items-center space-x-1.5">
                    <span>🏡 1. Gia đình / dòng họ em có điều tốt đẹp nào khiến em trân trọng hoặc tự hào nhất?</span>
                  </label>
                  <input
                    type="text"
                    value={commitTradition}
                    onChange={(e) => setCommitTradition(e.target.value)}
                    placeholder="VD: Truyền thống hiếu học / Cần cù lao động / Giữ nghề làm bánh cốm / Đoàn kết yêu thương lối xóm..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-xs sm:text-sm text-slate-800 flex items-center space-x-1.5">
                    <span>❤️ 2. Em học được điều gì quý giá từ điều tốt đẹp ấy?</span>
                  </label>
                  <textarea
                    rows={2}
                    value={commitLesson}
                    onChange={(e) => setCommitLesson(e.target.value)}
                    placeholder="VD: Em học được tính kiên trì, không nản chí trước khó khăn và luôn biết ơn ông bà cha mẹ..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-xs sm:text-sm text-slate-800 flex items-center space-x-1.5">
                    <span>🌱 3. Trong 7 ngày tới, em sẽ làm MỘT việc cụ thể nào để giữ gìn hoặc phát huy điều tốt đẹp đó?</span>
                  </label>
                  <input
                    type="text"
                    value={commitAction}
                    onChange={(e) => setCommitAction(e.target.value)}
                    placeholder="VD: Chủ động hỏi chuyện ông bà về cội nguồn / Tự giác học bài đúng giờ / Giúp mẹ dọn dẹp nhà cửa..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleFinalCommitment}
                    className="w-full py-3.5 bg-gradient-to-r from-rose-600 via-amber-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center space-x-2"
                  >
                    <Heart className="w-5 h-5 fill-white" />
                    <span>❤️ XÁC NHẬN CAM KẾT CỦA EM</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Giấy Cam Kết / Chứng Nhận Đã Hoàn Thành */
              <div className="bg-gradient-to-b from-amber-50/80 via-white to-orange-50/80 rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl space-y-6 text-center animate-scaleUp">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center text-4xl shadow-inner border-4 border-white">
                    🏆
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    CHỨNG NHẬN HOÀN THÀNH HÀNH TRÌNH
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 pt-2">
                    BẢN CAM KẾT: NGƯỜI GIỮ LỬA GIA ĐÌNH
                  </h3>
                  <p className="text-xs text-slate-500">
                    Học sinh: <b className="text-slate-800">{studentProgress?.studentName || 'Học Sinh Lớp 6'}</b> • Lớp: <b className="text-slate-800">{studentProgress?.studentClass || '6A8'}</b> • Trường: <b>THCS Tân Hải</b>
                  </p>
                </div>

                <div className="max-w-lg mx-auto bg-white p-5 rounded-2xl border border-amber-200 text-left text-xs sm:text-sm space-y-3 shadow-sm">
                  <p>
                    <b>🏡 Truyền thống đáng tự hào:</b> {commitTradition}
                  </p>
                  <p>
                    <b>❤️ Bài học đúc kết:</b> {commitLesson}
                  </p>
                  <p>
                    <b>🌱 Hành động 7 ngày tới:</b> {commitAction}
                  </p>
                </div>

                {/* Thông điệp sâu sắc cốt lõi */}
                <div className="p-4 bg-amber-100/80 rounded-2xl border border-amber-300 text-xs sm:text-sm text-amber-950 font-bold max-w-xl mx-auto leading-relaxed">
                  ✨ “Kho báu quý nhất không phải là điều chúng ta chỉ kể về gia đình mình, mà là những giá trị tốt đẹp chúng ta biết trân trọng và tiếp tục bằng hành động.”
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center space-x-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>In Phiếu Học Tập</span>
                  </button>
                  <button
                    onClick={() => {
                      playClickSound();
                      onBack();
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-md hover:from-amber-600 hover:to-orange-600 flex items-center space-x-1.5"
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    <span>Hoàn Tất & Về Bài Học</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
