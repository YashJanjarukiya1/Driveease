import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CheckCircle, User, CreditCard, ArrowRight,
  ArrowLeft, MapPin, Calendar, Clock, Shield, Info
} from "lucide-react";
import { CARS } from "../assets/data";

const STEPS = ["Search", "Select Car", "Your Details", "Payment", "Confirmation"];

const INSURANCE_OPTIONS = [
  { id: "basic",    label: "Basic Coverage",          price: 0,  desc: "Liability only — your personal auto policy may apply." },
  { id: "standard", label: "Standard Protection",     price: 12, desc: "Collision Damage Waiver + Liability + Theft Protection." },
  { id: "premium",  label: "Premium Peace of Mind",   price: 22, desc: "Full coverage + Roadside Assistance + Personal Accident Insurance." },
];

const ADDONS = [
  { id: "gps",      label: "GPS Navigation",        price: 5,  icon: "🗺️" },
  { id: "carseat",  label: "Child Safety Seat",     price: 8,  icon: "👶" },
  { id: "driver",   label: "Additional Driver",     price: 10, icon: "👤" },
  { id: "wifi",     label: "Portable WiFi Hotspot", price: 7,  icon: "📶" },
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12 overflow-x-auto pb-2">
      {STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center gap-1.5 min-w-max">
            <div
              className={`w-9 h-9 rounded-sm flex items-center justify-center text-sm font-heading font-700 transition-all duration-300 ${
                i < current
                  ? "bg-brand-red text-white"
                  : i === current
                  ? "bg-brand-red text-white ring-2 ring-brand-red/30 ring-offset-2 ring-offset-brand-dark"
                  : "bg-white/10 text-brand-silver"
              }`}
            >
              {i < current ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span className={`text-xs font-heading uppercase tracking-wider hidden sm:block ${
              i === current ? "text-brand-red" : i < current ? "text-white" : "text-brand-silver"
            }`}>
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-0.5 w-12 md:w-20 mx-1 transition-all duration-300 ${
              i < current ? "bg-brand-red" : "bg-white/10"
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Booking() {
  const { state } = useLocation();
  const [step, setStep]               = useState(state?.pickupLocation ? 1 : 0);
  const [selectedCar, setSelectedCar] = useState(null);
  const [insurance, setInsurance]     = useState("standard");
  const [addons, setAddons]           = useState([]);
  const [bookingRef]                  = useState(`DE-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);

  const [search, setSearch] = useState({
    pickupLocation: state?.pickupLocation || "",
    returnDate:     state?.returnDate     || "",
    pickupDate:     state?.pickupDate     || "",
    pickupTime:     state?.pickupTime     || "10:00",
    carType:        state?.carType        || "any",
  });

  const [personal, setPersonal] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    driverLicense: "", licenseState: "", age: "",
  });

  const [payment, setPayment] = useState({
    cardName: "", cardNumber: "", expiry: "", cvv: "", billingZip: "",
  });

  const days = search.pickupDate && search.returnDate
    ? Math.max(1, Math.ceil((new Date(search.returnDate) - new Date(search.pickupDate)) / 86400000))
    : 3;

  const car         = CARS.find((c) => c.id === selectedCar) || CARS[0];
  const insuranceFee = INSURANCE_OPTIONS.find((o) => o.id === insurance)?.price || 0;
  const addonsFee   = addons.reduce((s, id) => s + (ADDONS.find((a) => a.id === id)?.price || 0), 0);
  const subtotal    = (car?.pricePerDay || 0) * days;
  const taxes       = Math.round(subtotal * 0.12);
  const total       = subtotal + (insuranceFee + addonsFee) * days + taxes;

  const toggleAddon = (id) =>
    setAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);

  const filteredCars = search.carType === "any"
    ? CARS
    : CARS.filter((c) => c.category.toLowerCase().includes(search.carType.toLowerCase()));

  return (
    <div className="min-h-screen bg-brand-dark pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        <div className="mb-10 text-center">
          <div className="section-divider mx-auto" />
          <h1 className="font-display text-5xl md:text-6xl text-white tracking-wide">
            BOOK YOUR CAR
          </h1>
        </div>

        <StepIndicator current={step} />

        {/* STEP 0 — SEARCH */}
        {step === 0 && (
          <div className="glass-card rounded-sm p-8">
            <h2 className="font-heading text-2xl font-700 uppercase tracking-wider text-white mb-6">
              Trip Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: "Pick-Up Location", name: "pickupLocation", icon: MapPin,   type: "text", placeholder: "City or Airport" },
                { label: "Pick-Up Date",     name: "pickupDate",     icon: Calendar, type: "date" },
                { label: "Return Date",      name: "returnDate",     icon: Calendar, type: "date" },
                { label: "Pick-Up Time",     name: "pickupTime",     icon: Clock,    type: "time" },
              ].map(({ label, name, icon: Icon, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">{label}</label>
                  <div className="relative">
                    <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-red" />
                    <input
                      type={type}
                      name={name}
                      value={search[name]}
                      placeholder={placeholder}
                      min={type === "date" ? new Date().toISOString().split("T")[0] : undefined}
                      onChange={(e) => setSearch({ ...search, [name]: e.target.value })}
                      className="input-field w-full pl-9 pr-4 py-3 text-sm rounded-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              disabled={!search.pickupDate || !search.returnDate}
              className="btn-primary mt-6 px-8 py-3.5 text-sm rounded-sm flex items-center gap-2 disabled:opacity-50"
            >
              Find Available Cars <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 1 — SELECT CAR */}
        {step === 1 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-700 uppercase tracking-wider text-white">
                Select Your Vehicle
              </h2>
              <span className="text-brand-silver text-sm bg-white/5 px-3 py-1.5 rounded-sm">
                {days} day{days !== 1 ? "s" : ""} rental
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
              {filteredCars.map((c) => {
                const isSelected = selectedCar === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCar(c.id)}
                    className="glass-card rounded-sm overflow-hidden cursor-pointer transition-all duration-300 group"
                    style={{
                      border:     isSelected ? "2px solid #E8261A" : "1px solid rgba(255,255,255,0.06)",
                      boxShadow:  isSelected ? "0 0 0 3px rgba(232,38,26,0.18), 0 8px 32px rgba(0,0,0,0.3)" : "none",
                      transform:  isSelected ? "translateY(-3px)" : "translateY(0)",
                    }}
                  >
                    <div className="relative h-40 overflow-hidden bg-brand-steel">
                      {c.image ? (
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-steel to-brand-navy">
                          <span className="font-display text-5xl opacity-30" style={{ color: c.color }}>
                            {c.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-2 text-xs font-heading uppercase tracking-wider text-white/80 bg-black/50 backdrop-blur px-2 py-0.5 rounded-full">
                        {c.category}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-7 h-7 bg-brand-red rounded-full flex items-center justify-center">
                          <CheckCircle size={15} className="text-white" />
                        </div>
                      )}
                      {c.badge && (
                        <span className="absolute top-2 left-2 text-xs font-heading font-700 uppercase tracking-wider text-white bg-brand-red px-2 py-0.5 rounded-sm">
                          {c.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-heading text-base font-700 text-white tracking-wide leading-tight">{c.name}</h3>
                        <div className="text-right flex-shrink-0 ml-2">
                          <span className="font-display text-xl text-brand-red">${c.pricePerDay}</span>
                          <span className="text-brand-silver text-xs">/day</span>
                          <p className="text-brand-silver text-xs mt-0.5">${c.pricePerDay * days} total</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {c.features.slice(0, 3).map((f) => (
                          <span key={f} className="text-xs bg-white/5 text-brand-silver px-2 py-0.5 rounded-sm">{f}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-xs">
                        <div className="bg-white/5 rounded-sm px-2 py-1.5 text-center text-brand-silver">👤 {c.seats} seats</div>
                        <div className="bg-white/5 rounded-sm px-2 py-1.5 text-center text-brand-silver">⚙️ {c.transmission}</div>
                        <div className="bg-white/5 rounded-sm px-2 py-1.5 text-center text-brand-silver">⛽ {c.fuel}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-outline px-6 py-3 text-sm rounded-sm flex items-center gap-2">
                <ArrowLeft size={15} /> Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!selectedCar}
                className="btn-primary px-8 py-3 text-sm rounded-sm flex items-center gap-2 disabled:opacity-50"
              >
                Continue <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — PERSONAL INFO */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card rounded-sm p-7">
              <h2 className="font-heading text-xl font-700 uppercase tracking-wider text-white mb-6 flex items-center gap-2">
                <User size={18} className="text-brand-red" /> Driver Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { label: "First Name",       name: "firstName",     placeholder: "John" },
                  { label: "Last Name",        name: "lastName",      placeholder: "Smith" },
                  { label: "Email Address",    name: "email",         placeholder: "john@example.com", type: "email" },
                  { label: "Phone Number",     name: "phone",         placeholder: "(555) 000-0000",   type: "tel" },
                  { label: "Driver's License", name: "driverLicense", placeholder: "DL123456789" },
                  { label: "License State",    name: "licenseState",  placeholder: "e.g. TX" },
                ].map(({ label, name, placeholder, type = "text" }) => (
                  <div key={name}>
                    <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={personal[name]}
                      onChange={(e) => setPersonal({ ...personal, [name]: e.target.value })}
                      className="input-field w-full px-4 py-3 text-sm rounded-sm"
                    />
                  </div>
                ))}
              </div>

              <h3 className="font-heading text-base font-700 uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                <Shield size={15} className="text-brand-red" /> Insurance Coverage
              </h3>
              <div className="space-y-3 mb-6">
                {INSURANCE_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-3 cursor-pointer p-3.5 rounded-sm border transition-all ${
                      insurance === opt.id ? "border-brand-red bg-brand-red/5" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="insurance"
                      value={opt.id}
                      checked={insurance === opt.id}
                      onChange={() => setInsurance(opt.id)}
                      className="accent-brand-red mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-sm text-white uppercase tracking-wider">{opt.label}</span>
                        <span className="text-brand-red text-sm font-600">
                          {opt.price === 0 ? "Included" : `+$${opt.price}/day`}
                        </span>
                      </div>
                      <p className="text-brand-silver text-xs mt-0.5">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <h3 className="font-heading text-base font-700 uppercase tracking-wider text-white mb-3">Extras & Add-Ons</h3>
              <div className="grid grid-cols-2 gap-3">
                {ADDONS.map((addon) => (
                  <label
                    key={addon.id}
                    className={`flex items-center gap-3 cursor-pointer p-3 rounded-sm border transition-all ${
                      addons.includes(addon.id) ? "border-brand-red bg-brand-red/5" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={addons.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                      className="accent-brand-red"
                    />
                    <span className="text-lg">{addon.icon}</span>
                    <div>
                      <p className="text-white text-xs font-600">{addon.label}</p>
                      <p className="text-brand-red text-xs">+${addon.price}/day</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-sm overflow-hidden h-fit sticky top-28">
              {car.image && (
                <div className="relative h-36 overflow-hidden">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-heading text-xs text-white/70 uppercase tracking-wider">{car.category}</p>
                    <p className="font-heading text-sm font-700 text-white">{car.name}</p>
                  </div>
                </div>
              )}
              <div className="p-5">
                <h3 className="font-heading text-base font-700 uppercase tracking-wider text-white mb-4">Booking Summary</h3>
                <div className="space-y-2.5 text-sm mb-4">
                  <div className="flex justify-between text-brand-silver">
                    <span>{car.name}</span>
                    <span>${car.pricePerDay}/day</span>
                  </div>
                  <div className="flex justify-between text-brand-silver">
                    <span>{days} day{days !== 1 ? "s" : ""}</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-brand-silver">
                    <span>Insurance</span>
                    <span>${insuranceFee * days}</span>
                  </div>
                  {addonsFee > 0 && (
                    <div className="flex justify-between text-brand-silver">
                      <span>Add-ons</span>
                      <span>${addonsFee * days}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-brand-silver">
                    <span>Taxes & Fees (12%)</span>
                    <span>${taxes}</span>
                  </div>
                  <div className="border-t border-white/10 pt-2.5 flex justify-between text-white font-700">
                    <span className="font-heading uppercase tracking-wider">Total</span>
                    <span className="text-brand-red font-display text-xl">${total}</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-brand-silver">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={11} className="text-brand-red" /> Free cancellation until 48h before
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={11} className="text-brand-red" /> No credit card surcharges
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex gap-3">
              <button onClick={() => setStep(1)} className="btn-outline px-6 py-3 text-sm rounded-sm flex items-center gap-2">
                <ArrowLeft size={15} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!personal.firstName || !personal.email}
                className="btn-primary px-8 py-3 text-sm rounded-sm flex items-center gap-2 disabled:opacity-50"
              >
                Continue to Payment <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — PAYMENT */}
        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card rounded-sm p-7">
              <h2 className="font-heading text-xl font-700 uppercase tracking-wider text-white mb-6 flex items-center gap-2">
                <CreditCard size={18} className="text-brand-red" /> Payment Information
              </h2>
              <div className="flex items-center gap-2 text-xs text-brand-silver bg-brand-steel/50 px-3 py-2.5 rounded-sm mb-5">
                <Info size={13} className="text-brand-red flex-shrink-0" />
                This is a demo site — no real charges will be made. Use any test data.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">Name on Card</label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    value={payment.cardName}
                    onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                    className="input-field w-full px-4 py-3 text-sm rounded-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">Card Number</label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                    value={payment.cardNumber}
                    onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim() })}
                    className="input-field w-full px-4 py-3 text-sm rounded-sm font-mono tracking-wider"
                  />
                </div>
                <div>
                  <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    maxLength={7}
                    value={payment.expiry}
                    onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                    className="input-field w-full px-4 py-3 text-sm rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    value={payment.cvv}
                    onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                    className="input-field w-full px-4 py-3 text-sm rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">Billing ZIP Code</label>
                  <input
                    type="text"
                    placeholder="75201"
                    maxLength={5}
                    value={payment.billingZip}
                    onChange={(e) => setPayment({ ...payment, billingZip: e.target.value })}
                    className="input-field w-full px-4 py-3 text-sm rounded-sm"
                  />
                </div>
              </div>
            </div>

            <div className="glass-card rounded-sm p-5 h-fit sticky top-28">
              <h3 className="font-heading text-base font-700 uppercase tracking-wider text-white mb-4">Order Total</h3>
              <div className="text-center py-4">
                <span className="font-display text-5xl text-brand-red">${total}</span>
                <p className="text-brand-silver text-xs mt-1">All taxes and fees included</p>
              </div>
              <div className="border-t border-white/10 pt-4 space-y-1.5 text-xs text-brand-silver">
                <div className="flex items-center gap-1.5">
                  <Shield size={11} className="text-brand-red" /> Secure 256-bit SSL encryption
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={11} className="text-brand-red" /> Instant booking confirmation
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex gap-3">
              <button onClick={() => setStep(2)} className="btn-outline px-6 py-3 text-sm rounded-sm flex items-center gap-2">
                <ArrowLeft size={15} /> Back
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!payment.cardName || !payment.cardNumber}
                className="btn-primary px-8 py-3 text-sm rounded-sm flex items-center gap-2 disabled:opacity-50 red-glow"
              >
                Confirm Booking — ${total} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — CONFIRMATION */}
        {step === 4 && (
          <div className="text-center">
            <div className="glass-card rounded-sm overflow-hidden max-w-lg mx-auto">

              {car.image && (
                <div className="relative h-48 overflow-hidden">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
                    <div className="w-12 h-12 bg-brand-red rounded-full flex items-center justify-center mb-1 shadow-lg">
                      <CheckCircle size={24} className="text-white" />
                    </div>
                    <span className="font-display text-white text-lg tracking-wider drop-shadow">
                      BOOKING CONFIRMED!
                    </span>
                  </div>
                </div>
              )}

              <div className="p-8">
                {!car.image && (
                  <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-brand-red" />
                  </div>
                )}

                {!car.image && (
                  <h2 className="font-display text-3xl text-white tracking-wider mb-2">
                    BOOKING CONFIRMED!
                  </h2>
                )}

                <p className="text-brand-silver mb-6">
                  Thank you,{" "}
                  <span className="text-white">{personal.firstName || "valued customer"}</span>!
                  Your reservation is confirmed. A confirmation email has been sent to{" "}
                  <span className="text-white">{personal.email || "your email"}</span>.
                </p>

                <div className="bg-white/5 rounded-sm p-4 mb-6 text-left space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-silver font-heading uppercase tracking-wider text-xs">Booking Ref</span>
                    <span className="text-brand-red font-display text-lg tracking-widest">{bookingRef}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-silver">Vehicle</span>
                    <span className="text-white">{car.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-silver">Pick-Up</span>
                    <span className="text-white">{search.pickupDate || "Selected Date"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-silver">Total Charged</span>
                    <span className="text-white font-700">${total}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => window.print()}
                    className="btn-outline py-3 text-sm rounded-sm"
                  >
                    Print Confirmation
                  </button>
                  <button
                    onClick={() => { setStep(0); setSelectedCar(null); }}
                    className="btn-primary py-3 text-sm rounded-sm"
                  >
                    Book Another Car
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
