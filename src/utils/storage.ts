import { StudentProgress, Badge, TeacherAssignment, StudentRecord, QuizAttemptRecord } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';

export const DEFAULT_SCHOOL_NAME = "Trường THCS Tân Hải";
export const SUPPORTED_CLASSES = ["7A1", "7A2", "7A3", "7A4", "7A5"];

const PROGRESS_KEY = 'gdcd6_student_progress_v3';
const ASSIGNMENTS_KEY = 'gdcd6_teacher_assignments_v3';
const ROSTER_KEY = 'gdcd6_teacher_roster_v3';

export const INITIAL_PROGRESS: StudentProgress = {
  studentName: "Nguyễn Văn An",
  studentClass: "7A1",
  schoolName: DEFAULT_SCHOOL_NAME,
  studentIdCode: "TH-7A1-001",
  isRegistered: true,
  registrationDate: "2026-08-25",
  completedLessons: [1, 2, 3], // initial sample progress for warm start
  quizScores: { 1: 5, 2: 4, 3: 5 },
  quizAttempts: [
    {
      id: "qa-1",
      lessonId: 1,
      lessonTitle: "Bài 1: Tự hào về truyền thống gia đình, dòng họ",
      score: 5,
      percentage: 100,
      timestamp: "2026-08-25 14:15",
      answers: { "q1-1": 1, "q1-2": 2, "q1-3": 0, "q1-4": 1, "q1-5": 2 }
    },
    {
      id: "qa-2",
      lessonId: 2,
      lessonTitle: "Bài 2: Yêu thương con người",
      score: 4,
      percentage: 80,
      timestamp: "2026-08-25 15:30",
      answers: { "q2-1": 1, "q2-2": 2, "q2-3": 1, "q2-4": 0, "q2-5": 2 }
    },
    {
      id: "qa-3",
      lessonId: 3,
      lessonTitle: "Bài 3: Siêng năng, kiên trì",
      score: 5,
      percentage: 100,
      timestamp: "2026-08-25 16:45",
      answers: { "q3-1": 1, "q3-2": 1, "q3-3": 0, "q3-4": 2, "q3-5": 1 }
    }
  ],
  completedPracticeQuestionIds: ["p-choice-1", "p-tf-3", "p-sit-1", "p-choice-4"],
  solvedSituationIds: ["sit-1", "sit-2", "sit-3"],
  completedActionTaskIds: ["act-1", "act-2"],
  thoughtAnswers: {
    "th-1": "Gia đình em có truyền thống hiếu học và ngành Y. Ông nội và bố em luôn nhắc nhở em phải trung thực và chăm chỉ. Em rất tự hào và quyết tâm học giỏi để noi gương gia đình.",
    "th-2": "Câu chuyện bé Hải An hiến giác mạc khiến em vô cùng xúc động. Yêu thương con người không chỉ là lời nói mà là hành động sẻ chia, giúp đỡ những ai gặp hoạn nạn, khó khăn.",
    "th-3": "Trạng nguyên Mạc Đĩnh Chi nghèo khó nhưng bắt đom đóm bỏ vào vỏ trứng để lấy ánh sáng học bài. Em thấy mình may mắn có đầy đủ điều kiện nên càng phải kiên trì hơn."
  },
  thoughtAnswerDates: {
    "th-1": "2026-08-25 14:30",
    "th-2": "2026-08-25 15:45",
    "th-3": "2026-08-25 17:00"
  },
  creativeSubmissions: [
    {
      id: "sub-1",
      taskId: "cr-1",
      title: "Thông điệp Yêu thương trường THCS Tân Hải (Poster & Khẩu hiệu)",
      type: "poster",
      content: "Khẩu hiệu: 'Mỗi ngày đến trường là một ngày vui - Nói lời hay, làm việc tốt, đẩy lùi bạo lực!' 💖 Chia sẻ tình thương, lan tỏa nụ cười ấm áp đến mọi bạn bè trường THCS Tân Hải.",
      submittedAt: "2026-08-25 15:50",
      teacherComment: "Ý tưởng xuất sắc, lời văn truyền cảm hứng và lan tỏa năng lượng tích cực!",
      score: 9.5
    }
  ],
  todayChallengeCompleted: false,
  lastActiveLessonId: 4
};

export const INITIAL_ASSIGNMENTS: TeacherAssignment[] = [
  {
    id: "assign-1",
    lessonId: 4,
    lessonTitle: "Bài 4: Tôn trọng sự thật",
    targetClass: "Lớp 7A1",
    type: "practice",
    questionCount: 10,
    dueDate: "2026-09-05",
    assignedDate: "2026-08-25",
    teacherName: "Cô An Na (Giáo viên GDCD)",
    note: "Các em lớp 7A1 hoàn thành phần Luyện tập và Tình huống bài 4 theo tư liệu 3 bộ sách nhé!"
  },
  {
    id: "assign-2",
    lessonId: 7,
    lessonTitle: "Bài 7: Ứng phó với các tình huống nguy hiểm",
    targetClass: "Lớp 7A2",
    type: "situation",
    questionCount: 5,
    dueDate: "2026-09-10",
    assignedDate: "2026-08-25",
    teacherName: "Thầy Minh Tuấn (GV Kỹ năng)",
    note: "Ghi nhớ các số điện thoại khẩn cấp 111, 112, 113, 114, 115 và xử lý tình huống thoát hiểm."
  }
];

