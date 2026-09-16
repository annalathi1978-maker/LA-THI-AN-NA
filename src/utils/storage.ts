import { StudentProgress, Badge, TeacherAssignment, StudentRecord, QuizAttemptRecord, LessonUploadedExercise } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';

export const DEFAULT_SCHOOL_NAME = "Trường THCS Tân Hải";
export const SUPPORTED_CLASSES = ["6A8", "6A9", "6A10", "6A11", "6A12"];
export const DEFAULT_ADMIN_NAME = "Cô An Na";
export const DEFAULT_ADMIN_TITLE = "Cô An Na - GV GDCD Trường THCS Tân Hải";
export const DEFAULT_ADMIN_PASSWORD = "Anna1978";

const ADMIN_PASSWORD_KEY = 'gdcd6_admin_password_v1';
const ADMIN_SESSION_KEY = 'gdcd6_admin_auth_session_v1';

export function getAdminPassword(): string {
  try {
    const saved = localStorage.getItem(ADMIN_PASSWORD_KEY);
    if (saved && saved.trim()) return saved.trim();
  } catch (e) {
    // fallback
  }
  return DEFAULT_ADMIN_PASSWORD;
}

export function setAdminPassword(newPassword: string): void {
  try {
    if (newPassword && newPassword.trim()) {
      localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword.trim());
    }
  } catch (e) {
    console.error('Error saving admin password:', e);
  }
}

export function verifyAdminPassword(entered: string): boolean {
  if (!entered) return false;
  const current = getAdminPassword();
  return entered.trim() === current || entered.trim() === DEFAULT_ADMIN_PASSWORD;
}

