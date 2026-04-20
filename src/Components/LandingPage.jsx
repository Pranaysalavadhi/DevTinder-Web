import React from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Code2, Heart, Terminal, Users, ShieldCheck, ArrowRight, MessageSquare, Sparkles, Globe } from "lucide-react";

// ─── Static Data ─────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Enterprise",   href: "#enterprise"   },
  { label: "Open Source",  href: "#open-source"  },
];

const FEATURES = [
  { icon: Terminal,    title: "Stack-First Discovery", description: "Filter by React, Go, Rust, or any niche technology. Matches fit your technical DNA."        },
  { icon: Globe,       title: "Global Collaboration",  description: "Find contributors for your open-source repo or a partner for your next startup."            },
  { icon: ShieldCheck, title: "Verified Developers",   description: "GitHub authentication ensures you're connecting with real humans who actually commit code." },
];

const TAGS    = ["Rust", "Web3"];
const AVATARS = [11, 12, 13, 14, 15];

// ─── Small Components ─────────────────────────────────────────────────────────

const GitHubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
      <Icon size={24} aria-hidden="true" />
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
  </div>
);

// ─── Page Sections ────────────────────────────────────────────────────────────

const Navbar = ({ onAuth }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 h-20 flex items-center justify-between px-6 md:px-12">
    <div className="flex items-center gap-10">
      <span className="text-2xl font-[1000] tracking-tighter text-slate-950 flex items-center gap-2">
        DEV<span className="text-indigo-600">TINDER</span>
        <Zap size={20} className="text-indigo-500 fill-current opacity-70" aria-hidden="true" />
      </span>
      <div className="hidden md:flex gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">{label}</a>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button onClick={onAuth} className="hidden sm:block text-sm font-black text-slate-700 hover:text-indigo-600 transition-colors px-4 cursor-pointer">Log in</button>
      <button onClick={onAuth} className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-black px-6 py-3 rounded-xl transition-all shadow-lg shadow-slate-200 cursor-pointer">Get Started</button>
    </div>
  </nav>
);

const Hero = ({ onAuth }) => (
  <header className="relative pt-40 pb-20 px-6 overflow-hidden">
    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-200/20 blur-[120px] rounded-full -z-10" aria-hidden="true" />
    <div className="max-w-5xl mx-auto text-center space-y-8">
      
      <h1 className="text-6xl md:text-8xl font-[1000] text-slate-950 tracking-tighter leading-[0.9]">
        Stop Solo Coding. <br />
        <span className="text-indigo-600">Start Connecting.</span>
      </h1>

      <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium leading-relaxed">
        The world's first connection platform for developers. Match by stack, contribute to projects, find your technical soulmate.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button onClick={onAuth} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 group cursor-pointer">
          Start Matching <ArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </button>
        <button onClick={onAuth} className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3 cursor-pointer">
          <GitHubIcon size={22} /> Join with GitHub
        </button>
      </div>

      <div className="pt-12 flex flex-col items-center gap-4">
        <div className="flex -space-x-3" aria-hidden="true">
          {AVATARS.map((id) => (
            <img key={id} src={`https://i.pravatar.cc/100?img=${id}`} className="w-12 h-12 rounded-full border-4 border-white object-cover" alt="" />
          ))}
        </div>
        <p className="text-sm font-bold text-slate-400">Trusted by 50,000+ developers worldwide</p>
      </div>
    </div>
  </header>
);

const Mockup = () => (
  <section className="px-6 pb-32">
    <div className="max-w-6xl mx-auto relative">
      <div className="bg-slate-950 rounded-[3rem] p-4 overflow-hidden border-8 border-slate-900">
        <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 flex flex-col md:flex-row h-[600px]">
          <aside className="w-20 border-r border-slate-800 hidden md:flex flex-col items-center py-8 gap-8" aria-hidden="true">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl" />
            <Users className="text-slate-600" /><MessageSquare className="text-slate-600" /><Terminal className="text-slate-600" />
          </aside>
          <div className="flex-1 p-8 flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent">
            <div className="w-80 bg-white rounded-3xl overflow-hidden shadow-2xl rotate-[-2deg]">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" className="h-64 w-full object-cover" alt="Developer profile preview" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-black">Alex Rivera, 24</span>
                  <ShieldCheck size={18} className="text-blue-500" aria-label="Verified" />
                </div>
                <div className="flex gap-2 mb-4">
                  {TAGS.map((tag) => <span key={tag} className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded">{tag}</span>)}
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 h-12 bg-slate-100 rounded-xl" />
                  <div className="flex-1 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                    <Heart size={20} fill="currentColor" aria-label="Like" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden lg:block" aria-hidden="true">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600"><Code2 /></div>
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Stack Match</p>
            <p className="text-lg font-black text-slate-900">98% Compatibility</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="max-w-7xl mx-auto px-6 pb-40">
    <div className="text-center mb-20 space-y-4">
      <h2 className="text-4xl md:text-5xl font-[1000] text-slate-900 tracking-tighter">Engineered for connection.</h2>
      <p className="text-slate-500 font-medium text-lg">Swipe through a feed of developers who speak your language.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {FEATURES.map((f) => <FeatureCard key={f.title} {...f} />)}
    </div>
  </section>
);

// ─── Page Root ────────────────────────────────────────────────────────────────

const LandingPage = () => {
  const navigate  = useNavigate();
  const handleAuth = () => navigate("/login");

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar   onAuth={handleAuth} />
      <Hero     onAuth={handleAuth} />
      <Mockup   />
      <Features />
    </div>
  );
};

export default LandingPage;