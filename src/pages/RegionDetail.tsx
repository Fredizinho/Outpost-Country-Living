import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, Bookmark, BookmarkCheck, Plus, Trash2, HardDrive } from 'lucide-react';
import { getCachedRegions, toggleOfflineBookmark, isItemBookmarked, getOfflineFieldNotes, saveOfflineFieldNote, deleteOfflineFieldNote, OfflineFieldNote } from '@/lib/offlineStorage';
import { cn } from '@/lib/utils';
import DetachedRegionMap from '@/components/map/DetachedRegionMap';
import { DetachedRegionId } from '@/data/malawiRegionalDetailData';

function getDetachedRegionId(id: string): DetachedRegionId {
  const lower = (id || '').toLowerCase();
  if (lower.includes('north')) return 'northern';
  if (lower.includes('south')) return 'southern';
  return 'central';
}

export default function RegionDetail() {
  const { id } = useParams<{ id: string }>();
  const regions = getCachedRegions();

  const region = regions.find(r => r.id === id);

  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [notes, setNotes] = useState<OfflineFieldNote[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showNoteForm, setShowNoteForm] = useState(false);

  useEffect(() => {
    if (id) {
      setBookmarked(isItemBookmarked(id, 'region'));
      setNotes(getOfflineFieldNotes(id));
    }
  }, [id]);

  if (!region) {
    return (
      <div className="px-6 py-20 text-center flex flex-col items-center gap-4">
        <h2 className="serif text-3xl font-bold text-emerald-950">Region Not Found</h2>
        <p className="text-slate-600 text-sm">The requested geographic zone is not in our database.</p>
        <Link to="/regions" className="bg-emerald-800 text-white px-6 py-3 rounded-2xl text-xs font-bold uppercase">
          Back to Regional Map
        </Link>
      </div>
    );
  }

  const handleBookmarkToggle = () => {
    const isNowBookmarked = toggleOfflineBookmark({
      id: region.id,
      type: 'region',
      title: region.name
    });
    setBookmarked(isNowBookmarked);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    saveOfflineFieldNote(region.id, newNoteTitle, newNoteContent);
    setNotes(getOfflineFieldNotes(region.id));
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowNoteForm(false);
  };

  const handleDeleteNote = (noteId: string) => {
    deleteOfflineFieldNote(noteId);
    setNotes(getOfflineFieldNotes(region.id));
  };

  return (
    <div className="px-6 md:px-12 py-10 max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Link
          to="/regions"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-800 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Regional Map
        </Link>

        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
          <HardDrive size={10} /> Saved Offline
        </span>
      </div>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              Outpost Feasibility: {region.outpostFeasibility}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Altitude: {region.altitude}
            </span>
          </div>

          <button
            onClick={handleBookmarkToggle}
            className={cn(
              "px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition-all shadow-md active:scale-95",
              bookmarked
                ? "bg-terracotta-600 text-white border-terracotta-700"
                : "bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-50"
            )}
          >
            {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {bookmarked ? 'Saved to Offline Bookmarks' : 'Save Region Offline'}
          </button>
        </div>

        <h1 className="serif text-4xl md:text-5xl font-bold text-emerald-950">
          {region.name}
        </h1>

        <p className="text-slate-700 text-base font-semibold leading-relaxed">
          {region.tagline}
        </p>
      </header>

      {/* Detached Regional Vector Map with 8 Geographic Layers */}
      <section className="flex flex-col gap-4">
        <DetachedRegionMap
          regionId={getDetachedRegionId(region.id)}
        />
      </section>

      {/* Description */}
      <section className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-lg leading-relaxed text-sm text-slate-800 font-medium">
        {region.description}
      </section>

      {/* Key Districts & Environmental Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] shadow-xl flex flex-col gap-4">
          <h3 className="serif text-2xl font-bold text-emerald-100">Key Scouting Districts</h3>
          <div className="flex flex-wrap gap-2">
            {region.keyDistricts.map((d, i) => (
              <span key={i} className="bg-emerald-800 text-white border border-emerald-700 px-4 py-2 rounded-xl text-xs font-bold">
                {d}
              </span>
            ))}
          </div>
          <p className="text-xs text-emerald-200/80 mt-2 font-medium">
            Water Sources: {region.waterSources}
          </p>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-lg flex flex-col gap-4">
          <h3 className="serif text-2xl font-bold text-emerald-950">Primary Agricultural Crops</h3>
          <div className="flex flex-wrap gap-2">
            {region.topCrops.map((crop, i) => (
              <span key={i} className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-800 shadow-sm">
                {crop}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations & Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-lg flex flex-col gap-4">
          <h3 className="serif text-2xl font-bold text-emerald-950 flex items-center gap-2">
            <Lightbulb size={22} className="text-emerald-700" /> Strategic Recommendations
          </h3>
          <ul className="flex flex-col gap-3">
            {region.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-lg flex flex-col gap-4">
          <h3 className="serif text-2xl font-bold text-emerald-950 flex items-center gap-2">
            <AlertTriangle size={22} className="text-amber-600" /> Regional Factors to Mitigate
          </h3>
          <ul className="flex flex-col gap-3">
            {region.challenges.map((ch, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>{ch}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scouting Field Notes Section */}
      <section className="bg-white/40 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] border border-white/60 shadow-lg flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="serif text-2xl font-bold text-emerald-950">
              Offline Regional Scouting Notes
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Record local land prices per acre, chief contacts, water table depth findings, or soil tests.
            </p>
          </div>
          <button
            onClick={() => setShowNoteForm(!showNoteForm)}
            className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Plus size={14} /> Add Scouting Note
          </button>
        </div>

        {showNoteForm && (
          <form onSubmit={handleAddNote} className="bg-white/80 p-5 rounded-2xl border border-slate-200 flex flex-col gap-3 shadow-inner">
            <input
              type="text"
              placeholder="Note Title (e.g. Kasungu Bua River land inspection)"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="bg-white px-4 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 ring-emerald-500"
            />
            <textarea
              placeholder="Inspection details, price per acre in MK, village chief agreement notes..."
              rows={3}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              className="bg-white p-4 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 ring-emerald-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNoteForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-emerald-700"
              >
                Save Scouting Note Offline
              </button>
            </div>
          </form>
        )}

        {notes.length === 0 ? (
          <p className="text-xs text-slate-500 italic bg-white/50 p-4 rounded-2xl border border-white/60">
            No offline scouting notes logged for this region yet. Click "Add Scouting Note" above when visiting this area.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-white/90 p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between gap-2">
                <div>
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-emerald-950">{note.title}</h5>
                    <span className="text-[9px] text-slate-400 font-medium">{note.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium whitespace-pre-wrap">{note.content}</p>
                </div>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="self-end text-rose-600 hover:text-rose-800 text-[10px] font-bold uppercase flex items-center gap-1 pt-2"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
