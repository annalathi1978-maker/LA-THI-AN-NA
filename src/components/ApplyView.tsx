import React, { useState, FormEvent } from 'react';
import { ApplyThoughtTask, ApplyActionTask, ApplyCreativeTask, StudentProgress } from '../types';
import { Rocket, Brain, Footprints, Palette, Send, CheckCircle2, Sparkles, Lightbulb, Image as ImageIcon, MessageSquare, Award } from 'lucide-react';
import { playClickSound, playCorrectSound, playFanfareSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ApplyViewProps {
  thoughtTasks: ApplyThoughtTask[];
  actionTasks: ApplyActionTask[];
  creativeTasks: ApplyCreativeTask[];
  progress: StudentProgress;
  onSaveThoughtAnswer: (taskId: string, answer: string) => void;
  onToggleActionTask: (taskId: string) => void;
  onSubmitCreative: (submission: { id: string; taskId: string; title: string; type: string; content: string; submittedAt: string }) => void;
}

export default function ApplyView({
  thoughtTasks,
  actionTasks,
  creativeTasks,
  progress,
  onSaveThoughtAnswer,
  onToggleActionTask,
  onSubmitCreative
}: ApplyViewProps) {
  const [activeTab, setActiveTab] = useState<'thought' | 'action' | 'creative'>('thought');

  // Thought state
  const [currentThoughtText, setCurrentThoughtText] = useState<Record<string, string>>(progress.thoughtAnswers || {});
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});

  // Creative state
  const [creativeTaskSelected, setCreativeTaskSelected] = useState<string>(creativeTasks[0]?.id || '');
  const [creativeTitle, setCreativeTitle] = useState('');
  const [creativeType, setCreativeType] = useState('poster');
  const [creativeContent, setCreativeContent] = useState('');
  const [creativeBannerSent, setCreativeBannerSent] = useState(false);

  const handleSaveThought = (taskId: string) => {
    const text = currentThoughtText[taskId];
    if (!text || !text.trim()) {
      alert("Em hãy viết câu trả lời trước khi lưu nhé!");
      return;
    }
    playCorrectSound();
    onSaveThoughtAnswer(taskId, text.trim());
    setSavedStatus({ ...savedStatus, [taskId]: true });
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setSavedStatus((prev) => ({ ...prev, [taskId]: false }));
    }, 3000);
  };

  const handleActionToggle = (taskId: string) => {
    playCorrectSound();
    onToggleActionTask(taskId);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleSubmitCreativeForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creativeTitle.trim() || !creativeContent.trim()) {
      alert("Em hãy điền đầy đủ tiêu đề và nội dung sản phẩm sáng tạo nhé!");
      return;
    }

    playCorrectSound();
    playFanfareSound();
    onSubmitCreative({
      id: `sub-${Date.now()}`,
      taskId: creativeTaskSelected,
      title: creativeTitle.trim(),
      type: creativeType,
      content: creativeContent.trim(),
      submittedAt: new Date().toLocaleDateString('vi-VN')
    });

    setCreativeTitle('');
    setCreativeContent('');
    setCreativeBannerSent(true);

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Rocket className="w-4 h-4 text-yellow-300" />
            <span>Chuyển hóa bài học thành hành động thực tế</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            VẬN DỤNG CÔNG DÂN
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-xl">
            Tập trung vào 3 nhiệm vụ: Em suy nghĩ • Em hành động • Em sáng tạo.
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs sm:text-sm font-bold shrink-0">
          <span>Nhiệm vụ hoàn thành: </span>
          <span className="text-yellow-300 font-extrabold text-base">
            {Object.keys(progress.thoughtAnswers || {}).length + progress.completedActionTaskIds.length + (progress.creativeSubmissions?.length || 0)}
          </span>
        </div>
      </div>

      {/* 3 Tabs Selection */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { id: 'thought', label: '1. EM SUY NGHĨ', icon: Brain, color: 'hover:border-blue-400' },
          { id: 'action', label: '2. EM HÀNH ĐỘNG', icon: Footprints, color: 'hover:border-emerald-400' },
          { id: 'creative', label: '3. EM SÁNG TẠO', icon: Palette, color: 'hover:border-purple-400' }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setActiveTab(tab.id as any);
              }}
              className={`p-3.5 sm:p-5 rounded-3xl border-2 font-black text-xs sm:text-sm transition-all flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2.5 ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: EM SUY NGHĨ */}
      {activeTab === 'thought' && (
        <div className="space-y-6">
          <div className="bg-blue-50/70 border border-blue-200 rounded-3xl p-5 sm:p-6 text-slate-800 text-xs sm:text-sm">
            <span className="font-bold text-blue-900">💡 Nhiệm vụ Em Suy Nghĩ: </span>
            Đọc kỹ câu hỏi tình huống mở, viết câu trả lời suy nghĩ của riêng em để rèn luyện tư duy đạo đức và cảm xúc nhân văn.
          </div>

          <div className="space-y-6">
            {thoughtTasks.map((task) => {
              const isSaved = !!progress.thoughtAnswers[task.id];

              return (
                <div
                  key={task.id}
                  className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                      {task.lessonTitle}
                    </span>
                    {isSaved && (
                      <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Đã trả lời
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-slate-800">
                    {task.question}
                  </h3>

                  <div className="p-3.5 bg-slate-50 rounded-2xl text-xs text-slate-600 border border-slate-200/80">
                    <span className="font-bold text-slate-700">📌 Gợi ý bối cảnh: </span>
                    <span>{task.context}</span>
                  </div>

                  {/* Input textarea */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">
                      Câu trả lời của em:
                    </label>
                    <textarea
                      rows={4}
                      value={currentThoughtText[task.id] || ''}
                      onChange={(e) =>
                        setCurrentThoughtText({
                          ...currentThoughtText,
                          [task.id]: e.target.value
                        })
                      }
                      placeholder="Em viết suy nghĩ và liên hệ bản thân vào đây nhé..."
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white text-slate-800 text-xs sm:text-sm p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div className="text-[11px] text-slate-500">
                      💡 Mẹo: {task.sampleAnswerHint}
                    </div>

                    <button
                      onClick={() => handleSaveThought(task.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-2xl shadow-sm hover:shadow active:scale-95 transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>{savedStatus[task.id] ? "Đã lưu thành công! ✓" : "Lưu câu trả lời"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: EM HÀNH ĐỘNG */}
      {activeTab === 'action' && (
        <div className="space-y-6">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-3xl p-5 sm:p-6 text-slate-800 text-xs sm:text-sm">
            <span className="font-bold text-emerald-900">🌱 Nhiệm vụ Em Hành Động: </span>
            Các thử thách rèn luyện thực tế hàng ngày. Bấm hoàn thành sau khi em đã thực hiện xong các bước để ghi nhận vào Thành Tích!
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actionTasks.map((act) => {
              const isCompleted = progress.completedActionTaskIds.includes(act.id);

              return (
                <div
                  key={act.id}
                  className={`bg-white rounded-3xl border-2 p-6 flex flex-col justify-between shadow-xs transition-all ${
                    isCompleted ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:border-emerald-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {act.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        Mục tiêu: {act.targetDays} ngày
                      </span>
                    </div>

                    <h3 className="font-black text-base sm:text-lg text-slate-800 mb-2">
                      {act.title}
                    </h3>
                    <p className="text-xs text-slate-600 mb-4">
                      {act.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {act.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start space-x-2"
                        >
                          <span className="font-bold text-emerald-600 mt-0.5">•</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleActionToggle(act.id)}
                    className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all active:scale-95 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-emerald-500 hover:text-white text-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCompleted ? "Đã Hoàn Thành Thử Thách ✓" : "Đánh dấu hoàn thành"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: EM SÁNG TẠO */}
      {activeTab === 'creative' && (
        <div className="space-y-6">
          <div className="bg-purple-50/70 border border-purple-200 rounded-3xl p-5 sm:p-6 text-slate-800 text-xs sm:text-sm">
            <span className="font-bold text-purple-900">🎨 Nhiệm vụ Em Sáng Tạo: </span>
            Học sinh có thể gửi ý tưởng Poster, Khẩu hiệu Infographic hoặc Bài viết lan tỏa thông điệp công dân. Giáo viên sẽ đọc và nhận xét!
          </div>

          {/* Submission Form */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Gửi sản phẩm sáng tạo mới</span>
            </h3>

            {creativeBannerSent && (
              <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs sm:text-sm font-bold flex items-center space-x-2 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Sản phẩm sáng tạo của em đã được gửi thành công đến giáo viên! 🎉</span>
              </div>
            )}

            <form onSubmit={handleSubmitCreativeForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Chọn chủ đề sáng tạo:
                  </label>
                  <select
                    value={creativeTaskSelected}
                    onChange={(e) => setCreativeTaskSelected(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold p-3 rounded-2xl border border-slate-200"
                  >
                    {creativeTasks.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Hình thức gửi:
                  </label>
                  <select
                    value={creativeType}
                    onChange={(e) => setCreativeType(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold p-3 rounded-2xl border border-slate-200"
                  >
                    <option value="poster">🖼️ Poster thông điệp</option>
                    <option value="infographic">📊 Infographic quy tắc</option>
                    <option value="slogan">✍️ Khẩu hiệu / Thơ lục bát</option>
                    <option value="article">📝 Bài viết cảm nghĩ / Video link</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Tên sản phẩm / Tiêu đề:
                </label>
                <input
                  type="text"
                  value={creativeTitle}
                  onChange={(e) => setCreativeTitle(e.target.value)}
                  placeholder="VD: Poster 'Trường học yêu thương - Nói không với bạo lực'"
                  className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm p-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Nội dung chi tiết / Khẩu hiệu / Ý tưởng thiết kế:
                </label>
                <textarea
                  rows={4}
                  value={creativeContent}
                  onChange={(e) => setCreativeContent(e.target.value)}
                  placeholder="Em hãy viết nội dung khẩu hiệu, mô tả bố cục màu sắc bức tranh hoặc gửi link sản phẩm..."
                  className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm p-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md shadow-purple-200 hover:shadow-lg active:scale-95 transition-all flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Nộp sản phẩm sáng tạo</span>
              </button>
            </form>
          </div>

          {/* Submissions list */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-slate-700 uppercase tracking-wider">
              Sản phẩm đã nộp của em ({progress.creativeSubmissions?.length || 0}):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {progress.creativeSubmissions?.map((sub) => (
                <div key={sub.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-200 uppercase">
                      {sub.type}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">{sub.submittedAt}</span>
                  </div>
                  <h5 className="font-bold text-sm text-slate-800">{sub.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {sub.content}
                  </p>
                  <div className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Giáo viên đã nhận bài</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
