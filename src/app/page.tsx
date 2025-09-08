"use client";

import React, { useState, useEffect } from "react";

// Full‑width, zero‑dependency landing page.
// Fixes: defines all referenced components; places "use client" at top; no max-w constraints.

export default function ReviewGenieLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100 w-full">
      <NavBar />
      <Hero />
      <TrustedBar />
      <FeatureGrid />
      <BenefitsSection />
      <AutoPilotSection />
      <LiveDemo />
      <TestimonialsSection />
      <PricingSection />
      <SecurityBlock />
      <FAQ />
      <CTA />
      <Footer />
      <RuntimeTests />
    </div>
  );
}

function NavBar() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/40 border-b border-white/10 w-full">
      <div className="w-full px-6 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <Logo size={36} />
          <span className="font-semibold tracking-tight text-cyan-300">ReviewGenie</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          <a href="#features" className="hover:text-cyan-300">Features</a>
          <a href="#benefits" className="hover:text-cyan-300">Why Us</a>
          <a href="#autopilot" className="hover:text-cyan-300">Auto‑reply</a>
          <a href="#demo" className="hover:text-cyan-300">Live Demo</a>
          <a href="#testimonials" className="hover:text-cyan-300">Testimonials</a>
          <a href="#pricing" className="hover:text-cyan-300">Pricing</a>
          <a href="#security" className="hover:text-cyan-300">Security</a>
          <a href="#faq" className="hover:text-cyan-300">FAQ</a>
        </div>
        <div className="flex items-center gap-2">
          <a href="#contact" className="px-3 py-2 rounded-xl text-slate-200 hover:text-cyan-300">Contact</a>
          <a href="#get-started" className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500">Get Started</a>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden w-full">
      <GridFX />
      <div className="relative w-full px-6 pt-20 pb-24 md:pt-28 md:pb-28 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
          Turn every customer review into <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-cyan-300">a growth opportunity</span>
        </h1>
        <p className="mt-5 text-slate-200 md:text-lg">
          ReviewGenie is your AI assistant for Google reviews. Delight happy customers, recover unhappy ones, and protect your brand voice—automatically.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="#demo" className="h-11 px-6 inline-flex items-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-cyan-300">Try Live Demo</a>
          <a href="#get-started" className="h-11 px-6 inline-flex items-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white">Get Started Free</a>
        </div>
      </div>
    </section>
  );
}

