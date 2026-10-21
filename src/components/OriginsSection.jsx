import React from 'react';
import { Recycle, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export default function OriginsSection() {
  const origins = [
    {
      region: "Uji, Kyoto, Japan",
      elevation: "320m",
      specialty: "Ichibancha Ceremonial Tencha",
      description: "Nurtured alongside the misty banks of the Uji River. Multi-generational family plots hand-pluck early tender shoots for unparalleled sweetness."
    },
    {
      region: "Wuyi Mountains, China",
      elevation: "950m",
      specialty: "Zhengyan Rock Cliff Oolong",
      description: "Cultivated in volcanic rock crevasses rich in iron and granite. Charcoal-baked over aged longan wood for intoxicating honey-mineral warmth."
    },
    {
      region: "Nuwara Eliya, Sri Lanka",
      elevation: "1,890m",
      specialty: "High Peak Orthodox Black",
      description: "Bathed in crisp montane cloud forest air. Golden liquor infused with native wild eucalyptus, citrus blossoms, and mountain honey."
    }
  ];

  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-b border-[#E8E4DC]/80" id="origins-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#3E5F44] mb-3">
            <Compass className="w-4 h-4 text-[#C5A059]" />
            <span>Terroir & Stewardship</span>
          </div>
          <h2 className="font-zen-serif text-3xl sm:text-5xl text-[#1F2937] font-normal tracking-tight">
            Single-Origin Sanctuaries
          </h2>
          <p className="text-sm sm:text-base text-[#52796F] mt-3 leading-relaxed">
            We never blend seasons or dilute estates. Every harvest is traceable to a specific mountain slope, family grower, and solar harvest week.
          </p>
        </div>

        {/* 3 Region Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
          {origins.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-[#E8E4DC] hover:border-[#3E5F44]/40 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A059] uppercase block mb-1">
                Altitude: {item.elevation}
              </span>
              <h3 className="font-zen-serif text-2xl font-bold text-[#1F2937] mb-1">
                {item.region}
              </h3>
              <p className="text-xs font-semibold text-[#3E5F44] mb-3">
                {item.specialty}
              </p>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Pillars of Wabi-Sabi Zen Commitment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#E8E4DC]/80 text-left" id="about-section">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EFE9] text-[#3E5F44] flex items-center justify-center shrink-0">
              <Recycle className="w-6 h-6 text-[#3E5F44]" />
            </div>
            <div>
              <h4 className="font-zen-serif text-lg font-bold text-[#1F2937] mb-1">
                Compostable & Infinitely Recyclable
              </h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Zero microplastics. Our tin canisters are food-grade aluminum, sealed with unbleached parchment and non-toxic soy inks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EFE9] text-[#3E5F44] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6 text-[#3E5F44]" />
            </div>
            <div>
              <h4 className="font-zen-serif text-lg font-bold text-[#1F2937] mb-1">
                True Direct-Trade Premiums
              </h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                We pay 3.5x Fair Trade minimums directly to the master growers, safeguarding artisanal Japanese and Himalayan heirloom methods.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EFE9] text-[#3E5F44] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#3E5F44]" />
            </div>
            <div>
              <h4 className="font-zen-serif text-lg font-bold text-[#1F2937] mb-1">
                Purity Lab Certified
              </h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Every micro-lot undergoes rigorous third-party testing for heavy metals and pesticides to guarantee pure, restorative medicine.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
