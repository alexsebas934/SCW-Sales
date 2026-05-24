import React, { useState } from 'react';
import { CartItem, Product } from '../types';
import { X, ShoppingBag, Trash2, Send, MessageCircle, Percent, ShieldCheck } from 'lucide-react';

interface QuoteTrayProps {
  cart: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onClose: () => void;
}

export default function QuoteTray({ cart, onRemoveItem, onClearCart, onClose }: QuoteTrayProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [pickup, setPickup] = useState('pickup'); // 'pickup' | 'delivery'
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Subtotal and Bundle discount calculations (10% off for 2+ items)
  const isEligibleForDiscount = cart.length >= 2;
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = isEligibleForDiscount ? subtotal * 0.1 : 0;
  const total = subtotal - discountAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please specify your Name and Phone Number to configure your custom quote package.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);

    const itemsFormatted = cart.map(item => `${item.product.title} (Qty: ${item.quantity}) - $${item.product.price.toLocaleString()}`).join(', ');

    try {
      const response = await fetch("https://formspree.io/f/mojbnvoa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          formType: "SCW Parts Inquiry",
          customerName: name,
          customerPhone: phone,
          customerVehicle: vehicle,
          deliveryChoice: pickup,
          selectedItemsSummary: itemsFormatted,
          subtotal: `$${subtotal.toLocaleString()}`,
          discountApplied: isEligibleForDiscount ? `10% (-$${discountAmount.toLocaleString()})` : "None",
          totalInquiryValue: `$${total.toLocaleString()}`,
          _subject: `⚡ SCW Quote - ${name} (${vehicle || 'No Build Spec'})`
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Unable to transmit quote. Formspree returned an error.");
      }
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "Failed to submit. Please try again or tap the direct WhatsApp button.");
      // Fallback in case of absolute failure so the user doesn't get locked out:
      setSubmitted(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    const itemsText = cart.map(item => `• ${item.product.title} (x${item.quantity}) - $${item.product.price.toLocaleString()}`).join('\n');
    let msg = `Hi Alexander!\n\nI am viewing your inventory on SCW Sales. I would like to lock in a purchase query for the following:\n\n${itemsText}\n\n`;
    
    if (isEligibleForDiscount) {
      msg += `Bundle Discount Applied (10%): -$$${discountAmount.toLocaleString()}\n`;
    }
    
    msg += `Estimated Quote Total: $${total.toLocaleString()}\n\n`;
    msg += `--- Contact Profile ---\n`;
    msg += `Name: ${name}\n`;
    msg += `Phone: ${phone}\n`;
    msg += `Vehicle Spec: ${vehicle || 'Not specified'}\n`;
    msg += `Meetup Strategy: ${pickup === 'pickup' ? 'Local pickup in Lake Elsinore, CA' : 'Transit/Delivery Request'}\n\n`;
    msg += `Looking forward to your swift confirmation! Check compatibility with my build.`;

    return `https://api.whatsapp.com/send?phone=19515550199&text=${encodeURIComponent(msg)}`; // standard mockup number for clean integration
  };

  const getSMSLink = () => {
    const itemsText = cart.map(item => `${item.product.title} (x${item.quantity})`).join(', ');
    const msg = `Hi Alexander! I'm interested in: ${itemsText}. Est Total: $${total.toLocaleString()}. My Name: ${name}. Pickup Choice: ${pickup}.`;
    return `sms:+19515550199?&body=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="flex flex-col h-full text-white">
      {/* Title Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-red-500" />
          <h4 className="font-display font-medium text-lg">Inquiry Package</h4>
        </div>
        <button
          id="close-quote-tray-btn"
          onClick={onClose}
          className="p-1.5 hover:bg-neutral-900 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center border border-gray-800">
            <ShoppingBag className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <h5 className="font-display font-medium text-gray-300">Your Basket is Empty</h5>
            <p className="text-xs text-gray-500 mt-1 max-w-[240px]">Browse the catalog and add premium parts or collectibles to request a package deal.</p>
          </div>
        </div>
      ) : !submitted ? (
        <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-1 hide-scrollbar pt-4">
          <div className="space-y-4">
            {/* Items List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 uppercase tracking-wider">
                <span>Selected Parts ({cart.length})</span>
                <button
                  id="clear-all-quotes-btn"
                  onClick={onClearCart}
                  className="hover:text-red-400 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>

              <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.product.id} className="bg-neutral-900/65 border border-gray-850 p-3 rounded-xl flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-3">
                      <span className="text-[10px] font-mono text-gray-500 block uppercase">{item.product.category}</span>
                      <h5 className="text-xs font-medium text-gray-200 truncate pr-2">{item.product.title}</h5>
                      <span className="font-mono text-xs text-red-400 font-semibold mt-0.5 block">${item.product.price.toLocaleString()}</span>
                    </div>
                    <button
                      id={`remove-quote-item-${item.product.id}`}
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1 text-gray-500 hover:text-red-400 transition-colors shrink-0"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Calculations */}
            <div className="bg-neutral-900/40 border border-gray-850 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400 leading-tight">
                <span>Subtotal</span>
                <span className="font-mono text-gray-350">${subtotal.toLocaleString()}</span>
              </div>
              
              {isEligibleForDiscount && (
                <div className="flex items-center justify-between text-xs text-emerald-400 leading-tight">
                  <span className="flex items-center gap-1">
                    <Percent className="w-3 h-3 text-emerald-500" />
                    <span>Multi-Item Package Discount (10%)</span>
                  </span>
                  <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="h-px bg-gray-800 my-1"></div>

              <div className="flex items-baseline justify-between pt-0.5">
                <span className="text-sm font-sans font-medium text-white">Estimated Quote Package</span>
                <span className="font-mono text-xl font-bold text-red-500" id="quote-package-total">${total.toLocaleString()}</span>
              </div>

              {isEligibleForDiscount ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-2 text-[10px] text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span><strong>Highest Conversion Offer:</strong> Bundle active! Alexander prioritizes package transactions for secure hand-offs.</span>
                </div>
              ) : (
                <p className="text-[9.5px] text-gray-500 leading-normal italic">Add at least 2 items to trigger Alexander's instant 10% bundle markdown discount.</p>
              )}
            </div>

            {/* Direct Channel form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Unlock Premium Meetup Portal</h5>
              
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wide mb-1" htmlFor="sender-name">Your Full Name *</label>
                  <input
                    id="sender-name"
                    type="text"
                    required
                    placeholder="e.g. Sebastian Cruz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/60 border border-gray-800 text-sm p-2 rounded-lg text-gray-200 placeholder-gray-600 focus:border-red-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wide mb-1" htmlFor="sender-phone">Direct Contact Number *</label>
                  <input
                    id="sender-phone"
                    type="tel"
                    required
                    placeholder="e.g. (951) 555-0144"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black/60 border border-gray-800 text-sm p-2 rounded-lg text-gray-200 placeholder-gray-600 focus:border-red-500 outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wide mb-1" htmlFor="sender-vehicle">Your Car build (optional)</label>
                    <input
                      id="sender-vehicle"
                      type="text"
                      placeholder="e.g. 2011 Mustang GT"
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      className="w-full bg-black/60 border border-gray-800 text-xs p-2 rounded-lg text-gray-300 placeholder-gray-600 focus:border-red-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wide mb-1" htmlFor="sender-pickup">Delivery Style</label>
                    <select
                      id="sender-pickup"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full bg-black/60 border border-gray-800 text-xs p-2 rounded-lg text-gray-300 focus:border-red-500 outline-none transition-colors"
                    >
                      <option value="pickup" className="bg-neutral-900 text-gray-300">Lake Elsinore Pickup</option>
                      <option value="delivery" className="bg-neutral-900 text-gray-300">Local Transit/Ship</option>
                    </select>
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
                  {submitError}
                </div>
              )}

              <button
                id="submit-inquiry-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-2.5 bg-red-650 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-medium text-xs font-mono uppercase tracking-wider rounded-lg transition-all glow-btn cursor-pointer"
              >
                {isSubmitting ? "Locking in specifications..." : "Validate Quote Package"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* SUCCESS SUBMIT SCREEN WITH INSTANT CHANNELS */
        <div className="flex-1 flex flex-col justify-between pt-6 animate-fade-in" id="quote-success-banner">
          <div className="space-y-4 text-center">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>
            
            <div>
              <h5 className="font-display font-medium text-lg text-white">Quote Configuration Locked!</h5>
              <p className="text-xs text-gray-400 px-3 mt-1 leading-snug">Alexander processes packages instantly. Submit your draft to open direct communication channels.</p>
            </div>

            {/* Generated summaries */}
            <div className="bg-neutral-900/60 border border-gray-850 p-4 rounded-xl text-left space-y-2">
              <span className="text-[10px] font-mono text-gray-500 block uppercase">SECURE PACKAGE RECEIPT</span>
              <div className="text-xs space-y-1">
                <p className="text-gray-400"><strong className="text-neutral-200">Buyer:</strong> {name}</p>
                <p className="text-gray-400"><strong className="text-neutral-200">Total Items:</strong> {cart.length}</p>
                <p className="text-gray-400"><strong className="text-neutral-200">Spec Quote:</strong> <span className="font-mono text-emerald-400 font-semibold">${total.toLocaleString()}</span></p>
                <p className="text-gray-400"><strong className="text-neutral-200">Average Response:</strong> <span className="text-red-400">⚡ under 15 mins</span></p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-gray-800">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 text-center">Select Direct Action Channel</label>
            
            {/* WHATSAPP HIGH CONVERTING ACTION */}
            <a
              id="whatsapp-channel-cta"
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs font-mono uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(16,185,129,0.2)]"
            >
              <MessageCircle className="w-4 h-4 shrink-0 fill-current" />
              <span>Send WhatsApp To Alexander</span>
            </a>

            {/* Direct SMS */}
            <a
              id="sms-channel-cta"
              href={getSMSLink()}
              className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-850 text-white font-medium text-[11px] font-mono uppercase tracking-widest border border-gray-800 rounded-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send SMS Direct Text</span>
            </a>

            <button
              id="submit-another-quote-btn"
              onClick={() => { setSubmitted(false); onClearCart(); onClose(); }}
              className="w-full text-center text-xs text-gray-500 hover:text-gray-350 transition-colors pt-2 block font-mono"
            >
              ← Edit Basket or Start New
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
