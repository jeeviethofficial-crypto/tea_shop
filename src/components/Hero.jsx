import React, { useState } from 'react';
import { ArrowDown, Sparkles, Star, Check, Plus, ShieldCheck } from 'lucide-react';

export default function Hero({ onShopClick, onQuizClick, onAddToCart }) {
  const [selectedVariant, setSelectedVariant] = useState('50g');
  const [isAdded, setIsAdded] = useState(false);

  // Spotlight Product (Ceremonial Uji Matcha)
  const spotlightProduct = {
    id: "zen-01",
    name: "Ceremonial Grade Uji Matcha",
    origin: "Kyoto, Japan",
    subregion: "Uji Single Estate",
    image: "/images/hero_matcha.webp",
    variants: [
      { id: "50g", label: "50g Tin", price: 34, weight: "50g" },
      { id: "100g", label: "100g Pouch", price: 58, weight: "100g" }
    ]
  };

  const currentVariant = spotlightProduct.variants.find(v => v.id === selectedVariant) || spotlightProduct.variants[0];

  const handleHeroAdd = () => {
    onAddToCart(spotlightProduct, currentVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#F9F8F6] via-[#F5F2EB] to-[#F9F8F6]">
      {/* Decorative subtle zen background elements */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#3E5F44]/5 to-[#C5A059]/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      {/* Subtle Japanese calligraphy watermark */}
      <div className="absolute right-4 top-24 text-[140px] font-serif text-[#1F2937]/[0.02] select-none pointer-events-none hidden xl:block font-bold leading-none">
        一期一会
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3E5F44]/10 border border-[#3E5F44]/20 text-[#3E5F44] text-xs font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#3E5F44] animate-ping"></span>
              <span className="font-semibold uppercase tracking-wider text-[11px]">Direct Estate Harvest</span>
              <span className="text-[#C5A059]">•</span>
              <span className="text-[#52796F]">Spring 2026 First Flush</span>
            </div>

            {/* Catchy Main Headline */}
            <h1 className="font-zen-serif text-4xl sm:text-5xl xl:text-6xl text-[#1F2937] font-normal leading-[1.12] tracking-tight">
              Artisan Loose Leaf Teas <br className="hidden sm:inline" />
              <span className="italic font-medium text-[#3E5F44]">
                Harvested at Peak Season
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#52796F] max-w-xl font-normal leading-relaxed">
              Curated from single-estate family gardens in Uji, Wuyi, and Nuwara Eliya. 
              Hand-plucked, stone-ground, and steeped in mindful Japanese & Nordic tranquility.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-2 pb-2 border-y border-[#E8E4DC]/80 max-w-lg">
              <div>
                <p className="font-zen-serif text-xl sm:text-2xl font-bold text-[#1F2937]">100%</p>
                <p className="text-xs text-[#6B7280]">Single Estate</p>
              </div>
              <div>
                <p className="font-zen-serif text-xl sm:text-2xl font-bold text-[#1F2937]">Zero</p>
                <p className="text-xs text-[#6B7280]">Synthetic Additives</p>
              </div>
              <div>
                <p className="font-zen-serif text-xl sm:text-2xl font-bold text-[#1F2937]">300+ yr</p>
                <p className="text-xs text-[#6B7280]">Heritage Farming</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onShopClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#3E5F44] hover:bg-[#294432] text-[#F9F8F6] text-sm font-semibold rounded-full shadow-lg shadow-[#3E5F44]/20 transition-all hover:translate-y-[-1px] active:translate-y-[0px] focus:outline-none"
                id="hero-shop-btn"
              >
                <span>Shop Single Origins</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                type="button"
                onClick={onQuizClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-[#FAF8F5] text-[#1F2937] hover:text-[#3E5F44] text-sm font-semibold rounded-full border border-[#D8D2C6] hover:border-[#3E5F44]/40 shadow-sm transition-all focus:outline-none group"
                id="hero-quiz-btn"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059] group-hover:rotate-12 transition-transform" />
                <span>Take Brewing Quiz</span>
              </button>
            </div>

            {/* Micro assurance note */}
            <p className="text-xs text-[#9CA3AF] flex items-center gap-2 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#3E5F44]" />
              <span>Complimentary bamboo tasting spoon included with every order over $45.</span>
            </p>
          </div>

          {/* Right Column: Spotlight Showcase Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Background ring glow */}
            <div className="absolute inset-0 bg-[#3E5F44]/10 rounded-3xl transform rotate-2 scale-95 -z-10 filter blur-sm"></div>

            {/* Spotlight Card */}
            <div className="bg-[#FAF8F5] rounded-3xl p-5 sm:p-6 border border-[#E8E4DC] shadow-xl relative backdrop-blur-sm">
              
              {/* Card Badges */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#3E5F44] text-white tracking-wide shadow-sm">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  Master Spotlight
                </span>
                
                <div className="flex items-center gap-1 text-xs text-[#1F2937] font-medium bg-white px-2.5 py-1 rounded-full border border-[#E8E4DC]">
                  <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  <span>4.98</span>
                  <span className="text-[#9CA3AF]">(240+ reviews)</span>
                </div>
              </div>

              {/* Spotlight Product Image with Zen frame */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#E8E4DC] group mb-5">
                <img
                  src={spotlightProduct.image}
                  alt={spotlightProduct.name}
                  width="1200"
                  height="896"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle Floating Region Tag on image */}
                <div className="absolute bottom-3 left-3 bg-[#1F2937]/80 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full flex items-center gap-1.5 font-medium border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                  <span>Uji, Kyoto • Tencha Stone Ground</span>
                </div>

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#3E5F44] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#E8E4DC]">
                  Limited Batch
                </div>
              </div>

              {/* Title & Origin */}
              <div className="text-left mb-3">
                <p className="text-xs uppercase tracking-widest text-[#52796F] font-semibold mb-1">
                  Single-Estate Reserve
                </p>
                <h3 className="font-zen-serif text-2xl font-bold text-[#1F2937] hover:text-[#3E5F44] transition-colors">
                  {spotlightProduct.name}
                </h3>
              </div>

              {/* Flavor Profile Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {["Profound Umami", "Creamy Foam", "Sweet Pea", "Zero Astringency"].map((note, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-white border border-[#E8E4DC] text-[#52796F] font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Packaging Variant Selector */}
              <div className="bg-white rounded-xl p-2.5 border border-[#E8E4DC] mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5 px-1">
                  <span className="text-[#6B7280] font-medium">Select Packaging:</span>
                  <span className="text-[#3E5F44] font-semibold">{currentVariant.label}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {spotlightProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v.id)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium transition-all text-left flex items-center justify-between ${
                        selectedVariant === v.id
                          ? 'bg-[#3E5F44] text-white shadow-sm font-semibold'
                          : 'bg-[#F9F8F6] text-[#1F2937] hover:bg-[#E8EFE9]'
                      }`}
                    >
                      <span>{v.label}</span>
                      <span className={selectedVariant === v.id ? 'text-[#C5A059]' : 'text-[#6B7280]'}>
                        ${v.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Add to Cart Action */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-xs text-[#9CA3AF] block leading-tight">Total Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-zen-serif text-3xl font-bold text-[#1F2937]">
                      ${currentVariant.price}
                    </span>
                    <span className="text-xs text-[#52796F] font-medium">USD</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleHeroAdd}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isAdded
                      ? 'bg-[#294432] text-white scale-95'
                      : 'bg-[#3E5F44] hover:bg-[#294432] text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-[#C5A059]" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
