export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 text-slate-800 md:px-8">
      <section className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-emerald-200 bg-white shadow-xl shadow-emerald-100/70">
        <div className="grid md:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 md:p-12 lg:p-16">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-900">
              Pet resume for rental applications
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight md:text-6xl lg:text-7xl">
              Help landlords trust your pet before they meet them
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Create a polished pet resume, a landlord intro note, and a cleaner rental application story without throwing users into one giant stressful form.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/form" className="rounded-full bg-slate-950 px-6 py-4 text-base font-semibold text-white transition hover:opacity-90">
                Start the guided form
              </a>
              <a href="#how-it-works" className="rounded-full border border-slate-300 px-6 py-4 text-base font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950">
                See how it works
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-500">Step-by-step</div>
                <div className="mt-2 text-base font-bold text-slate-900">No huge form dump</div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-500">Better output</div>
                <div className="mt-2 text-base font-bold text-slate-900">Resume + intro note + trust checklist</div>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-500">Fast finish</div>
                <div className="mt-2 text-base font-bold text-slate-900">Skip low-priority steps when needed</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-8 text-white md:p-10 lg:p-14">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">Preview</p>
              <h2 className="mt-4 text-3xl font-black">Mochi</h2>
              <p className="mt-2 text-slate-300">Mini Goldendoodle · 3 years old · 24 lb</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Trust signals</div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-200">
                    <li>✓ House trained</li>
                    <li>✓ Vaccinated</li>
                    <li>✓ Calm indoors</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Output</div>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    A clean pet resume that makes your application feel organized, responsible, and much easier to say yes to.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-slate-200">
                Mochi is a well-cared-for mini Goldendoodle with a calm indoor temperament, moderate energy level, and up-to-date care records. She is house trained, easy to manage, and presented as a responsible companion for a rental home.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto mt-8 max-w-7xl rounded-[36px] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60 md:p-10 lg:p-12">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">How it works</span>
          <h2 className="mt-5 text-3xl font-black tracking-tight md:text-5xl">A better flow than one overwhelming application form</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The landing page explains the value. The guided form lives on its own page. That means more room, less clutter, and a smoother completion flow.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-[28px] bg-slate-50 p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">01</div>
            <h3 className="mt-3 text-2xl font-bold">Start with easy details</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Pet name, breed, age, and a few basic facts get people moving fast instead of freezing at a huge form.
            </p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">02</div>
            <h3 className="mt-3 text-2xl font-bold">Answer the landlord worries</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Training, noise, behavior, and care signals are asked in a cleaner sequence that feels manageable.
            </p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">03</div>
            <h3 className="mt-3 text-2xl font-bold">Get copy-ready output</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Users immediately get a pet resume, a landlord intro note, and a list of missing trust-building details.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[36px] border border-emerald-200 bg-emerald-50 p-8 shadow-lg shadow-emerald-100/70 md:p-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold text-emerald-800">Ready to try it?</span>
          <h2 className="mt-5 text-3xl font-black tracking-tight md:text-5xl">Open the full guided form in a separate workspace</h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            Bigger layout, less visual pressure, clearer progress, and a much better chance users actually finish.
          </p>
        </div>
        <div className="mt-8 lg:mt-0">
          <a href="/form" className="inline-flex rounded-full bg-slate-950 px-7 py-4 text-base font-semibold text-white transition hover:opacity-90">
            Start the guided form
          </a>
        </div>
      </section>
    </main>
  );
}
