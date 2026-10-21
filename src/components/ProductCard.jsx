import React, { useState } from 'react';
import { MapPin, Star, Plus, Check, Eye, Sparkles } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView
}) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id);
  const [isAdded, setIsAdded] = useState(false);

  const currentVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product, currentVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <article
      className="group bg-white rounded-3xl border border-[#E8E4DC] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#3E5F44]/40 transition-all duration-300 flex flex-col justify-between text-left relative"
    >
      {/* Top Media Section */}
      <div className="relative aspect-square overflow-hidden bg-[#FAF8F5]">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#3E5F44] text-[#F9F8F6] shadow-sm">
              {product.badge}
            </span>
          ) : <span></span>}

          {/* Quick View Button */}
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-[#1F2937] hover:text-[#3E5F44] shadow-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 duration-200"
            title="Quick View Tasting Notes"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Origin Pill Tag (Bottom Left of Image) */}
        <div className="absolute bottom-3 left-3 bg-[#1F2937]/80 backdrop-blur-md text-[#F9F8F6] text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium border border-white/10 shadow-sm">
          <MapPin className="w-3 h-3 text-[#C5A059]" />
          <span>{product.origin}</span>
        </div>

        {/* Rating Pill Tag (Bottom Right of Image) */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-[#1F2937] text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold border border-[#E8E4DC]">
          <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Card Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtitle / Subregion */}
          <div className="flex items-center justify-between text-xs text-[#52796F] mb-1">
            <span className="font-medium">{product.subregion || product.category}</span>
            <span className="text-[11px] font-serif text-[#9CA3AF] tracking-widest">{product.japaneseName}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-zen-serif text-xl font-bold text-[#1F2937] group-hover:text-[#3E5F44] transition-colors cursor-pointer mb-2 line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Flavor Notes Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.flavorNotes.slice(0, 3).map((note, index) => (
              <span
                key={index}
                className="text-[11px] px-2 py-0.5 rounded-md bg-[#F9F8F6] text-[#52796F] font-medium border border-[#E8E4DC]/80"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Packaging Variant Selector */}
        <div className="pt-2 border-t border-[#E8E4DC]/60">
          <div className="text-[11px] font-medium text-[#6B7280] mb-2 flex items-center justify-between">
            <span>Packaging Variant:</span>
            <span className="text-[#3E5F44] font-semibold">{currentVariant.weight}</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {product.variants.map((variant) => {
              const isSelected = variant.id === currentVariant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`py-1.5 px-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#3E5F44] text-white font-semibold shadow-sm'
                      : 'bg-[#F9F8F6] text-[#1F2937] hover:bg-[#E8EFE9] border border-[#E8E4DC]'
                  }`}
                >
                  <span className="truncate">{variant.label.replace(' Ceremonial', '').replace(' Artisan', '')}</span>
                  <span className={isSelected ? 'text-[#C5A059] ml-1' : 'text-[#6B7280] ml-1'}>
                    ${variant.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Price & Add to Cart Action */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider block font-medium">Price</span>
              <div className="flex items-baseline gap-1">
                <span className="font-zen-serif text-2xl font-bold text-[#1F2937]">
                  ${currentVariant.price}
                </span>
                <span className="text-[10px] text-[#6B7280]">USD</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isAdded
                  ? 'bg-[#294432] text-white scale-95 shadow-sm'
                  : 'bg-[#3E5F44] hover:bg-[#294432] text-white shadow hover:shadow-md active:scale-95'
              }`}
              aria-label={`Add ${product.name} ${currentVariant.label} to cart`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
