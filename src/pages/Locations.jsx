import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, ArrowRight, Plane, Building2, Star } from "lucide-react";
import { LOCATIONS } from "../assets/data";

const US_REGIONS = {
  "Northeast": ["NY", "MA", "PA", "NJ", "CT"],
  "Southeast": ["FL", "GA", "NC", "TN", "LA"],
  "South": ["TX", "OK", "AR", "MS", "AL"],
  "Midwest": ["IL", "OH", "MI", "MN", "MO"],
  "West": ["CA", "WA", "OR", "CO", "AZ", "NV"],
};

export default function Locations() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");

  const filtered = LOCATIONS.filter((loc) => {
    const matchesSearch =
      loc.city.toLowerCase().includes(search.toLowerCase()) ||
      loc.state.toLowerCase().includes(search.toLowerCase()) ||
      loc.airport.toLowerCase().includes(search.toLowerCase());

    const matchesRegion =
      activeRegion === "All" ||
      (US_REGIONS[activeRegion] && US_REGIONS[activeRegion].includes(loc.state));

    return matchesSearch && matchesRegion;
  });

  const popular = LOCATIONS.filter((l) => l.popular);

  return (
    <div className="min-h-screen bg-brand-dark pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="section-divider" />
          <p className="font-heading text-brand-red text-sm uppercase tracking-widest mb-3">Nationwide Coverage</p>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wide mb-4">
            FIND A LOCATION
          </h1>
          <p className="text-brand-silver max-w-xl">
            With 500+ locations across all 50 states, DriveEase is always close by — at every major airport, downtown hub, and suburban neighborhood.
          </p>
        </div>

        {/* Map visual placeholder */}
        <div className="glass-card rounded-sm p-8 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 50%, #E8261A 0%, transparent 50%), radial-gradient(circle at 70% 30%, #E8261A 0%, transparent 40%)`,
            }}
          />
          <div className="relative z-10 text-center">
            <div className="flex justify-center gap-3 flex-wrap mb-4">
              {["ME", "VT", "NH", "MA", "RI", "CT", "NY", "NJ", "PA", "DE", "MD", "VA", "NC", "SC", "GA", "FL"].map((s) => (
                <span key={s} className="text-xs font-heading text-brand-silver bg-white/5 px-2 py-1 rounded-sm">
                  {s}
                </span>
              ))}
            </div>
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-3 text-brand-silver">
                <MapPin size={16} className="text-brand-red" />
                <span className="font-heading uppercase tracking-widest text-sm">
                  500+ Locations — All 50 States — 150+ Airport Locations
                </span>
                <MapPin size={16} className="text-brand-red" />
              </div>
            </div>
            <div className="flex justify-center gap-3 flex-wrap">
              {["TX", "OK", "NM", "AZ", "CA", "NV", "UT", "CO", "WY", "MT", "ID", "OR", "WA", "AK", "HI"].map((s) => (
                <span key={s} className="text-xs font-heading text-brand-silver bg-white/5 px-2 py-1 rounded-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Locations */}
        <div className="mb-12">
          <h2 className="font-heading text-xl font-700 uppercase tracking-widest text-white mb-5 flex items-center gap-2">
            <Star size={15} className="text-brand-red" /> Most Popular Cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popular.map((loc) => (
              <button
                key={loc.city}
                onClick={() => navigate(`/booking`)}
                className="glass-card rounded-sm p-5 text-left group hover:border-brand-red/40 transition-all"
              >
                <div className="w-9 h-9 bg-brand-red/10 rounded-sm flex items-center justify-center mb-3 group-hover:bg-brand-red/20 transition-colors">
                  <Plane size={15} className="text-brand-red" />
                </div>
                <h3 className="font-heading text-sm font-700 uppercase tracking-wider text-white">
                  {loc.city}
                </h3>
                <p className="text-brand-silver text-xs mt-0.5">{loc.state}</p>
                <p className="text-brand-silver text-xs mt-2">{loc.count} locations</p>
              </button>
            ))}
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-silver" />
            <input
              type="text"
              placeholder="Search by city, state, or airport..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field w-full pl-10 pr-4 py-3 rounded-sm text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", ...Object.keys(US_REGIONS)].map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`font-heading text-xs uppercase tracking-wider px-4 py-2 rounded-sm transition-all ${
                  activeRegion === region
                    ? "bg-brand-red text-white"
                    : "bg-white/5 text-brand-silver hover:bg-white/10"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Locations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((loc) => (
            <div
              key={loc.city}
              className="glass-card rounded-sm p-5 group hover:border-brand-red/40 transition-all cursor-pointer"
              onClick={() => navigate("/booking")}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-steel rounded-sm flex items-center justify-center">
                    <Building2 size={16} className="text-brand-red" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-white">
                      {loc.city}, {loc.state}
                    </h3>
                    <p className="text-brand-silver text-xs">{loc.airport}</p>
                  </div>
                </div>
                {loc.popular && (
                  <span className="badge-new px-2 py-0.5 text-white rounded-sm text-xs">Popular</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-silver text-xs">{loc.count} pick-up points</span>
                <ArrowRight size={14} className="text-brand-red group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-3xl mb-3">📍</p>
            <h3 className="font-heading text-lg text-white uppercase tracking-wider mb-2">No Locations Found</h3>
            <p className="text-brand-silver text-sm">Try a different city name or state abbreviation</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-brand-red/10 border border-brand-red/20 rounded-sm p-8 text-center">
          <h3 className="font-display text-3xl text-white mb-2">CAN'T FIND YOUR CITY?</h3>
          <p className="text-brand-silver mb-5">
            We're expanding! Call us at <a href="tel:+18005550123" className="text-brand-red hover:underline">1-800-555-0123</a> to check availability in your area.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="btn-primary px-8 py-3 text-sm rounded-sm"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
