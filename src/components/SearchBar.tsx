import { useState, useCallback } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { Input } from './ui/input';
import databaseService from '../services/database';
import { isSearchAuthorized, getSearchErrorMessage, logUnauthorizedSearch } from '../services/auth';
import { useTelegram } from '../hooks/useTelegram';
import type { Student } from '../types/student';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onResults: (students: Student[]) => void;
  onLoading: (loading: boolean) => void;
}

export const SearchBar = ({ onResults, onLoading }: SearchBarProps) => {
  const { user } = useTelegram();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      onResults([]);
      setError(null);
      return;
    }

    // Check authorization
    if (!isSearchAuthorized(user?.id)) {
      setError(getSearchErrorMessage());
      onResults([]);
      
      // Log unauthorized attempt
      await logUnauthorizedSearch(
        user?.id,
        user?.username,
        user?.first_name,
        user?.last_name,
        searchQuery
      );
      
      return;
    }

    setError(null);
    setIsSearching(true);
    onLoading(true);

    try {
      const result = await databaseService.searchStudents(searchQuery);
      onResults(result.students);
    } catch (error) {
      console.error('Search error:', error);
      setError('Search failed. Please try again.');
      onResults([]);
    } finally {
      setIsSearching(false);
      onLoading(false);
    }
  }, [onResults, onLoading, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by Student ID or Name..."
          value={query}
          onChange={handleInputChange}
          className={cn(
            'pl-10 pr-10 h-12 text-base',
            isSearching && 'pr-10',
            error && 'border-destructive focus-visible:ring-destructive'
          )}
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>
      {error && (
        <div className="mt-2 flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};
