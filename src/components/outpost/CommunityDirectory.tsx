import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, MapPin, Search, Filter, Plus, 
  CheckCircle2, HeartHandshake, Sprout, Hammer, 
  Sun, Stethoscope, Sparkles, Phone, Mail, X
} from 'lucide-react';
import { 
  COMMUNITY_DIRECTORY_ENTRIES, 
  CommunityDirectoryEntry 
} from '@/data/outpostFourPillarsData';
import { cn } from '@/lib/utils';

export function CommunityDirectory({ className }: { className?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Local user additions stored in localStorage
  const [userEntries, setUserEntries] = useState<CommunityDirectoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem('outpost_community_entries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Form state for adding an entry
  const [formData, setFormData] = useState({
    title: '',
    contactPerson: '',
    district: 'Dedza',
    region: 'Central' as 'Central' | 'Northern' | 'Southern',
    primaryRole: 'Seed Savers' as CommunityDirectoryEntry['primaryRole'],
    description: '',
    offerings: '',
    locationHint: '',
    contactChannel: ''
  });

  const roles: string[] = [
    'All',
    'Seed Savers',
    'Organic Growers',
    'Natural Builders',
    'Water & Solar',
    'Health & Lifestyle',
    'Country Fellowship'
  ];

  const allEntries = useMemo(() => {
    return [...userEntries, ...COMMUNITY_DIRECTORY_ENTRIES];
  }, [userEntries]);

  const filteredEntries = useMemo(() => {
    return allEntries.filter((entry) => {
      const matchesSearch = 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.offeringsOrNeeds.some(o => o.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRole = selectedRole === 'All' || entry.primaryRole === selectedRole;
      const matchesRegion = selectedRegion === 'All' || entry.region === selectedRegion;

      return matchesSearch && matchesRole && matchesRegion;
    });
  }, [allEntries, searchQuery, selectedRole, selectedRegion]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.contactPerson) return;

    const newEntry: CommunityDirectoryEntry = {
      id: `user-${Date.now()}`,
      title: formData.title,
      contactPerson: formData.contactPerson,
      district: formData.district,
      region: formData.region,
      primaryRole: formData.primaryRole,
      description: formData.description || 'Fellow homesteader seeking local connection and collaboration.',
      offeringsOrNeeds: formData.offerings ? formData.offerings.split('\n').filter(Boolean) : ['Inquire for details'],
      locationHint: formData.locationHint || `${formData.district} District`,
      contactChannel: formData.contactChannel || 'Local Adventist Church fellowship'
    };

    const updated = [newEntry, ...userEntries];
    setUserEntries(updated);
    try {
      localStorage.setItem('outpost_community_entries', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setShowAddModal(false);
    setFormData({
      title: '',
      contactPerson: '',
      district: 'Dedza',
      region: 'Central',
      primaryRole: 'Seed Savers',
      description: '',
      offerings: '',
      locationHint: '',
      contactChannel: ''
    });
  };

  const handleDeleteUserEntry = (id: string) => {
    const updated = userEntries.filter((e) => e.id !== id);
    setUserEntries(updated);
    try {
      localStorage.setItem('outpost_community_entries', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <section 
      id="community-directory"
      aria-label="Country Living Community Directory"
      className={cn("flex flex-col gap-6", className)}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-emerald-900/40">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider text-emerald-800 dark:text-amber-300 uppercase bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-md">
              Pillar 4 Fellowship
            </span>
            <span className="text-stone-300 dark:text-stone-600">•</span>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">Mutual Aid & Sacred Fellowship</span>
          </div>
          <h2 className="serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 mt-1">
            Country Living Community Connection
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-2xl mt-1.5 leading-relaxed">
            Organize and track local seed circles, natural builders, and Seventh-day Adventist country fellowships across Malawi.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 dark:bg-emerald-700 hover:bg-emerald-900 dark:hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <Plus size={15} />
          <span>Add Personal Contact / Circle</span>
        </button>
      </div>

      {/* Transparency Notice on Template Examples vs Personal Contacts */}
      <div className="rounded-2xl border border-amber-300/70 dark:border-amber-700/40 bg-amber-50/70 dark:bg-amber-950/25 px-4 py-3 text-xs text-stone-700 dark:text-stone-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className="leading-relaxed">
          <strong className="font-bold text-amber-900 dark:text-amber-300">Directory Data Notice:</strong>{' '}
          The 6 pre-loaded cards marked <span className="font-mono font-semibold text-amber-900 dark:text-amber-300">[Illustrative Template]</span> show how regional guilds can be structured across Malawi. Contacts you add via <strong>Add Personal Contact / Circle</strong> are saved privately to your device vault ({userEntries.length} personal {userEntries.length === 1 ? 'entry' : 'entries'} saved).
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF8F5] dark:bg-[#0E1D14] border border-stone-200/90 dark:border-emerald-900/60 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by district, skill, contact, or seed type..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] focus:outline-none focus:ring-2 focus:ring-emerald-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500"
          />
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['All', 'Central', 'Northern', 'Southern'] as const).map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => setSelectedRegion(reg)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer",
                selectedRegion === reg
                  ? "bg-emerald-800 dark:bg-emerald-700 text-white font-semibold"
                  : "bg-white dark:bg-[#14281D] border border-stone-200 dark:border-emerald-900/60 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-emerald-950/60"
              )}
            >
              {reg === 'All' ? 'All Malawi' : `${reg} Region`}
            </button>
          ))}
        </div>
      </div>

      {/* Role Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => setSelectedRole(role)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border transition-all cursor-pointer",
              selectedRole === role
                ? "bg-emerald-900 dark:bg-emerald-800 text-white border-emerald-950 dark:border-emerald-700 font-semibold shadow-xs"
                : "bg-white dark:bg-[#0E1D14] text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-emerald-950/60 border-stone-200 dark:border-emerald-900/60"
            )}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-2xl border border-stone-200/90 dark:border-emerald-900/60 bg-white dark:bg-[#0E1D14] p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-xs hover:border-stone-400/80 dark:hover:border-emerald-700/80 transition-all"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-caption font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      {entry.primaryRole}
                    </span>
                    {entry.isTemplateExample ? (
                      <span className="text-caption font-mono font-semibold text-amber-900 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/60 px-1.5 py-0.5 rounded">
                        Illustrative Template
                      </span>
                    ) : (
                      <span className="text-caption font-mono font-semibold text-emerald-900 dark:text-emerald-200 bg-emerald-100/80 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded">
                        Saved Contact
                      </span>
                    )}
                    <span className="text-stone-300 dark:text-stone-600">•</span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {entry.district} ({entry.region})
                    </span>
                  </div>
                  <h3 className="serif text-lg font-bold text-stone-900 dark:text-stone-50 mt-1">
                    {entry.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {!entry.isTemplateExample && (
                    <button
                      type="button"
                      onClick={() => handleDeleteUserEntry(entry.id)}
                      title="Remove saved contact"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  )}
                  <div className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center shrink-0">
                    {entry.primaryRole === 'Seed Savers' && <Sprout size={16} className="text-emerald-700 dark:text-emerald-400" />}
                    {entry.primaryRole === 'Organic Growers' && <Sprout size={16} className="text-emerald-700 dark:text-emerald-400" />}
                    {entry.primaryRole === 'Natural Builders' && <Hammer size={16} className="text-amber-700 dark:text-amber-400" />}
                    {entry.primaryRole === 'Water & Solar' && <Sun size={16} className="text-amber-600 dark:text-amber-400" />}
                    {entry.primaryRole === 'Health & Lifestyle' && <Stethoscope size={16} className="text-sky-700 dark:text-sky-400" />}
                    {entry.primaryRole === 'Country Fellowship' && <Users size={16} className="text-emerald-800 dark:text-emerald-400" />}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {entry.description}
              </p>

              {/* Offerings & Needs */}
              <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#14281D] border border-stone-200/80 dark:border-emerald-900/60 flex flex-col gap-1.5 text-xs">
                <span className="text-caption uppercase font-bold text-stone-500 dark:text-stone-400">
                  Shared Offerings & Needs:
                </span>
                <ul className="flex flex-col gap-1">
                  {entry.offeringsOrNeeds.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-stone-700 dark:text-stone-300 leading-relaxed text-xs">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact & Location Footer */}
            <div className="pt-3 border-t border-stone-100 dark:border-emerald-900/40 flex flex-col gap-1.5 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-1.5 font-medium text-stone-800 dark:text-stone-200">
                <MapPin size={13} className="text-emerald-800 dark:text-emerald-400 shrink-0" />
                <span className="truncate">{entry.locationHint}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 text-xs">
                <HeartHandshake size={13} className="text-amber-800 dark:text-amber-400 shrink-0" />
                <span className="truncate">{entry.contactPerson} • {entry.contactChannel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Entry Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#0E1D14] border border-stone-200 dark:border-emerald-900/60 p-6 sm:p-8 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto text-stone-900 dark:text-stone-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-emerald-900/40">
                <div>
                  <span className="text-caption font-bold uppercase tracking-wider text-emerald-800 dark:text-amber-300">
                    Community Registry
                  </span>
                  <h3 className="serif text-xl font-bold text-stone-900 dark:text-stone-50">
                    Register Your Homestead or Circle
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-emerald-950/60 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="flex flex-col gap-4 text-xs">
                <div>
                  <label className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">
                    Homestead, Fellowship, or Circle Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Dedza Highland Seed Savers or Mchinji Family Retreat"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">Contact Person:</label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Brother/Sister Name"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">District:</label>
                    <input
                      type="text"
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="e.g. Dedza, Zomba, Rumphi"
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">Region:</label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    >
                      <option value="Central">Central Region</option>
                      <option value="Northern">Northern Region</option>
                      <option value="Southern">Southern Region</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">Primary Role:</label>
                    <select
                      value={formData.primaryRole}
                      onChange={(e) => setFormData({ ...formData, primaryRole: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    >
                      <option value="Seed Savers">Seed Savers</option>
                      <option value="Organic Growers">Organic Growers</option>
                      <option value="Natural Builders">Natural Builders</option>
                      <option value="Water & Solar">Water & Solar</option>
                      <option value="Health & Lifestyle">Health & Lifestyle</option>
                      <option value="Country Fellowship">Country Fellowship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">
                    Brief Description of Homestead or Ministry:
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your property, crops, trades, or what fellowship you offer..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">
                    Offerings or Needs (one per line):
                  </label>
                  <textarea
                    rows={2}
                    value={formData.offerings}
                    onChange={(e) => setFormData({ ...formData, offerings: e.target.value })}
                    placeholder="e.g.&#10;Offer: Heirloom bean seeds&#10;Need: Experienced solar installer"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-800 dark:text-stone-200 block mb-1">
                    Contact Channel or Sabbath Fellowship hint:
                  </label>
                  <input
                    type="text"
                    value={formData.contactChannel}
                    onChange={(e) => setFormData({ ...formData, contactChannel: e.target.value })}
                    placeholder="e.g. Meets for Sabbath worship at Linthipe, or WhatsApp / phone"
                    className="w-full p-2.5 rounded-xl border border-stone-300 dark:border-emerald-900/60 bg-white dark:bg-[#14281D] text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100 dark:border-emerald-900/40">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-emerald-950/60 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold cursor-pointer"
                  >
                    Save to Directory
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
