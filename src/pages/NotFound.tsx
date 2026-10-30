import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Home, Search, BookOpen, Calculator, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';

export function NotFound() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/skills?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center select-text">
      <div className="max-w-md w-full flex flex-col items-center gap-6">
        {/* Subtle Icon Mark */}
        <div className="w-14 h-14 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shadow-xs">
          <Compass size={28} />
        </div>

        {/* Heading & Summary */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
            Error 404 &middot; Missing Index Entry
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--ink)] tracking-tight">
            Page not located
          </h1>
          <p className="text-[14px] text-[var(--ink-muted)] leading-relaxed">
            The requested destination or blueprint could not be found in the sanctuary registry. Try searching below or return to the workspace.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="w-full flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)] pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, tools, or districts..."
              className="w-full h-10 pl-9 pr-3 text-[13px] font-sans bg-[var(--surface)] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/60 rounded-[var(--radius-control)] border border-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            />
          </div>
          <Button type="submit" variant="primary" size="md">
            Search
          </Button>
        </form>

        {/* Primary Action */}
        <div className="flex items-center justify-center gap-3 w-full">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-[var(--radius-control)] bg-[var(--accent)] text-[var(--accent-ink)] font-sans font-medium text-[13px] inline-flex items-center justify-center gap-2 shadow-xs hover:opacity-95 transition-opacity"
          >
            <Home size={15} />
            <span>Return to Start</span>
          </Link>
        </div>

        {/* Quick Route Shortcuts */}
        <div className="w-full pt-6 border-t border-[var(--border)] flex flex-col gap-2.5 text-left">
          <span className="text-[12px] font-sans font-medium text-[var(--ink-muted)]">
            Quick directory destinations:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Link
              to="/where"
              className="p-3 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/50 text-[13px] text-[var(--ink)] flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-[var(--accent)]" />
                <span>District Explorer</span>
              </span>
              <ArrowRight size={12} className="text-[var(--ink-muted)]" />
            </Link>

            <Link
              to="/skills"
              className="p-3 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/50 text-[13px] text-[var(--ink)] flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <BookOpen size={14} className="text-[var(--accent)]" />
                <span>Country Skills</span>
              </span>
              <ArrowRight size={12} className="text-[var(--ink-muted)]" />
            </Link>

            <Link
              to="/calculators"
              className="p-3 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/50 text-[13px] text-[var(--ink)] flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <Calculator size={14} className="text-[var(--accent)]" />
                <span>Calculators</span>
              </span>
              <ArrowRight size={12} className="text-[var(--ink-muted)]" />
            </Link>

            <Link
              to="/tracker"
              className="p-3 rounded-[var(--radius-control)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)]/50 text-[13px] text-[var(--ink)] flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <Compass size={14} className="text-[var(--accent)]" />
                <span>Transition Tracker</span>
              </span>
              <ArrowRight size={12} className="text-[var(--ink-muted)]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
