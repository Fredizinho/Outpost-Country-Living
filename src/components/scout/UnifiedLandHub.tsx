import React, { useState } from 'react';
import { ScoutingMap } from '@/components/scout/ScoutingMap';
import { SoilScienceGuide } from '@/components/scout/SoilScienceGuide';
import { ResourceDensityBottomSheet } from '@/components/scout/ResourceDensityBottomSheet';
import { ConsolidatedMapHeaderIsland } from '@/components/scout/ConsolidatedMapHeaderIsland';
import { useSearchParams } from 'react-router-dom';
import { Globe } from 'lucide-react';

export type LandHubTab = 'scout' | 'parcels' | 'comparison' | 'soilScience';

export interface UnifiedLandHubProps {
  defaultTab?: LandHubTab;
}

export function UnifiedLandHub({ defaultTab = 'scout' }: UnifiedLandHubProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get('tab') as LandHubTab | null;
  const activeTab = urlTab || defaultTab;
  const initialRegionParam = searchParams.get('region') || undefined;

  const [isFullCanvas, setIsFullCanvas] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const handleTabChange = (tab: LandHubTab) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('tab', tab);
      return next;
    });
  };

  return (
    <div className="w-full h-full relative flex flex-col text-slate-100 font-sans" id="malawi-regional-parcel-scout-module">
      {/* Consolidated Floating Control Island: Merges top navigation bar with map mode toggle dock */}
      <ConsolidatedMapHeaderIsland
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isFullCanvas={isFullCanvas}
        onToggleFullCanvas={() => setIsFullCanvas(prev => !prev)}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(prev => prev === 'map' ? 'list' : 'map')}
      />

      {/* Primary Tab Content */}
      {activeTab === 'scout' && (
        <section className="w-full h-full flex-1">
          <ScoutingMap 
            initialRegionId={initialRegionParam}
            initialViewMode={viewMode}
            onNavigateSoilScience={() => handleTabChange('soilScience')}
            onNavigateComparison={() => handleTabChange('comparison')}
          />
        </section>
      )}

      {activeTab === 'parcels' && (
        <section className="w-full h-full flex-1">
          <ScoutingMap 
            initialRegionId={initialRegionParam}
            initialViewMode="list"
            onNavigateSoilScience={() => handleTabChange('soilScience')}
            onNavigateComparison={() => handleTabChange('comparison')}
          />
        </section>
      )}

      {activeTab === 'comparison' && (
        <section className="w-full max-w-7xl mx-auto pt-16 sm:pt-20 px-3 sm:px-6 pb-8 flex flex-col gap-4">
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-300 backdrop-blur-xl">
            <div>
              <h2 className="serif text-xl font-bold text-white">District Comparative Analytics</h2>
              <p className="text-xs text-slate-400 mt-1">
                Compare population density per km², rainfall gradients, and aquifer drill depth metrics across all 28 districts of Malawi.
              </p>
            </div>
            <button
              onClick={() => handleTabChange('scout')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
            >
              <Globe size={13} />
              <span>Back to Map</span>
            </button>
          </div>

          <ResourceDensityBottomSheet 
            isStandalone={true} 
            defaultExpanded={true} 
          />
        </section>
      )}

      {activeTab === 'soilScience' && (
        <section className="w-full max-w-7xl mx-auto pt-16 sm:pt-20 px-3 sm:px-6 pb-8 flex flex-col gap-6">
          <div className="flex justify-end">
            <button
              onClick={() => handleTabChange('scout')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow"
            >
              <Globe size={13} />
              <span>Back to Map</span>
            </button>
          </div>
          <SoilScienceGuide />
        </section>
      )}
    </div>
  );
}
