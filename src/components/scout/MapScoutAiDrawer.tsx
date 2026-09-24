import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Bot, Send, X, ExternalLink, MapPin, 
  Droplets, Sprout, Compass, RefreshCw, ChevronDown, 
  ChevronUp, CheckCircle2, ShieldAlert, ArrowRight, Layers
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { MalawiDistrictSpec } from '@/data/malawiDistrictData';
import { ScoutAiAnalysisResponse, GroundingSource } from '@/types/scoutAi';

interface MapScoutAiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeDistrict: MalawiDistrictSpec | null;
  activeParcelTitle?: string;
  currentCoordinates?: { lat: number; lng: number };
  onFlyToCoordinates?: (lat: number, lng: number) => void;
  activeLayers?: Record<string, boolean>;
  layerInsightsMode?: boolean;
  mapBounds?: { north: number; south: number; east: number; west: number };
  zoomLevel?: number;
}

export function MapScoutAiDrawer({
  isOpen,
  onClose,
  activeDistrict,
  activeParcelTitle,
  currentCoordinates,
  onFlyToCoordinates,
  activeLayers,
  layerInsightsMode = false,
  mapBounds,
  zoomLevel
}: MapScoutAiDrawerProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ScoutAiAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSources, setShowSources] = useState(true);

  // Active layers summary
  const activeLayerEntries = activeLayers ? Object.entries(activeLayers).filter(([_, v]) => Boolean(v)) : [];
  const activeLayerLabels = activeLayerEntries.map(([key]) => {
    switch (key) {
      case 'waterSources': return '💧 Perennial Water';
      case 'arableLand': return '🌱 Arable Katondo Soil';
      case 'communitySettlements': return '⛪ Adventist Outposts & Communities';
      case 'rainfallIsohyets': return '🌧️ Rainfall Isohyets';
      case 'soilPedology': return '🧪 Soil pH Pedology';
      case 'elevationTiers': return '⛰️ Elevation Tiers';
      case 'catchmentBasins': return '🌊 Catchment Basins';
      case 'riftEscarpments': return '⚠️ Rift Escarpments';
      case 'customaryBoundaries': return '📜 Customary Land Malire';
      default: return key;
    }
  });

  // Quick prompt templates
  const quickPrompts = [
    ...(activeLayerEntries.length > 0 ? [{
      label: `✨ Layer Insights (${activeLayerEntries.length} Active)`,
      query: `Analyze current map view data for ${activeDistrict?.name || 'Central Malawi'}. Selected active layers: ${activeLayerLabels.join(', ')}. Provide practical country living recommendations, homestead water security, Katondo arable soil practices, off-grid siting, and community outpost guidance based on these selected layers.`
    }] : []),
    {
      label: '💧 Perennial Water & Streams',
      query: `Analyze perennial water sources, mountain streams, and borehole aquifer depth for country homesteading in ${activeDistrict?.name || 'this district'}.`
    },
    {
      label: '🌱 Katondo Soil & Crops',
      query: `Evaluate soil fertility (pH, Katondo red loam, dambo wetlands) and best organic crops for ${activeDistrict?.name || 'this district'}.`
    },
    {
      label: '⛪ Outposts & Adventist Hubs',
      query: `What are the nearest Seventh-day Adventist churches, rural health clinics, and trading bomas near ${activeDistrict?.name || 'this district'}?`
    },
    {
      label: '🛣️ Road Access & Altitude',
      query: `Examine wet-season road access, elevation/cooling benefits, and flood safety around ${activeDistrict?.name || 'this district'}.`
    }
  ];

  // Auto-run analysis when opening or changing active district if no previous result
  useEffect(() => {
    if (isOpen && !analysisResult && !isLoading) {
      if (layerInsightsMode && activeLayerEntries.length > 0) {
        handleRunQuery(`Analyze current map view data for ${activeDistrict?.name || 'Central Malawi'}. Selected active layers: ${activeLayerLabels.join(', ')}. Provide practical country living recommendations, homestead water security, Katondo arable soil practices, off-grid siting, and community outpost guidance based on these selected layers.`);
      } else {
        handleRunQuery(`Provide a comprehensive geospatial outpost suitability analysis for ${activeDistrict?.name || 'Dedza'} District, evaluating water security, Katondo soil, elevation advantages, and road access.`);
      }
    }
  }, [isOpen, activeDistrict?.name, layerInsightsMode]);

  const handleRunQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsLoading(true);
    setError(null);

    const lat = currentCoordinates?.lat ?? activeDistrict?.centroid?.[0] ?? -14.38;
    const lng = currentCoordinates?.lng ?? activeDistrict?.centroid?.[1] ?? 34.33;

    try {
      const response = await fetch('/api/scout-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryText,
          district: activeDistrict?.name,
          region: activeDistrict?.region,
          altitude: activeDistrict?.elevationRange,
          coordinates: {
            latitude: lat,
            longitude: lng
          },
          selectedAmenities: activeDistrict?.topCrops,
          activeLayers,
          mapBounds,
          zoomLevel,
          layerInsightsMode
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data: ScoutAiAnalysisResponse = await response.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error('Failed to run AI Scout query:', err);
      setError(err?.message || 'Failed to analyze location with AI Scout');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    const q = prompt;
    setPrompt('');
    handleRunQuery(q);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] md:w-[520px] bg-slate-950/98 backdrop-blur-2xl border-l border-emerald-500/30 shadow-2xl flex flex-col font-sans text-slate-200"
      id="map-scout-ai-drawer"
    >
      {/* Drawer Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/80 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-md">
            <Bot size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="serif font-bold text-sm text-white tracking-wide">
                AI Map Scout
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 flex items-center gap-1">
                <Sparkles size={9} />
                <span>Maps Grounded</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans truncate">
              {activeDistrict ? `${activeDistrict.name} District (${activeDistrict.region})` : 'Malawi Geospatial Intelligence'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handleRunQuery(`Re-analyze ${activeDistrict?.name || 'this location'} with updated geospatial factors and road accessibility.`)}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 cursor-pointer"
            title="Refresh analysis"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin text-emerald-400" : ""} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close AI Scout"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        
        {/* Active Context Banner */}
        <div className="bg-slate-900/80 border border-emerald-500/20 rounded-xl p-2.5 flex items-center justify-between gap-2 text-slate-300">
          <div className="flex items-center gap-2 truncate">
            <MapPin size={13} className="text-emerald-400 shrink-0" />
            <span className="font-semibold text-white truncate">
              {activeParcelTitle ? activeParcelTitle : `${activeDistrict?.name || 'Dedza'} • ${activeDistrict?.elevationRange || 'Highland'}`}
            </span>
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
              ({(currentCoordinates?.lat ?? activeDistrict?.centroid?.[0] ?? -14.38).toFixed(3)}, {(currentCoordinates?.lng ?? activeDistrict?.centroid?.[1] ?? 34.33).toFixed(3)})
            </span>
          </div>

          {onFlyToCoordinates && (
            <button
              onClick={() => {
                const lat = currentCoordinates?.lat ?? activeDistrict?.centroid?.[0] ?? -14.38;
                const lng = currentCoordinates?.lng ?? activeDistrict?.centroid?.[1] ?? 34.33;
                onFlyToCoordinates(lat, lng);
              }}
              className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 underline shrink-0 cursor-pointer"
            >
              Recenter
            </button>
          )}
        </div>

        {/* Active Layer Pills */}
        {activeLayerEntries.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-slate-900/50 border border-white/5">
            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Layers size={11} className="text-emerald-400" />
              <span>Active Layers:</span>
            </span>
            {activeLayerLabels.map((lbl, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 font-mono text-[10px] shadow-2xs">
                {lbl}
              </span>
            ))}
          </div>
        )}

        {/* Quick Question Chips */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Scouting Inquiries
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {quickPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleRunQuery(item.query)}
                disabled={isLoading}
                className="text-left p-2 rounded-lg bg-slate-900/60 hover:bg-emerald-950/40 border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all text-[11px] leading-tight cursor-pointer disabled:opacity-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">Querying Gemini 3.8 Flash & Google Maps...</span>
              <span className="text-slate-400 text-[11px]">Evaluating catchment hydrology, soil latosols, and local infrastructure</span>
            </div>
          </div>
        )}

        {/* Error Notice */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
            <ShieldAlert size={15} className="text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* AI Analysis Body */}
        {analysisResult && (
          <div className="space-y-4">
            
            {/* Grounding Attribution Badge */}
            <div className="flex items-center justify-between bg-slate-900/90 border border-white/10 rounded-xl px-3 py-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-emerald-300 font-semibold">
                  {analysisResult.model}
                </span>
                <span className="text-slate-400">• Google Maps Grounded</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {analysisResult.groundingSources?.length || 0} Sources
              </span>
            </div>

            {/* Markdown Text Response */}
            <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/10 text-slate-200 leading-relaxed space-y-2.5 prose-invert prose-xs max-w-none">
              <ReactMarkdown
                components={{
                  h3: ({ node, ...props }) => <h3 className="serif font-bold text-sm text-emerald-300 mt-2 mb-1 border-b border-emerald-500/20 pb-1" {...props} />,
                  h4: ({ node, ...props }) => <h4 className="font-bold text-xs text-amber-300 mt-2 mb-0.5" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 my-1 text-slate-300" {...props} />,
                  li: ({ node, ...props }) => <li className="text-[11px] leading-relaxed" {...props} />,
                  p: ({ node, ...props }) => <p className="text-[11px] my-1 text-slate-200" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />
                }}
              >
                {analysisResult.answer}
              </ReactMarkdown>
            </div>

            {/* Google Maps Grounding Links (MANDATORY per Maps Grounding specs) */}
            {analysisResult.groundingSources && analysisResult.groundingSources.length > 0 && (
              <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3 space-y-2">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setShowSources(prev => !prev)}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <MapPin size={13} className="text-emerald-400" />
                    <span>Google Maps Grounded Locations & Sources</span>
                  </div>
                  <button className="text-slate-400 hover:text-white">
                    {showSources ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>

                {showSources && (
                  <div className="space-y-1.5 pt-1">
                    {analysisResult.groundingSources.map((source, sIdx) => (
                      <a
                        key={sIdx}
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-950/80 hover:bg-emerald-950/30 border border-white/10 hover:border-emerald-500/40 text-emerald-300 hover:text-emerald-200 transition-colors group"
                      >
                        <div className="min-w-0">
                          <div className="font-medium text-[11px] truncate flex items-center gap-1.5">
                            <span className="text-[9px] uppercase px-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                              {source.sourceType}
                            </span>
                            <span className="truncate">{source.title || 'View on Google Maps'}</span>
                          </div>
                          {source.snippet && (
                            <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 font-sans">
                              {source.snippet}
                            </p>
                          )}
                        </div>
                        <ExternalLink size={12} className="text-slate-400 group-hover:text-emerald-300 shrink-0 mt-0.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Suggested Follow-Up Actions */}
            {analysisResult.suggestedActions && analysisResult.suggestedActions.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Suggested Investigations
                </span>
                <div className="space-y-1">
                  {analysisResult.suggestedActions.map((action, aIdx) => (
                    <button
                      key={aIdx}
                      onClick={() => handleRunQuery(action)}
                      disabled={isLoading}
                      className="w-full text-left p-2 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-white/5 hover:border-emerald-500/30 text-slate-300 hover:text-white transition-all text-[11px] flex items-center justify-between gap-2 group cursor-pointer"
                    >
                      <span className="truncate">{action}</span>
                      <ArrowRight size={12} className="text-slate-500 group-hover:text-emerald-400 shrink-0 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Input Dock */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-900/95 border-t border-white/10 flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Ask AI Scout about ${activeDistrict?.name || 'this area'}...`}
          disabled={isLoading}
          className="flex-1 bg-slate-950 border border-white/15 focus:border-emerald-400 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center disabled:opacity-40 disabled:hover:bg-emerald-600 transition-colors shrink-0 shadow-md cursor-pointer"
          title="Send query"
        >
          <Send size={14} />
        </button>
      </form>

    </motion.div>
  );
}
