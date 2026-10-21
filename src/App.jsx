import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import TeaQuizModal from './components/TeaQuizModal';
import ProductQuickViewModal from './components/ProductQuickViewModal';
import CheckoutModal from './components/CheckoutModal';
import ProfileModal from './components/ProfileModal';
import OriginsSection from './components/OriginsSection';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { PRODUCTS, CATEGORIES } from './data/products';

export default function App() {
  // Navigation & Category States
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Cart State (Initialized with 1 premium ceremonial matcha item for instant delight)
  const [cartItems, setCartItems] = useState([
    {
      product: PRODUCTS[0],
      variant: PRODUCTS[0].variants[0],
      quantity: 1
    }
  ]);

  // Discount / Coupon State
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Modals & Drawers States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast((curr) => (curr?.title === title ? null : curr));
    }, 3500);
  };

  // Cart Operations
  const handleAddToCart = (product, variant, qty = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.variant.id === variant.id
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prevItems, { product, variant, quantity: qty }];
      }
    });

    showToast("Added to Tea Basket", `${product.name} (${variant.label})`);
  };

  const handleUpdateQuantity = (productId, variantId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId, variantId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.variant.id === variantId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId, variantId) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && item.variant.id === variantId)
      )
    );
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    setDiscountCode("");
    setDiscountPercent(0);
  };

  // Live cart item counter for badge
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Subtotal & Calculations for Checkout
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.variant.price * item.quantity,
      0
    );
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const shippingAmount = useMemo(() => {
    const afterDiscount = subtotal - discountAmount;
    if (afterDiscount >= 60 || afterDiscount === 0) return 0;
    return 7.0;
  }, [subtotal, discountAmount]);

  const grandTotal = useMemo(() => {
    return subtotal - discountAmount + shippingAmount;
  }, [subtotal, discountAmount, shippingAmount]);

  // Category counts
  const productCounts = useMemo(() => {
    const counts = { All: PRODUCTS.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = PRODUCTS.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.origin.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.flavorNotes.some((n) => n.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.variants[0].price - b.variants[0].price;
      }
      if (sortBy === "price-desc") {
        return b.variants[0].price - a.variants[0].price;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0; // featured default order
    });
  }, [activeCategory, searchQuery, sortBy]);

  const scrollToCatalog = () => {
    const el = document.getElementById("catalog-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1F2937] flex flex-col font-sans selection:bg-[#3E5F44]/20 selection:text-[#1F2937]">
      {/* 1. Header & Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onShopClick={scrollToCatalog}
          onQuizClick={() => setIsQuizOpen(true)}
          onAddToCart={handleAddToCart}
        />

        {/* 3. Category Filter Bar */}
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          productCounts={productCounts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalResults={filteredProducts.length}
        />

        {/* 4. Product Catalog Grid */}
        <section className="py-12 bg-[#F9F8F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border border-[#E8E4DC] p-8 max-w-md mx-auto">
                <p className="text-sm font-semibold text-[#1F2937] mb-1">
                  No single-origin harvests match your search
                </p>
                <p className="text-xs text-[#6B7280] mb-4">
                  Try clearing your search query or choosing another category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="px-5 py-2 bg-[#3E5F44] text-white text-xs font-semibold rounded-full"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 5. Origins & Stewardship Section */}
        <OriginsSection />
      </main>

      {/* 6. Footer Section */}
      <Footer onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        discountPercent={discountPercent}
        setDiscountPercent={setDiscountPercent}
      />

      {/* Interactive Tea Quiz Modal */}
      <TeaQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Simulator Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        discountAmount={discountAmount}
        shippingAmount={shippingAmount}
        grandTotal={grandTotal}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Member Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Toast Notification */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
