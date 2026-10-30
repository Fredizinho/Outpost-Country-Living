import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Sprout,
  Hammer,
  ShieldCheck,
  Mail,
  Send,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PageHeader, Badge, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, useToast } from '@/components/ui';
import { CommunityDirectory } from '@/components/outpost/CommunityDirectory';

export default function Community() {
  const { toast } = useToast();
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    toast({
      message: 'Thank you! Your feedback has been recorded for the v1.1 Steward Network.',
      variant: 'success'
    });
    setFeedbackText('');
    setTimeout(() => {
      setShowFeedbackModal(false);
      setFeedbackSent(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--ground)] text-[var(--ink)] pb-20 transition-colors">
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-6 flex flex-col gap-6">
        {/* Page Header */}
        <PageHeader
          title="Outpost steward network & fellowship directory"
          eyebrow="Community & Mutual Aid"
          summary="Connecting country living families, verified seed savers, natural builders, and lifestyle missionaries across Southern Africa."
          chips={
            <>
              <Badge status="Reviewed" />
              <span className="text-[12px] text-[var(--ink-muted)]">
                Coming in v1.1 · Beta preview active
              </span>
            </>
          }
        />

        {/* Coming Soon & Planned Capabilities Card */}
        <Card className="border-[var(--accent)]/30 bg-[var(--surface)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[var(--radius-control)] bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0">
                  <Users size={16} />
                </div>
                <div>
                  <CardTitle>Steward Network &amp; Seed Exchange (v1.1)</CardTitle>
                  <span className="text-[12px] text-[var(--ink-muted)]">
                    Local-first mutual aid and cooperative homestead logistics
                  </span>
                </div>
              </div>

              <a
                href="mailto:outpostliving@gmail.com?subject=Steward%20Network%20Suggestions"
                className="px-3 py-1.5 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--surface-raised)] border border-[var(--border)] text-[12px] font-sans font-medium text-[var(--ink)] inline-flex items-center gap-1.5 transition-colors"
              >
                <Mail size={13} />
                <span>Send suggestions</span>
              </a>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
              We are finalizing the privacy architecture for the Outpost Steward Network. Because country living believers prioritize security and discretion, all homestead locations will use fuzzy district-level pins rather than exact coordinates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ink)]">
                  <Sprout size={14} className="text-[var(--accent)]" />
                  <span>Heirloom seed bank</span>
                </div>
                <p className="text-[12px] text-[var(--ink-muted)] leading-relaxed">
                  Open-pollinated non-GMO seed exchanges across Central, Northern, and Southern Malawi.
                </p>
              </div>

              <div className="p-3.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ink)]">
                  <Hammer size={14} className="text-[var(--accent)]" />
                  <span>Builder guilds</span>
                </div>
                <p className="text-[12px] text-[var(--ink-muted)] leading-relaxed">
                  Treadle pump loans, soil-cement block presses, and experienced timber timber-framer contacts.
                </p>
              </div>

              <div className="p-3.5 rounded-[var(--radius-control)] bg-[var(--ground)] border border-[var(--border)] flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ink)]">
                  <ShieldCheck size={14} className="text-[var(--accent)]" />
                  <span>Private verification</span>
                </div>
                <p className="text-[12px] text-[var(--ink-muted)] leading-relaxed">
                  Cryptographically verified contacts protecting family sanctuary privacy and safety.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Existing Offline Community Directory Below */}
        <div className="rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] p-6 shadow-xs">
          <CommunityDirectory />
        </div>
      </main>
    </div>
  );
}
