import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield, Clock, MapPin, Star, ChevronRight, ChevronLeft,
  CheckCircle, Award, Headphones, TrendingUp, Users, Play, Pause
} from "lucide-react";
import BookingWidget from "../components/BookingWidget";
import CarCard from "../components/CarCard";
import { CARS, HERO_SLIDES } from "../assets/data";

const STATS = [
  { value: "500+", label: "Locations Nationwide" },
  { value: "50K+", label: "Happy Customers" },
  { value: "200+", label: "Vehicle Models" },
  { value: "24/7", label: "Roadside Support" },
];

const FEATURES = [
  { icon: Shield,     title: "Fully Insured",       desc: "Every vehicle comes with comprehensive insurance coverage and 24/7 roadside assistance across all 50 states." },
  { icon: Clock,      title: "Instant Booking",      desc: "Reserve in under 2 minutes. No long forms, no hassle — just pick your car, dates, and hit the road." },
  { icon: MapPin,     title: "500+ Locations",       desc: "Pick up or drop off at any major airport, city center, or suburban hub. We're everywhere you need us." },
  { icon: Award,      title: "Best Price Guarantee", desc: "Found a lower price? We'll match it. No hidden fees, no surprise charges — what you see is what you pay." },
  { icon: Headphones, title: "24/7 Support",         desc: "Real humans, not bots. Our American-based support team is always a call or chat away whenever you need help." },
  { icon: TrendingUp, title: "Flexible Returns",     desc: "Plans changed? Cancel or modify your booking for free up to 48 hours before pick-up. No questions asked." },
];

const TESTIMONIALS = [
  { name: "Sarah M.", location: "Dallas, TX",        rating: 5, text: "DriveEase made our road trip from Dallas to Austin absolutely perfect. The car was spotless, pick-up was a breeze, and the price was unbeatable. Already booked for our next trip!", trip: "Dallas → Austin" },
  { name: "James R.", location: "Chicago, IL",       rating: 5, text: "Needed a truck for the weekend to help a friend move. The F-150 was available same-day, clean, and powerful. Dropped it off no problem. Will definitely use DriveEase again.", trip: "Chicago Weekend Rental" },
  { name: "Priya K.", location: "San Francisco, CA", rating: 5, text: "Flew into SFO and had the Tesla ready at the lot in minutes. No paperwork stress, seamless app check-in. The car was immaculate. This is how car rental should work.", trip: "SFO → Napa Valley" },
];

