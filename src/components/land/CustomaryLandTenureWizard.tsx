import React, { useState } from 'react';
import {
  ShieldCheck,
  MapPin,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Printer,
  Compass,
  Users,
  ChevronRight,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CustomaryLandTenureWizardProps {
  className?: string;
}

interface StepData {
  id: string;
  stageNumber: number;
  title: string;
  chichewaTitle: string;
  summary: string;
  protocolRules: string[];
  documentsRequired: string[];
  commonPitfalls: string[];
  legalReference: string;
}

const LAND_ACT_STAGES: StepData[] = [
  {
    id: 'stage-1',
    stageNumber: 1,
    title: 'Traditional Authority & Village Headman Protocol',
    chichewaTitle: 'Kulandira Nthaka kwa Mfumu ndi Akulu a Mudzi',
    summary:
      'Engage the local Village Headman (Mfumu) and Group Village Headman (GVH) following respectful customary Malawian protocol to identify available family land without historical clan encumbrances.',
    protocolRules: [
      'Arrange an introductory meeting accompanied by a trusted local intermediary or resident elder who speaks the local dialect (Chichewa, Tumbuka, or Chiyao).',
      'Present traditional respectful greeting (Ulemu). Presenting a modest token of appreciation (mphoto ya mfumu / formal customary sitting gift) is culturally standard, but explicitly distinguish this from buying the land.',
      'Walk the perimeter physical boundaries (Malire) directly with the Mfumu and neighboring landholders (Oyandikana nawo) to verify there are no historical graveyard (Manda), river reserve, or clan dispute claims.',
      'Document the family lineage of the grantor to verify they possess legitimate hereditary allocation rights (Nthaka ya Makolo) and not temporary tenant cultivation rights.',
    ],
    documentsRequired: [
      'Identification of both parties (National ID cards / passports)',
      'Written Memorandum of Customary Allocation (Chitsimikizo cha Mfumu) signed with thumbprint or signature by the Village Headman and 2 elder witnesses',
      'Sketch map identifying physical landmarks (rivers, hill crests, large baobabs, access roads)',
    ],
    commonPitfalls: [
      'Purchasing from a single individual without the Village Headman present, only for extended family members to reclaim the land during planting season.',
      'Assuming payment of cash automatically conveys private freehold ownership—customary land remains vested in the community under the Traditional Authority until formalized.',
    ],
    legalReference: 'Land Act 2016 (Part III, Customary Land); Customary Land Act 2016, Section 5.',
  },
  {
    id: 'stage-2',
    stageNumber: 2,
    title: 'Customary Land Committee (CLC) Public Adjudication',
    chichewaTitle: 'Komiti ya Nthaka ya Mudzi ndi Msonkhano wa Onse',
    summary:
      'Under the Customary Land Act 2016, all customary land transactions must be reviewed by the democratically elected Customary Land Committee (CLC) to ensure public transparency.',
    protocolRules: [
      'Submit the preliminary allocation notice to the Customary Land Committee Chairperson in the Traditional Authority jurisdiction.',
      'Allow the statutory public inspection window (typically 14 to 21 days) where the notice is announced at the village square / court to invite any family objections.',
      'Attend the formal boundary verification session where the CLC verifies that community access pathways, communal cattle grazing corridors, and borehole easements remain unobstructed.',
    ],
    documentsRequired: [
      'Customary Land Committee Allocation Form (Form CLA 1)',
      'Minutes of the CLC village meeting recording zero counter-claims',
      'Signatures of at least 5 committee members including the female representative quorum',
    ],
    commonPitfalls: [
      'Bypassing the CLC to deal solely with an elderly headman whose allocation can be legally nullified by the committee or District Council.',
    ],
    legalReference: 'Customary Land Act 2016, Sections 8–14 (Establishment & Powers of Customary Land Committees).',
  },
  {
    id: 'stage-3',
    stageNumber: 3,
    title: 'GPS Boundary Beaconing & Living Hedges',
    chichewaTitle: 'Kupanga Malire ndi Mipanda Yamoyo (Khonje & Nkhadzi)',
    summary:
      'Establish permanent physical markers and record georeferenced satellite coordinates to prevent gradual encroachment and boundary drift.',
    protocolRules: [
      'Plant traditional living boundary hedges along the surveyed perimeter: Sisal (Khonje), Euphorbia tirucalli (Nkhadzi), or Vetiver grass. These hedges survive bushfires and are recognized by local courts as permanent boundary evidence.',
      'Erect concrete corner beacons (40cm above ground, 60cm deep into subsoil) at all major trajectory turns in presence of adjacent neighbors.',
      'Record latitude and longitude coordinates for each beacon using a GPS receiver or smartphone mapping app.',
    ],
    documentsRequired: [
      'Beacon Schedule with GPS Coordinates (Degrees, Minutes, Seconds or WGS84 Decimal)',
      'Signed Adjoining Neighbor Boundary Agreement (Chigwirizano cha Malire) where all neighbors sign off on the shared line',
    ],
    commonPitfalls: [
      'Relying on seasonal paths or temporary tree markers that disappear during the rainy season.',
    ],
    legalReference: 'Registered Land Act, Survey Rules & Customary Land Regulations 2018.',
  },
  {
    id: 'stage-4',
    stageNumber: 4,
    title: 'Customary Estate Certificate & District Registration',
    chichewaTitle: 'Kulembetsa Nthaka ku Boma (Customary Estate Certificate)',
    summary:
      'Formalize the parcel by registering it as a private "Customary Estate" with the District Land Registrar, granting perpetual legal security and protection against arbitrary repossession.',
    protocolRules: [
      'Submit the completed CLC dossier, beacon schedule, and TA endorsement to the District Land Registry at the District Commissioner (DC) office.',
      'Pay the statutory registration assessment fee and obtain an official receipt from the District Council.',
      'Receive the official Certificate of Customary Estate (Chikalata Chovomerezeka cha Nthaka), issued under the seal of the District Land Registrar.',
      'If seeking commercial agricultural loans or long-term institutional tenure, explore formal conversion into a 99-year Leasehold estate with the Ministry of Lands in Lilongwe.',
    ],
    documentsRequired: [
      'Application Form for Grant of Customary Estate',
      'Endorsement Letter from the Traditional Authority (Paramount / Senior Chief)',
      'Certified Survey Cadastral Plan from the District Surveyor',
      'Official Certificate of Customary Estate (Duplicate retained at District Land Registry)',
    ],
    commonPitfalls: [
      'Stopping at the Chief’s handwritten note and never filing with the District Commissioner, leaving the estate legally classified as unallocated communal land in national records.',
    ],
    legalReference: 'Customary Land Act 2016, Sections 20–28 (Registration and Transfer of Customary Estates).',
  },
];

export function CustomaryLandTenureWizard({ className = '' }: CustomaryLandTenureWizardProps) {
  const [activeStageId, setActiveStageId] = useState<string>('stage-1');
  const [copiedLetter, setCopiedLetter] = useState(false);

  const activeStage = LAND_ACT_STAGES.find((s) => s.id === activeStageId) || LAND_ACT_STAGES[0];

  const handleCopyApplicationLetter = () => {
    const letter = `APPLICATION FOR ALLOCATION AND REGISTRATION OF CUSTOMARY ESTATE
UNDER THE CUSTOMARY LAND ACT, 2016 (MALAWI)

TO: The District Land Registrar
    Office of the District Commissioner
    District of: ____________________, Malawi

THROUGH: The Traditional Authority (TA): ____________________
         Group Village Headman (GVH): ____________________
         Village Headman (Mfumu): ____________________

DATE: ____________________

RE: FORMAL NOTIFICATION AND REGISTRATION OF CUSTOMARY ESTATE

I/We, the undersigned:
Full Name(s): ___________________________________________________________
National Identification Number(s): _______________________________________
Residential Address & Contact: __________________________________________

Hereby apply for formal verification, beaconing, and recording of a Customary Estate situated in:
Village: ________________________, T/A: ________________________
Estimated Area: ________________ Acres / Hectares
Proposed Use: Sustainable Off-Grid Family Homestead, Agroforestry & Permaculture (Avondale Model)

1. BOUNDARY DESCRIPTION (MALIRE):
North: Bordering land of _________________________________
South: Bordering land of _________________________________
East:  Bordering land of _________________________________
West:  Bordering land of _________________________________

2. ADJUDICATION DECLARATION:
We confirm that this parcel has been inspected in the presence of the Village Headman and adjoining neighbors. The Customary Land Committee (CLC) notice period has expired with zero counter-claims or unresolved familial disputes.

Respectfully submitted,

Applicant Signature: _______________________ Date: ______________

ENDORSEMENTS:
Village Headman (Mfumu): ____________________ Signature/Thumb: __________ Date: _______
CLC Chairperson: ____________________________ Signature: _______________ Date: _______
Traditional Authority (TA): ________________ Signature/Seal: ____________ Date: _______
`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(letter);
      setCopiedLetter(true);
      setTimeout(() => setCopiedLetter(false), 2500);
    }
  };

  return (
    <div className={cn('p-5 sm:p-6 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 flex flex-col gap-6 shadow-xl', className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold mb-1">
            <ShieldCheck size={14} />
            <span>Malawi Land Act 2016 &amp; Customary Land Regulations</span>
            <span>·</span>
            <span className="text-stone-400">Legal Acquisition Engine</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Customary Land Acquisition &amp; Titling Navigator
          </h3>
        </div>

        <button
          type="button"
          onClick={handleCopyApplicationLetter}
          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-mono inline-flex items-center gap-1.5 transition-colors border border-stone-700 self-start sm:self-auto cursor-pointer"
        >
          {copiedLetter ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          <span>{copiedLetter ? 'Copied Letter' : 'Copy Application Letter'}</span>
        </button>
      </div>

      {/* 4-Stage Stepper Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {LAND_ACT_STAGES.map((stage) => {
          const isActive = stage.id === activeStageId;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStageId(stage.id)}
              className={cn(
                'p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1',
                isActive
                  ? 'bg-amber-500/15 border-amber-400 text-white shadow-xs'
                  : 'bg-stone-950/40 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-caption font-mono uppercase font-bold text-amber-400">
                  Stage 0{stage.stageNumber}
                </span>
                {isActive && <CheckCircle2 size={12} className="text-amber-400" />}
              </div>
              <span className="text-xs font-bold truncate block">{stage.title}</span>
              <span className="text-caption text-stone-400 truncate block font-mono">
                {stage.chichewaTitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detail Panel */}
      <div className="p-4 sm:p-5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
            <span>Stage {activeStage.stageNumber} of 4</span>
            <span>·</span>
            <span>{activeStage.legalReference}</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {activeStage.title}
          </h4>
          <p className="text-xs text-stone-300 mt-1 leading-relaxed">
            {activeStage.summary}
          </p>
        </div>

        {/* Protocol Rules Checklist */}
        <div className="space-y-2 pt-2 border-t border-stone-800/80">
          <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
            Mandatory Protocol &amp; Cultural Etiquette
          </h5>
          <div className="space-y-2 text-xs">
            {activeStage.protocolRules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-stone-200 bg-stone-900/60 p-2.5 rounded-lg border border-stone-800/60">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents & Common Pitfalls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Required Documents */}
          <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2 text-xs">
            <span className="font-mono font-bold text-sky-400 flex items-center gap-1.5 uppercase text-caption">
              <FileText size={13} />
              Required Documentation
            </span>
            <ul className="space-y-1.5 text-stone-300 list-disc list-inside">
              {activeStage.documentsRequired.map((doc, idx) => (
                <li key={idx} className="leading-relaxed">{doc}</li>
              ))}
            </ul>
          </div>

          {/* Common Pitfalls */}
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2 text-xs text-rose-200">
            <span className="font-mono font-bold text-rose-300 flex items-center gap-1.5 uppercase text-caption">
              <AlertTriangle size={13} />
              Critical Legal Pitfalls to Avoid
            </span>
            <ul className="space-y-1.5 text-stone-300 list-disc list-inside">
              {activeStage.commonPitfalls.map((pitfall, idx) => (
                <li key={idx} className="leading-relaxed">{pitfall}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
