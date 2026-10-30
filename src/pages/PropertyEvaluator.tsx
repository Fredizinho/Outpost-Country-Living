import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  ShieldCheck,
  Mail,
  ArrowRight,
  Droplets,
  Layers
} from 'lucide-react';
import { PageHeader, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { PropertySuitabilityCalculator } from '@/components/outpost/PropertySuitabilityCalculator';

export default function PropertyEvaluator() {
  return (
    <div className="min-h-screen bg-[var(--ground)] text-[var(--ink)] pb-20 transition-colors">
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-6 flex flex-col gap-6">
        {/* Page Header */}
        <PageHeader
          title="Rural property suitability & customary title evaluator"
          eyebrow="Land Assessment Rubric"
          summary="Systematic scoring matrix evaluating perennial water rights, soil fertility, road access, and customary land tenure before purchasing acreage."
          chips={
            <>
              <Badge status="Verified" />
              <span className="text-[12px] text-[var(--ink-muted)]">
                Chief Protocol · Traditional Authority &middot; 28 Districts
              </span>
            </>
          }
        />

        {/* Overview & Quick Links Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle>Field Site Assessment Criteria</CardTitle>
                <CardDescription>
                  Cross-referenced with the 2016 Malawi Customary Land Act and Spirit of Prophecy country living guidelines.
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/where"
                  className="px-3 py-1.5 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--surface-raised)] border border-[var(--border)] text-[12px] font-sans font-medium text-[var(--ink)] inline-flex items-center gap-1.5 transition-colors"
                >
                  <MapPin size={13} />
                  <span>District Explorer</span>
                </Link>
                <a
                  href="mailto:outpostliving@gmail.com?subject=Property%20Rubric%20Feedback"
                  className="px-3 py-1.5 rounded-[var(--radius-control)] bg-[var(--ground)] hover:bg-[var(--surface-raised)] border border-[var(--border)] text-[12px] font-sans font-medium text-[var(--ink)] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Mail size={13} />
                  <span>Feedback</span>
                </a>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* The Full Interactive Calculator */}
        <div className="rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 shadow-xs">
          <PropertySuitabilityCalculator />
        </div>
      </main>
    </div>
  );
}
