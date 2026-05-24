import { Product } from '../types';
import { Eye, Plus, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onToggleCart: (product: Product) => void;
  isInCart: boolean;
  isFitmentSelected: boolean;
  key?: string;
}

export default function ProductCard({
  product,
  onViewDetails,
  onToggleCart,
  isInCart,
  isFitmentSelected
}: ProductCardProps) {
  // Map category to localized stylized tag and colors
  const categoryStyles: Record<string, { label: string; bg: string; text: string }> = {
    lighting: { label: 'Custom Lights', bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-400' },
    body: { label: 'Aerodynamics & Body', bg: 'bg-orange-500/10 border-orange-500/20', text: 'text-orange-400' },
    wheels: { label: 'Wheels & Alloys', bg: 'bg-teal-500/10 border-teal-500/20', text: 'text-teal-400' },
    performance: { label: 'Performance / Engine', bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400' },
    interior: { label: 'Interior Assemblies', bg: 'bg-blue-500/10 border-blue-500/20', text: 'text-blue-400' },
    collectibles: { label: 'Diecast Memorabilia', bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400' },
    lifestyle: { label: 'Gear & Apparel', bg: 'bg-purple-500/10 border-purple-500/20', text: 'text-purple-400' },
    cars: { label: 'Premium Vehicles', bg: 'bg-indigo-500/10 border-indigo-500/20', text: 'text-indigo-400' },
  };

  const style = categoryStyles[product.category] || { label: 'Car Part', bg: 'bg-gray-500/10 border-gray-500/20', text: 'text-gray-400' };

  // Select nice illustrative icons/colors for background decoration based on item seed
  const getDecorativeAesthetic = () => {
    switch (product.imageSeed) {
      case 'mustang_taillights_custom':
      case 'mustang_taillights_smoked':
      case 'mustang_taillights_oem_10':
      case 'mustang_s550_tails':
        return 'from-red-950/40 to-neutral-900';
      case 'mustang_manifold':
      case 'mustang_mufflers':
      case 'clutch_kit':
        return 'from-emerald-950/40 to-neutral-900';
      case 'foose_rims':
      case 'audi_rim':
        return 'from-teal-950/40 to-neutral-900';
      case 'dodge_viper_real':
      case 'viper_diecast':
        return 'from-crimson-950/40 to-neutral-900';
      case 'plymouth_voyager_48':
        return 'from-purple-950/40 to-neutral-900';
      default:
        return 'from-neutral-950/40 to-neutral-900';
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className={`glass-panel rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col justify-between border ${
        isFitmentSelected
          ? 'border-emerald-500/65 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20'
          : isInCart
          ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.05)]'
          : 'border-white/5 hover:border-white/10'
      }`}
    >
      {/* Upper aspect with item preview/illustrator */}
      <div className={`h-40 bg-gradient-to-br ${getDecorativeAesthetic()} relative overflow-hidden flex items-center justify-center p-4 border-b border-white/5`}>
        {/* Abstract metallic graphic background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none"></div>

        {/* Dynamic visual placeholder mimicking real photos */}
        <div className="relative z-10 text-center flex flex-col items-center">
          <span className="font-mono text-[9px] tracking-widest text-gray-500 uppercase">SCW SPECIMENT PREVIEW</span>
          <span className="font-display font-black text-xl text-white/50 tracking-wide mt-1 select-none group-hover:scale-105 transition-transform duration-500">
            {product.category === 'cars' ? 'VEHICLE' : 'OEM PART'}
          </span>
          <span className="text-[11px] font-mono text-gray-400 mt-1 max-w-[180px] truncate">
            {product.condition}
          </span>
        </div>

        {/* Absolute indicators */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${style.bg} ${style.text}`}>
            {style.label}
          </span>
          {isFitmentSelected && (
            <span className="text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded border bg-emerald-500 border-emerald-600 text-black shadow-lg">
              ✓ Fitment Match
            </span>
          )}
        </div>

        {/* Hover action overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-30">
          <button
            id={`view-details-${product.id}`}
            onClick={() => onViewDetails(product)}
            className="p-3 bg-neutral-900 border border-gray-800 text-gray-300 rounded-xl hover:text-white hover:border-gray-700 transition-all flex items-center justify-center"
            title="Inspect Details"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            id={`add-cart-overlay-${product.id}`}
            onClick={() => onToggleCart(product)}
            className={`p-3 rounded-xl transition-all flex items-center justify-center ${
              isInCart
                ? 'bg-red-650 text-white border border-red-650'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
            title={isInCart ? 'Remove from Inquiry Basket' : 'Add to Inquiry Basket'}
          >
            {isInCart ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main body content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Fitment note indicator */}
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-2">
            <span>
              {product.compatibilities[0]?.make === 'Ford' || product.isFordSpecial ? 'Ford / Mustang Specialist' : 'Special Selection'}
            </span>
            <span className="text-gray-500 font-mono tracking-tighter">
              {product.compatibilities[0]?.years.length > 0
                ? `'${product.compatibilities[0].years[0].toString().slice(-2)} - '${product.compatibilities[0].years[product.compatibilities[0].years.length - 1].toString().slice(-2)} fits`
                : 'Agnostic'}
            </span>
          </div>

          {/* Title */}
          <h4
            id={`product-title-${product.id}`}
            className="font-display font-medium text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug cursor-pointer"
            onClick={() => onViewDetails(product)}
          >
            {product.title}
          </h4>

          {/* Description snippet */}
          <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer info: pricing + CTAs */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-lg font-bold text-white" id={`product-price-${product.id}`}>
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-xs text-gray-500 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 block">Locally Prepped</span>
          </div>

          <button
            id={`toggle-cart-btn-${product.id}`}
            onClick={() => onToggleCart(product)}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium tracking-tight transition-all flex items-center gap-1.5 cursor-pointer ${
              isInCart
                ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20'
                : 'bg-neutral-900 border border-gray-800 text-gray-300 hover:border-gray-700 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isInCart ? 'In Basket' : 'Quote'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
