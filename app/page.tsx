'use client';

import { ChangeEvent, ReactNode, useMemo, useState } from 'react';

type FormState = {
  ownerName: string;
  ownerCity: string;
  petName: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  temperament: string;
  energyLevel: string;
  houseTrained: boolean;
  crateTrained: boolean;
  barkingOrScratching: string;
  vaccinated: boolean;
  spayedNeutered: boolean;
  vetInfo: string;
  rentalHistory: string;
  damageHistory: string;
  landlordReference: string;
  extraCare: string;
};

const initialState: FormState = {
  ownerName: '',
  ownerCity: '',
  petName: '',
  species: 'Dog',
  breed: '',
  age: '',
  weight: '',
  temperament: '',
  energyLevel: 'Moderate',
  houseTrained: false,
  crateTrained: false,
  barkingOrScratching: '',
  vaccinated: false,
  spayedNeutered: false,
  vetInfo: '',
  rentalHistory: '',
  damageHistory: '',
  landlordReference: '',
  extraCare: '',
};

function joinSentences(parts: string[]) {
  return parts.filter(Boolean).join(' ');
}

function missingItems(form: FormState) {
  const items: string[] = [];
  if (!form.landlordReference.trim()) items.push('Add a landlord or reference quote to build trust quickly.');
  if (!form.vetInfo.trim()) items.push('Include vet contact details to show responsible ongoing care.');
  if (!form.rentalHistory.trim()) items.push('Mention any successful rental history with your pet.');
  if (!form.temperament.trim()) items.push('Describe your pet’s temperament with a few concrete traits.');
  if (!form.houseTrained) items.push('If applicable, confirm house training because landlords look for it first.');
  if (!form.vaccinated) items.push('Vaccination status is high-signal reassurance for landlords and property managers.');
  return items;
}

function buildResume(form: FormState) {
  const basics = `${form.petName || 'Your pet'} is a ${form.age || 'well-cared-for'} ${form.species.toLowerCase()}${form.breed ? ` (${form.breed})` : ''}${form.weight ? ` weighing ${form.weight}` : ''}.`;
  const behavior = joinSentences([
    form.temperament ? `Temperament: ${form.temperament}.` : '',
    `Energy level: ${form.energyLevel.toLowerCase()}.`,
    form.houseTrained ? 'House trained.' : '',
    form.crateTrained ? 'Crate trained.' : '',
    form.barkingOrScratching ? `Noise / scratching notes: ${form.barkingOrScratching}.` : 'No concerning behavior details were reported.',
  ]);
  const health = joinSentences([
    form.vaccinated ? 'Vaccinations are up to date.' : '',
    form.spayedNeutered ? 'Spayed / neutered.' : '',
    form.vetInfo ? `Veterinary contact: ${form.vetInfo}.` : '',
  ]);
  const housing = joinSentences([
    form.rentalHistory ? `Rental history: ${form.rentalHistory}.` : '',
    form.damageHistory ? `Property care: ${form.damageHistory}.` : 'Owner reports no known property damage concerns.',
    form.landlordReference ? `Reference: “${form.landlordReference}”` : '',
    form.extraCare ? `Extra care details: ${form.extraCare}.` : '',
  ]);

  return joinSentences([
    basics,
    behavior,
    health,
    housing,
    `${form.ownerName || 'The owner'}${form.ownerCity ? ` in ${form.ownerCity}` : ''} is presenting ${form.petName || 'this pet'} as a responsible, well-managed companion for a rental home.`,
  ]);
}

function buildIntro(form: FormState) {
  const intro = [
    `Hi, my name is ${form.ownerName || '[Your Name]'}, and I am applying for a rental home with my ${form.species.toLowerCase()}, ${form.petName || '[Pet Name]'}.`,
    `${form.petName || 'My pet'} is ${form.temperament ? form.temperament.toLowerCase() : 'friendly and well cared for'}, with a ${form.energyLevel.toLowerCase()} energy level${form.houseTrained ? ', and is house trained' : ''}${form.crateTrained ? ' and crate trained' : ''}.`,
    `${form.vaccinated ? 'Vaccinations are current' : 'Care records can be shared upon request'}${form.spayedNeutered ? ', and my pet is spayed/neutered' : ''}.`,
    `${form.rentalHistory ? `We have prior rental experience: ${form.rentalHistory}.` : 'I am happy to provide additional context about our rental readiness.'}`,
    `${form.landlordReference ? `A reference shared this about ${form.petName || 'my pet'}: “${form.landlordReference}”` : 'I can also share references and care details if helpful.'}`,
    'I want to make the application process easy and transparent, and I would be glad to answer any questions.'
  ];
  return intro.join(' ');
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
    >
      {copied ? 'Copied' : label}
    </button>
  );
}

