import { TabType, StudentProgress } from '../types';
import { BookOpen, PenTool, Lightbulb, Rocket, Trophy, GraduationCap, Volume2, VolumeX, Sparkles, Home, History, Printer, User, UserCheck } from 'lucide-react';
import { playClickSound, toggleSound, isSoundEnabled } from '../utils/audio';
import { DEFAULT_SCHOOL_NAME } from '../utils/storage';
import { useState } from 'react';

interface NavbarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  isTeacherMode: boolean;
  onToggleTeacherMode: () => void;
  badgesCount: number;
  onOpenExportModal: (defaultTab?: 'print' | 'save' | 'export') => void;
  studentProgress?: StudentProgress;
  onOpenRegisterModal: () => void;
}

export default function Navbar({
  currentTab,
  onTabChange,
  isTeacherMode,
  onToggleTeacherMode,
  badgesCount,
  onOpenExportModal,
  studentProgress,
  onOpenRegisterModal
}: NavbarProps) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
  };

  const navItems: { id: TabType; label: string; icon: any; color: string; badgeText?: string }[] = [
    { id: 'home', label: 'Trang Chủ', icon: Home, color: 'text-amber-500 hover:bg-amber-50' },
    { id: 'lessons', label: 'Học Bài', icon: BookOpen, color: 'text-blue-600 hover:bg-blue-50' },
    { id: 'practice', label: 'Luyện Tập', icon: PenTool, color: 'text-emerald-600 hover:bg-emerald-50' },
    { id: 'situations', label: 'Tình Huống', icon: Lightbulb, color: 'text-purple-600 hover:bg-purple-50', badgeText: '3 SGK' },
    { id: 'apply', label: 'Vận Dụng', icon: Rocket, color: 'text-rose-600 hover:bg-rose-50' },
    { id: 'history', label: 'Lịch Sử', icon: History, color: 'text-indigo-600 hover:bg-indigo-50' },
    { id: 'achievements', label: 'Thành Tích', icon: Trophy, color: 'text-yellow-600 hover:bg-yellow-50' },
  ];

  const studentName = studentProgress?.studentName || '';
  const studentClass = studentProgress?.studentClass || '7A1';
  const isRegistered = Boolean(studentProgress?.isRegistered && studentName);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner with School Name Standard */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white text-[11px] py-1 px-4 text-center font-bold tracking-wide flex items-center justify-between border-b border-blue-800">
        <div className="flex items-center space-x-2">
          <span className="bg-yellow-400 text-slate-950 px-2 py-0.2 rounded-sm text-[10px] font-black uppercase">
            {DEFAULT_SCHOOL_NAME}
          </span>
          <span className="hidden sm:inline text-blue-200">
            • Cổng Học Tập & Thi Đua Môn GDCD Lớp 6 (Bộ 3 SGK Chuẩn 2018)
          </span>
        </div>

        {/* Student Quick Profile in Top Bar */}
        <button
          onClick={() => {
            playClickSound();
            onOpenRegisterModal();
          }}
          className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white px-2.5 py-0.5 rounded-full transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{isRegistered ? `${studentName} (${studentClass})` : 'Đăng Ký Học Sinh'}</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <button
            onClick={() => {
              playClickSound();
              onTabChange('home');
            }}
            className="flex items-center space-x-2.5 sm:space-x-3 text-left group shrink-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-white text-xl sm:text-2xl shadow-md shadow-orange-200 group-hover:scale-105 transition-transform shrink-0">
              🇻🇳
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-800 group-hover:text-amber-600 transition-colors">
                  HÀNH TRANG CÔNG DÂN 6
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-semibold text-amber-600 tracking-wide uppercase">
                Học hiểu – Luyện tập – Vận dụng
              </p>
            </div>
          </button>

          {/* Desktop Menus */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id && !isTeacherMode;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playClickSound();
                    if (isTeacherMode) onToggleTeacherMode();
                    onTabChange(item.id);
                  }}
                  className={`relative px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-orange-200 scale-105'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                  <span>{item.label}</span>
                  {item.badgeText && !isActive && (
                    <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.2 rounded-full font-bold animate-pulse">
                      {item.badgeText}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right utility buttons: Student Card + In/Xuất + Sound + Badges + Teacher Mode */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Student Registration / Profile Button */}
            <button
              onClick={() => {
                playClickSound();
                onOpenRegisterModal();
              }}
              title={isRegistered ? "Xem thẻ học sinh & thông tin cá nhân" : "Đăng ký tham gia học tập"}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-xs border ${
                isRegistered
                  ? 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-900'
                  : 'bg-gradient-to-r from-rose-500 to-amber-500 text-white border-transparent animate-bounce'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {isRegistered ? `HS: ${studentName}` : 'Đăng Ký (1 Lần)'}
              </span>
            </button>

            {/* Quick Print/Export Modal Trigger */}
            <button
              onClick={() => {
                playClickSound();
                onOpenExportModal('print');
              }}
              title="In phiếu học tập, đề thi và xuất file"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 transition-all shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In & Xuất</span>
            </button>

            {/* Sound toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundOn ? "Tắt âm thanh" : "Bật âm thanh"}
              className="p-2 sm:p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Badges count pill */}
            <button
              onClick={() => {
                playClickSound();
                if (isTeacherMode) onToggleTeacherMode();
                onTabChange('achievements');
              }}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition-all shadow-xs"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{badgesCount}/5</span>
            </button>

            {/* Teacher Mode Button */}
            <button
              onClick={() => {
                playClickSound();
                onToggleTeacherMode();
              }}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                isTeacherMode
                  ? 'bg-purple-700 text-white shadow-md shadow-purple-200 ring-2 ring-purple-300'
                  : 'bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isTeacherMode ? "Chế độ Giáo Viên" : "Góc Giáo Viên"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-1 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id && !isTeacherMode;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playClickSound();
                  if (isTeacherMode) onToggleTeacherMode();
                  onTabChange(item.id);
                }}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <button
            onClick={() => {
              playClickSound();
              onOpenExportModal('print');
            }}
            className="whitespace-nowrap px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 bg-blue-50 text-blue-700 border border-blue-200"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In & Xuất</span>
          </button>
        </div>
      </div>
    </header>
  );
}