export const INITIAL_ROSTER: StudentRecord[] = [
  // Lớp 7A1
  {
    id: "stu-7a1-1",
    name: "Nguyễn Văn An",
    className: "7A1",
    studentCode: "TH-7A1-001",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👦",
    score: 9.5,
    isCompleted: true,
    completedLessonsCount: 8,
    situationsCount: 5,
    lastSubmitted: "Hôm nay, 14:30",
    teacherComment: "Rất xuất sắc, lập luận tình huống sắc bén, nắm vững tư liệu 3 bộ sách!",
    registeredAt: "2026-08-25"
  },
  {
    id: "stu-7a1-2",
    name: "Trần Thị Bình",
    className: "7A1",
    studentCode: "TH-7A1-002",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👧",
    score: 8.8,
    isCompleted: true,
    completedLessonsCount: 7,
    situationsCount: 4,
    lastSubmitted: "Hôm nay, 10:15",
    teacherComment: "Chăm chỉ, hoàn thành tốt các câu hỏi trắc nghiệm và tình huống.",
    registeredAt: "2026-08-25"
  },
  {
    id: "stu-7a1-3",
    name: "Lê Văn Cường",
    className: "7A1",
    studentCode: "TH-7A1-003",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "🧑",
    score: 7.5,
    isCompleted: true,
    completedLessonsCount: 5,
    situationsCount: 3,
    lastSubmitted: "Hôm qua",
    teacherComment: "Đã có tiến bộ rõ rệt ở bài Siêng năng kiên trì và Tự lập.",
    registeredAt: "2026-08-25"
  },
  // Lớp 7A2
  {
    id: "stu-7a2-1",
    name: "Phạm Thị Dung",
    className: "7A2",
    studentCode: "TH-7A2-001",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👩",
    score: 8.5,
    isCompleted: true,
    completedLessonsCount: 6,
    situationsCount: 4,
    lastSubmitted: "Hôm nay, 09:20",
    teacherComment: "Tích cực phát biểu và có giải pháp tình huống thiết thực.",
    registeredAt: "2026-08-25"
  },
  {
    id: "stu-7a2-2",
    name: "Hoàng Minh Đức",
    className: "7A2",
    studentCode: "TH-7A2-002",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "🧒",
    score: 9.8,
    isCompleted: true,
    completedLessonsCount: 10,
    situationsCount: 6,
    lastSubmitted: "Hôm nay, 16:00",
    teacherComment: "Gương mặt công dân tiêu biểu của trường THCS Tân Hải!",
    registeredAt: "2026-08-25"
  },
  // Lớp 7A3
  {
    id: "stu-7a3-1",
    name: "Vũ Bảo Ngọc",
    className: "7A3",
    studentCode: "TH-7A3-001",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👧",
    score: 9.0,
    isCompleted: true,
    completedLessonsCount: 8,
    situationsCount: 5,
    lastSubmitted: "Hôm qua, 18:30",
    teacherComment: "Tư duy mạch lạc, trả lời các câu hỏi đạo đức rất thuyết phục.",
    registeredAt: "2026-08-25"
  },
  {
    id: "stu-7a3-2",
    name: "Đỗ Thành Nam",
    className: "7A3",
    studentCode: "TH-7A3-002",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👦",
    score: 7.0,
    isCompleted: false,
    completedLessonsCount: 4,
    situationsCount: 2,
    lastSubmitted: "2 ngày trước",
    teacherComment: "Cần chú ý làm đầy đủ bài tập và nộp bài trước hạn chót.",
    registeredAt: "2026-08-25"
  },
  // Lớp 7A4
  {
    id: "stu-7a4-1",
    name: "Ngô Quốc Phong",
    className: "7A4",
    studentCode: "TH-7A4-001",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "🧑",
    score: 8.6,
    isCompleted: true,
    completedLessonsCount: 7,
    situationsCount: 4,
    lastSubmitted: "Hôm nay, 11:45",
    teacherComment: "Rất chăm chỉ, thực hành nhiệm vụ hành động đều đặn.",
    registeredAt: "2026-08-25"
  },
  // Lớp 7A5
  {
    id: "stu-7a5-1",
    name: "Bùi Khánh Linh",
    className: "7A5",
    studentCode: "TH-7A5-001",
    schoolName: DEFAULT_SCHOOL_NAME,
    avatar: "👧",
    score: 9.2,
    isCompleted: true,
    completedLessonsCount: 9,
    situationsCount: 5,
    lastSubmitted: "Hôm nay, 15:10",
    teacherComment: "Bài vẽ khẩu hiệu tuyên truyền phòng chống bạo lực học đường rất đẹp!",
    registeredAt: "2026-08-25"
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
      description: "Hoàn thành ít nhất 3 bài học GDCD 6 từ 3 bộ sách",
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
    }
  ];
}

// Helper to check if a student record is virtual / fake / invalid
export function isVirtualOrInvalidStudent(student: StudentRecord): boolean {
  if (student.isVirtual) return true;
  const name = (student.name || '').trim().toLowerCase();
  if (!name || name.length < 2) return true;
  if (['test', 'abc', 'xyz', '123', 'hoc sinh ao', 'học sinh ảo', 'ảo', 'fake', 'admin', 'guest'].includes(name)) return true;
  if (/^(.)\1{3,}$/.test(name)) return true; // e.g. "aaaa"
  return false;
}

// Generate unique student ID code for THCS Tân Hải
export function generateStudentCode(className: string, index: number): string {
  const cleanClass = className.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || '7A1';
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

