"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { History, X, Trash2, User, Clock } from "lucide-react";
import type { Student } from '../types/student';
import { cn } from '@/lib/utils';

interface RecentSearchesProps {
  history: Array<{ student: Student; timestamp: number }>;
  onSelect: (student: Student) => void;
  onClear: () => void;
  onRemove: (studentId: string) => void;
  className?: string;
}

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: {
    width: "auto",
    opacity: 1,
    transition: { delay: 0.05, duration: 0.2, ease: "easeOut" as const },
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: { duration: 0.1, ease: "easeIn" as const },
  },
};

export const RecentSearches = ({ 
  history, 
  onSelect, 
  onClear, 
  onRemove,
  className 
}: RecentSearchesProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelected(null);
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (history.length === 0) return null;

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return new Date(timestamp).toLocaleDateString();
  };

  const handleSelect = (index: number, student: Student) => {
    setSelected(index);
    onSelect(student);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setSelected(null);
    }
  };

  const displayedHistory = isExpanded ? history : history.slice(0, 3);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/70 dark:bg-black dark:border-slate-700 p-3 shadow-lg backdrop-blur-sm",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Recent Searches
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-500">
            ({history.length})
          </span>
        </div>
        <button
          onClick={onClear}
          className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors group"
          title="Clear all history"
        >
          <Trash2 className="h-3.5 w-3.5 text-slate-400 group-hover:text-destructive transition-colors" />
        </button>
      </div>

      {/* Search Items */}
      <div className="flex flex-col gap-1">
        {displayedHistory.map((item, index) => {
          const isSelected = selected === index;

          return (
            <motion.button
              key={item.student.STUDENT_ID}
              onClick={() => handleSelect(index, item.student)}
              className={cn(
                "relative z-10 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none group",
                isSelected
                  ? "text-slate-900 dark:text-green-300"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100"
              )}
              initial={false}
            >
              {isSelected && (
                <motion.div
                  layoutId="recent-search-pill"
                  className="absolute inset-0 z-0 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-500/10 dark:to-blue-500/10 backdrop-blur-sm border border-green-400/30 dark:border-green-400/20 shadow-sm"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}

              <span className="relative z-10 flex items-center gap-3 flex-1 min-w-0">
                {/* Icon */}
                <div className={cn(
                  "flex-shrink-0 p-1.5 rounded-lg transition-colors",
                  isSelected 
                    ? "bg-green-100 dark:bg-green-500/20" 
                    : "bg-slate-100 dark:bg-slate-800"
                )}>
                  <User className={cn(
                    "h-4 w-4 transition-colors",
                    isSelected 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-slate-500 dark:text-slate-400"
                  )} />
                </div>

                {/* Student Info */}
                <div className="flex-1 min-w-0 text-left">
                  <AnimatePresence initial={false}>
                    {isSelected ? (
                      <motion.div
                        variants={spanVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <p className="font-semibold truncate text-sm">
                          {item.student.E_NAME}
                        </p>
                        <div className="flex items-center gap-2 text-xs opacity-70 mt-0.5">
                          <span className="font-mono">{item.student.STUDENT_ID}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(item.timestamp)}</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center gap-2"
                      >
                        <span className="font-mono text-xs">{item.student.STUDENT_ID}</span>
                        <span className="text-xs opacity-50">•</span>
                        <span className="text-xs opacity-70">{formatTime(item.timestamp)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(item.student.STUDENT_ID);
                  }}
                  className={cn(
                    "flex-shrink-0 p-1 rounded-md transition-all",
                    "opacity-0 group-hover:opacity-100",
                    "hover:bg-destructive/10"
                  )}
                  title="Remove from history"
                >
                  <X className="h-3.5 w-3.5 text-slate-400 hover:text-destructive transition-colors" />
                </button>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {history.length > 3 && (
        <button
          onClick={handleToggleExpand}
          className="mt-1 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50"
        >
          {isExpanded ? (
            <>Show Less</>
          ) : (
            <>Show {history.length - 3} More</>
          )}
        </button>
      )}
    </div>
  );
};

export default RecentSearches;
