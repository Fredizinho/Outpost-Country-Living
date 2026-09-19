import React, { useState } from 'react';
import { ScoutingMap } from '@/components/scout/ScoutingMap';
import { SoilScienceGuide } from '@/components/scout/SoilScienceGuide';
import { ResourceDensityBottomSheet } from '@/components/scout/ResourceDensityBottomSheet';
import { 
  Globe, Sprout, HardDrive, Compass, Layers, ShieldCheck, 
  Maximize2, Minimize2, BarChart3, FileText, Eye, EyeOff, ChevronDown
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type ScoutHubTab = 'scout' | 'parcels' | 'comparison' | 'soilScience';

export interface UnifiedLandHubProps {
  defaultTab?: ScoutHubTab;
}

export function UnifiedLandHub({ defaultTab = 'scout' }: UnifiedLandHubProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get('tab') as ScoutHubTab | null;
  const initialTabFromUrl = urlTab || defaultTab;
  const initialRegionParam = searchParams.get('region') || undefined;

  const [activeTab, setActiveTab] = useState<ScoutHubTab>(initialTabFromUrl);
  
  // Immersive map mode toggle to maximize canvas width and height
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState<boolean>(false);
  const [isAutoHideDetails, setIsAutoHideDetails] = useState<boolean>(true);

  const handleTabChange = (tab: ScoutHubTab) => {
    setActiveTab(tab);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('tab', tab);
      return next;
    });
  };

  return (
    <div className={cn(
      "w-full flex flex-col text-slate-100 font-sans transition-all",
      activeTab === 'scout' ? "px-1 sm:px-2 md:px-3 py-1 gap-1.5" : "px-2 sm:px-4 md:px-6 py-4 gap-4"
    )} id="malawi-regional-parcel-scout-module">
      
      {/* 1. COMMAND HUB HEADER WITH TAB NAVIGATION (COMPACT & NO DENSE TEXT OVERLAYS) */}
      {(!isHeaderCollapsed || activeTab !== 'scout') ? (
        <header className={cn(
          "bg-slate-950/90 backdrop-blur-md text-white rounded-2xl border border-white/10 shadow-xl relative overflow-hidden flex flex-col transition-all",
          activeTab === 'scout' ? "p-2 sm:p-2.5" : "p-3 sm:p-4"
        )}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 relative z-10">
            <div className="flex items-center gap-2">
              <h1 className="serif text-base sm:text-lg md:text-xl font-extrabold text-white leading-tight">
                Malawi Regional & Parcel Scout
              </h1>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono font-bold uppercase text-[9px] tracking-wider hidden sm:flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Precision GIS
              </span>
              <span className="bg-slate-900 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase hidden md:inline">
                28 Districts
              </span>
            </div>

            {/* 4-Pillar Module Tab Switcher */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto scrollbar-none">
              <div className="bg-slate-900/90 border border-white/10 p-0.5 sm:p-1 rounded-xl flex items-center gap-1 shadow-inner shrink-0">
                <button
                  onClick={() => handleTabChange('scout')}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0",
                    activeTab === 'scout'
                      ? "bg-amber-500 text-slate-950 shadow-md font-black border border-amber-300"
                      : "text-slate-300 hover:text-white"
                  )}
                  title="Explore Full Interactive Leaflet GIS Map"
                >
                  <Globe size={13} />
                  <span>Map</span>
                </button>

                <button
                  onClick={() => handleTabChange('parcels')}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0",
                    activeTab === 'parcels'
                      ? "bg-amber-500 text-slate-950 shadow-md font-black border border-amber-300"
                      : "text-slate-300 hover:text-white"
                  )}
                  title="Browse Catalog of Verified Agricultural Research Stations & Benchmarks"
                >
                  <FileText size={13} />
                  <span>Stations</span>
                </button>

                <button
                  onClick={() => handleTabChange('comparison')}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0",
                    activeTab === 'comparison'
                      ? "bg-sky-500 text-slate-950 shadow-md font-black border border-sky-300"
                      : "text-slate-300 hover:text-white"
                  )}
                  title="Compare District Crowding, Rainfall, and Aquifer Depths"
                >
                  <BarChart3 size={13} />
                  <span>Analytics</span>
                </button>

                <button
                  onClick={() => handleTabChange('soilScience')}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0",
                    activeTab === 'soilScience'
                      ? "bg-emerald-600 text-white shadow-md font-black border border-emerald-400"
                      : "text-slate-300 hover:text-white"
                  )}
                  title="Katondo, Nitisols, and Agronomic Strata Guide"
                >
                  <Sprout size={13} />
                  <span>Soil Guide</span>
                </button>
              </div>

              {activeTab === 'scout' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsAutoHideDetails(!isAutoHideDetails)}
                    className={cn(
                      "text-xs font-mono px-2 py-1 rounded-xl border transition-all flex items-center gap-1 cursor-pointer shrink-0",
                      isAutoHideDetails 
                        ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:border-emerald-400" 
                        : "bg-slate-900 text-slate-400 border-white/10 hover:text-white"
                    )}
                    title={isAutoHideDetails ? "Auto-Hide Details Active (extra overlays fade when moving map)" : "Auto-Hide Details Disabled (overlays stay pinned)"}
                  >
                    {isAutoHideDetails ? <EyeOff size={12} className="text-emerald-400" /> : <Eye size={12} />}
                    <span className="hidden md:inline">{isAutoHideDetails ? "Auto-Hide On" : "Auto-Hide Off"}</span>
                  </button>

                  <button
                    onClick={() => setIsHeaderCollapsed(true)}
                    className="text-xs font-mono text-slate-400 hover:text-amber-300 hidden md:flex items-center gap-1 bg-slate-900 border border-white/10 px-2 py-1 rounded-xl cursor-pointer hover:border-amber-400/50 transition-all shrink-0"
                    title="Maximize Map Canvas Height (Collapse Header)"
                  >
                    <Maximize2 size={12} className="text-amber-400" />
                    <span className="hidden xl:inline">Full Canvas</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      ) : (
        /* Minimized Header Bar when in full map mode */
        <div className="w-full flex items-center justify-between bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10 text-xs font-mono shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold serif text-sm">Malawi Scout GIS</span>
            <span className="text-slate-400 text-[10px] hidden sm:inline">• Full Canvas View</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleTabChange('parcels')}
              className="text-slate-300 hover:text-white px-2 py-0.5 rounded text-xs flex items-center gap-1 cursor-pointer"
            >
              <FileText size={12} className="text-amber-400" />
              <span>Stations</span>
            </button>
            <button
              onClick={() => handleTabChange('comparison')}
              className="text-slate-300 hover:text-white px-2 py-0.5 rounded text-xs flex items-center gap-1 cursor-pointer"
            >
              <BarChart3 size={12} className="text-sky-400" />
              <span>Analytics</span>
            </button>
            <button
              onClick={() => handleTabChange('soilScience')}
              className="text-slate-300 hover:text-white px-2 py-0.5 rounded text-xs flex items-center gap-1 cursor-pointer"
            >
              <Sprout size={12} className="text-emerald-400" />
              <span>Soil Guide</span>
            </button>
            <button
              onClick={() => setIsHeaderCollapsed(false)}
              className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-white border border-amber-500/40 px-2.5 py-1 rounded-xl text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-all ml-1"
              title="Expand Page Header"
            >
              <ChevronDown size={12} />
              <span>Expand Header</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. PRIMARY CONTENT BASED ON ACTIVE TAB */}
      {activeTab === 'scout' && (
        <section className="w-full">
          <ScoutingMap 
            initialRegionId={initialRegionParam}
            initialViewMode="map"
            isAutoHideProp={isAutoHideDetails}
            onMapInteract={() => {
              if (!isHeaderCollapsed) {
                setIsHeaderCollapsed(true);
              }
            }}
            onNavigateSoilScience={() => handleTabChange('soilScience')}
            onNavigateComparison={() => handleTabChange('comparison')}
          />
        </section>
      )}

      {activeTab === 'parcels' && (
        <section className="w-full">
          <ScoutingMap 
            initialRegionId={initialRegionParam}
            initialViewMode="list"
            isAutoHideProp={isAutoHideDetails}
            onNavigateSoilScience={() => handleTabChange('soilScience')}
            onNavigateComparison={() => handleTabChange('comparison')}
          />
        </section>
      )}

      {activeTab === 'comparison' && (
        <section className="w-full max-w-7xl mx-auto flex flex-col gap-4">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-300">
            <div>
              <h3 className="serif text-lg font-bold text-white">District Comparative Analytics</h3>
              <p className="text-xs text-slate-400">
                Compare population crowding per km², annual rainfall, and aquifer drill depths across all 28 districts of Malawi.
              </p>
            </div>
            <button
              onClick={() => handleTabChange('scout')}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
            >
              <Globe size={13} />
              <span>Back to Map View</span>
            </button>
          </div>

          <ResourceDensityBottomSheet 
            isStandalone={true} 
            defaultExpanded={true} 
          />
        </section>
      )}

      {activeTab === 'soilScience' && (
        <section className="w-full max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex justify-end">
            <button
              onClick={() => handleTabChange('scout')}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
            >
              <Globe size={13} />
              <span>Back to Map View</span>
            </button>
          </div>
          <SoilScienceGuide />
        </section>
      )}

    </div>
  );
}