export function getAdminSessionStatus(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true' || localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

export function setAdminSessionStatus(isAuthenticated: boolean): void {
  try {
    if (isAuthenticated) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch (e) {
    console.error('Error setting admin session:', e);
  }
}

// Admin (Cô An Na) Avatar Image Storage
const ADMIN_AVATAR_KEY = 'gdcd6_admin_avatar_v1';

export function getAdminAvatar(): string | null {
  try {
    return localStorage.getItem(ADMIN_AVATAR_KEY);
  } catch (e) {
    return null;
  }
}

export function setAdminAvatar(avatarBase64: string | null): void {
  try {
    if (avatarBase64) {
      localStorage.setItem(ADMIN_AVATAR_KEY, avatarBase64);
    } else {
      localStorage.removeItem(ADMIN_AVATAR_KEY);
    }
    // Dispatch custom event to notify all listening components across the app
    window.dispatchEvent(new Event('adminAvatarChanged'));
  } catch (e) {
    console.error('Error saving admin avatar:', e);
  }
}

export function processImageUpload(file: File, maxSize: number = 400): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve(readerEvent.target?.result as string);
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

const PROGRESS_KEY = 'gdcd6_student_progress_v5';
const ASSIGNMENTS_KEY = 'gdcd6_teacher_assignments_v5';
const ROSTER_KEY = 'gdcd6_teacher_roster_v5';

export const INITIAL_PROGRESS: StudentProgress = {
  studentName: "",
  studentClass: "6A8",
  schoolName: DEFAULT_SCHOOL_NAME,
  studentIdCode: "",
  isRegistered: false,
  registrationDate: "",
  completedLessons: [1, 2],
  quizScores: { 1: 5, 2: 4 },
  quizAttempts: [
    {
      id: "qa-1",
      lessonId: 1,
      lessonTitle: "Bài 1: Tự hào về truyền thống gia đình, dòng họ",
      score: 5,
      percentage: 100,
      timestamp: "2026-08-25 14:15",
      answers: { "q1-1": 1, "q1-2": 2, "q1-3": 0, "q1-4": 1, "q1-5": 2 }
    }
  ],
  completedPracticeQuestionIds: ["p-choice-1", "p-tf-3"],
  solvedSituationIds: ["sit-1"],
  completedActionTaskIds: ["act-1"],
  thoughtAnswers: {
    "th-1": "Gia đình em có truyền thống hiếu học. Em luôn tự hào và nỗ lực học tập tốt tại trường THCS Tân Hải."
  },
  thoughtAnswerDates: {
    "th-1": "2026-08-25 14:30"
  },
  creativeSubmissions: [],
  todayChallengeCompleted: false,
  lastActiveLessonId: 1
};

export const INITIAL_ASSIGNMENTS: TeacherAssignment[] = [
  {
    id: "assign-1",
    lessonId: 1,
    lessonTitle: "Bài 1: Tự hào về truyền thống gia đình, dòng họ",
    targetClass: "Lớp 6A8",
    type: "practice",
    questionCount: 10,
    dueDate: "2026-09-30",
    assignedDate: "2026-09-15",
    teacherName: "Cô An Na (THCS Tân Hải)",
    note: "Các em hoàn thành Phiếu bài tập Bài 1 (5 Chặng thử thách) đúng thời gian quy định nhé!"
  }
];

export const INITIAL_ROSTER: StudentRecord[] = [
  // Lớp 6A8
  {
    id: "stu-6a8-1",
    name: "Nguyễn Văn An",
    className: "6A8",
    studentCode: "TH-6A8-001",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👦",
    score: 9.5,
    isCompleted: true,
    completedLessonsCount: 8,
    situationsCount: 5,
    lastSubmitted: "Hôm nay, 14:30",
    teacherComment: "Rất xuất sắc, lập luận tình huống sắc bén, chăm ngoan gương mẫu!",
    registeredAt: "2026-09-10"
  },
  {
    id: "stu-6a8-2",
    name: "Trần Thị Bình",
    className: "6A8",
    studentCode: "TH-6A8-002",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👧",
    score: 8.8,
    isCompleted: true,
    completedLessonsCount: 7,
    situationsCount: 4,
    lastSubmitted: "Hôm nay, 10:15",
    teacherComment: "Chăm chỉ, hoàn thành tốt các câu hỏi trắc nghiệm và tình huống.",
    registeredAt: "2026-09-10"
  },
  {
    id: "stu-6a8-3",
    name: "Lê Văn Cường",
    className: "6A8",
    studentCode: "TH-6A8-003",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "🧑",
    score: 7.5,
    isCompleted: true,
    completedLessonsCount: 5,
    situationsCount: 3,
    lastSubmitted: "Hôm qua",
    teacherComment: "Đã có tiến bộ rõ rệt ở bài Siêng năng kiên trì và Tự lập.",
    registeredAt: "2026-09-10"
  },
  // Lớp 6A9
  {
    id: "stu-6a9-1",
    name: "Phạm Thị Dung",
    className: "6A9",
    studentCode: "TH-6A9-001",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👩",
    score: 8.5,
    isCompleted: true,
    completedLessonsCount: 6,
    situationsCount: 4,
    lastSubmitted: "Hôm nay, 09:20",
    teacherComment: "Tích cực phát biểu và có giải pháp tình huống thiết thực.",
    registeredAt: "2026-09-10"
  },
  {
    id: "stu-6a9-2",
    name: "Hoàng Minh Đức",
    className: "6A9",
    studentCode: "TH-6A9-002",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "🧒",
    score: 9.8,
    isCompleted: true,
    completedLessonsCount: 10,
    situationsCount: 6,
    lastSubmitted: "Hôm nay, 16:00",
    teacherComment: "Gương mặt công dân tiêu biểu của trường THCS Tân Hải!",
    registeredAt: "2026-09-10"
  },
  // Lớp 6A10
  {
    id: "stu-6a10-1",
    name: "Vũ Bảo Ngọc",
    className: "6A10",
    studentCode: "TH-6A10-001",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👧",
    score: 9.0,
    isCompleted: true,
    completedLessonsCount: 8,
    situationsCount: 5,
    lastSubmitted: "Hôm qua, 18:30",
    teacherComment: "Tư duy mạch lạc, trả lời các câu hỏi đạo đức rất thuyết phục.",
    registeredAt: "2026-09-10"
  },
  {
    id: "stu-6a10-2",
    name: "Đỗ Thành Nam",
    className: "6A10",
    studentCode: "TH-6A10-002",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👦",
    score: 7.0,
    isCompleted: false,
    completedLessonsCount: 4,
    situationsCount: 2,
    lastSubmitted: "2 ngày trước",
    teacherComment: "Cần chú ý làm đầy đủ bài tập và nộp bài trước hạn chót.",
    registeredAt: "2026-09-10"
  },
  // Lớp 6A11
  {
    id: "stu-6a11-1",
    name: "Ngô Quốc Phong",
    className: "6A11",
    studentCode: "TH-6A11-001",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "🧑",
    score: 8.6,
    isCompleted: true,
    completedLessonsCount: 7,
    situationsCount: 4,
    lastSubmitted: "Hôm nay, 11:45",
    teacherComment: "Rất chăm chỉ, thực hành nhiệm vụ hành động đều đặn.",
    registeredAt: "2026-09-10"
  },
  {
    id: "stu-6a11-2",
    name: "Nguyễn Hà Phương",
    className: "6A11",
    studentCode: "TH-6A11-002",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👧",
    score: 9.1,
    isCompleted: true,
    completedLessonsCount: 8,
    situationsCount: 5,
    lastSubmitted: "Hôm qua",
    teacherComment: "Gương mẫu, làm bài tập đầy đủ và tích cực giúp đỡ bạn bè.",
    registeredAt: "2026-09-10"
  },
  // Lớp 6A12
  {
    id: "stu-6a12-1",
    name: "Bùi Khánh Linh",
    className: "6A12",
    studentCode: "TH-6A12-001",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👧",
    score: 9.2,
    isCompleted: true,
    completedLessonsCount: 9,
    situationsCount: 5,
    lastSubmitted: "Hôm nay, 15:10",
    teacherComment: "Bài vẽ khẩu hiệu tuyên truyền phòng chống bạo lực học đường rất đẹp!",
    registeredAt: "2026-09-10"
  },
  {
    id: "stu-6a12-2",
    name: "Đặng Tuấn Kiệt",
    className: "6A12",
    studentCode: "TH-6A12-002",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👦",
    score: 8.4,
    isCompleted: true,
    completedLessonsCount: 6,
    situationsCount: 3,
    lastSubmitted: "Hôm nay, 14:00",
    teacherComment: "Nắm chắc kiến thức bài Yêu thương con người.",
    registeredAt: "2026-09-10"
  },
  // Mẫu học sinh ảo / nhập sai thông tin để giáo viên thử nghiệm nút Quét & Xóa
  {
    id: "stu-fake-1",
    name: "Học sinh ảo test demo",
    className: "6A8",
    studentCode: "TH-6A8-999",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "🤖",
    score: 0,
    isCompleted: false,
    completedLessonsCount: 0,
    situationsCount: 0,
    lastSubmitted: "Chưa nộp",
    teacherComment: "Tài khoản ảo nhập thử nghiệm",
    registeredAt: "2026-09-10",
    isVirtual: true
  },
  {
    id: "stu-fake-2",
    name: "aaaaa 123",
    className: "6A9",
    studentCode: "TH-6A9-998",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "❓",
    score: 0,
    isCompleted: false,
    completedLessonsCount: 0,
    situationsCount: 0,
    lastSubmitted: "Sai thông tin",
    teacherComment: "Học sinh nhập sai họ tên",
    registeredAt: "2026-09-10",
    isVirtual: true
  }
];

export function getStoredProgress(): StudentProgress {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    if (!data) return INITIAL_PROGRESS;
    const parsed = JSON.parse(data);
    return {
      ...INITIAL_PROGRESS,
      ...parsed,
      quizAttempts: parsed.quizAttempts || INITIAL_PROGRESS.quizAttempts || []
    };
  } catch (e) {
    return INITIAL_PROGRESS;
  }
}

export function saveStoredProgress(progress: StudentProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress", e);
  }
}

