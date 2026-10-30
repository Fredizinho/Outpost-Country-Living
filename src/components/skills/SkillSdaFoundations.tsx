import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CountryIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

export function SkillSdaFoundations() {
  const [activeSdaTab, setActiveSdaTab] = useState<'education' | 'sustenance' | 'remedies'>('education');

  return (
    <section className="rounded-[var(--radius-card)] bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 shadow-xs text-[var(--ink)]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-1.5 text-[var(--accent)] text-[12px] font-sans font-semibold mb-1">
            <Sparkles size={13} />
            <span>Spirit of Prophecy Off-Grid Sustenance &amp; Education Blueprint</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--ink)]">
            SDA Off-Grid Sustenance &amp; True Education Curriculum
          </h2>
        </div>

        <div className="flex flex-wrap gap-1 bg-[var(--ground)] p-1 rounded-[var(--radius-control)] border border-[var(--border)]">
          <button
            type="button"
            onClick={() => setActiveSdaTab('education')}
            className={cn(
              'px-3 py-1.5 rounded-[calc(var(--radius-control)-2px)] text-[12px] font-sans font-medium transition-all cursor-pointer',
              activeSdaTab === 'education'
                ? 'bg-[var(--surface)] text-[var(--ink)] shadow-2xs font-semibold'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            )}
          >
            01. Head, Hand &amp; Heart Education
          </button>
          <button
            type="button"
            onClick={() => setActiveSdaTab('sustenance')}
            className={cn(
              'px-3 py-1.5 rounded-[calc(var(--radius-control)-2px)] text-[12px] font-sans font-medium transition-all cursor-pointer',
              activeSdaTab === 'sustenance'
                ? 'bg-[var(--surface)] text-[var(--ink)] shadow-2xs font-semibold'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            )}
          >
            02. Edenic Diet &amp; Sustenance
          </button>
          <button
            type="button"
            onClick={() => setActiveSdaTab('remedies')}
            className={cn(
              'px-3 py-1.5 rounded-[calc(var(--radius-control)-2px)] text-[12px] font-sans font-medium transition-all cursor-pointer',
              activeSdaTab === 'remedies'
                ? 'bg-[var(--surface)] text-[var(--ink)] shadow-2xs font-semibold'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
            )}
          >
            03. Hydrotherapy &amp; Remedies
          </button>
        </div>
      </div>

      {activeSdaTab === 'education' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[var(--ground)] rounded-[var(--radius-card)] p-5 border border-[var(--border)] flex flex-col justify-between gap-4">
            <div>
              <div className="w-full h-32 rounded-[var(--radius-control)] overflow-hidden border border-[var(--border)] mb-3.5 bg-emerald-950">
                <CountryIcon name="trueeducation" className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-sans text-[var(--accent)] font-semibold">
                Morning Sacred &amp; Scientific Block (08:00–11:30)
              </span>
              <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)] mt-1 mb-2">
                Bible, Physiology &amp; Farm Bookkeeping
              </h3>
              <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                Patterned after the Avondale blueprint (<em>Education</em>, p. 218; <em>6T</em> 179.2): morning mental hours are devoted to Scripture history, human physiology, practical geometry, and double-entry homestead accounting (&ldquo;owe no man anything&rdquo;).
              </p>
            </div>
            <Link
              to="/skills/sda-true-education-curriculum"
              className="inline-flex items-center gap-1.5 text-[13px] font-sans font-semibold text-[var(--accent)] hover:underline"
            >
              <span>Open Curriculum Protocol</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="bg-[var(--ground)] rounded-[var(--radius-card)] p-5 border border-[var(--border)] flex flex-col justify-between gap-4">
            <div>
              <div className="w-full h-32 rounded-[var(--radius-control)] overflow-hidden border border-[var(--border)] mb-3.5 bg-emerald-950">
                <CountryIcon name="soapmaking" className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-sans text-[var(--accent)] font-semibold">
                Afternoon Vocational Trades (13:30–16:30)
              </span>
              <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)] mt-1 mb-2">
                Agriculture, Carpentry, Tailoring &amp; Soap
              </h3>
              <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                Every son and daughter masters self-supporting trades: cultivating a personal 5m &times; 5m garden plot, grafting fruit trees, leaching hardwood ash for antiseptic potash soap, and sewing shoulder-supported garments on a foot-treadle machine.
              </p>
            </div>
            <Link
              to="/skills/wood-ash-soap-natural-fibers-tailoring"
              className="inline-flex items-center gap-1.5 text-[13px] font-sans font-semibold text-[var(--accent)] hover:underline"
            >
              <span>Open Domestic Trades Guide</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="bg-[var(--ground)] rounded-[var(--radius-card)] p-5 border border-[var(--border)] flex flex-col justify-between gap-4">
            <div>
              <div className="w-full h-32 rounded-[var(--radius-control)] overflow-hidden border border-[var(--border)] mb-3.5 bg-emerald-950">
                <CountryIcon name="thermalcooker" className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-sans text-[var(--accent)] font-semibold">
                Friday Preparation &amp; Sabbath Rhythm (6T 355.3)
              </span>
              <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)] mt-1 mb-2">
                Fireless Thermal Cookers &amp; Literature Work
              </h3>
              <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                Build insulated clay rocket stoves (75% firewood reduction) and sew 10cm rice-hull thermal cookers (Wonderbags) that keep Friday-boiled beans and whole grains piping hot (&gt;68&deg;C) through Sabbath afternoon without kindling a fire.
              </p>
            </div>
            <Link
              to="/skills/sabbath-sanctuary-fireless-thermal-cooking"
              className="inline-flex items-center gap-1.5 text-[13px] font-sans font-semibold text-[var(--accent)] hover:underline"
            >
              <span>Open Thermal Cooker Protocol</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}

      {activeSdaTab === 'sustenance' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[var(--ground)] rounded-[var(--radius-card)] p-5 border border-[var(--border)] flex flex-col justify-between gap-4">
            <div>
              <div className="w-full h-32 rounded-[var(--radius-control)] overflow-hidden border border-[var(--border)] mb-3.5 bg-emerald-950">
                <CountryIcon name="breadmaking" className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-sans text-[var(--accent)] font-semibold">
                The Ministry of Healing, pp. 300–302
              </span>
              <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)] mt-1 mb-2">
                Whole-Grain Milling, Sweet Yeast &amp; Zwieback
              </h3>
              <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                Mill whole wheat, red sorghum (mapira), and finger millet (mawere) fresh on baking day. Ferment with sweet potato-water yeast (zero baking soda/saleratus; zero sourness), bake in a clay cob oven, and twice-bake slices into shelf-stable Zwieback.
              </p>
            </div>
            <Link
              to="/skills/wholesome-breadmaking-grain-milling"
              className="inline-flex items-center gap-1.5 text-[13px] font-sans font-semibold text-[var(--accent)] hover:underline"
            >
              <span>Open Bread &amp; Zwieback Protocol</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="bg-[var(--ground)] rounded-[var(--radius-card)] p-5 border border-[var(--border)] flex flex-col justify-between gap-4">
            <div>
              <div className="w-full h-32 rounded-[var(--radius-control)] overflow-hidden border border-[var(--border)] mb-3.5 bg-emerald-950">
                <CountryIcon name="oilpress" className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-sans text-[var(--accent)] font-semibold">
                Counsels on Diet &amp; Foods, pp. 206, 351
              </span>
              <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)] mt-1 mb-2">
                Plant Milks, Tofu Curds &amp; Cold Oil Pressing
              </h3>
              <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                Replace disease-prone dairy and flesh meats with homestead soybean and groundnut milks, lemon-coagulated tofu curds (78&deg;C), 72-hour sprouted mung beans (+300% Vitamin C), and cold-pressed sunflower &amp; Moringa oils.
              </p>
            </div>
            <Link
              to="/skills/plant-protein-nut-milks-oil-pressing"
              className="inline-flex items-center gap-1.5 text-[13px] font-sans font-semibold text-[var(--accent)] hover:underline"
            >
              <span>Open Plant Sustenance Protocol</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="bg-[var(--ground)] rounded-[var(--radius-card)] p-5 border border-[var(--border)] flex flex-col justify-between gap-4">
            <div>
              <div className="w-full h-32 rounded-[var(--radius-control)] overflow-hidden border border-[var(--border)] mb-3.5 bg-emerald-950">
                <CountryIcon name="foodpreservation" className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-sans text-[var(--accent)] font-semibold">
                Year-Round Harvest Independence
              </span>
              <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)] mt-1 mb-2">
                Solar Dehydration &amp; Hermetic Grain Storage
              </h3>
              <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                Preserve seasonal surpluses of mangoes, bananas, tomatoes, and leafy greens in indirect solar air-heaters, while sealing dry maize, beans, and millet in triple-layer PICS bags with dried neem leaves.
              </p>
            </div>
            <Link
              to="/skills/solar-food-dehydration"
              className="inline-flex items-center gap-1.5 text-[13px] font-sans font-semibold text-[var(--accent)] hover:underline"
            >
              <span>Open Solar Preservation Guide</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}

      {activeSdaTab === 'remedies' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[var(--ground)] rounded-[var(--radius-card)] p-5 border border-[var(--border)] flex flex-col justify-between gap-4">
            <div>
              <div className="w-full h-32 rounded-[var(--radius-control)] overflow-hidden border border-[var(--border)] mb-3.5 bg-emerald-950">
                <CountryIcon name="hydrotherapy" className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-sans text-[var(--accent)] font-semibold">
                Selected Messages Book 2, p. 294 &middot; MH 237
              </span>
              <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)] mt-1 mb-2">
                Contrast Fomentations &amp; Hot Foot Baths
              </h3>
              <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                Master derivative hot foot baths (40&deg;C–43&deg;C) with cold forehead compresses to relieve internal brain and lung congestion, paired with 3 cycles of steaming wool fomentations and brisk cold friction rubs.
              </p>
            </div>
            <Link
              to="/skills/hydrotherapy-charcoal-poultice-remedies"
              className="inline-flex items-center gap-1.5 text-[13px] font-sans font-semibold text-[var(--accent)] hover:underline"
            >
              <span>Open Hydrotherapy Protocol</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="bg-[var(--ground)] rounded-[var(--radius-card)] p-5 border border-[var(--border)] flex flex-col justify-between gap-4">
            <div>
              <div className="w-full h-32 rounded-[var(--radius-control)] overflow-hidden border border-[var(--border)] mb-3.5 bg-emerald-950">
                <CountryIcon name="firstaid" className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-sans text-[var(--accent)] font-semibold">
                Adsorptive Antidote &amp; Poultice Therapy
              </span>
              <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)] mt-1 mb-2">
                Pulverized Hardwood Charcoal Poultices
              </h3>
              <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                Pyrolyze clean eucalyptus or peach wood in a sealed metal retort tin, grind to &lt;100 micron powder, and blend 1:1 with ground flaxseed or cassava meal to draw out venom, bacterial endotoxins, and severe inflammation.
              </p>
            </div>
            <Link
              to="/skills/hydrotherapy-charcoal-poultice-remedies"
              className="inline-flex items-center gap-1.5 text-[13px] font-sans font-semibold text-[var(--accent)] hover:underline"
            >
              <span>Open Charcoal Protocol</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="bg-[var(--ground)] rounded-[var(--radius-card)] p-5 border border-[var(--border)] flex flex-col justify-between gap-4">
            <div>
              <div className="w-full h-32 rounded-[var(--radius-control)] overflow-hidden border border-[var(--border)] mb-3.5 bg-emerald-950">
                <CountryIcon name="herbs" className="w-full h-full object-cover" />
              </div>
              <span className="text-[12px] font-sans text-[var(--accent)] font-semibold">
                Tropical Sanitation &amp; Fever Protocol
              </span>
              <h3 className="font-serif text-[18px] font-semibold text-[var(--ink)] mt-1 mb-2">
                Artemisia, Eucalyptus &amp; Garlic Infusions
              </h3>
              <p className="text-[13px] text-[var(--ink-muted)] leading-relaxed">
                Brew 5g of shade-dried <em>Artemisia annua</em> leaves in 1L of 85&deg;C water for seasonal fever defense, steam eucalyptus leaves for bronchial drainage, and utilize crushed raw garlic as a broad-spectrum natural antimicrobial.
              </p>
            </div>
            <Link
              to="/skills/herbal-apothecary-garden-first-aid"
              className="inline-flex items-center gap-1.5 text-[13px] font-sans font-semibold text-[var(--accent)] hover:underline"
            >
              <span>Open Natural Remedies Guide</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
