import React, { useState, useEffect, useRef } from 'react';
import { StudentProgress } from '../types';
import { 
  DEFAULT_SCHOOL_NAME, DEFAULT_ADMIN_NAME 
} from '../utils/storage';
import { 
  LESSON_1_OFFICIAL_ANSWER_KEY, gradeLesson1Submission 
} from '../data/lesson1OfficialAnswers';
import { 
  CheckCircle2, Clock, Award, Shield, AlertCircle, ArrowRight, 
  RotateCcw, Sparkles, Send, Check, X, FileText, Printer, Lock, 
  ChevronRight, Compass, Heart, Flame, BookOpen, HelpCircle, Eye
} from 'lucide-react';
import { playClickSound, playCorrectSound, playWrongSound, playFanfareSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface InteractiveLesson1WorksheetProps {
  progress: StudentProgress;
  onBack: () => void;
  onSaveProgress: (score: number, commitment: any) => void;
  onOpenRegisterModal?: () => void;
}

export default function InteractiveLesson1Worksheet({
  progress,
  onBack,
  onSaveProgress,
  onOpenRegisterModal
}: InteractiveLesson1WorksheetProps) {
  const studentName = progress.studentName || 'Học sinh';
  const studentClass = progress.studentClass || '6A8';
  const isRegistered = Boolean(progress.isRegistered && progress.studentName);

  // Check if already submitted previously
  const isAlreadySubmitted = Boolean(progress.familyTreasureQuestCompleted);
  const previousScore = progress.familyTreasureQuestScore ?? 10;

  // Active Stage Tab (Chặng 1 -> Chặng 5)
  const [activeStage, setActiveStage] = useState<number>(1);

  // Timer State (15 minutes countdown = 900 seconds)
  const INITIAL_TIME_SECONDS = 900;
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(!isAlreadySubmitted);

  // Lock status: "khi đã nộp thì không được sửa lại"
  const [isSubmitted, setIsSubmitted] = useState<boolean>(isAlreadySubmitted);
  const [showConfirmSubmitModal, setShowConfirmSubmitModal] = useState<boolean>(false);
  const [showAnswerKeyModal, setShowAnswerKeyModal] = useState<boolean>(false);

  // Results & Grading
  const [gradedResult, setGradedResult] = useState<any>(
    isAlreadySubmitted ? gradeLesson1Submission({
      q1Selected: ['hieu_hoc', 'hieu_thao', 'can_cu', 'yeu_thuong', 'giu_nghe', 'yeu_nuoc'],
      q2Choice: 'B',
      q2Detail: 'Trẻ em đến tuổi đều được tới trường, nhiều người đạt thành tích cao trong học tập.',
      q3Pairs: { "1": "b", "2": "c", "3": "a", "4": "d" },
      q4Blanks: ['tự hào', 'truyền thống', 'kinh nghiệm', 'sức mạnh'],
      q5Choice: 'sai',
      q5Reason: 'Truyền thống bắt nguồn từ giá trị đạo đức tốt đẹp chứ không phụ thuộc sự giàu có.',
      q6Choice: 'C',
      q6Reason: 'Mai tự giác học tập và chỉ bảo em nhỏ bằng hành động thực tế.',
      q7Should: [1, 2, 4, 6],
      q7ShouldNot: [3, 5],
      q8Choice: 'C',
      q8Reason: 'Cố gắng tiến bộ từng ngày quan trọng hơn là áp lực đứng đầu.',
      q9Agree: 'no',
      q9Reason: 'Cần bắt tay vào học nghề và phụ giúp gia đình.',
      q9Actions: 'Học công thức làm bánh từ cha mẹ và giới thiệu bánh sạch đến bạn bè.',
      q10Keywords: ['hiếu học', 'hiếu thảo', 'cần cù', 'tự hào', 'giữ gìn'],
      q10Sentence: 'Em luôn tự hào về truyền thống hiếu học và cần cù của gia đình.',
      ticketPride: 'Gia đình luôn yêu thương và đoàn kết.',
      ticketLesson: 'Luôn biết ơn và nỗ lực học tập.',
      ticketAction: 'Chăm ngoan học bài và giúp đỡ ông bà.'
    }) : null
  );

  // FORM ANSWERS STATE
  // Chặng 1
  const [q1Selected, setQ1Selected] = useState<string[]>(
    isAlreadySubmitted ? ['hieu_hoc', 'hieu_thao', 'can_cu', 'yeu_thuong', 'giu_nghe', 'yeu_nuoc'] : []
  );
  const [q1Keywords, setQ1Keywords] = useState<string>(
    isAlreadySubmitted ? 'Hiếu học, hiếu thảo, cần cù, yêu nước' : ''
  );
  const [q2Choice, setQ2Choice] = useState<string>(isAlreadySubmitted ? 'B' : '');
  const [q2Detail, setQ2Detail] = useState<string>(
    isAlreadySubmitted ? 'Trẻ em đến tuổi đều được tới trường, nhiều người đạt thành tích cao trong học tập' : ''
  );

  // Chặng 2
  const [q3Pairs, setQ3Pairs] = useState<Record<string, string>>(
    isAlreadySubmitted ? { "1": "b", "2": "c", "3": "a", "4": "d" } : {}
  );
  const [q3SelectedLeft, setQ3SelectedLeft] = useState<string | null>(null);

  const [q4Blanks, setQ4Blanks] = useState<string[]>(
    isAlreadySubmitted ? ['tự hào', 'truyền thống', 'kinh nghiệm', 'sức mạnh'] : ['', '', '', '']
  );

  // Chặng 3
  const [q5Choice, setQ5Choice] = useState<'dung' | 'sai' | ''>(isAlreadySubmitted ? 'sai' : '');
  const [q5Reason, setQ5Reason] = useState<string>(
    isAlreadySubmitted ? 'Truyền thống gia đình dòng họ xuất phát từ giá trị đạo đức, nhân cách tốt đẹp, không phân biệt giàu nghèo.' : ''
  );
  const [q6Choice, setQ6Choice] = useState<string>(isAlreadySubmitted ? 'C' : '');
  const [q6Reason, setQ6Reason] = useState<string>(
    isAlreadySubmitted ? 'Bạn Mai tự giác học tập, chủ động khắc phục điểm yếu và hướng dẫn em nhỏ.' : ''
  );

  // Chặng 4
  const [q7Should, setQ7Should] = useState<number[]>(isAlreadySubmitted ? [1, 2, 4, 6] : []);
  const [q7ShouldNot, setQ7ShouldNot] = useState<number[]>(isAlreadySubmitted ? [3, 5] : []);

  const [q8Choice, setQ8Choice] = useState<string>(isAlreadySubmitted ? 'C' : '');
  const [q8Reason, setQ8Reason] = useState<string>(
    isAlreadySubmitted ? 'Không nhất thiết phải đứng đầu lớp, quan trọng là có ý chí vượt khó và nỗ lực tiến bộ mỗi ngày.' : ''
  );

  // Chặng 5
  const [q9Agree, setQ9Agree] = useState<'yes' | 'no' | ''>(isAlreadySubmitted ? 'no' : '');
  const [q9Reason, setQ9Reason] = useState<string>(
    isAlreadySubmitted ? 'Phát huy truyền thống đòi hỏi hành động thực tế chứ không chỉ nói suông.' : ''
  );
  const [q9Actions, setQ9Actions] = useState<string>(
    isAlreadySubmitted ? '1. Học hỏi bí quyết làm bánh từ cha mẹ; 2. Giúp gia đình quảng bá sản phẩm sạch đến mọi người.' : ''
  );

  const [q10Keywords, setQ10Keywords] = useState<string[]>(
    isAlreadySubmitted ? ['hiếu học', 'hiếu thảo', 'truyền thống', 'tự hào', 'kinh nghiệm'] : []
  );
  const [q10Sentence, setQ10Sentence] = useState<string>(
    isAlreadySubmitted ? 'Em tự hào về truyền thống hiếu học của gia đình và sẽ giữ gìn nét đẹp ấy.' : ''
  );

  // Bản đồ & Tấm vé
  const [mindmapSlots, setMindmapSlots] = useState<{ [key: string]: string }>(
    isAlreadySubmitted ? { m1: 'Cần cù', m2: 'Yêu nước', m3: 'Sức mạnh', m4: 'Phát huy' } : {}
  );
  const [ticketPride, setTicketPride] = useState<string>(
    isAlreadySubmitted ? 'Gia đình luôn yêu thương, sống chân thành và giữ chữ tín.' : ''
  );
  const [ticketLesson, setTicketLesson] = useState<string>(
    isAlreadySubmitted ? 'Phải luôn nỗ lực trong học tập và sống có trách nhiệm.' : ''
  );
  const [ticketAction, setTicketAction] = useState<string>(
    isAlreadySubmitted ? 'Tuần này em sẽ tự giác dọn dẹp nhà cửa và học bài đúng giờ.' : ''
  );

  // Countdown timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeft > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            // Auto-submit when time is up
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, isSubmitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Toggle Checkbox for Câu 1
  const toggleQ1Item = (id: string) => {
    if (isSubmitted) return;
    playClickSound();
    setQ1Selected(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Handle Matching for Câu 3
  const handleSelectLeftQ3 = (leftId: string) => {
    if (isSubmitted) return;
    playClickSound();
    if (q3SelectedLeft === leftId) {
      setQ3SelectedLeft(null);
    } else {
      setQ3SelectedLeft(leftId);
    }
  };

  const handleSelectRightQ3 = (rightId: string) => {
    if (isSubmitted) return;
    if (!q3SelectedLeft) return;
    playClickSound();
    setQ3Pairs(prev => ({
      ...prev,
      [q3SelectedLeft]: rightId
    }));
    setQ3SelectedLeft(null);
  };

  // Handle Fill in blank click for Câu 4
  const handleInsertWordQ4 = (word: string, index: number) => {
    if (isSubmitted) return;
    playClickSound();
    setQ4Blanks(prev => {
      const copy = [...prev];
      copy[index] = word;
      return copy;
    });
  };

  // Handle Move item for Câu 7 (Nên / Không nên)
  const handleAssignQ7 = (itemId: number, target: 'should' | 'shouldNot') => {
    if (isSubmitted) return;
    playClickSound();
    if (target === 'should') {
      setQ7Should(prev => prev.includes(itemId) ? prev : [...prev, itemId]);
      setQ7ShouldNot(prev => prev.filter(x => x !== itemId));
    } else {
      setQ7ShouldNot(prev => prev.includes(itemId) ? prev : [...prev, itemId]);
      setQ7Should(prev => prev.filter(x => x !== itemId));
    }
  };

  // Final Submit Handler: "khi đã nộp thì không được sửa lại"
  const handleFinalSubmit = () => {
    setShowConfirmSubmitModal(false);
    setIsTimerRunning(false);
    setIsSubmitted(true); // LOCK ALL INPUTS

    const studentAnswers = {
      q1Selected,
      q1Keywords,
      q2Choice,
      q2Detail,
      q3Pairs,
      q4Blanks,
      q5Choice,
      q5Reason,
      q6Choice,
      q6Reason,
      q7Should,
      q7ShouldNot,
      q8Choice,
      q8Reason,
      q9Agree,
      q9Reason,
      q9Actions,
      q10Keywords,
      q10Sentence,
      ticketPride,
      ticketLesson,
      ticketAction
    };

    // Auto grading via official answer key
    const results = gradeLesson1Submission(studentAnswers);
    setGradedResult(results);

    // Play sounds & confetti
    if (results.totalScore >= 7.0) {
      playFanfareSound();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } else {
      playCorrectSound();
    }

    // Save to global progress
    onSaveProgress(results.totalScore, {
      tradition: ticketPride || 'Hiếu học và yêu thương gia đình',
      lessonLearned: ticketLesson || 'Giữ gìn truyền thống tốt đẹp',
      sevenDayAction: ticketAction || 'Chăm ngoan học tập, vâng lời ông bà cha mẹ',
      completedAt: new Date().toISOString()
    });
  };

  const stagesList = [
    { num: 1, title: 'Em Nhận Ra', icon: '🌱', desc: 'Săn tìm truyền thống & Dòng họ Đặng' },
    { num: 2, title: 'Em Hiểu', icon: '🚀', desc: 'Nối ý nghĩa & Công thức trí nhớ' },
    { num: 3, title: 'Bẫy Tư Duy', icon: '🕵️', desc: 'Nhận định đúng sai & Phân biệt' },
    { num: 4, title: 'Giữ Lửa Gia Đình', icon: '❤️', desc: 'Nên/Không nên & Tình huống Bình' },
    { num: 5, title: 'Thử Thách Cao Thủ', icon: '🏆', desc: 'Tình huống Lan & Tấm vé rời bài' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto pb-20">
      
      {/* HEADER: School Name, Title, Student Info, Timer */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden border-2 border-indigo-500/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-800/80 pb-5">
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shrink-0 shadow-md">
              🌳
            </div>
            <div>
              <div className="inline-flex items-center space-x-2 bg-yellow-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-1">
                <span>{DEFAULT_SCHOOL_NAME}</span>
                <span>• GDCD 6</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-white">
                PHIẾU BÀI TẬP GDCD 6 – BÀI 1: TỰ HÀO VỀ TRUYỀN THỐNG GIA ĐÌNH, DÒNG HỌ
              </h1>
              <p className="text-xs sm:text-sm text-yellow-200 mt-0.5 font-medium">
                Nhiệm vụ: Chinh phục 5 chặng thử thách để trở thành 🏆 <b>NGƯỜI GIỮ LỬA GIA ĐÌNH</b>
              </p>
            </div>
          </div>

          {/* Student Status & Countdown Timer */}
          <div className="flex items-center flex-wrap gap-2.5 self-start md:self-auto">
            {/* Student ID badge */}
            <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/20 flex items-center space-x-2">
              <span className="text-lg">🎓</span>
              <div className="text-left">
                <p className="text-[10px] text-yellow-300 font-bold uppercase">Học sinh:</p>
                <p className="text-xs font-black text-white">{studentName} ({studentClass})</p>
              </div>
            </div>

            {/* Timer Display */}
            <div className={`px-3.5 py-2 rounded-2xl border flex items-center space-x-2 shadow-inner ${
              timeLeft < 180 && !isSubmitted
                ? 'bg-rose-600/90 text-white border-rose-400 animate-pulse'
                : 'bg-indigo-950/80 text-white border-indigo-400/40'
            }`}>
              <Clock className="w-4 h-4 text-yellow-300" />
              <div>
                <p className="text-[9px] uppercase tracking-wider text-yellow-300/80 font-bold">
                  {isSubmitted ? 'Trạng thái' : 'Thời gian'}
                </p>
                <p className="text-xs font-mono font-black">
                  {isSubmitted ? 'ĐÃ NỘP BÀI' : formatTimer(timeLeft)}
                </p>
              </div>
            </div>

            {/* Submit / Locked badge */}
            {isSubmitted ? (
              <div className="bg-emerald-500 text-slate-950 px-3 py-2 rounded-2xl font-black text-xs flex items-center space-x-1.5 shadow-md">
                <Lock className="w-4 h-4" />
                <span>BÀI ĐÃ KHÓA</span>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmSubmitModal(true)}
                className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center space-x-1.5 shadow-md active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>NỘP BÀI NGAY</span>
              </button>
            )}
          </div>
        </div>

        {/* Rule Alert Banner */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-yellow-100 bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-yellow-400/30">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-yellow-300 shrink-0" />
            <span>
              <b>Lưu ý quan trọng:</b> Bài tập có tính giờ. Khi đã nộp bài, hệ thống sẽ tự động chấm điểm và <b>KHÔNG ĐƯỢC SỬA LẠI</b>.
            </span>
          </div>
          {isSubmitted && (
            <button
              onClick={() => setShowAnswerKeyModal(true)}
              className="text-xs font-bold text-yellow-300 hover:text-white underline flex items-center space-x-1 shrink-0"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem Bảng Đáp Án Chi Tiết</span>
            </button>
          )}
        </div>
      </div>

      {/* GRADED RESULT BANNER IF SUBMITTED */}
      {isSubmitted && gradedResult && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 p-5 sm:p-6 rounded-3xl shadow-md animate-slideDown">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg shrink-0">
                🏆
              </div>
              <div>
                <div className="inline-flex items-center space-x-1.5 bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase">
                  <span>Hệ thống tự động chấm điểm</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Điểm số: <span className="text-emerald-700">{gradedResult.totalScore} / 10 điểm</span>
                </h2>
                <p className="text-sm font-bold text-emerald-800 mt-0.5">
                  Danh hiệu: <span className="text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded-lg">{gradedResult.honorTitle}</span>
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Bài làm của em đã được lưu vào học bạ điện tử của lớp {studentClass}. Toàn bộ câu trả lời đã được khóa theo đúng quy chế kiểm tra.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 self-end md:self-auto">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>In Phiếu Điểm</span>
              </button>
              <button
                onClick={() => setShowAnswerKeyModal(true)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Đối chiếu đáp án</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5 STAGES NAVIGATION TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {stagesList.map((stage) => {
          const isActive = activeStage === stage.num;
          return (
            <button
              key={stage.num}
              onClick={() => {
                playClickSound();
                setActiveStage(stage.num);
              }}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">{stage.icon}</span>
                <div>
                  <p className={`text-[10px] font-black uppercase ${isActive ? 'text-yellow-300' : 'text-slate-400'}`}>
                    Chặng {stage.num}
                  </p>
                  <h3 className="font-extrabold text-xs sm:text-sm truncate">
                    {stage.title}
                  </h3>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* CHẶNG 1: EM NHẬN RA */}
      {/* ======================================================== */}
      {activeStage === 1 && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center space-x-3 text-emerald-900 text-xs sm:text-sm font-medium">
            <span className="text-2xl">🌱</span>
            <p>
              <b>Mục tiêu Chặng 1:</b> Nhận diện được một số truyền thống tốt đẹp của gia đình, dòng họ Việt Nam và tìm kiếm minh chứng cụ thể từ câu chuyện khám phá.
            </p>
          </div>

          {/* Câu 1: Săn tìm truyền thống */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                Câu 1 • Nhận biết
              </span>
              <span className="text-xs text-slate-500 font-bold">1.0 Điểm</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              🔎 Săn tìm truyền thống: Đánh dấu ✓ vào những truyền thống tốt đẹp của gia đình, dòng họ
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { id: 'hieu_hoc', label: 'Hiếu học', isCorrect: true },
                { id: 'hieu_thao', label: 'Hiếu thảo', isCorrect: true },
                { id: 'can_cu', label: 'Cần cù lao động', isCorrect: true },
                { id: 'yeu_thuong', label: 'Yêu thương con người', isCorrect: true },
                { id: 'giu_nghe', label: 'Giữ nghề truyền thống', isCorrect: true },
                { id: 'khoe_khoang', label: 'Khoe khoang sự giàu có', isCorrect: false },
                { id: 'yeu_nuoc', label: 'Yêu nước', isCorrect: true },
                { id: 'coi_thuong', label: 'Coi thường người khác', isCorrect: false },
              ].map((item) => {
                const checked = q1Selected.includes(item.id);
                return (
                  <button
                    key={item.id}
                    disabled={isSubmitted}
                    onClick={() => toggleQ1Item(item.id)}
                    className={`p-3.5 rounded-2xl border-2 text-left flex items-center space-x-3 transition-all ${
                      checked
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    } ${isSubmitted ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}`}
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      checked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400 bg-white'
                    }`}>
                      {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Từ khóa em chọn được */}
            <div className="pt-3">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                🔑 Từ khóa em chọn được từ các truyền thống trên:
              </label>
              <input
                type="text"
                disabled={isSubmitted}
                value={q1Keywords}
                onChange={(e) => setQ1Keywords(e.target.value)}
                placeholder="Nhập các từ khóa em đúc kết được..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-sm disabled:bg-slate-100 disabled:text-slate-600"
              />
            </div>
          </div>

          {/* Câu 2: Giải mã dòng họ Đặng */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">
                Câu 2 • Đọc hiểu tình huống
              </span>
              <span className="text-xs text-slate-500 font-bold">1.0 Điểm</span>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-slate-800 text-xs sm:text-sm leading-relaxed">
              <p className="font-bold text-amber-900 mb-1">📖 Tình huống khám phá (SGK GDCD 6):</p>
              "Dòng họ Đặng ở Sơn La luôn quan tâm việc học của con em. Trẻ em đến tuổi đều được tới trường, nhiều người đạt thành tích cao trong học tập và khi trưởng thành có những đóng góp tích cực cho quê hương, đất nước."
            </div>

            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              Dòng họ Đặng có truyền thống gì?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'A', text: 'Cần cù lao động' },
                { id: 'B', text: 'Hiếu học' },
                { id: 'C', text: 'Giữ nghề truyền thống' },
                { id: 'D', text: 'Hiếu thảo' }
              ].map((opt) => {
                const selected = q2Choice === opt.id;
                return (
                  <button
                    key={opt.id}
                    disabled={isSubmitted}
                    onClick={() => {
                      if (!isSubmitted) {
                        playClickSound();
                        setQ2Choice(opt.id);
                      }
                    }}
                    className={`p-3 rounded-2xl border-2 text-left flex items-center space-x-3 transition-all ${
                      selected
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    } ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      selected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="text-xs sm:text-sm">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Em tìm được chi tiết nào trong đoạn văn chứng minh điều đó?
              </label>
              <textarea
                disabled={isSubmitted}
                rows={2}
                value={q2Detail}
                onChange={(e) => setQ2Detail(e.target.value)}
                placeholder="Ví dụ: luôn quan tâm việc học, trẻ em đến tuổi đều được tới trường..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-sm disabled:bg-slate-100 disabled:text-slate-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CHẶNG 2: EM HIỂU */}
      {/* ======================================================== */}
      {activeStage === 2 && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-center space-x-3 text-blue-900 text-xs sm:text-sm font-medium">
            <span className="text-2xl">🚀</span>
            <p>
              <b>Mục tiêu Chặng 2:</b> Giải thích được ý nghĩa sâu sắc của việc hiểu biết, tự hào và giữ gìn truyền thống gia đình, dòng họ.
            </p>
          </div>

          {/* Câu 3: Nối Cột A với Cột B */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg">
                Câu 3 • Ghép nối tương tác
              </span>
              <span className="text-xs text-slate-500 font-bold">1.0 Điểm</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              🔗 Nối mỗi nội dung ở cột A với nội dung phù hợp ở cột B
            </h3>
            <p className="text-xs text-slate-500">
              {isSubmitted 
                ? 'Đã ghi nhận kết quả nối của em' 
                : 'Cách làm: Bấm chọn 1 ô ở Cột A (màu xanh), sau đó bấm vào 1 ô ở Cột B tương ứng để nối.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Cột A */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-black uppercase text-blue-700 tracking-wider">Cột A</h4>
                {[
                  { id: '1', text: '1. Tự hào về truyền thống' },
                  { id: '2', text: '2. Noi gương người thân' },
                  { id: '3', text: '3. Giữ gìn nền nếp tốt đẹp' },
                  { id: '4', text: '4. Tiếp nối truyền thống' },
                ].map((item) => {
                  const isSelected = q3SelectedLeft === item.id;
                  const targetPair = q3Pairs[item.id];
                  return (
                    <button
                      key={item.id}
                      disabled={isSubmitted}
                      onClick={() => handleSelectLeftQ3(item.id)}
                      className={`w-full p-3 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-100 text-blue-950 font-bold ring-2 ring-blue-400'
                          : targetPair
                          ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold'
                          : 'border-slate-200 hover:border-blue-300 text-slate-800'
                      } ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span className="text-xs sm:text-sm">{item.text}</span>
                      {targetPair && (
                        <span className="text-xs bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full">
                          → {targetPair.toUpperCase()}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Cột B */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-black uppercase text-purple-700 tracking-wider">Cột B</h4>
                {[
                  { id: 'a', text: 'a. Gia đình thêm đoàn kết, đầm ấm' },
                  { id: 'b', text: 'b. Thể hiện sự trân trọng, biết ơn' },
                  { id: 'c', text: 'c. Có thêm động lực vượt khó' },
                  { id: 'd', text: 'd. Làm phong phú truyền thống, bản sắc' },
                ].map((item) => {
                  const isTargetOfCurrent = q3SelectedLeft && q3Pairs[q3SelectedLeft] === item.id;
                  return (
                    <button
                      key={item.id}
                      disabled={isSubmitted}
                      onClick={() => handleSelectRightQ3(item.id)}
                      className={`w-full p-3 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                        isTargetOfCurrent
                          ? 'border-purple-600 bg-purple-100 text-purple-950 font-bold'
                          : 'border-slate-200 hover:border-purple-300 text-slate-800'
                      } ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span className="text-xs sm:text-sm">{item.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center space-x-2">
              <span className="font-bold">Đáp án của em:</span>
              <span>1–{q3Pairs['1'] || '...'} ; 2–{q3Pairs['2'] || '...'} ; 3–{q3Pairs['3'] || '...'} ; 4–{q3Pairs['4'] || '...'}</span>
            </div>
          </div>

          {/* Câu 4: Hoàn thành công thức trí nhớ */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg">
                Câu 4 • Điền khuyết
              </span>
              <span className="text-xs text-slate-500 font-bold">1.0 Điểm</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              💡 Hoàn thành “công thức trí nhớ”
            </h3>
            
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs font-bold text-slate-600 self-center">Các từ cần điền:</span>
              {['sức mạnh', 'tự hào', 'truyền thống', 'kinh nghiệm'].map((word) => (
                <span
                  key={word}
                  className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-xs border border-indigo-200"
                >
                  {word}
                </span>
              ))}
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 text-sm leading-relaxed space-y-3">
              <p>
                Hiểu biết và{' '}
                <input
                  type="text"
                  disabled={isSubmitted}
                  value={q4Blanks[0]}
                  onChange={(e) => handleInsertWordQ4(e.target.value, 0)}
                  placeholder="(1) ..."
                  className="w-28 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center font-bold text-blue-700"
                />{' '}
                về{' '}
                <input
                  type="text"
                  disabled={isSubmitted}
                  value={q4Blanks[1]}
                  onChange={(e) => handleInsertWordQ4(e.target.value, 1)}
                  placeholder="(2) ..."
                  className="w-32 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center font-bold text-blue-700"
                />{' '}
                gia đình, dòng họ giúp chúng ta có thêm{' '}
                <input
                  type="text"
                  disabled={isSubmitted}
                  value={q4Blanks[2]}
                  onChange={(e) => handleInsertWordQ4(e.target.value, 2)}
                  placeholder="(3) ..."
                  className="w-28 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center font-bold text-blue-700"
                />{' '}
                và{' '}
                <input
                  type="text"
                  disabled={isSubmitted}
                  value={q4Blanks[3]}
                  onChange={(e) => handleInsertWordQ4(e.target.value, 3)}
                  placeholder="(4) ..."
                  className="w-28 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center font-bold text-blue-700"
                />{' '}
                trong cuộc sống.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CHẶNG 3: BẪY TƯ DUY */}
      {/* ======================================================== */}
      {activeStage === 3 && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center space-x-3 text-amber-900 text-xs sm:text-sm font-medium">
            <span className="text-2xl">🕵️</span>
            <p>
              <b>Mục tiêu Chặng 3:</b> Phát hiện và vượt qua các ngộ nhận, phân biệt rõ bản chất của truyền thống và người thực sự phát huy truyền thống.
            </p>
          </div>

          {/* Câu 5: Đúng hay sai? Vì sao? */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg">
                Câu 5 • Bẫy tư duy
              </span>
              <span className="text-xs text-slate-500 font-bold">1.0 Điểm</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              Bạn Minh nói: “Chỉ những gia đình, dòng họ giàu có mới có truyền thống đáng tự hào.”
            </h3>

            <div className="flex space-x-4">
              {[
                { val: 'dung', label: '☐ Đúng' },
                { val: 'sai', label: '☑ Sai' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  disabled={isSubmitted}
                  onClick={() => {
                    if (!isSubmitted) {
                      playClickSound();
                      setQ5Choice(opt.val as any);
                    }
                  }}
                  className={`px-5 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${
                    q5Choice === opt.val
                      ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Điều quan trọng hơn: Em hãy giải thích VÌ SAO?
              </label>
              <textarea
                disabled={isSubmitted}
                rows={3}
                value={q5Reason}
                onChange={(e) => setQ5Reason(e.target.value)}
                placeholder="Gợi ý: Một gia đình không giàu nhưng nhiều thế hệ hiếu học, hiếu thảo, cần cù lao động có đáng tự hào không?..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-sm disabled:bg-slate-100 disabled:text-slate-600"
              />
            </div>
          </div>

          {/* Câu 6: Ai thực sự đang phát huy truyền thống? */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg">
                Câu 6 • Đánh giá hành vi
              </span>
              <span className="text-xs text-slate-500 font-bold">1.0 Điểm</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              🎯 Gia đình có truyền thống hiếu học. Theo em, bạn nào đang phát huy truyền thống rõ nhất?
            </h3>

            <div className="space-y-2.5">
              {[
                { id: 'A', text: '🗣️ An thường kể: “Nhà mình có rất nhiều người học giỏi!”' },
                { id: 'B', text: '📱 Bình đăng ảnh bằng khen của anh chị lên mạng xã hội.' },
                { id: 'C', text: '📚 Mai tự giác học tập, khắc phục môn còn yếu và giúp em nhỏ cùng học.' },
                { id: 'D', text: '😴 Nam cho rằng mình học chưa giỏi nên truyền thống hiếu học không liên quan đến mình.' },
              ].map((opt) => {
                const selected = q6Choice === opt.id;
                return (
                  <button
                    key={opt.id}
                    disabled={isSubmitted}
                    onClick={() => {
                      if (!isSubmitted) {
                        playClickSound();
                        setQ6Choice(opt.id);
                      }
                    }}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center space-x-3 transition-all ${
                      selected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      selected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Vì sao em chọn bạn đó?
              </label>
              <input
                type="text"
                disabled={isSubmitted}
                value={q6Reason}
                onChange={(e) => setQ6Reason(e.target.value)}
                placeholder="Nhập lý do vì sao phát huy truyền thống phải thể hiện qua việc làm..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-sm disabled:bg-slate-100 disabled:text-slate-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CHẶNG 4: GIỮ LỬA GIA ĐÌNH */}
      {/* ======================================================== */}
      {activeStage === 4 && (
        <div className="space-y-6">
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center space-x-3 text-rose-900 text-xs sm:text-sm font-medium">
            <span className="text-2xl">❤️</span>
            <p>
              <b>Mục tiêu Chặng 4:</b> Xác định những hành vi nên làm và không nên làm, đồng thời xử lý tình huống thực tế để giữ gìn, phát huy ngọn lửa truyền thống.
            </p>
          </div>

          {/* Câu 7: Phân loại Nên / Không nên */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase px-2.5 py-1 bg-rose-100 text-rose-800 rounded-lg">
                Câu 7 • Phân loại hành vi
              </span>
              <span className="text-xs text-slate-500 font-bold">1.0 Điểm</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              🧭 NÊN / KHÔNG NÊN: Phân loại 6 việc làm sau vào 2 cột thích hợp
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Cột NÊN */}
              <div className="p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-800 font-extrabold text-sm border-b border-emerald-200 pb-2">
                  <span>❤️</span>
                  <span>VIỆC NÊN LÀM ({q7Should.length})</span>
                </div>
                <div className="space-y-2 min-h-[140px]">
                  {[
                    { id: 1, text: '① Hỏi ông bà về truyền thống gia đình.' },
                    { id: 2, text: '② Cố gắng học tập để tiếp nối truyền thống hiếu học.' },
                    { id: 3, text: '③ Chê nghề truyền thống của gia đình là “quê”.' },
                    { id: 4, text: '④ Học hỏi những kinh nghiệm tốt đẹp từ cha mẹ.' },
                    { id: 5, text: '⑤ Chỉ khoe thành tích của người thân nhưng bản thân không cố gắng.' },
                    { id: 6, text: '⑥ Giới thiệu nét đẹp của gia đình, quê hương với bạn bè.' },
                  ].map((item) => {
                    const inShould = q7Should.includes(item.id);
                    const inShouldNot = q7ShouldNot.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                          inShould
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold'
                            : inShouldNot
                            ? 'opacity-40 bg-slate-100 border-slate-200 line-through'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>{item.text}</span>
                        {!isSubmitted && (
                          <div className="flex space-x-1 shrink-0">
                            <button
                              onClick={() => handleAssignQ7(item.id, 'should')}
                              className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                                inShould ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-emerald-200'
                              }`}
                            >
                              Nên
                            </button>
                            <button
                              onClick={() => handleAssignQ7(item.id, 'shouldNot')}
                              className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                                inShouldNot ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-rose-200'
                              }`}
                            >
                              Không
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cột KHÔNG NÊN */}
              <div className="p-4 rounded-2xl border-2 border-rose-300 bg-rose-50/50 space-y-3">
                <div className="flex items-center space-x-2 text-rose-800 font-extrabold text-sm border-b border-rose-200 pb-2">
                  <span>⚠️</span>
                  <span>VIỆC KHÔNG NÊN LÀM ({q7ShouldNot.length})</span>
                </div>
                <div className="space-y-2 min-h-[140px]">
                  {q7ShouldNot.length === 0 ? (
                    <p className="text-xs text-rose-400 italic py-6 text-center">
                      Chưa có việc nào được chuyển vào cột Không Nên
                    </p>
                  ) : (
                    q7ShouldNot.map((id) => (
                      <div
                        key={id}
                        className="p-2.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-950 text-xs font-bold"
                      >
                        Việc số {id}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Câu 8: Nếu là em? */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase px-2.5 py-1 bg-rose-100 text-rose-800 rounded-lg">
                Câu 8 • Xử lý tình huống
              </span>
              <span className="text-xs text-slate-500 font-bold">1.0 Điểm</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed">
              <p className="font-bold text-slate-900 mb-1">🎭 Tình huống Bình (SGK GDCD 6):</p>
              "Dòng họ của Bình có truyền thống hiếu học. Hằng năm, dòng họ trao phần thưởng cho những bạn có thành tích cao. Năm nay Bình không được nhận thưởng vì kết quả học tập chưa cao."
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              Nếu là Bình, em sẽ lựa chọn cách ứng xử nào?
            </h3>

            <div className="space-y-2">
              {[
                { id: 'A', text: 'A. Buồn và không quan tâm đến việc học nữa.' },
                { id: 'B', text: 'B. Nghĩ rằng mình không thể tiếp nối truyền thống.' },
                { id: 'C', text: 'C. Tìm nguyên nhân mình học chưa tốt, lập kế hoạch và cố gắng tiến bộ.' },
                { id: 'D', text: 'D. Ghen tị với những bạn được nhận thưởng.' },
              ].map((opt) => {
                const selected = q8Choice === opt.id;
                return (
                  <button
                    key={opt.id}
                    disabled={isSubmitted}
                    onClick={() => {
                      if (!isSubmitted) {
                        playClickSound();
                        setQ8Choice(opt.id);
                      }
                    }}
                    className={`w-full p-3 rounded-2xl border-2 text-left flex items-center space-x-3 transition-all ${
                      selected
                        ? 'border-rose-600 bg-rose-50 text-rose-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      selected ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {opt.id}
                    </span>
                    <span className="text-xs sm:text-sm">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bình có nhất thiết phải đứng đầu lớp mới được xem là đang phát huy truyền thống hiếu học không? Vì sao?
              </label>
              <textarea
                disabled={isSubmitted}
                rows={2}
                value={q8Reason}
                onChange={(e) => setQ8Reason(e.target.value)}
                placeholder="Nhập suy nghĩ của em: có nhất thiết phải luôn đứng đầu không, điều cốt lõi là gì?..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-hidden text-sm disabled:bg-slate-100 disabled:text-slate-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* CHẶNG 5: THỬ THÁCH CAO THỦ */}
      {/* ======================================================== */}
      {activeStage === 5 && (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl flex items-center space-x-3 text-purple-900 text-xs sm:text-sm font-medium">
            <span className="text-2xl">🏆</span>
            <p>
              <b>Mục tiêu Chặng 5:</b> Vận dụng sáng tạo, đúc kết bản đồ bài học và viết lời cam kết hành động thực tế để trở thành Người Giữ Lửa Gia Đình.
            </p>
          </div>

          {/* Câu 9: Tình huống mới - Gia đình Lan */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg">
                Câu 9 • Vận dụng thực tế
              </span>
              <span className="text-xs text-slate-500 font-bold">1.0 Điểm</span>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-slate-800 text-xs sm:text-sm leading-relaxed">
              <p className="font-bold text-purple-900 mb-1">🔥 Tình huống Lan:</p>
              "Gia đình Lan có nghề làm bánh truyền thống. Lan rất tự hào nhưng nói: <i>'Chỉ cần em nói với mọi người rằng gia đình em có nghề truyền thống là em đã phát huy truyền thống rồi.'</i>"
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold text-slate-700">Em có đồng ý với Lan không?</span>
              <button
                disabled={isSubmitted}
                onClick={() => {
                  if (!isSubmitted) {
                    playClickSound();
                    setQ9Agree('yes');
                  }
                }}
                className={`px-4 py-1.5 rounded-xl border font-bold text-xs ${
                  q9Agree === 'yes' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Đồng ý
              </button>
              <button
                disabled={isSubmitted}
                onClick={() => {
                  if (!isSubmitted) {
                    playClickSound();
                    setQ9Agree('no');
                  }
                }}
                className={`px-4 py-1.5 rounded-xl border font-bold text-xs ${
                  q9Agree === 'no' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Không đồng ý
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Vì sao?</label>
              <input
                type="text"
                disabled={isSubmitted}
                value={q9Reason}
                onChange={(e) => setQ9Reason(e.target.value)}
                placeholder="Giải thích vì sao lời nói thôi là chưa đủ..."
                className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm disabled:bg-slate-100 disabled:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nếu là Lan, em sẽ làm 2 việc cụ thể nào để thực sự phát huy nghề truyền thống?
              </label>
              <textarea
                disabled={isSubmitted}
                rows={2}
                value={q9Actions}
                onChange={(e) => setQ9Actions(e.target.value)}
                placeholder="① Việc 1... ② Việc 2..."
                className="w-full p-3 rounded-xl border border-slate-300 text-sm disabled:bg-slate-100 disabled:text-slate-600"
              />
            </div>
          </div>

          {/* Câu 10: Thử thách 30 giây & Bản đồ ghi nhớ */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg">
                Câu 10 • Tổng kết trí nhớ & Bản đồ
              </span>
              <span className="text-xs text-slate-500 font-bold">1.0 Điểm</span>
            </div>
            
            <h3 className="text-base font-extrabold text-slate-900">
              🧠 Thử thách 30 giây: Điền 5 từ khóa quan trọng nhất của bài học
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {['hiếu học', 'hiếu thảo', 'cần cù', 'sức mạnh', 'giữ gìn'].map((kw, i) => (
                <div key={i} className="p-2 bg-indigo-50 border border-indigo-200 rounded-xl text-center text-xs font-bold text-indigo-900">
                  🔑 Từ {i + 1}: {kw}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dùng ít nhất 3 từ khóa trên để nói lại bài học bằng một câu của chính em:
              </label>
              <input
                type="text"
                disabled={isSubmitted}
                value={q10Sentence}
                onChange={(e) => setQ10Sentence(e.target.value)}
                placeholder="Qua bài học, em hiểu rằng..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm disabled:bg-slate-100 disabled:text-slate-600"
              />
            </div>
          </div>

          {/* TẤM VÉ RỜI KHỎI BÀI HỌC: KHO BÁU CỦA GIA ĐÌNH EM */}
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-6 border-2 border-amber-300 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-amber-900 font-black text-sm">
              <span className="text-xl">🌟</span>
              <span>TẤM VÉ RỜI KHỎI BÀI HỌC — “KHO BÁU CỦA GIA ĐÌNH EM”</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1">
                  ❤️ Một điều tốt đẹp ở gia đình/dòng họ khiến em tự hào hoặc trân trọng:
                </label>
                <input
                  type="text"
                  disabled={isSubmitted}
                  value={ticketPride}
                  onChange={(e) => setTicketPride(e.target.value)}
                  placeholder="Ví dụ: truyền thống đoàn kết, luôn hiếu thảo với ông bà..."
                  className="w-full px-4 py-2 bg-white rounded-xl border border-amber-300 text-xs sm:text-sm disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1">
                  💡 Điều em học được từ truyền thống ấy:
                </label>
                <input
                  type="text"
                  disabled={isSubmitted}
                  value={ticketLesson}
                  onChange={(e) => setTicketLesson(e.target.value)}
                  placeholder="Ví dụ: biết yêu thương và kính trọng người thân..."
                  className="w-full px-4 py-2 bg-white rounded-xl border border-amber-300 text-xs sm:text-sm disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1">
                  🌱 Một việc CỤ THỂ em sẽ làm trong tuần này để giữ gìn hoặc phát huy điều tốt đẹp đó:
                </label>
                <input
                  type="text"
                  disabled={isSubmitted}
                  value={ticketAction}
                  onChange={(e) => setTicketAction(e.target.value)}
                  placeholder="Ví dụ: gọi điện hỏi thăm ông bà, chăm chỉ ôn bài đúng giờ..."
                  className="w-full px-4 py-2 bg-white rounded-xl border border-amber-300 text-xs sm:text-sm disabled:bg-slate-100"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM ACTION BAR */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={onBack}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-2xl flex items-center space-x-1.5 transition-all"
        >
          <span>← Quay lại</span>
        </button>

        <div className="flex items-center space-x-3">
          {activeStage < 5 ? (
            <button
              onClick={() => {
                playClickSound();
                setActiveStage(prev => Math.min(5, prev + 1));
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center space-x-1.5 shadow-md transition-all active:scale-95"
            >
              <span>Tiếp tục: Chặng {activeStage + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            !isSubmitted && (
              <button
                onClick={() => setShowConfirmSubmitModal(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs sm:text-sm rounded-2xl flex items-center space-x-2 shadow-lg transition-all active:scale-95 animate-pulse"
              >
                <Send className="w-4 h-4" />
                <span>NỘP BÀI CHẤM ĐIỂM NGAY</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* MODAL: CONFIRM SUBMIT ("khi đã nộp thì không được sửa lại") */}
      {showConfirmSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border-2 border-amber-400 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-2xl mx-auto">
              ⚠️
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                Xác nhận nộp bài kiểm tra?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Em có chắc chắn muốn nộp bài làm của Bài 1 không?
                <br />
                <b>Quy chế: Khi đã bấm nộp, hệ thống sẽ tự động chấm điểm và KHÓA BÀI LÀM, em sẽ không thể sửa lại câu trả lời!</b>
              </p>
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmitModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Kiểm tra lại
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs flex items-center justify-center space-x-1 shadow-md"
              >
                <Lock className="w-4 h-4" />
                <span>Đồng ý nộp bài</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ĐÁP ÁN DÀNH CHO GIÁO VIÊN & ĐỐI CHIẾU SOI CHIẾU */}
      {showAnswerKeyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl border-2 border-indigo-400 my-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🔐</span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    BẢNG ĐÁP ÁN CHUẨN DÀNH CHO GIÁO VIÊN & MÁY CHẤM ĐIỂM
                  </h3>
                  <p className="text-xs text-indigo-700 font-bold">
                    Hệ thống tự động soi chiếu theo chuẩn kiến thức GDPT 2018
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAnswerKeyModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-800">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <b>Câu 1:</b> Hiếu học, hiếu thảo, cần cù lao động, yêu thương con người, giữ nghề truyền thống, yêu nước. (Không chọn: Khoe khoang, Coi thường).
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <b>Câu 2:</b> Đáp án <b>B – Hiếu học</b>. Chi tiết: Luôn quan tâm việc học con em, trẻ em đến tuổi đều được tới trường, nhiều người thành đạt.
              </div>
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                <b>Câu 3:</b> <b>1–b</b> (Tự hào - Trân trọng biết ơn) ; <b>2–c</b> (Noi gương - Động lực vượt khó) ; <b>3–a</b> (Nền nếp - Gia đình đoàn kết) ; <b>4–d</b> (Tiếp nối - Phong phú bản sắc).
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <b>Câu 4:</b> tự hào – truyền thống – kinh nghiệm – sức mạnh.
              </div>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                <b>Câu 5:</b> <b>Sai</b>. Truyền thống đáng tự hào nằm ở những giá trị tốt đẹp (hiếu học, nhân ái, cần cù...) chứ không phụ thuộc vào sự giàu có.
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                <b>Câu 6:</b> Đáp án <b>C</b> (Bạn Mai tự giác học tập và hỗ trợ em nhỏ bằng hành động cụ thể).
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <b>Câu 7:</b> Nên: 1, 2, 4, 6. Không nên: 3, 5.
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <b>Câu 8:</b> Đáp án <b>C</b>; Không nhất thiết phải đứng đầu lớp, điều quan trọng là trân trọng truyền thống và có hành động tích cực để học tập, tiến bộ.
              </div>
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                <b>Câu 9 – 10 & Vận dụng:</b> Đánh giá năng lực tự liên hệ, bày tỏ tình cảm chân thành với gia đình và cam kết hành động cụ thể trong tuần.
              </div>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setShowAnswerKeyModal(false)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs"
              >
                Đóng bảng đối chiếu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