/* ─────────────────────────────────────── HERO SLIDER ─── */
function HeroSlider() {
  const navigate      = useNavigate();
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const timerRef  = useRef(null);
  const total     = HERO_SLIDES.length;

  const goTo = useCallback((idx) => setCurrent(idx), []);
  const next = useCallback(() => goTo((current + 1) % total), [current, goTo, total]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [current, goTo, total]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, 5500);
    return () => clearTimeout(timerRef.current);
  }, [current, paused, next]);

  useEffect(() => {
    const h = (e) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  const touchX = useRef(null);
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return;
    const d = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(d) > 40) d > 0 ? next() : prev();
    touchX.current = null;
  };

  const slide = HERO_SLIDES[current];

  return (
    <section
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ position: "relative", width: "100%", height: "100vh", minHeight: 680, overflow: "hidden" }}
    >
      {/* ── Background images — pure CSS crossfade, no JS transform */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            opacity: i === current ? 1 : 0,
            transition: "opacity 1.1s ease",
          }}
        >
          <img
            src={s.image}
            alt={s.tag}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "brightness(0.42)" }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* ── Dark gradient overlays (above images, below content) */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(100deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.3) 60%, transparent 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.55) 30%, transparent 60%)",
      }} />

      {/* ── Slide text content */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 clamp(1.5rem, 6vw, 6rem)", paddingTop: 100, paddingBottom: 220,
      }}>
        <div key={current} style={{ animation: "hfadeup 0.75s cubic-bezier(.22,1,.36,1) forwards" }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 32, height: 2, borderRadius: 2, background: slide.color }} />
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11,
              textTransform: "uppercase", letterSpacing: "0.22em",
              color: slide.color, background: slide.color + "18",
              border: `1px solid ${slide.color}50`,
              padding: "4px 12px", borderRadius: 999,
            }}>
              {slide.tag}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            lineHeight: 0.9, color: "#ffffff",
            marginBottom: 4, textShadow: "0 4px 40px rgba(0,0,0,0.6)",
          }}>
            {slide.headline}
          </h1>
          <h1 style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            lineHeight: 0.9, color: slide.color,
            marginBottom: 24, textShadow: `0 0 70px ${slide.color}50`,
          }}>
            {slide.subline}
          </h1>

          <p style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(0.85rem, 1.6vw, 1.1rem)",
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#B8C5D0", marginBottom: 32,
          }}>
            {slide.accent}
          </p>

          {/* Trust chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
            {["Free Cancellation", "No Hidden Fees", "24/7 Support"].map((b) => (
              <span key={b} style={{
                display: "flex", alignItems: "center", gap: 6,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "6px 14px", borderRadius: 999,
              }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill={slide.color}>
                  <path d="M5.5 0L6.8 3.9H11L7.6 6.3L8.9 10.2L5.5 7.8L2.1 10.2L3.4 6.3L0 3.9H4.2L5.5 0Z"/>
                </svg>
                {b}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <button
              onClick={() => navigate("/booking")}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.08em",
                fontSize: 14, padding: "14px 36px", borderRadius: 2,
                background: slide.color, color: "#fff", border: "none",
                cursor: "pointer", boxShadow: `0 8px 30px ${slide.color}45`,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 14px 40px ${slide.color}55`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 30px ${slide.color}45`; }}
            >
              Book Your Ride
            </button>
            <button
              onClick={() => navigate("/fleet")}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.08em",
                fontSize: 14, padding: "14px 30px", borderRadius: 2,
                background: "transparent", color: "#fff",
                border: "2px solid rgba(255,255,255,0.35)",
                cursor: "pointer", transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
            >
              Browse Fleet →
            </button>
          </div>
        </div>
      </div>

      {/* ── Slide counter — bottom left */}
      <div style={{
        position: "absolute", zIndex: 4,
        bottom: 200, left: "clamp(1.5rem, 6vw, 6rem)",
        display: "flex", alignItems: "center", gap: 12, userSelect: "none",
      }}>
        <span style={{ fontFamily: "'Bebas Neue'", fontSize: 56, color: "rgba(255,255,255,0.1)", lineHeight: 1 }}>
          {String(current + 1).padStart(2, "0")}
        </span>
        <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.15)" }} />
        <span style={{ fontFamily: "'Bebas Neue'", fontSize: 22, color: "rgba(255,255,255,0.25)", lineHeight: 1 }}>
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* ── Thumbnail strip — right side, desktop only */}
      <div style={{
        position: "absolute", zIndex: 4,
        right: 28, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 10,
      }} className="hidden lg:flex">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            style={{
              width: 74, height: 48, borderRadius: 2, overflow: "hidden",
              border: `2px solid ${i === current ? s.color : "transparent"}`,
              opacity: i === current ? 1 : 0.38,
              transform: i === current ? "scale(1.08)" : "scale(1)",
              transition: "all 0.35s ease", cursor: "pointer", padding: 0,
            }}
          >
            <img src={s.image} alt={s.tag} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            {i === current && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.15)", borderRadius: 1 }}>
                <div style={{ height: "100%", background: "#fff", borderRadius: 1, animation: paused ? "none" : "tprog 5.5s linear forwards" }} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ── Dot nav + arrows */}
      <div style={{
        position: "absolute", zIndex: 4,
        bottom: 160, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
      }}>
        <button onClick={prev} style={navBtnStyle}>
          <ChevronLeft size={16} color="#fff" />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              style={{
                height: 7, borderRadius: 4, border: "none", cursor: "pointer",
                width: i === current ? 26 : 7,
                background: i === current ? slide.color : "rgba(255,255,255,0.28)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>

        <button onClick={next} style={navBtnStyle}>
          <ChevronRight size={16} color="#fff" />
        </button>

        <button onClick={() => setPaused(p => !p)} style={{ ...navBtnStyle, marginLeft: 8 }} title={paused ? "Resume" : "Pause"}>
          {paused ? <Play size={13} color="#fff" /> : <Pause size={13} color="#fff" />}
        </button>
      </div>

      {/* ── Booking widget — pinned at absolute bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 5,
        padding: "0 clamp(1rem, 4vw, 2.5rem)", paddingBottom: 16, paddingTop: 10,
        background: "linear-gradient(to top, rgba(10,10,15,1) 70%, transparent 100%)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <BookingWidget compact />
        </div>
      </div>

      <style>{`
        @keyframes hfadeup { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes tprog   { from { width:0% } to { width:100% } }
      `}</style>
    </section>
  );
}

const navBtnStyle = {
  width: 36, height: 36, borderRadius: "50%",
  background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.18)",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer", transition: "background 0.2s ease",
};

/* ─────────────────────────────────────── HOME PAGE ─── */
export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ overflowX: "hidden" }}>
      <HeroSlider />

      {/* STATS */}
      <section className="bg-brand-red">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-5xl text-white mb-1">{value}</div>
                <div className="font-heading text-white/80 text-sm uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto" />
            <p className="font-heading text-brand-red text-sm uppercase tracking-widest mb-3">Why DriveEase</p>
            <h2 className="font-display text-5xl md:text-6xl text-white tracking-wide">
              THE SMARTER WAY<br />TO RENT A CAR
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card rounded-sm p-6 group hover:border-brand-red/40 transition-all duration-300">
                <div className="w-12 h-12 bg-brand-red/10 rounded-sm flex items-center justify-center mb-4 group-hover:bg-brand-red/20 transition-colors">
                  <Icon size={22} className="text-brand-red" />
                </div>
                <h3 className="font-heading text-lg font-700 uppercase tracking-wider text-white mb-2">{title}</h3>
                <p className="text-brand-silver text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED FLEET */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="section-divider" />
              <p className="font-heading text-brand-red text-sm uppercase tracking-widest mb-3">Our Fleet</p>
              <h2 className="font-display text-5xl md:text-6xl text-white tracking-wide">FEATURED VEHICLES</h2>
            </div>
            <Link to="/fleet" className="btn-outline px-6 py-3 text-sm rounded-sm flex items-center gap-2 self-start md:self-auto whitespace-nowrap">
              View All Cars <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARS.slice(0, 6).map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto" />
            <p className="font-heading text-brand-red text-sm uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="font-display text-5xl md:text-6xl text-white tracking-wide">
              ON THE ROAD IN<br />3 EASY STEPS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-brand-red to-brand-red/20" />
            {[
              { step: "01", title: "Choose Your Car",   desc: "Browse our fleet of 200+ vehicles. Filter by type, size, price, or features. Every car is clean, inspected, and ready to go." },
              { step: "02", title: "Pick Up Your Keys", desc: "Select from 500+ locations nationwide — airports, city centers, and suburban hubs. Check in online to skip the counter line." },
              { step: "03", title: "Hit the Road",      desc: "Drive with confidence knowing you're fully covered. 24/7 roadside assistance is always one call away if you need it." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center relative">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-sm bg-brand-steel border border-brand-red/30 mb-6 mx-auto">
                  <span className="font-display text-4xl text-brand-red">{step}</span>
                </div>
                <h3 className="font-heading text-xl font-700 uppercase tracking-wider text-white mb-3">{title}</h3>
                <p className="text-brand-silver text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => navigate("/booking")} className="btn-primary px-10 py-4 text-base rounded-sm red-glow">
              Start Your Booking
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-divider mx-auto" />
            <p className="font-heading text-brand-red text-sm uppercase tracking-widest mb-3">Customer Reviews</p>
            <h2 className="font-display text-5xl md:text-6xl text-white tracking-wide">
              REAL DRIVERS.<br />REAL STORIES.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, location, rating, text, trip }) => (
              <div key={name} className="glass-card rounded-sm p-7 relative">
                <div className="text-6xl text-brand-red/20 font-display absolute top-4 right-6 leading-none">"</div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rating)].map((_, i) => <Star key={i} size={14} className="star-filled fill-current" />)}
                </div>
                <p className="text-brand-silver text-sm leading-relaxed mb-5 relative z-10">{text}</p>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-heading font-700 text-white text-sm tracking-wide">{name}</p>
                    <p className="text-brand-silver text-xs">{location}</p>
                  </div>
                  <p className="text-brand-red text-xs font-heading uppercase tracking-wider">{trip}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 glass-card rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="star-filled fill-current" />)}
              </div>
              <div>
                <span className="font-display text-3xl text-white">4.9</span>
                <span className="text-brand-silver text-sm ml-2">out of 5</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-brand-silver">
              <Users size={16} />
              <span className="text-sm">Based on <strong className="text-white">50,000+</strong> verified customer reviews</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {["Google ⭐ 4.9", "Trustpilot ⭐ 4.8", "Yelp ⭐ 4.7"].map(r => (
                <span key={r} className="text-xs text-brand-silver bg-white/5 px-3 py-1.5 rounded-sm">{r}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-brand-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-6xl md:text-7xl text-white tracking-wide mb-4">READY TO ROLL?</h2>
          <p className="text-white/80 text-lg mb-8">
            Join 50,000+ Americans who trust DriveEase for every journey.<br />Book in minutes, drive in style.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => navigate("/booking")}
              className="bg-white text-brand-red font-heading font-700 uppercase tracking-widest px-10 py-4 text-base rounded-sm hover:bg-brand-cream transition-all hover:-translate-y-1 hover:shadow-2xl">
              Book Now — No Credit Card Required
            </button>
            <button onClick={() => navigate("/fleet")}
              className="btn-outline px-8 py-4 text-base rounded-sm border-white/50 hover:border-white">
              Browse Fleet
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