export function getStoredAssignments(): TeacherAssignment[] {
  if (typeof window === 'undefined') return INITIAL_ASSIGNMENTS;
  try {
    const data = localStorage.getItem(ASSIGNMENTS_KEY);
    return data ? JSON.parse(data) : INITIAL_ASSIGNMENTS;
  } catch (e) {
    return INITIAL_ASSIGNMENTS;
  }
}

export function saveStoredAssignments(assignments: TeacherAssignment[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
  } catch (e) {
    console.error("Failed to save assignments", e);
  }
}

export function getStoredRoster(): StudentRecord[] {
  if (typeof window === 'undefined') return INITIAL_ROSTER;
  try {
    const data = localStorage.getItem(ROSTER_KEY);
    return data ? JSON.parse(data) : INITIAL_ROSTER;
  } catch (e) {
    return INITIAL_ROSTER;
  }
}

export function saveStoredRoster(roster: StudentRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ROSTER_KEY, JSON.stringify(roster));
  } catch (e) {
    console.error("Failed to save roster", e);
  }
}

export function calculateBadges(progress: StudentProgress): Badge[] {
  const completedLessonsCount = progress.completedLessons.length;
  const situationsCount = progress.solvedSituationIds.length;
  const actionCount = progress.completedActionTaskIds.length;
  
  // Calculate average practice score
  const totalQuiz = Object.values(progress.quizScores);
  const avgScore = totalQuiz.length > 0
    ? (totalQuiz.reduce((a, b) => a + b, 0) / (totalQuiz.length * 5)) * 100
    : 0;

  return [
    {
      id: "badge-1",
      name: "Nhà khám phá",
      title: "Huy hiệu Khám Phá",
      icon: "🧭",
      description: "Hoàn thành bài tập của ít nhất 3 bài GDCD 6",
      unlocked: completedLessonsCount >= 3
    },
    {
      id: "badge-2",
      name: "Người chăm học",
      title: "Huy hiệu Chăm Học",
      icon: "📚",
      description: "Đạt điểm kiểm tra trung bình từ 80% trở lên",
      unlocked: avgScore >= 80 || progress.completedPracticeQuestionIds.length >= 3
    },
    {
      id: "badge-3",
      name: "Nhà tư duy",
      title: "Huy hiệu Tư Duy",
      icon: "💡",
      description: "Giải quyết thành công từ 2 tình huống ứng xử thực tế",
      unlocked: situationsCount >= 2
    },
    {
      id: "badge-4",
      name: "Công dân trách nhiệm",
      title: "Huy hiệu Trách Nhiệm",
      icon: "🛡️",
      description: "Hoàn thành ít nhất 1 nhiệm vụ hành động thực tế",
      unlocked: actionCount >= 1
    },
    {
      id: "badge-5",
      name: "Công dân tiêu biểu",
      title: "Huy hiệu Tiêu Biểu",
      icon: "⭐",
      description: "Hoàn thành từ 7 bài học trở lên và có sản phẩm nộp",
      unlocked: completedLessonsCount >= 7
    },
    {
      id: "badge-fire-keeper",
      name: "Người giữ lửa gia đình",
      title: "Huy hiệu Người Giữ Lửa Gia Đình",
      icon: "🏅",
      description: "Hoàn thành xuất sắc Phiếu học tập tương tác 'Giải Mã Kho Báu Gia Đình' (Bài 1)",
      unlocked: Boolean(progress.familyTreasureQuestCompleted)
    }
  ];
}

