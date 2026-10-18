import React, { useState } from 'react';
import { ScoutingMap } from '@/components/scout/ScoutingMap';
import { DesktopDistrictMapScreen } from '@/components/scout/DesktopDistrictMapScreen';
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
  const [viewMode, setViewMode] = useState<'map' | 'gis' | 'list'>('map');

  const handleTabChange = (tab: LandHubTab) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('tab', tab);
      return next;
    });
  };

  return (
    <div className="w-full h-full relative flex flex-col text-[#1F2A22] bg-[#F6F1E7] font-chrome" id="malawi-regional-parcel-scout-module">
      {/* Primary Tab Content */}
      {activeTab === 'scout' && (
        <section className="w-full h-full flex-1">
          {viewMode === 'map' ? (
            <DesktopDistrictMapScreen
              onToggleFullGis={() => setViewMode('gis')}
              onOpenSoilScience={() => handleTabChange('soilScience')}
              onOpenComparison={() => handleTabChange('comparison')}
            />
          ) : (
            <div className="w-full h-full relative">
              <ConsolidatedMapHeaderIsland
                activeTab={activeTab}
                onTabChange={handleTabChange}
                isFullCanvas={isFullCanvas}
                onToggleFullCanvas={() => setIsFullCanvas(prev => !prev)}
                viewMode={viewMode === 'list' ? 'list' : 'map'}
                onToggleViewMode={() => setViewMode(prev => prev === 'gis' ? 'list' : 'gis')}
              />
              <ScoutingMap 
                initialRegionId={initialRegionParam}
                initialViewMode={viewMode === 'list' ? 'list' : 'map'}
                onNavigateSoilScience={() => handleTabChange('soilScience')}
                onNavigateComparison={() => handleTabChange('comparison')}
              />
            </div>
          )}
        </section>
      )}

      {activeTab === 'parcels' && (
        <section className="w-full h-full flex-1">
          <ConsolidatedMapHeaderIsland
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isFullCanvas={isFullCanvas}
            onToggleFullCanvas={() => setIsFullCanvas(prev => !prev)}
            viewMode="list"
            onToggleViewMode={() => setViewMode(prev => prev === 'gis' ? 'list' : 'gis')}
          />
          <ScoutingMap 
            initialRegionId={initialRegionParam}
            initialViewMode="list"
            onNavigateSoilScience={() => handleTabChange('soilScience')}
            onNavigateComparison={() => handleTabChange('comparison')}
          />
        </section>
      )}

      {activeTab === 'comparison' && (
        <section className="w-full max-w-7xl mx-auto pt-8 px-4 sm:px-6 pb-8 flex flex-col gap-4">
          <div className="bg-[#FFFDF8] border border-[#E4DCCB] rounded-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[#1F2A22] shadow-2xs">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1F2A22]">District Comparative Analytics</h2>
              <p className="text-xs text-[#5A6458] mt-1">
                Compare population density per km², rainfall gradients, and aquifer drill depth metrics across all 28 districts of Malawi.
              </p>
            </div>
            <button
              onClick={() => handleTabChange('scout')}
              className="px-3.5 py-1.5 rounded-control bg-[#FFFDF8] hover:bg-[#F6F1E7] border border-[#E4DCCB] text-[#1F2A22] font-chrome font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
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
        <section className="w-full max-w-7xl mx-auto pt-8 px-4 sm:px-6 pb-8 flex flex-col gap-6">
          <div className="flex justify-end">
            <button
              onClick={() => handleTabChange('scout')}
              className="px-3.5 py-1.5 rounded-control bg-[#FFFDF8] hover:bg-[#F6F1E7] border border-[#E4DCCB] text-[#1F2A22] font-chrome font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
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
