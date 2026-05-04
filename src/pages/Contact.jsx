import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const CONTACT_OPTIONS = [
  { icon: Phone, title: "Call Us", info: "1-800-555-0123", sub: "Mon–Sun, 6AM–11PM ET", href: "tel:+18005550123", color: "bg-brand-red/10 text-brand-red" },
  { icon: Mail, title: "Email Support", info: "hello@driveease.com", sub: "Response within 2 hours", href: "mailto:hello@driveease.com", color: "bg-blue-500/10 text-blue-400" },
  { icon: MessageSquare, title: "Live Chat", info: "Chat with an agent", sub: "Average wait: under 2 min", href: "#", color: "bg-green-500/10 text-green-400" },
  { icon: MapPin, title: "Corporate Office", info: "Austin, TX 78701", sub: "501 Congress Ave, Suite 400", href: "#", color: "bg-purple-500/10 text-purple-400" },
];

const FAQS = [
  { q: "What do I need to rent a car?", a: "You'll need a valid US driver's license, a major credit card in your name, and you must be at least 21 years old (25+ for luxury vehicles). International visitors may use a foreign license with a passport." },
  { q: "Can I add an additional driver?", a: "Yes! Additional drivers can be added for $10/day. They must be present at pick-up with their valid driver's license." },
  { q: "What is your fuel policy?", a: "All vehicles come with a full tank. We ask that you return them full. If the tank isn't full, we'll refuel at $4.99/gallon plus a $10 service fee." },
  { q: "Is there a mileage limit?", a: "Most rentals include unlimited mileage at no extra cost. Some specialty vehicles (luxury, exotic) may have mileage limits — these are clearly disclosed at booking." },
  { q: "How do I modify or cancel my booking?", a: "Log into your account or call us at 1-800-555-0123. Free cancellations are accepted up to 48 hours before your pick-up time. Late cancellations may incur a one-day charge." },
  { q: "Do you offer one-way rentals?", a: "Yes! You can pick up in one city and drop off in another. One-way fees vary by distance and are shown clearly during booking." },
  { q: "What if I get into an accident?", a: "Call our 24/7 emergency line immediately at 1-800-555-0199. We'll guide you through the process, arrange a replacement vehicle if needed, and handle the insurance claim." },
  { q: "Are there any age restrictions?", a: "Drivers must be at least 21 years old. Drivers aged 21–24 may incur a young driver surcharge of $15/day. There's no maximum age limit." },
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="section-divider" />
          <p className="font-heading text-brand-red text-sm uppercase tracking-widest mb-3">We're Here to Help</p>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wide mb-4">
            CONTACT US
          </h1>
          <p className="text-brand-silver max-w-xl">
            Real people, real answers. Our US-based support team is available 7 days a week to help with bookings, questions, or anything else.
          </p>
        </div>

        {/* Contact options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CONTACT_OPTIONS.map(({ icon: Icon, title, info, sub, href, color }) => (
            <a
              key={title}
              href={href}
              className="glass-card rounded-sm p-6 group hover:border-brand-red/40 transition-all"
            >
              <div className={`w-12 h-12 rounded-sm ${color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                <Icon size={20} />
              </div>
              <h3 className="font-heading text-sm font-700 uppercase tracking-wider text-white mb-1">{title}</h3>
              <p className="text-white text-sm mb-0.5">{info}</p>
              <p className="text-brand-silver text-xs">{sub}</p>
            </a>
          ))}
        </div>

        {/* Contact form + Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Form */}
          <div className="lg:col-span-2 glass-card rounded-sm p-8">
            <h2 className="font-heading text-xl font-700 uppercase tracking-wider text-white mb-6">
              Send Us a Message
            </h2>

            {formSent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-brand-red" />
                </div>
                <h3 className="font-heading text-xl text-white uppercase tracking-wider mb-2">Message Sent!</h3>
                <p className="text-brand-silver text-sm mb-5">
                  Thanks, <span className="text-white">{form.name}</span>! We'll get back to you within 2 hours.
                </p>
                <button
                  onClick={() => { setFormSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="btn-outline px-6 py-2.5 text-sm rounded-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {[
                    { label: "Full Name", name: "name", placeholder: "John Smith", type: "text" },
                    { label: "Email", name: "email", placeholder: "john@example.com", type: "email" },
                    { label: "Phone (optional)", name: "phone", placeholder: "(555) 000-0000", type: "tel" },
                    { label: "Subject", name: "subject", placeholder: "e.g. Modify my booking", type: "text" },
                  ].map(({ label, name, placeholder, type }) => (
                    <div key={name}>
                      <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[name]}
                        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                        className="input-field w-full px-4 py-3 text-sm rounded-sm"
                        required={name !== "phone"}
                      />
                    </div>
                  ))}
                </div>
                <div className="mb-5">
                  <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-1.5">Message</label>
                  <textarea
                    placeholder="Tell us how we can help..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-field w-full px-4 py-3 text-sm rounded-sm resize-none"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary px-8 py-3.5 text-sm rounded-sm">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Hours */}
          <div className="space-y-5">
            <div className="glass-card rounded-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-brand-red" />
                <h3 className="font-heading text-sm font-700 uppercase tracking-wider text-white">Support Hours</h3>
              </div>
              <div className="space-y-3">
                {[
                  { day: "Monday – Friday", hours: "6:00 AM – 11:00 PM ET" },
                  { day: "Saturday", hours: "7:00 AM – 10:00 PM ET" },
                  { day: "Sunday", hours: "8:00 AM – 9:00 PM ET" },
                  { day: "Roadside Emergency", hours: "24/7 — Always" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-brand-silver">{day}</span>
                    <span className={`${day.includes("Emergency") ? "text-brand-red" : "text-white"} font-600`}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-sm p-6">
              <h3 className="font-heading text-sm font-700 uppercase tracking-wider text-white mb-3">Emergency Line</h3>
              <p className="text-brand-silver text-sm mb-3">
                Got stranded? Accident on the road? We're one call away, always.
              </p>
              <a
                href="tel:+18005550199"
                className="btn-primary w-full py-3 text-sm rounded-sm text-center block"
              >
                🚨 1-800-555-0199
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle size={20} className="text-brand-red" />
            <div>
              <div className="section-divider" />
              <h2 className="font-display text-4xl text-white tracking-wide">FREQUENTLY ASKED QUESTIONS</h2>
            </div>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="glass-card rounded-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-heading text-sm font-700 uppercase tracking-wider text-white pr-4">{q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={16} className="text-brand-red flex-shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-brand-silver flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-brand-silver text-sm leading-relaxed border-t border-white/10 pt-4">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
