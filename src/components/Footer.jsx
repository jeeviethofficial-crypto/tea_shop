import React, { useState } from 'react';
import { Mail, Check, Leaf, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenQuiz }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1F2937] text-[#FAF8F5] pt-16 pb-12 border-t border-[#3E5F44]/30 relative overflow-hidden">
      
      {/* Decorative subtle ambient backdrop */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3E5F44]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Newsletter Tasting Flight Box */}
        <div className="bg-[#FAF8F5] text-[#1F2937] rounded-3xl p-8 sm:p-10 mb-16 border border-[#E8E4DC] shadow-xl text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3E5F44] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>The Zen Tasting Flight</span>
              </div>
              <h3 className="font-zen-serif text-3xl sm:text-4xl font-bold text-[#1F2937]">
                Receive 15% Off Your First Micro-Lot Harvest
              </h3>
              <p className="text-xs sm:text-sm text-[#52796F] max-w-lg leading-relaxed">
                Join 18,000+ mindful tea enthusiasts. Subscribers receive seasonal release previews, Japanese tea master brewing notes, and private harvest invites.
              </p>
            </div>

            <div className="lg:col-span-5">
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-[#9CA3AF]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        className="w-full bg-white border border-[#E8E4DC] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1F2937] focus:outline-none focus:border-[#3E5F44]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#3E5F44] hover:bg-[#294432] text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <span>Join Flight</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-[#9CA3AF] pl-1">
                    No spam ever. Unsubscribe anytime with one mindful click.
                  </p>
                </form>
              ) : (
                <div className="p-4 bg-[#E8EFE9] border border-[#3E5F44]/30 rounded-2xl text-left animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#3E5F44] mb-1">
                    <Check className="w-4 h-4 text-[#C5A059]" />
                    <span>Welcome to the Flight!</span>
                  </div>
                  <p className="text-xs text-[#1F2937]">
                    Use code <strong className="font-mono bg-white px-2 py-0.5 rounded border border-[#3E5F44]/40 text-[#3E5F44]">ZEN15</strong> at checkout for 15% off your tea order today.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Main Footer Links & Sustainability Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-700/60 text-left">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#3E5F44] flex items-center justify-center text-[#F9F8F6]">
                <Leaf className="w-4 h-4 text-[#C5A059]" />
              </div>
              <span className="font-zen-serif text-2xl font-bold tracking-tight text-white">
                ZenLeaf Tea
              </span>
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Founded on the Japanese philosophy of <em>Ichigo Ichie</em> (一期一会) — cherishing each unrepeatable gathering over fresh mountain leaves.
            </p>

            {/* Sustainability Promise Badge */}
            <div className="p-3.5 rounded-2xl bg-gray-800/80 border border-gray-700 max-w-sm space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C5A059]">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Our Pure Earth Promise</span>
              </div>
              <p className="text-[11px] text-gray-300 leading-normal">
                100% plastic-free packaging, carbon-neutral shipping, and direct organic garden patronage.
              </p>
            </div>
          </div>

          {/* Column: Single Origins */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Single Origins
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#catalog-section" className="hover:text-[#C5A059] transition-colors">Uji Ceremonial Matcha</a></li>
              <li><a href="#catalog-section" className="hover:text-[#C5A059] transition-colors">Shizuoka Gyokuro</a></li>
              <li><a href="#catalog-section" className="hover:text-[#C5A059] transition-colors">Wuyi Mountain Cliff Oolong</a></li>
              <li><a href="#catalog-section" className="hover:text-[#C5A059] transition-colors">Nuwara Eliya Ceylon High-Peak</a></li>
              <li><a href="#catalog-section" className="hover:text-[#C5A059] transition-colors">Tokoname Handcrafted Kyusu</a></li>
            </ul>
          </div>

          {/* Column: Tea Ritual */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Tea Wisdom
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><button onClick={onOpenQuiz} className="hover:text-[#C5A059] transition-colors">Interactive Brewing Quiz</button></li>
              <li><a href="#origins-section" className="hover:text-[#C5A059] transition-colors">Water Temperature Guide</a></li>
              <li><a href="#origins-section" className="hover:text-[#C5A059] transition-colors">Gaiwan vs Kyusu Brewing</a></li>
              <li><a href="#origins-section" className="hover:text-[#C5A059] transition-colors">First Flush Harvest Calendar</a></li>
              <li><a href="#origins-section" className="hover:text-[#C5A059] transition-colors">Storage & Tin Care</a></li>
            </ul>
          </div>

          {/* Column: Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Sanctuary
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Tasting Studio: Kyoto, Japan & Portland, OR.<br />
              concierge@zenleaftea.com<br />
              +1 (800) 832-7236
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#3E5F44] flex items-center justify-center text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#3E5F44] flex items-center justify-center text-gray-300 hover:text-white transition-colors" aria-label="X (formerly Twitter)">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#3E5F44] flex items-center justify-center text-gray-300 hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 ZenLeaf Tea Co. All rights reserved. Mindfully crafted for serene living.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Harmony</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Ethical Direct Trade</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
