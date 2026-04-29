import { useState, useEffect } from "react";
import {
  Phone, X, Menu, CheckCircle, Clock, Shield, Heart, Star,
  MapPin, AlertCircle, Users, Award, Plus, Minus,
  Mail, MessageSquare, ArrowRight, Zap, Activity, Navigation,
  HeartPulse, Truck, Baby, CalendarClock
} from "lucide-react";
import CallIcon from "../components/Call";
import WhatsAppIcon from "../components/Icon";



const PHONE = "+91 9990083014";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Outfit', sans-serif; margin: 0; padding: 0; overflow-x: hidden; }
  h1, h2, h3, h4, h5 { font-family: 'Cormorant Garamond', serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.93) translateY(12px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes ping-slow {
    0%   { transform: scale(1); opacity: 0.9; }
    100% { transform: scale(2.2); opacity: 0; }
  }

  .fade-up  { animation: fadeUp 0.6s cubic-bezier(.22,.68,0,1.15) both; }
  .scale-in { animation: scaleIn 0.32s ease both; }

  .pulse-dot::before {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 2px solid #ef4444;
    animation: ping-slow 1.9s ease-out infinite;
  }
  .pulse-dot::after {
    content: '';
    position: absolute;
    inset: -11px;
    border-radius: 50%;
    border: 1.5px solid #ef4444;
    animation: ping-slow 1.9s ease-out 0.45s infinite;
  }

  .btn-red-glow:hover { box-shadow: 0 0 32px rgba(220,38,38,0.5); }
  .card-lift { transition: transform 0.28s ease, box-shadow 0.28s ease; }
  .card-lift:hover { transform: translateY(-5px); box-shadow: 0 24px 56px rgba(0,0,0,0.13); }

  .crimson-text {
    background: linear-gradient(130deg, #dc2626 0%, #f87171 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }

  /* Responsive utilities */
  .container-fluid {
    width: 100%;
    padding-left: clamp(1rem, 4vw, 4rem);
    padding-right: clamp(1rem, 4vw, 4rem);
  }

  /* Hero responsive text */
  .hero-title {
    font-size: clamp(2.8rem, 8vw, 5.5rem);
    line-height: 1;
    letter-spacing: -0.02em;
    font-weight: 700;
    color: white;
  }

  /* Section title responsive */
  .section-title {
    font-size: clamp(2.2rem, 5vw, 3.75rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  /* Booking modal scroll fix for small screens */
  .modal-scroll {
    max-height: 95vh;
    overflow-y: auto;
  }

  /* Feature strip grid responsive */
  @media (max-width: 480px) {
    .feature-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (min-width: 481px) and (max-width: 767px) {
    .feature-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .feature-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (min-width: 1024px) {
    .feature-grid { grid-template-columns: repeat(5, 1fr); }
  }
`;

/* ─── Booking Modal ─────────────────────────────────────────────────────────── */
function BookingModal({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", emergency: "", date: "" });
  const [submitted, setSubmitted] = useState(false);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden scale-in modal-scroll">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-red-500 px-5 sm:px-8 py-4 sm:py-5 overflow-hidden">
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-red-200 text-xs font-semibold tracking-widest uppercase mb-1">Emergency Dispatch</p>
              <h2 className="text-white text-2xl sm:text-3xl font-bold">Book Ambulance</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                <span className="text-red-100 text-xs">Response within 10 minutes</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors flex-shrink-0 ml-4"
            >
              <X size={18} />
            </button>
          </div>
          <a
            href={`tel:${PHONE}`}
            className="mt-4 flex items-center gap-3 bg-white/15 hover:bg-white/25 border border-white/30 px-3 sm:px-4 py-2.5 rounded-2xl transition-colors group"
          >
            <Phone size={16} className="text-white flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-red-200 text-xs">Or call directly</div>
              <div className="text-white font-bold text-sm sm:text-lg tracking-wider truncate">{PHONE}</div>
            </div>
            <ArrowRight size={16} className="text-red-200 ml-auto flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="p-5 sm:p-7">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-500 text-sm">
                We'll contact <span className="font-semibold text-gray-700">{form.phone}</span> within minutes.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Full Name *</label>
                  <input
                    name="name" required onChange={handle} placeholder="Your name"
                    className="w-full border-2 border-gray-100 focus:border-red-400 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm outline-none transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Phone *</label>
                  <input
                    name="phone" required type="tel" onChange={handle} placeholder="+91 9999999999"
                    className="w-full border-2 border-gray-100 focus:border-red-400 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm outline-none transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Pickup Address *</label>
                <input
                  name="address" required onChange={handle} placeholder="Street, City, Landmark"
                  className="w-full border-2 border-gray-100 focus:border-red-400 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm outline-none transition-colors bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Emergency Type</label>
                <select
                  name="emergency" onChange={handle}
                  className="w-full border-2 border-gray-100 focus:border-red-400 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm outline-none transition-colors bg-gray-50 focus:bg-white"
                >
                  <option value="">Select type</option>
                  {["Cardiac Emergency","Accident / Trauma","Stroke","Respiratory Distress","Maternity","General Medical"].map(o=>(
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Date & Time</label>
                <input
                  name="date" type="datetime-local" onChange={handle}
                  className="w-full border-2 border-gray-100 focus:border-red-400 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm outline-none transition-colors bg-gray-50 focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 sm:py-4 rounded-xl text-sm sm:text-base transition-all flex items-center justify-center gap-2 btn-red-glow"
              >
                <Activity size={18} /> Confirm Booking
              </button>
              <p className="text-xs text-center text-gray-400">
                For emergencies, call <strong className="text-red-500">{PHONE}</strong> directly.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Navbar ────────────────────────────────────────────────────────────────── */
function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const links = [
  
    { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
    { label: "Coverage", href: "#coverage" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/96 backdrop-blur-md shadow-lg shadow-black/6" : "bg-transparent"}`}>
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0">
            <div>
              <div className={`text-lg sm:text-xl font-bold leading-none ${scrolled ? "text-gray-900" : "text-white"}`}>
                Swift<span className="text-red-500">Med</span>
              </div>
              <div className={`text-xs mt-0.5 ${scrolled ? "text-gray-400" : "text-red-200"}`}>Emergency Services</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map(l => (
              <a
                key={l.label} href={l.href}
                className={`text-sm font-medium transition-colors hover:text-red-500 ${scrolled ? "text-gray-700" : "text-white/90"}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            <a
              href={`tel:${PHONE}`}
              className={`flex items-center gap-2 text-sm font-bold transition-colors ${scrolled ? "text-red-600" : "text-red-200 hover:text-white"}`}
            >
              <Phone size={15} />
              <span className="hidden xl:inline">{PHONE}</span>
            </a>
            <button
              onClick={onBook}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 xl:px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/25 transition-all hover:scale-105 btn-red-glow flex items-center gap-2"
            >
              <Zap size={15} /> Book Now
            </button>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${PHONE}`}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg ${scrolled ? "text-red-600 bg-red-50" : "text-white bg-white/10"}`}
            >
              <Phone size={14} />
              <span className="hidden sm:inline">Call</span>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded-xl ${scrolled ? "text-gray-800" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-2xl">
          <div className="px-4 sm:px-5 py-4 space-y-1">
            {links.map(l => (
              <a
                key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-red-50 hover:text-red-600 transition-colors text-sm"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <a href={`tel:${PHONE}`} className="flex items-center gap-3 bg-red-50 px-4 py-3 rounded-xl text-red-600 font-bold text-sm">
                <Phone size={16} /> {PHONE}
              </a>
              <button
                onClick={() => { onBook(); setMenuOpen(false); }}
                className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 btn-red-glow text-sm"
              >
                <Zap size={16} /> Book Ambulance
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────────── */
function Hero({ onBook }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?w=1800&q=85"
        alt="Ambulance emergency response"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(110deg,rgba(5,3,3,0.97) 0%,rgba(10,5,5,0.83) 52%,rgba(0,0,0,0.22) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.65) 0%,transparent 55%)" }} />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-600 to-transparent" />

      <div className="relative z-10 w-full container-fluid pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-2xl">
          {/* Live badge */}
          <div
            className="inline-flex items-center gap-2.5 border border-red-500/40 bg-red-600/15 text-red-300 text-xs font-semibold px-3 sm:px-4 py-2 rounded-full mb-6 sm:mb-8 backdrop-blur-sm fade-up"
            style={{animationDelay:"0.1s"}}
          >
            <span className="relative w-2 h-2 flex-shrink-0">
              <span className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75" />
              <span className="absolute inset-0 bg-red-400 rounded-full" />
            </span>
            24 / 7 Emergency Response — Live Now
          </div>

          <h1 className="hero-title mb-5 sm:mb-6 fade-up" style={{animationDelay:"0.2s"}}>
            Fast.<br />
            <span className="crimson-text">Reliable.</span><br />
            Life&#8209;Saving.
          </h1>

          <p
            className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg fade-up"
            style={{animationDelay:"0.34s"}}
          >
            Professional paramedics, advanced life support, and a guaranteed{" "}
            <strong className="text-white font-semibold">10-minute response</strong> — because every second counts when it matters most.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-10 sm:mb-16 fade-up"
            style={{animationDelay:"0.45s"}}
          >
            <a
              href={`tel:${PHONE}`}
              className="group flex items-center gap-3 sm:gap-4 bg-red-600 hover:bg-red-700 text-white px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-bold shadow-2xl shadow-red-900/50 transition-all hover:scale-105 btn-red-glow"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 ">
                <Phone size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-red-200 text-xs font-semibold tracking-widest uppercase">Emergency Hotline</div>
                <div className="text-lg sm:text-xl font-black tracking-wider">{PHONE}</div>
              </div>
            </a>
            <button
              onClick={onBook}
              className="flex items-center justify-center gap-3 border-2 border-white/30 hover:border-white/60 hover:bg-white/10 text-white px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-bold backdrop-blur-sm transition-all text-sm sm:text-base"
            >
              <CalendarClock size={18} /> Book Online
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5 fade-up"
            style={{animationDelay:"0.55s"}}
          >
            {[
              { n: "≤ 10 min", label: "Response Time", icon: <Clock size={14}/> },
              { n: "50,000+",  label: "Lives Saved",   icon: <Heart size={14}/> },
              { n: "200+",     label: "Ambulances",    icon: <Truck size={14}/> },
            ].map(({ n, label, icon }) => (
              <div
                key={label}
                className="bg-white/8 border border-white/12 rounded-xl sm:rounded-2xl px-2 sm:px-4 py-3 sm:py-4 backdrop-blur-sm text-center hover:bg-white/14 transition-colors"
              >
                <div className="flex justify-center mb-1.5 text-red-400">{icon}</div>
                <div className="text-white font-bold text-base sm:text-xl md:text-2xl">{n}</div>
                <div className="text-gray-400 text-xs mt-0.5 hidden xs:block">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Feature Strip ──────────────────────────────────────────────────────────── */
function FeatureStrip() {
  const items = [
    { icon: <Clock size={20}/>, title: "10-Min Response", desc: "Guaranteed fastest in the city" },
    { icon: <Shield size={20}/>, title: "Certified Paramedics", desc: "ACLS & PALS certified" },
    { icon: <Phone size={20}/>, title: "24/7 Dispatch", desc: PHONE },
    { icon: <Navigation size={20}/>, title: "GPS Tracking", desc: "Live location for family" },
    { icon: <Users size={20}/>, title: "Expert Crew", desc: "Doctors on critical units" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container-fluid">
        <div className="feature-grid grid gap-4 sm:gap-6 md:gap-8">
          {items.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl px-4 py-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 mb-3">
                {icon}
              </div>
              <div className="text-gray-800 font-semibold text-sm mb-0.5">{title}</div>
              <div className="text-gray-500 text-xs leading-snug">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    title: "Emergency ALS",
    desc: "Advanced life support with cardiac monitors, defibrillators, and IV therapy for critical emergencies.",
    img: "https://i.pinimg.com/1200x/1b/17/93/1b179309f034d6869cf6e10ef0424a56.jpg",
    tag: "Critical Care",
    icon: <HeartPulse size={13}/>
  },
  {
    title: "ICU Transport",
    desc: "Mobile intensive care unit for inter-hospital transfers with full ICU-level monitoring and specialist staff.",
    img: "https://i.pinimg.com/736x/90/58/fb/9058fb5e8dc591cc76afb60f8a97fdcc.jpg",
    tag: "ICU",
    icon: <Activity size={13}/>
  },
  {
    title: "Maternity Services",
    desc: "Specialized ambulances with trained midwife support for safe, comfortable maternity transport.",
    img: "https://i.pinimg.com/1200x/94/24/51/9424517b5705401723b28c32d8080102.jpg",
    tag: "Maternity",
    icon: <Baby size={13}/>
  },
  {
    title: "Planned Transport",
    desc: "Comfortable patient transfer for dialysis, chemotherapy, and scheduled medical appointments.",
    img: "https://i.pinimg.com/736x/cc/13/3d/cc133d1a5c5f7fee7a3bab87222756ed.jpg",
    tag: "Planned Care",
    icon: <CalendarClock size={13}/>
  },
];

function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 lg:py-28 bg-white">
      <div className="container-fluid">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 sm:mb-16 gap-5 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-bold px-4 py-2 rounded-full mb-3 sm:mb-4 tracking-widest uppercase">
              <Heart size={12}/> Our Services
            </div>
            <h2 className="section-title text-gray-900">
              Every Emergency,<br/><span className="crimson-text">Every Need</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm">
            The right ambulance and team for every situation — from life-threatening crises to planned transfers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SERVICES.map(({ title, desc, img, tag, icon }) => (
            <div key={title} className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 card-lift shadow-sm">
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <img
                  src={img} alt={title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/75 via-gray-950/15 to-transparent" />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  {icon} {tag}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2">{title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA / About ────────────────────────────────────────────────────────────── */
function CTA({ onBook }) {
  return (
    <section id="about" className="py-12 sm:py-20 lg:py-28 bg-gray-50">
      <div className="container-fluid">
        <div className="bg-gray-950 rounded-2xl sm:rounded-[2.5rem] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image side */}
            <div className="relative h-56 sm:h-72 lg:h-auto lg:min-h-[520px] overflow-hidden">
              <img
                src="https://i.pinimg.com/736x/f8/18/eb/f818eb03286c307fba10bbe343bcd94a.jpg"
                alt="Paramedic team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-950/85 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent lg:hidden" />
              {/* Info card */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl max-w-[240px] sm:max-w-xs">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-red-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={15} className="text-red-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 font-medium">24/7 Emergency</div>
                    <a href={`tel:${PHONE}`} className="text-red-600 font-black text-sm hover:underline truncate block">{PHONE}</a>
                  </div>
                </div>
                <div className="flex gap-2">
                  {[["50K+","Lives"],["6yr","Trusted"]].map(([n,l])=>(
                    <div key={l} className="flex-1 bg-gray-50 rounded-lg sm:rounded-xl py-1.5 sm:py-2 text-center">
                      <div className="text-gray-900 font-black text-xs sm:text-sm">{n}</div>
                      <div className="text-gray-400 text-xs">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content side */}
            <div className="flex flex-col justify-center px-5 sm:px-8 py-10 sm:py-14 lg:px-14">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-2 rounded-full mb-5 sm:mb-6 w-fit tracking-widest uppercase">
                <AlertCircle size={12}/> Trusted Since 2020
              </div>
              <h2 className="section-title text-white mb-4 sm:mb-5">
                Every Minute<br/><span className="crimson-text">Matters.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6 sm:mb-7 text-sm sm:text-base">
                SwiftMed has been India's most trusted emergency ambulance service for over 6 years. 200+ advanced ambulances, paramedics trained to handle any crisis — cardiac arrest to accident trauma.
              </p>
              <ul className="space-y-2.5 sm:space-y-3 mb-7 sm:mb-9">
                {[
                  "State-of-the-art equipment on every unit",
                  "Multilingual crew for patient comfort",
                  "Insurance-compatible billing & paperwork",
                  "Free follow-up wellness call after service"
                ].map(item=>(
                  <li key={item} className="flex items-start gap-3 text-gray-300 text-sm">
                    <CheckCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5"/> {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                <button
                  onClick={onBook}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 btn-red-glow text-sm sm:text-base"
                >
                  <Zap size={16}/> Book Ambulance
                </button>
                <a
                  href={`tel:${PHONE}`}
                  className="border border-gray-700 hover:border-red-500 text-gray-300 hover:text-red-400 font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Phone size={16}/> {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────────────────────── */
function Testimonials() {
  const reviews = [
    {
      name:"Rajesh Kumar", role:"Cardiac Patient",
      text:"The paramedics arrived within 8 minutes and stabilized my father before reaching hospital. Absolutely professional and deeply compassionate.",
      rating:5, img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80"
    },
    {
      name:"Priya Sharma", role:"Maternity Care",
      text:"SwiftMed's maternity ambulance made my emergency delivery safe. The crew was calm, skilled and made me feel secure throughout the journey.",
      rating:5, img:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80"
    },
    {
      name:"Mohammed Ali", role:"Accident Survivor",
      text:"After a road accident SwiftMed reached before any other service. Their quick action and expert care saved my leg. Forever grateful.",
      rating:5, img:"https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&q=80"
    },
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-28 bg-white">
      <div className="container-fluid">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-bold px-4 py-2 rounded-full mb-4 tracking-widest uppercase">
            <Star size={12}/> Testimonials
          </div>
          <h2 className="section-title text-gray-900 mb-3 sm:mb-4">
            Lives Saved,<br/><span className="crimson-text">Trust Earned</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map(({ name, role, text, rating, img }) => (
            <div key={name} className="bg-gray-50 border border-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-7 card-lift">
              <div className="flex gap-1 mb-4 sm:mb-5">
                {Array.from({length:rating}).map((_,i)=>(
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400"/>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-5 sm:mb-7 text-sm sm:text-base italic">"{text}"</p>
              <div className="flex items-center gap-3">
                <img src={img} alt={name} className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-red-100 flex-shrink-0"/>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{name}</div>
                  <div className="text-gray-400 text-xs">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Map / Coverage Section ─────────────────────────────────────────────────── */
const CITIES = [
  { name: "Noida", active: true },
  { name: "Greater Noida", active: true },
  { name: "Noida Extension", active: true },
  { name: "Sector 62", active: true },
  { name: "Sector 18", active: true },
  { name: "Sector 137", active: true },
  { name: "Ghaziabad", active: true },
  { name: "Indirapuram", active: true },
  { name: "Vasundhara", active: false },
  { name: "Vaishali", active: false },
];

function MapSection() {
  return (
    <section id="coverage" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container-fluid">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-bold px-4 py-2 rounded-full mb-4 tracking-widest uppercase">
            <MapPin size={12}/> Coverage Map
          </div>
          <h2 className="section-title text-gray-900 mb-3 sm:mb-4">
            We're Where<br/><span className="crimson-text">You Need Us</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Fast ambulance service across Noida NCR for quick emergency response.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Map */}
          <div className="lg:col-span-2 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm" style={{ height: "min(400px, 50vw)", minHeight: 240 }}>
            <iframe
              src="https://www.google.com/maps?q=Noida,NCR&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              title="Coverage map"
            />
          </div>

          {/* Coverage list */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-700">Service Areas</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {CITIES.map(({ name, active }) => (
                <div
                  key={name}
                  className={`rounded-xl px-3 py-3 border text-center transition ${
                    active
                      ? "bg-white border-red-100 shadow-sm hover:shadow-md"
                      : "bg-gray-50 border-gray-100 opacity-60"
                  }`}
                >
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">{name}</div>
                  <div className={`mt-1 text-xs font-medium ${active ? "text-green-600" : "text-gray-400"}`}>
                    {active ? "Active" : "Soon"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "How quickly can SwiftMed reach me in an emergency?",
    a: "Our average response time is under 10 minutes within primary coverage zones. We operate a large fleet of strategically positioned ambulances to ensure the fastest possible dispatch to your location."
  },
  {
    q: "What medical equipment is on board each ambulance?",
    a: "All ambulances carry cardiac monitors, defibrillators, oxygen systems, IV therapy equipment, stretcher beds, and life-saving drugs. ALS units also carry ventilators and advanced airway management tools."
  },
  {
    q: "Is SwiftMed covered by health insurance?",
    a: "Yes. SwiftMed is empaneled with all major Indian health insurers including Star Health, HDFC Ergo, Bajaj Allianz, and government schemes like Ayushman Bharat. Our team handles all insurance paperwork."
  },
  {
    q: "Can I pre-book for a non-emergency transfer?",
    a: "Absolutely. Book via our website form, call our dispatch center at 1800-108-108, or use our mobile app to schedule up to 30 days in advance."
  },
  {
    q: "Do you provide air ambulance services?",
    a: "Yes, we offer air ambulance services for long-distance inter-city or inter-state medical transfers in critical conditions. Call our hotline for coordination and pricing."
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-28 bg-gray-50">
      <div className="container-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-bold px-4 py-2 rounded-full mb-5 sm:mb-6 tracking-widest uppercase">
              <MessageSquare size={12}/> FAQ
            </div>
            <h2 className="section-title text-gray-900 mb-4 sm:mb-5">
              Common<br/><span className="crimson-text">Questions</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              Everything you need to know about SwiftMed. Can't find your answer?
            </p>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 sm:gap-3 bg-red-600 hover:bg-red-700 text-white font-bold px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all btn-red-glow text-sm sm:text-base"
            >
              <Phone size={16}/> Call {PHONE}
            </a>
          </div>

          {/* Right column - accordion */}
          <div className="lg:col-span-3 space-y-2 sm:space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`bg-white border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${open===i ? "border-red-200 shadow-md shadow-red-50" : "border-gray-100"}`}
              >
                <button
                  onClick={() => setOpen(open===i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <span className={`font-semibold text-xs sm:text-sm leading-snug transition-colors ${open===i ? "text-red-600" : "text-gray-900"}`}>
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${open===i ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                    {open===i ? <Minus size={12}/> : <Plus size={12}/>}
                  </div>
                </button>
                {open===i && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed border-t border-red-50 pt-3 sm:pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", msg:"" });
  const [sent, setSent] = useState(false);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container-fluid">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase">
            <Mail size={12}/> Contact
          </div>
          <h2 className="section-title text-gray-900 mb-2">
            Get In <span className="text-red-600">Touch</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Reach out for bookings or queries. For emergencies, call directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* LEFT */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden" style={{height: "clamp(180px, 30vw, 240px)"}}>
              <img
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80"
                alt="Ambulance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
              <div className="absolute bottom-0 p-3 sm:p-4">
                <p className="text-white font-semibold text-base sm:text-lg">24/7 Support</p>
                <p className="text-gray-200 text-xs">Always available</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
              {[
                { icon:<Phone size={15}/>, label:"Emergency", value:PHONE, href:`tel:${PHONE}` },
                { icon:<Mail size={15}/>, label:"Email", value:"hello@swiftmed.in", href:"mailto:hello@swiftmed.in" },
                { icon:<MapPin size={15}/>, label:"Location", value:"Noida NCR", href:"#" },
              ].map(({ icon, label, value, href }) => (
                <a
                  key={label} href={href}
                  className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-red-400 transition"
                >
                  <span className="text-red-600 mt-0.5 flex-shrink-0">{icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-xs sm:text-sm text-gray-900 font-semibold truncate">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT - Form */}
          <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm">
            {sent ? (
              <div className="text-center py-8 sm:py-10">
                <CheckCircle size={30} className="text-green-500 mx-auto mb-3"/>
                <h3 className="text-gray-900 font-semibold text-lg">Message Sent</h3>
                <p className="text-gray-500 text-sm mt-1">We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Name</label>
                    <input
                      name="name" required onChange={handle}
                      className="w-full border border-gray-300 focus:border-red-500 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Phone</label>
                    <input
                      name="phone" required onChange={handle}
                      className="w-full border border-gray-300 focus:border-red-500 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none"
                      placeholder="+91 9999999999"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Email</label>
                  <input
                    name="email" onChange={handle}
                    className="w-full border border-gray-300 focus:border-red-500 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Message</label>
                  <textarea
                    name="msg" required rows={4} onChange={handle}
                    className="w-full border border-gray-300 focus:border-red-500 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-sm transition btn-red-glow"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-black text-gray-500 pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="container-fluid">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <span className="font-bold text-lg sm:text-xl text-white">Swift<span className="text-red-500">Med</span></span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
              India's most trusted emergency ambulance service. Saving lives since 2020.
            </p>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 text-red-400 font-bold hover:text-red-300 transition-colors text-xs sm:text-sm">
              <Phone size={13}/> {PHONE}
            </a>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-5 text-xs uppercase tracking-widest">Services</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {["Emergency ALS","ICU Transport","Maternity Services","Planned Transport","Air Ambulance"].map(s=>(
                <li key={s}><a href="#services" className="hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-5 text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {["About Us","Our Fleet","FAQ","Contact"].map(s=>(
                <li key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-5 text-xs uppercase tracking-widest">Coverage</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {["Noida","Greater Noida","Noida Extension","Sector 62","Ghaziabad","Indirapuram"].map(s=>(
                <li key={s} className="flex items-center gap-2"><MapPin size={10} className="text-red-500 flex-shrink-0"/>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs">
          <p>© 2026 SwiftMed Emergency Services. All rights reserved.</p>
        
        </div>
      </div>
    </footer>
  );
}

/* ─── Floating CTA (mobile only) ─────────────────────────────────────────────── */
function FloatingCTA({ onBook }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-30 flex justify-center gap-3 px-4 sm:hidden">
     
    
    </div>
  );
}

/* ─── App ────────────────────────────────────────────────────────────────────── */
export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBook = () => setBookingOpen(true);

  return (
    <>
      <style>{GLOBAL_STYLES}</style>
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
      <Navbar onBook={openBook} />
      <Hero onBook={openBook} />
      <FeatureStrip />
      <Services />
      <CTA onBook={openBook} />
      <Testimonials />
      <MapSection />
      <FAQ />
      <Contact />
   <CallIcon/>
   <WhatsAppIcon/>
      <Footer />
      <FloatingCTA onBook={openBook} />
    </>
  );
}