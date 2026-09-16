import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, CheckCircle2, AlertTriangle, KeyRound, School, X, ShieldAlert, Sparkles } from 'lucide-react';
import { DEFAULT_SCHOOL_NAME, DEFAULT_ADMIN_NAME, DEFAULT_ADMIN_TITLE, verifyAdminPassword } from '../utils/storage';
import { playClickSound, playCorrectSound, playFanfareSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminAuthModal({
  isOpen,
  onClose,
  onSuccess
}: AdminAuthModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();

    if (!password.trim()) {
      setErrorMessage('Vui lòng nhập mật khẩu quản trị viên.');
      return;
    }

    const isValid = verifyAdminPassword(password);
    if (isValid) {
      setIsSuccess(true);
      setErrorMessage('');
      playCorrectSound();
      playFanfareSound();
      
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        setIsSuccess(false);
        setPassword('');
        onSuccess();
      }, 700);
    } else {
      setFailedAttempts((prev) => prev + 1);
      setErrorMessage('Mật khẩu quản trị không chính xác! Bạn không có quyền truy cập hoặc chỉnh sửa nội dung app/web.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 relative">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg font-black shrink-0">
              <Shield className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-white/15 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-amber-300">
                <School className="w-3 h-3" />
                <span>{DEFAULT_SCHOOL_NAME}</span>
              </div>
              <h3 className="text-lg font-black tracking-tight mt-1 text-white">
                XÁC THỰC QUẢN TRỊ VIÊN
              </h3>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Admin Identity Box */}
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Quản trị viên cài đặt
              </span>
              <span className="inline-flex items-center space-x-1 text-[11px] font-black bg-purple-200 text-purple-900 px-2 py-0.5 rounded-md">
                <Sparkles className="w-3 h-3 text-purple-700" />
                <span>Admin Toàn Quyền</span>
              </span>
            </div>
            <p className="text-base font-black text-purple-950">
              {DEFAULT_ADMIN_NAME}
            </p>
            <p className="text-xs text-purple-800">
              Giáo viên GDCD • Phụ trách học sinh khối 6 (6A8 – 6A12)
            </p>
          </div>

          {/* Security Notice */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 flex items-start space-x-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <p className="font-bold mb-0.5">Chế độ bảo vệ chống chỉnh sửa tự ý:</p>
              <p className="text-slate-600">
                Toàn bộ nội dung bài tập, ngân hàng đề thi và danh sách học sinh được khóa an toàn. 
                Chỉ <strong>{DEFAULT_ADMIN_NAME}</strong> có mật khẩu mới có quyền quản lý và chỉnh sửa.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Nhập mật khẩu Quản trị viên (Cô An Na):
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  autoFocus
                  placeholder="Nhập mật khẩu quản trị..."
                  className={`w-full pl-10 pr-12 py-3 bg-slate-50 text-slate-900 font-medium text-sm rounded-2xl border transition-all focus:outline-none focus:ring-2 ${
                    errorMessage
                      ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                      : 'border-slate-300 focus:ring-purple-600 focus:border-purple-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start space-x-2 animate-shake">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            {/* Success State */}
            {isSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold">Mật khẩu chính xác! Đang mở bảng điều khiển Quản trị viên...</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Hủy bỏ (Về màn hình học sinh)
              </button>
              <button
                type="submit"
                disabled={isSuccess}
                className="bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg shadow-purple-900/30 flex items-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>Mở Khóa Quản Trị</span>
              </button>
            </div>
          </form>

          {failedAttempts >= 2 && (
            <div className="text-center text-[11px] text-slate-500 italic">
              Nếu bạn là học sinh hoặc khách, vui lòng sử dụng các tính năng học tập và làm bài ở bên ngoài.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
