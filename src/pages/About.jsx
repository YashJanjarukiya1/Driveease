import React from "react";
import { useNavigate } from "react-router-dom";
import { Award, Users, Globe, Zap, Heart, Shield } from "lucide-react";

const TEAM = [
  { name: "Michael Torres", role: "CEO & Co-Founder", location: "Austin, TX", bio: "20+ years in auto and travel tech. Former VP at Enterprise Holdings." },
  { name: "Amanda Chen", role: "COO", location: "New York, NY", bio: "Operations expert who scaled DriveEase to 500+ locations in 4 years." },
  { name: "David Park", role: "CTO", location: "San Francisco, CA", bio: "Built the real-time booking engine used by 50,000+ customers monthly." },
  { name: "Lisa Johnson", role: "Head of Customer Experience", location: "Chicago, IL", bio: "Leads the 24/7 US-based support team dedicated to your peace of mind." },
];

const VALUES = [
  { icon: Heart, title: "Customer-First", desc: "Every decision we make starts with one question: is this good for our customer?" },
  { icon: Shield, title: "Transparency", desc: "No fine print, no surprise charges. The price you see is the price you pay." },
  { icon: Globe, title: "Nationwide Reach", desc: "From Anchorage to Miami, we're committed to serving all 50 states equally." },
  { icon: Zap, title: "Innovation", desc: "We're constantly investing in tech to make car rental faster, simpler, and smarter." },
];

const MILESTONES = [
  { year: "2014", event: "DriveEase founded in Austin, TX with 3 locations" },
  { year: "2016", event: "Expanded to 50 locations across Texas and the South" },
  { year: "2018", event: "National launch — 200 locations in 30 states" },
  { year: "2020", event: "Launched contactless pickup and mobile check-in" },
  { year: "2022", event: "Added EV fleet — first rental company to offer 50+ EV models" },
  { year: "2024", event: "Reached 500+ locations and 50,000 monthly customers" },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-dark pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="mb-20">
          <div className="section-divider" />
          <p className="font-heading text-brand-red text-sm uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="font-display text-6xl md:text-8xl text-white tracking-wide mb-6">
            BUILT FOR
            <br />
            <span className="text-gradient">AMERICA.</span>
          </h1>
          <p className="text-brand-silver text-lg max-w-2xl leading-relaxed">
            DriveEase was born from a simple frustration: car rental in America was overpriced, complicated, and full of hidden fees. We started with 3 locations in Austin, TX and a promise — to make renting a car as easy as ordering a pizza. A decade later, we've kept that promise at 500+ locations coast to coast.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { value: "10+", label: "Years in Business" },
            { value: "500+", label: "Locations" },
            { value: "200+", label: "Vehicle Models" },
            { value: "1M+", label: "Trips Completed" },
          ].map(({ value, label }) => (
            <div key={label} className="glass-card rounded-sm p-6 text-center">
              <div className="font-display text-4xl text-brand-red mb-1">{value}</div>
              <div className="font-heading text-brand-silver text-xs uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="section-divider" />
          <p className="font-heading text-brand-red text-sm uppercase tracking-widest mb-3">What We Stand For</p>
          <h2 className="font-display text-5xl text-white tracking-wide mb-10">OUR VALUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass-card rounded-sm p-6 flex gap-5">
                <div className="w-12 h-12 bg-brand-red/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-brand-red" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-700 uppercase tracking-wider text-white mb-1">{title}</h3>
                  <p className="text-brand-silver text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="section-divider" />
          <p className="font-heading text-brand-red text-sm uppercase tracking-widest mb-3">A Decade of Growth</p>
          <h2 className="font-display text-5xl text-white tracking-wide mb-10">OUR JOURNEY</h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-brand-steel" />
            <div className="space-y-8">
              {MILESTONES.map(({ year, event }) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className="w-12 text-right flex-shrink-0">
                    <span className="font-display text-brand-red text-lg">{year}</span>
                  </div>
                  <div className="w-4 h-4 bg-brand-red rounded-sm flex-shrink-0 mt-1 relative z-10" />
                  <p className="text-brand-silver text-sm leading-relaxed pt-0.5">{event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="section-divider" />
          <p className="font-heading text-brand-red text-sm uppercase tracking-widest mb-3">The People</p>
          <h2 className="font-display text-5xl text-white tracking-wide mb-10">MEET THE TEAM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(({ name, role, location, bio }) => (
              <div key={name} className="glass-card rounded-sm p-5">
                <div className="w-16 h-16 bg-brand-steel rounded-sm flex items-center justify-center mb-4">
                  <Users size={24} className="text-brand-red" />
                </div>
                <h3 className="font-heading text-base font-700 uppercase tracking-wide text-white">{name}</h3>
                <p className="text-brand-red text-xs font-heading uppercase tracking-wider mb-1">{role}</p>
                <p className="text-brand-silver text-xs mb-3">{location}</p>
                <p className="text-brand-silver text-xs leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card rounded-sm p-10 text-center">
          <Award size={36} className="text-brand-red mx-auto mb-4" />
          <h3 className="font-display text-4xl text-white mb-3">JOIN THE DRIVEEASE FAMILY</h3>
          <p className="text-brand-silver max-w-lg mx-auto mb-6">
            Ready to experience car rental the way it should be? No drama, no hidden fees, just the open road and a great car.
          </p>
          <button
            onClick={() => navigate("/booking")}
            className="btn-primary px-10 py-4 text-base rounded-sm red-glow"
          >
            Book Your First Ride
          </button>
        </div>
      </div>
    </div>
  );
}
