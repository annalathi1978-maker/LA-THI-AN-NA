import { useState } from 'react';
import { Sparkles, X, Send, BookOpen, Lightbulb, HelpCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { playClickSound, playCorrectSound } from '../utils/audio';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  lessonContext: string;
}

export default function AiAssistantModal({
  isOpen,
  onClose,
  lessonTitle,
  lessonContext
}: AiAssistantModalProps) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Chào em! Thầy/Cô Trợ lý GDCD 6 rất vui được đồng hành cùng em trong ${lessonTitle}. Em có thể bấm chọn câu hỏi gợi ý bên dưới hoặc gõ thắc mắc của em nhé! 🌱`
    }
  ]);

  if (!isOpen) return null;

  const quickPrompts = [
    {
      icon: <Lightbulb className="w-3.5 h-3.5 text-amber-500" />,
      label: "Giải thích khái niệm bài này thật dễ hiểu",
      prompt: `Hãy giải thích khái niệm trọng tâm của ${lessonTitle} một cách ngắn gọn, gần gũi nhất cho học sinh lớp 6.`
    },
    {
      icon: <BookOpen className="w-3.5 h-3.5 text-emerald-500" />,
      label: "Cho 2 ví dụ thực tế ở trường học",
      prompt: `Hãy cho em 2 ví dụ thực tế cụ thể mà học sinh lớp 6 thường gặp liên quan đến ${lessonTitle}.`
    },
    {
      icon: <HelpCircle className="w-3.5 h-3.5 text-blue-500" />,
      label: "Đặt câu hỏi gợi mở để em tự rèn luyện",
      prompt: `Hãy đặt cho em một câu hỏi gợi mở thú vị về ${lessonTitle} để em tự liên hệ bản thân.`
    }
  ];

  const handleSend = async (userPromptText?: string) => {
    const textToSend = userPromptText || question.trim();
    if (!textToSend || loading) return;

    playClickSound();
    const updatedMessages = [...messages, { role: 'user' as const, text: textToSend }];
    setMessages(updatedMessages);
    setQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonTitle,
          question: textToSend,
          context: lessonContext
        })
      });

      const data = await res.json();
      const reply = data.reply || "Thầy/Cô khuyên em hãy luôn chăm ngoan, lắng nghe lời thầy cô và áp dụng bài học vào việc tốt mỗi ngày nhé!";
      
      setMessages([...updatedMessages, { role: 'assistant', text: reply }]);
      playCorrectSound();
    } catch (err) {
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          text: `[Góc Trợ lý]: Chào em! Về ${lessonTitle}, em hãy nhớ ghi nhớ các từ khóa cốt lõi trong sơ đồ bài học và thử làm phần luyện tập nhé! ✨`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border-2 border-indigo-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
              🤖
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-lg text-white">Hỏi Trợ Lý AI</h3>
                <span className="bg-white/25 text-xs font-semibold px-2 py-0.5 rounded-full text-white">
                  GDCD 6
                </span>
              </div>
              <p className="text-xs text-indigo-100 line-clamp-1 opacity-90">{lessonTitle}</p>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick prompt chips */}
        <div className="p-3 bg-indigo-50/70 border-b border-indigo-100 flex flex-wrap gap-2">
          <span className="text-xs font-bold text-indigo-900 flex items-center mr-1">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" /> Gợi ý hỏi nhanh:
          </span>
          {quickPrompts.map((item, idx) => (
            <button
              key={idx}
              disabled={loading}
              onClick={() => handleSend(item.prompt)}
              className="text-xs bg-white hover:bg-indigo-600 hover:text-white text-slate-700 font-medium px-3 py-1.5 rounded-xl border border-indigo-200 transition-all shadow-xs flex items-center space-x-1.5 active:scale-95 disabled:opacity-50"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Chat message body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 shadow-sm ${
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gradient-to-tr from-pink-500 to-purple-600 text-white'
                }`}
              >
                {msg.role === 'user' ? '🧑' : '🤖'}
              </div>
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-xs'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center text-sm shadow-sm">
                🤖
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-500 text-sm flex items-center space-x-2 shadow-xs">
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                <span>Trợ lý đang suy nghĩ câu trả lời dễ hiểu cho em...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="p-3.5 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Em muốn hỏi gì về bài học này? (VD: Ví dụ về siêng năng...)"
            disabled={loading}
            className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 text-sm px-4 py-2.5 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-hidden transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={!question.trim() || loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-2xl font-bold flex items-center space-x-1.5 shadow-md shadow-indigo-200 disabled:opacity-50 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Gửi hỏi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
