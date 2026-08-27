import React, { useState, FormEvent, useRef } from 'react';
import { TeacherAssignment, StudentRecord, Lesson } from '../types';
import { DEFAULT_SCHOOL_NAME, SUPPORTED_CLASSES, isVirtualOrInvalidStudent, generateStudentCode, exportRosterToCSV } from '../utils/storage';
import { 
  GraduationCap, PlusCircle, CheckCircle2, Download, Send, Users, Sparkles, 
  MessageSquare, Calendar, Award, Trash2, Upload, FileText, UserPlus, 
  Search, Filter, AlertTriangle, Edit3, CheckSquare, Square, RefreshCw, X, ShieldAlert
} from 'lucide-react';
import { playClickSound, playCorrectSound, playFanfareSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface TeacherViewProps {
  lessons: Lesson[];
  assignments: TeacherAssignment[];
  roster: StudentRecord[];
  onAddAssignment: (assignment: TeacherAssignment) => void;
  onUpdateStudentComment: (studentId: string, comment: string) => void;
  onAddStudent: (student: Partial<StudentRecord>) => void;
  onBatchAddStudents: (students: { name: string; className: string }[]) => void;
  onDeleteStudent: (studentId: string) => void;
  onBatchDeleteStudents: (studentIds: string[]) => void;
  onDeleteVirtualStudents: () => number;
  onUpdateStudent: (studentId: string, updated: Partial<StudentRecord>) => void;
  onClearClass: (className: string) => void;
}

export default function TeacherView({
  lessons,
  assignments,
  roster,
  onAddAssignment,
  onUpdateStudentComment,
  onAddStudent,
  onBatchAddStudents,
  onDeleteStudent,
  onBatchDeleteStudents,
  onDeleteVirtualStudents,
  onUpdateStudent,
  onClearClass
}: TeacherViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'assign' | 'roster' | 'upload'>('roster');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // Multi-selection state for batch deletion
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  
  // Assignment Form State
  const [targetClass, setTargetClass] = useState('Lớp 7A1');
  const [selectedLessonId, setSelectedLessonId] = useState(4);
  const [assignmentType, setAssignmentType] = useState<'practice' | 'situation' | 'full'>('practice');
  const [questionCount, setQuestionCount] = useState(10);
  const [dueDate, setDueDate] = useState('2026-09-05');
  const [teacherName, setTeacherName] = useState('Cô An Na (THCS Tân Hải)');
  const [note, setNote] = useState('Các em hoàn thành phần Luyện tập và Tình huống bài 4 nhé!');
  const [successBanner, setSuccessBanner] = useState(false);

  // Student editing comment state
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  // Student editing modal state
  const [editingModalStudent, setEditingModalStudent] = useState<StudentRecord | null>(null);
  const [editNameInput, setEditNameInput] = useState('');
  const [editClassInput, setEditClassInput] = useState('7A1');
  const [editScoreInput, setEditScoreInput] = useState(10);

  // Batch Upload Form State
  const [uploadClass, setUploadClass] = useState('7A1');
  const [pasteNamesText, setPasteNamesText] = useState('');
  const [singleStudentName, setSingleStudentName] = useState('');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered Roster
  const filteredRoster = roster.filter((s) => {
    const matchesClass = selectedClassFilter === 'all' || s.className.toLowerCase().includes(selectedClassFilter.toLowerCase());
    const matchesSearch = !searchKeyword.trim() || 
      s.name.toLowerCase().includes(searchKeyword.toLowerCase()) || 
      (s.studentCode && s.studentCode.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      s.className.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // Count virtual/fake students
  const virtualStudentsCount = roster.filter(isVirtualOrInvalidStudent).length;

  // Handle create assignment
  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const lesson = lessons.find((l) => l.id === selectedLessonId);
    if (!lesson) return;

    const newAssignment: TeacherAssignment = {
      id: `assign-${Date.now()}`,
      lessonId: selectedLessonId,
      lessonTitle: lesson.title,
      targetClass,
      type: assignmentType,
      questionCount,
      dueDate,
      assignedDate: new Date().toLocaleDateString('vi-VN'),
      teacherName,
      note
    };

    playCorrectSound();
    playFanfareSound();
    onAddAssignment(newAssignment);
    setSuccessBanner(true);

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => setSuccessBanner(false), 5000);
  };

  // Handle Save Comment
  const handleSaveComment = (studentId: string) => {
    playCorrectSound();
    onUpdateStudentComment(studentId, commentInput);
    setEditingStudentId(null);
    setCommentInput('');
  };

  // Handle Export CSV for Class
  const handleExportCSV = () => {
    playClickSound();
    exportRosterToCSV(
      filteredRoster, 
      DEFAULT_SCHOOL_NAME, 
      selectedClassFilter === 'all' ? 'Tất cả các lớp' : `Lớp ${selectedClassFilter}`
    );
  };

  // Handle Delete Single Student
  const handleDeleteSingle = (student: StudentRecord) => {
    playClickSound();
    if (window.confirm(`Bạn có chắc chắn muốn xóa học sinh "${student.name}" (Lớp ${student.className}) khỏi danh sách?`)) {
      onDeleteStudent(student.id);
      setSelectedStudentIds((prev) => prev.filter((id) => id !== student.id));
      playCorrectSound();
    }
  };

  // Handle Batch Delete Selected Students
  const handleBatchDelete = () => {
    if (selectedStudentIds.length === 0) return;
    playClickSound();
    if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedStudentIds.length} học sinh đã chọn?`)) {
      onBatchDeleteStudents(selectedStudentIds);
      setSelectedStudentIds([]);
      playCorrectSound();
    }
  };

  // Handle Delete All Fake/Virtual Students
  const handleDeleteVirtual = () => {
    playClickSound();
    if (virtualStudentsCount === 0) {
      alert('Hiện không có học sinh ảo hoặc sai thông tin trong danh sách.');
      return;
    }
    if (window.confirm(`Tìm thấy ${virtualStudentsCount} học sinh ảo / không hợp lệ. Bạn có muốn tự động xóa toàn bộ các mục này?`)) {
      const deletedCount = onDeleteVirtualStudents();
      setSelectedStudentIds([]);
      playCorrectSound();
      alert(`Đã xóa thành công ${deletedCount} học sinh ảo / không hợp lệ.`);
    }
  };

  // Handle Clear Entire Current Class
  const handleClearCurrentClass = () => {
    if (selectedClassFilter === 'all') {
      alert('Vui lòng chọn một lớp cụ thể (7A1 - 7A5) để thực hiện xóa danh sách lớp.');
      return;
    }
    playClickSound();
    if (window.confirm(`CẢNH BÁO: Bạn có chắc chắn muốn xóa toàn bộ học sinh lớp ${selectedClassFilter}?`)) {
      onClearClass(selectedClassFilter);
      setSelectedStudentIds([]);
      playCorrectSound();
    }
  };

  // Handle Edit Student Modal Submit
  const handleSaveEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModalStudent) return;
    const cleanName = editNameInput.trim();
    if (!cleanName) return;

    onUpdateStudent(editingModalStudent.id, {
      name: cleanName,
      className: editClassInput,
      score: Number(editScoreInput)
    });
    playCorrectSound();
    setEditingModalStudent(null);
  };

  // Handle Batch Import Paste List
  const handleImportPastedNames = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = pasteNamesText.split('\n');
    const parsedStudents: { name: string; className: string }[] = [];

    lines.forEach((line) => {
      // Remove leading index numbers like "1. ", "01.", "1 - ", tabs
      const clean = line.replace(/^[\d\s.\-_)\],:]+/, '').trim();
      if (clean && clean.length >= 2) {
        parsedStudents.push({
          name: clean,
          className: uploadClass
        });
      }
    });

    if (parsedStudents.length === 0) {
      alert('Vui lòng dán danh sách họ và tên hợp lệ (mỗi học sinh 1 dòng).');
      return;
    }

    onBatchAddStudents(parsedStudents);
    playCorrectSound();
    playFanfareSound();
    setPasteNamesText('');
    setUploadSuccessMsg(`Tải lên thành công ${parsedStudents.length} học sinh vào lớp ${uploadClass}!`);
    setTimeout(() => setUploadSuccessMsg(''), 5000);
    setActiveSubTab('roster');
    setSelectedClassFilter(uploadClass);
  };

  // Handle File Upload (.csv, .txt)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        const lines = text.split(/\r?\n/);
        const parsedStudents: { name: string; className: string }[] = [];

        lines.forEach((line) => {
          if (!line.trim()) return;
          // Check if CSV format: STT, Name, Class or simply Name
          const parts = line.split(',').map((p) => p.replace(/^["']|["']$/g, '').trim());
          let studentName = '';
          let studentClass = uploadClass;

          if (parts.length >= 2 && isNaN(Number(parts[1]))) {
            studentName = parts[1];
            if (parts.length >= 3 && parts[2]) studentClass = parts[2].replace(/Lớp\s*/i, '');
          } else {
            studentName = parts[0].replace(/^[\d\s.\-_)\],:]+/, '').trim();
          }

          if (studentName && studentName.length >= 2 && !studentName.toLowerCase().includes('họ và tên')) {
            parsedStudents.push({
              name: studentName,
              className: studentClass || uploadClass
            });
          }
        });

        if (parsedStudents.length > 0) {
          onBatchAddStudents(parsedStudents);
          playCorrectSound();
          playFanfareSound();
          setUploadSuccessMsg(`Đã nhập ${parsedStudents.length} học sinh từ file vào danh sách lớp!`);
          setTimeout(() => setUploadSuccessMsg(''), 5000);
          setActiveSubTab('roster');
          setSelectedClassFilter(uploadClass);
        } else {
          alert('Không tìm thấy danh sách tên học sinh hợp lệ trong file.');
        }
      } catch (err) {
        alert('Lỗi đọc file. Vui lòng chọn file CSV hoặc Text hợp lệ.');
      }
    };
    reader.readAsText(file);
  };

  // Handle Single Student Add
  const handleAddSingleStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = singleStudentName.trim();
    if (!cleanName) return;

    onAddStudent({
      name: cleanName,
      className: uploadClass,
      score: 10,
      isCompleted: true,
      completedLessonsCount: 1,
      situationsCount: 1,
      schoolName: DEFAULT_SCHOOL_NAME,
      registeredAt: new Date().toLocaleDateString('vi-VN'),
      lastSubmitted: 'Vừa đăng ký'
    });

    playCorrectSound();
    setSingleStudentName('');
    setUploadSuccessMsg(`Đã thêm học sinh "${cleanName}" vào lớp ${uploadClass}!`);
    setTimeout(() => setUploadSuccessMsg(''), 4000);
  };

  // Select all or deselect all
  const handleToggleSelectAll = () => {
    if (selectedStudentIds.length === filteredRoster.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(filteredRoster.map((s) => s.id));
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16">
      {/* Header Banner with THCS Tân Hải branding */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shrink-0 shadow-inner">
            <GraduationCap className="w-7 h-7 text-yellow-300" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 bg-yellow-400 text-slate-950 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider mb-1">
              <span>{DEFAULT_SCHOOL_NAME}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight">
              BẢNG ĐIỀU KHIỂN GIÁO VIÊN GDCD 6
            </h2>
            <p className="text-xs sm:text-sm text-purple-200 mt-0.5">
              Quản lý danh sách lớp (7A1 - 7A5) • Không giới hạn học sinh • Tải danh sách & Xóa học sinh ảo
            </p>
          </div>
        </div>

        {/* Action Buttons in Banner */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => {
              playClickSound();
              setActiveSubTab('upload');
            }}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-md flex items-center space-x-1.5 transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>TẢI DANH SÁCH LỚP</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-md shadow-emerald-900/30 flex items-center space-x-1.5 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>XUẤT EXCEL / CSV</span>
          </button>
        </div>
      </div>

      {/* 3 Main Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => {
            playClickSound();
            setActiveSubTab('roster');
          }}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            activeSubTab === 'roster'
              ? 'bg-purple-700 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>1. Danh Sách & Quản Lý Học Sinh ({roster.length})</span>
        </button>

        <button
          onClick={() => {
            playClickSound();
            setActiveSubTab('upload');
          }}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            activeSubTab === 'upload'
              ? 'bg-purple-700 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>2. Tải Lên Danh Sách Lớp (7A1 - 7A5)</span>
        </button>

        <button
          onClick={() => {
            playClickSound();
            setActiveSubTab('assign');
          }}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            activeSubTab === 'assign'
              ? 'bg-purple-700 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>3. Giao Bài Tập Nhanh</span>
        </button>
      </div>

      {/* TAB 1: DANH SÁCH & THEO DÕI HỌC SINH + XÓA HỌC SINH ẢO */}
      {activeSubTab === 'roster' && (
        <div className="space-y-5">
          {/* Class Filter Bar: Tất cả, 7A1 -> 7A5 */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Class tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-slate-500 mr-2 flex items-center space-x-1 shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span>Khối lớp:</span>
              </span>

              <button
                onClick={() => {
                  playClickSound();
                  setSelectedClassFilter('all');
                }}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                  selectedClassFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tất cả các lớp ({roster.length})
              </button>

              {SUPPORTED_CLASSES.map((cls) => {
                const count = roster.filter((s) => s.className.toLowerCase() === cls.toLowerCase()).length;
                return (
                  <button
                    key={cls}
                    onClick={() => {
                      playClickSound();
                      setSelectedClassFilter(cls);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap flex items-center space-x-1 ${
                      selectedClassFilter.toLowerCase() === cls.toLowerCase()
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>Lớp {cls}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      selectedClassFilter.toLowerCase() === cls.toLowerCase() ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm tên, mã HS, lớp..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:bg-white focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Action Toolbar: Xóa đã chọn, Xóa học sinh ảo, Xóa lớp */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleToggleSelectAll}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center space-x-1.5"
              >
                {selectedStudentIds.length === filteredRoster.length && filteredRoster.length > 0 ? (
                  <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>Chọn tất cả ({filteredRoster.length})</span>
              </button>

              {selectedStudentIds.length > 0 && (
                <button
                  onClick={handleBatchDelete}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs transition-all animate-fadeIn"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa ({selectedStudentIds.length}) học sinh đã chọn</span>
                </button>
              )}
            </div>

            {/* Fake / Invalid Student Cleaning Button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDeleteVirtual}
                title="Tự động quét và xóa các tài khoản học sinh ảo hoặc nhập sai thông tin"
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all border ${
                  virtualStudentsCount > 0
                    ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-300/50 animate-pulse'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                <span>Quét & Xóa Học Sinh Ảo / Sai ({virtualStudentsCount})</span>
              </button>

              {selectedClassFilter !== 'all' && (
                <button
                  onClick={handleClearCurrentClass}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-600 font-bold text-xs transition-all"
                >
                  Xóa cả lớp {selectedClassFilter}
                </button>
              )}
            </div>
          </div>

          {/* Main Roster Table */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-black text-base sm:text-lg text-slate-800 flex items-center space-x-2">
                  <span>Danh Sách Học Sinh: {selectedClassFilter === 'all' ? 'Toàn Khối (7A1 - 7A5)' : `Lớp ${selectedClassFilter}`}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold">
                    {DEFAULT_SCHOOL_NAME}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Không giới hạn số lượng học sinh • Hỗ trợ chỉnh sửa và xóa học sinh sai thông tin
                </p>
              </div>
              <span className="text-xs font-bold bg-purple-100 text-purple-800 px-3 py-1.5 rounded-xl">
                Sĩ số: {filteredRoster.length} học sinh
              </span>
            </div>

            {filteredRoster.length === 0 ? (
              <div className="p-12 text-center text-slate-500 space-y-3">
                <Users className="w-12 h-12 mx-auto text-slate-300" />
                <p className="text-sm font-semibold">Chưa có học sinh nào trong danh mục này.</p>
                <button
                  onClick={() => setActiveSubTab('upload')}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Tải danh sách học sinh lên ngay
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3 text-center w-10">
                        <input
                          type="checkbox"
                          checked={selectedStudentIds.length === filteredRoster.length && filteredRoster.length > 0}
                          onChange={handleToggleSelectAll}
                          className="rounded text-blue-600"
                        />
                      </th>
                      <th className="py-3 px-3">STT</th>
                      <th className="py-3 px-4">Mã HS</th>
                      <th className="py-3 px-4">Họ và Tên</th>
                      <th className="py-3 px-3 text-center">Lớp</th>
                      <th className="py-3 px-3 text-center">Điểm TB</th>
                      <th className="py-3 px-3 text-center">Tiến độ</th>
                      <th className="py-3 px-4">Nhận xét của Giáo viên</th>
                      <th className="py-3 px-3 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRoster.map((student, idx) => {
                      const isVirtual = isVirtualOrInvalidStudent(student);
                      const isSelected = selectedStudentIds.includes(student.id);

                      return (
                        <tr 
                          key={student.id} 
                          className={`transition-colors ${
                            isSelected 
                              ? 'bg-blue-50/70' 
                              : isVirtual 
                              ? 'bg-amber-50/40 hover:bg-amber-50' 
                              : 'hover:bg-slate-50/80'
                          }`}
                        >
                          <td className="py-3 px-3 text-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                setSelectedStudentIds((prev) =>
                                  prev.includes(student.id)
                                    ? prev.filter((id) => id !== student.id)
                                    : [...prev, student.id]
                                );
                              }}
                              className="rounded text-blue-600"
                            />
                          </td>
                          <td className="py-3 px-3 font-bold text-slate-400 text-center">
                            {idx + 1}
                          </td>
                          <td className="py-3 px-4 font-mono text-xs font-semibold text-slate-500">
                            {student.studentCode || generateStudentCode(student.className, idx + 1)}
                          </td>
                          <td className="py-3 px-4 font-extrabold text-slate-900">
                            <div className="flex items-center space-x-2">
                              <span>{student.avatar || '👦'}</span>
                              <span className={isVirtual ? 'text-amber-800' : ''}>{student.name}</span>
                              {isVirtual && (
                                <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                                  Nghi vấn ảo
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-blue-700">
                            <span className="bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                              {student.className}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className={`inline-block font-black px-2 py-0.5 rounded-lg text-xs ${
                              student.score >= 8.5
                                ? 'bg-emerald-100 text-emerald-800'
                                : student.score >= 6.5
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {student.score > 0 ? student.score : '-'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center font-semibold text-slate-600 text-xs">
                            {student.completedLessonsCount}/10 bài
                          </td>
                          <td className="py-3 px-4">
                            {editingStudentId === student.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={commentInput}
                                  onChange={(e) => setCommentInput(e.target.value)}
                                  placeholder="Gõ nhận xét..."
                                  className="bg-slate-100 text-xs p-2 rounded-xl border border-slate-300 w-full"
                                />
                                <button
                                  onClick={() => handleSaveComment(student.id)}
                                  className="bg-purple-600 text-white px-3 py-1.5 rounded-xl font-bold text-xs shrink-0"
                                >
                                  Lưu
                                </button>
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  setEditingStudentId(student.id);
                                  setCommentInput(student.teacherComment || '');
                                }}
                                className="cursor-pointer group flex items-center justify-between text-xs text-slate-700 bg-slate-50 hover:bg-purple-50 p-2 rounded-xl border border-slate-200 transition-colors"
                              >
                                <span className="italic line-clamp-1">
                                  {student.teacherComment || "[Ghi nhận xét nhanh...]"}
                                </span>
                                <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 shrink-0 ml-1" />
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              {/* Edit Button */}
                              <button
                                onClick={() => {
                                  setEditingModalStudent(student);
                                  setEditNameInput(student.name);
                                  setEditClassInput(student.className);
                                  setEditScoreInput(student.score);
                                }}
                                title="Sửa thông tin học sinh"
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Button */}
                              <button
                                onClick={() => handleDeleteSingle(student)}
                                title="Xóa học sinh này (Học sinh ảo hoặc nhập sai)"
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
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
      )}

      {/* TAB 2: TẢI LÊN DANH SÁCH LỚP (7A1 - 7A5) - UNLIMITED */}
      {activeSubTab === 'upload' && (
        <div className="space-y-6">
          {uploadSuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-900 text-sm font-bold flex items-center space-x-3 shadow-xs animate-slideDown">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{uploadSuccessMsg}</span>
            </div>
          )}

          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                <span>📥 Tải Lên Danh Sách Học Sinh Khối 7</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Nhập danh sách học sinh theo từng lớp từ <b>7A1 đến 7A5</b> tại <b>{DEFAULT_SCHOOL_NAME}</b>. Số lượng học sinh tải lên là <b>không giới hạn</b>.
              </p>
            </div>

            {/* Choose target class */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                1. Chọn Lớp Cần Tải Danh Sách:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {SUPPORTED_CLASSES.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setUploadClass(cls);
                    }}
                    className={`py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all border ${
                      uploadClass === cls
                        ? 'bg-purple-700 text-white border-purple-700 shadow-md scale-105'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Lớp {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Upload Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Method A: Paste list */}
              <div className="border-2 border-slate-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 font-black text-slate-800 text-sm mb-1">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>Cách 1: Dán danh sách họ tên (Nhanh nhất)</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">
                    Dán danh sách từ Excel / Word / Zalo (mỗi học sinh 1 dòng). Hệ thống tự động lọc số thứ tự.
                  </p>

                  <textarea
                    rows={7}
                    value={pasteNamesText}
                    onChange={(e) => setPasteNamesText(e.target.value)}
                    placeholder={`1. Nguyễn Văn An\n2. Trần Thị Bình\n3. Lê Văn Cường\n4. Phạm Thị Dung\n... (Không giới hạn số lượng)`}
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 focus:bg-white focus:outline-hidden focus:border-purple-600 transition-all"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleImportPastedNames}
                  className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-md active:scale-95 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>Tải Lên Danh Sách Cho Lớp {uploadClass}</span>
                </button>
              </div>

              {/* Method B: Upload File CSV / Text & Add Single */}
              <div className="space-y-6">
                {/* Upload File */}
                <div className="border-2 border-dashed border-slate-300 hover:border-purple-500 rounded-2xl p-5 text-center space-y-3 transition-colors bg-slate-50/50">
                  <Upload className="w-8 h-8 text-purple-600 mx-auto" />
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-slate-800">
                      Cách 2: Tải file danh sách (.CSV hoặc .TXT)
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Định dạng chuẩn: STT, Họ và tên, Lớp
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs shadow-xs"
                  >
                    Chọn File Từ Máy Tính
                  </button>
                </div>

                {/* Add single student */}
                <div className="border-2 border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center space-x-2 font-black text-slate-800 text-xs">
                    <UserPlus className="w-4 h-4 text-blue-600" />
                    <span>Cách 3: Thêm từng học sinh thủ công</span>
                  </div>

                  <form onSubmit={handleAddSingleStudent} className="flex space-x-2">
                    <input
                      type="text"
                      value={singleStudentName}
                      onChange={(e) => setSingleStudentName(e.target.value)}
                      placeholder={`Nhập tên học sinh lớp ${uploadClass}...`}
                      className="flex-1 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shrink-0"
                    >
                      Thêm
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GIAO BÀI NHANH */}
      {activeSubTab === 'assign' && (
        <div className="space-y-6">
          {successBanner && (
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold flex items-start space-x-3 shadow-xs animate-slideDown">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p>Nhiệm vụ đã được giao thành công cho toàn bộ học sinh {targetClass} ({DEFAULT_SCHOOL_NAME})!</p>
                <p className="text-xs text-emerald-700 font-normal mt-0.5">
                  Học sinh khi mở app sẽ thấy thông báo nổi bật từ {teacherName}.
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center space-x-2">
              <span>📋 Thiết lập nhiệm vụ mới cho học sinh:</span>
            </h3>

            <form onSubmit={handleCreateAssignment} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Chọn lớp */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    1. Chọn lớp:
                  </label>
                  <select
                    value={targetClass}
                    onChange={(e) => setTargetClass(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold p-3 rounded-2xl border border-slate-200"
                  >
                    {SUPPORTED_CLASSES.map((cls) => (
                      <option key={cls} value={`Lớp ${cls}`}>Lớp {cls}</option>
                    ))}
                    <option value="Toàn khối 7">Toàn khối 7 ({DEFAULT_SCHOOL_NAME})</option>
                  </select>
                </div>

                {/* Chọn bài */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    2. Chọn bài học:
                  </label>
                  <select
                    value={selectedLessonId}
                    onChange={(e) => setSelectedLessonId(Number(e.target.value))}
                    className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold p-3 rounded-2xl border border-slate-200"
                  >
                    {lessons.map((l) => (
                      <option key={l.id} value={l.id}>
                        Bài {l.order}: {l.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Chọn dạng */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    3. Chọn dạng nhiệm vụ:
                  </label>
                  <select
                    value={assignmentType}
                    onChange={(e) => setAssignmentType(e.target.value as any)}
                    className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold p-3 rounded-2xl border border-slate-200"
                  >
                    <option value="practice">Luyện tập (Trắc nghiệm + Đúng sai)</option>
                    <option value="situation">Xử lý tình huống thực tế</option>
                    <option value="full">Toàn diện (Học bài + Luyện tập + Vận dụng)</option>
                  </select>
                </div>

                {/* Hạn nộp */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    4. Hạn nộp bài:
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold p-3 rounded-2xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tên giáo viên phụ trách:
                  </label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="VD: Cô An Na"
                    className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm p-3 rounded-2xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Số lượng câu hỏi / yêu cầu:
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={30}
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm p-3 rounded-2xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Lời dặn dò của giáo viên:
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="VD: Các em nhớ làm bài kỹ và nộp trước hạn..."
                  className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm p-3 rounded-2xl border border-slate-200"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-800 text-white font-black text-sm px-8 py-3.5 rounded-2xl shadow-md shadow-purple-200 hover:shadow-lg active:scale-95 transition-all flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>GIAO BÀI CHO HỌC SINH</span>
                </button>
              </div>
            </form>
          </div>

          {/* Assignments History */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-slate-800 uppercase tracking-wider">
              Lịch sử các bài đã giao ({assignments.length}):
            </h4>
            <div className="space-y-3">
              {assignments.map((assign) => (
                <div
                  key={assign.id}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                      {assign.targetClass}
                    </span>
                    <div>
                      <h5 className="font-bold text-sm text-slate-800">{assign.lessonTitle}</h5>
                      <p className="text-xs text-slate-500">
                        {assign.type} • {assign.questionCount} câu • Hạn: <span className="text-rose-600 font-semibold">{assign.dueDate}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    Giao ngày: {assign.assignedDate} bởi {assign.teacherName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EDIT STUDENT INFO MODAL */}
      {editingModalStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h4 className="font-black text-slate-900 text-base flex items-center space-x-2">
                <Edit3 className="w-4 h-4 text-blue-600" />
                <span>Sửa Thông Tin Học Sinh</span>
              </h4>
              <button
                onClick={() => setEditingModalStudent(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên học sinh:
                </label>
                <input
                  type="text"
                  required
                  value={editNameInput}
                  onChange={(e) => setEditNameInput(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 text-sm font-semibold p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lớp:
                </label>
                <select
                  value={editClassInput}
                  onChange={(e) => setEditClassInput(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 text-sm font-semibold p-2.5 rounded-xl border border-slate-300"
                >
                  {SUPPORTED_CLASSES.map((cls) => (
                    <option key={cls} value={cls}>Lớp {cls}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Điểm số trung bình (/10):
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={editScoreInput}
                  onChange={(e) => setEditScoreInput(Number(e.target.value))}
                  className="w-full bg-slate-50 text-slate-900 text-sm font-semibold p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingModalStudent(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
