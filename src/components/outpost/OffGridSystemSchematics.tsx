import React from 'react';
import { COUNTRY_IMAGES } from '@/assets/images';
import { Layers, Zap, Droplets, Sun, ShieldCheck } from 'lucide-react';

interface OffGridSystemSchematicsProps {
  activeTab: 'gravity' | 'rainwater' | 'solar-pump' | 'solar-power';
  gravity: {
    headMeters: number;
    pipeDiameterMm: number;
    pipeLengthMeters: number;
    staticBar: string;
    staticPsi: string;
    qLpm: number;
  };
  rainwater: {
    roofAreaM2: number;
    annualRainfallMm: number;
    totalHarvestableLiters: string;
    recommendedStorageLiters: string;
    tanksCount5000L: number;
  };
  solarPump: {
    boreholeDepthMeters: number;
    dailyWaterLiters: number;
    recommendedPvWatts: number;
    panelCount380W: number;
    hourlyM3: number;
    electricalWatts: number;
  };
  solarPower: {
    lampCount: number;
    fridgeHours: number;
    laptopHours: number;
    batteryVoltage: 12 | 24 | 48;
    batteryType: 'Lithium' | 'LeadAcid';
    totalDailyWh: number;
    requiredAh: number;
    pvWattsNeeded: number;
    pvPanelsCount400W: number;
    inverterRatingWatts: number;
  };
}

