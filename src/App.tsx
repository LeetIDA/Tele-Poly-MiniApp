import { useState, useEffect } from 'react';
import { useTelegram } from '@hooks/useTelegram';
import { SearchBar } from '@components/SearchBar';
import { StudentCard } from '@components/StudentCard';
import { StudentProfile } from '@components/StudentProfile';
import RecentSearches from '@components/RecentSearches';
import { Sparkles } from '@components/Sparkles';
import DecryptingText from '@components/DecryptingText';
import { isUserAuthorized, getAuthErrorMessage } from './services/auth';
import { 
  getSearchHistory, 
  addToHistory, 
  clearHistory, 
  removeFromHistory,
  type HistoryItem 
} from './utils/searchHistory';
import { AlertCircle, Database } from 'lucide-react';
import type { Student } from './types/student';

function App() {
  const { user, isAvailable } = useTelegram();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [searchHistory, setSearchHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Check authorization
    if (isAvailable && user) {
      setIsAuthorized(isUserAuthorized(user.id));
    } else {
      // In development, allow access
      setIsAuthorized(import.meta.env.DEV);
    }

    // Load search history
    setSearchHistory(getSearchHistory());
  }, [user, isAvailable]);

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    addToHistory(student);
    setSearchHistory(getSearchHistory());
  };

  const handleClearHistory = () => {
    clearHistory();
    setSearchHistory([]);
  };

  const handleRemoveFromHistory = (studentId: string) => {
    removeFromHistory(studentId);
    setSearchHistory(getSearchHistory());
  };

  if (!isAvailable) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-bold">Not Available</h2>
          <p className="text-muted-foreground">
            This application must be opened in Telegram.
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">{getAuthErrorMessage()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative overflow-auto" style={{ 
      height: 'var(--tg-viewport-stable-height, 100vh)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      {/* Dark Dot Matrix */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#0a0a0a',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
            radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
          imageRendering: 'pixelated',
        }}
      />
      
      {/* Sparkles Effect */}
      <Sparkles
        density={400}
        speed={0.8}
        size={1.2}
        color="#666666"
        opacity={0.4}
        className="absolute inset-0 z-0"
      />
      
      {selectedStudent ? (
        <StudentProfile 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      ) : (
        <div className="container max-w-4xl mx-auto p-4 pb-20 relative z-10">
          {/* Header */}
          <div className="pt-6 pb-8 space-y-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                <DecryptingText targetText="Student Database" speed={3} />
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar 
              onResults={setStudents}
              onLoading={setIsLoading}
            />
          </div>

          {/* Recent Searches */}
          {!isLoading && students.length === 0 && (
            <RecentSearches
              history={searchHistory}
              onSelect={handleStudentSelect}
              onClear={handleClearHistory}
              onRemove={handleRemoveFromHistory}
            />
          )}

          {/* Results */}
          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-sm text-muted-foreground">Searching...</p>
              </div>
            ) : students.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Found {students.length} student{students.length !== 1 ? 's' : ''}
                </p>
                {students.map((student) => (
                  <StudentCard
                    key={student.STUDENT_ID}
                    student={student}
                    onClick={() => handleStudentSelect(student)}
                  />
                ))}
              </>
            ) : (
              searchHistory.length === 0 && (
                <div className="text-center py-12 space-y-2">
                  <Database className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
                  <p className="text-muted-foreground">
                    Start typing to search for students
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
