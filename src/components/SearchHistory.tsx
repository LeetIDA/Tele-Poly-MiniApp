import { History, X, Trash2 } from 'lucide-react';
import type { Student } from '../types/student';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

interface SearchHistoryProps {
  history: Array<{ student: Student; timestamp: number }>;
  onSelect: (student: Student) => void;
  onClear: () => void;
  onRemove: (studentId: string) => void;
}

export const SearchHistory = ({ history, onSelect, onClear, onRemove }: SearchHistoryProps) => {
  if (history.length === 0) return null;

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <History className="h-4 w-4" />
            Recent Searches
          </CardTitle>
          <button
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          >
            <Trash2 className="h-3 w-3" />
            Clear All
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {history.map((item) => (
            <div
              key={item.student.STUDENT_ID}
              className={cn(
                'group flex items-center gap-3 p-2 rounded-lg',
                'hover:bg-secondary/50 transition-colors cursor-pointer'
              )}
              onClick={() => onSelect(item.student)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {item.student.E_NAME}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.student.STUDENT_ID}</span>
                  <span>•</span>
                  <span>{formatTime(item.timestamp)}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.student.STUDENT_ID);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all"
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
