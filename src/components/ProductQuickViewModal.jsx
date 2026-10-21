import React, { useState } from 'react';
import { X, Star, MapPin, Thermometer, Clock, Sparkles, Plus, Check, ShieldCheck } from 'lucide-react';

export default function ProductQuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants?.[0]?.id);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const currentVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  const handleAdd = () => {
    onAddToCart(product, currentVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1F2937]/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative bg-[#FAF8F5] rounded-3xl max-w-3xl w-full border border-[#E8E4DC] shadow-2xl overflow-hidden text-left">
          
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-[#6B7280] hover:text-[#1F2937] bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Image & Origin Column */}
            <div className="relative bg-[#E8E4DC] aspect-square md:aspect-auto">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#1F2937]/80 backdrop-blur-md rounded-2xl p-3 text-white text-xs border border-white/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#C5A059] font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {product.origin}
                  </span>
                  <span className="font-mono text-[#D8D2C6]">{product.elevation}</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Harvest: {product.harvest}
                </p>
              </div>
            </div>

            {/* Product Details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div>
                {/* Badge & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#52796F] font-bold">
                    {product.subregion || product.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#C5A059] bg-white px-2 py-0.5 rounded-full border border-[#E8E4DC]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-[#9CA3AF]">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-zen-serif text-2xl sm:text-3xl font-bold text-[#1F2937] leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-[#9CA3AF] tracking-widest font-serif mt-0.5">
                  {product.japaneseName}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#52796F] mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Flavor Profile */}
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block mb-1.5">
                    Tasting Notes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.flavorNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-md bg-[#F3EFEA] text-[#3E5F44] font-medium border border-[#E8E4DC]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Brewing Ritual Guide */}
                {product.brewGuide && (
                  <div className="mt-4 p-3 bg-white rounded-2xl border border-[#E8E4DC] text-xs space-y-1.5">
                    <span className="font-semibold text-[#3E5F44] block mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      Master Sommelier Brewing Guide
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-[#52796F]">
                      <div>
                        <strong className="text-[#1F2937]">Temp:</strong> {product.brewGuide.temp}
                      </div>
                      <div>
                        <strong className="text-[#1F2937]">Ratio:</strong> {product.brewGuide.amount}
                      </div>
                      <div className="col-span-2">
                        <strong className="text-[#1F2937]">Ritual:</strong> {product.brewGuide.style}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Variant Picker & Action */}
              <div className="pt-3 border-t border-[#E8E4DC]">
                <div className="flex items-center justify-between text-xs text-[#6B7280] font-medium mb-2">
                  <span>Choose Variant:</span>
                  <span className="text-[#3E5F44] font-semibold">{currentVariant.label}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`p-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                        selectedVariantId === v.id
                          ? 'bg-[#3E5F44] text-white font-semibold shadow-sm'
                          : 'bg-white hover:bg-[#F3EFEA] text-[#1F2937] border border-[#E8E4DC]'
                      }`}
                    >
                      <span>{v.label}</span>
                      <span className={selectedVariantId === v.id ? 'text-[#C5A059]' : 'text-[#6B7280]'}>
                        ${v.price}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Price and Add button */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider block">Price</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-zen-serif text-3xl font-bold text-[#1F2937]">
                        ${currentVariant.price}
                      </span>
                      <span className="text-xs text-[#52796F]">USD</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className={`px-6 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                      isAdded
                        ? 'bg-[#294432] text-white scale-95 shadow-sm'
                        : 'bg-[#3E5F44] hover:bg-[#294432] text-white shadow-md'
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
                        <span>Add to Basket</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