type Step = {
  id: string;
  title: string;
  description: string;
  optional?: boolean;
  highImpact?: boolean;
  render: (args: {
    form: FormState;
    handleText: (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleCheck: (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => void;
    setPhotoPreview: (value: string | null) => void;
  }) => ReactNode;
};

function StepHint({ text }: { text: string }) {
  return <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-950">{text}</div>;
}

export default function Home() {
  const [form, setForm] = useState<FormState>(initialState);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const resume = useMemo(() => buildResume(form), [form]);
  const introNote = useMemo(() => buildIntro(form), [form]);
  const suggestions = useMemo(() => missingItems(form), [form]);

  const handleText = (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleCheck = (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.checked }));
    };

  const steps: Step[] = [
    {
      id: 'pet-basics',
      title: 'First: who is the pet?',
      description: 'These details make the whole resume feel concrete immediately.',
      highImpact: true,
      render: ({ form, handleText }) => (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              <span>Pet name</span>
              <input value={form.petName} onChange={handleText('petName')} className="field-input" placeholder="Mochi" />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              <span>Species</span>
              <select value={form.species} onChange={handleText('species')} className="field-input">
                <option>Dog</option>
                <option>Cat</option>
                <option>Rabbit</option>
                <option>Other</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              <span>Breed</span>
              <input value={form.breed} onChange={handleText('breed')} className="field-input" placeholder="Mini Goldendoodle" />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              <span>Age</span>
              <input value={form.age} onChange={handleText('age')} className="field-input" placeholder="3 years old" />
            </label>
          </div>
          <StepHint text="People are more likely to keep going when the form starts with easy facts instead of paperwork. So we do that first." />
        </div>
      )
    },
    {
      id: 'temperament',
      title: 'What makes this pet easy to live with?',
      description: 'This is the highest-converting section. Landlords want calm, predictable, responsible pets.',
      highImpact: true,
      render: ({ form, handleText }) => (
        <div className="space-y-4">
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Temperament</span>
            <textarea value={form.temperament} onChange={handleText('temperament')} rows={4} className="field-input" placeholder="Friendly, calm indoors, gentle with visitors, sleeps well at night..." />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Energy level</span>
            <select value={form.energyLevel} onChange={handleText('energyLevel')} className="field-input">
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
            </select>
          </label>
          <StepHint text="Concrete beats cute. 'Calm indoors' is stronger than 'super adorable.'" />
        </div>
      )
    },
    {
      id: 'training',
      title: 'Training and behavior',
      description: 'Handle the obvious landlord objections before they even ask.',
      highImpact: true,
      render: ({ form, handleText, handleCheck }) => (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="toggle-card"><input type="checkbox" checked={form.houseTrained} onChange={handleCheck('houseTrained')} /> House trained</label>
            <label className="toggle-card"><input type="checkbox" checked={form.crateTrained} onChange={handleCheck('crateTrained')} /> Crate trained</label>
          </div>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Barking / scratching notes</span>
            <textarea value={form.barkingOrScratching} onChange={handleText('barkingOrScratching')} rows={4} className="field-input" placeholder="Rarely barks indoors, no scratching damage, uses scratching post, no chewing issues..." />
          </label>
        </div>
      )
    },
    {
      id: 'owner',
      title: 'Who is applying with the pet?',
      description: 'A real owner profile makes the application feel more trustworthy.',
      render: ({ form, handleText }) => (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Owner name</span>
            <input value={form.ownerName} onChange={handleText('ownerName')} className="field-input" placeholder="Jane Miller" />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>City / market</span>
            <input value={form.ownerCity} onChange={handleText('ownerCity')} className="field-input" placeholder="Austin, TX" />
          </label>
        </div>
      )
    },
    {
      id: 'trust-signals',
      title: 'Add extra trust signals',
      description: 'These help, but users can skip if they do not have everything ready.',
      optional: true,
      render: ({ form, handleText, handleCheck }) => (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="toggle-card"><input type="checkbox" checked={form.vaccinated} onChange={handleCheck('vaccinated')} /> Vaccinated</label>
            <label className="toggle-card"><input type="checkbox" checked={form.spayedNeutered} onChange={handleCheck('spayedNeutered')} /> Spayed / neutered</label>
          </div>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Vet info</span>
            <input value={form.vetInfo} onChange={handleText('vetInfo')} className="field-input" placeholder="Sunset Vet Clinic · Dr. Lee · 555-0123" />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Rental history</span>
            <textarea value={form.rentalHistory} onChange={handleText('rentalHistory')} rows={3} className="field-input" placeholder="Lived in two rentals with no complaints or pet issues..." />
          </label>
        </div>
      )
    },
    {
      id: 'social-proof',
      title: 'Reference, property care, and polish',
      description: 'This is optional frosting, but strong if they have it.',
      optional: true,
      render: ({ form, handleText }) => (
        <div className="space-y-4">
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Damage history / property care</span>
            <textarea value={form.damageHistory} onChange={handleText('damageHistory')} rows={3} className="field-input" placeholder="No chewing or scratching damage, floor protectors under bowls, regular grooming..." />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Landlord / reference quote</span>
            <textarea value={form.landlordReference} onChange={handleText('landlordReference')} rows={3} className="field-input" placeholder="Quiet, well cared for, and never caused an issue..." />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Extra care details</span>
            <textarea value={form.extraCare} onChange={handleText('extraCare')} rows={3} className="field-input" placeholder="Daily walks, nail trims, monthly grooming, regular routine..." />
          </label>
        </div>
      )
    },
    {
      id: 'photo',
      title: 'Optional photo',
      description: 'A clean photo adds warmth, but it should never block completion.',
      optional: true,
      render: ({ setPhotoPreview }) => (
        <label className="upload-card">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return setPhotoPreview(null);
              const reader = new FileReader();
              reader.onload = () => setPhotoPreview(String(reader.result));
              reader.readAsDataURL(file);
            }}
          />
          <strong>Upload a pet photo</strong>
          <span>Only used for local preview. Nothing is uploaded.</span>
        </label>
      )
    }
  ];

  const totalSteps = steps.length;
  const step = steps[currentStep];
  const completedSteps = currentStep;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);
  const stepsRemaining = totalSteps - currentStep - 1;
  const essentialCompleted = steps.filter((item, index) => !item.optional && index < currentStep).length;
  const essentialTotal = steps.filter((item) => !item.optional).length;

  const goNext = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const skipStep = () => {
    if (!step.optional) return;
    goNext();
  };

  return (
    <main className="min-h-screen px-4 py-8 text-slate-800 md:px-8">
      <section className="mx-auto mb-8 grid max-w-7xl gap-6 rounded-[32px] border border-emerald-200 bg-white/90 p-8 shadow-xl shadow-emerald-100 backdrop-blur md:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-900">Pet resume for rental applications</span>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">Make landlords trust your pet faster</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Instead of a giant stressful form, users answer one small question at a time, skip low-priority fields, and instantly get a stronger pet resume plus a landlord intro note.
          </p>
          <div className="flex flex-wrap gap-3 no-print">
            <a href="#generator" className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white">Start the guided form</a>
            <button type="button" onClick={() => window.print()} className="rounded-full border border-slate-300 px-5 py-3 font-semibold">Export / Print PDF</button>
          </div>
          <div className="grid gap-3 pt-4 text-sm text-slate-600 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4"><strong>Less friction:</strong> starts with easy questions.</div>
            <div className="rounded-2xl bg-slate-50 p-4"><strong>More completion:</strong> optional steps can be skipped.</div>
            <div className="rounded-2xl bg-slate-50 p-4"><strong>More trust:</strong> outputs a clean landlord-ready summary.</div>
          </div>
        </div>
        <div className="rounded-[28px] bg-slate-950 p-6 text-white">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-emerald-300">Live preview</p>
          <h2 className="text-2xl font-bold">{form.petName || 'Mochi'}</h2>
          <p className="mt-2 text-slate-300">{form.breed || 'Mini Goldendoodle'} · {form.age || '3 years old'} · {form.weight || '24 lb'}</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            <strong className="block text-white">What users get:</strong>
            a pet resume, a landlord intro note, and a list of missing trust signals.
          </div>
          <div className="mt-6 space-y-3 text-sm leading-7 text-slate-200">
            <p>{resume}</p>
          </div>
        </div>
      </section>

      <section id="generator" className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[0.88fr_1.12fr]">
        <div className="no-print space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Guided pet resume builder</h2>
                <p className="mt-1 text-sm text-slate-500">Everything stays local in the browser. No signup. No upload. No nonsense.</p>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                Step {currentStep + 1} / {totalSteps}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                <span>{progressPercent}% complete</span>
                <span>{stepsRemaining > 0 ? `${stepsRemaining} steps left` : 'Last step'}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{ width: `${Math.max(progressPercent, 8)}%` }} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <strong>Core progress:</strong> {essentialCompleted} / {essentialTotal} essential steps done. Optional steps can be skipped.
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    {step.highImpact ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-900">High impact</span> : null}
                    {step.optional ? <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Optional</span> : null}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>
              </div>

              <div className="mt-5">
                {step.render({ form, handleText, handleCheck, setPhotoPreview })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={goBack} disabled={currentStep === 0} className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">
                  Back
                </button>
                {step.optional ? (
                  <button type="button" onClick={skipStep} className="rounded-full border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700">
                    Skip this step
                  </button>
                ) : null}
              </div>
              <button type="button" onClick={goNext} disabled={currentStep === totalSteps - 1} className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">
                {currentStep === totalSteps - 1 ? 'Done' : 'Next step'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-5 shadow-lg shadow-emerald-100/70 no-print">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Value preview</p>
                <h2 className="mt-1 text-2xl font-black">Users see useful output immediately</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <CopyButton text={introNote} label="Copy intro note" />
                <CopyButton text={resume} label="Copy resume" />
              </div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-4 text-sm text-slate-700">A landlord-ready pet summary</div>
              <div className="rounded-3xl bg-white p-4 text-sm text-slate-700">A copy-paste intro note for the application</div>
              <div className="rounded-3xl bg-white p-4 text-sm text-slate-700">A checklist of missing trust signals</div>
            </div>
          </section>

          <section className="print-card rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Pet Resume</p>
                <h2 className="mt-1 text-3xl font-black">{form.petName || 'Your pet'}</h2>
                <p className="mt-2 text-slate-500">{form.breed || 'Breed'} · {form.species} · {form.age || 'Age'} · {form.weight || 'Weight'}</p>
              </div>
              {photoPreview ? <img src={photoPreview} alt="Pet preview" className="h-28 w-28 rounded-3xl object-cover" /> : <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-slate-100 text-xs text-slate-400">Optional photo</div>}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4">
                <h3 className="font-bold">Snapshot</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  <li><strong>Owner:</strong> {form.ownerName || '—'}</li>
                  <li><strong>City:</strong> {form.ownerCity || '—'}</li>
                  <li><strong>Temperament:</strong> {form.temperament || '—'}</li>
                  <li><strong>Vet:</strong> {form.vetInfo || '—'}</li>
                </ul>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <h3 className="font-bold">Trust signals</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  <li>{form.houseTrained ? '✓' : '○'} House trained</li>
                  <li>{form.crateTrained ? '✓' : '○'} Crate trained</li>
                  <li>{form.vaccinated ? '✓' : '○'} Vaccinated</li>
                  <li>{form.spayedNeutered ? '✓' : '○'} Spayed / neutered</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-3xl border border-slate-200 p-4">
              <h3 className="font-bold">Full pet resume text</h3>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">{resume}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 no-print">
              <CopyButton text={resume} label="Copy pet resume" />
              <button type="button" onClick={() => window.print()} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Print / Save PDF</button>
            </div>
          </section>

          <section className="print-card rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Landlord intro note</p>
                <h2 className="mt-1 text-2xl font-black">Copy and paste into your application</h2>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700">{introNote}</p>
            <div className="mt-4 flex flex-wrap gap-3 no-print">
              <CopyButton text={introNote} label="Copy intro note" />
            </div>
          </section>

          <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-6 shadow-lg shadow-amber-100/70">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Missing item reminders</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-amber-950">
              {suggestions.length ? suggestions.map((item) => <li key={item}>• {item}</li>) : <li>• Nice. You covered the core trust-building details landlords usually want.</li>}
            </ul>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 no-print">
            <h2 className="text-2xl font-black">Why this version should convert better</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Starts with easy questions to reduce early bounce.</div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Labels high-impact sections so users know what actually matters.</div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Shows concrete output value before the form feels long.</div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