// Helper to check if a student record is virtual / fake / invalid
export function isVirtualOrInvalidStudent(student: StudentRecord): boolean {
  if (student.isVirtual) return true;
  const name = (student.name || '').trim().toLowerCase();
  if (!name || name.length < 2) return true;
  
  const invalidKeywords = [
    'test', 'abc', 'xyz', '123', 'hoc sinh ao', 'học sinh ảo', 'ảo', 'fake', 
    'admin', 'guest', 'demo', 'asdf', 'qwer', 'tester', 'null', 'undefined', 
    'khong co', 'không có', 'hs ảo', 'ảo 1', 'ảo 2', 'học sinh mới', 'chưa biết'
  ];
  if (invalidKeywords.some(kw => name.includes(kw))) return true;

  // Repetitive characters like "aaaa"
  if (/^(.)\1{2,}$/.test(name.replace(/\s+/g, ''))) return true;

  // Names with only digits or symbols
  if (/^[^a-zA-Zà-ỹÀ-Ỹ\s]+$/.test(name)) return true;

  return false;
}

// Explanation of why a student is flagged as virtual or invalid
export function getVirtualStudentReason(student: StudentRecord): string {
  if (student.isVirtual) return "Được đánh dấu là tài khoản thử nghiệm / ảo";
  const name = (student.name || '').trim().toLowerCase();
  if (!name) return "Họ và tên đang bị để trống";
  if (name.length < 2) return "Họ và tên quá ngắn (< 2 ký tự)";
  
  const invalidKeywords = [
    'test', 'abc', 'xyz', '123', 'hoc sinh ao', 'học sinh ảo', 'ảo', 'fake', 
    'admin', 'guest', 'demo', 'asdf', 'qwer', 'tester', 'null', 'undefined', 
    'khong co', 'không có', 'hs ảo'
  ];
  for (const kw of invalidKeywords) {
    if (name.includes(kw)) return `Tên chứa từ khóa ảo / thử nghiệm ("${kw}")`;
  }

  if (/^(.)\1{2,}$/.test(name.replace(/\s+/g, ''))) return "Tên chứa ký tự lặp vô nghĩa";
  if (/^[^a-zA-Zà-ỹÀ-Ỹ\s]+$/.test(name)) return "Tên chỉ chứa ký tự đặc biệt hoặc số";

  return "Thông tin đăng ký không hợp lệ";
}

