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

export default function GuidedFormPage() {
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
      description: 'Start with the easy basics so the form feels light instead of exhausting.',
      highImpact: true,
      render: ({ form, handleText }) => (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
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
            <label className="space-y-2 text-sm font-semibold text-slate-700 md:col-span-2">
              <span>Weight</span>
              <input value={form.weight} onChange={handleText('weight')} className="field-input" placeholder="24 lb" />
            </label>
          </div>
          <StepHint text="Get momentum first. Easy factual fields reduce drop-off much better than opening with long explanation boxes." />
        </div>
      )
    },
    {
      id: 'temperament',
      title: 'What makes this pet easy to live with?',
      description: 'This is one of the strongest trust-building sections in the whole flow.',
      highImpact: true,
      render: ({ form, handleText }) => (
        <div className="space-y-4">
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Temperament</span>
            <textarea value={form.temperament} onChange={handleText('temperament')} rows={5} className="field-input" placeholder="Friendly, calm indoors, gentle with visitors, sleeps well at night..." />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Energy level</span>
            <select value={form.energyLevel} onChange={handleText('energyLevel')} className="field-input">
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
            </select>
          </label>
          <StepHint text="Concrete, boring, predictable pets win. That sounds unromantic, but landlords love it." />
        </div>
      )
    },
    {
      id: 'training',
      title: 'Training and behavior',
      description: 'Answer the landlord anxiety stuff directly.',
      highImpact: true,
      render: ({ form, handleText, handleCheck }) => (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="toggle-card"><input type="checkbox" checked={form.houseTrained} onChange={handleCheck('houseTrained')} /> House trained</label>
            <label className="toggle-card"><input type="checkbox" checked={form.crateTrained} onChange={handleCheck('crateTrained')} /> Crate trained</label>
          </div>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Barking / scratching notes</span>
            <textarea value={form.barkingOrScratching} onChange={handleText('barkingOrScratching')} rows={5} className="field-input" placeholder="Rarely barks indoors, no scratching damage, uses scratching post, no chewing issues..." />
          </label>
        </div>
      )
    },
    {
      id: 'owner',
      title: 'Who is applying with the pet?',
      description: 'This makes the application feel more human and accountable.',
      render: ({ form, handleText }) => (
        <div className="grid gap-4 md:grid-cols-2">
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
      title: 'Extra trust signals',
      description: 'Helpful, but skippable if the user wants to finish fast.',
      optional: true,
      render: ({ form, handleText, handleCheck }) => (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="toggle-card"><input type="checkbox" checked={form.vaccinated} onChange={handleCheck('vaccinated')} /> Vaccinated</label>
            <label className="toggle-card"><input type="checkbox" checked={form.spayedNeutered} onChange={handleCheck('spayedNeutered')} /> Spayed / neutered</label>
          </div>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Vet info</span>
            <input value={form.vetInfo} onChange={handleText('vetInfo')} className="field-input" placeholder="Sunset Vet Clinic · Dr. Lee · 555-0123" />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Rental history</span>
            <textarea value={form.rentalHistory} onChange={handleText('rentalHistory')} rows={4} className="field-input" placeholder="Lived in two rentals with no complaints or pet issues..." />
          </label>
        </div>
      )
    },
    {
      id: 'social-proof',
      title: 'Reference and property care details',
      description: 'Good finishing polish if they have it ready.',
      optional: true,
      render: ({ form, handleText }) => (
        <div className="space-y-4">
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Damage history / property care</span>
            <textarea value={form.damageHistory} onChange={handleText('damageHistory')} rows={4} className="field-input" placeholder="No chewing or scratching damage, floor protectors under bowls, regular grooming..." />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Landlord / reference quote</span>
            <textarea value={form.landlordReference} onChange={handleText('landlordReference')} rows={4} className="field-input" placeholder="Quiet, well cared for, and never caused an issue..." />
          </label>
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Extra care details</span>
            <textarea value={form.extraCare} onChange={handleText('extraCare')} rows={4} className="field-input" placeholder="Daily walks, regular nail trims, monthly grooming..." />
          </label>
        </div>
      )
    },
    {
      id: 'photo',
      title: 'Optional photo',
      description: 'Nice to have, never required.',
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
    <main className="min-h-screen px-4 py-6 text-slate-800 md:px-8 lg:px-10">
      <section className="glass-panel mx-auto max-w-[1600px] rounded-[40px] shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-5 md:px-8 lg:px-10">
          <div>
            <a href="/" className="text-sm font-semibold text-slate-500 transition hover:text-slate-900">← Back to home</a>
            <h1 className="mt-2 text-2xl font-black md:text-3xl">Guided pet resume builder</h1>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            Step {currentStep + 1} / {totalSteps}
          </div>
        </div>

        <div className="grid min-h-[calc(100vh-140px)] xl:grid-cols-[0.92fr_1.08fr]">
          <div className="border-b border-slate-200/80 bg-white/60 p-6 md:p-8 xl:border-b-0 xl:border-r xl:p-10">
            <div className="space-y-5">
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

              <div className="soft-card rounded-[30px] p-6 md:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-black">{step.title}</h2>
                  {step.highImpact ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-900">High impact</span> : null}
                  {step.optional ? <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Optional</span> : null}
                </div>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{step.description}</p>

                <div className="mt-6">
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
                <button type="button" onClick={goNext} disabled={currentStep === totalSteps - 1} className="rounded-full bg-slate-950 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">
                  {currentStep === totalSteps - 1 ? 'Done' : 'Next step'}
                </button>
              </div>
            </div>
          </div>

          <div className="dark-panel p-6 text-white md:p-8 xl:p-10">
            <div className="grid gap-6 2xl:grid-cols-[0.92fr_1.08fr]">
              <div className="space-y-6">
                <section className="rounded-[30px] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Live output</p>
                      <h2 className="mt-2 text-3xl font-black">{form.petName || 'Your pet'}</h2>
                      <p className="mt-2 text-slate-300">{form.breed || 'Breed'} · {form.species} · {form.age || 'Age'} · {form.weight || 'Weight'}</p>
                    </div>
                    {photoPreview ? <img src={photoPreview} alt="Pet preview" className="h-28 w-28 rounded-3xl object-cover" /> : <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white/10 text-xs text-slate-300">Optional photo</div>}
                  </div>

                  <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
                    <h3 className="font-bold text-white">Pet resume</h3>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-200">{resume}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <CopyButton text={resume} label="Copy pet resume" />
                    <button type="button" onClick={() => window.print()} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">Print / Save PDF</button>
                  </div>
                </section>

                <section className="rounded-[30px] border border-white/10 bg-white/6 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.16)] backdrop-blur-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Landlord intro note</p>
                  <p className="mt-4 text-sm leading-7 text-slate-200">{introNote}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <CopyButton text={introNote} label="Copy intro note" />
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="rounded-[30px] border border-amber-300/30 bg-amber-100/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Missing item reminders</p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-amber-50">
                    {suggestions.length ? suggestions.map((item) => <li key={item}>• {item}</li>) : <li>• Nice. You covered the core trust-building details landlords usually want.</li>}
                  </ul>
                </section>

                <section className="rounded-[30px] border border-white/10 bg-white/6 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.14)] backdrop-blur-xl">
                  <h3 className="text-2xl font-black">Why this layout works better</h3>
                  <div className="mt-5 grid gap-4">
                    <div className="rounded-3xl border border-white/10 bg-black/15 p-4 text-sm leading-7 text-slate-200">The form has its own page, so it no longer feels cramped or bolted onto a landing page.</div>
                    <div className="rounded-3xl border border-white/10 bg-black/15 p-4 text-sm leading-7 text-slate-200">Users always know where they are, what matters most, and what they can safely skip.</div>
                    <div className="rounded-3xl border border-white/10 bg-black/15 p-4 text-sm leading-7 text-slate-200">The right side makes the value obvious while the left side stays focused on just one step.</div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