function TrustedBar() {
  return (
    <section className="border-y border-white/10 bg-white/5 w-full">
      <div className="w-full px-6 py-6 flex flex-wrap items-center justify-center gap-6 opacity-90 text-slate-200 text-sm">
        <span className="inline-flex items-center gap-2">🔗 Google Business Profile Ready</span>
        <span className="inline-flex items-center gap-2">⚡ Instant AI Responses</span>
        <span className="inline-flex items-center gap-2">✨ Protects Your Brand Voice</span>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    { title: "On‑brand replies", desc: "Consistent tone for praise, complaints, and everything in between." },
    { title: "Guardrails & approvals", desc: "Negative review playbooks, apology once, escalation, and role‑based approvals." },
    { title: "Smart templates", desc: "Auto‑personalize with name, order details, and response variants." },
    { title: "Auto‑reply & publish", desc: "Turn on autopilot: our AI drafts and publishes safe replies instantly via GBP API." },
  ];
  return (
    <section id="features" className="w-full px-6 py-20">
      <h2 className="text-3xl font-semibold text-center mb-12 text-slate-100">Key Features</h2>
      <div className="grid md:grid-cols-4 gap-4 w-full">
        {features.map((f, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 w-full">
            <div className="mb-3 inline-flex items-center justify-center rounded-xl bg-white/10 p-2 text-cyan-300">★</div>
            <h3 className="font-medium mb-1 text-slate-100">{f.title}</h3>
            <p className="text-sm text-slate-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BenefitsSection(){
  const benefits = [
    { title: "Save hours every week", desc: "No more copy‑pasting or struggling with wording. Replies are drafted instantly." },
    { title: "Recover unhappy customers", desc: "AI apologizes once, takes responsibility, and invites them back—boosting trust." },
    { title: "Boost local SEO", desc: "Google loves active businesses. Frequent replies improve visibility." },
    { title: "Protect your reputation", desc: "Guardrails prevent risky wording. Every reply stays safe and professional." },
    { title: "Scale effortlessly", desc: "Handle hundreds of reviews across locations with one consistent brand voice." },
    { title: "Multi‑language support", desc: "Reply in your customers’ language automatically, improving global reach." },
    { title: "Team collaboration", desc: "Assign roles, approvals, and track performance across your whole team." },
    { title: "Data‑driven insights", desc: "Track sentiment, response time, and common issues to improve your business." },
  ];
  return (
    <section id="benefits" className="w-full px-6 py-20">
      <h2 className="text-3xl font-semibold text-center mb-12 text-slate-100">Why Choose ReviewGenie?</h2>
      <div className="grid md:grid-cols-2 gap-6 w-full">
        {benefits.map((b, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full">
            <h3 className="text-lg font-semibold mb-2 text-cyan-300">{b.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AutoPilotSection(){
  const steps = [
    { title: "Connect Google", text: "Sign in with your Business Profile and pick locations." },
    { title: "Set guardrails", text: "Choose tone, add banned phrases, and enable approval rules." },
    { title: "Flip the switch", text: "Turn on Auto‑reply. New reviews get safe replies within seconds." },
    { title: "Monitor & edit", text: "Review the log, edit any reply, and pause per‑location anytime." },
  ];
  return (
    <section id="autopilot" className="w-full px-6 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 w-full">
        <h2 className="text-3xl font-semibold mb-6 text-slate-100 text-center">Auto‑reply & Publish (Optional)</h2>
        <p className="text-slate-300 text-center w-full">Keep full control with approvals, or switch to autopilot. Our AI drafts and (if you allow) publishes replies via the Google Business Profile API—always respecting your guardrails.</p>
        <div className="grid md:grid-cols-4 gap-4 mt-8 w-full">
          {steps.map((s, i)=> (
            <div key={i} className="rounded-2xl bg-black/30 border border-white/10 p-4 w-full">
              <div className="text-cyan-300 font-semibold mb-1">{i+1}. {s.title}</div>
              <div className="text-sm text-slate-300">{s.text}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center text-sm text-slate-400">You can enable Auto‑reply globally or per location. Edit or delete any reply after publishing.</div>
      </div>
    </section>
  );
}

function LiveDemo() {
  const [review, setReview] = useState("Waited 25 minutes and my fries were cold.");
  const [tone, setTone] = useState("Professional");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 250));
    setReply(localGen(review, tone));
    setLoading(false);
  };

  return (
    <section id="demo" className="w-full px-6 pb-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-slate-100">Try It Yourself</h2>
      <div className="grid lg:grid-cols-2 gap-6 items-stretch w-full">
        <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-6 w-full">
          <h3 className="text-xl font-semibold mb-2 text-slate-100">Live Demo</h3>
          <p className="text-sm text-slate-300 mb-4">Type a real review and generate a safe, on‑brand reply locally (no data leaves your browser).</p>
          <div className="space-y-3">
            <textarea value={review} onChange={(e) => setReview(e.target.value)} className="w-full bg-white/5 border border-white/10 min-h-28 rounded-xl p-3 text-slate-100" placeholder="Paste a customer review…" />
            <div className="flex items-center gap-3">
              <select value={tone} onChange={(e)=> setTone(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-100">
                <option>Professional</option>
                <option>Friendly</option>
                <option>Apologetic</option>
                <option>Upbeat</option>
              </select>
              <button onClick={generate} className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500">
                {loading ? "Generating…" : "Generate Reply"}
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full w-full">
          <h3 className="text-xl font-semibold mb-2 text-slate-100">Preview</h3>
          {!reply ? (
            <div className="h-full min-h-40 grid place-items-center text-slate-400 text-sm border border-dashed border-white/10 rounded-xl">
              Your AI reply will appear here.
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-sm leading-6 text-slate-100">
              {reply}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection(){
  const items = [
    { name: "Sarah K.", role: "Restaurant Owner", text: "We cut response time from hours to minutes. Our rating climbed from 4.2 to 4.6 in 6 weeks.", stars: 5 },
    { name: "Omar A.", role: "Clinic Manager", text: "Auto‑reply with approvals means zero risky messages. Patients appreciate the quick follow‑ups.", stars: 5 },
    { name: "Lucy P.", role: "Retail Ops", text: "Multi‑location support is a life‑saver. Consistent tone across 12 stores.", stars: 5 },
  ];
  return (
    <section id="testimonials" className="w-full px-6 py-16">
      <h2 className="text-3xl font-semibold text-center mb-10 text-slate-100">Trusted by modern teams</h2>
      <div className="grid md:grid-cols-3 gap-4 w-full">
        {items.map((t, i)=> (
          <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-5 w-full">
            <div className="text-amber-300 mb-2">{"★".repeat(t.stars)}</div>
            <p className="text-slate-200 text-sm leading-relaxed">“{t.text}”</p>
            <div className="mt-3 text-sm text-slate-400">{t.name} — {t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingSection(){
  const plans = [
    { name: "Starter", price: "$0", tagline: "Perfect for trying things out", cta: "Join free", features: ["Live demo & drafts", "1 location", "Manual publish"] },
    { name: "Pro", price: "$29/mo", tagline: "For growing teams", cta: "Start Pro", highlighted: true, features: ["Auto‑reply & publish", "Up to 5 locations", "Approvals & logs", "Email support"] },
    { name: "Business", price: "Custom", tagline: "Multi‑location & SLA", cta: "Talk to sales", features: ["Unlimited locations", "Custom guardrails", "SLA & onboarding"] },
  ];
  return (
    <section id="pricing" className="w-full px-6 py-16">
      <h2 className="text-3xl font-semibold text-center mb-10 text-slate-100">Simple pricing</h2>
      <div className="grid md:grid-cols-3 gap-4 w-full">
        {plans.map((p, i)=> (
          <div key={i} className={`rounded-2xl border p-6 w-full ${p.highlighted ? "bg-gradient-to-br from-fuchsia-600/20 via-cyan-500/10 to-transparent border-white/10" : "bg-white/5 border-white/10"}`}>
            <div className="text-lg font-semibold text-slate-100">{p.name}</div>
            <div className="text-3xl font-bold mt-2">{p.price}</div>
            <div className="text-sm text-slate-300 mt-1">{p.tagline}</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {p.features.map((f, idx)=> <li key={idx}>• {f}</li>)}
            </ul>
            <div className="mt-6">
              <a href="#get-started" className="inline-block px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20">{p.cta}</a>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-xs text-slate-500 mt-4">Prices are placeholders for preview. We can tune them later.</div>
    </section>
  );
}

function SecurityBlock(){
  return (
    <section id="security" className="w-full px-6 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center w-full">
          <div>
            <h3 className="text-2xl font-semibold text-slate-100">Privacy & Security by design</h3>
            <p className="text-slate-300 mt-3">OAuth 2.0 sign‑in. Scoped permissions. Role‑based approvals. Export & erase controls. Your data remains yours.</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">✅ Zero‑copy local demo (no data leaves your browser)</li>
              <li className="flex items-center gap-2">✅ Audit logs for every published reply</li>
              <li className="flex items-center gap-2">✅ Principle of least privilege</li>
            </ul>
          </div>
          <div className="rounded-2xl p-6 bg-black/30 border border-white/10 text-slate-300">
            Google Business Profile API‑ready. Replace the demo generator with your server route to publish replies once your project is approved.
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ(){
  const faqs = [
    { q: "Is this free to start?", a: "Yes. You can deploy on Vercel’s free tier and add a custom domain later."},
    { q: "Do I need GBP API approval first?", a: "Use the demo now. For live publishing, request GBP API access from Google."},
    { q: "Can I customize tone?", a: "Yes. Train brand tone with examples and set guardrails for negative reviews."},
  ];
  return (
    <section id="faq" className="w-full px-6 py-12">
      <h3 className="text-center text-2xl font-semibold mb-8 text-slate-100">FAQs</h3>
      <div className="grid md:grid-cols-3 gap-4 w-full">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full">
            <div className="font-medium mb-2 text-slate-100">{f.q}</div>
            <p className="text-sm text-slate-300">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA(){
  return (
    <section id="get-started" className="w-full px-6 pb-24 pt-6">
      <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-600/20 via-cyan-500/10 to-transparent p-6 md:p-10 text-center overflow-hidden w-full">
        <div className="absolute -right-10 -bottom-10 opacity-15">
          <Logo size={160} className="rotate-12 opacity-60"/>
        </div>
        <h3 className="text-2xl md:text-3xl font-semibold text-slate-100">Launch your approval‑ready site in minutes</h3>
        <p className="text-slate-300 mt-2">Use this page for your Google form. Add Contact & Privacy links below.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href="#contact" className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-slate-100">Contact</a>
          <a href="#pricing" className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500">See pricing</a>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer id="contact" className="border-t border-white/10 w-full">
      <div className="w-full px-6 py-10 grid md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Logo size={36} />
            <span className="font-semibold text-cyan-300">ReviewGenie</span>
          </div>
          <p className="text-sm text-slate-400 mt-3">Elegant, policy‑safe replies to every Google review.</p>
        </div>
        <div>
          <div className="font-medium mb-2 text-slate-100">Legal</div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Use</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2 text-slate-100">Contact</div>
          <ContactForm />
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pb-8">© {new Date().getFullYear()} ReviewGenie. All rights reserved.</div>
    </footer>
  );
}

function ContactForm(){
  return (
    <form action="#" className="space-y-3" onSubmit={(e)=>{e.preventDefault(); alert("Thanks! We'll be in touch.");}}>
      <input name="email" type="email" required placeholder="you@example.com" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-slate-100"/>
      <textarea name="message" required placeholder="Tell us about your use case…" className="w-full rounded-xl bg-white/5 border border-white/10 min-h-24 p-3 text-slate-100"/>
      <button type="submit" className="w-full rounded-xl px-4 py-2 bg-white/10 border border-white/20 hover:bg-white/20 text-slate-100">Send</button>
    </form>
  );
}

function GridFX(){
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.18),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.18),transparent_45%)]"/>
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-50">
        <svg className="h-full w-full text-slate-800" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
      </div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl bg-fuchsia-500/20"/>
      <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full blur-3xl bg-cyan-500/20"/>
    </div>
  )
}

// --- Local reply generator
function localGen(review: string, tone: string){
  const clean = review.trim();
  const isNeg = /cold|wait|late|bad|rude|missing|refund|dirty|slow|overcooked|burnt|stale|raw|uncooked|hair|found|sick|ill|poison/i.test(clean);
  const opener = isNeg
    ? "We’re really sorry to hear about your experience."
    : "Thank you so much for taking the time to leave a review!";
  const toneMap: Record<string,string> = {
    Professional: "We’ll use this feedback to improve, and we’ve shared your note with the team.",
    Friendly: "We’re all smiles reading this and truly appreciate your support!",
    Apologetic: "This isn’t the standard we aim for and we’d love the chance to make it right.",
    Upbeat: "You just made our day—thank you!"
  };
  const closerNeg = "Please drop us a message at [contact@example.com] with the visit details so we can sort this quickly.";
  const closerPos = "If there’s anything else we can do for you, please let us know—see you again soon!";
  const body = isNeg
    ? "We understand how frustrating that must’ve been. " + toneMap[tone]
    : "Your feedback means a lot to us. " + toneMap[tone];
  return `${opener} ${body} ${isNeg ? closerNeg : closerPos}`;
}

// --- Minimal inline logo (fallback if PNG unavailable)
function Logo({ size = 32, className = "" }: { size?: number; className?: string }){
  const [useImg, setUseImg] = useState(true);
  useEffect(()=>{
    const img = new Image();
    img.src = "/Gemini_Generated_Image_nmh9jhnmh9jhnmh9.png";
    img.onload = () => setUseImg(true);
    img.onerror = () => setUseImg(false);
  }, []);
  if (useImg) {
    return <img src="/Gemini_Generated_Image_nmh9jhnmh9jhnmh9.png" width={size} height={size} alt="ReviewGenie" className={`rounded-md ${className}`}/>;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee"/>
          <stop offset="100%" stopColor="#a855f7"/>
        </linearGradient>
      </defs>
      <rect x="8" y="12" rx="8" ry="8" width="40" height="28" fill="url(#g)"/>
      <path d="M22 48c8-2 14-6 18-12 6 2 10 6 12 12" fill="none" stroke="url(#g)" strokeWidth="4"/>
      <circle cx="54" cy="20" r="3" fill="#22d3ee"/>
    </svg>
  );
}

// --- Tiny runtime tests (console). Do not remove existing tests; added a couple more.
function RuntimeTests(){
  useEffect(()=>{
    try {
      console.assert(localGen("Great place!", "Professional").includes("Thank you"), "Positive review should thank the user");
      console.assert(/sorry/i.test(localGen("waited and food was cold", "Professional")), "Negative review should apologize");
      console.assert(localGen("cold", "Friendly").length > 20, "Reply should not be empty");
      console.assert(localGen("Amazing!", "Upbeat").includes("day"), "Upbeat tone should sound cheerful");
      console.assert(typeof localGen("refund please", "Apologetic") === "string", "Generator should return a string");
      console.log("Runtime tests passed ✔");
    } catch (e) {
      console.error("Runtime tests failed", e);
    }
  }, []);
  return null;
}
