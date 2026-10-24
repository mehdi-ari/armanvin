import React from 'react';

export type AccountTabId = 
  | 'dashboard'
  | 'courses'
  | 'charts'
  | 'ai'
  | 'orders'
  | 'wallet'
  | 'income'
  | 'club'
  | 'portal'
  | 'support'
  | 'profile';

export type StructuralLayoutId = 
  | 'tri-pillar-hub'      // ترکیب ۱: هاب سه‌لایه کیهانی (آسمان، مزاج، روان)
  | 'daily-journal'       // ترکیب ۲: تایم‌لاین و ژورنال تکاملی روزانه
  | 'split-workspace'     // ترکیب ۳: ورک‌اسپیس دو نیمه و چرخ افلاک تعاملی
  | 'kanban-matrix';      // ترکیب ۴: تابلوی ماتریکس ستونی عملیاتی

export interface UserAccountData {
  displayName: string;
  plan: string;
  balanceToman: number;
  clubPoints: number;
  tier: string;
  chartsCount: number;
  aiCount: number;
  invitedCount: number;
  streakDays: number;
  inviteCode: string;
  phone: string;
  email: string;
  birthDate: string;
  birthCity: string;
  ascendantSign?: string;
  dominantTemperament?: string;
  activeArchetype?: string;
}

export interface AccountMission {
  id: string;
  title: string;
  points: number;
  done: boolean;
  hrefText: string;
  category: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  date: string;
  status: string;
  priority: string;
}

export interface CourseItem {
  id: string;
  title: string;
  emoji: string;
  progress: number;
  lessons: string;
}

export interface SharedLayoutProps {
  userData: UserAccountData;
  setUserData: React.Dispatch<React.SetStateAction<UserAccountData>>;
  activeTab: AccountTabId;
  setActiveTab: (tab: AccountTabId) => void;
  missions: AccountMission[];
  onToggleMission: (id: string) => void;
  copiedInvite: boolean;
  onCopyInvite: () => void;
  browserReminderActive: boolean;
  onToggleReminder: () => void;
  tickets: SupportTicket[];
  newTicketMessage: string;
  setNewTicketMessage: (val: string) => void;
  onSubmitTicket: () => void;
  courses: CourseItem[];
  onLogout?: () => void;
  onNavigateToCourse?: (courseId?: string) => void;
}
