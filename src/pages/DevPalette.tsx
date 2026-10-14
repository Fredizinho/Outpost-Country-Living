import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Sun,
  Moon,
  Eye,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Info,
  ArrowRight,
  Flame,
  Sprout,
  ShieldCheck,
  Type,
  Palette,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import homeBefore360 from '@/assets/images/home_before_360px_1791643533517.jpg';
import homeRedesign360 from '@/assets/images/home_redesign_360px_1791643497860.jpg';
import homeBefore1280 from '@/assets/images/home_before_1280px_1791643551395.jpg';
import homeRedesign1280 from '@/assets/images/home_redesign_1280px_1791643513908.jpg';
import malawiOutpostBotanical from '@/assets/images/malawi_outpost_botanical_1791643568542.jpg';

export default function DevPalette() {
  const { theme, setTheme, isDark, isField } = useTheme();
  const [previewMode, setPreviewMode] = useState<'current' | 'compare'>('compare');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full flex flex-col gap-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          {/* Eyebrow over 3 words: strictly sentence case */}
          <div className="flex items-center gap-2 text-[12px] font-mono font-semibold text-accent normal-case tracking-normal mb-1">
            <Palette size={14} />
            <span>Outpost living · design tokens &amp; color audit</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-ink tracking-tight">
            Design Tokens &amp; Semantic Palette
          </h1>
          <p className="text-base text-ink-muted mt-1 max-w-2xl">
            Brand foundation (Deep Moss #071A10, Forest #0D2818, Gold #F59E0B, Cream #FEF3C7),
            Katondo Terracotta primary actions, warmed earth neutrals, and strict 12px+ typography scale.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-control bg-surface-muted border border-border">
            {(['light', 'dark', 'field'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setTheme(m)}
                className={cn(
                  'px-3 py-1.5 rounded-control text-[13.5px] font-medium normal-case inline-flex items-center gap-1.5 transition-all cursor-pointer',
                  theme === m
                    ? m === 'field'
                      ? 'bg-black text-white border-2 border-white font-semibold ring-2 ring-amber-400'
                      : 'bg-surface-raised text-ink font-semibold shadow-flat border border-amber-400/50'
                    : 'text-ink-muted hover:text-ink'
                )}
              >
                {m === 'light' ? (
                  <Sun size={13} className="text-amber-500" />
                ) : m === 'dark' ? (
                  <Moon size={13} className="text-emerald-400" />
                ) : (
                  <Eye size={13} className="text-white" />
                )}
                <span className="capitalize">{m}</span>
              </button>
            ))}
          </div>

          <div className="inline-flex items-center p-1 rounded-control bg-surface-muted border border-border text-[13px]">
            <button
              type="button"
              onClick={() => setPreviewMode('compare')}
              className={cn(
                'px-2.5 py-1 rounded-control font-medium normal-case transition-colors cursor-pointer',
                previewMode === 'compare' ? 'bg-surface-raised text-ink font-semibold shadow-flat' : 'text-ink-muted'
              )}
            >
              Side-by-side (light &amp; dark)
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('current')}
              className={cn(
                'px-2.5 py-1 rounded-control font-medium normal-case transition-colors cursor-pointer',
                previewMode === 'current' ? 'bg-surface-raised text-ink font-semibold shadow-flat' : 'text-ink-muted'
              )}
            >
              Current theme only
            </button>
          </div>
        </div>
      </div>

      {/* 1. BRAND FOUNDATION (4 PILLARS) */}
      <section className="flex flex-col gap-4">
        <div>
          {/* Eyebrow <= 2 words: 12px uppercase with 0.08em tracking */}
          <span className="text-[12px] font-mono font-semibold text-accent uppercase tracking-[0.08em] block">
            Brand core
          </span>
          <h2 className="font-display text-2xl font-semibold leading-tight text-ink mt-0.5">
            Existing Brand Foundation
          </h2>
          <p className="text-[13.5px] text-ink-muted">Non-Tailwind default heritage palette for the Malawian Outpost sanctuary.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'Deep Moss',
              hex: '#071A10',
              role: 'Sanctuary base & dark mode canvas',
              desc: 'Deep midnight green of highland cedar forests and primary dark background.',
              textLight: true,
            },
            {
              name: 'Forest Earthy',
              hex: '#0D2818',
              role: 'Secondary depth & raised surfaces',
              desc: 'Rich organic evergreen for raised container cards, sidebar, and depth.',
              textLight: true,
            },
            {
              name: 'Gold Spark',
              hex: '#F59E0B',
              role: 'Prophetic beacon & dark accent',
              desc: 'Celestial dawn, prophetic light, high-contrast callouts, and dark mode accent.',
              textLight: false,
            },
            {
              name: 'Cream Warm',
              hex: '#FEF3C7',
              role: 'Tactile parchment & dark mode ink',
              desc: 'Natural unbleached linen, warm scripture contrast, and primary dark mode ink.',
              textLight: false,
            },
          ].map((c) => (
            <div
              key={c.name}
              className="rounded-card border border-border p-4 shadow-raised flex flex-col justify-between gap-4"
              style={{ backgroundColor: c.hex, color: c.textLight ? '#FEF3C7' : '#1A1612' }}
            >
              <div>
                <span className="text-[12px] font-mono font-semibold opacity-85 block">
                  {c.hex}
                </span>
                <h3 className="font-display text-xl font-semibold leading-snug mt-1">{c.name}</h3>
                <span className="text-[13px] font-medium opacity-90 block mt-0.5">{c.role}</span>
              </div>
              <p className="text-[13px] opacity-80 leading-relaxed pt-2 border-t border-current/20">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. TERRACOTTA ROLES */}
      <section className="flex flex-col gap-4">
        <div>
          {/* Eyebrow <= 2 words: 12px uppercase with 0.08em tracking */}
          <span className="text-[12px] font-mono font-semibold text-accent uppercase tracking-[0.08em] block">
            Katondo clay
          </span>
          <h2 className="font-display text-2xl font-semibold leading-tight text-ink mt-0.5">
            Terracotta in Its Real Roles
          </h2>
          <p className="text-[13.5px] text-ink-muted">
            Replacing generic SaaS blues with Malawian burnt sienna brick &amp; fertile Katondo loam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-card bg-[#C85A32] text-white shadow-raised flex flex-col justify-between gap-3">
            <div>
              <span className="text-[12px] font-mono font-medium text-amber-200 block">
                Role A · Primary action (#C85A32)
              </span>
              <h3 className="font-display text-lg font-semibold leading-snug mt-1">Light Mode Primary CTA</h3>
              <p className="text-[13px] text-amber-50 mt-1 leading-relaxed">
                Provides grounded, warm tactile authority on buttons and primary navigation, avoiding corporate blue.
              </p>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-control bg-white text-[#933113] hover:bg-amber-50 font-semibold text-[13.5px] normal-case self-start shadow-flat transition-colors cursor-pointer"
            >
              Sample primary action →
            </button>
          </div>

          <div className="p-5 rounded-card bg-[#DC5C23] text-white shadow-raised flex flex-col justify-between gap-3">
            <div>
              <span className="text-[12px] font-mono font-medium text-amber-200 block">
                Role B · Season &amp; harvest (#DC5C23)
              </span>
              <h3 className="font-display text-lg font-semibold leading-snug mt-1">Almanac &amp; Harvest Highlight</h3>
              <p className="text-[13px] text-amber-50 mt-1 leading-relaxed">
                Marks high-priority seasonal planting windows, crop maturity deadlines, and food storage thresholds.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control bg-black/25 text-amber-100 font-mono text-[12px] normal-case">
              <Sprout size={13} />
              <span>Planting window active (Nov – Mar)</span>
            </div>
          </div>

          <div className="p-5 rounded-card bg-[#933113] text-white shadow-raised flex flex-col justify-between gap-3">
            <div>
              <span className="text-[12px] font-mono font-medium text-amber-200 block">
                Role C · Warning-adjacent (#933113)
              </span>
              <h3 className="font-display text-lg font-semibold leading-snug mt-1">Destructive &amp; Deficit Warnings</h3>
              <p className="text-[13px] text-amber-50 mt-1 leading-relaxed">
                Organic earthen alert for aquifer drop, dry-season water deficit, or customary tenure boundary risks.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control bg-black/25 text-amber-200 font-mono text-[12px] normal-case">
              <Flame size={13} />
              <span>Water deficit alert (&lt; 2 months reserve)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEMANTIC TOKENS MATRIX (LIGHT VS DARK) */}
      <section className="flex flex-col gap-4">
        <div>
          {/* Eyebrow <= 2 words: 12px uppercase with 0.08em tracking */}
          <span className="text-[12px] font-mono font-semibold text-accent uppercase tracking-[0.08em] block">
            Semantic tokens
          </span>
          <h2 className="font-display text-2xl font-semibold leading-tight text-ink mt-0.5">
            Semantic Tokens: Light vs. Dark
          </h2>
          <p className="text-[13.5px] text-ink-muted">
            Strictly defined tokens replacing ad-hoc slate, sky, and rose utilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Light Mode Column */}
          <div className="p-5 rounded-card bg-[#FAF6F0] text-[#1A1612] border border-[#E3D8CC] shadow-raised flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3D8CC]">
              <div className="flex items-center gap-2">
                <Sun size={16} className="text-amber-600" />
                <h3 className="font-display text-lg font-semibold">Light Mode Tokens</h3>
              </div>
              <span className="text-[12px] font-mono font-medium text-[#6E6255]">Warm ivory base (#FAF6F0)</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {[
                { token: 'surface', hex: '#FAF6F0', bg: '#FAF6F0', fg: '#1A1612', note: 'Organic canvas background' },
                { token: 'surface-raised', hex: '#FFFFFF', bg: '#FFFFFF', fg: '#1A1612', note: 'Card surfaces & modals' },
                { token: 'surface-muted', hex: '#F3ECE2', bg: '#F3ECE2', fg: '#1A1612', note: 'Soft warm earth sub-surface' },
                { token: 'ink', hex: '#1A1612', bg: '#1A1612', fg: '#FAF6F0', note: 'Deep warm espresso bistre' },
                { token: 'ink-muted', hex: '#6E6255', bg: '#6E6255', fg: '#FFFFFF', note: 'Warm umber secondary copy' },
                { token: 'border', hex: '#E3D8CC', bg: '#E3D8CC', fg: '#1A1612', note: 'Hairline structural borders' },
                { token: 'accent', hex: '#C85A32', bg: '#C85A32', fg: '#FFFFFF', note: 'Katondo Terracotta primary CTA' },
                { token: 'accent-ink', hex: '#FFFFFF', bg: '#FFFFFF', fg: '#C85A32', note: 'Crisp white on terracotta' },
                { token: 'success', hex: '#166534', bg: '#166534', fg: '#FFFFFF', note: 'Verified protocol & water safety' },
                { token: 'warning', hex: '#D97706', bg: '#D97706', fg: '#FFFFFF', note: 'Seasonal alerts & dry watch' },
                { token: 'danger', hex: '#B91C1C', bg: '#B91C1C', fg: '#FFFFFF', note: 'Critical water / title hazard' },
                { token: 'info', hex: '#0E7490', bg: '#0E7490', fg: '#FFFFFF', note: 'Aquifer hydro-GIS & telemetry' },
              ].map((item) => (
                <div key={item.token} className="p-2.5 rounded-control border border-[#E3D8CC] bg-white flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-black/10"
                      style={{ backgroundColor: item.bg }}
                    />
                    <div className="truncate">
                      <span className="font-mono font-semibold text-[13px] block truncate">{item.token}</span>
                      <span className="text-[12px] text-[#6E6255] truncate block">{item.note}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[12px] text-[#6E6255] shrink-0">{item.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dark Mode Column */}
          <div className="p-5 rounded-card bg-[#071A10] text-[#FEF3C7] border border-amber-500/25 shadow-raised flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <Moon size={16} className="text-amber-400" />
                <h3 className="font-display text-lg font-semibold text-white">Dark Mode Tokens</h3>
              </div>
              <span className="text-[12px] font-mono font-medium text-amber-300">Deep moss base (#071A10)</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {[
                { token: 'surface', hex: '#071A10', bg: '#071A10', fg: '#FEF3C7', note: 'Deep moss brand sanctuary' },
                { token: 'surface-raised', hex: '#0D2818', bg: '#0D2818', fg: '#FEF3C7', note: 'Forest green container depth' },
                { token: 'surface-muted', hex: '#05140C', bg: '#05140C', fg: '#FEF3C7', note: 'Deepest forest underlay' },
                { token: 'ink', hex: '#FEF3C7', bg: '#FEF3C7', fg: '#071A10', note: 'Celestial cream primary ink' },
                { token: 'ink-muted', hex: '#A89F91', bg: '#A89F91', fg: '#071A10', note: 'Warm earth secondary copy' },
                { token: 'border', hex: 'rgba(245,158,11,0.22)', bg: 'rgba(245, 158, 11, 0.22)', fg: '#FEF3C7', note: 'Gold-tinted hairline borders' },
                { token: 'accent', hex: '#F59E0B', bg: '#F59E0B', fg: '#071A10', note: 'Celestial gold spark highlight' },
                { token: 'accent-ink', hex: '#071A10', bg: '#071A10', fg: '#F59E0B', note: 'Deep moss ink on gold' },
                { token: 'success', hex: '#4ADE80', bg: '#4ADE80', fg: '#071A10', note: 'Luminous emerald sprout' },
                { token: 'warning', hex: '#FBBF24', bg: '#FBBF24', fg: '#071A10', note: 'Golden dawn alert' },
                { token: 'danger', hex: '#F87171', bg: '#F87171', fg: '#071A10', note: 'Warm coral danger alert' },
                { token: 'info', hex: '#38BDF8', bg: '#38BDF8', fg: '#071A10', note: 'Lake cyan hydro-telemetry' },
              ].map((item) => (
                <div key={item.token} className="p-2.5 rounded-control border border-white/10 bg-[#0D2818] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-5 h-5 rounded-full shrink-0 border border-white/20"
                      style={{ backgroundColor: item.bg }}
                    />
                    <div className="truncate">
                      <span className="font-mono font-semibold text-[13px] block truncate text-white">{item.token}</span>
                      <span className="text-[12px] text-ink-muted truncate block">{item.note}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[12px] text-amber-300 shrink-0">{item.hex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. WARMED EARTH NEUTRALS (REPLACING COLD SLATE/STONE) */}
      <section className="flex flex-col gap-4">
        <div>
          {/* Eyebrow <= 2 words: 12px uppercase with 0.08em tracking */}
          <span className="text-[12px] font-mono font-semibold text-accent uppercase tracking-[0.08em] block">
            Warmed neutrals
          </span>
          <h2 className="font-display text-2xl font-semibold leading-tight text-ink mt-0.5">
            Warmed Earth Neutrals
          </h2>
          <p className="text-[13.5px] text-ink-muted">
            Replacing sterile cool slate grey with Katondo clay, dambo silt, and weathered sandstone tones.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-2">
          {[
            { step: 'earth-50', hex: '#FDFCFA', desc: 'Canvas highlight' },
            { step: 'earth-100', hex: '#F5F2ED', desc: 'Soft sand' },
            { step: 'earth-200', hex: '#E7E0D5', desc: 'Border hairline' },
            { step: 'earth-300', hex: '#D3C7B5', desc: 'Muted divider' },
            { step: 'earth-400', hex: '#B9A78E', desc: 'Secondary subdued' },
            { step: 'earth-500', hex: '#A18B6E', desc: 'Mid ochre' },
            { step: 'earth-600', hex: '#826E56', desc: 'Timber brown' },
            { step: 'earth-700', hex: '#6A5A47', desc: 'Deep umber' },
            { step: 'earth-800', hex: '#55483A', desc: 'Earthen bark' },
            { step: 'earth-900', hex: '#2C241D', desc: 'Charcoal soil' },
            { step: 'earth-950', hex: '#071A10', desc: 'Deep moss base' },
          ].map((e, idx) => (
            <div
              key={e.step}
              className="p-3 rounded-control border border-border flex flex-col justify-between gap-3 text-xs"
              style={{
                backgroundColor: e.hex,
                color: idx > 5 ? '#FEF3C7' : '#1A1612',
              }}
            >
              <span className="font-mono font-semibold text-[12px]">{e.step.replace('earth-', '')}</span>
              <div>
                <span className="font-mono text-[12px] block font-medium">{e.hex}</span>
                <span className="text-[12px] opacity-80 block truncate normal-case">{e.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STRICT TYPE SCALE SPECIMEN */}
      <section className="flex flex-col gap-4">
        <div>
          {/* Eyebrow <= 2 words: 12px uppercase with 0.08em tracking */}
          <span className="text-[12px] font-mono font-semibold text-accent uppercase tracking-[0.08em] block">
            Type system
          </span>
          <h2 className="font-display text-2xl font-semibold leading-tight text-ink mt-0.5">
            Type System &amp; Heading Hierarchy
          </h2>
          <p className="text-[13.5px] text-ink-muted">
            Strict 12px readability floor, Plus Jakarta Sans 16px body, Fraunces 600 tight leading headings, 13–14px sentence case labels.
          </p>
        </div>

        <div className="p-6 rounded-card border border-border bg-surface-raised shadow-raised flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-border">
            {/* Body Steps */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[12px] font-semibold text-accent normal-case">
                Body &amp; label scale (Plus Jakarta Sans 16px body, 13–14px labels, 12px floor)
              </span>

              <div className="flex flex-col gap-3">
                <div className="p-3 rounded-control bg-surface-muted border border-border">
                  <div className="flex justify-between items-center text-xs font-mono text-ink-muted mb-1">
                    <span>--text-caption (12px / line-height 1.4)</span>
                    <span>Strict floor</span>
                  </div>
                  <p className="text-[12px] text-ink font-medium leading-[1.4]">
                    Telemetry readouts, district tags, metadata badges, and form field hints.
                  </p>
                </div>

                <div className="p-3 rounded-control bg-surface-muted border border-border">
                  <div className="flex justify-between items-center text-xs font-mono text-ink-muted mb-1">
                    <span>--text-small (13.5px / line-height 1.45)</span>
                    <span>Labels (sentence case)</span>
                  </div>
                  <p className="text-[13.5px] text-ink font-medium leading-[1.45]">
                    UI form labels, table cells, auxiliary notes, and dense spec sheets in sentence case.
                  </p>
                </div>

                <div className="p-3 rounded-control bg-surface-muted border border-border">
                  <div className="flex justify-between items-center text-xs font-mono text-ink-muted mb-1">
                    <span>--text-body (16px / line-height 1.6)</span>
                    <span>Primary body</span>
                  </div>
                  <p className="text-[16px] text-ink leading-[1.6]">
                    Primary body text for general paragraphs, list items, card intros, and dialogue counsel.
                  </p>
                </div>

                <div className="p-3 rounded-control bg-surface-muted border border-border">
                  <div className="flex justify-between items-center text-xs font-mono text-ink-muted mb-1">
                    <span>Eyebrow rule comparison (12px)</span>
                    <span>Conditional casing</span>
                  </div>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-mono font-semibold uppercase tracking-[0.08em] text-accent bg-accent/10 px-2 py-0.5 rounded">
                        Sanctuary blueprint
                      </span>
                      <span className="text-[12px] text-ink-muted">≤ 2 words (all-caps allowed with 0.08em tracking)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-mono font-semibold normal-case tracking-normal text-ink bg-surface px-2 py-0.5 rounded border border-border">
                        Comprehensive agronomy manual for Malawi
                      </span>
                      <span className="text-[12px] text-ink-muted">&gt; 2 words (strictly sentence case)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Heading Steps */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[12px] font-semibold text-accent normal-case">
                Heading hierarchy (Fraunces weight 600, tight leading)
              </span>

              <div className="flex flex-col gap-3">
                <div className="p-3 rounded-control bg-surface-muted border border-border">
                  <span className="text-xs font-mono text-ink-muted block mb-0.5">--text-h4 (20px / weight 600)</span>
                  <h4 className="text-[20px] font-display font-semibold leading-[1.25] text-ink">
                    H4: Agricultural guilds &amp; gravity ram pumps
                  </h4>
                </div>

                <div className="p-3 rounded-control bg-surface-muted border border-border">
                  <span className="text-xs font-mono text-ink-muted block mb-0.5">--text-h3 (24px / weight 600)</span>
                  <h3 className="text-[24px] font-display font-semibold leading-[1.22] text-ink">
                    H3: The four pillars of sanctuary living
                  </h3>
                </div>

                <div className="p-3 rounded-control bg-surface-muted border border-border">
                  <span className="text-xs font-mono text-ink-muted block mb-0.5">--text-h2 (28px / weight 600, tight leading)</span>
                  <h2 className="text-[28px] font-display font-semibold leading-[1.18] text-ink">
                    H2: 28 districts agro-ecological matrix
                  </h2>
                </div>

                <div className="p-3 rounded-control bg-surface-muted border border-border">
                  <span className="text-xs font-mono text-ink-muted block mb-0.5">--text-h1 (36px / weight 600, tight leading)</span>
                  <h1 className="text-[36px] font-display font-semibold leading-[1.14] text-ink">
                    H1: Outpost home
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LIVING INTERFACE SPECIMEN */}
      <section className="flex flex-col gap-4">
        <div>
          {/* Eyebrow <= 2 words: 12px uppercase with 0.08em tracking */}
          <span className="text-[12px] font-mono font-semibold text-accent uppercase tracking-[0.08em] block">
            Living specimen
          </span>
          <h2 className="font-display text-2xl font-semibold leading-tight text-ink mt-0.5">
            Living UI Specimen
          </h2>
          <p className="text-[13.5px] text-ink-muted">
            Preview of buttons, alerts, and cards running entirely on semantic tokens in light and dark modes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card with Terracotta Primary Action */}
          <div className="p-6 rounded-card border border-border bg-surface-raised shadow-raised flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-ink-muted pb-2 border-b border-border">
                <span>Customary Land Act · Section 24</span>
                <span className="text-success font-semibold inline-flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>Title verified</span>
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold leading-tight text-ink mt-2">
                Dedza Highland Homestead Plot
              </h3>
              <p className="text-base text-ink-muted mt-2 leading-relaxed">
                Elevated parcel with perennial dambo gravity spring, red Katondo clay loam, and customary council clearance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                className="px-5 py-2.5 rounded-control bg-accent text-accent-ink hover:bg-accent-hover text-[13.5px] font-semibold normal-case inline-flex items-center gap-1.5 shadow-raised transition-all cursor-pointer"
              >
                <span>Primary action</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                className="px-4 py-2.5 rounded-control border border-border bg-surface hover:bg-surface-muted text-ink font-medium text-[13.5px] normal-case transition-colors cursor-pointer"
              >
                Secondary action
              </button>
            </div>
          </div>

          {/* Feedback & Alert Tokens (Replaced slate/sky/rose with semantic tokens) */}
          <div className="p-6 rounded-card border border-border bg-surface-raised shadow-raised flex flex-col gap-3">
            <h4 className="font-display text-lg font-semibold text-ink mb-1">
              Semantic Alerts &amp; Status Banners
            </h4>

            <div className="p-3 rounded-control bg-success/10 border border-success/30 flex items-start gap-2.5 text-[13px] text-success">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-success" />
              <div>
                <strong className="font-semibold">Success token:</strong> Aquifer confirmed at 14m depth with perennial recharge.
              </div>
            </div>

            <div className="p-3 rounded-control bg-warning/10 border border-warning/30 flex items-start gap-2.5 text-[13px] text-warning">
              <AlertTriangle size={16} className="shrink-0 mt-0.5 text-warning" />
              <div>
                <strong className="font-semibold">Warning token:</strong> Dry-season rainfall transition approaching in 14 days.
              </div>
            </div>

            <div className="p-3 rounded-control bg-danger/10 border border-danger/30 flex items-start gap-2.5 text-[13px] text-danger">
              <AlertOctagon size={16} className="shrink-0 mt-0.5 text-danger" />
              <div>
                <strong className="font-semibold">Danger token:</strong> Unverified customary chief agreement without DLO registration.
              </div>
            </div>

            <div className="p-3 rounded-control bg-info/10 border border-info/30 flex items-start gap-2.5 text-[13px] text-info">
              <Info size={16} className="shrink-0 mt-0.5 text-info" />
              <div>
                <strong className="font-semibold">Info token:</strong> FAO HWSD v2.0 Ferralsol profile available for inspection.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ENHANCED ILLUSTRATIONS & BEFORE/AFTER SCREENSHOTS */}
      <section className="flex flex-col gap-6 pt-4 border-t border-border">
        <div>
          {/* Eyebrow <= 2 words: 12px uppercase with 0.08em tracking */}
          <span className="text-[12px] font-mono font-semibold text-accent uppercase tracking-[0.08em] block">
            Visual evidence
          </span>
          <h2 className="font-display text-2xl font-semibold leading-tight text-ink mt-0.5">
            Enhanced Illustrations &amp; Viewport Audits
          </h2>
          <p className="text-[13.5px] text-ink-muted">
            Verification of botanical field manual artwork and side-by-side Before/After viewport audits at 360px and 1280px.
          </p>
        </div>

        {/* Enhanced Botanical Sanctuary Illustration */}
        <div className="p-6 rounded-card border border-border bg-surface-raised shadow-raised flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[12px] font-mono font-semibold text-accent normal-case block">
                Botanical permaculture manual
              </span>
              <h3 className="font-display text-xl font-semibold leading-tight text-ink mt-0.5">
                Off-Grid Sanctuary Homestead in Malawi
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-control bg-surface-muted text-ink-muted text-xs font-mono font-medium normal-case">
              Enhanced artwork
            </span>
          </div>
          <div className="relative overflow-hidden rounded-control border border-border">
            <img
              src={malawiOutpostBotanical}
              alt="Editorial botanical illustration of Malawian country living homestead"
              className="w-full h-auto object-cover max-h-[480px]"
            />
          </div>
          <p className="text-[13px] text-ink-muted">
            Editorial field manual illustration highlighting solar PV arrays, Katondo clay rainwater cisterns, and deep Edenic permaculture planting beds.
          </p>
        </div>

        {/* Before/After Viewports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 360px Mobile Comparison */}
          <div className="p-6 rounded-card border border-border bg-surface-raised shadow-raised flex flex-col gap-4">
            <div>
              <span className="text-[12px] font-mono font-semibold text-accent uppercase tracking-[0.08em] block">
                Mobile viewport
              </span>
              <h3 className="font-display text-lg font-semibold leading-tight text-ink mt-0.5">
                360px Mobile: Before vs. After
              </h3>
              <p className="text-[13px] text-ink-muted mt-0.5">
                Single primary button per viewport, 16px mobile card padding, and 12px+ caption floor.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-mono font-semibold text-danger normal-case">Before (cluttered)</span>
                <div className="rounded-control overflow-hidden border border-border shadow-flat">
                  <img src={homeBefore360} alt="Legacy 360px mobile view before cleanup" className="w-full h-auto object-cover" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-mono font-semibold text-success normal-case">After (restructured)</span>
                <div className="rounded-control overflow-hidden border border-border shadow-flat">
                  <img src={homeRedesign360} alt="Restructured 360px mobile view with clear hierarchy" className="w-full h-auto object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* 1280px Desktop Comparison */}
          <div className="p-6 rounded-card border border-border bg-surface-raised shadow-raised flex flex-col gap-4">
            <div>
              <span className="text-[12px] font-mono font-semibold text-accent uppercase tracking-[0.08em] block">
                Desktop viewport
              </span>
              <h3 className="font-display text-lg font-semibold leading-tight text-ink mt-0.5">
                1280px Desktop: Before vs. After
              </h3>
              <p className="text-[13px] text-ink-muted mt-0.5">
                One H1 per screen, 2-column gateway grid, 24px desktop card padding, warm-tinted shadows.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-mono font-semibold text-danger normal-case">Before (legacy cluttered view)</span>
                <div className="rounded-control overflow-hidden border border-border shadow-flat">
                  <img src={homeBefore1280} alt="Legacy 1280px desktop view before cleanup" className="w-full h-auto object-cover max-h-[220px]" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-mono font-semibold text-success normal-case">After (streamlined modular architecture)</span>
                <div className="rounded-control overflow-hidden border border-border shadow-flat">
                  <img src={homeRedesign1280} alt="Restructured 1280px desktop view with 2-column grid and single H1" className="w-full h-auto object-cover max-h-[220px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RESPONSIVE AUDIT AT 360px, 768px, AND 1280px */}
      <section className="flex flex-col gap-6 pt-4 border-t border-border">
        <div>
          <span className="text-[12px] font-mono font-semibold text-accent uppercase tracking-[0.08em] block">
            Responsive audit
          </span>
          <h2 className="font-display text-2xl font-semibold leading-tight text-ink mt-0.5">
            Cross-Viewport Responsive Audit: 360px · 768px · 1280px
          </h2>
          <p className="text-[13.5px] text-ink-muted">
            Responsive matrix across Home, GIS Map, Sanitarium, and Settings verifying zero horizontal overflow, no clipping, and strictly ≥ 44px touch targets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              screen: 'Sanctuary Home',
              viewports: [
                { vp: '360px', status: 'PASS', notes: 'Bottom tab bar (Home · Map · Plan · Learn · More), hero cards stacked vertically, single primary CTA.' },
                { vp: '768px', status: 'PASS', notes: '2-column bento, top tab strip preserved, comfortable spacing.' },
                { vp: '1280px', status: 'PASS', notes: '12-col desktop hero grid, full window chrome, 24px container padding.' },
              ],
            },
            {
              screen: 'GIS Scout Map',
              viewports: [
                { vp: '360px', status: 'PASS', notes: 'Layer panel becomes bottom sheet with spring handle; floating trigger pill (≥ 44px); overflow tool capsule.' },
                { vp: '768px', status: 'PASS', notes: 'Floating left rail with collapsible tabs, touch-friendly station chips.' },
                { vp: '1280px', status: 'PASS', notes: 'Full canvas with consolidated header island and telemetry drawers.' },
              ],
            },
            {
              screen: 'Sanitarium & Remedies',
              viewports: [
                { vp: '360px', status: 'PASS', notes: 'Horizontal sub-nav with fade masks (never wraps); persistent calm medical disclaimer; Vitality counter removed.' },
                { vp: '768px', status: 'PASS', notes: '2-column NEWSTART cards, 44px min tap targets on check pills.' },
                { vp: '1280px', status: 'PASS', notes: 'Full apothecary tables with hydrotherapy diagrams and dosage calculators.' },
              ],
            },
            {
              screen: 'Workstation Settings',
              viewports: [
                { vp: '360px', status: 'PASS', notes: 'Desktop Edition badge hidden on mobile; 44px close button; single-column theme cards.' },
                { vp: '768px', status: 'PASS', notes: 'Left rail tabs (min-h 44px); live mode preview canvas.' },
                { vp: '1280px', status: 'PASS', notes: 'Split 2-pane modal with full district offline vault and typography inspector.' },
              ],
            },
          ].map((audit) => (
            <div key={audit.screen} className="p-5 rounded-card border border-border bg-surface-raised shadow-raised flex flex-col justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">{audit.screen}</h3>
                <div className="flex flex-col gap-3 mt-3">
                  {audit.viewports.map((v) => (
                    <div key={v.vp} className="flex flex-col gap-1 pb-2 border-b border-border/60 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-ink">{v.vp}</span>
                        <span className="px-2 py-0.5 rounded bg-success/15 text-success font-bold text-[11px]">
                          {v.status}
                        </span>
                      </div>
                      <p className="text-[12.5px] text-ink-muted leading-relaxed">
                        {v.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-border text-[12px] font-mono text-ink-muted flex items-center justify-between">
                <span>Touch targets:</span>
                <span className="text-success font-semibold">≥ 44px verified</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