// Generate unique student ID code for THCS Tân Hải
export function generateStudentCode(className: string, index: number): string {
  const cleanClass = className.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || '6A8';
  return `TH-${cleanClass}-${String(index).padStart(3, '0')}`;
}

// Export student progress to JSON
export function downloadDataAsJSON(data: any, filename: string): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Export Roster to CSV with School Name
export function exportRosterToCSV(roster: StudentRecord[], schoolName: string = DEFAULT_SCHOOL_NAME, selectedClass: string = 'Tất cả'): void {
  const headers = ["STT", "Mã Học Sinh", "Họ và Tên", "Lớp", "Trường", "Số bài hoàn thành", "Số tình huống đã giải", "Điểm số (/10)", "Trạng thái", "Lần nộp cuối", "Nhận xét của Giáo viên"];
  const rows = roster.map((s, idx) => [
    (idx + 1).toString(),
    `"${s.studentCode || `TH-${s.className}-${idx + 1}`}"`,
    `"${s.name}"`,
    `"${s.className}"`,
    `"${s.schoolName || schoolName}"`,
    s.completedLessonsCount.toString(),
    s.situationsCount.toString(),
    s.score.toString(),
    s.isCompleted ? '"Đã hoàn thành"' : '"Chưa nộp bài"',
    `"${s.lastSubmitted}"`,
    `"${s.teacherComment || ''}"`
  ]);

  const csvContent = "\uFEFF" + [
    `# DANH SÁCH HỌC SINH - ${schoolName.toUpperCase()}`,
    `# Lớp: ${selectedClass} - Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`,
    headers.join(","),
    ...rows.map(r => r.join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Danh_Sach_Hoc_Sinh_${schoolName.replace(/\s+/g, '_')}_${selectedClass.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Lesson Uploaded Custom Exercises Storage
const LESSON_CUSTOM_EXERCISES_KEY = 'gdcd6_lesson_custom_exercises_v1';

export function getStoredLessonExercises(): LessonUploadedExercise[] {
  try {
    const saved = localStorage.getItem(LESSON_CUSTOM_EXERCISES_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading custom lesson exercises:', e);
  }
  return [];
}

export function saveStoredLessonExercises(exercises: LessonUploadedExercise[]): void {
  try {
    localStorage.setItem(LESSON_CUSTOM_EXERCISES_KEY, JSON.stringify(exercises));
  } catch (e) {
    console.error('Error saving custom lesson exercises:', e);
  }
}

export function addLessonUploadedExercise(exercise: LessonUploadedExercise): void {
  const list = getStoredLessonExercises();
  list.unshift(exercise);
  saveStoredLessonExercises(list);
}

export function batchAddLessonUploadedExercises(newExercises: LessonUploadedExercise[]): void {
  const list = getStoredLessonExercises();
  const updated = [...newExercises, ...list];
  saveStoredLessonExercises(updated);
}

export function deleteLessonUploadedExercise(id: string): void {
  const list = getStoredLessonExercises();
  const updated = list.filter((item) => item.id !== id);
  saveStoredLessonExercises(updated);
}

export function deleteLessonExercisesByLesson(lessonId: number): void {
  const list = getStoredLessonExercises();
  const updated = list.filter((item) => item.lessonId !== lessonId);
  saveStoredLessonExercises(updated);
}

// Download Sample Exercise Upload Template (.txt file)
export function downloadExerciseSampleTxt(): void {
  const sampleContent = `HƯỚNG DẪN ĐỊNH DẠNG TẢI BÀI TẬP LÊN THEO TỪNG BÀI - GDCD 6
(Cô An Na có thể sao chép mẫu này, sửa lại câu hỏi & đáp án rồi dán vào ô Tải Lên Nhanh hoặc tải file lên)

Câu 1: Hành vi nào dưới đây thể hiện sự tiết kiệm điện trong gia đình và trường học?
A. Bật đèn, quạt suốt cả ngày đêm kể cả khi không có ai trong phòng
B. Tắt quạt, điều hòa và đèn chiếu sáng mỗi khi bước ra khỏi phòng học
C. Mở tủ lạnh liên tục để làm mát phòng ngủ
D. Bật tivi nhưng để đấy đi chơi chỗ khác
Đáp án: B
Giải thích: Tắt các thiết bị điện khi không dùng giúp tiết kiệm tiền cho gia đình và bảo vệ tài nguyên quốc gia.

Câu 2: Nhận định nào sau đây là ĐÚNG về quyền cơ bản của trẻ em?
A. Trẻ em chỉ có quyền vui chơi chứ không cần phải đi học
B. Người lớn có quyền tự ý mở xem trộm tin nhắn riêng và nhật ký của trẻ em
C. Trẻ em có 4 nhóm quyền cơ bản: Sống còn, Bảo vệ, Phát triển và Tham gia
D. Bố mẹ được quyền bắt con nghỉ học sớm để đi làm thuê kiếm tiền
Đáp án: C
Giải thích: Theo Luật Trẻ em 2016, trẻ em có 4 nhóm quyền cơ bản là Sống còn, Bảo vệ, Phát triển và Tham gia.

Câu 3: (Tình huống) Trên đường đi học về, Nam nhặt được một chiếc ví có 2 triệu đồng và thẻ căn cước của người khác. Nam nên làm gì?
A. Giữ lại tiêu xài một mình
B. Mang đến nộp cho cơ quan Công an hoặc nhờ thầy cô liên hệ trả lại cho người mất
C. Chia cho bạn bè cùng đi để không ai nói gì
D. Vứt giấy tờ đi, chỉ lấy tiền
Đáp án: B
Giải thích: Nhặt được của rơi trả người đánh mất là hành vi văn minh, trung thực và tuân thủ đúng pháp luật.
`;

  const blob = new Blob([sampleContent], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Mau_De_Bai_Tap_GDCD6.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


