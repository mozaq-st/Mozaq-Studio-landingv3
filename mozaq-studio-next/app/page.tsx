"use client";

import { useEffect, useMemo, useState, useRef } from "react";

// Small wrapper to avoid preview env duplicate vars & unify external links
function ExternalLink({ href, className = "", children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

// Reduced-motion aware reveal
function Reveal({ as: Tag = "div", className = "", children, ...props }: any) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") { setShow(true); return; }
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShow(true); return; }
    const node = ref.current;
    if (!node) { setShow(true); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((e) => e.isIntersecting && setShow(true)), { threshold: 0.15 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const cls = `transition duration-500 ease-out will-change-transform ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`;
  // @ts-ignore
  return <Tag ref={ref} className={cls} {...props}>{children}</Tag>;
}

export default function Page() {
  // THEME: quad-state (system, dark, editorial, creative)
  const MODE_KEY = "mozaq_theme_mode";
  const [mode, setMode] = useState<"system"|"dark"|"editorial"|"creative">("system");
  const mql = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  useEffect(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem(MODE_KEY) : null;
      if (saved === "dark" || saved === "editorial" || saved === "system" || saved === "creative") setMode(saved as any);
    } catch {}
  }, []);

  useEffect(() => {
    try { if (typeof window !== "undefined") localStorage.setItem(MODE_KEY, mode); } catch {}
  }, [mode]);

  const theme = useMemo(() => {
    if (mode === "system") {
      const prefersDark = !!(mql && mql.matches);
      return prefersDark ? "dark" : "editorial";
    }
    return mode;
  }, [mode, mql && mql.matches]);

  useEffect(() => {
    if (!mql) return;
    const handler = () => { if (mode === "system") setMode("system"); };
    // @ts-ignore
    mql.addEventListener ? mql.addEventListener("change", handler) : mql.addListener && mql.addListener(handler);
    return () => {
      // @ts-ignore
      mql.removeEventListener ? mql.removeEventListener("change", handler) : mql.removeListener && mql.removeListener(handler);
    };
  }, [mode, mql]);

  const pageClass = theme === "editorial" ? "min-h-screen bg-stone-50 text-stone-900"
                    : theme === "creative" ? "min-h-screen bg-[#F5F1EA] text-stone-900"
                    : "min-h-screen bg-stone-950 text-stone-100";

  const borderClass = theme === "editorial" ? "border-stone-200"
                    : theme === "creative" ? "border-stone-300/60"
                    : "border-stone-900/60";

  const ringBase = theme === "editorial" ? "ring-stone-200 hover:ring-stone-400"
                  : theme === "creative" ? "ring-stone-300 hover:ring-stone-400"
                  : "ring-stone-800 hover:ring-stone-600";

  const navText = theme === "editorial" ? "text-stone-600" : theme === "creative" ? "text-stone-700" : "text-stone-300";
  const heroMeta = theme === "editorial" ? "text-stone-500" : theme === "creative" ? "text-stone-500" : "text-stone-400";
  const heroCopy = theme === "editorial" ? "text-stone-600" : theme === "creative" ? "text-stone-700" : "text-stone-300";
  const linkMuted = theme === "editorial" ? "text-stone-700 hover:text-stone-900"
                    : theme === "creative" ? "text-stone-800 hover:text-stone-900"
                    : "text-stone-300 hover:text-white";

  const bgStyle = theme === "editorial"
      ? "radial-gradient(1200px 600px at 80% -20%, rgba(0,0,0,0.05), transparent 60%), radial-gradient(800px 400px at 0% 0%, rgba(0,0,0,0.03), transparent 60%)"
      : theme === "creative"
      ? "linear-gradient(180deg, #F5F1EA 0%, #ECE7DF 100%), radial-gradient(1000px 520px at 15% -10%, rgba(165,141,110,0.18), transparent 60%), radial-gradient(1100px 560px at 85% 0%, rgba(88,100,86,0.12), transparent 60%), radial-gradient(900px 500px at 50% 100%, rgba(173,156,120,0.14), transparent 60%)"
      : "radial-gradient(1200px 600px at 80% -20%, rgba(120,120,120,0.15), transparent 60%), radial-gradient(800px 400px at 0% 0%, rgba(255,255,255,0.06), transparent 60%)";

  const overlayClass = theme === "creative" ? "opacity-100" : "opacity-40";

  // dropdown
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      // @ts-ignore
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);
  const currentLabel = mode === "system" ? "System (auto)" : mode === "dark" ? "Dark Luxe" : mode === "editorial" ? "Editorial Luxe" : "Creative Luxe";

  const hairlineGrid = theme === "editorial" ? undefined
    : theme === "creative" ? {
      backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
      backgroundSize: "24px 24px", backgroundPosition: "0 0",
    } : {
      backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
      backgroundSize: "24px 24px", backgroundPosition: "0 0",
    };

  return (
    <div className={pageClass} style={{ fontFamily: "var(--font-body)" }}>
      {/* Background */}
      <div aria-hidden className={`fixed inset-0 -z-10 ${overlayClass}`} style={{ background: bgStyle }} />

      {/* NAVBAR */}
      <header className="sticky top-0 backdrop-blur-sm z-50">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <a href="#home" className="inline-flex items-center gap-3 group">
            <span className="font-medium tracking-widest uppercase text-sm">Mozaq Studio</span>
          </a>
          <nav className={`hidden md:flex items-center gap-8 text-sm ${navText}`}>
            <a href="#work" className="hover:text-inherit transition">Work</a>
            <a href="#services" className="hover:text-inherit transition">Services</a>
            <a href="#contact" className="hover:text-inherit transition">Contact</a>
          </nav>
          <div className="ml-6 relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              className={`px-3 py-1 text-xs rounded-xl ring-1 ${theme === "editorial" ? "ring-stone-300 text-stone-700 bg-stone-100" : "ring-stone-700 text-stone-300 bg-stone-900"} hover:opacity-90`}
              aria-expanded={open}
              aria-haspopup="menu"
              title="Switch theme"
            >
              {currentLabel}
            </button>
            {open && (
              <ul role="menu" className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden ring-1 ring-stone-700 bg-stone-900 text-stone-200 shadow-xl z-50">
                {[
                  { key: "system", label: "System (auto)" },
                  { key: "dark", label: "Dark Luxe" },
                  { key: "editorial", label: "Editorial Luxe" },
                  { key: "creative", label: "Creative Luxe" },
                ].map(opt => (
                  <li key={opt.key} role="menuitem">
                    <button
                      type="button"
                      onClick={() => { setMode(opt.key as any); setOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-stone-800 ${mode === opt.key ? "opacity-100" : "opacity-80"}`}
                      aria-pressed={mode === opt.key}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className={`relative py-28 md:py-36 ${theme === "editorial" ? "bg-stone-50" : ""}`}>
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-10 items-end">
          <Reveal className="md:col-span-7">
            <p className={`text-xs uppercase tracking-[0.3em] ${heroMeta}`}>Architecture · Product · Visualization</p>
            <h1 className={`mt-4 ${theme === "editorial" ? "text-5xl md:text-7xl" : "text-4xl md:text-6xl"} leading-tight font-semibold font-display`} style={{ letterSpacing: "0.02em" }}>
              Quiet luxury for bold ideas.
            </h1>
            <p className={`mt-6 ${heroCopy} max-w-xl`}>
              Cinematic renders, precise models, and clean brand moments. Built fast, with taste—so your pitch, review, or launch feels effortless.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ExternalLink href="https://www.behance.net/moazzan" className={`rounded-2xl px-5 py-3 text-sm font-medium ring-1 ${ringBase} transition inline-flex items-center gap-2`}>
                <span>View Portfolio</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M13.5 4.5a.75.75 0 000 1.5h5.69l-8.72 8.72a.75.75 0 101.06 1.06l8.72-8.72v5.69a.75.75 0 001.5 0V4.5a1 1 0 00-1-1h-7.25z"/><path d="M3.75 5.25A2.25 2.25 0 016 3h5.25a.75.75 0 010 1.5H6A.75.75 0 005.25 5.25v12A.75.75 0 006 18h12a.75.75 0 00.75-.75V11.25a.75.75 0 011.5 0V17.25A2.25 2.25 0 0118 19.5H6A2.25 2.25 0 013.75 17.25v-12z"/></svg>
              </ExternalLink>
              <ExternalLink href="https://wa.me/+923191016917?text=Hi%20Mozaq%20Studio%2C%20I%27d%20like%20to%20start%20a%20project." className={`rounded-2xl px-5 py-3 text-sm font-medium ring-1 ${ringBase} transition inline-flex items-center gap-2`}>
                <span>Start a project</span>
              </ExternalLink>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5">
            <div className={`relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ${theme === "editorial" ? "ring-stone-200" : theme === "creative" ? "ring-stone-300" : "ring-white/10"}`}>
              <div className={`absolute inset-0 ${theme === "editorial" ? "bg-gradient-to-br from-stone-100 to-stone-50" : theme === "creative" ? "bg-gradient-to-br from-stone-100 via-[#F0EAE2] to-[#E8E2DA]" : "bg-gradient-to-br from-stone-900 to-stone-800"}`} />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div>
                  <span className={`text-[10px] uppercase tracking-[0.3em] ${heroMeta}`}>Featured</span>
                  <h3 className="mt-2 text-xl font-medium">Mountain Retreat · Kashmir</h3>
                </div>
                <div className="grid grid-cols-3 gap-2 opacity-90">
                  <div className={`${theme === "editorial" ? "bg-stone-300/30" : theme === "creative" ? "bg-stone-300/40" : "bg-white/10"} h-20 rounded-lg`} />
                  <div className={`${theme === "editorial" ? "bg-stone-300/30" : theme === "creative" ? "bg-stone-300/40" : "bg-white/10"} h-20 rounded-lg`} />
                  <div className={`${theme === "editorial" ? "bg-stone-300/30" : theme === "creative" ? "bg-stone-300/40" : "bg-white/10"} h-20 rounded-lg`} />
                </div>
              </div>
            </div>
            <p className={`mt-3 text-xs ${heroMeta}`}>Drag-and-drop your renders here later. This tile can carousel recent work.</p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={`py-20 border-t ${borderClass}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal className="col-span-1">
              <h2 className="text-2xl md:text-3xl font-semibold font-display" style={{ letterSpacing: "0.02em" }}>What I do</h2>
              <p className={`mt-4 max-w-sm ${heroCopy}`}>Focused, senior-feel deliverables without the agency baggage.</p>
            </Reveal>
            <ul className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                { title: "Architectural Visualization", desc: "Photoreal stills & walkthroughs in D5. Fast turnarounds for reviews, pitches, and approvals." },
                { title: "3D Modeling", desc: "SketchUp · Rhino · Revit. Clean, organized files that others can pick up quickly." },
                { title: "Product & Furniture Visuals", desc: "Launch-ready hero shots and clean detail renders for decks & listings." },
                { title: "Brand & Graphic Support", desc: "Posters, case-study sheets, and polished presentation layouts that travel well." },
              ].map((item, i) => (
                <Reveal key={i} className={`group rounded-2xl p-6 ring-1 transition ${ringBase.replace("hover:", "")} hover:opacity-100`}>
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">{item.title}</h3>
                    <span className={`text-xs ${theme === "editorial" ? "text-stone-400 group-hover:text-stone-600" : theme === "creative" ? "text-stone-600 group-hover:text-stone-900" : "text-stone-500 group-hover:text-stone-300"} transition`}>→</span>
                  </div>
                  <p className={`mt-3 text-sm ${heroCopy}`}>{item.desc}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className={`py-20 border-t ${borderClass}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold font-display" style={{ letterSpacing: "0.02em" }}>Selected Work</h2>
              <p className={`mt-2 text-sm ${theme === "editorial" ? "text-stone-500" : "text-stone-400"}`}>Swap these with 6–8 hero images. Each can open a case study or external link.</p>
            </div>
            <ExternalLink href="https://www.behance.net/moazzan" className={`text-sm ${linkMuted}`}>See all on Behance →</ExternalLink>
          </div>

          <div className="mt-10 rounded-3xl p-1" style={hairlineGrid}>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <Reveal key={n} className={`group block rounded-3xl overflow-hidden ring-1 transition ${ringBase}`}>
                  <div className={`${theme === "editorial" ? "bg-stone-200" : theme === "creative" ? "bg-stone-200" : "bg-white/10"} aspect-[4/3]`} />
                  <div className="p-4 flex items-center justify_between text-sm">
                    <span className={theme === "editorial" ? "text-stone-800" : "text-stone-200"}>Project {n}</span>
                    <span className={theme === "editorial" ? "text-stone-400 group-hover:text-stone-700" : theme === "creative" ? "text-stone-600 group-hover:text-stone-900" : "text-stone-500 group-hover:text-stone-300"}>→</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / STUDIO */}
      <section className={`py-20 border-t ${borderClass}`}>
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-10 items-start">
          <Reveal className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-semibold font-display" style={{ letterSpacing: "0.02em" }}>Studio</h2>
            <p className={`mt-4 ${heroCopy} max-w-2xl`}>
              Independent studio crafting cinematic <strong>architecture</strong> and <strong>product</strong> visuals—fast, organized, and on-brief. I slot into your pipeline for reviews, pitches, and launches without the agency overhead.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs">
              <span className="px-3 py-1 rounded-full ring-1 ring-white/10">Architecture</span>
              <span className="px-3 py-1 rounded-full ring-1 ring-white/10">Product</span>
              <span className="px-3 py-1 rounded-full ring-1 ring-white/10">Hospitality</span>
              <span className="px-3 py-1 rounded-full ring-1 ring-white/10">FMCG</span>
            </div>
          </Reveal>
          <Reveal className="md:col-span-1">
            <div className={`rounded-2xl p-6 ring-1 ${ringBase.replace("hover:", "")}`}>
              <h3 className="font-medium">Why teams hire Mozaq</h3>
              <ul className={`mt-3 space-y-2 text-sm ${heroCopy}`}>
                <li>• Same-week turnarounds on single spaces</li>
                <li>• Clean handoff files (SU/Rhino/Revit)</li>
                <li>• Review-friendly stills & D5 walkthroughs</li>
                <li>• Clear comms, simple pricing</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className={`py-20 border-t ${borderClass}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold font-display" style={{ letterSpacing: "0.02em" }}>Instagram</h2>
            <ExternalLink href="https://www.instagram.com/mozaq.studio/" className={`text-sm ${linkMuted}`}>
              Follow @mozaq.studio →
            </ExternalLink>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`${theme === "editorial" ? "bg-stone-200" : theme === "creative" ? "bg-stone-200" : "bg-white/10"} aspect-square rounded-xl`} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className={`py-20 border-t ${borderClass}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className={`rounded-3xl ring-1 p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center ${theme === "editorial" ? "ring-stone-200" : theme === "creative" ? "ring-stone-300" : "ring-white/10"}`}>
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold font-display" style={{ letterSpacing: "0.02em" }}>Have a deadline? Let’s make it easy.</h3>
              <p className={`mt-2 ${heroCopy}`}>Share files, get a clear plan, receive on-time deliverables. No drama.</p>
            </div>
            <div className="flex flex-col gap-3">
              <ExternalLink href="https://www.linkedin.com/in/moazzan" className={`rounded-2xl px-5 py-3 text-sm font-medium text-center transition ${theme === "editorial" ? "bg-stone-900 text-stone-50 hover:opacity-90" : "bg-white text-stone-900 hover:opacity-90"}`}>
                Contact on LinkedIn
              </ExternalLink>
              <a href="mailto:hello@mozaqstudio.com" className={`rounded-2xl px-5 py-3 text-sm font-medium text-center transition ring-1 ${ringBase}`}>
                Email: hello@mozaqstudio.com
              </a>
              <ExternalLink href="https://wa.me/+923191016917?text=Hi%20Mozaq%20Studio%2C%20I%27d%20like%20to%20start%20a%20project." className={`rounded-2xl px-5 py-3 text-sm font-medium text-center transition ring-1 ${ringBase}`}>
                WhatsApp
              </ExternalLink>
            </div>
          </div>

          <div className={`mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${theme === "editorial" ? "text-stone-500" : "text-stone-400"}`}>
            <p>© {new Date().getFullYear()} Mozaq Studio. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className={linkMuted}>Privacy</a>
              <a href="/terms" className={linkMuted}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
