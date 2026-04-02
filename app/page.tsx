'use client';

import { ChangeEvent, useMemo, useState } from 'react';

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

export default function Home() {
  const [form, setForm] = useState<FormState>(initialState);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

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

  const fields = [
    ['Owner name', 'ownerName'],
    ['City / market', 'ownerCity'],
    ['Pet name', 'petName'],
    ['Breed', 'breed'],
    ['Age', 'age'],
    ['Weight', 'weight'],
    ['Vet info', 'vetInfo'],
  ] as const;

  return (
    <main className="min-h-screen px-4 py-8 text-slate-800 md:px-8">
      <section className="mx-auto mb-8 grid max-w-7xl gap-6 rounded-[32px] border border-amber-200 bg-white/85 p-8 shadow-xl shadow-amber-100 backdrop-blur md:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-900">Rental application helper</span>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">Create a Pet Resume That Helps Your Rental Application Stand Out</h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Fill in a few details, then instantly generate an English pet resume, a landlord intro note, and a checklist of missing trust signals. No AI API. No fluff. Just a cleaner case for your pet.
          </p>
          <div className="flex flex-wrap gap-3 no-print">
            <a href="#generator" className="rounded-full bg-slate-900 px-5 py-3 font-semibold text-white">Start the form</a>
            <button type="button" onClick={() => window.print()} className="rounded-full border border-slate-300 px-5 py-3 font-semibold">Export / Print PDF</button>
          </div>
          <div className="grid gap-3 pt-4 text-sm text-slate-600 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4"><strong>Fast:</strong> one-page form and result.</div>
            <div className="rounded-2xl bg-slate-50 p-4"><strong>Practical:</strong> copy-ready landlord note.</div>
            <div className="rounded-2xl bg-slate-50 p-4"><strong>Stable:</strong> browser print works as PDF export.</div>
          </div>
        </div>
        <div className="rounded-[28px] bg-slate-900 p-6 text-white">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-amber-300">Preview</p>
          <h2 className="text-2xl font-bold">{form.petName || 'Mochi'}</h2>
          <p className="mt-2 text-slate-300">{form.breed || 'Mini Goldendoodle'} · {form.age || '3 years old'} · {form.weight || '24 lb'}</p>
          <div className="mt-6 space-y-3 text-sm leading-7 text-slate-200">
            <p>{resume}</p>
          </div>
        </div>
      </section>

      <section id="generator" className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[0.95fr_1.05fr]">
        <form className="no-print space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
          <div>
            <h2 className="text-2xl font-bold">Pet Resume form</h2>
            <p className="mt-1 text-sm text-slate-500">Everything stays local in the browser. Uploading a photo only creates a local preview.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(([label, key]) => (
              <label key={key} className="space-y-2 text-sm font-semibold text-slate-700">
                <span>{label}</span>
                <input value={form[key]} onChange={handleText(key)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none ring-0 transition focus:border-slate-400" />
              </label>
            ))}

            <label className="space-y-2 text-sm font-semibold text-slate-700">
              <span>Species</span>
              <select value={form.species} onChange={handleText('species')} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal">
                <option>Dog</option>
                <option>Cat</option>
                <option>Rabbit</option>
                <option>Other</option>
              </select>
            </label>

            <label className="space-y-2 text-sm font-semibold text-slate-700">
              <span>Energy level</span>
              <select value={form.energyLevel} onChange={handleText('energyLevel')} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal">
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </label>
          </div>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Temperament</span>
            <textarea value={form.temperament} onChange={handleText('temperament')} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal" placeholder="Friendly, calm with visitors, gentle with kids..." />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Barking / scratching notes</span>
            <textarea value={form.barkingOrScratching} onChange={handleText('barkingOrScratching')} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal" placeholder="Rarely barks indoors, uses scratching post..." />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Rental history</span>
            <textarea value={form.rentalHistory} onChange={handleText('rentalHistory')} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal" placeholder="Lived in two apartments with no complaints..." />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Damage history / property care</span>
            <textarea value={form.damageHistory} onChange={handleText('damageHistory')} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal" placeholder="No chewing or scratching damage, owner uses floor protectors..." />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Landlord / reference quote</span>
            <textarea value={form.landlordReference} onChange={handleText('landlordReference')} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal" placeholder="Quiet, well cared for, and never caused an issue..." />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Extra care details</span>
            <textarea value={form.extraCare} onChange={handleText('extraCare')} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal" placeholder="Daily walks, monthly grooming, regular nail trims..." />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            <span>Pet photo</span>
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
              className="block w-full rounded-2xl border border-slate-200 px-4 py-3 font-normal file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:font-semibold file:text-white"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold"><input type="checkbox" checked={form.houseTrained} onChange={handleCheck('houseTrained')} /> House trained</label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold"><input type="checkbox" checked={form.crateTrained} onChange={handleCheck('crateTrained')} /> Crate trained</label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold"><input type="checkbox" checked={form.vaccinated} onChange={handleCheck('vaccinated')} /> Vaccinated</label>
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold"><input type="checkbox" checked={form.spayedNeutered} onChange={handleCheck('spayedNeutered')} /> Spayed / neutered</label>
          </div>
        </form>

        <div className="space-y-6">
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

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
            <h2 className="text-2xl font-black">Why this helps</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Shows responsible pet care instead of making the landlord guess.</div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Turns scattered facts into a clean document and message.</div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Gives you a ready PDF path using the browser print dialog.</div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
