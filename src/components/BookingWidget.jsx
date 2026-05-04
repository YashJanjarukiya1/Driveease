import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, ArrowRight, Car } from "lucide-react";

const US_LOCATIONS = [
  "New York, NY – JFK Airport",
  "Los Angeles, CA – LAX Airport",
  "Chicago, IL – O'Hare Airport",
  "Houston, TX – Bush Airport",
  "Phoenix, AZ – Sky Harbor Airport",
  "Philadelphia, PA – PHL Airport",
  "San Antonio, TX – Downtown",
  "San Diego, CA – Lindbergh Field",
  "Dallas, TX – Love Field",
  "San Francisco, CA – SFO Airport",
  "Seattle, WA – Sea-Tac Airport",
  "Denver, CO – DIA Airport",
  "Las Vegas, NV – Harry Reid Airport",
  "Miami, FL – MIA Airport",
  "Atlanta, GA – Hartsfield Airport",
  "Boston, MA – Logan Airport",
  "Nashville, TN – BNA Airport",
  "Austin, TX – AUS Airport",
  "Portland, OR – PDX Airport",
  "Charlotte, NC – Douglas Airport",
];

const selectStyle = { background: "#0D1B2A" };

export default function BookingWidget({ compact = false }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    returnDate: "",
    pickupTime: "10:00",
    carType: "any",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/booking", { state: form });
  };

  if (compact) {
    /* ── COMPACT: horizontal single-row bar that sits at bottom of hero ── */
    return (
      <form
        onSubmit={handleSearch}
        className="glass-card rounded-sm px-4 py-3"
        style={{ backdropFilter: "blur(24px)", background: "rgba(10,10,15,0.75)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 items-end">

          {/* Pick-Up Location */}
          <div className="lg:col-span-2">
            <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1">
              Pick-Up Location
            </label>
            <div className="relative">
              <MapPin size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-red" />
              <select
                name="pickupLocation"
                value={form.pickupLocation}
                onChange={handleChange}
                className="input-field w-full pl-7 pr-2 py-2.5 text-xs rounded-sm appearance-none"
                required
              >
                <option value="" disabled style={selectStyle}>Select city / airport</option>
                {US_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} style={selectStyle}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1">
              Vehicle
            </label>
            <div className="relative">
              <Car size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-red" />
              <select
                name="carType"
                value={form.carType}
                onChange={handleChange}
                className="input-field w-full pl-7 pr-2 py-2.5 text-xs rounded-sm appearance-none"
              >
                <option value="any"     style={selectStyle}>Any Type</option>
                <option value="sedan"   style={selectStyle}>Sedan</option>
                <option value="suv"     style={selectStyle}>SUV</option>
                <option value="truck"   style={selectStyle}>Truck</option>
                <option value="luxury"  style={selectStyle}>Luxury</option>
                <option value="electric" style={selectStyle}>Electric</option>
                <option value="minivan" style={selectStyle}>Minivan</option>
              </select>
            </div>
          </div>

          {/* Pick-Up Date */}
          <div>
            <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1">
              Pick-Up
            </label>
            <div className="relative">
              <Calendar size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-red" />
              <input
                type="date"
                name="pickupDate"
                value={form.pickupDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="input-field w-full pl-7 pr-2 py-2.5 text-xs rounded-sm"
                required
              />
            </div>
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1">
              Return
            </label>
            <div className="relative">
              <Calendar size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-brand-silver" />
              <input
                type="date"
                name="returnDate"
                value={form.returnDate}
                onChange={handleChange}
                min={form.pickupDate || new Date().toISOString().split("T")[0]}
                className="input-field w-full pl-7 pr-2 py-2.5 text-xs rounded-sm"
                required
              />
            </div>
          </div>

          {/* Search Button */}
          <div>
            <button
              type="submit"
              className="btn-primary w-full py-2.5 text-xs rounded-sm flex items-center justify-center gap-1.5 red-glow"
            >
              Search <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Trust line */}
        <div className="flex items-center gap-4 mt-2 pt-2 border-t border-white/5">
          {["Free Cancellation", "No Hidden Fees", "Best Price Guarantee", "24/7 Support"].map((t) => (
            <span key={t} className="text-white/40 text-xs hidden sm:inline">✓ {t}</span>
          ))}
        </div>
      </form>
    );
  }

  /* ── FULL (standalone Booking page widget) ── */
  return (
    <div className="glass-card rounded-sm p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Car size={20} className="text-brand-red" />
        <h3 className="font-heading text-xl font-700 uppercase tracking-wider text-white">
          Find Your Ride
        </h3>
      </div>

      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="relative">
            <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">Pick-Up Location</label>
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-red" />
              <select name="pickupLocation" value={form.pickupLocation} onChange={handleChange}
                className="input-field w-full pl-8 pr-4 py-3 text-sm rounded-sm appearance-none" required>
                <option value="" disabled style={selectStyle}>Select pick-up city</option>
                {US_LOCATIONS.map((loc) => <option key={loc} value={loc} style={selectStyle}>{loc}</option>)}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">Drop-Off Location</label>
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-silver" />
              <select name="dropoffLocation" value={form.dropoffLocation} onChange={handleChange}
                className="input-field w-full pl-8 pr-4 py-3 text-sm rounded-sm appearance-none">
                <option value="" style={selectStyle}>Same as pick-up</option>
                {US_LOCATIONS.map((loc) => <option key={loc} value={loc} style={selectStyle}>{loc}</option>)}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">Vehicle Type</label>
            <div className="relative">
              <Car size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-red" />
              <select name="carType" value={form.carType} onChange={handleChange}
                className="input-field w-full pl-8 pr-4 py-3 text-sm rounded-sm appearance-none">
                <option value="any"     style={selectStyle}>Any Type</option>
                <option value="economy" style={selectStyle}>Economy</option>
                <option value="sedan"   style={selectStyle}>Sedan</option>
                <option value="suv"     style={selectStyle}>SUV</option>
                <option value="truck"   style={selectStyle}>Truck</option>
                <option value="luxury"  style={selectStyle}>Luxury</option>
                <option value="electric" style={selectStyle}>Electric</option>
                <option value="minivan" style={selectStyle}>Minivan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">Pick-Up Date</label>
            <div className="relative">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-red" />
              <input type="date" name="pickupDate" value={form.pickupDate} onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="input-field w-full pl-8 pr-4 py-3 text-sm rounded-sm" required />
            </div>
          </div>

          <div>
            <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">Return Date</label>
            <div className="relative">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-silver" />
              <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange}
                min={form.pickupDate || new Date().toISOString().split("T")[0]}
                className="input-field w-full pl-8 pr-4 py-3 text-sm rounded-sm" required />
            </div>
          </div>

          <div>
            <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">Pick-Up Time</label>
            <div className="relative">
              <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-red" />
              <select name="pickupTime" value={form.pickupTime} onChange={handleChange}
                className="input-field w-full pl-8 pr-4 py-3 text-sm rounded-sm appearance-none">
                {Array.from({ length: 24 }, (_, i) => {
                  const h = i.toString().padStart(2, "0");
                  const label = i === 0 ? "12:00 AM" : i < 12 ? `${i}:00 AM` : i === 12 ? "12:00 PM" : `${i - 12}:00 PM`;
                  return <option key={h} value={`${h}:00`} style={selectStyle}>{label}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-center gap-4">
          <button type="submit"
            className="btn-primary w-full sm:w-auto px-10 py-4 text-base rounded-sm flex items-center justify-center gap-2 red-glow">
            Search Available Cars <ArrowRight size={18} />
          </button>
          <p className="text-brand-silver text-xs text-center">
            ✓ Free cancellation &nbsp;·&nbsp; ✓ No hidden fees &nbsp;·&nbsp; ✓ Best price guarantee
          </p>
        </div>
      </form>
    </div>
  );
}
