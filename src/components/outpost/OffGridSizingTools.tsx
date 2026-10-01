import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, Sun, Battery, Gauge, Zap, 
  RotateCcw, Info, CheckCircle2, ArrowRight, ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OffGridSystemSchematics } from './OffGridSystemSchematics';

export function OffGridSizingTools({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<'gravity' | 'rainwater' | 'solar-pump' | 'solar-power'>('gravity');

  // --------------------------------------------------------------------------
  // 1. Gravity Water Calculator State
  // --------------------------------------------------------------------------
  const [gravityHeadMeters, setGravityHeadMeters] = useState<number>(30); // 30m elevation drop
  const [gravityPipeDiameterMm, setGravityPipeDiameterMm] = useState<number>(25); // 25mm (1 inch) pipe
  const [gravityPipeLengthMeters, setGravityPipeLengthMeters] = useState<number>(200); // 200m distance

  const gravityResult = useMemo(() => {
    // 1 meter head ≈ 0.09806 bar ≈ 1.422 PSI (static)
    const staticBar = (gravityHeadMeters * 0.098).toFixed(2);
    const staticPsi = (gravityHeadMeters * 1.422).toFixed(1);

    // Simplified Darcy-Weisbach / Hazen-Williams estimation for HDPE plastic pipe (C=140)
    // Flow rate in L/min
    const d = gravityPipeDiameterMm / 1000; // in meters
    const h = gravityHeadMeters;
    const l = Math.max(10, gravityPipeLengthMeters);
    // Empirical flow approximation Q (m3/s) ≈ 0.2785 * C * D^2.63 * (H/L)^0.54
    const c = 140; // smooth HDPE
    const qM3s = 0.2785 * c * Math.pow(d, 2.63) * Math.pow(h / l, 0.54);
    const qLpm = Math.max(1, Math.round(qM3s * 60 * 1000));
    const qLph = qLpm * 60;

    let assessment = '';
    if (gravityHeadMeters < 10) {
      assessment = 'Low pressure: Great for slow drip irrigation or filling storage tanks; may need elevated drum for domestic taps.';
    } else if (gravityHeadMeters <= 45) {
      assessment = 'Optimal pressure: Perfect for household showers, standard plumbing, and garden sprinkler nozzles without electric pumps.';
    } else {
      assessment = 'High pressure: Exceeds 4 bar. Install a simple pressure reducing valve at the home connection to protect fittings.';
    }

    return {
      staticBar,
      staticPsi,
      qLpm,
      qLph,
      assessment
    };
  }, [gravityHeadMeters, gravityPipeDiameterMm, gravityPipeLengthMeters]);

  // --------------------------------------------------------------------------
  // 2. Rainwater Harvesting Calculator State
  // --------------------------------------------------------------------------
  const [roofAreaM2, setRoofAreaM2] = useState<number>(120); // 120 m2 typical country cottage
  const [annualRainfallMm, setAnnualRainfallMm] = useState<number>(1100); // Ntcheu / Dedza average
  const [roofTypeEfficiency, setRoofTypeEfficiency] = useState<number>(0.90); // 0.90 corrugated iron

  const rainResult = useMemo(() => {
    // Harvestable Liters = Area (m2) * Rain (mm) * Runoff Coefficient
    // Note: 1 mm of rain on 1 m2 = 1 liter of water
    const totalHarvestableLiters = Math.round(roofAreaM2 * annualRainfallMm * roofTypeEfficiency);
    // Typical dry season in Malawi is approx 180 days (May to October)
    const drySeasonDailyLiters = Math.round(totalHarvestableLiters / 365);
    // Storage recommendation: Capture at least 25% to 35% of total annual harvest for dry months
    const recommendedStorageLiters = Math.round(totalHarvestableLiters * 0.30);
    const tanksCount5000L = Math.ceil(recommendedStorageLiters / 5000);

    return {
      totalHarvestableLiters: totalHarvestableLiters.toLocaleString(),
      drySeasonDailyLiters,
      recommendedStorageLiters: recommendedStorageLiters.toLocaleString(),
      tanksCount5000L
    };
  }, [roofAreaM2, annualRainfallMm, roofTypeEfficiency]);

  // --------------------------------------------------------------------------
  // 3. Solar Borehole Pumping State
  // --------------------------------------------------------------------------
  const [boreholeDepthMeters, setBoreholeDepthMeters] = useState<number>(35); // 35m depth
  const [dailyWaterLiters, setDailyWaterLiters] = useState<number>(3000); // 3,000 L/day
  const [peakSunHours, setPeakSunHours] = useState<number>(6); // 6 peak sun hours in Malawi

  const solarPumpResult = useMemo(() => {
    // Flow needed in m3/hr
    const dailyM3 = dailyWaterLiters / 1000;
    const hourlyM3 = Number((dailyM3 / Math.max(1, peakSunHours)).toFixed(2));
    
    // Hydraulic energy: Ph (Watts) = (rho * g * Q * H) / 3600
    // rho = 1000 kg/m3, g = 9.81, Q in m3/hr, H in meters
    // Ph ≈ 2.725 * Q (m3/hr) * H (m)
    const hydraulicWatts = 2.725 * hourlyM3 * (boreholeDepthMeters + 10); // +10m friction/tank elevation
    // Solar pump efficiency factor ≈ 45% (wire-to-water)
    const electricalWatts = Math.round(hydraulicWatts / 0.45);
    // PV array size with 30% solar derating margin
    const recommendedPvWatts = Math.round(electricalWatts * 1.35);
    // Recommend panel count based on standard 380W panels
    const panelCount380W = Math.max(1, Math.ceil(recommendedPvWatts / 380));

    return {
      hourlyM3,
      electricalWatts,
      recommendedPvWatts,
      panelCount380W
    };
  }, [boreholeDepthMeters, dailyWaterLiters, peakSunHours]);

  // --------------------------------------------------------------------------
  // 4. Solar Power & Battery Storage State
  // --------------------------------------------------------------------------
  const [lampCount, setLampCount] = useState<number>(8);
  const [lampHours, setLampHours] = useState<number>(5);
  const [fridgeHours, setFridgeHours] = useState<number>(14);
  const [laptopHours, setLaptopHours] = useState<number>(4);
  const [batteryVoltage, setBatteryVoltage] = useState<12 | 24 | 48>(24);
  const [batteryType, setBatteryType] = useState<'Lithium' | 'LeadAcid'>('Lithium');

  const solarPowerResult = useMemo(() => {
    // LED lighting: 8W each
    const lightingWh = lampCount * 8 * lampHours;
    // DC Inverter fridge: 50W average when running
    const fridgeWh = 50 * fridgeHours;
    // Phones & Laptops: 60W
    const commsWh = 60 * laptopHours;
    // Base contingency & phone charging: 250Wh
    const totalDailyWh = lightingWh + fridgeWh + commsWh + 250;

    // Battery calculation
    // Lithium DoD = 80%, Lead Acid DoD = 50%
    const dod = batteryType === 'Lithium' ? 0.80 : 0.50;
    const systemEfficiency = 0.85; // inverter and wire losses
    const requiredBatteryWh = (totalDailyWh / systemEfficiency) / dod;
    const requiredAh = Math.round(requiredBatteryWh / batteryVoltage);

    // Solar PV sizing (assume 5.5 usable sun hours in Malawi)
    const pvWattsNeeded = Math.round((totalDailyWh / (5.5 * 0.75)));
    const pvPanelsCount400W = Math.max(1, Math.ceil(pvWattsNeeded / 400));

    return {
      totalDailyWh,
      requiredAh,
      batteryVoltage,
      pvWattsNeeded,
      pvPanelsCount400W,
      inverterRatingWatts: Math.max(1000, Math.round(totalDailyWh * 0.7))
    };
  }, [lampCount, lampHours, fridgeHours, laptopHours, batteryVoltage, batteryType]);

  return (
    <section 
      id="off-grid-sizing-tools"
      aria-label="Homestead Engineering Sizing Tools"
      className={cn("rounded-3xl bg-white dark:bg-[#0E1D14] border border-stone-200/90 dark:border-emerald-900/60 shadow-xs p-6 sm:p-8 md:p-10 flex flex-col gap-8", className)}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-emerald-800 dark:text-amber-300 uppercase bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md">
              Pillar 3 Engineering
            </span>
            <span className="text-stone-300 dark:text-stone-600">•</span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Self-Reliance Calculators</span>
          </div>
          <h2 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-1">
            Off-Grid Resource Sizing Tools
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
            Practical calculators for gravity-fed water pipelines, rainwater harvesting storage, solar borehole pumping, and independent solar electricity.
          </p>
        </div>
      </div>

      {/* Tool Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {[
          { id: 'gravity', label: 'Gravity Water Flow', icon: Droplets, sub: 'Elevation head & pipe pressure' },
          { id: 'rainwater', label: 'Rain Catchment', icon: Droplets, sub: 'Roof capture & tank sizing' },
          { id: 'solar-pump', label: 'Solar Borehole Pump', icon: Sun, sub: 'Well depth & panel array' },
          { id: 'solar-power', label: 'Solar Home & Battery', icon: Battery, sub: 'Appliances & battery bank' }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "p-4 rounded-2xl text-left border transition-all flex flex-col justify-between gap-2 shadow-2xs cursor-pointer",
                isActive
                  ? "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950 dark:border-emerald-700 ring-2 ring-emerald-800/30"
                  : "bg-stone-50/70 dark:bg-[#14281D] hover:bg-stone-100/80 dark:hover:bg-emerald-950/60 border-stone-200 dark:border-emerald-900/60 text-stone-800 dark:text-stone-100"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center",
                  isActive ? "bg-white/20 text-amber-300" : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                )}>
                  <Icon size={16} />
                </span>
                <span className={cn(
                  "text-[10px] font-mono font-bold uppercase",
                  isActive ? "text-emerald-200 dark:text-emerald-200" : "text-stone-400 dark:text-stone-500"
                )}>
                  CALC
                </span>
              </div>

              <div>
                <h4 className={cn("text-xs sm:text-sm font-bold leading-snug", isActive ? "text-white" : "text-stone-900 dark:text-stone-50")}>
                  {tab.label}
                </h4>
                <p className={cn("text-xs leading-relaxed mt-0.5", isActive ? "text-emerald-200/80" : "text-stone-500 dark:text-stone-400")}>
                  {tab.sub}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Calculator Workstation */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#14281D] border border-stone-200/90 dark:border-emerald-900/60 flex flex-col gap-6">
        {/* ====================================================================
            1. GRAVITY WATER CALCULATOR
        ==================================================================== */}
        {activeTab === 'gravity' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-stone-50">
                  Gravity-Fed Water Pipeline Sizer
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                  Calculate delivery pressure and flow rate from an elevated spring or header tank without electric pumps.
                </p>
              </div>

              {/* Sliders */}
              <div className="flex flex-col gap-4 bg-white dark:bg-[#0E1D14] p-5 rounded-2xl border border-stone-200 dark:border-emerald-900/60">
                {/* Elevation Head */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                    <span>Elevation Drop (How high is the spring above the house?):</span>
                    <span className="font-mono text-emerald-800 dark:text-amber-300 font-bold">{gravityHeadMeters} meters</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 my-1">
                    {[
                      { label: 'Gentle Slope (10m ~ 3-story bldg)', val: 10 },
                      { label: 'Hillside (30m)', val: 30 },
                      { label: 'Steep Mountain (60m)', val: 60 }
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setGravityHeadMeters(preset.val)}
                        className={cn(
                          "py-1.5 px-2 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer",
                          gravityHeadMeters === preset.val
                            ? "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950"
                            : "bg-stone-50 dark:bg-[#14281D] border-stone-200 dark:border-emerald-900/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100"
                        )}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={120}
                    step={5}
                    value={gravityHeadMeters}
                    onChange={(e) => setGravityHeadMeters(Number(e.target.value))}
                    className="w-full accent-emerald-800 dark:accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-400 dark:text-stone-500 font-mono">
                    <span>5m (Gentle slope)</span>
                    <span>60m (Hillside)</span>
                    <span>120m (Mountain drop)</span>
                  </div>
                </div>

                {/* Pipe Diameter */}
                <div className="flex flex-col gap-1.5 pt-3 border-t border-stone-100 dark:border-emerald-900/40">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                    <span>Internal Pipe Diameter:</span>
                    <span className="font-mono text-emerald-800 dark:text-amber-300 font-bold">{gravityPipeDiameterMm} mm ({gravityPipeDiameterMm === 25 ? '1 inch' : gravityPipeDiameterMm === 32 ? '1.25 inch' : gravityPipeDiameterMm === 50 ? '2 inch' : '0.75 inch'})</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-1">
                    {[20, 25, 32, 50].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setGravityPipeDiameterMm(d)}
                        className={cn(
                          "py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer",
                          gravityPipeDiameterMm === d 
                            ? "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950 dark:border-emerald-700" 
                            : "bg-stone-50 dark:bg-[#14281D] border-stone-200 dark:border-emerald-900/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-emerald-950/60"
                        )}
                      >
                        {d} mm
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pipe Length */}
                <div className="flex flex-col gap-1.5 pt-3 border-t border-stone-100 dark:border-emerald-900/40">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                    <span>Pipeline Distance / Length:</span>
                    <span className="font-mono text-emerald-800 dark:text-amber-300 font-bold">{gravityPipeLengthMeters} meters</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={1500}
                    step={20}
                    value={gravityPipeLengthMeters}
                    onChange={(e) => setGravityPipeLengthMeters(Number(e.target.value))}
                    className="w-full accent-emerald-800 dark:accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-400 dark:text-stone-500 font-mono">
                    <span>20m (Close source)</span>
                    <span>500m (Forest stream)</span>
                    <span>1,500m (Distant spring)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-white dark:bg-[#0E1D14] p-6 rounded-2xl border border-stone-200 dark:border-emerald-900/60 shadow-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
                  Calculated Delivery Telemetry
                </span>
                <h4 className="serif text-lg font-bold text-stone-900 dark:text-stone-50 mt-1">
                  Expected Flow & Pressure
                </h4>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-800/60">
                    <div className="text-[10px] uppercase font-bold text-sky-900 dark:text-sky-300">Static Pressure</div>
                    <div className="text-xl font-black font-mono text-stone-900 dark:text-stone-50 mt-0.5">{gravityResult.staticBar} bar</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">{gravityResult.staticPsi} PSI</div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/60">
                    <div className="text-[10px] uppercase font-bold text-emerald-900 dark:text-emerald-300">Delivery Flow</div>
                    <div className="text-xl font-black font-mono text-stone-900 dark:text-stone-50 mt-0.5">{gravityResult.qLpm} L/min</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">{gravityResult.qLph.toLocaleString()} L/hr</div>
                  </div>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-stone-50 dark:bg-[#14281D] border border-stone-200 dark:border-emerald-900/60 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  <strong className="text-stone-900 dark:text-stone-100 block mb-1">System Assessment:</strong>
                  {gravityResult.assessment}
                </div>
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400 italic pt-3 border-t border-stone-100 dark:border-emerald-900/40">
                Tip: Always use Class 10 or Class 16 HDPE pipe for drops over 40 meters to prevent burst pipes during sudden water hammer shock.
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            2. RAINWATER HARVESTING CALCULATOR
        ==================================================================== */}
        {activeTab === 'rainwater' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-stone-50">
                  Rainwater Harvesting Catchment Calculator
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                  Size your roof catchment area and storage tanks to ensure water abundance through Malawi's 6-month dry season.
                </p>
              </div>

              <div className="flex flex-col gap-4 bg-white dark:bg-[#0E1D14] p-5 rounded-2xl border border-stone-200 dark:border-emerald-900/60">
                {/* Roof Area */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                    <span>Roof Size (Tap a House Size Preset or Slide):</span>
                    <span className="font-mono text-emerald-800 dark:text-amber-300 font-bold">{roofAreaM2} m²</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 my-1">
                    {[
                      { label: 'Small Cabin (50 m²)', val: 50 },
                      { label: '2-Bed Cottage (90 m²)', val: 90 },
                      { label: '4-Bed Home (140 m²)', val: 140 }
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setRoofAreaM2(preset.val)}
                        className={cn(
                          "py-1.5 px-2 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer",
                          roofAreaM2 === preset.val
                            ? "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950"
                            : "bg-stone-50 dark:bg-[#14281D] border-stone-200 dark:border-emerald-900/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100"
                        )}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={400}
                    step={10}
                    value={roofAreaM2}
                    onChange={(e) => setRoofAreaM2(Number(e.target.value))}
                    className="w-full accent-emerald-800 dark:accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-400 dark:text-stone-500 font-mono">
                    <span>40 m² (Small cottage)</span>
                    <span>150 m² (Standard homestead)</span>
                    <span>400 m² (Sanitarium / Barn)</span>
                  </div>
                </div>

                {/* Annual Rain */}
                <div className="flex flex-col gap-1.5 pt-3 border-t border-stone-100 dark:border-emerald-900/40">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                    <span>District Annual Rainfall:</span>
                    <span className="font-mono text-emerald-800 dark:text-amber-300 font-bold">{annualRainfallMm} mm / year</span>
                  </div>
                  <input
                    type="range"
                    min={650}
                    max={2000}
                    step={50}
                    value={annualRainfallMm}
                    onChange={(e) => setAnnualRainfallMm(Number(e.target.value))}
                    className="w-full accent-emerald-800 dark:accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-400 dark:text-stone-500 font-mono">
                    <span>700mm (Lower Shire)</span>
                    <span>1,200mm (Dedza / Zomba)</span>
                    <span>1,800mm (Mulanje)</span>
                  </div>
                </div>

                {/* Roof Material */}
                <div className="flex flex-col gap-1.5 pt-3 border-t border-stone-100 dark:border-emerald-900/40">
                  <span className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">Roof Surface Material:</span>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {[
                      { label: 'Corrugated Iron (90%)', val: 0.90 },
                      { label: 'Clay Tiles (80%)', val: 0.80 },
                      { label: 'Grass Thatch (60%)', val: 0.60 }
                    ].map((m) => (
                      <button
                        key={m.val}
                        type="button"
                        onClick={() => setRoofTypeEfficiency(m.val)}
                        className={cn(
                          "py-2 px-1 text-center text-xs font-semibold rounded-lg border transition-all cursor-pointer",
                          roofTypeEfficiency === m.val
                            ? "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950 dark:border-emerald-700"
                            : "bg-stone-50 dark:bg-[#14281D] border-stone-200 dark:border-emerald-900/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-emerald-950/60"
                        )}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-white dark:bg-[#0E1D14] p-6 rounded-2xl border border-stone-200 dark:border-emerald-900/60 shadow-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
                  Catchment Volume & Storage Sizing
                </span>
                <h4 className="serif text-lg font-bold text-stone-900 dark:text-stone-50 mt-1">
                  Water Yield Projection
                </h4>

                <div className="flex flex-col gap-3 mt-4">
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/60">
                    <div className="text-[10px] uppercase font-bold text-emerald-900 dark:text-emerald-300">Total Annual Harvest</div>
                    <div className="text-2xl font-black font-mono text-stone-900 dark:text-stone-50 mt-0.5">{rainResult.totalHarvestableLiters} Liters</div>
                    <div className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5">≈ {rainResult.drySeasonDailyLiters} Liters / day year-round</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-800/60">
                    <div className="text-[10px] uppercase font-bold text-sky-900 dark:text-sky-300">Recommended Dry-Season Tank Storage</div>
                    <div className="text-xl font-black font-mono text-stone-900 dark:text-stone-50 mt-0.5">{rainResult.recommendedStorageLiters} Liters</div>
                    <div className="text-xs text-sky-900 dark:text-sky-300 font-semibold mt-1">
                      Equates to {rainResult.tanksCount5000L} × 5,000-Liter storage tanks
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400 italic pt-3 border-t border-stone-100 dark:border-emerald-900/40">
                Tip: Install a simple 20-liter "first-flush" PVC pipe diverter on each downspout to discard initial roof dust and bird droppings before water enters storage.
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            3. SOLAR BOREHOLE PUMP CALCULATOR
        ==================================================================== */}
        {activeTab === 'solar-pump' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-stone-50">
                  DC Solar Borehole Pumping Sizer
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                  Size a direct DC solar submersible pump (no batteries required, pumping directly into an elevated header tank).
                </p>
              </div>

              <div className="flex flex-col gap-4 bg-white dark:bg-[#0E1D14] p-5 rounded-2xl border border-stone-200 dark:border-emerald-900/60">
                {/* Borehole Depth */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                    <span>Total Pumping Depth (Pumping Head):</span>
                    <span className="font-mono text-emerald-800 dark:text-amber-300 font-bold">{boreholeDepthMeters} meters</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={90}
                    step={5}
                    value={boreholeDepthMeters}
                    onChange={(e) => setBoreholeDepthMeters(Number(e.target.value))}
                    className="w-full accent-emerald-800 dark:accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-400 dark:text-stone-500 font-mono">
                    <span>10m (Shallow alluvial)</span>
                    <span>40m (Plateau basement)</span>
                    <span>90m (Deep dry terrain)</span>
                  </div>
                </div>

                {/* Daily Water Demand */}
                <div className="flex flex-col gap-1.5 pt-3 border-t border-stone-100 dark:border-emerald-900/40">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200">
                    <span>Daily Water Requirement:</span>
                    <span className="font-mono text-emerald-800 dark:text-amber-300 font-bold">{dailyWaterLiters.toLocaleString()} Liters / day</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={12000}
                    step={500}
                    value={dailyWaterLiters}
                    onChange={(e) => setDailyWaterLiters(Number(e.target.value))}
                    className="w-full accent-emerald-800 dark:accent-emerald-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-stone-400 dark:text-stone-500 font-mono">
                    <span>1,500 L (Family domestic)</span>
                    <span>4,000 L (Family + Garden)</span>
                    <span>10,000 L (Outpost farm)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-white dark:bg-[#0E1D14] p-6 rounded-2xl border border-stone-200 dark:border-emerald-900/60 shadow-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
                  Solar Array Specification
                </span>
                <h4 className="serif text-lg font-bold text-stone-900 dark:text-stone-50 mt-1">
                  Pumping System Hardware
                </h4>

                <div className="flex flex-col gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/60">
                    <div className="text-[10px] uppercase font-bold text-amber-900 dark:text-amber-300">Required Solar PV Array</div>
                    <div className="text-2xl font-black font-mono text-stone-900 dark:text-stone-50 mt-0.5">{solarPumpResult.recommendedPvWatts} Watts</div>
                    <div className="text-xs text-amber-900 dark:text-amber-300 font-semibold mt-1">
                      {solarPumpResult.panelCount380W} × 380W Solar Panels (Mono-PERC)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#14281D] border border-stone-200 dark:border-emerald-900/60">
                      <div className="text-[10px] uppercase font-bold text-stone-600 dark:text-stone-400">Pumping Rate</div>
                      <div className="text-base font-bold font-mono text-stone-900 dark:text-stone-100 mt-0.5">{solarPumpResult.hourlyM3} m³/hr</div>
                      <div className="text-xs text-stone-500 dark:text-stone-400">≈ {Math.round(solarPumpResult.hourlyM3 * 1000 / 60)} L/min</div>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 dark:bg-[#14281D] border border-stone-200 dark:border-emerald-900/60">
                      <div className="text-[10px] uppercase font-bold text-stone-600 dark:text-stone-400">Pump Motor</div>
                      <div className="text-base font-bold font-mono text-stone-900 dark:text-stone-100 mt-0.5">{solarPumpResult.electricalWatts} W</div>
                      <div className="text-xs text-stone-500 dark:text-stone-400">DC Brushless Motor</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400 italic pt-3 border-t border-stone-100 dark:border-emerald-900/40">
                Pumping water directly into an elevated header tank during peak sunshine hours eliminates the need for expensive batteries, which degrade over time.
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            4. SOLAR HOME & BATTERY STORAGE SIZER
        ==================================================================== */}
        {activeTab === 'solar-power' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div>
                <h3 className="serif text-xl font-bold text-stone-900 dark:text-stone-50">
                  Solar Power & Battery Storage Sizer
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                  Tailor your electrical independence to essential needs: LED lights, DC refrigeration, laptops, and communications.
                </p>
              </div>

              <div className="flex flex-col gap-4 bg-white dark:bg-[#0E1D14] p-5 rounded-2xl border border-stone-200 dark:border-emerald-900/60">
                {/* One-Click Household Presets for Beginners */}
                <div className="flex flex-col gap-1.5 pb-3 border-b border-stone-100 dark:border-emerald-900/40">
                  <span className="text-xs font-bold text-emerald-800 dark:text-amber-300 uppercase tracking-wider">
                    Quick Household Setup (Tap One if Unsure of Volts/Amps):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { label: 'Starter Cabin (Lights + Phones)', lamps: 4, fridge: 0, laptop: 2, volt: 12 as const },
                      { label: 'Family Home (+ Fridge & Laptops)', lamps: 8, fridge: 14, laptop: 4, volt: 24 as const },
                      { label: 'Full Outpost (+ Freezer & Clinic)', lamps: 14, fridge: 20, laptop: 8, volt: 48 as const },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setLampCount(preset.lamps);
                          setFridgeHours(preset.fridge);
                          setLaptopHours(preset.laptop);
                          setBatteryVoltage(preset.volt);
                        }}
                        className={cn(
                          "p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer",
                          lampCount === preset.lamps && batteryVoltage === preset.volt
                            ? "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950"
                            : "bg-stone-50 dark:bg-[#14281D] border-stone-200 dark:border-emerald-900/60 text-stone-800 dark:text-stone-200 hover:bg-stone-100"
                        )}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lighting */}
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">LED Light Fixtures (8W each):</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setLampCount(Math.max(2, lampCount - 2))}
                      className="w-6 h-6 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 font-bold flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-emerald-800 dark:text-amber-300">{lampCount}</span>
                    <button
                      type="button"
                      onClick={() => setLampCount(lampCount + 2)}
                      className="w-6 h-6 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 font-bold flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Fridge Run */}
                <div className="flex justify-between items-center text-xs sm:text-sm pt-3 border-t border-stone-100 dark:border-emerald-900/40">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Efficient DC Refrigerator Run:</span>
                  <span className="font-mono text-emerald-800 dark:text-amber-300 font-bold">{fridgeHours} hrs / day</span>
                </div>

                {/* Battery Chem & Voltage */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100 dark:border-emerald-900/40 text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">Battery Chemistry:</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['Lithium', 'LeadAcid'] as const).map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBatteryType(b)}
                          className={cn(
                            "py-1.5 px-2 rounded-lg border font-semibold text-center text-xs transition-all cursor-pointer",
                            batteryType === b 
                              ? "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950 dark:border-emerald-700" 
                              : "bg-stone-50 dark:bg-[#14281D] border-stone-200 dark:border-emerald-900/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-emerald-950/60"
                          )}
                        >
                          {b === 'Lithium' ? 'LiFePO4' : 'Lead Acid'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">System Voltage:</span>
                    <div className="grid grid-cols-3 gap-1">
                      {([12, 24, 48] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setBatteryVoltage(v)}
                          className={cn(
                            "py-1.5 rounded-lg border font-semibold text-center text-xs transition-all cursor-pointer",
                            batteryVoltage === v 
                              ? "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950 dark:border-emerald-700" 
                              : "bg-stone-50 dark:bg-[#14281D] border-stone-200 dark:border-emerald-900/60 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-emerald-950/60"
                          )}
                        >
                          {v}V
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-white dark:bg-[#0E1D14] p-6 rounded-2xl border border-stone-200 dark:border-emerald-900/60 shadow-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
                  Calculated Off-Grid System
                </span>
                <h4 className="serif text-lg font-bold text-stone-900 dark:text-stone-50 mt-1">
                  Solar & Battery Bank
                </h4>

                <div className="flex flex-col gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/60">
                    <div className="text-[10px] uppercase font-bold text-emerald-900 dark:text-emerald-300">Total Daily Energy Consumption</div>
                    <div className="text-xl font-black font-mono text-stone-900 dark:text-stone-50 mt-0.5">{solarPowerResult.totalDailyWh.toLocaleString()} Watt-Hours</div>
                  </div>

                  <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-800/60">
                    <div className="text-[10px] uppercase font-bold text-sky-900 dark:text-sky-300">Battery Capacity Required</div>
                    <div className="text-xl font-black font-mono text-stone-900 dark:text-stone-50 mt-0.5">
                      {solarPowerResult.requiredAh} Ah @ {solarPowerResult.batteryVoltage}V
                    </div>
                    <div className="text-xs text-sky-900 dark:text-sky-300 mt-0.5">
                      ({batteryType === 'Lithium' ? 'LiFePO4 with 80% DoD' : 'Deep cycle with 50% DoD'})
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/60">
                    <div className="text-[10px] uppercase font-bold text-amber-900 dark:text-amber-300">Recommended Solar Panel Array</div>
                    <div className="text-lg font-black font-mono text-stone-900 dark:text-stone-50 mt-0.5">{solarPowerResult.pvWattsNeeded} Watts PV</div>
                    <div className="text-xs text-amber-900 dark:text-amber-300 font-semibold mt-0.5">
                      {solarPowerResult.pvPanelsCount400W} × 400W Solar Panels
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400 italic pt-3 border-t border-stone-100 dark:border-emerald-900/40">
                A 24V or 48V DC configuration is vastly superior to 12V because it cuts wiring copper thickness and energy losses in half.
              </div>
            </div>
          </div>
        )}

        {/* Live Reactive Vector Engineering Schematic & Ready Image Reference */}
        <OffGridSystemSchematics
          activeTab={activeTab}
          gravity={{
            headMeters: gravityHeadMeters,
            pipeDiameterMm: gravityPipeDiameterMm,
            pipeLengthMeters: gravityPipeLengthMeters,
            staticBar: gravityResult.staticBar,
            staticPsi: gravityResult.staticPsi,
            qLpm: gravityResult.qLpm,
          }}
          rainwater={{
            roofAreaM2,
            annualRainfallMm,
            totalHarvestableLiters: rainResult.totalHarvestableLiters,
            recommendedStorageLiters: rainResult.recommendedStorageLiters,
            tanksCount5000L: rainResult.tanksCount5000L,
          }}
          solarPump={{
            boreholeDepthMeters,
            dailyWaterLiters,
            recommendedPvWatts: solarPumpResult.recommendedPvWatts,
            panelCount380W: solarPumpResult.panelCount380W,
            hourlyM3: solarPumpResult.hourlyM3,
            electricalWatts: solarPumpResult.electricalWatts,
          }}
          solarPower={{
            lampCount,
            fridgeHours,
            laptopHours,
            batteryVoltage,
            batteryType,
            totalDailyWh: solarPowerResult.totalDailyWh,
            requiredAh: solarPowerResult.requiredAh,
            pvWattsNeeded: solarPowerResult.pvWattsNeeded,
            pvPanelsCount400W: solarPowerResult.pvPanelsCount400W,
            inverterRatingWatts: solarPowerResult.inverterRatingWatts,
          }}
        />
      </div>
    </section>
  );
}
