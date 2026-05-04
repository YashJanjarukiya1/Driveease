import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import CarCard from "../components/CarCard";
import { CARS, CATEGORIES } from "../assets/data";

export default function Fleet() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(200);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let results = [...CARS];

    if (searchQuery) {
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategory !== "All") {
      results = results.filter((c) => c.category === activeCategory);
    }

    results = results.filter((c) => c.pricePerDay <= maxPrice);

    if (sortBy === "price-low") results.sort((a, b) => a.pricePerDay - b.pricePerDay);
    else if (sortBy === "price-high") results.sort((a, b) => b.pricePerDay - a.pricePerDay);
    else if (sortBy === "rating") results.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "popular") results.sort((a, b) => b.reviews - a.reviews);

    return results;
  }, [activeCategory, sortBy, searchQuery, maxPrice]);

  return (
    <div className="min-h-screen bg-brand-dark pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-12">
          <div className="section-divider" />
          <p className="font-heading text-brand-red text-sm uppercase tracking-widest mb-3">Our Vehicles</p>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wide mb-4">
            CHOOSE YOUR RIDE
          </h1>
          <p className="text-brand-silver max-w-xl">
            From daily commuters to weekend adventurers — find the perfect vehicle for your next journey. Every car is fully inspected, insured, and ready to go.
          </p>
        </div>

        {/* Search + Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-silver" />
            <input
              type="text"
              placeholder="Search by model or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-11 pr-4 py-3 rounded-sm text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-silver hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field px-4 py-3 rounded-sm text-sm min-w-40 appearance-none"
          >
            <option value="popular" style={{ background: "#0D1B2A" }}>Most Popular</option>
            <option value="rating" style={{ background: "#0D1B2A" }}>Highest Rated</option>
            <option value="price-low" style={{ background: "#0D1B2A" }}>Price: Low to High</option>
            <option value="price-high" style={{ background: "#0D1B2A" }}>Price: High to Low</option>
          </select>

          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-outline px-5 py-3 rounded-sm text-sm flex items-center gap-2 ${showFilters ? "border-brand-red text-brand-red" : ""}`}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {/* Expandable filter panel */}
        {showFilters && (
          <div className="glass-card rounded-sm p-5 mb-6">
            <div>
              <label className="block text-xs text-brand-silver uppercase tracking-widest font-heading mb-3">
                Max Daily Price: <span className="text-brand-red">${maxPrice}</span>
              </label>
              <input
                type="range"
                min={40}
                max={200}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full md:w-64 accent-brand-red"
              />
            </div>
          </div>
        )}

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-heading text-xs uppercase tracking-widest px-4 py-2 rounded-sm transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-brand-red text-white"
                  : "bg-white/5 text-brand-silver hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-brand-silver text-sm mb-6">
          Showing <span className="text-white font-600">{filtered.length}</span> vehicles
          {activeCategory !== "All" && ` in ${activeCategory}`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🚗</p>
            <h3 className="font-heading text-xl text-white uppercase tracking-wider mb-2">No Vehicles Found</h3>
            <p className="text-brand-silver text-sm mb-4">Try adjusting your filters or search terms</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); setMaxPrice(200); }}
              className="btn-primary px-6 py-2.5 text-sm rounded-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
