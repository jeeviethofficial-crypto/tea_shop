import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, Check, Gift } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 60;
const FREE_GIFT_THRESHOLD = 75;

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  discountCode,
  setDiscountCode,
  discountPercent,
  setDiscountPercent
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  // Calculate calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableSubtotal = subtotal - discountAmount;
  const isFreeShipping = taxableSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingAmount = isFreeShipping || taxableSubtotal === 0 ? 0 : 7.00;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - taxableSubtotal);
  const progressPercent = Math.min(100, Math.round((taxableSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const hasFreeGift = taxableSubtotal >= FREE_GIFT_THRESHOLD;
  const grandTotal = taxableSubtotal + shippingAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoInput.trim().toUpperCase();

    if (code === 'ZEN15' || code === 'FIRSTFLUSH') {
      setDiscountCode(code);
      setDiscountPercent(15);
      setPromoSuccess('15% Artisan Discount Applied!');
      setPromoInput('');
    } else if (code === 'MATCHA20') {
      setDiscountCode(code);
      setDiscountPercent(20);
      setPromoSuccess('20% Master Flight Discount Applied!');
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try "ZEN15" for 15% off.');
    }
  };

  const handleRemovePromo = () => {
    setDiscountCode('');
    setDiscountPercent(0);
    setPromoSuccess('');
    setPromoError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1F2937]/50 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E8E4DC] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E4DC] bg-[#F9F8F6] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#3E5F44]" />
              <h2 className="font-zen-serif text-2xl font-bold text-[#1F2937]">
                Your Tea Basket
              </h2>
              <span className="text-xs bg-[#E8EFE9] text-[#3E5F44] font-semibold px-2 py-0.5 rounded-full font-mono">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#6B7280] hover:text-[#1F2937] hover:bg-[#E8E4DC]/50 rounded-full transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tier Banner */}
          <div className="px-6 py-3.5 bg-white border-b border-[#E8E4DC]">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              {isFreeShipping ? (
                <span className="text-[#3E5F44] font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Complimentary Shipping Unlocked!</span>
                </span>
              ) : (
                <span className="text-[#1F2937]">
                  Add <strong className="text-[#3E5F44] font-semibold">${amountToFreeShipping.toFixed(2)}</strong> for Free Express Shipping
                </span>
              )}
              <span className="text-[11px] text-[#6B7280] font-mono">{progressPercent}%</span>
            </div>

            {/* Progress Bar with Green & Gold */}
            <div className="w-full bg-[#E8EFE9] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#52796F] via-[#3E5F44] to-[#C5A059] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Bonus Perk Tier */}
            {hasFreeGift ? (
              <p className="text-[11px] text-[#3E5F44] font-medium mt-1.5 flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Gift Unlocked: Handcrafted Bamboo Chashaku Spoon added!</span>
              </p>
            ) : (
              <p className="text-[11px] text-[#9CA3AF] mt-1 flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-[#9CA3AF]" />
                <span>Add ${(FREE_GIFT_THRESHOLD - taxableSubtotal).toFixed(2)} more to unlock a complimentary bamboo scoop.</span>
              </p>
            )}
          </div>

          {/* Items Scrollable List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#E8EFE9] flex items-center justify-center text-[#52796F] mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-zen-serif text-xl font-bold text-[#1F2937] mb-1">
                  Your Basket is Empty
                </h3>
                <p className="text-xs text-[#6B7280] max-w-xs mb-6">
                  Experience the mindful warmth of single-origin loose leaves harvested at peak season.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#3E5F44] text-white text-xs font-semibold rounded-full hover:bg-[#294432] transition-colors shadow-sm"
                >
                  Explore Teas
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemKey = `${item.product.id}-${item.variant.id}`;
                return (
                  <div
                    key={itemKey}
                    className="flex gap-3.5 p-3.5 bg-white rounded-2xl border border-[#E8E4DC] shadow-xs hover:border-[#3E5F44]/30 transition-all text-left"
                  >
                    {/* Thumbnail */}
                    <div className="w-18 h-18 rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0 border border-[#E8E4DC]/60">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-zen-serif text-sm font-bold text-[#1F2937] leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id, item.variant.id)}
                            className="text-[#9CA3AF] hover:text-red-600 p-1 transition-colors"
                            title="Remove item"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#52796F] font-medium mt-0.5">
                          {item.variant.label} • {item.product.origin.split(',')[0]}
                        </p>
                      </div>

                      {/* Quantity & Line Total */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F3EFEA]">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#E8E4DC] rounded-lg bg-[#FAF8F5]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                            className="p-1 hover:bg-[#E8E4DC] rounded-l-lg text-[#1F2937] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-semibold px-2.5 text-[#1F2937]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                            className="p-1 hover:bg-[#E8E4DC] rounded-r-lg text-[#1F2937] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-zen-serif text-base font-bold text-[#1F2937]">
                            ${(item.variant.price * item.quantity).toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="block text-[10px] text-[#9CA3AF]">
                              ${item.variant.price} each
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E4DC] space-y-4">
              
              {/* Promo code area */}
              {discountCode ? (
                <div className="flex items-center justify-between bg-[#E8EFE9] px-3 py-2 rounded-xl text-xs text-[#3E5F44]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Code applied: <strong>{discountCode}</strong> (-{discountPercent}%)</span>
                  </span>
                  <button
                    onClick={handleRemovePromo}
                    className="text-[#52796F] hover:text-red-700 text-xs font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#9CA3AF]" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (try ZEN15)"
                      className="w-full bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#3E5F44] uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-[#FAF8F5] hover:bg-[#E8EFE9] border border-[#E8E4DC] text-xs font-medium text-[#1F2937] rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoError && <p className="text-[11px] text-red-600 text-left">{promoError}</p>}
              {promoSuccess && <p className="text-[11px] text-[#3E5F44] text-left font-medium">{promoSuccess}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-left">
                <div className="flex justify-between text-[#6B7280]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1F2937]">${subtotal.toFixed(2)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#3E5F44]">
                    <span>Artisan Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#6B7280]">
                  <span>Shipping</span>
                  <span>
                    {isFreeShipping ? (
                      <span className="text-[#3E5F44] font-medium">Complimentary</span>
                    ) : (
                      `$${shippingAmount.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#1F2937] pt-2 border-t border-[#E8E4DC]">
                  <span className="font-zen-serif text-lg">Total</span>
                  <span className="font-zen-serif text-2xl text-[#3E5F44]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                type="button"
                onClick={onCheckout}
                className="w-full py-4 bg-[#3E5F44] hover:bg-[#294432] text-white font-semibold rounded-2xl shadow-lg shadow-[#3E5F44]/20 flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none"
                id="checkout-action-btn"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#9CA3AF]">
                Safe 256-bit SSL encrypted checkout • 100% Satisfaction Guarantee
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