export function OffGridSystemSchematics({
  activeTab,
  gravity,
  rainwater,
  solarPump,
  solarPower,
}: OffGridSystemSchematicsProps) {
  const readyImageMap = {
    gravity: {
      src: COUNTRY_IMAGES.mountainVista,
      caption: 'Highland Perennial Spring Gravity Catchment (Zomba / Mulanje / Viphya)',
      badge: 'Zero-Pump Gravity Head',
    },
    rainwater: {
      src: COUNTRY_IMAGES.offgridHomesteadWater,
      caption: 'Corrugated Roof Catchment & Cistern Storage Array',
      badge: '180-Day Dry Season Reserve',
    },
    'solar-pump': {
      src: COUNTRY_IMAGES.homesteadHighlands,
      caption: 'Direct-DC Submersible Solar Borehole & Elevated Header Tank',
      badge: 'Battery-Free Solar Lift',
    },
    'solar-power': {
      src: COUNTRY_IMAGES.malawiHomesteadSanctuary,
      caption: 'Off-Grid Homestead PV Array, MPPT Charge Bus & LiFePO4 Storage',
      badge: '24/7 Sanctuary Power',
    },
  }[activeTab];

  return (
    <div className="rounded-2xl bg-[#08150E] border border-emerald-900/70 p-4 sm:p-6 text-white flex flex-col gap-4 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={13} />
            <span>Live Vector Engineering Schematic</span>
          </span>
          <span className="text-xs text-emerald-200/80 font-mono hidden sm:inline">
            • Updates dynamically as you adjust sliders above
          </span>
        </div>
        <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
          {readyImageMap.badge}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: Ready Visual Context Card (4 cols) */}
        <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border border-emerald-800/60 bg-stone-950 h-52 sm:h-60 group">
          <img
            src={readyImageMap.src}
            alt={readyImageMap.caption}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
              Field Reference Visual
            </span>
            <p className="text-xs sm:text-sm font-bold text-white leading-snug">
              {readyImageMap.caption}
            </p>
          </div>
        </div>

        {/* Right: Reactive Vector Engineering Diagram (8 cols) */}
        <div className="lg:col-span-8 bg-[#05100A] rounded-2xl p-3 sm:p-4 border border-emerald-900/80 flex items-center justify-center">
          {activeTab === 'gravity' && (
            <svg
              viewBox="0 0 640 240"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Gravity water pipeline elevation profile schematic"
            >
              <rect x="0" y="0" width="640" height="240" rx="10" fill="#07170F" />
              {/* Mountain Slope Profile */}
              <polygon points="20,45 160,45 520,185 620,185 620,225 20,225" fill="#122B1D" stroke="#10B981" strokeWidth="1.5" />

              {/* Spring Intake Box at Top */}
              <rect x="45" y="22" width="95" height="34" rx="6" fill="#0284C7" stroke="#BAE6FD" strokeWidth="2" />
              <text x="92" y="37" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">
                SPRING BOX
              </text>
              <text x="92" y="49" textAnchor="middle" fill="#E0F2FE" fontSize="9" fontFamily="monospace">
                +{gravity.headMeters}m Head
              </text>

              {/* HDPE Pipeline Along Slope */}
              <line x1="140" y1="42" x2="515" y2="180" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
              <line x1="140" y1="42" x2="515" y2="180" stroke="#E0F2FE" strokeWidth="2" strokeDasharray="8 6" />

              {/* Pipe Spec Callout */}
              <rect x="235" y="62" width="190" height="38" rx="6" fill="#0F172A" stroke="#38BDF8" />
              <text x="330" y="78" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="monospace">
                Ø {gravity.pipeDiameterMm}mm HDPE • {gravity.pipeLengthMeters}m Run
              </text>
              <text x="330" y="92" textAnchor="middle" fill="#CBD5E1" fontSize="9" fontFamily="monospace">
                Darcy-Weisbach Friction Line
              </text>

              {/* Vertical Elevation Drop Arrow */}
              <line x1="35" y1="62" x2="35" y2="182" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 3" />
              <text x="45" y="130" fill="#FBBF24" fontSize="11" fontWeight="bold" fontFamily="monospace">
                ↕ {gravity.headMeters}m Vertical Drop
              </text>

              {/* Homestead Delivery Tap & Pressure Gauge */}
              <rect x="495" y="132" width="125" height="58" rx="8" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
              <text x="557" y="150" textAnchor="middle" fill="#A7F3D0" fontSize="10" fontWeight="bold" fontFamily="monospace">
                HOMESTEAD TAP
              </text>
              <text x="557" y="166" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                {gravity.qLpm} L/min
              </text>
              <text x="557" y="181" textAnchor="middle" fill="#FDE047" fontSize="10" fontFamily="monospace">
                {gravity.staticBar} bar ({gravity.staticPsi} PSI)
              </text>
            </svg>
          )}

          {activeTab === 'rainwater' && (
            <svg
              viewBox="0 0 640 240"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Rainwater roof catchment and storage tank schematic"
            >
              <rect x="0" y="0" width="640" height="240" rx="10" fill="#07170F" />
              {/* Raindrops */}
              <text x="115" y="26" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="monospace">
                🌧️ {rainwater.annualRainfallMm} mm/yr District Rain
              </text>

              {/* Homestead Roof */}
              <polygon points="35,85 125,40 215,85" fill="#475569" stroke="#94A3B8" strokeWidth="2" />
              <rect x="50" y="85" width="150" height="95" fill="#1E293B" stroke="#64748B" />
              <text x="125" y="128" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="bold" fontFamily="monospace">
                {rainwater.roofAreaM2} m² Roof
              </text>
              <text x="125" y="145" textAnchor="middle" fill="#93C5FD" fontSize="10" fontFamily="monospace">
                Harvest: {rainwater.totalHarvestableLiters} L/yr
              </text>

              {/* Gutter & First-Flush Pipe */}
              <line x1="215" y1="85" x2="285" y2="85" stroke="#38BDF8" strokeWidth="5" />
              <rect x="272" y="85" width="24" height="95" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="284" cy="98" r="6" fill="#FACC15" />
              <text x="284" y="196" textAnchor="middle" fill="#FCD34D" fontSize="9" fontWeight="bold" fontFamily="monospace">
                20L First-Flush
              </text>

              {/* Feed Pipe to Cisterns */}
              <line x1="296" y1="95" x2="365" y2="95" stroke="#38BDF8" strokeWidth="5" />

              {/* Storage Cisterns Array */}
              <rect x="365" y="65" width="115" height="125" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
              <rect x="370" y="100" width="105" height="85" rx="6" fill="#0284C7" opacity="0.7" />
              <text x="422" y="135" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                {rainwater.tanksCount5000L} × 5,000L
              </text>
              <text x="422" y="152" textAnchor="middle" fill="#BAE6FD" fontSize="9" fontFamily="monospace">
                TANK BANK
              </text>

              {/* Output Summary Box */}
              <rect x="498" y="75" width="122" height="105" rx="8" fill="#0F172A" stroke="#38BDF8" />
              <text x="559" y="102" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="monospace">
                DRY-SEASON RESERVE
              </text>
              <text x="559" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace">
                {rainwater.recommendedStorageLiters} L
              </text>
              <text x="559" y="148" textAnchor="middle" fill="#A7F3D0" fontSize="9" fontFamily="monospace">
                180-Day Buffer
              </text>
            </svg>
          )}

          {activeTab === 'solar-pump' && (
            <svg
              viewBox="0 0 640 240"
              className="w-full h-auto select-none"
              role="img"
              aria-label="DC solar submersible borehole pump and elevated tank schematic"
            >
              <rect x="0" y="0" width="640" height="240" rx="10" fill="#07170F" />
              {/* Ground Line */}
              <line x1="20" y1="95" x2="620" y2="95" stroke="#A16207" strokeWidth="3" />

              {/* Solar PV Array on Left */}
              <polygon points="40,75 145,40 155,48 50,83" fill="#1D4ED8" stroke="#60A5FA" strokeWidth="2" />
              <line x1="95" y1="65" x2="95" y2="95" stroke="#94A3B8" strokeWidth="4" />
              <text x="100" y="28" textAnchor="middle" fill="#FDE047" fontSize="11" fontWeight="bold" fontFamily="monospace">
                ☀️ {solarPump.panelCount380W} × 380W Panels ({solarPump.recommendedPvWatts}W PV)
              </text>

              {/* Borehole Shaft & Submersible Pump */}
              <rect x="255" y="85" width="46" height="142" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
              <rect x="258" y="145" width="40" height="78" fill="#0369A1" opacity="0.55" />
              <rect x="268" y="175" width="20" height="36" rx="4" fill="#F59E0B" stroke="#FEF08A" strokeWidth="1.5" />
              <text x="195" y="192" textAnchor="end" fill="#FCD34D" fontSize="10" fontWeight="bold" fontFamily="monospace">
                {solarPump.electricalWatts}W DC Pump →
              </text>
              <text x="195" y="208" textAnchor="end" fill="#93C5FD" fontSize="10" fontFamily="monospace">
                Depth: -{solarPump.boreholeDepthMeters}m
              </text>

              {/* Rising Main Water Pipe to Header Tank */}
              <path d="M 278 175 L 278 65 L 470 65" stroke="#38BDF8" strokeWidth="5" fill="none" />

              {/* Elevated Gravity Header Tank */}
              <rect x="465" y="25" width="130" height="52" rx="6" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
              <line x1="485" y1="77" x2="485" y2="95" stroke="#94A3B8" strokeWidth="4" />
              <line x1="575" y1="77" x2="575" y2="95" stroke="#94A3B8" strokeWidth="4" />
              <text x="530" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="monospace">
                {solarPump.dailyWaterLiters.toLocaleString()} L/day
              </text>
              <text x="530" y="64" textAnchor="middle" fill="#A7F3D0" fontSize="10" fontFamily="monospace">
                Flow: {solarPump.hourlyM3} m³/hr
              </text>
            </svg>
          )}

          {activeTab === 'solar-power' && (
            <svg
              viewBox="0 0 640 240"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Off-grid solar PV, MPPT, battery bank, and inverter wiring diagram"
            >
              <rect x="0" y="0" width="640" height="240" rx="10" fill="#07170F" />

              {/* Node 1: Solar PV Array */}
              <rect x="20" y="55" width="130" height="125" rx="10" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
              <text x="85" y="85" textAnchor="middle" fill="#FDE047" fontSize="10" fontWeight="bold" fontFamily="monospace">
                1. SOLAR PV ARRAY
              </text>
              <text x="85" y="112" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="monospace">
                {solarPower.pvWattsNeeded} W
              </text>
              <text x="85" y="134" textAnchor="middle" fill="#FCD34D" fontSize="10" fontFamily="monospace">
                {solarPower.pvPanelsCount400W} × 400W Panels
              </text>
              <text x="85" y="156" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                MPPT Charge Input
              </text>

              {/* Wire 1 -> 2 */}
              <line x1="150" y1="118" x2="185" y2="118" stroke="#F59E0B" strokeWidth="4" />

              {/* Node 2: Battery Storage Bank */}
              <rect x="185" y="55" width="145" height="125" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
              <text x="257" y="85" textAnchor="middle" fill="#A7F3D0" fontSize="10" fontWeight="bold" fontFamily="monospace">
                2. {solarPower.batteryType.toUpperCase()} BANK
              </text>
              <text x="257" y="112" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="monospace">
                {solarPower.requiredAh} Ah @ {solarPower.batteryVoltage}V
              </text>
              <text x="257" y="134" textAnchor="middle" fill="#6EE7B7" fontSize="10" fontFamily="monospace">
                {solarPower.batteryType === 'Lithium' ? 'LiFePO4 (80% DoD)' : 'Deep Cycle (50% DoD)'}
              </text>
              <text x="257" y="156" textAnchor="middle" fill="#D1FAE5" fontSize="9" fontFamily="monospace">
                DC Bus Bar + Fuse
              </text>

              {/* Wire 2 -> 3 */}
              <line x1="330" y1="118" x2="365" y2="118" stroke="#10B981" strokeWidth="4" />

              {/* Node 3: Pure Sine Inverter */}
              <rect x="365" y="68" width="110" height="100" rx="10" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
              <text x="420" y="96" textAnchor="middle" fill="#7DD3FC" fontSize="10" fontWeight="bold" fontFamily="monospace">
                3. INVERTER
              </text>
              <text x="420" y="122" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold" fontFamily="monospace">
                {solarPower.inverterRatingWatts} W
              </text>
              <text x="420" y="144" textAnchor="middle" fill="#BAE6FD" fontSize="9" fontFamily="monospace">
                230V Pure Sine
              </text>

              {/* Wire 3 -> 4 */}
              <line x1="475" y1="118" x2="505" y2="118" stroke="#38BDF8" strokeWidth="4" />

              {/* Node 4: Homestead Loads */}
              <rect x="505" y="45" width="118" height="145" rx="10" fill="#0F172A" stroke="#A7F3D0" strokeWidth="1.5" />
              <text x="564" y="70" textAnchor="middle" fill="#A7F3D0" fontSize="10" fontWeight="bold" fontFamily="monospace">
                4. DAILY LOADS
              </text>
              <text x="564" y="94" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="monospace">
                {solarPower.totalDailyWh} Wh/d
              </text>
              <text x="564" y="118" textAnchor="middle" fill="#FDE68A" fontSize="9" fontFamily="monospace">
                • {solarPower.lampCount} LED Lights
              </text>
              <text x="564" y="136" textAnchor="middle" fill="#BAE6FD" fontSize="9" fontFamily="monospace">
                • Fridge: {solarPower.fridgeHours}h/d
              </text>
              <text x="564" y="154" textAnchor="middle" fill="#D1FAE5" fontSize="9" fontFamily="monospace">
                • Laptops: {solarPower.laptopHours}h/d
              </text>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
