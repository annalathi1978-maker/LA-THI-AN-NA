/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TabType, StudentProgress, TeacherAssignment, StudentRecord, QuizAttemptRecord } from './types';
import { LESSONS_DATA } from './data/lessonsData';
import { PRACTICE_QUESTIONS } from './data/practiceData';
import { SITUATIONS_DATA } from './data/situationsData';
import { APPLY_THOUGHT_TASKS, APPLY_ACTION_TASKS, APPLY_CREATIVE_TASKS } from './data/applyData';
import {
  DEFAULT_SCHOOL_NAME,
  getStoredProgress,
  saveStoredProgress,
  getStoredAssignments,
  saveStoredAssignments,
  getStoredRoster,
  saveStoredRoster,
  calculateBadges,
  generateStudentCode,
  isVirtualOrInvalidStudent,
  getAdminSessionStatus,
  setAdminSessionStatus
} from './utils/storage';

import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import HomeworkView, { HomeworkSubTab } from './components/HomeworkView';
import HistoryView from './components/HistoryView';
import AchievementsView from './components/AchievementsView';
import TeacherView from './components/TeacherView';
import ExportPrintModal from './components/ExportPrintModal';
import StudentRegisterModal from './components/StudentRegisterModal';
import AdminAuthModal from './components/AdminAuthModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(getAdminSessionStatus);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [homeworkSubTab, setHomeworkSubTab] = useState<HomeworkSubTab>('all');
  const [homeworkLessonFilter, setHomeworkLessonFilter] = useState<number | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [exportModalTab, setExportModalTab] = useState<'print' | 'save' | 'export'>('print');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);

  // Persistent States
  const [progress, setProgress] = useState<StudentProgress>(getStoredProgress);
  const [assignments, setAssignments] = useState<TeacherAssignment[]>(getStoredAssignments);
  const [roster, setRoster] = useState<StudentRecord[]>(getStoredRoster);

  // Sync to LocalStorage on updates
  useEffect(() => {
    saveStoredProgress(progress);
  }, [progress]);

  useEffect(() => {
    saveStoredAssignments(assignments);
  }, [assignments]);

  useEffect(() => {
    saveStoredRoster(roster);
  }, [roster]);

  const badges = calculateBadges(progress);
  const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;

  const lastActiveLesson = LESSONS_DATA.find((l) => l.id === progress.lastActiveLessonId) || LESSONS_DATA[0];

  // Open Export / Print / Save Modal
  const handleOpenExportModal = (defaultTab: 'print' | 'save' | 'export' = 'print') => {
    setExportModalTab(defaultTab);
    setIsExportModalOpen(true);
  };

  // Restore imported progress
  const handleRestoreProgress = (newProgress: StudentProgress) => {
    setProgress(newProgress);
  };

  // Navigation handlers
  const handleNavigate = (tab: TabType, lessonId?: number) => {
    if (tab === 'lessons') {
      setCurrentTab('homework');
      setHomeworkLessonFilter(lessonId || null);
      setHomeworkSubTab(lessonId === 1 ? 'quest' : 'all');
    } else if (tab === 'practice') {
      setCurrentTab('homework');
      setHomeworkLessonFilter(lessonId || null);
      setHomeworkSubTab('practice');
    } else if (tab === 'situations') {
      setCurrentTab('homework');
      setHomeworkLessonFilter(lessonId || null);
      setHomeworkSubTab('situations');
    } else if (tab === 'apply') {
      setCurrentTab('homework');
      setHomeworkLessonFilter(lessonId || null);
      setHomeworkSubTab('apply');
    } else if (tab === 'homework') {
      setCurrentTab('homework');
      if (lessonId !== undefined) {
        setHomeworkLessonFilter(lessonId || null);
        if (lessonId === 1) {
          setHomeworkSubTab('quest');
        } else {
          setHomeworkSubTab('all');
        }
      }
    } else {
      setCurrentTab(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Student Registration & Profile Handler (1-time registration)
  const handleRegisterStudent = (data: { name: string; className: string; avatar: string }) => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const newCode = generateStudentCode(data.className, roster.filter(r => r.className === data.className).length + 1);

    const updatedProgress: StudentProgress = {
      ...progress,
      studentName: data.name,
      studentClass: data.className,
      schoolName: DEFAULT_SCHOOL_NAME,
      studentIdCode: newCode,
      isRegistered: true,
      registrationDate: todayStr
    };
    setProgress(updatedProgress);

    // Also synchronize into Teacher Roster
    setRoster((prev) => {
      const existingIdx = prev.findIndex((s) => s.name.toLowerCase() === data.name.toLowerCase() && s.className === data.className);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = {
          ...copy[existingIdx],
          avatar: data.avatar,
          registeredAt: todayStr,
          studentCode: newCode
        };
        return copy;
      } else {
        const newRecord: StudentRecord = {
          id: `stu-${Date.now()}`,
          name: data.name,
          className: data.className,
          studentCode: newCode,
          schoolName: DEFAULT_SCHOOL_NAME,
          avatar: data.avatar,
          score: 10,
          isCompleted: true,
          completedLessonsCount: updatedProgress.completedLessons.length,
          situationsCount: updatedProgress.solvedSituationIds.length,
          lastSubmitted: 'Vừa đăng ký',
          registeredAt: todayStr,
          teacherComment: 'Học sinh đã hoàn tất đăng ký học tập môn GDCD 6'
        };
        return [newRecord, ...prev];
      }
    });
  };

  const handleUpdateProfile = (data: { name: string; className: string; avatar: string }) => {
    setProgress((prev) => ({
      ...prev,
      studentName: data.name,
      studentClass: data.className
    }));

    setRoster((prev) =>
      prev.map((s) =>
        s.studentCode === progress.studentIdCode || s.name === progress.studentName
          ? { ...s, name: data.name, className: data.className, avatar: data.avatar }
          : s
      )
    );
  };

  // Progress update functions
  const handleCompleteQuiz = (lessonId: number, score: number) => {
    const targetLesson = LESSONS_DATA.find(l => l.id === lessonId);
    const newAttempt: QuizAttemptRecord = {
      id: `attempt-${Date.now()}`,
      lessonId,
      lessonTitle: targetLesson ? targetLesson.title : `Bài ${lessonId}`,
      score,
      totalQuestions: 5,
      percentage: Math.round((score / 5) * 100),
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN')
    };

    setProgress((prev) => {
      const updatedLessons = prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];

      const currentAttempts = prev.quizAttempts || [];

      return {
        ...prev,
        completedLessons: updatedLessons,
        quizScores: { ...prev.quizScores, [lessonId]: score },
        quizAttempts: [newAttempt, ...currentAttempts],
        lastActiveLessonId: lessonId
      };
    });
  };

  const handleCompletePracticeQuestion = (questionId: string) => {
    setProgress((prev) => {
      if (prev.completedPracticeQuestionIds.includes(questionId)) return prev;
      return {
        ...prev,
        completedPracticeQuestionIds: [...prev.completedPracticeQuestionIds, questionId]
      };
    });
  };

  const handleSolveSituation = (situationId: string) => {
    setProgress((prev) => {
      if (prev.solvedSituationIds.includes(situationId)) return prev;
      return {
        ...prev,
        solvedSituationIds: [...prev.solvedSituationIds, situationId]
      };
    });
  };

  const handleCompleteTodayChallenge = () => {
    setProgress((prev) => ({ ...prev, todayChallengeCompleted: true }));
  };

  const handleSaveThoughtAnswer = (taskId: string, answer: string) => {
    const todayStr = new Date().toLocaleDateString('vi-VN');
    setProgress((prev) => ({
      ...prev,
      thoughtAnswers: { ...prev.thoughtAnswers, [taskId]: answer },
      thoughtAnswerDates: { ...(prev.thoughtAnswerDates || {}), [taskId]: todayStr }
    }));
  };

  const handleToggleActionTask = (taskId: string) => {
    setProgress((prev) => {
      const exists = prev.completedActionTaskIds.includes(taskId);
      return {
        ...prev,
        completedActionTaskIds: exists
          ? prev.completedActionTaskIds.filter((id) => id !== taskId)
          : [...prev.completedActionTaskIds, taskId]
      };
    });
  };

  const handleSubmitCreative = (submission: any) => {
    setProgress((prev) => ({
      ...prev,
      creativeSubmissions: [...(prev.creativeSubmissions || []), submission]
    }));
  };

  const handleSaveFamilyTreasureQuest = (
    score: number,
    commitment: { tradition: string; lessonLearned: string; sevenDayAction: string; completedAt: string }
  ) => {
    setProgress((prev) => {
      const updatedLessons = prev.completedLessons.includes(1)
        ? prev.completedLessons
        : [...prev.completedLessons, 1];

      return {
        ...prev,
        familyTreasureQuestCompleted: true,
        familyTreasureQuestScore: score,
        familyTreasureQuestCommitment: commitment,
        completedLessons: updatedLessons,
        lastActiveLessonId: 1
      };
    });

    if (progress.studentName) {
      setRoster((prev) =>
        prev.map((s) => {
          if (
            s.name.trim().toLowerCase() === progress.studentName?.trim().toLowerCase() &&
            s.className === progress.studentClass
          ) {
            return {
              ...s,
              score: Math.max(s.score, 10),
              isCompleted: true,
              teacherComment: '🌟 Đã hoàn thành xuất sắc Phiếu học tập tương tác "Giải Mã Kho Báu Gia Đình" (Bài 1)!',
              lastSubmitted: 'Vừa xong (Phiếu Bài 1)'
            };
          }
          return s;
        })
      );
    }
  };

  // Teacher Handlers
  const handleAddAssignment = (newAssignment: TeacherAssignment) => {
    setAssignments((prev) => [...prev, newAssignment]);
  };

  const handleUpdateStudentComment = (studentId: string, comment: string) => {
    setRoster((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, teacherComment: comment } : s))
    );
  };

  // Add Single Student to Roster
  const handleAddStudent = (student: Partial<StudentRecord>) => {
    const newRecord: StudentRecord = {
      id: `stu-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: student.name || 'Học sinh mới',
      className: student.className || '7A1',
      studentCode: student.studentCode || generateStudentCode(student.className || '7A1', roster.length + 1),
      schoolName: student.schoolName || DEFAULT_SCHOOL_NAME,
      avatar: student.avatar || '👦',
      score: student.score ?? 10,
      isCompleted: student.isCompleted ?? true,
      completedLessonsCount: student.completedLessonsCount ?? 1,
      situationsCount: student.situationsCount ?? 1,
      lastSubmitted: student.lastSubmitted || 'Mới thêm',
      registeredAt: student.registeredAt || new Date().toISOString().slice(0, 10),
      teacherComment: student.teacherComment || ''
    };
    setRoster((prev) => [newRecord, ...prev]);
  };

  // Batch Import Students
  const handleBatchAddStudents = (newStudents: { name: string; className: string }[]) => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const createdRecords: StudentRecord[] = newStudents.map((s, idx) => ({
      id: `stu-batch-${Date.now()}-${idx}`,
      name: s.name,
      className: s.className,
      studentCode: generateStudentCode(s.className, roster.filter(r => r.className === s.className).length + idx + 1),
      schoolName: DEFAULT_SCHOOL_NAME,
      avatar: idx % 2 === 0 ? '👦' : '👧',
      score: 8.5,
      isCompleted: true,
      completedLessonsCount: 3,
      situationsCount: 2,
      lastSubmitted: 'Mới import',
      registeredAt: todayStr,
      teacherComment: 'Đã nhập vào danh sách lớp'
    }));

    setRoster((prev) => [...createdRecords, ...prev]);
  };

  // Delete Single Student
  const handleDeleteStudent = (studentId: string) => {
    setRoster((prev) => prev.filter((s) => s.id !== studentId));
  };

  // Batch Delete Students
  const handleBatchDeleteStudents = (studentIds: string[]) => {
    setRoster((prev) => prev.filter((s) => !studentIds.includes(s.id)));
  };

  // Delete Fake / Virtual / Invalid Students
  const handleDeleteVirtualStudents = (): number => {
    let count = 0;
    setRoster((prev) => {
      const filtered = prev.filter((s) => {
        const isVirtual = isVirtualOrInvalidStudent(s);
        if (isVirtual) count++;
        return !isVirtual;
      });
      return filtered;
    });
    return count;
  };

  // Update Student Info
  const handleUpdateStudent = (studentId: string, updated: Partial<StudentRecord>) => {
    setRoster((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, ...updated } : s))
    );
  };

  // Clear Class Roster
  const handleClearClass = (className: string) => {
    setRoster((prev) => prev.filter((s) => s.className.toLowerCase() !== className.toLowerCase()));
  };

  // Admin Authentication Handlers
  const handleToggleTeacherMode = () => {
    if (isTeacherMode) {
      setIsTeacherMode(false);
    } else {
      if (isAdminAuthenticated) {
        setIsTeacherMode(true);
      } else {
        setIsAdminAuthModalOpen(true);
      }
    }
  };

  const handleOpenAdminLogin = () => {
    setIsAdminAuthModalOpen(true);
  };

  const handleAdminLoginSuccess = () => {
    setAdminSessionStatus(true);
    setIsAdminAuthenticated(true);
    setIsAdminAuthModalOpen(false);
    setIsTeacherMode(true);
  };

  const handleLockAdmin = () => {
    setAdminSessionStatus(false);
    setIsAdminAuthenticated(false);
    setIsTeacherMode(false);
    setCurrentTab('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-amber-400 selection:text-amber-950">
      {/* Primary Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          if (isTeacherMode) setIsTeacherMode(false);
          handleNavigate(tab);
        }}
        isTeacherMode={isTeacherMode}
        onToggleTeacherMode={handleToggleTeacherMode}
        badgesCount={unlockedBadgesCount}
        onOpenExportModal={handleOpenExportModal}
        studentProgress={progress}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenAdminLogin={handleOpenAdminLogin}
        onLockAdmin={handleLockAdmin}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {isTeacherMode && isAdminAuthenticated ? (
          <TeacherView
            lessons={LESSONS_DATA}
            assignments={assignments}
            roster={roster}
            onAddAssignment={handleAddAssignment}
            onUpdateStudentComment={handleUpdateStudentComment}
            onAddStudent={handleAddStudent}
            onBatchAddStudents={handleBatchAddStudents}
            onDeleteStudent={handleDeleteStudent}
            onBatchDeleteStudents={handleBatchDeleteStudents}
            onDeleteVirtualStudents={handleDeleteVirtualStudents}
            onUpdateStudent={handleUpdateStudent}
            onClearClass={handleClearClass}
            onLockAdmin={handleLockAdmin}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                lastActiveLesson={lastActiveLesson}
                assignments={assignments}
                todayChallengeCompleted={progress.todayChallengeCompleted}
                onCompleteTodayChallenge={handleCompleteTodayChallenge}
                completedLessonsCount={progress.completedLessons.length}
                totalLessons={LESSONS_DATA.length}
              />
            )}

            {(currentTab === 'homework' || currentTab === 'lessons' || currentTab === 'practice' || currentTab === 'situations' || currentTab === 'apply') && (
              <HomeworkView
                lessons={LESSONS_DATA}
                initialLessonFilter={homeworkLessonFilter}
                initialSubTab={homeworkSubTab}
                practiceQuestions={PRACTICE_QUESTIONS}
                completedPracticeQuestionIds={progress.completedPracticeQuestionIds}
                onCompletePracticeQuestion={handleCompletePracticeQuestion}
                situations={SITUATIONS_DATA}
                solvedSituationIds={progress.solvedSituationIds}
                onSolveSituation={handleSolveSituation}
                thoughtTasks={APPLY_THOUGHT_TASKS}
                actionTasks={APPLY_ACTION_TASKS}
                creativeTasks={APPLY_CREATIVE_TASKS}
                progress={progress}
                onSaveThoughtAnswer={handleSaveThoughtAnswer}
                onToggleActionTask={handleToggleActionTask}
                onSubmitCreative={handleSubmitCreative}
                onSaveQuestProgress={handleSaveFamilyTreasureQuest}
                onOpenExportModal={handleOpenExportModal}
              />
            )}

            {currentTab === 'history' && (
              <HistoryView
                progress={progress}
                onNavigate={handleNavigate}
                onOpenExportModal={handleOpenExportModal}
              />
            )}

            {currentTab === 'achievements' && (
              <AchievementsView
                progress={progress}
                badges={badges}
                totalLessons={LESSONS_DATA.length}
              />
            )}
          </>
        )}
      </main>

      {/* Student Registration Modal */}
      <StudentRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        progress={progress}
        onRegisterStudent={handleRegisterStudent}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Export / Print / Save Modal */}
      <ExportPrintModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        defaultTab={exportModalTab}
        progress={progress}
        onRestoreProgress={handleRestoreProgress}
      />

      {/* Admin Authentication Modal (Cô An Na - Anna1978) */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 sm:py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="text-base">🇻🇳</span>
            <span className="font-bold text-slate-700">{DEFAULT_SCHOOL_NAME}</span>
            <span>• HÀNH TRANG CÔNG DÂN 6 • Học để hiểu – Hiểu để hành động</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleOpenExportModal('print')}
              className="text-blue-600 hover:underline font-bold"
            >
              In Phiếu Bài Tập Ở Nhà
            </button>
            <button
              onClick={() => handleOpenExportModal('export')}
              className="text-purple-600 hover:underline font-bold"
            >
              Xuất File Bài Tập 12 Bài
            </button>
            <span>• Chuẩn GDPT 2018</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
