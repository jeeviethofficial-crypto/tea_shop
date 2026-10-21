import React from 'react';
import { SlidersHorizontal, X, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function CategoryFilter({
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  productCounts,
  searchQuery,
  setSearchQuery,
  totalResults
}) {
  return (
    <div className="bg-[#F9F8F6] pt-10 pb-6 border-b border-[#E8E4DC]/60" id="catalog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#3E5F44] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
              <span>Curated Harvest Collection</span>
            </div>
            <h2 className="font-zen-serif text-3xl sm:text-4xl text-[#1F2937] font-normal tracking-tight">
              Single-Estate Artisan Teas
            </h2>
            <p className="text-sm text-[#52796F] mt-1 max-w-xl">
              Ethically sourced direct from master gardens. Hand-selected for distinctive terroir and pure tranquility.
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <span className="text-xs text-[#6B7280] font-medium flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#52796F]" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E8E4DC] rounded-xl px-3.5 py-2 text-xs font-medium text-[#1F2937] focus:outline-none focus:border-[#3E5F44] cursor-pointer shadow-sm"
              aria-label="Sort product catalog"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Search Query Active Notification (if searching) */}
        {searchQuery && (
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-[#FAF8F5] border border-[#3E5F44]/30 rounded-full text-xs text-[#1F2937]">
            <span>Searching for: <strong>"{searchQuery}"</strong></span>
            <span className="text-[#52796F]">({totalResults} items found)</span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#9CA3AF] hover:text-[#1F2937] p-0.5 rounded-full"
              aria-label="Clear Search Filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filter Chips / Tabs (Scrollable on mobile) */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((category) => {
            const count = productCounts[category] || 0;
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`group relative shrink-0 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 focus:outline-none ${
                  isActive
                    ? 'bg-[#3E5F44] text-[#F9F8F6] shadow-sm font-semibold'
                    : 'bg-white hover:bg-[#F3EFEA] text-[#1F2937] border border-[#E8E4DC]'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0"></span>
                )}
                <span>{category}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F9F8F6] text-[#6B7280] group-hover:bg-[#E8EFE9]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
