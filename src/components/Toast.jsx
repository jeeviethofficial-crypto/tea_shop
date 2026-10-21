import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ toast, onClose, onOpenCart }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-[#1F2937] text-white px-4 py-3 rounded-2xl shadow-2xl border border-gray-700 flex items-center gap-3 max-w-sm text-left">
        <div className="w-8 h-8 rounded-full bg-[#3E5F44] text-[#C5A059] flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>

        <div className="flex-1 pr-2">
          <p className="text-xs font-semibold text-white leading-tight">
            {toast.title}
          </p>
          <p className="text-[11px] text-gray-300">
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenCart();
          }}
          className="text-xs bg-[#3E5F44] hover:bg-[#52796F] text-white px-2.5 py-1 rounded-lg font-medium transition-colors shrink-0"
        >
          View Basket
        </button>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded-full"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
