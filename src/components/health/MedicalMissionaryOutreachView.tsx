import React from 'react';
import {
  Heart,
  Home,
  Users,
  ShieldCheck,
  Tv,
  Sparkles,
  BookOpen,
  GraduationCap,
  Activity,
  HeartPulse
} from 'lucide-react';
import { PRACTICAL_MISSIONARY_WORK } from '@/data/eightLawsComprehensiveData';
import { Badge } from '@/components/ui';

export function MedicalMissionaryOutreachView() {
  const { homeHealthStewardship, communityOutreach } = PRACTICAL_MISSIONARY_WORK;

  return (
    <div className="flex flex-col gap-8 text-[var(--ink)]">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-control)] bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center">
            <Heart size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
                The right arm of the gospel
              </span>
              <Badge status="Verified">Medical Missionary Ministry</Badge>
            </div>
            <h3 className="font-serif text-[18px] sm:text-[22px] font-bold text-[var(--ink)]">
              Home health stewardship &amp; community outreach
            </h3>
          </div>
        </div>
      </div>

      {/* PART 1: HOME HEALTH STEWARDSHIP & SANCTIFIED ATMOSPHERE */}
      <div className="p-5 sm:p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[var(--border)] pb-3">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
              The domestic sanctuary
            </span>
            <h4 className="font-serif text-[18px] sm:text-[20px] font-bold text-[var(--ink)]">
              {homeHealthStewardship.title}
            </h4>
          </div>
        </div>

        {/* Digital Discipline & Family Altar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[var(--ink)] font-serif font-bold text-[14px]">
              <Tv size={16} className="text-rose-700 dark:text-rose-400" />
              <span>Vigilance against secular digital intrusions</span>
            </div>
            <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
              {homeHealthStewardship.digitalDiscipline}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[var(--ink)] font-serif font-bold text-[14px]">
              <Sparkles size={16} className="text-[var(--accent)]" />
              <span>The family worship altar: Morning &amp; evening</span>
            </div>
            <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
              {homeHealthStewardship.familyAltar}
            </p>
          </div>
        </div>

        {/* Foundational Child Development Windows */}
        <div className="flex flex-col gap-3 pt-2 border-t border-[var(--border)]">
          <h5 className="font-serif font-bold text-[15px] text-[var(--ink)]">
            Critical child development brackets &amp; moral milestones
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homeHealthStewardship.childDevelopmentWindows.map((window, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[13px] font-bold text-[var(--accent)]">
                    {window.ageBand}
                  </span>
                  <Badge status="Verified">{window.role}</Badge>
                </div>
                <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed mt-1">
                  {window.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 2: COMMUNITY HEALTH OUTREACH & MEDICAL MISSIONARY MINISTRY */}
      <div className="p-5 sm:p-6 rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[var(--border)] pb-3">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-sans font-medium text-[var(--accent)]">
              Operational ministry model
            </span>
            <h4 className="font-serif text-[18px] sm:text-[20px] font-bold text-[var(--ink)]">
              {communityOutreach.title}
            </h4>
          </div>
        </div>

        <p className="text-[13.5px] text-[var(--ink-muted)] leading-relaxed max-w-[80ch]">
          {communityOutreach.theRightArm}
        </p>

        {/* Practical Centers of Influence Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {communityOutreach.centersOfInfluence.map((center, idx) => (
            <div
              key={idx}
              className="p-4 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2">
                <HeartPulse size={15} className="text-[var(--accent)] shrink-0" />
                <h5 className="font-serif font-bold text-[14px] text-[var(--ink)]">
                  {center.title}
                </h5>
              </div>
              <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                {center.action}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
