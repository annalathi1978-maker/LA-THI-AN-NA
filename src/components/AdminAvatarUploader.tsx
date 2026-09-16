import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, Trash2, Check, X, Sparkles, Image as ImageIcon, Eye } from 'lucide-react';
import { getAdminAvatar, setAdminAvatar, processImageUpload, DEFAULT_ADMIN_NAME } from '../utils/storage';
import { playClickSound, playCorrectSound } from '../utils/audio';

interface AdminAvatarUploaderProps {
  compact?: boolean;
  className?: string;
  showLabel?: boolean;
}

export default function AdminAvatarUploader({
  compact = true,
  className = '',
  showLabel = true
}: AdminAvatarUploaderProps) {
  const [avatar, setAvatar] = useState<string | null>(getAdminAvatar());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  // Sync avatar when changed in another component or storage
  useEffect(() => {
    const handleAvatarChange = () => {
      setAvatar(getAdminAvatar());
    };
    window.addEventListener('adminAvatarChanged', handleAvatarChange);
    return () => {
      window.removeEventListener('adminAvatarChanged', handleAvatarChange);
    };
  }, []);

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, JPEG, WebP)!');
      return;
    }

    try {
      setIsUploading(true);
      setErrorMsg('');
      const compressedDataUrl = await processImageUpload(file, 400);
      setAvatar(compressedDataUrl);
      setAdminAvatar(compressedDataUrl);
      playCorrectSound();
      setSuccessMsg('Đã cập nhật ảnh Cô An Na thành công!');
      setTimeout(() => {
        setSuccessMsg('');
        setIsModalOpen(false);
      }, 1500);
    } catch (err) {
      console.error('Lỗi khi tải ảnh lên:', err);
      setErrorMsg('Không thể xử lý hình ảnh. Vui lòng thử lại với ảnh khác!');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (modalFileInputRef.current) modalFileInputRef.current.value = '';
    }
  };

  const handleRemoveAvatar = () => {
    playClickSound();
    if (window.confirm('Cô An Na có chắc muốn xóa ảnh đại diện này không?')) {
      setAdminAvatar(null);
      setAvatar(null);
      setPreviewUrl(null);
      playClickSound();
      setSuccessMsg('Đã xóa ảnh đại diện thành công.');
      setTimeout(() => {
        setSuccessMsg('');
        setIsModalOpen(false);
      }, 1200);
    }
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Hidden file input for direct upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelected}
        className="hidden"
        id="navbar-admin-avatar-input"
      />

      {/* Trigger Button / Slot */}
      <div className="flex items-center">
        {avatar ? (
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsModalOpen(true);
            }}
            title="Bấm để xem hoặc đổi ảnh đại diện của Cô An Na"
            className="group relative flex items-center space-x-1.5 p-0.5 sm:p-1 rounded-2xl bg-white hover:bg-purple-50 border border-purple-300 shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-purple-500 shadow-xs shrink-0 bg-slate-100">
              <img
                src={avatar}
                alt={DEFAULT_ADMIN_NAME}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-purple-950/20 group-hover:bg-purple-950/40 transition-colors flex items-center justify-center">
                <Camera className="w-3 h-3 text-white drop-shadow-sm opacity-80 group-hover:opacity-100" />
              </div>
            </div>

            {showLabel && (
              <span className="hidden xl:inline text-[11px] font-bold text-purple-900 pr-1 group-hover:text-purple-700">
                Ảnh Cô An Na
              </span>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setIsModalOpen(true);
            }}
            title="Tải hình ảnh đại diện của Cô An Na lên ô này"
            className="group flex items-center space-x-1.5 px-2 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 text-purple-800 border-2 border-dashed border-purple-300 hover:border-purple-500 shadow-xs transition-all active:scale-95"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-purple-200 text-purple-800 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Camera className="w-3.5 h-3.5" />
            </div>
            {showLabel && (
              <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap text-purple-900 group-hover:text-purple-950">
                + Tải ảnh lên
              </span>
            )}
          </button>
        )}
      </div>

      {/* POPUP / MODAL TẢI ẢNH CỦA CÔ AN NA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg">
                    TẢI ẢNH ĐẠI DIỆN CÔ AN NA
                  </h3>
                  <p className="text-[11px] text-purple-200">
                    Ảnh hiển thị tại ô Quản trị & toàn bộ hệ thống GDCD 6
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-purple-200 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Alert Feedback */}
              {successMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold flex items-center space-x-2">
                  <X className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Avatar Preview Center */}
              <div className="flex flex-col items-center justify-center space-y-3 py-2">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-xl bg-purple-50 flex items-center justify-center group">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={DEFAULT_ADMIN_NAME}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-purple-400">
                      <ImageIcon className="w-10 h-10 mb-1" />
                      <span className="text-[11px] font-medium text-slate-500">Chưa có ảnh</span>
                    </div>
                  )}

                  {isUploading && (
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white text-xs font-bold">
                      Đang xử lý ảnh...
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <h4 className="font-black text-slate-800 text-base">
                    {DEFAULT_ADMIN_NAME}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Giáo viên GDCD • Trường THCS Tân Hải
                  </p>
                </div>
              </div>

              {/* Upload Input Area */}
              <input
                ref={modalFileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelected}
                className="hidden"
                id="modal-avatar-file-input"
              />

              <div className="space-y-2.5">
                <label
                  htmlFor="modal-avatar-file-input"
                  className="w-full cursor-pointer bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-2xl shadow-md flex items-center justify-center space-x-2 transition-all active:scale-95 text-center"
                >
                  <Upload className="w-4 h-4" />
                  <span>{avatar ? 'CHỌN ẢNH KHÁC TỪ MÁY TÍNH / ĐIỆN THOẠI' : 'CHỌN ẢNH TỪ MÁY TÍNH / ĐIỆN THOẠI'}</span>
                </label>

                {avatar && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs py-2.5 px-4 rounded-2xl flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa ảnh đại diện hiện tại</span>
                  </button>
                )}
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Lưu ý khi tải ảnh:</span>
                </p>
                <p>• Hỗ trợ mọi định dạng ảnh: PNG, JPG, JPEG, WebP, v.v.</p>
                <p>• Hệ thống sẽ tự động tối ưu và lưu vào trình duyệt của Cô An Na an toàn.</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
