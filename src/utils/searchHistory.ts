import type { Student } from '../types/student';

const HISTORY_KEY = 'student_search_history';
const MAX_HISTORY_ITEMS = 15;

export interface HistoryItem {
  student: Student;
  timestamp: number;
}

export const getSearchHistory = (): HistoryItem[] => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const addToHistory = (student: Student): void => {
  try {
    const history = getSearchHistory();
    
    // Remove if already exists (to avoid duplicates)
    const filtered = history.filter(
      (item) => item.student.STUDENT_ID !== student.STUDENT_ID
    );
    
    // Add to beginning
    const newHistory: HistoryItem[] = [
      { student, timestamp: Date.now() },
      ...filtered,
    ].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
};

export const removeFromHistory = (studentId: string): void => {
  try {
    const history = getSearchHistory();
    const filtered = history.filter(
      (item) => item.student.STUDENT_ID !== studentId
    );
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to remove from history:', error);
  }
};
