import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Bookmark, BookmarkCheck, ArrowRight, ExternalLink, Printer, Copy } from 'lucide-react';
import { SkillItem } from '@/data/skillsAndSeasons';
import { Badge, IconButton, useContextMenu, useToast } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface SkillCardProps {
  skill: SkillItem;
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
  statusBadge: 'Verified' | 'Reviewed' | 'Draft';
  className?: string;
}

export function SkillCard({
  skill,
  isBookmarked,
  onToggleBookmark,
  statusBadge,
  className
}: SkillCardProps) {
  const navigate = useNavigate();
  const { openContextMenu } = useContextMenu();
  const { toast } = useToast();

  const difficultyColors = {
    Beginner: 'text-emerald-700 dark:text-emerald-300 bg-emerald-950/10 border-emerald-600/30',
    Intermediate: 'text-amber-800 dark:text-amber-200 bg-amber-500/10 border-amber-600/30',
    Advanced: 'text-[var(--terracotta)] bg-[var(--terracotta)]/10 border-[var(--terracotta)]/30'
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    openContextMenu(e, [
      {
        label: 'Open manual',
        icon: ExternalLink,
        onClick: () => navigate(`/skills/${skill.id}`)
      },
      {
        label: isBookmarked ? 'Remove bookmark' : 'Bookmark manual',
        icon: isBookmarked ? BookmarkCheck : Bookmark,
        onClick: () => onToggleBookmark(e, skill.id)
      },
      {
        label: 'Copy manual link',
        icon: Copy,
        onClick: async () => {
          try {
            await navigator.clipboard.writeText(`${window.location.origin}/skills/${skill.id}`);
            toast({ message: 'Guide link copied to clipboard', variant: 'success' });
          } catch {
            toast({ message: 'Could not copy link', variant: 'destructive' });
          }
        }
      },
      {
        separator: true,
        label: '',
        onClick: () => {}
      },
      {
        label: 'Print field manual',
        icon: Printer,
        shortcut: 'Ctrl+P',
        onClick: () => {
          navigate(`/skills/${skill.id}`);
          setTimeout(() => window.print(), 350);
        }
      }
    ]);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className={cn(
        'group relative flex flex-col justify-between p-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-xs hover:border-[var(--accent)]/50 transition-all duration-150',
        className
      )}
    >
      <div className="flex flex-col gap-2">
        {/* Top Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge status={statusBadge} />
            <span
              className={cn(
                'text-[11px] font-sans font-medium px-2 py-0.5 rounded-[var(--radius-control)] border',
                difficultyColors[skill.difficulty] || difficultyColors.Beginner
              )}
            >
              {skill.difficulty}
            </span>
          </div>

          <IconButton
            icon={isBookmarked ? BookmarkCheck : Bookmark}
            label={isBookmarked ? 'Remove bookmark' : 'Bookmark guide'}
            size="sm"
            variant="ghost"
            onClick={(e) => onToggleBookmark(e, skill.id)}
            className={cn(
              'shrink-0 -mr-1 -mt-1',
              isBookmarked && 'text-[var(--accent)]'
            )}
          />
        </div>

        {/* Title */}
        <Link to={`/skills/${skill.id}`} className="group-hover:text-[var(--accent)] transition-colors duration-150">
          <h3 className="font-serif text-[17px] font-semibold text-[var(--ink)] leading-snug line-clamp-1">
            {skill.title}
          </h3>
        </Link>

        {/* 1-Line Summary */}
        <p className="text-[13px] text-[var(--ink-muted)] line-clamp-1 leading-relaxed">
          {skill.summary}
        </p>
      </div>

      {/* Meta Footer */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--border)] text-[12px] text-[var(--ink-muted)]">
        <div className="flex items-center gap-1.5 font-mono tabular-nums">
          <Clock size={13} className="text-[var(--accent)]" />
          <span>{skill.timeToMaster}</span>
        </div>

        <Link
          to={`/skills/${skill.id}`}
          className="inline-flex items-center gap-1 text-[13px] font-sans font-medium text-[var(--accent)] hover:underline"
        >
          <span>Read manual</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

export default SkillCard;
