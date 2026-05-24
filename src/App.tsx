import { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Star,
  Clock,
  MessageSquare,
  Sparkles,
  Search,
  ChevronRight,
  Eye,
  Plus,
  Check,
  MapPin,
  Smartphone,
  ShieldAlert,
  Info,
  Sliders,
  CheckCircle,
  X,
  Gauge,
  Compass,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS, REVIEWS } from './data';
import { Product, CartItem } from './types';
import FitmentWidget from './components/FitmentWidget';
import ReviewList from './components/ReviewList';
import ProductCard from './components/ProductCard';
import QuoteTray from './components/QuoteTray';
import SellForm from './components/SellForm';

// Path to our custom-generated GT500 background image
const gt500Bg = '/src/assets/images/gt500_red_hero_bg_1779639903358.png';

export default function App() {
  // Navigation & Category states
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fitmentFilter, setFitmentFilter] = useState<string[] | null>(null);
  const [fitmentText, setFitmentText] = useState<string | null>(null);

  // Detail Modal states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Quote Basket state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // GT500 Ambient Info toggle
  const [showShelbySpecs, setShowShelbySpecs] = useState<boolean>(false);

  // Filter products by search and category and fitment
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;

    // Filter by fitment if active
    if (fitmentFilter !== null) {
      list = list.filter(p => fitmentFilter.includes(p.id));
    }

    // Filter by active category tab
    if (activeCategory !== 'all') {
      if (activeCategory === 'mustang') {
        list = list.filter(p => p.isMustangSpecial);
      } else {
        list = list.filter(p => p.category === activeCategory);
      }
    }

    // Filter by text search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.condition.toLowerCase().includes(q) ||
        p.compatibilities.some(c => c.model.toLowerCase().includes(q) || c.make.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeCategory, searchQuery, fitmentFilter]);

  // Cart operations
  const handleToggleCart = (product: Product) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      // Remove if already in cart
      setCart(prev => prev.filter(item => item.product.id !== product.id));
    } else {
      // Add item
      setCart(prev => [...prev, { product, quantity: 1 }]);
      setIsCartOpen(true); // Auto-open drawer on addition for high conversions
    }
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Check if a specific product is in the basket
  const isProductInCart = (id: string) => {
    return cart.some(item => item.product.id === id);
  };

  // Scrolling helpers for single-page links
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white font-sans antialiased selection:bg-red-600/90 selection:text-white">
      {/* BACKGROUND UNDERLAY PATTERN */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.06)_0%,transparent_50%)] pointer-events-none z-0"></div>

      {/* FIXED FLOATING NAVIGATION HEADERS */}
      <nav id="scw-navigation-bar" className="sticky top-0 z-40 bg-black/75 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Branding / Emblem */}
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="font-display font-black text-2xl tracking-tighter text-white">
                SCW <span className="text-red-500">SALES</span>
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
            </div>

            {/* Desktop Sections Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-mono tracking-wider text-gray-400">
              <button onClick={() => scrollToSection('digital-showroom-grid')} className="hover:text-white transition-colors cursor-pointer">Showroom</button>
              <button onClick={() => scrollToSection('fitment-matcher-focus')} className="hover:text-white transition-colors cursor-pointer">Precision Fit</button>
              <button onClick={() => scrollToSection('alexander-reputation-focus')} className="hover:text-white transition-colors cursor-pointer">Reputation</button>
              <button onClick={() => scrollToSection('intake-portal-focus')} className="hover:text-white transition-colors cursor-pointer">Sell Your Gear</button>
            </div>

            {/* Right-Hand Conversion utilities */}
            <div className="flex items-center gap-4">
              <span className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-gray-400 bg-neutral-900 border border-gray-800 px-3 py-1.5 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Lake Elsinore, CA</span>
              </span>

              {/* Basket Toggle Trigger */}
              <button
                id="cart-floating-btn"
                onClick={() => setIsCartOpen(true)}
                className="relative px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-mono text-xs uppercase font-semibold tracking-wider transition-all flex items-center gap-2 glow-btn cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Quote</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* LUXURIOUS HERO BANNER BLOCK WITH Shelby GT500 BACKGROUND */}
      <section className="relative min-h-[90vh] flex items-center pt-8 overflow-hidden border-b border-white/5" id="shelby-hero-canvas">
        {/* Real GT500 2007 background asset */}
        <div className="absolute inset-0 z-0">
          <img
            src={gt500Bg}
            alt="2007 Ford Mustang Shelby GT500 Background"
            className="w-full h-full object-cover object-center opacity-85 scale-100 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Heavy gradient vignette overlays to allow readable elegant white hero text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-neutral-950/60 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/99 via-neutral-950/20 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col justify-between h-full">
          <div className="max-w-2xl space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-550/10 border border-red-500/20 rounded-full text-red-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">THE APEX OF MUSTANG SPECIALTIES</span>
            </div>

            {/* Display Heading */}
            <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tighter text-white leading-[0.95]">
              SCW SALES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                LUXURY PERFORMANCE
              </span>
            </h1>

            {/* High-Converting Narrative Subheading */}
            <p className="text-gray-350 text-base md:text-lg leading-relaxed font-sans font-light">
              We anchor the West Coast's absolute premier exchange for OEM replacements, high-fidelity custom lights, spoilers, intake systems, and collector items. Built by enthusiasts, for drivers who accept zero compromises.
            </p>

            {/* Conversion Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="block font-display font-bold text-3xl text-white">4.9 ★</span>
                <span className="text-xs text-gray-500 font-mono uppercase">Marketplace Rating</span>
              </div>
              <div>
                <span className="block font-display font-medium text-lg text-emerald-400 font-mono tracking-tight">UNDER 15 MIN</span>
                <span className="text-xs text-gray-500 font-mono uppercase block">Response Speed</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block font-display font-bold text-3xl text-white">30+</span>
                <span className="text-xs text-gray-500 font-mono uppercase">Verified Trades</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="explore-showroom-hero-btn"
                onClick={() => scrollToSection('digital-showroom-grid')}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase font-extrabold tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 glow-btn cursor-pointer"
              >
                <span>Browse Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              {/* INTERACTIVE AMBIENT SWITCHER FOR THE GT500 */}
              <button
                id="shelby-specs-switch"
                onClick={() => setShowShelbySpecs(!showShelbySpecs)}
                className="px-6 py-4 bg-neutral-900/60 hover:bg-neutral-900 border border-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-mono uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Gauge className="w-4 h-4 text-red-500" />
                <span>Shelby GT500 2007 specs</span>
              </button>
            </div>
          </div>

          {/* DYNAMIC SPECIFICATION COMPARTMENT IF TOGGLED */}
          {showShelbySpecs && (
            <div id="ambient-shelby-board" className="mt-8 glass-panel max-w-xl p-5 rounded-2xl border border-red-500/20 backdrop-blur-xl animate-fade-in space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-red-400">specifications dashboard</span>
                <button id="close-shelby-spec-btn" onClick={() => setShowShelbySpecs(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <span className="block text-[10px] font-mono uppercase text-gray-500">Power output</span>
                  <span className="font-display font-semibold text-lg text-white">500 HP</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-gray-500">Engine block</span>
                  <span className="font-display font-semibold text-lg text-white">5.4L V8</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-gray-500">Acceleration</span>
                  <span className="font-display font-semibold text-lg text-white">4.5s (0-60)</span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase text-gray-500">heritage year</span>
                  <span className="font-display font-semibold text-lg text-white">2007</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 leading-normal italic pt-1 text-center">"This absolute engineering masterpiece is the inspiration behind SCW Sales' dedication to pristine Ford machinery."</p>
            </div>
          )}
        </div>
      </section>

      {/* MID-BANNER: TRUST INDICATOR TRUST BAR */}
      <div className="bg-neutral-950 border-y border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400 border border-emerald-500/10">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sans font-semibold text-sm text-white">100% Verified Facebook Marketplace Standing</h4>
                <p className="text-xs text-gray-400">4.9 out of 30 reviews for punctual metups, communications & price honesty.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] uppercase font-mono px-3 py-1 bg-neutral-900 border border-gray-800 text-gray-400 rounded-full">✓ Punctuality</span>
              <span className="text-[10px] uppercase font-mono px-3 py-1 bg-neutral-900 border border-gray-800 text-gray-400 rounded-full">✓ Accurate description</span>
              <span className="text-[10px] uppercase font-mono px-3 py-1 bg-neutral-900 border border-gray-800 text-gray-400 rounded-full">✓ transparent pricing</span>
            </div>
          </div>
        </div>
      </div>

      {/* CORE WRAPPER BODY CONTENT CONTROLLER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 relative z-10">

        {/* SECTION 1: PRECISION FIT matcher */}
        <section id="fitment-matcher-focus" className="scroll-mt-24 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-red-500 bg-red-500/10 px-3 py-1 rounded">Fitment verification suite</span>
            <h2 className="font-display font-medium text-3xl text-white mt-3">Does It Fit Your Machine?</h2>
            <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">Ensure a 100% flawless bolt-on upgrade. Select your model specification below to automatically filter compatible original parts from Alexander's garage.</p>
          </div>

          <FitmentWidget
            onFilterFitment={(ids, text) => {
              setFitmentFilter(ids);
              setFitmentText(text);
            }}
          />
        </section>

        {/* SECTION 2: THE DIGITAL INV CANALOG */}
        <section id="digital-showroom-grid" className="scroll-mt-24 space-y-8">
          
          {/* Header area of Showroom */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-red-500" />
                <h2 className="font-display font-semibold text-3xl tracking-tight text-white">The SCW digital Showroom</h2>
              </div>
              <p className="text-sm text-gray-400 mt-1">Exquisite collection of performance accessories, OEM bodies, and collector projects.</p>
            </div>

            {/* Interactive category buttons scrollable panel */}
            <div className="flex flex-wrap gap-1.5 max-w-full">
              {[
                { id: 'all', label: 'All Stock' },
                { id: 'mustang', label: 'Mustang Specialties' },
                { id: 'lighting', label: 'Lighting' },
                { id: 'performance', label: 'Performance' },
                { id: 'wheels', label: 'Wheels & Rims' },
                { id: 'body', label: 'Body Panels' },
                { id: 'cars', label: 'Complete Cars' },
                { id: 'lifestyle', label: 'Collectibles' },
              ].map(cat => (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => { setActiveCategory(cat.id); }}
                  className={`px-4 py-2 rounded-xl text-xs font-sans font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-red-600 text-white font-semibold'
                      : 'bg-neutral-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar and Active constraints display */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-bar-input"
                type="text"
                placeholder="Search specs, part numbers, taillights, spoilers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:border-red-500 outline-none transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Active Fitment Alert bar */}
            {fitmentText && (
              <div className="w-full sm:w-auto bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl flex items-center justify-between gap-4 text-xs text-emerald-400">
                <span>Displaying compatible stock for: <strong>{fitmentText}</strong></span>
                <button
                  id="reset-ambient-fitment-btn"
                  onClick={() => { setFitmentFilter(null); setFitmentText(null); }}
                  className="font-mono text-[10px] uppercase underline cursor-pointer hover:text-white"
                >
                  Clear Matcher
                </button>
              </div>
            )}
          </div>

          {/* Grid Layout of products */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-neutral-950/20 border border-white/5 rounded-2xl flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-gray-800 flex items-center justify-center text-gray-500">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-lg text-gray-300">No Parts Found</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-md">No exact catalog inventory matched your active search query or fitment matcher. Try clearing filters or submit a special order below.</p>
              </div>
              <button
                id="reset-showroom-filters"
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); setFitmentFilter(null); setFitmentText(null); }}
                className="px-4 py-2 bg-neutral-900 border border-gray-800 text-xs font-mono text-gray-400 hover:text-white hover:border-gray-700 rounded-lg transition-colors"
              >
                Clear Showroom Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map(prod => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onViewDetails={(p) => setSelectedProduct(p)}
                  onToggleCart={handleToggleCart}
                  isInCart={isProductInCart(prod.id)}
                  isFitmentSelected={fitmentFilter !== null && fitmentFilter.includes(prod.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* SECTION 4: THE ALEXANDER REPUTATION SECTION */}
        <section id="alexander-reputation-focus" className="scroll-mt-24 py-12 border-t border-white/5">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded">verified reputation</span>
            <h2 className="font-display font-medium text-3xl text-white mt-3">The Reputation Standard</h2>
            <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">Read actual community sentiments and core stats that have made Alexander's Lake Elsinore outlet of Ford enthusiasts highly sought after.</p>
          </div>

          <ReviewList />
        </section>

        {/* SECTION 5: SELL / TRADE INTAKE PORTAL */}
        <section id="intake-portal-focus" className="scroll-mt-24 pt-12 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            
            {/* Context/Promotional message on the left */}
            <div className="lg:col-span-2 space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-red-500">broker network intake</span>
              <h3 className="font-display font-bold text-4xl text-white leading-tight">Fast-Track Your Mustang Parts For Cash</h3>
              
              <p className="text-sm text-gray-450 leading-relaxed">
                Got OEM tail-lights, spoilers, bumpers, or performance superchargers laying in your garage space? Don't let valuable metal gather dust. 
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-500/15 text-red-500 border border-red-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs">✓</div>
                  <div className="text-xs">
                    <strong className="text-white">Fair Valuation:</strong> No automatic discount algorithms. Alexander reviews catalog specs and provides actual fair market quotes.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-500/15 text-red-500 border border-red-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs">✓</div>
                  <div className="text-xs">
                    <strong className="text-white">Lake Elsinore Meetups:</strong> Convenient, secure physical handoffs. Skip the packing shipping hassle if local.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-500/15 text-red-500 border border-red-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs">✓</div>
                  <div className="text-xs">
                    <strong className="text-white">Instant Trades:</strong> Swap your unwanted assemblies for premium wheels, manifolds, or lighting systems from our showroom.
                  </div>
                </div>
              </div>
            </div>

            {/* The intake component form on the right */}
            <div className="lg:col-span-3">
              <SellForm />
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-black/90 border-t border-white/5 py-12 text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="font-display font-bold text-lg text-white">SCW <span className="text-red-500">SALES</span></span>
              <p className="text-xs text-gray-600 mt-1">Sought-After Mustang Specialties & Curated Automotive Hardware in Lake Elsinore, California.</p>
            </div>
            
            <div className="flex gap-4 text-xs font-mono">
              <button id="footer-to-showroom-btn" onClick={() => scrollToSection('digital-showroom-grid')} className="hover:text-white transition-colors">Digital Showroom</button>
              <button id="footer-to-fitment-btn" onClick={() => scrollToSection('fitment-matcher-focus')} className="hover:text-white transition-colors">Precision Fit™</button>
              <button id="footer-to-reputation-btn" onClick={() => scrollToSection('alexander-reputation-focus')} className="hover:text-white transition-colors">Reputation</button>
              <button id="footer-to-intake-btn" onClick={() => scrollToSection('intake-portal-focus')} className="hover:text-white transition-colors">Seller Portal</button>
            </div>
          </div>
          
          <div className="h-px bg-neutral-900 my-8"></div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <span>© 2026 SCW Sales / Alexander Lazcano. Powered by direct communication. All rights reserved.</span>
            <div className="flex gap-4">
              <span>Verified Facebook Marketplace Operator</span>
              <span>•</span>
              <span>4.9 / 5.0 Star Rated (30+ Ratings)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* SLIDE-OUT ASYNC QUOTE DRAWER (PORTAL BASKET FRAME) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="quote-drawer-portal">
          {/* Overlay mask with transition */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-[#0b0b0b] border-l border-white/10 shadow-[0_0_32px_rgba(0,0,0,0.7)] p-6">
                <QuoteTray
                  cart={cart}
                  onRemoveItem={handleRemoveItem}
                  onClearCart={handleClearCart}
                  onClose={() => setIsCartOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RICH INTERACTIVE DETAILS EXPANSION MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden" id="product-details-dialog-portal">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          
          <div className="relative glass-panel-heavy rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 animate-fade-in z-10 text-gray-200">
            
            {/* Close */}
            <button
              id="close-details-dialog-btn"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-1.5 hover:bg-neutral-900 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Layout core split */}
            <div className="space-y-6">
              
              {/* Product header meta */}
              <div>
                <span className="text-[10px] font-mono tracking-wider bg-red-500/10 border border-red-550/20 text-red-400 px-2.5 py-1 rounded">
                  {selectedProduct.category.toUpperCase()} // SPECIFICATION
                </span>
                <h3 className="font-display font-medium text-2xl text-white mt-3" id="dialog-product-title">{selectedProduct.title}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-mono text-xl font-bold text-red-500">${selectedProduct.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 font-mono tracking-wide">Category: {selectedProduct.category}</span>
                </div>
              </div>

              {/* Graphic visual panel */}
              <div className="h-56 bg-neutral-900 border border-gray-850 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden p-6 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(239,68,68,0.04)_0%,transparent_50%)]"></div>
                <span className="font-mono text-[9px] tracking-widest text-gray-600 uppercase">HIGH SPECIFICATION CAPTURE</span>
                <span className="font-display font-black text-3xl text-white/30 tracking-wide mt-1 select-none">
                  {selectedProduct.isMustangSpecial ? 'MUSTANG ORIGINAL' : 'SCW CERTIFIED'}
                </span>
                <div className="mt-3 inline-flex bg-neutral-950 px-3 py-1.5 rounded-lg border border-gray-850 shadow-inner text-xs font-mono text-gray-400">
                  Reliability Grade: <span className="text-emerald-400 font-semibold ml-1.5">{selectedProduct.condition}</span>
                </div>
              </div>

              {/* Descriptions & Specs */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Authentic Description</h4>
                  <p className="text-xs md:text-sm text-gray-350 leading-relaxed pr-2">{selectedProduct.description}</p>
                </div>

                {/* Compatibility specifications matching */}
                <div className="p-4 bg-neutral-900/60 border border-gray-850 rounded-2xl space-y-2.5">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Verified Model Compatibility</h4>
                  
                  {selectedProduct.compatibilities.map((comp, idx) => (
                    <div key={idx} className="text-xs border-l-2 border-red-500 pl-3 py-0.5">
                      <p className="text-gray-200 font-medium">
                        {comp.make} {comp.model} {comp.years.length > 0 ? `(${comp.years.join(', ')})` : ''}
                      </p>
                      {comp.notes && <p className="text-[11px] text-gray-500 font-mono mt-0.5">{comp.notes}</p>}
                    </div>
                  ))}

                  {fitmentFilter !== null && fitmentFilter.includes(selectedProduct.id) && (
                    <div className="mt-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2.5 text-xs text-emerald-400 flex items-center gap-2">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                      <span><strong>Fitment Matched:</strong> Flawless compatibility guaranteed for your active <strong>{fitmentText}</strong> build specs!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action bar inside Dialog */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                <button
                  id="dialog-primary-toggle-cart"
                  onClick={() => { handleToggleCart(selectedProduct); setSelectedProduct(null); }}
                  className={`flex-1 py-3.5 rounded-xl font-mono text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isProductInCart(selectedProduct.id)
                      ? 'bg-red-500/15 border border-red-550/20 text-red-400'
                      : 'bg-red-650 hover:bg-red-700 text-white glow-btn'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isProductInCart(selectedProduct.id) ? 'Remove From Quote' : 'Add to Quote Package'}</span>
                </button>
                <button
                  id="dialog-close-btn"
                  onClick={() => setSelectedProduct(null)}
                  className="py-3.5 px-6 bg-neutral-900 hover:bg-neutral-850 border border-gray-800 rounded-xl text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                >
                  Keep Browsing
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
