import React, { useState } from 'react';
import { ScoutingMap } from '@/components/scout/ScoutingMap';
import { SoilScienceGuide } from '@/components/scout/SoilScienceGuide';
import { 
  Globe, Sprout, HardDrive, Compass, Layers, ShieldCheck, AlertTriangle,
  Maximize2, Minimize2, ChevronDown, ChevronUp
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface UnifiedLandHubProps {
  defaultTab?: 'scout' | 'soilScience';
}

export function UnifiedLandHub({ defaultTab = 'scout' }: UnifiedLandHubProps) {
  const [searchParams] = useSearchParams();
  const initialTabFromUrl = (searchParams.get('tab') as 'scout' | 'soilScience') || defaultTab;
  const initialRegionParam = searchParams.get('region') || undefined;

  const [activeTab, setActiveTab] = useState<'scout' | 'soilScience'>(
    initialTabFromUrl === 'soilScience' ? 'soilScience' : 'scout'
  );
  
  // Immersive map mode toggle to maximize canvas width and height
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState<boolean>(false);

  return (
    <div className={cn(
      "w-full flex flex-col text-slate-100 font-sans transition-all",
      activeTab === 'scout' ? "px-1 sm:px-2 md:px-3 py-1.5 gap-2" : "px-2 sm:px-4 md:px-6 py-4 gap-4"
    )} id="malawi-regional-parcel-scout-module">
      
      {/* 1. COMMAND HUB HEADER WITH COMPACT IMMERSIVE TOGGLE */}
      {(!isHeaderCollapsed || activeTab === 'soilScience') ? (
        <header className="bg-slate-950/85 backdrop-blur-md text-white rounded-2xl md:rounded-3xl p-4 sm:p-5 border border-white/10 shadow-xl relative overflow-hidden flex flex-col gap-3">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-transparent rounded-full -mr-24 -mt-24 pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 relative z-10 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full font-mono font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Precision GIS
              </span>
              <span className="bg-slate-900 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase hidden sm:flex items-center gap-1">
                <HardDrive size={10} className="text-amber-400" /> 28 Districts
              </span>
              <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase hidden md:flex items-center gap-1">
                <ShieldCheck size={10} className="text-emerald-400" /> Verified Agrometeorology
              </span>
            </div>

            <div className="flex items-center gap-2">
              {activeTab === 'scout' && (
                <button
                  onClick={() => setIsHeaderCollapsed(true)}
                  className="text-xs font-mono text-slate-300 hover:text-amber-300 flex items-center gap-1 bg-slate-900 border border-white/10 px-2.5 py-1 rounded-xl cursor-pointer hover:border-amber-400/50 transition-all"
                  title="Maximize Map Canvas Height (Collapse Header)"
                >
                  <Maximize2 size={12} className="text-amber-400" />
                  <span className="hidden sm:inline">Maximize Canvas</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 relative z-10">
            <div className="max-w-3xl">
              <h1 className="serif text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Malawi Regional & Parcel Scout
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm font-normal mt-0.5 leading-snug">
                Interactive GIS command center integrating macro climate overlays, Katondo soil profiles, and surveyed parcel markers.
              </p>
            </div>

            {/* Module Tab Switcher */}
            <div className="bg-slate-900/90 border border-white/10 p-1 rounded-2xl flex items-center gap-1 shadow-inner shrink-0">
              <button
                onClick={() => setActiveTab('scout')}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer",
                  activeTab === 'scout'
                    ? "bg-amber-500 text-slate-950 shadow-md font-black border border-amber-300"
                    : "text-slate-300 hover:text-white"
                )}
              >
                <Globe size={13} />
                <span>Scout Map</span>
              </button>

              <button
                onClick={() => setActiveTab('soilScience')}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer",
                  activeTab === 'soilScience'
                    ? "bg-emerald-600 text-white shadow-md font-black border border-emerald-400"
                    : "text-slate-300 hover:text-white"
                )}
              >
                <Sprout size={13} />
                <span>Soil Guide</span>
              </button>
            </div>
          </div>
        </header>
      ) : (
        /* Minimized Header Bar when in full map mode */
        <div className="w-full flex items-center justify-between bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold serif text-sm">Malawi Scout GIS</span>
            <span className="text-slate-400 text-[10px] hidden sm:inline">• Full Immersive Canvas Mode</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('soilScience')}
              className="text-slate-300 hover:text-white px-2 py-0.5 rounded text-xs flex items-center gap-1"
            >
              <Sprout size={12} className="text-emerald-400" />
              <span>Soil Guide</span>
            </button>
            <button
              onClick={() => setIsHeaderCollapsed(false)}
              className="bg-slate-900 text-amber-300 hover:text-white border border-amber-500/30 px-2 py-0.5 rounded text-[11px] flex items-center gap-1 cursor-pointer"
            >
              <Minimize2 size={11} />
              <span>Show Header</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. PRIMARY CONTENT */}
      {activeTab === 'scout' ? (
        <section className="w-full">
          <ScoutingMap 
            initialRegionId={initialRegionParam}
            onNavigateSoilScience={() => setActiveTab('soilScience')}
          />
        </section>
      ) : (
        <section className="w-full max-w-7xl mx-auto flex flex-col gap-6">
          <SoilScienceGuide />
        </section>
      )}

    </div>
  );
}
