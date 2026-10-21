import React, { useState } from 'react';
import { ShoppingBag, Search, User, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenQuiz,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  onOpenProfile
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    if (target === 'shop') {
      const el = document.getElementById('catalog-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'origins') {
      const el = document.getElementById('origins-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'quiz') {
      onOpenQuiz();
    } else if (target === 'about') {
      const el = document.getElementById('about-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner: Mindful Harvest Note */}
      <div className="bg-[#3E5F44] text-[#F9F8F6] text-xs py-2 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
        <span>Spring 2026 First Flush Teas now available — Direct from Kyoto & Wuyi Mountain estates</span>
        <span className="hidden md:inline text-[#C5A059] ml-2 font-medium">Free domestic shipping over $60</span>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E8E4DC] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-[#1F2937] hover:text-[#3E5F44] focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="group flex items-center gap-2.5 focus:outline-none"
                aria-label="ZenLeaf Tea Home"
              >
                <div className="w-10 h-10 rounded-full bg-[#3E5F44] flex items-center justify-center text-[#F9F8F6] shadow-sm group-hover:bg-[#52796F] transition-colors">
                  {/* Organic leaf emblem */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.5 4.5 8.2.3-.5.7-1.1 1.2-1.7 1.8-2.2 4.4-4 7.3-4.5 1.5-.3 2.5-1.2 2.8-2.5.5-2.2-.2-4.5-1.8-6.1C14.7 4 13.4 3 12 2zm-1.5 6c1.1 0 2 .9 2 2 0 1.9-1.4 3.5-3.2 3.8-1.5.3-2.8.9-3.9 1.9-.3-.5-.4-1.1-.4-1.7 0-3.3 2.5-6 5.5-6z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-zen-serif text-2xl font-bold tracking-tight text-[#1F2937] group-hover:text-[#3E5F44] transition-colors">
                      ZenLeaf
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#52796F] font-semibold">
                      TEA
                    </span>
                  </div>
                  <span className="block text-[9px] tracking-widest text-[#9CA3AF] uppercase font-mono">
                    禅の葉 · Artisan Estates
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-9">
              <button
                onClick={() => handleNavClick('shop')}
                className="text-sm font-medium tracking-wide text-[#1F2937] hover:text-[#3E5F44] transition-colors relative py-1 group"
              >
                Shop Single Origins
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#3E5F44] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>

              <button
                onClick={() => handleNavClick('origins')}
                className="text-sm font-medium tracking-wide text-[#1F2937] hover:text-[#3E5F44] transition-colors relative py-1 group"
              >
                Estate Origins
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#3E5F44] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>

              <button
                onClick={() => handleNavClick('quiz')}
                className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-[#3E5F44] bg-[#3E5F44]/8 hover:bg-[#3E5F44]/15 px-3 py-1.5 rounded-full transition-colors border border-[#3E5F44]/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Tea Quiz</span>
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className="text-sm font-medium tracking-wide text-[#1F2937] hover:text-[#3E5F44] transition-colors relative py-1 group"
              >
                Our Philosophy
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#3E5F44] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
            </nav>

            {/* Right Controls: Search, Profile, Cart */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Expandable Search Input */}
              <div className="relative flex items-center">
                {searchOpen ? (
                  <div className="flex items-center bg-white border border-[#E8E4DC] rounded-full shadow-sm pl-3 pr-2 py-1.5 w-48 sm:w-64 transition-all">
                    <Search className="w-4 h-4 text-[#52796F] mr-2 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search teas, notes, regions..."
                      className="w-full text-xs bg-transparent focus:outline-none text-[#1F2937] placeholder:text-[#9CA3AF]"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-gray-400 hover:text-gray-600 mr-1 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="text-xs text-[#52796F] hover:text-[#3E5F44] font-medium ml-1"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-[#1F2937] hover:text-[#3E5F44] hover:bg-[#F3EFEA] rounded-full transition-colors"
                    aria-label="Search Catalog"
                    title="Search Teas"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Profile / Tasting Club */}
              <button
                type="button"
                onClick={onOpenProfile}
                className="p-2 text-[#1F2937] hover:text-[#3E5F44] hover:bg-[#F3EFEA] rounded-full transition-colors hidden sm:flex items-center justify-center"
                aria-label="User Account"
                title="Tasting Club & Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Interactive Slide-over Cart Button */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative inline-flex items-center justify-center p-2.5 bg-[#3E5F44] hover:bg-[#294432] text-white rounded-full shadow-sm transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#3E5F44] focus:ring-offset-2"
                aria-label={`Shopping cart with ${cartCount} items`}
                id="cart-trigger-btn"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E4DC] bg-[#FAF8F5] px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            {/* Mobile Search */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#52796F]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teas, notes, origins..."
                className="w-full bg-white border border-[#E8E4DC] rounded-xl pl-9 pr-4 py-2 text-sm text-[#1F2937] focus:outline-none focus:border-[#3E5F44]"
              />
            </div>

            <div className="grid grid-cols-1 gap-1">
              <button
                onClick={() => handleNavClick('shop')}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-[#1F2937] hover:bg-[#E8EFE9]"
              >
                <span>Shop Single Origins</span>
                <span className="text-xs text-[#52796F]">View All →</span>
              </button>

              <button
                onClick={() => handleNavClick('origins')}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-[#1F2937] hover:bg-[#E8EFE9]"
              >
                <span>Estate Origins</span>
                <span className="text-xs text-[#9CA3AF]">Kyoto, Wuyi, Nuwara</span>
              </button>

              <button
                onClick={() => handleNavClick('quiz')}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-[#3E5F44] bg-[#3E5F44]/10 border border-[#3E5F44]/20"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Take Brewing Quiz</span>
                </span>
                <span className="text-xs bg-[#C5A059] text-white px-2 py-0.5 rounded-full font-medium">3 Questions</span>
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-[#1F2937] hover:bg-[#E8EFE9]"
              >
                <span>Our Philosophy</span>
                <span className="text-xs text-[#9CA3AF]">Wabi-Sabi & Craft</span>
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenProfile(); }}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-[#1F2937] hover:bg-[#E8EFE9]"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#52796F]" />
                  <span>Tasting Club & Rewards</span>
                </span>
                <span className="text-xs text-[#C5A059] font-medium">150 pts</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
