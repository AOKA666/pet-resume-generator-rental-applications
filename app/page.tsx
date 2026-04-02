export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 text-slate-800 md:px-8">
      <section className="hero-glow mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-white/70 bg-white/80 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="grid md:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 md:p-12 lg:p-16 xl:p-20">
            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-900 shadow-sm">
              Pet resume for rental applications
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
              Help landlords trust your pet before they even reply
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Create a polished pet resume, a landlord intro note, and a cleaner rental application story without dumping users into one giant stressful form.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/form" className="cta-primary px-6 py-4 text-base font-semibold">
                Start the guided form
              </a>
              <a href="#how-it-works" className="cta-secondary px-6 py-4 text-base font-semibold">
                See how it works
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="soft-card rounded-[28px] p-5">
                <div className="text-sm font-semibold text-slate-500">Step-by-step</div>
                <div className="mt-2 text-base font-bold text-slate-900">No huge form dump</div>
              </div>
              <div className="soft-card rounded-[28px] p-5">
                <div className="text-sm font-semibold text-slate-500">Better output</div>
                <div className="mt-2 text-base font-bold text-slate-900">Resume + intro note + trust checklist</div>
              </div>
              <div className="soft-card rounded-[28px] p-5">
                <div className="text-sm font-semibold text-slate-500">Fast finish</div>
                <div className="mt-2 text-base font-bold text-slate-900">Skip low-priority steps when needed</div>
              </div>
            </div>
          </div>

          <div className="dark-panel p-8 text-white md:p-10 lg:p-14 xl:p-16">
            <div className="relative z-10 rounded-[30px] border border-white/10 bg-white/6 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">Preview</p>
              <h2 className="mt-4 text-3xl font-black">Mochi</h2>
              <p className="mt-2 text-slate-300">Mini Goldendoodle · 3 years old · 24 lb</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Trust signals</div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-200">
                    <li>✓ House trained</li>
                    <li>✓ Vaccinated</li>
                    <li>✓ Calm indoors</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Output</div>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    A clean pet resume that makes your application feel organized, responsible, and much easier to say yes to.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-5 text-sm leading-7 text-slate-200 shadow-inner">
                Mochi is a well-cared-for mini Goldendoodle with a calm indoor temperament, moderate energy level, and up-to-date care records. She is house trained, easy to manage, and presented as a responsible companion for a rental home.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="glass-panel mx-auto mt-8 max-w-7xl rounded-[40px] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.06)] md:p-10 lg:p-12">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">How it works</span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">A cleaner product flow than one overwhelming application form</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The landing page explains the value. The guided form lives on its own page. That means more room, less clutter, and a smoother completion flow.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="soft-card rounded-[30px] p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">01</div>
            <h3 className="mt-3 text-2xl font-bold text-slate-950">Start with easy details</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Pet name, breed, age, and a few basic facts get people moving fast instead of freezing at a huge form.
            </p>
          </div>
          <div className="soft-card rounded-[30px] p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">02</div>
            <h3 className="mt-3 text-2xl font-bold text-slate-950">Answer the landlord worries</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Training, noise, behavior, and care signals are asked in a cleaner sequence that feels manageable.
            </p>
          </div>
          <div className="soft-card rounded-[30px] p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">03</div>
            <h3 className="mt-3 text-2xl font-bold text-slate-950">Get copy-ready output</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Users immediately get a pet resume, a landlord intro note, and a list of missing trust-building details.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[40px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-8 shadow-[0_24px_70px_rgba(16,185,129,0.08)] md:p-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold text-emerald-800 shadow-sm">Ready to try it?</span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">Open the full guided form in a dedicated workspace</h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">
            Bigger layout, less visual pressure, clearer progress, and a much better chance users actually finish.
          </p>
        </div>
        <div className="mt-8 lg:mt-0">
          <a href="/form" className="cta-primary px-7 py-4 text-base font-semibold">
            Start the guided form
          </a>
        </div>
      </section>
    </main>
  );
}
