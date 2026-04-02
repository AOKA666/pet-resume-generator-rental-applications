export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 text-slate-800 md:px-8 lg:py-10">
      <section className="hero-glow mx-auto max-w-7xl overflow-hidden rounded-[44px] border border-white/70 bg-white/80 shadow-[0_36px_100px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="grid md:grid-cols-[1.02fr_0.98fr]">
          <div className="p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-24">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-900 shadow-sm">
                Pet resume for rental applications
              </span>
              <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-600">
                Built for pet-friendly rental applications
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-6xl lg:text-7xl xl:text-[5.25rem] xl:leading-[0.95]">
              Make your rental application feel safer, cleaner, and easier to say yes to
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Create a polished pet resume, a landlord intro note, and a stronger trust story without forcing users through one giant stressful form.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/form" className="cta-primary px-6 py-4 text-base font-semibold">
                Start the guided form
              </a>
              <a href="#how-it-works" className="cta-secondary px-6 py-4 text-base font-semibold">
                See how it works
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span>Step-by-step flow</span>
              <span>Skip optional details</span>
              <span>Copy-ready output</span>
              <span>Print to PDF</span>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="soft-card rounded-[30px] p-5">
                <div className="text-sm font-semibold text-slate-500">Lower friction</div>
                <div className="mt-2 text-base font-bold text-slate-900">Starts with easy fields, not paperwork</div>
              </div>
              <div className="soft-card rounded-[30px] p-5">
                <div className="text-sm font-semibold text-slate-500">Stronger trust</div>
                <div className="mt-2 text-base font-bold text-slate-900">Resume + intro note + landlord-ready framing</div>
              </div>
              <div className="soft-card rounded-[30px] p-5">
                <div className="text-sm font-semibold text-slate-500">Better completion</div>
                <div className="mt-2 text-base font-bold text-slate-900">Optional sections never block progress</div>
              </div>
            </div>
          </div>

          <div className="dark-panel p-8 text-white md:p-10 lg:p-14 xl:p-16 2xl:p-20">
            <div className="relative z-10 rounded-[32px] border border-white/10 bg-white/6 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">Preview</p>
                  <h2 className="mt-3 text-3xl font-black">Mochi</h2>
                  <p className="mt-2 text-slate-300">Mini Goldendoodle · 3 years old · 24 lb</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-right backdrop-blur">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Status</div>
                  <div className="mt-1 text-sm font-semibold text-white">Rental-ready profile</div>
                </div>
              </div>

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
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">What users get</div>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    A clean pet resume, a landlord intro note, and a stronger case for approval.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-5 text-sm leading-7 text-slate-200 shadow-inner">
                Mochi is a well-cared-for mini Goldendoodle with a calm indoor temperament, moderate energy level, and up-to-date care records. She is house trained, easy to manage, and presented as a responsible companion for a rental home.
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Output 01</div>
                  <div className="mt-2 text-sm font-semibold text-white">Pet resume</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Output 02</div>
                  <div className="mt-2 text-sm font-semibold text-white">Intro note</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Output 03</div>
                  <div className="mt-2 text-sm font-semibold text-white">Trust checklist</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="glass-panel mx-auto mt-8 max-w-7xl rounded-[40px] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.06)] md:p-10 lg:p-12">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">How it works</span>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">A more productized flow than one overwhelming rental form</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The landing page explains the value. The guided form lives on its own page. That means more room, less clutter, and a smoother completion flow that feels more like a SaaS workflow than a messy questionnaire.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="soft-card rounded-[30px] p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">01</div>
            <h3 className="mt-3 text-2xl font-bold text-slate-950">Start with low-pressure details</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Pet name, breed, age, and a few basic facts get people moving fast instead of freezing at a huge form.
            </p>
          </div>
          <div className="soft-card rounded-[30px] p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">02</div>
            <h3 className="mt-3 text-2xl font-bold text-slate-950">Handle the actual objections</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Training, noise, behavior, and care signals are surfaced in a cleaner sequence that feels manageable.
            </p>
          </div>
          <div className="soft-card rounded-[30px] p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">03</div>
            <h3 className="mt-3 text-2xl font-bold text-slate-950">Export a cleaner application story</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Users immediately get copy-ready output they can paste into a rental application or save as a PDF.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-panel mx-auto mt-8 max-w-7xl rounded-[40px] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.06)] md:p-10 lg:p-12">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">Why this feels better</span>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">More like a modern SaaS workflow, less like paperwork hell</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Users stay inside a cleaner, dedicated workspace. They always know what matters, what they can skip, and what they are getting in return.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="soft-card rounded-[28px] p-5">
              <div className="text-sm font-semibold text-slate-500">Dedicated form page</div>
              <div className="mt-2 text-base font-bold text-slate-900">Separate workspace for deeper completion</div>
            </div>
            <div className="soft-card rounded-[28px] p-5">
              <div className="text-sm font-semibold text-slate-500">Live output panel</div>
              <div className="mt-2 text-base font-bold text-slate-900">Users see the value as they fill</div>
            </div>
            <div className="soft-card rounded-[28px] p-5">
              <div className="text-sm font-semibold text-slate-500">Optional steps</div>
              <div className="mt-2 text-base font-bold text-slate-900">Low-priority fields never block progress</div>
            </div>
            <div className="soft-card rounded-[28px] p-5">
              <div className="text-sm font-semibold text-slate-500">Copy-ready outputs</div>
              <div className="mt-2 text-base font-bold text-slate-900">Resume, intro note, and trust reminders</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-7xl rounded-[40px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-8 shadow-[0_24px_70px_rgba(16,185,129,0.08)] md:p-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-white px-3 py-1 text-sm font-semibold text-emerald-800 shadow-sm">Ready to try it?</span>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">Open the guided form in a dedicated workspace</h2>
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
