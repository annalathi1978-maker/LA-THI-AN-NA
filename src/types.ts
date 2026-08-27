export type TabType = 'home' | 'lessons' | 'practice' | 'situations' | 'apply' | 'history' | 'achievements' | 'teacher';

export type TextbookSeries = 'all' | 'canh_dieu' | 'chan_troi' | 'ket_noi';

export type LessonPartType = 'intro' | 'knowledge' | 'textbooks' | 'summary' | 'mindmap' | 'quiz';

export interface QuickQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  sourceBook?: 'Cánh Diều' | 'Chân Trời Sáng Tạo' | 'Kết Nối Tri Thức' | 'Tổng Hợp';
}

export interface MindmapNode {
  id: string;
  label: string;
  icon?: string;
  color?: string;
  children?: {
    id: string;
    label: string;
    desc?: string;
  }[];
}

export interface TextbookCaseStudy {
  bookName: 'Cánh Diều' | 'Chân Trời Sáng Tạo' | 'Kết Nối Tri Thức';
  bookColor: string;
  title: string;
  chapter?: string;
  content: string;
  lessonTakeaway: string;
  characterOrEvent: string;
}

export interface Lesson {
  id: number;
  title: string;
  order: number;
  shortDesc: string;
  icon: string;
  badgeColor: string;
  bgColor: string;
  coverImage?: string;
  
  // 3 Textbook sources
  textbookCaseStudies: TextbookCaseStudy[];

  // 5 core parts
  intro: {
    title: string;
    scenario: string;
    question: string;
    suggestedThought?: string;
  };
  knowledge: {
    sectionTitle: string;
    keyPoints: {
      heading: string;
      content: string;
      example?: string;
      icon?: string;
      sourceBook?: string;
    }[];
  };
  summary: string[]; // 3-7 core memory points
  mindmap: {
    centerTitle: string;
    nodes: MindmapNode[];
  };
  quiz: QuickQuizQuestion[]; // 5 questions
}

export type QuestionType = 'choice' | 'true_false' | 'situation';

export interface PracticeQuestion {
  id: string;
  lessonId: number;
  lessonTitle: string;
  type: QuestionType;
  question: string;
  options?: string[]; // for ABCD and situation
  correctAnswer: number | boolean; // index 0-3 for ABCD/situation or boolean for true/false
  explanation: string;
  practicalTip?: string;
  sourceBook?: 'Cánh Diều' | 'Chân Trời Sáng Tạo' | 'Kết Nối Tri Thức' | 'Tổng Hợp';
}

export interface SituationItem {
  id: string;
  lessonId: number;
  lessonTitle: string;
  title: string;
  scenario: string;
  character: string;
  avatar: string;
  sourceBook?: 'Cánh Diều' | 'Chân Trời Sáng Tạo' | 'Kết Nối Tri Thức' | 'Thực Tế';
  options: {
    id: string;
    text: string;
    isOptimal: boolean;
  }[];
  optimalAnswer: string;
  explanation: string;
  lessonLearned: string;
}

export interface ApplyThoughtTask {
  id: string;
  lessonId: number;
  lessonTitle: string;
  question: string;
  context: string;
  sampleAnswerHint: string;
  sourceBook?: string;
}

export interface ApplyActionTask {
  id: string;
  title: string;
  category: string;
  targetDays: number;
  description: string;
  steps: string[];
}

export interface ApplyCreativeTask {
  id: string;
  title: string;
  topic: string;
  type: 'poster' | 'infographic' | 'slogan' | 'article';
  guidelines: string[];
  examples: string[];
}

export interface QuizAttemptRecord {
  id: string;
  lessonId: number;
  lessonTitle: string;
  score: number; // out of 5
  totalQuestions?: number;
  percentage: number;
  timestamp: string;
  answers?: Record<string, number>;
}

export interface StudentProgress {
  studentName?: string;
  studentClass?: string;
  schoolName?: string;
  studentIdCode?: string;
  isRegistered?: boolean;
  registrationDate?: string;
  completedLessons: number[]; // lesson ids
  quizScores: Record<number, number>; // lessonId -> best score (0-5)
  quizAttempts: QuizAttemptRecord[]; // full history of quiz attempts
  completedPracticeQuestionIds: string[];
  solvedSituationIds: string[];
  completedActionTaskIds: string[];
  thoughtAnswers: Record<string, string>; // taskId -> student answer
  thoughtAnswerDates?: Record<string, string>; // taskId -> ISO timestamp
  creativeSubmissions: {
    id: string;
    taskId: string;
    title: string;
    type: string;
    content: string;
    submittedAt: string;
    teacherComment?: string;
    score?: number;
  }[];
  todayChallengeCompleted: boolean;
  lastActiveLessonId: number;
}

export interface Badge {
  id: string;
  name: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface TeacherAssignment {
  id: string;
  lessonId: number;
  lessonTitle: string;
  targetClass: string;
  type: 'practice' | 'situation' | 'apply';
  questionCount: number;
  dueDate: string;
  assignedDate: string;
  teacherName: string;
  note: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  className: string;
  studentCode?: string;
  schoolName?: string;
  avatar: string;
  score: number; // 0 - 10
  isCompleted: boolean;
  completedLessonsCount: number;
  situationsCount: number;
  lastSubmitted: string;
  teacherComment?: string;
  registeredAt?: string;
  isVirtual?: boolean;
}
