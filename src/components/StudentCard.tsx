import { User } from 'lucide-react';
import type { Student } from '../types/student';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';

interface StudentCardProps {
  student: Student;
  onClick: () => void;
}

export const StudentCard = ({ student, onClick }: StudentCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:border-primary/50 transition-all duration-200 animate-fade-in"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="relative h-14 w-14 flex-shrink-0">
            {student.PROFILE_PICTURE ? (
              <img
                src={student.PROFILE_PICTURE}
                alt={student.E_NAME}
                className="h-full w-full rounded-full object-cover ring-2 ring-border"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={cn(
              'flex h-full w-full items-center justify-center rounded-full bg-secondary',
              student.PROFILE_PICTURE && 'hidden'
            )}>
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>

          {/* Student Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base truncate">
              {student.E_NAME}
            </h3>
            <p className="text-sm text-muted-foreground">
              ID: {student.STUDENT_ID}
            </p>
            {student.MAJR1 && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {student.MAJR1}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
