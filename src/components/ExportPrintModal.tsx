import React, { useState, useRef } from 'react';
import { StudentProgress, Lesson } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { downloadDataAsJSON, exportRosterToCSV, getStoredRoster, DEFAULT_SCHOOL_NAME } from '../utils/storage';
import { X, Printer, Download, Upload, RefreshCw, FileText, CheckCircle2, Award, BookOpen, FileSpreadsheet, Sparkles, ShieldCheck } from 'lucide-react';
import { playClickSound, playCorrectSound } from '../utils/audio';

interface ExportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'print' | 'save' | 'export';
  progress: StudentProgress;
  onRestoreProgress: (newProgress: StudentProgress) => void;
}

export default function ExportPrintModal({
  isOpen,
  onClose,
  defaultTab = 'print',
  progress,
  onRestoreProgress
}: ExportPrintModalProps) {
  const [activeTab, setActiveTab] = useState<'print' | 'save' | 'export'>(defaultTab);
  const [printType, setPrintType] = useState<'worksheet' | 'summary' | 'certificate' | 'transcript'>('worksheet');
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [includeAnswerKey, setIncludeAnswerKey] = useState<boolean>(false);
  const [studentNameInput, setStudentNameInput] = useState<string>(progress.studentName || 'Nguyễn Văn An');
  const [studentClassInput, setStudentClassInput] = useState<string>(progress.studentClass || '7A1');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentLesson = LESSONS_DATA.find(l => l.id === selectedLessonId) || LESSONS_DATA[0];

  // Handle direct window print
  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  // Handle export JSON backup
  const handleExportJSON = () => {
    playClickSound();
    const backupData = {
      version: "2.0",
      exportDate: new Date().toISOString(),
      studentName: studentNameInput,
      studentClass: studentClassInput,
      progress: progress
    };
    downloadDataAsJSON(backupData, `GDCD6_Backup_${studentNameInput.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`);
  };

  // Handle Import JSON
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed.progress) {
          onRestoreProgress(parsed.progress);
          playCorrectSound();
          setImportStatus("Khôi phục dữ liệu thành công! Tiến độ của bạn đã được cập nhật.");
        } else {
          setImportStatus("File không đúng định dạng dữ liệu học tập GDCD 6.");
        }
      } catch (err) {
        setImportStatus("Lỗi đọc file. Vui lòng chọn file .json hợp lệ.");
      }
    };
    reader.readAsText(file);
  };

  // Handle Export Word/HTML Document of 10 Lessons
  const handleExportWordGuide = () => {
    playClickSound();
    let content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Đề Cương 10 Bài Học GDCD 6</title>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
        h1 { color: #1e3a8a; text-align: center; }
        h2 { color: #b45309; border-bottom: 2px solid #b45309; padding-bottom: 5px; margin-top: 30px; }
        h3 { color: #047857; }
        .box { background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; margin: 10px 0; border-radius: 6px; }
        .quote { font-style: italic; color: #475569; }
      </style>
      </head>
      <body>
        <h1>TÀI LIỆU ÔN TẬP 10 BÀI HỌC GIÁO DỤC CÔNG DÂN 6</h1>
        <p style="text-align: center;"><b>TỔNG HỢP TỪ 3 BỘ SÁCH GIÁO KHOA: CÁNH DIỀU - CHÂN TRỜI SÁNG TẠO - KẾT NỐI TRI THỨC</b></p>
        <p style="text-align: center;">Học sinh: ${studentNameInput} - Lớp: ${studentClassInput}</p>
        <hr/>
    `;

    LESSONS_DATA.forEach((lesson) => {
      content += `
        <h2>${lesson.title}</h2>
        <p><b>Mục tiêu cốt lõi:</b> ${lesson.shortDesc}</p>
        
        <h3>I. Tư liệu từ 3 bộ Sách Giáo Khoa:</h3>
        ${lesson.textbookCaseStudies.map(cs => `
          <div class="box">
            <b>[Bộ sách ${cs.bookName}] - ${cs.title}</b><br/>
            <span>${cs.content}</span><br/>
            <span class="quote">➡️ Bài học rút ra: ${cs.lessonTakeaway}</span>
          </div>
        `).join('')}

        <h3>II. Kiến thức trọng tâm:</h3>
        ${lesson.knowledge.keyPoints.map(kp => `
          <p><b>${kp.heading}</b><br/>${kp.content}<br/><i>Ví dụ: ${kp.example || ''}</i></p>
        `).join('')}

        <h3>III. Tóm tắt ghi nhớ:</h3>
        <ul>
          ${lesson.summary.map(s => `<li>${s}</li>`).join('')}
        </ul>
      `;
    });

    content += `</body></html>`;

    const blob = new Blob(['\ufeff' + content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `De_Cuong_10_Bai_Hoc_GDCD6_${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export Student Submission text report
  const handleExportStudentSubmissionText = () => {
    playClickSound();
    let text = `==========================================================\n`;
    text += `BÁO CÁO KẾT QUẢ BÀI LÀM VÀ BÀI NỘP VẬN DỤNG GDCD 6\n`;
    text += `Họ và tên: ${studentNameInput} | Lớp: ${studentClassInput}\n`;
    text += `Ngày xuất báo cáo: ${new Date().toLocaleString('vi-VN')}\n`;
    text += `==========================================================\n\n`;

    text += `I. KẾT QUẢ KIỂM TRA TRẮC NGHIỆM (10 BÀI HỌC):\n`;
    LESSONS_DATA.forEach(l => {
      const score = progress.quizScores[l.id];
      text += `- ${l.title}: ${score !== undefined ? `${score}/5 điểm (${(score/5)*100}%)` : 'Chưa làm'}\n`;
    });

    text += `\nII. BÀI TỰ LUẬN "EM SUY NGHĨ" ĐÃ HOÀN THÀNH:\n`;
    Object.entries(progress.thoughtAnswers || {}).forEach(([taskId, ans], idx) => {
      text += `[${idx + 1}] Bài tập ID: ${taskId}\nTrả lời: ${ans}\n\n`;
    });

    text += `\nIII. SẢN PHẨM SÁNG TẠO ĐÃ NỘP (POSTER / KHẨU HIỆU / BÀI VIẾT):\n`;
    (progress.creativeSubmissions || []).forEach((sub, idx) => {
      text += `[${idx + 1}] Tiêu đề: ${sub.title} (Loại: ${sub.type})\nNội dung: ${sub.content}\nNgày nộp: ${sub.submittedAt}\n`;
      if (sub.teacherComment) text += `Lời phê của GV: ${sub.teacherComment}\n`;
      if (sub.score) text += `Điểm số: ${sub.score}/10\n`;
      text += `----------------------------------------------------------\n`;
    });

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bai_Lam_GDCD6_${studentNameInput.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black">
              🖨️
            </div>
            <div>
              <h2 className="text-lg font-extrabold">Trung Tâm In, Lưu & Xuất Dữ Liệu</h2>
              <p className="text-xs text-slate-300">Chuẩn tài liệu 3 bộ SGK: Cánh Diều, Chân Trời Sáng Tạo, Kết Nối Tri Thức</p>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Main Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          {[
            { id: 'print', label: '1. In Ấn & Phiếu Học Tập', icon: Printer },
            { id: 'save', label: '2. Lưu & Sao Lưu Dữ Liệu', icon: RefreshCw },
            { id: 'export', label: '3. Xuất File (Word / Excel / Text)', icon: Download },
          ].map(t => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  playClickSound();
                  setActiveTab(t.id as any);
                }}
                className={`px-4 py-2.5 rounded-t-2xl font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all ${
                  active
                    ? 'bg-white text-blue-700 border-t-2 border-l border-r border-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: PRINT */}
          {activeTab === 'print' && (
            <div className="space-y-6">
              {/* Print Type Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'worksheet', label: 'Phiếu Bài Tập & Đề Thi', icon: FileText, desc: 'Đề kiểm tra 1 bài học' },
                  { id: 'summary', label: 'Đề Cương 10 Bài Học', icon: BookOpen, desc: 'Tóm tắt chuẩn 3 bộ SGK' },
                  { id: 'certificate', label: 'Giấy Khen Công Dân Nhí', icon: Award, desc: 'Chứng nhận hoàn thành' },
                  { id: 'transcript', label: 'Bảng Điểm & Học Bạ', icon: FileSpreadsheet, desc: 'Kết quả học tập cá nhân' },
                ].map(p => {
                  const Icon = p.icon;
                  const selected = printType === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        playClickSound();
                        setPrintType(p.id as any);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        selected
                          ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-2 ring-blue-400'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1 ${selected ? 'text-blue-600' : 'text-slate-500'}`} />
                      <p className="text-xs font-extrabold text-slate-800">{p.label}</p>
                      <p className="text-[10px] text-slate-500">{p.desc}</p>
                    </button>
                  );
                })}
              </div>

              {/* Options for Worksheet */}
              {printType === 'worksheet' && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <label className="text-xs font-bold text-slate-700">Chọn bài in:</label>
                    <select
                      value={selectedLessonId}
                      onChange={(e) => setSelectedLessonId(Number(e.target.value))}
                      className="text-xs bg-white border border-slate-300 rounded-xl px-3 py-1.5 font-semibold text-slate-800"
                    >
                      {LESSONS_DATA.map(l => (
                        <option key={l.id} value={l.id}>{l.title}</option>
                      ))}
                    </select>
                  </div>

                  <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeAnswerKey}
                      onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Kèm đáp án & Lời giải chi tiết (Dành cho GV)</span>
                  </label>
                </div>
              )}

              {/* Print Preview Frame */}
              <div className="border-2 border-dashed border-slate-300 rounded-3xl p-6 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Xem trước bản in (Khổ giấy A4)
                  </span>
                  <button
                    onClick={handlePrint}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs flex items-center space-x-2 shadow-md active:scale-95 transition-transform"
                  >
                    <Printer className="w-4 h-4" />
                    <span>In Ngay (Print)</span>
                  </button>
                </div>

                {/* Printable Document Preview */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-200 text-slate-800 font-sans space-y-6 text-sm">
                  {/* Ministry Header */}
                  <div className="flex justify-between items-start border-b pb-4 border-slate-300 text-xs">
                    <div>
                      <p className="font-bold uppercase text-slate-700">PHÒNG GD&ĐT HUYỆN/QUẬN</p>
                      <p className="font-bold text-blue-900 uppercase">{DEFAULT_SCHOOL_NAME}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold uppercase text-blue-900">BÀI KIỂM TRA MÔN GDCD 6</p>
                      <p className="italic text-slate-500">Chương trình GDPT 2018 (3 Bộ SGK)</p>
                    </div>
                  </div>

                  {/* Student Info Box */}
                  <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div>
                      <p><b>Họ và tên:</b> {studentNameInput || '..................................................'}</p>
                      <p className="mt-1"><b>Lớp:</b> {studentClassInput || '6A...'}</p>
                    </div>
                    <div>
                      <p><b>Ngày làm bài:</b> ...../...../2026</p>
                      <p className="mt-1"><b>Điểm số:</b> ............. / <b>Lời phê:</b> ..............................</p>
                    </div>
                  </div>

                  {/* Content for Worksheet */}
                  {printType === 'worksheet' && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="font-black text-base text-blue-900 uppercase">
                          {currentLesson.title}
                        </h3>
                        <p className="text-xs italic text-slate-500">
                          (Tư liệu tích hợp 3 bộ SGK: Cánh Diều, Chân Trời Sáng Tạo, Kết Nối Tri Thức)
                        </p>
                      </div>

                      {/* Part 1: Multiple choice */}
                      <div>
                        <h4 className="font-bold text-xs uppercase bg-slate-100 p-1.5 rounded text-slate-800">
                          PHẦN I: TRẮC NGHIỆM KHÁCH QUAN (5.0 điểm)
                        </h4>
                        <div className="space-y-3 mt-2">
                          {currentLesson.quiz.map((q, idx) => (
                            <div key={q.id} className="text-xs space-y-1">
                              <p className="font-semibold"><b>Câu {idx + 1}:</b> {q.question}</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-4 text-slate-600">
                                {q.options.map((opt, oIdx) => (
                                  <p key={oIdx}>{opt}</p>
                                ))}
                              </div>
                              {includeAnswerKey && (
                                <p className="text-emerald-700 font-bold text-[11px] mt-1 pl-4">
                                  ✅ Đáp án đúng: {String.fromCharCode(65 + q.correctAnswer)} - {q.explanation}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Part 2: Practical situation */}
                      <div>
                        <h4 className="font-bold text-xs uppercase bg-slate-100 p-1.5 rounded text-slate-800">
                          PHẦN II: XỬ LÝ TÌNH HUỐNG THỰC TẾ & TỰ LUẬN (5.0 điểm)
                        </h4>
                        <div className="text-xs mt-2 space-y-2">
                          <p className="font-semibold"><b>Tình huống:</b> {currentLesson.intro.scenario}</p>
                          <p><b>Câu hỏi:</b> {currentLesson.intro.question}</p>
                          <div className="h-20 border border-dashed border-slate-300 rounded-xl p-2 text-slate-400 italic">
                            (Học sinh viết câu trả lời vào đây...)
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content for Certificate */}
                  {printType === 'certificate' && (
                    <div className="p-8 border-4 border-double border-amber-500 rounded-3xl bg-amber-50/40 text-center space-y-4 my-2">
                      <div className="text-3xl">🎖️ 🇻🇳 🎖️</div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                        CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                      </p>
                      <p className="text-[10px] font-semibold text-slate-500">Độc lập - Tự do - Hạnh phúc</p>
                      <h2 className="text-2xl font-black text-amber-900 uppercase tracking-wide pt-2">
                        GIẤY CHỨNG NHẬN CÔNG DÂN NHÍ TIÊU BIỂU
                      </h2>
                      <p className="text-xs text-slate-700">Trân trọng chứng nhận học sinh:</p>
                      <p className="text-xl font-extrabold text-blue-900 underline decoration-amber-500 decoration-2">
                        {studentNameInput || 'Nguyễn Văn An'} - Lớp {studentClassInput || '6A1'}
                      </p>
                      <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
                        Đã xuất sắc hoàn thành chương trình tự học, rèn luyện phẩm chất và kỹ năng sống môn <b>Giáo dục công dân 6</b> theo chuẩn Chương trình GDPT 2018 (Bộ sách Cánh Diều, Chân Trời Sáng Tạo, Kết Nối Tri Thức Với Cuộc Sống).
                      </p>
                      <div className="flex justify-between pt-6 text-xs text-slate-600">
                        <div>
                          <p className="font-bold">GIÁO VIÊN BỘ MÔN</p>
                          <p className="italic text-[10px] mt-8">(Ký và ghi rõ họ tên)</p>
                        </div>
                        <div>
                          <p className="font-bold">HIỆU TRƯỞNG NHÀ TRƯỜNG</p>
                          <p className="italic text-[10px] mt-8">(Ký tên và đóng dấu)</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content for Summary / Transcript */}
                  {printType === 'summary' && (
                    <div className="space-y-4 text-xs">
                      <h3 className="font-black text-base text-center text-blue-900">
                        ĐỀ CƯƠNG TỔNG HỢP KIẾN THỨC 10 BÀI HỌC GDCD 6
                      </h3>
                      {LESSONS_DATA.map((l) => (
                        <div key={l.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <p className="font-bold text-slate-900">{l.title}</p>
                          <p className="text-slate-600"><b>Ghi nhớ:</b> {l.summary.join(' • ')}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {printType === 'transcript' && (
                    <div className="space-y-4 text-xs">
                      <h3 className="font-black text-base text-center text-blue-900">
                        BẢNG ĐIỂM & TIẾN ĐỘ HỌC TẬP CÁ NHÂN
                      </h3>
                      <table className="w-full border-collapse border border-slate-300 text-left">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border p-2">STT</th>
                            <th className="border p-2">Tên bài học</th>
                            <th className="border p-2">Điểm trắc nghiệm</th>
                            <th className="border p-2">Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {LESSONS_DATA.map((l, idx) => {
                            const score = progress.quizScores[l.id];
                            return (
                              <tr key={l.id}>
                                <td className="border p-2 text-center">{idx + 1}</td>
                                <td className="border p-2 font-semibold">{l.title}</td>
                                <td className="border p-2 font-bold text-blue-700">
                                  {score !== undefined ? `${score} / 5 điểm` : 'Chưa làm'}
                                </td>
                                <td className="border p-2">
                                  {progress.completedLessons.includes(l.id) ? (
                                    <span className="text-emerald-700 font-bold">✅ Đã hoàn thành</span>
                                  ) : (
                                    <span className="text-slate-400">Đang học</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SAVE & RESTORE */}
          {activeTab === 'save' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    💾
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-blue-900">Sao Lưu & Khôi Phục Dữ Liệu Cá Nhân</h3>
                    <p className="text-xs text-blue-700">Tải dữ liệu học tập về máy hoặc chuyển đổi giữa các thiết bị mà không mất bài làm</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên học sinh:</label>
                    <input
                      type="text"
                      value={studentNameInput}
                      onChange={(e) => setStudentNameInput(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                      placeholder="Nhập họ tên..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Lớp:</label>
                    <input
                      type="text"
                      value={studentClassInput}
                      onChange={(e) => setStudentClassInput(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                      placeholder="Nhập lớp (vd: 6A1)..."
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons: Export vs Import */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Backup Button */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3 hover:border-blue-400 transition-colors">
                  <div className="flex items-center space-x-2 text-blue-700 font-bold text-sm">
                    <Download className="w-4 h-4" />
                    <span>Tải File Sao Lưu (.JSON)</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Lưu toàn bộ điểm kiểm tra 10 bài, câu trả lời tự luận, bài nộp poster và tình huống đã giải.
                  </p>
                  <button
                    onClick={handleExportJSON}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-xs active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải File Sao Lưu Về Máy</span>
                  </button>
                </div>

                {/* Restore Button */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3 hover:border-purple-400 transition-colors">
                  <div className="flex items-center space-x-2 text-purple-700 font-bold text-sm">
                    <Upload className="w-4 h-4" />
                    <span>Khôi Phục Từ File Sao Lưu</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Chọn file <code>.json</code> đã lưu trước đó để tiếp tục học tập và giữ nguyên lịch sử.
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".json"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-xs active:scale-95"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Chọn File Để Khôi Phục</span>
                  </button>
                </div>
              </div>

              {importStatus && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{importStatus}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EXPORT DATA */}
          {activeTab === 'export' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Export Word Document */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 hover:border-blue-400 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                    📘
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-800">
                    Đề Cương 10 Bài (Word .doc)
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Xuất tài liệu ôn tập toàn bộ 10 bài học tổng hợp tư liệu từ 3 bộ sách (Cánh Diều, Chân Trời Sáng Tạo, Kết Nối Tri Thức).
                  </p>
                  <button
                    onClick={handleExportWordGuide}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải File Word (.doc)</span>
                  </button>
                </div>

                {/* 2. Export CSV Roster */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 hover:border-emerald-400 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                    📊
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-800">
                    Báo Cáo Điểm Lớp (Excel/CSV)
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Xuất danh sách sĩ số, điểm số trung bình, số tình huống đã giải và nhận xét của giáo viên ra file Excel.
                  </p>
                  <button
                    onClick={() => {
                      playClickSound();
                      exportRosterToCSV(getStoredRoster());
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-xs"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Tải File Excel (.csv)</span>
                  </button>
                </div>

                {/* 3. Export Student Text Report */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 hover:border-purple-400 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
                    📝
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-800">
                    Báo Cáo Bài Làm (Text .txt)
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Xuất toàn bộ các câu trả lời tự luận "Em Suy Nghĩ", tác phẩm "Em Sáng Tạo" và lời phê của giáo viên.
                  </p>
                  <button
                    onClick={handleExportStudentSubmissionText}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Tải Báo Cáo (.txt)</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Hành trang công dân 6 • Tích hợp 3 bộ SGK</span>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
