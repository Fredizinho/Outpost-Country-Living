import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, AreaChart, Area, ComposedChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { 
  Users, Droplets, Sun, Trees, ChevronUp, ChevronDown, 
  Layers, Filter, ArrowUpDown, Sparkles, MapPin, Maximize2, Minimize2, Info, X
} from 'lucide-react';
import { MALAWI_DISTRICT_RESOURCES, DistrictResourceStats } from '@/data/districtResourceData';
import { MalawiDistrictSpec } from '@/data/malawiDistrictData';
import { cn } from '@/lib/utils';

export interface ResourceDensityBottomSheetProps {
  activeDistrict?: MalawiDistrictSpec | null;
  selectedDistrictName?: string;
  onSelectDistrict?: (districtId: string) => void;
  onSelectDistrictByName?: (districtName: string) => void;
}

type MetricTab = 'population' | 'water' | 'solar';
type RegionFilter = 'All' | 'Northern' | 'Central' | 'Southern';

export function ResourceDensityBottomSheet({
  activeDistrict,
  selectedDistrictName,
  onSelectDistrict,
  onSelectDistrictByName
}: ResourceDensityBottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<MetricTab>('population');
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('All');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const currentDistName = activeDistrict?.name || selectedDistrictName || 'Dedza';

  // Filter and sort district resources
  const chartData = useMemo(() => {
    let list = [...MALAWI_DISTRICT_RESOURCES];
    if (selectedRegion !== 'All') {
      list = list.filter(d => d.region === selectedRegion);
    }

    list.sort((a, b) => {
      let valA = 0;
      let valB = 0;
      if (activeTab === 'population') {
        valA = a.densityPerKm2;
        valB = b.densityPerKm2;
      } else if (activeTab === 'water') {
        valA = a.rainfallMm;
        valB = b.rainfallMm;
      } else {
        valA = a.solarKwhDay;
        valB = b.solarKwhDay;
      }
      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });

    return list.map(d => ({
      ...d,
      shortName: d.name,
      isActive: currentDistName.toLowerCase() === d.name.toLowerCase()
    }));
  }, [selectedRegion, activeTab, sortOrder, currentDistName]);

  // Active district resource data
  const currentDistrictStats = useMemo(() => {
    return MALAWI_DISTRICT_RESOURCES.find(
      d => d.name.toLowerCase() === currentDistName.toLowerCase() || (activeDistrict && d.id === activeDistrict.id)
    ) || MALAWI_DISTRICT_RESOURCES.find(d => d.name === 'Dedza');
  }, [currentDistName, activeDistrict]);

  return (
    <div className="w-full relative z-20 pointer-events-auto transition-all">
      {/* ------------------------------------------------------------- */}
      {/* 1. COLLAPSED DOCK / PEEK BAR                                  */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-slate-950/95 backdrop-blur-2xl border-t border-x border-white/15 rounded-t-2xl shadow-2xl text-white">
        <div className="p-3 sm:px-5 flex items-center justify-between gap-3">
          
          {/* Left: Expand Trigger & Live Summary */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
            title={isExpanded ? "Collapse Land & Resource Charts" : "Expand District Population & Resource Charts"}
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="serif text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  District People & Resource Comparison
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  28 Districts
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans hidden sm:block">
                Compare population crowding, rainfall abundance, and well depth across Malawi
              </p>
            </div>
          </button>

          {/* Center Quick Stats Badge */}
          {currentDistrictStats && (
            <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-xs font-mono">
              <span className="text-amber-300 font-bold">{currentDistrictStats.name}:</span>
              <span className="text-slate-300">{currentDistrictStats.densityPerKm2} people/km²</span>
              <span className="text-slate-500">•</span>
              <span className="text-sky-300">{currentDistrictStats.rainfallMm}mm Rain</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-300">{currentDistrictStats.aquiferDepthM}m Well Depth</span>
            </div>
          )}

          {/* Right Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-amber-400 text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 transition-all cursor-pointer shadow"
          >
            {isExpanded ? (
              <>
                <ChevronDown size={14} />
                <span>Hide Charts</span>
              </>
            ) : (
              <>
                <ChevronUp size={14} />
                <span>View Charts</span>
              </>
            )}
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. EXPANDED BOTTOM SHEET PANEL (RECHARTS VISUALIZATION)       */}
        {/* ------------------------------------------------------------- */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-white/10 p-4 sm:p-5 flex flex-col gap-4"
            >
              {/* Controls Bar: Metric Switcher + Region Filter + Sort */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/10">
                
                {/* Metric Selection Tabs */}
                <div className="bg-slate-900/90 border border-white/10 p-1 rounded-xl flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('population')}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                      activeTab === 'population'
                        ? "bg-amber-500 text-slate-950 font-black shadow"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    <Users size={13} />
                    <span>People & Space (per km²)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('water')}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                      activeTab === 'water'
                        ? "bg-sky-500 text-slate-950 font-black shadow"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    <Droplets size={13} />
                    <span>Rainfall & Well Depth</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('solar')}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                      activeTab === 'solar'
                        ? "bg-emerald-500 text-slate-950 font-black shadow"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    <Sun size={13} />
                    <span>Daily Sunshine Hours</span>
                  </button>
                </div>

                {/* Region Filter & Sort Order */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 text-xs font-mono bg-white/5 border border-white/10 p-1 rounded-xl">
                    {(['All', 'Northern', 'Central', 'Southern'] as RegionFilter[]).map((reg) => (
                      <button
                        key={reg}
                        onClick={() => setSelectedRegion(reg)}
                        className={cn(
                          "px-2 py-1 rounded-md transition-all cursor-pointer",
                          selectedRegion === reg
                            ? "bg-white/20 text-white font-bold"
                            : "text-slate-400 hover:text-slate-200"
                        )}
                      >
                        {reg}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                    className="p-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-slate-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
                    title="Toggle Sort Order"
                  >
                    <ArrowUpDown size={13} />
                    <span>{sortOrder === 'desc' ? 'High → Low' : 'Low → High'}</span>
                  </button>
                </div>
              </div>

              {/* Top Highlight Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900/80 border border-white/10 p-3 rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Total Districts Listed</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-white">{chartData.length}</span>
                    <span className="text-[10px] font-mono text-slate-400">districts</span>
                  </div>
                  <span className="text-[10px] text-amber-300 mt-1">Region: {selectedRegion}</span>
                </div>

                <div className="bg-slate-900/80 border border-white/10 p-3 rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Highest Space per Person</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-emerald-300">Rumphi</span>
                    <span className="text-[10px] font-mono text-slate-400">(48 / km²)</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">Abundant free homestead land</span>
                </div>

                <div className="bg-slate-900/80 border border-white/10 p-3 rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Highest Annual Rainfall</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-sky-300">Mulanje</span>
                    <span className="text-[10px] font-mono text-slate-400">(1,800 mm)</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">Chiperoni tea & fruit belt</span>
                </div>

                <div className="bg-slate-900/80 border border-white/10 p-3 rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Easiest Shallow Groundwater</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-amber-300">Salima / Nkhotakota</span>
                    <span className="text-[10px] font-mono text-slate-400">(8m - 12m)</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">Low-cost solar pump wells</span>
                </div>
              </div>

              {/* Primary Interactive Chart Area */}
              <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 h-72 w-full relative">
                
                <ResponsiveContainer width="100%" height="100%">
                  {activeTab === 'population' ? (
                    <BarChart 
                      data={chartData} 
                      margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
                      onClick={(e: any) => {
                        if (e && e.activePayload && e.activePayload.length) {
                          const d = e.activePayload[0].payload as DistrictResourceStats;
                          if (onSelectDistrictByName) onSelectDistrictByName(d.name);
                          if (onSelectDistrict) onSelectDistrict(d.id);
                        }
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                      <XAxis 
                        dataKey="shortName" 
                        stroke="#94a3b8" 
                        fontSize={10} 
                        tickLine={false}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                      />
                      <YAxis stroke="#94a3b8" fontSize={10} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const d = payload[0].payload as DistrictResourceStats;
                            return (
                              <div className="bg-slate-950 border border-amber-500/40 p-3 rounded-xl shadow-2xl text-xs font-mono text-white">
                                <div className="font-bold text-amber-300 text-sm mb-1">{d.name} District ({d.region})</div>
                                <div className="text-slate-300">👥 Density: <strong className="text-white">{d.densityPerKm2} people / km²</strong></div>
                                <div className="text-slate-300">🏡 Total Population: <strong className="text-white">{d.population.toLocaleString()}</strong></div>
                                <div className="text-slate-300">📐 Total Land Area: <strong className="text-white">{d.areaKm2.toLocaleString()} km²</strong></div>
                                <div className="text-emerald-400 mt-1">🌱 Farming Land: {d.arableLandPct}% arable</div>
                                <div className="text-amber-400">🏷️ Land Availability: {d.landSpace}</div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        dataKey="densityPerKm2" 
                        name="People per km²" 
                        fill="#f59e0b"
                        radius={[4, 4, 0, 0]}
                        cursor="pointer"
                      />
                    </BarChart>
                  ) : activeTab === 'water' ? (
                    <ComposedChart 
                      data={chartData} 
                      margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
                      onClick={(e: any) => {
                        if (e && e.activePayload && e.activePayload.length) {
                          const d = e.activePayload[0].payload as DistrictResourceStats;
                          if (onSelectDistrictByName) onSelectDistrictByName(d.name);
                          if (onSelectDistrict) onSelectDistrict(d.id);
                        }
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                      <XAxis 
                        dataKey="shortName" 
                        stroke="#94a3b8" 
                        fontSize={10} 
                        tickLine={false}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                      />
                      <YAxis yAxisId="left" stroke="#38bdf8" fontSize={10} unit="mm" />
                      <YAxis yAxisId="right" orientation="right" stroke="#34d399" fontSize={10} unit="m" />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const d = payload[0].payload as DistrictResourceStats;
                            return (
                              <div className="bg-slate-950 border border-sky-500/40 p-3 rounded-xl shadow-2xl text-xs font-mono text-white">
                                <div className="font-bold text-sky-300 text-sm mb-1">{d.name} District ({d.region})</div>
                                <div className="text-sky-300">🌧️ Annual Rainfall: <strong className="text-white">{d.rainfallMm} mm / year</strong></div>
                                <div className="text-emerald-400">💧 Average Well Depth: <strong className="text-white">{d.aquiferDepthM} meters</strong></div>
                                <div className="text-amber-300 mt-1">✨ Water Profile: {d.waterRating}</div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                      <Bar yAxisId="left" dataKey="rainfallMm" name="Annual Rainfall (mm)" fill="#0284c7" radius={[4, 4, 0, 0]} cursor="pointer" />
                      <Line yAxisId="right" type="monotone" dataKey="aquiferDepthM" name="Well Depth (m)" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} cursor="pointer" />
                    </ComposedChart>
                  ) : (
                    <AreaChart 
                      data={chartData} 
                      margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
                      onClick={(e: any) => {
                        if (e && e.activePayload && e.activePayload.length) {
                          const d = e.activePayload[0].payload as DistrictResourceStats;
                          if (onSelectDistrictByName) onSelectDistrictByName(d.name);
                          if (onSelectDistrict) onSelectDistrict(d.id);
                        }
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                      <XAxis 
                        dataKey="shortName" 
                        stroke="#94a3b8" 
                        fontSize={10} 
                        tickLine={false}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                      />
                      <YAxis stroke="#94a3b8" fontSize={10} unit=" hrs" />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const d = payload[0].payload as DistrictResourceStats;
                            return (
                              <div className="bg-slate-950 border border-emerald-500/40 p-3 rounded-xl shadow-2xl text-xs font-mono text-white">
                                <div className="font-bold text-emerald-300 text-sm mb-1">{d.name} District ({d.region})</div>
                                <div className="text-amber-300">☀️ Daily Solar Energy: <strong className="text-white">{d.solarKwhDay} kWh / m² / day</strong></div>
                                <div className="text-slate-300">⚡ Solar Pump Feasibility: <strong className="text-emerald-400">Excellent (Year-Round)</strong></div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area type="monotone" dataKey="solarKwhDay" name="Daily Solar Energy (kWh/m²/day)" stroke="#10b981" fill="#059669" fillOpacity={0.4} />
                    </AreaChart>
                  )}
                </ResponsiveContainer>

              </div>

              {/* Explanatory Footer Text in Simple Everyday Malawian Speech */}
              <div className="text-xs text-slate-400 font-sans flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                <Info size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Tip for Country Living:</strong> Northern plateaus (like Rumphi and Mzimba) offer the greatest land availability with low population density. Lakeshore basins (Salima and Nkhotakota) offer shallow water tables (8–12 meters) ideal for low-cost solar borehole pumping.
                </span>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
