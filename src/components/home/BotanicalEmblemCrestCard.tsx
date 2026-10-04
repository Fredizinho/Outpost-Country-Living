import React, { useId } from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export interface BotanicalEmblemCrestCardProps {
  className?: string;
  activeFilter?: 'water' | 'soil' | 'altitude' | 'settlement' | null;
  onFilterChange?: (filter: 'water' | 'soil' | 'altitude' | 'settlement' | null) => void;
}

export function BotanicalEmblemCrestCard({
  className,
}: BotanicalEmblemCrestCardProps) {
  const uid = useId().replace(/:/g, '');
  const { isSapphire } = useTheme();

  const openCitationsModal = () => {
    window.dispatchEvent(new CustomEvent('outpost:open-citations'));
  };

  const skyGradId = `crestSkyGrad-${uid}`;
  const sunGradId = `crestSun-${uid}`;
  const peakBackId = `crestPeakBack-${uid}`;
  const peakForeId = `crestPeakFore-${uid}`;
  const riverGradId = `crestRiver-${uid}`;

  return (
    <div
      className={cn(
        'relative rounded-3xl overflow-hidden transition-all duration-300',
        isSapphire ? 'glass-depth-blue-hero' : 'glass-depth-emerald-hero',
        'card-depth-lift w-full max-w-sm mx-auto flex flex-col text-stone-100 p-6 sm:p-7',
        className
      )}
    >
      {/* Ambient Specular Glow Orbs */}
      <div
        className={cn(
          'absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl pointer-events-none',
          isSapphire ? 'bg-sky-400/20' : 'bg-emerald-400/20'
        )}
      />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

      {/* Circular Crest: Mountain Peaks, Dawn Sun, Dove & Living Stream */}
      <div className="flex flex-col items-center text-center relative z-10">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
          <div
            className={cn(
              'absolute inset-0 rounded-full border pointer-events-none',
              isSapphire
                ? 'border-sky-400/35 shadow-[0_0_25px_rgba(56,189,248,0.2)]'
                : 'border-emerald-400/35 shadow-[0_0_25px_rgba(16,185,129,0.22)]'
            )}
          />
          <div
            className={cn(
              'relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border shadow-inner flex items-center justify-center',
              isSapphire
                ? 'bg-gradient-to-b from-[#08203E] via-[#051529] to-[#030D1A] border-sky-300/45'
                : 'bg-gradient-to-b from-[#0D2E1D] via-[#071D12] to-[#04110A] border-emerald-400/45'
            )}
          >
            <svg
              viewBox="0 0 120 120"
              className="w-full h-full object-cover"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id={skyGradId}
                  x1="60"
                  y1="0"
                  x2="60"
                  y2="80"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor={isSapphire ? '#0C3559' : '#143825'} />
                  <stop offset="50%" stopColor={isSapphire ? '#07223D' : '#0B2417'} />
                  <stop offset="100%" stopColor={isSapphire ? '#041224' : '#05130C'} />
                </linearGradient>

                <radialGradient
                  id={sunGradId}
                  cx="60"
                  cy="46"
                  r="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.92" />
                  <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.62" />
                  <stop
                    offset="70%"
                    stopColor={isSapphire ? '#38BDF8' : '#D97706'}
                    stopOpacity="0.22"
                  />
                  <stop
                    offset="100%"
                    stopColor={isSapphire ? '#0284C7' : '#D97706'}
                    stopOpacity="0"
                  />
                </radialGradient>

                <linearGradient
                  id={peakBackId}
                  x1="60"
                  y1="36"
                  x2="60"
                  y2="90"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop
                    offset="0%"
                    stopColor={isSapphire ? '#38BDF8' : '#10B981'}
                    stopOpacity="0.68"
                  />
                  <stop offset="60%" stopColor={isSapphire ? '#0369A1' : '#065F46'} />
                  <stop offset="100%" stopColor={isSapphire ? '#082F49' : '#022C22'} />
                </linearGradient>

                <linearGradient
                  id={peakForeId}
                  x1="60"
                  y1="52"
                  x2="60"
                  y2="105"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor={isSapphire ? '#0284C7' : '#059669'} />
                  <stop offset="60%" stopColor={isSapphire ? '#075985' : '#047857'} />
                  <stop offset="100%" stopColor={isSapphire ? '#0C4A6E' : '#064E3B'} />
                </linearGradient>

                <linearGradient
                  id={riverGradId}
                  x1="60"
                  y1="62"
                  x2="60"
                  y2="120"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#E0F2FE" />
                  <stop offset="30%" stopColor="#38BDF8" />
                  <stop offset="70%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#0369A1" />
                </linearGradient>
              </defs>

              <rect width="120" height="120" fill={`url(#${skyGradId})`} />
              <circle cx="60" cy="46" r="32" fill={`url(#${sunGradId})`} />

              <g stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" opacity="0.50">
                <line x1="60" y1="46" x2="60" y2="18" />
                <line x1="60" y1="46" x2="74" y2="22" />
                <line x1="60" y1="46" x2="86" y2="30" strokeDasharray="3 3" />
                <line x1="60" y1="46" x2="46" y2="22" />
                <line x1="60" y1="46" x2="34" y2="30" strokeDasharray="3 3" />
              </g>

              <circle cx="60" cy="46" r="10" fill="#F59E0B" />

              {/* Soaring Peace Dove */}
              <path
                d="M60 26 C57 23 53 22 49 23 C52 25 55 26 57 28 C55 29 52 30 50 31 C54 31 57 30 59 29 C59 31 58 33 57 35 C59 33 61 30 62 28 C63 28 65 29 66 28 C65 27 63 26 62 26 C62 24 61 22 60 26 Z"
                fill="#FFFFFF"
                opacity="0.94"
              />

              {/* Background Mountain Peaks (Mulanje Massif) */}
              <path
                d="M12 94 L36 58 L54 74 L60 64 L78 82 L96 62 L112 94 Z"
                fill={`url(#${peakBackId})`}
              />
              <path
                d="M36 58 L54 74 L60 64 L78 82 L96 62"
                stroke={isSapphire ? '#7DD3FC' : '#34D399'}
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* Foreground Mountain Peaks (Dedza & Shire Highlands) */}
              <path
                d="M0 105 L26 72 L46 88 L60 70 L82 92 L104 76 L120 105 Z"
                fill={`url(#${peakForeId})`}
              />
              <path
                d="M26 72 L46 88 L60 70 L82 92 L104 76"
                stroke={isSapphire ? '#BAE6FD' : '#6EE7B7'}
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Winding Living Water River */}
              <path
                d="M60 70 
                   C58 76, 56 82, 62 88 
                   C68 94, 58 102, 52 110 
                   C48 116, 50 120, 50 120 
                   L70 120 
                   C68 116, 68 112, 74 106 
                   C80 98, 72 92, 66 86 
                   C63 81, 64 74, 60 70 Z"
                fill={`url(#${riverGradId})`}
              />

              <path
                d="M58 84 Q62 82 66 84 M55 96 Q60 93 67 96 M52 108 Q60 105 70 108"
                stroke="#FFFFFF"
                strokeWidth="1.35"
                strokeLinecap="round"
                opacity="0.85"
              />

              <circle
                cx="60"
                cy="60"
                r="58"
                stroke={
                  isSapphire ? 'rgba(56, 189, 248, 0.45)' : 'rgba(52, 211, 153, 0.45)'
                }
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        <h2 className="font-display text-lg font-bold tracking-tight text-white mt-4">
          Peace in the Open Country
        </h2>
        <p className="text-xs text-stone-200 mt-1 leading-relaxed">
          Seventh-day Adventist Country Living &amp; Rural Outpost Guide for Malawi — where the Wi-Fi is optional, but a perennial spring is non-negotiable.
        </p>
      </div>

      {/* Quiet Institutional Provenance List */}
      <dl className="mt-5 pt-4 border-t border-white/12 flex flex-col gap-2.5 text-xs relative z-10">
        <div className="flex items-center justify-between text-stone-200">
          <dt className="text-stone-400">Climate &amp; Rain</dt>
          <dd className="font-mono text-white">DCCMS Malawi (28 Districts)</dd>
        </div>
        <div className="flex items-center justify-between text-stone-200">
          <dt className="text-stone-400">Soils &amp; Water</dt>
          <dd className="font-mono text-white">FAO HWSD v2.0 &amp; AQUASTAT</dd>
        </div>
        <div className="flex items-center justify-between text-stone-200">
          <dt className="text-stone-400">Land Tenure</dt>
          <dd className="font-mono text-white">Customary Land Act (2016)</dd>
        </div>
      </dl>

      <div className="mt-4 pt-3.5 border-t border-white/12 flex items-center justify-between text-xs relative z-10">
        <button
          type="button"
          onClick={openCitationsModal}
          className={cn(
            'inline-flex items-center gap-1.5 font-semibold hover:text-amber-300 transition-colors cursor-pointer',
            isSapphire ? 'text-sky-300' : 'text-emerald-300'
          )}
        >
          <ShieldCheck size={13} />
          <span>Inspect Verified Sources</span>
        </button>

        <a
          href="https://m.egwwritings.org/en/folders/2"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-stone-300 hover:text-white inline-flex items-center gap-1"
        >
          <span>EGW Archive</span>
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

export default BotanicalEmblemCrestCard;
