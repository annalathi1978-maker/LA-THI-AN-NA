import React, { useState } from 'react';
import { StudentProgress, StudentRecord } from '../types';
import { DEFAULT_SCHOOL_NAME, SUPPORTED_CLASSES, generateStudentCode } from '../utils/storage';
import { UserCheck, ShieldCheck, Award, GraduationCap, X, CheckCircle2, User, Sparkles, BookOpen, AlertCircle, Edit3, LogOut, Check } from 'lucide-react';
import { playClickSound, playCorrectSound, playFanfareSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface StudentRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: StudentProgress;
  onRegisterStudent: (data: { name: string; className: string; avatar: string }) => void;
  onUpdateProfile: (data: { name: string; className: string; avatar: string }) => void;
  onResetStudentRegistration?: () => void;
}

const AVATAR_OPTIONS = ['👦', '👧', '🧒', '🧑', '👩', '🎓', '🌟', '🌱'];

export default function StudentRegisterModal({
  isOpen,
  onClose,
  progress,
  onRegisterStudent,
  onUpdateProfile,
  onResetStudentRegistration
}: StudentRegisterModalProps) {
  const isAlreadyRegistered = Boolean(progress.isRegistered && progress.studentName);
  
  const [mode, setMode] = useState<'view' | 'register' | 'edit'>(isAlreadyRegistered ? 'view' : 'register');
  const [name, setName] = useState(progress.studentName || '');
  const [selectedClass, setSelectedClass] = useState(progress.studentClass || '7A1');
  const [customClass, setCustomClass] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👦');
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  if (!isOpen) return null;

  const currentClass = selectedClass === 'other' ? (customClass || '7A1') : selectedClass;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      setErrorMsg('Vui lòng nhập đầy đủ Họ và Tên của học sinh.');
      return;
    }

    if (cleanName.length < 2) {
      setErrorMsg('Họ và tên cần có ít nhất 2 ký tự.');
      return;
    }

    const classNameToSave = selectedClass === 'other' ? (customClass.trim() || '7A1') : selectedClass;

    setErrorMsg('');
    if (mode === 'edit') {
      onUpdateProfile({
        name: cleanName,
        className: classNameToSave,
        avatar: selectedAvatar
      });
      playCorrectSound();
      setMode('view');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    } else {
      // First-time registration
      onRegisterStudent({
        name: cleanName,
        className: classNameToSave,
        avatar: selectedAvatar
      });
      playCorrectSound();
      playFanfareSound();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setMode('view');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }
  };

  const handleStartEdit = () => {
    playClickSound();
    setName(progress.studentName || '');
    setSelectedClass(SUPPORTED_CLASSES.includes(progress.studentClass || '') ? (progress.studentClass || '7A1') : 'other');
    if (!SUPPORTED_CLASSES.includes(progress.studentClass || '')) {
      setCustomClass(progress.studentClass || '');
    }
    setMode('edit');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-slate-200 max-w-lg w-full overflow-hidden transition-all my-auto">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner shrink-0">
              <GraduationCap className="w-7 h-7 text-yellow-300" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-yellow-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-1">
                <span>{DEFAULT_SCHOOL_NAME}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black">
                {mode === 'view' ? 'THẺ HỌC SINH ĐIỆN TỬ' : 'ĐĂNG KÝ HỌC SINH THAM GIA HỌC TẬP'}
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {showSuccessToast && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs sm:text-sm font-bold flex items-center space-x-2.5 animate-slideDown">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Đã lưu thông tin đăng ký học sinh thành công!</span>
            </div>
          )}

          {/* VIEW MODE: Profile Card */}
          {mode === 'view' && isAlreadyRegistered ? (
            <div className="space-y-4">
              {/* Digital Student Card */}
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 rounded-3xl border-2 border-indigo-500/40 shadow-xl relative overflow-hidden">
                {/* School Watermark */}
                <div className="absolute right-2 -bottom-4 text-7xl opacity-10 select-none pointer-events-none">
                  🎓
                </div>

                <div className="flex items-start justify-between border-b border-indigo-800/60 pb-3 mb-4">
                  <div>
                    <p className="text-[10px] uppercase font-extrabold text-yellow-400 tracking-widest">
                      {DEFAULT_SCHOOL_NAME}
                    </p>
                    <h3 className="font-black text-sm text-white">
                      MÔN GIÁO DỤC CÔNG DÂN 6
                    </h3>
                  </div>
                  <span className="inline-flex items-center space-x-1 text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Đã đăng ký</span>
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-800/80 border border-indigo-400/40 flex items-center justify-center text-3xl shadow-inner shrink-0">
                    {progress.creativeSubmissions?.[0] ? '🌟' : '👦'}
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-black text-white">
                      {progress.studentName}
                    </p>
                    <p className="text-xs font-semibold text-indigo-200">
                      Lớp: <span className="text-yellow-300 font-bold">{progress.studentClass}</span> • Mã HS: <span className="font-mono text-cyan-300">{progress.studentIdCode || generateStudentCode(progress.studentClass || '7A1', 1)}</span>
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Ngày đăng ký: {progress.registrationDate || '2026-08-25'}
                    </p>
                  </div>
                </div>

                {/* Quick stats in card */}
                <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-indigo-800/60 text-center">
                  <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                    <p className="text-[10px] text-indigo-300">Đã học</p>
                    <p className="font-black text-sm text-yellow-300">{progress.completedLessons.length}/10 bài</p>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                    <p className="text-[10px] text-indigo-300">Tình huống</p>
                    <p className="font-black text-sm text-emerald-300">{progress.solvedSituationIds.length} bài</p>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                    <p className="text-[10px] text-indigo-300">Sản phẩm</p>
                    <p className="font-black text-sm text-cyan-300">{progress.creativeSubmissions.length} nộp</p>
                  </div>
                </div>
              </div>

              {/* Notice 1 student per account */}
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  <b>Quy định học tập:</b> Mỗi học sinh chỉ đăng ký 1 lần với đúng Họ tên và Lớp ({DEFAULT_SCHOOL_NAME}) để giáo viên ghi nhận kết quả và xếp loại thi đua.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleStartEdit}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Sửa thông tin</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-200 transition-all flex items-center space-x-1.5"
                >
                  <span>Bắt đầu học ngay</span>
                </button>
              </div>
            </div>
          ) : (
            /* REGISTER / EDIT FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <b>Lưu ý quan trọng:</b> Mỗi học sinh chỉ đăng ký 1 lần duy nhất để tạo hồ sơ học bạ điện tử tại <b>{DEFAULT_SCHOOL_NAME}</b>.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Trường */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Trường học:
                </label>
                <div className="p-2.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs sm:text-sm font-black text-blue-900 flex items-center justify-between">
                  <span>{DEFAULT_SCHOOL_NAME}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-bold">Mặc định</span>
                </div>
              </div>

              {/* Họ và tên */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên học sinh <span className="text-rose-500">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: Nguyễn Văn An"
                  className="w-full bg-slate-50 text-slate-900 text-sm font-semibold p-3 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all"
                />
              </div>

              {/* Lớp: 7A1 đến 7A5 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Lớp học (Khối 7 - THCS Tân Hải) <span className="text-rose-500">*</span>:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {SUPPORTED_CLASSES.map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setSelectedClass(cls);
                      }}
                      className={`py-2.5 rounded-xl font-black text-xs transition-all border ${
                        selectedClass === cls
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>

                {/* Option for custom class if needed */}
                <div className="mt-2 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="customClassCheck"
                    checked={selectedClass === 'other'}
                    onChange={(e) => setSelectedClass(e.target.checked ? 'other' : '7A1')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="customClassCheck" className="text-xs text-slate-600 font-medium cursor-pointer">
                    Nhập lớp khác (nếu không thuộc 7A1 - 7A5)
                  </label>
                </div>

                {selectedClass === 'other' && (
                  <input
                    type="text"
                    value={customClass}
                    onChange={(e) => setCustomClass(e.target.value)}
                    placeholder="VD: 7A6, 6A1..."
                    className="w-full mt-2 bg-slate-50 text-slate-900 text-xs p-2.5 rounded-xl border border-slate-300"
                  />
                )}
              </div>

              {/* Avatar selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Chọn biểu tượng đại diện:
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setSelectedAvatar(av);
                      }}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl transition-all border ${
                        selectedAvatar === av
                          ? 'bg-blue-100 border-blue-500 scale-110 shadow-xs ring-2 ring-blue-400'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 flex items-center justify-end space-x-3">
                {mode === 'edit' && (
                  <button
                    type="button"
                    onClick={() => setMode('view')}
                    className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Hủy bỏ
                  </button>
                )}
                
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md shadow-blue-200 flex items-center space-x-2 active:scale-95 transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{mode === 'edit' ? 'Cập Nhật Thông Tin' : 'Hoàn Tất Đăng Ký (1 Lần)'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
