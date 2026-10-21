import React from 'react';
import { X, Award, Sparkles, BookOpen, Clock, Heart, CheckCircle2 } from 'lucide-react';

export default function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1F2937]/60 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative bg-[#FAF8F5] rounded-3xl max-w-md w-full border border-[#E8E4DC] shadow-2xl p-6 sm:p-7 overflow-hidden text-left">
          
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#9CA3AF] hover:text-[#1F2937] hover:bg-[#E8E4DC]/50 rounded-full"
            aria-label="Close Profile"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Member Card */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#3E5F44] text-[#F9F8F6] flex items-center justify-center font-zen-serif text-xl font-bold">
              EV
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-zen-serif text-lg font-bold text-[#1F2937]">
                  Eleanor Vance
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#9E7D3B] font-bold">
                  Tier II
                </span>
              </div>
              <p className="text-xs text-[#52796F]">
                Kyoto Apprentice Member • 150 Leaves
              </p>
            </div>
          </div>

          {/* Points Progress */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8E4DC] mb-5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-[#1F2937]">Next Perk: Free 50g Rare Gyokuro</span>
              <span className="text-[#3E5F44] font-bold">150 / 200 pts</span>
            </div>
            <div className="w-full bg-[#E8EFE9] h-2 rounded-full overflow-hidden">
              <div className="bg-[#3E5F44] h-full w-3/4 rounded-full"></div>
            </div>
            <p className="text-[11px] text-[#6B7280] mt-2">
              Earn 10 Leaves for every $10 spent on single-origin harvests.
            </p>
          </div>

          {/* Tasting Flight History */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Recent Tasting Journal
            </h4>
            
            <div className="p-3 bg-white rounded-xl border border-[#E8E4DC] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3E5F44]" />
                <div>
                  <p className="font-semibold text-[#1F2937]">Uji Ceremonial Matcha</p>
                  <p className="text-[10px] text-[#9CA3AF]">Steeped: 80°C, 20s whisk</p>
                </div>
              </div>
              <span className="text-[10px] font-medium text-[#52796F] bg-[#FAF8F5] px-2 py-1 rounded-md">
                ★ 5.0
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E8E4DC] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#3E5F44]" />
                <div>
                  <p className="font-semibold text-[#1F2937]">Wuyi Da Hong Pao</p>
                  <p className="text-[10px] text-[#9CA3AF]">Steeped: 95°C, 30s flash</p>
                </div>
              </div>
              <span className="text-[10px] font-medium text-[#52796F] bg-[#FAF8F5] px-2 py-1 rounded-md">
                ★ 4.9
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E4DC]">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#E8EFE9] border border-[#E8E4DC] text-xs font-semibold text-[#1F2937] rounded-xl transition-colors"
            >
              Close Window
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
