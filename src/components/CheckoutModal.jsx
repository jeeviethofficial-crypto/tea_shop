import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, Sparkles, CreditCard, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discountAmount,
  shippingAmount,
  grandTotal,
  onOrderSuccess
}) {
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor@zenleaf.com',
    address: '42 Serenity Way, Apt 3B',
    city: 'Kyoto / Portland',
    postalCode: '97201',
    paymentMethod: 'card'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `ZL-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3E5F44', '#52796F', '#C5A059', '#F3EFEA']
      });

      onOrderSuccess();
    }, 1200);
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={!orderConfirmed ? onClose : undefined}
        className="fixed inset-0 bg-[#1F2937]/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative bg-[#FAF8F5] rounded-3xl max-w-xl w-full border border-[#E8E4DC] shadow-2xl p-6 sm:p-8 overflow-hidden text-left">
          
          {!orderConfirmed ? (
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DC] mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#3E5F44] font-semibold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span>Mindful Express Checkout</span>
                  </div>
                  <h3 className="font-zen-serif text-2xl font-bold text-[#1F2937]">
                    Complete Your Order
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-[#9CA3AF] hover:text-[#1F2937] hover:bg-[#E8E4DC]/50 rounded-full"
                  aria-label="Close checkout"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Quick Summary */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8E4DC] mb-6">
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-medium">
                  <span>Items ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span className="text-[#1F2937] font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-xs text-[#3E5F44] mb-2 font-medium">
                    <span>Artisan Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-medium">
                  <span>Shipping</span>
                  <span className="text-[#3E5F44] font-medium">
                    {shippingAmount === 0 ? 'Complimentary' : `$${shippingAmount.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-[#1F2937] pt-2 border-t border-[#F3EFEA]">
                  <span className="font-zen-serif text-lg">Amount Due</span>
                  <span className="font-zen-serif text-2xl text-[#3E5F44]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1F2937] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#E8E4DC] rounded-xl px-3.5 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#3E5F44]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1F2937] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#E8E4DC] rounded-xl px-3.5 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#3E5F44]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1F2937] mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-white border border-[#E8E4DC] rounded-xl px-3.5 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#3E5F44]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1F2937] mb-1">
                      City / State
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white border border-[#E8E4DC] rounded-xl px-3.5 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#3E5F44]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#1F2937] mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-white border border-[#E8E4DC] rounded-xl px-3.5 py-2 text-xs text-[#1F2937] focus:outline-none focus:border-[#3E5F44]"
                    />
                  </div>
                </div>

                {/* Payment Options */}
                <div>
                  <label className="block text-xs font-medium text-[#1F2937] mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['card', 'apple_pay', 'cod'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method })}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                          formData.paymentMethod === method
                            ? 'bg-[#3E5F44] text-white border-[#3E5F44] shadow-xs'
                            : 'bg-white text-[#1F2937] border-[#E8E4DC] hover:bg-[#F3EFEA]'
                        }`}
                      >
                        {method === 'card' && 'Credit Card'}
                        {method === 'apple_pay' && 'Apple Pay'}
                        {method === 'cod' && 'Cash on Delivery'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#3E5F44] hover:bg-[#294432] disabled:opacity-70 text-white font-semibold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm focus:outline-none"
                  >
                    {isSubmitting ? (
                      <span>Placing Mindful Order...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                        <span>Confirm & Place Order (${grandTotal.toFixed(2)})</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Order Success View */
            <div className="text-center py-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#E8EFE9] text-[#3E5F44] flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#52796F] font-bold block mb-1">
                Order Received • 注文完了
              </span>
              <h3 className="font-zen-serif text-3xl font-bold text-[#1F2937] mb-2">
                Thank You, {formData.name}
              </h3>
              <p className="text-xs text-[#6B7280] max-w-sm mx-auto mb-6">
                Your fresh single-estate tea harvest is being hand-packaged in compostable tins and readied for dispatch.
              </p>

              {/* Order Receipt Box */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8E4DC] text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between pb-2 border-b border-[#F3EFEA]">
                  <span className="text-[#6B7280]">Order Reference:</span>
                  <span className="font-mono font-bold text-[#3E5F44]">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Shipping To:</span>
                  <span className="font-medium text-[#1F2937]">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Confirmation Email:</span>
                  <span className="font-medium text-[#1F2937]">{formData.email}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F3EFEA]">
                  <span className="font-bold text-[#1F2937]">Paid Total:</span>
                  <span className="font-zen-serif text-lg font-bold text-[#3E5F44]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-3.5 bg-[#3E5F44] hover:bg-[#294432] text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
              >
                Return to Tea Garden
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
