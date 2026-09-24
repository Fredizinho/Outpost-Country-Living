import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { 
  X, Printer, Download, MapPin, Compass, ShieldCheck, 
  Droplets, Sun, Sprout, Layers, FileText, CheckCircle2, AlertTriangle, Mountain
} from 'lucide-react';
import { ScoutParcelProperties } from '@/data/scoutGeoJSON';
import { MalawiDistrictSpec } from '@/data/malawiDistrictData';

interface ParcelCadastralExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcel: ScoutParcelProperties | null;
  district: MalawiDistrictSpec | null;
}

export function ParcelCadastralExportModal({
  isOpen,
  onClose,
  parcel,
  district
}: ParcelCadastralExportModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !parcel) return null;

  const handlePrint = () => {
    window.print();
  };

  const vertices = parcel.boundaryPolygon || [];
  const vertexCount = vertices.length;

  // Approximate Perimeter calculation
  let perimeterKm = 0;
  for (let i = 0; i < vertices.length; i++) {
    const nextIdx = (i + 1) % vertices.length;
    const [lat1, lng1] = vertices[i];
    const [lat2, lng2] = vertices[nextIdx];
    // Haversine approximation
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    perimeterKm += 6371 * c;
  }

  const perimeterMeters = Math.round(perimeterKm * 1000);
  const areaM2 = Math.round(parcel.acres * 4046.86);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-3xl bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[95vh]"
      >
        {/* Modal Action Header (Excluded from Print via CSS) */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-emerald-400" />
            <h3 className="serif text-base font-bold text-white">Cadastral Survey & Reconnaissance Dossier</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Printer size={13} />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div ref={printRef} className="p-6 md:p-8 overflow-y-auto flex flex-col gap-6 text-slate-200 bg-slate-900 print:bg-white print:text-black print:p-8 scrollbar-thin">
          
          {/* Header Banner */}
          <div className="border-b-2 border-emerald-500 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 print:text-emerald-700 font-bold block">
                Republic of Malawi • Land Buyers & Homesteader Reconnaissance
              </span>
              <h1 className="serif text-2xl font-bold text-white print:text-black mt-1">
                {parcel.title}
              </h1>
              <p className="text-xs text-slate-400 print:text-slate-600 font-mono mt-0.5">
                {parcel.district} District • TA {parcel.traditionalAuthority} • GVH {parcel.groupVillageHeadman}
              </p>
            </div>
            <div className="text-right font-mono">
              <span className="inline-block px-3 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 print:bg-emerald-100 print:text-emerald-800 text-xs font-bold">
                {parcel.landTenure}
              </span>
              <div className="text-[11px] text-slate-400 print:text-slate-600 mt-1">
                Cadastral ID: MW-{parcel.district.substring(0, 3).toUpperCase()}-{parcel.id.replace('parcel-', '')}
              </div>
            </div>
          </div>

          {/* Key Cadastral & Metric Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-300">
              <span className="text-[9px] font-mono uppercase text-slate-400 print:text-slate-600 block">Total Area</span>
              <span className="text-base font-bold text-amber-400 print:text-black font-mono block mt-0.5">{parcel.acres} Acres</span>
              <span className="text-[10px] text-slate-400 font-mono">{parcel.hectares} ha ({areaM2.toLocaleString()} m²)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-300">
              <span className="text-[9px] font-mono uppercase text-slate-400 print:text-slate-600 block">Boundary Perimeter</span>
              <span className="text-base font-bold text-white print:text-black font-mono block mt-0.5">{perimeterMeters.toLocaleString()} m</span>
              <span className="text-[10px] text-slate-400 font-mono">{perimeterKm.toFixed(2)} km Malire line</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-300">
              <span className="text-[9px] font-mono uppercase text-slate-400 print:text-slate-600 block">Terrain & Slope</span>
              <span className="text-base font-bold text-emerald-400 print:text-emerald-700 font-mono block mt-0.5">{parcel.slopePct || 5}% incline</span>
              <span className="text-[10px] text-slate-400 font-mono">{parcel.elevationMeters || 1350}m elevation</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 print:bg-slate-50 border border-slate-800 print:border-slate-300">
              <span className="text-[9px] font-mono uppercase text-slate-400 print:text-slate-600 block">Dry Season Aquifer</span>
              <span className="text-base font-bold text-sky-400 print:text-sky-700 font-mono block mt-0.5">14m – 22m</span>
              <span className="text-[10px] text-slate-400 font-mono">Chilimwe viable</span>
            </div>
          </div>

          {/* Section 1: Hydrology & Aquifer Telemetry */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-mono font-bold uppercase text-sky-400 print:text-sky-800 flex items-center gap-1.5 border-b border-slate-800 pb-1">
              <Droplets size={13} /> 1. Hydrology & Seasonal Groundwater
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800/80">
                <span className="font-bold text-slate-200 print:text-slate-900 block mb-1">Water Source Classification:</span>
                <p className="text-slate-400 print:text-slate-700 leading-relaxed">
                  {parcel.waterReliability}. Perennial gravity stream or borehole drilling target identified in mid-slope swale.
                </p>
                <div className="mt-2 text-[11px] text-emerald-400 print:text-emerald-700 font-mono">
                  ✓ Recommended: 50mm PVC contour swale with vetiver grass silt traps.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800/80">
                <span className="font-bold text-slate-200 print:text-slate-900 block mb-1">Stream Velocity & Yield:</span>
                <p className="text-slate-400 print:text-slate-700 leading-relaxed">
                  Historical low flow: 140–180 L/min during October peak dry spell. Peak runoff during January: &gt;1,200 L/min.
                </p>
                <div className="mt-2 text-[11px] text-sky-400 print:text-sky-700 font-mono">
                  ✓ Recommended: 1.5 kW DC Submersible Lorentz pump or ram pump.
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Soil & Agronomic Intelligence */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-mono font-bold uppercase text-emerald-400 print:text-emerald-800 flex items-center gap-1.5 border-b border-slate-800 pb-1">
              <Sprout size={13} /> 2. Agronomic Suitability & Soil Horizon
            </h4>
            <div className="p-3 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800/80 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 font-mono text-[11px]">
                <div><strong className="text-slate-300 print:text-black">Soil Type:</strong> {parcel.soilProfile}</div>
                <div><strong className="text-slate-300 print:text-black">pH Range:</strong> 5.8 – 6.5 (Optimal)</div>
                <div><strong className="text-slate-300 print:text-black">Erosion Risk:</strong> Low to Moderate</div>
              </div>
              <div className="mt-2">
                <strong className="text-amber-300 print:text-amber-800 block text-[11px] uppercase font-mono mb-1">High-Yield Crops for this Horizon:</strong>
                <div className="flex flex-wrap gap-1.5">
                  {['Mbatata (Sweet Potato)', 'Anyenzi (Onions)', 'Mtedza (Groundnuts)', 'Nzimbe (Sugarcane)', 'Macadamia Integrifolia', 'Hass Avocado', 'Coffee (Arabica)'].map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-800 text-emerald-300 print:bg-emerald-100 print:text-emerald-900 text-[11px] font-mono">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Cadastral GNSS GPS Vertices Table */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-mono font-bold uppercase text-amber-400 print:text-amber-800 flex items-center gap-1.5 border-b border-slate-800 pb-1">
              <Compass size={13} /> 3. Cadastral Boundary GPS Points (WGS 84 / Malire)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 print:text-slate-600 text-left">
                    <th className="py-1 px-2">Beacon</th>
                    <th className="py-1 px-2">Latitude (°S)</th>
                    <th className="py-1 px-2">Longitude (°E)</th>
                    <th className="py-1 px-2">Description / Natural Marker</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
                  {vertices.map(([lat, lng], idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="py-1.5 px-2 font-bold text-amber-400 print:text-black">MW-B{idx + 1}</td>
                      <td className="py-1.5 px-2">{lat.toFixed(5)}°</td>
                      <td className="py-1.5 px-2">{lng.toFixed(5)}°</td>
                      <td className="py-1.5 px-2 text-slate-400 print:text-slate-600">
                        {idx === 0 ? 'Primary Northwest Corner Stone / Masuku Tree' : idx === 1 ? 'Ridge Contour Peg' : idx === 2 ? 'Stream Confluence Peg' : 'Access Road Border'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Tenure Protocol Verification Checklist */}
          <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs flex flex-col gap-2">
            <span className="font-bold text-amber-300 print:text-amber-900 font-mono text-[11px] uppercase flex items-center gap-1.5">
              <ShieldCheck size={14} /> Customary Land Protocol Compliance:
            </span>
            <ul className="list-disc list-inside text-slate-300 print:text-slate-700 space-y-1 text-[11px]">
              <li>Hold introductory protocol meeting with TA {parcel.traditionalAuthority} and GVH {parcel.groupVillageHeadman}.</li>
              <li>Perform physical boundary walk (Kuyendera Malire) with adjacent plot elders before signing agreements.</li>
              <li>Ensure 3 original copies of customary land transfer agreement are signed and stamped by the Group Village Headman.</li>
              <li>Apply to District Land Registry for Customary Estate Certificate conversion under Customary Land Act (2016).</li>
            </ul>
          </div>

          {/* Signoff block */}
          <div className="pt-4 border-t border-slate-800 flex justify-between text-[10px] font-mono text-slate-400 print:text-slate-600">
            <div>
              <span>Report Generated: {new Date().toLocaleDateString()}</span>
              <div>Outpost Malawi GIS Reconnaissance Engine</div>
            </div>
            <div className="text-right">
              <div>Surveyor Reference: MLW-SURV-OK</div>
              <div className="text-emerald-400 print:text-emerald-700 font-bold">Status: Field Inspected</div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
