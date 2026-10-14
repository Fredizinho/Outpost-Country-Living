import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Users, Calendar, Sparkles, Check, ArrowRight, ArrowLeft, X, Layers, Sun, CloudRain, Wheat, Compass } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export function OnboardingWizard({ isOpen, onClose, onComplete }: OnboardingWizardProps) {
  const { user, updateProfile } = useAuth();

  const [stepIndex, setStepIndex] = useState(0);

  // Core setup states initialized from active user profile
  const [district, setDistrict] = useState(user?.district || 'Dedza');
  const [region, setRegion] = useState(user?.region || 'Central');
  const [familyMembers, setFamilyMembers] = useState<number>(user?.familyMembers || 4);
  const [landSizeAcres, setLandSizeAcres] = useState<number>(user?.landSizeAcres || 2.5);
  const [currentSeason, setCurrentSeason] = useState<string>(user?.currentSeason || 'Rainy Planting');

  if (!isOpen) return null;

  const totalSteps = 4;

  const districtPresets = [
    { name: 'Dedza', region: 'Central' },
    { name: 'Mzimba', region: 'Northern' },
    { name: 'Zomba', region: 'Southern' },
    { name: 'Lilongwe', region: 'Central' },
    { name: 'Blantyre', region: 'Southern' },
    { name: 'Mzuzu', region: 'Northern' },
    { name: 'Mulanje', region: 'Southern' },
    { name: 'Kasungu', region: 'Central' },
  ];

  const seasonOptions = [
    {
      id: 'Rainy Planting',
      label: 'Rainy Planting Season',
      months: 'Nov – Mar',
      desc: 'High precipitation, main grain crop sowing, weed & disease management',
      icon: CloudRain,
      accent: 'text-sky-600 bg-sky-50 border-sky-200'
    },
    {
      id: 'Harvest & Storage',
      label: 'Harvest & Post-Harvest Storage',
      months: 'Apr – Jun',
      desc: 'Grain drying, crib fortification, pest fumigation, seed selection',
      icon: Wheat,
      accent: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    {
      id: 'Cold Dry Season',
      label: 'Cold Dry Season (Winter)',
      months: 'Jul – Aug',
      desc: 'Dimba valley gardening, wheat, potatoes, solar food dehydration',
      icon: Layers,
      accent: 'text-cyan-700 bg-cyan-50 border-cyan-200'
    },
    {
      id: 'Hot Dry Preparation',
      label: 'Hot Dry Land Prep',
      months: 'Sep – Oct',
      desc: 'Tillage, ridge making, manure application, solar water pump setup',
      icon: Sun,
      accent: 'text-orange-700 bg-orange-50 border-orange-200'
    }
  ];

  const handleNext = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(prev => prev - 1);
    }
  };

  const handleFinish = async () => {
    const householdSizeLabel = `${familyMembers} Member${familyMembers > 1 ? 's' : ''}`;
    await updateProfile({
      district,
      region,
      familyMembers,
      householdSize: householdSizeLabel,
      landSizeAcres,
      currentSeason,
      onboardingCompleted: true,
    });

    if (onComplete) onComplete();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-emerald-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-9 max-w-2xl w-full shadow-2xl border border-emerald-100 flex flex-col gap-6 relative overflow-hidden"
        >
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-50/70 rounded-full -mr-20 -mt-20 pointer-events-none" />

          {/* Top Header Row */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-900 text-white text-caption font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <Sparkles size={13} className="text-amber-300" /> One-Time Setup Profile
              </span>
              <span className="text-slate-400 text-xs font-bold">
                Step {stepIndex + 1} of {totalSteps}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              title="Close Setup"
            >
              <X size={18} />
            </button>
          </div>

          {/* Live Context Badge (Notion / Linear Style) */}
          <div className="bg-emerald-950 text-white p-3.5 rounded-2xl border border-emerald-800 flex items-center justify-between text-xs relative z-10 shadow-inner">
            <div className="flex items-center gap-2 truncate">
              <Compass size={15} className="text-amber-400 shrink-0" />
              <span className="font-bold text-emerald-100 truncate">
                Active Setup: <strong className="text-white">{district} ({region})</strong> • <strong className="text-amber-300">{familyMembers} Members</strong> • <strong className="text-emerald-300">{landSizeAcres} Acres</strong> • <strong className="text-sky-300">{currentSeason}</strong>
              </span>
            </div>
            <span className="text-caption font-black uppercase text-emerald-400/80 shrink-0 hidden sm:inline-block">
              Compounding Context
            </span>
          </div>

          {/* Progress Indicator */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative z-10">
            <motion.div
              className="bg-gradient-to-r from-emerald-600 to-amber-500 h-full rounded-full"
              initial={{ width: `${((stepIndex) / totalSteps) * 100}%` }}
              animate={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Step Content */}
          <div className="min-h-[290px] flex flex-col justify-center relative z-10 py-1">
            {/* Step 1: Region & District */}
            {stepIndex === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-900 shrink-0 shadow-xs border border-emerald-200">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="serif text-2xl font-bold text-emerald-950">1. Target Region & District</h3>
                    <p className="text-slate-500 text-xs font-medium">Weather, soil strata, and district crop guides will lock onto this location.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                  <div>
                    <label className="block text-caption font-black uppercase tracking-wider text-slate-500 mb-1.5">
                      Malawi Region
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Central">Central Region (Highlands & Plateau)</option>
                      <option value="Northern">Northern Region (Plateau & Lakeshore)</option>
                      <option value="Southern">Southern Region (Massif & Shire Valley)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-caption font-black uppercase tracking-wider text-slate-500 mb-1.5">
                      Target District / Area
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="e.g. Dedza, Mzimba, Zomba, Lilongwe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-caption font-black uppercase tracking-wider text-slate-400 block mb-2">
                    Quick District Presets
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {districtPresets.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          setDistrict(preset.name);
                          setRegion(preset.region);
                        }}
                        className={cn(
                          "text-xs font-bold px-3.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5",
                          district === preset.name
                            ? "bg-emerald-900 text-white border-emerald-800 shadow-sm"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50"
                        )}
                      >
                        <span>{preset.name}</span>
                        <span className="text-caption opacity-70 font-normal">({preset.region})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Family Size */}
            {stepIndex === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-900 shrink-0 shadow-xs border border-emerald-200">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="serif text-2xl font-bold text-emerald-950">2. Family & Household Size</h3>
                    <p className="text-slate-500 text-xs font-medium">Calculators for grain reserves, solar power, and water intake will scale automatically.</p>
                  </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-200 flex flex-col items-center justify-center gap-4 text-center">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
                    Total Household Members
                  </span>
                  
                  <div className="flex items-center justify-center gap-6">
                    <button
                      type="button"
                      onClick={() => setFamilyMembers(Math.max(1, familyMembers - 1))}
                      className="w-12 h-12 rounded-2xl bg-white border border-emerald-300 text-emerald-900 font-extrabold text-2xl shadow-sm hover:bg-emerald-100 active:scale-95 transition-all flex items-center justify-center"
                    >
                      -
                    </button>
                    
                    <div className="flex flex-col items-center">
                      <span className="serif text-5xl font-extrabold text-emerald-950">
                        {familyMembers}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 mt-1">
                        {familyMembers === 1 ? 'Person' : 'People / Members'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFamilyMembers(familyMembers + 1)}
                      className="w-12 h-12 rounded-2xl bg-white border border-emerald-300 text-emerald-900 font-extrabold text-2xl shadow-sm hover:bg-emerald-100 active:scale-95 transition-all flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 w-full max-w-sm mt-2">
                    {[2, 4, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFamilyMembers(num)}
                        className={cn(
                          "py-2 rounded-xl text-xs font-bold border transition-all",
                          familyMembers === num
                            ? "bg-emerald-900 text-white border-emerald-800 shadow-xs"
                            : "bg-white text-slate-700 border-emerald-200 hover:bg-emerald-100"
                        )}
                      >
                        {num} Members
                      </button>
                    ))}
                  </div>

                  <p className="text-caption text-emerald-800/80 font-medium">
                    Estimated annual staple grain requirement: <strong className="text-emerald-950 font-extrabold">{familyMembers * 300} kg</strong> (Maize & Beans)
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Land Size */}
            {stepIndex === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-900 shrink-0 shadow-xs border border-emerald-200">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h3 className="serif text-2xl font-bold text-emerald-950">3. Homestead Land Size</h3>
                    <p className="text-slate-500 text-xs font-medium">Crop yield forecasts and land planning blueprints adjust to your acreage.</p>
                  </div>
                </div>

                <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-200 flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
                      Land Size (Acres)
                    </span>
                    <span className="serif text-3xl font-bold text-emerald-950">
                      {landSizeAcres} <span className="text-sm font-sans text-emerald-700">Acres</span>
                    </span>
                  </div>

                  {/* Range Slider */}
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={landSizeAcres}
                    onChange={(e) => setLandSizeAcres(parseFloat(e.target.value))}
                    className="w-full accent-emerald-800 h-2 bg-emerald-200 rounded-lg cursor-pointer"
                  />

                  {/* Quick Preset Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { size: 0.5, label: '0.5 Acre', desc: 'Compact Yard' },
                      { size: 1.5, label: '1.5 Acres', desc: 'Family Garden' },
                      { size: 2.5, label: '2.5 Acres', desc: 'Standard Outpost' },
                      { size: 5.0, label: '5.0 Acres', desc: 'Full Homestead' },
                    ].map((preset) => (
                      <button
                        key={preset.size}
                        type="button"
                        onClick={() => setLandSizeAcres(preset.size)}
                        className={cn(
                          "p-3 rounded-2xl border text-left transition-all flex flex-col gap-0.5",
                          landSizeAcres === preset.size
                            ? "bg-emerald-900 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/20"
                            : "bg-white text-slate-800 border-emerald-200 hover:bg-emerald-100/60"
                        )}
                      >
                        <span className="font-bold text-xs">{preset.label}</span>
                        <span className={cn("text-caption", landSizeAcres === preset.size ? "text-emerald-200" : "text-slate-500")}>
                          {preset.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Current Season */}
            {stepIndex === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-900 shrink-0 shadow-xs border border-emerald-200">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="serif text-2xl font-bold text-emerald-950">4. Current Season</h3>
                    <p className="text-slate-500 text-xs font-medium">Timely planting calendars and seasonal skill priorities sync to this phase.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                  {seasonOptions.map((opt) => {
                    const IconComp = opt.icon;
                    const isSelected = currentSeason === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setCurrentSeason(opt.id)}
                        className={cn(
                          "p-4 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all relative overflow-hidden",
                          isSelected
                            ? "bg-emerald-900 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500/20"
                            : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={cn("p-1.5 rounded-lg border", isSelected ? "bg-emerald-800 border-emerald-700 text-amber-300" : opt.accent)}>
                              <IconComp size={16} />
                            </div>
                            <span className="font-bold text-xs">{opt.label}</span>
                          </div>
                          <span className={cn("text-caption font-black uppercase px-2 py-0.5 rounded-full border", isSelected ? "bg-emerald-800 text-amber-300 border-emerald-700" : "bg-slate-200 text-slate-700 border-slate-300")}>
                            {opt.months}
                          </span>
                        </div>
                        <p className={cn("text-caption leading-snug", isSelected ? "text-emerald-100/90" : "text-slate-600")}>
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 relative z-10">
            <button
              onClick={handleBack}
              disabled={stepIndex === 0}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2",
                stepIndex === 0
                  ? "opacity-0 pointer-events-none"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <ArrowLeft size={14} /> Back
            </button>

            <button
              onClick={handleNext}
              className="bg-emerald-900 hover:bg-emerald-800 text-white px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              {stepIndex === totalSteps - 1 ? (
                <>
                  <Check size={16} className="text-amber-300" /> Save & Apply Context
                </>
              ) : (
                <>
                  Next Step <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
