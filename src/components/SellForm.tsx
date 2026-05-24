import React, { useState } from 'react';
import { Send, Camera, Sparkles, MessageSquare, CheckCircle } from 'lucide-react';

export default function SellForm() {
  const [partTitle, setPartTitle] = useState('');
  const [carMake, setCarMake] = useState('Ford');
  const [carModel, setCarModel] = useState('');
  const [partYear, setPartYear] = useState('');
  const [partCondition, setPartCondition] = useState('good');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [userComment, setUserComment] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partTitle || !carModel || !expectedPrice || !buyerName || !buyerPhone) {
      alert("Please fill in the required fields to map out your trade inquiry.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://formspree.io/f/mojbnvoa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          formType: "SCW Parts Intake Proposal",
          partOrCarTitle: partTitle,
          vehicleMake: carMake,
          vehicleModel: carModel,
          partYear: partYear,
          partCondition: partCondition,
          expectedPrice: expectedPrice,
          comments: userComment,
          sellerName: buyerName,
          sellerPhone: buyerPhone,
          _subject: `🚗 SCW Trade intake - ${partTitle} from ${buyerName}`
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Unable to post trade offer. Formspree returned an error status.");
      }
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "Something went wrong submitting. Feel free to use the WhatsApp channel below.");
      setSubmitted(true); // fallback so they can still see summary & tap WhatsApp message link
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppTradeLink = () => {
    let msg = `Hi Alexander!\n\nI want to propose a trade or sell a custom part/vehicle to SCW Sales:\n\n`;
    msg += `Part/Car: ${partTitle}\n`;
    msg += `Vehicle fitment: ${partYear} ${carMake} ${carModel}\n`;
    msg += `My Condition appraisal: ${partCondition.toUpperCase()}\n`;
    msg += `Asking Price: $${expectedPrice}\n`;
    msg += `Additional Comments: ${userComment || 'None'}\n\n`;
    msg += `My Name: ${buyerName}\n`;
    msg += `My Phone number: ${buyerPhone}\n\n`;
    msg += `Please let me know if you are interested in this item. I can send photos!`;

    return `https://api.whatsapp.com/send?phone=19515550199&text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden" id="parts-intake-portal">
      <div className="absolute right-0 top-0 bottom-0 w-2 flex gap-1 pointer-events-none opacity-20">
        <div className="w-1/2 bg-amber-500 h-full"></div>
        <div className="w-1/2 bg-amber-500 h-full"></div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded">Dealer Intake</span>
        </div>
        <h4 className="font-display font-semibold text-xl text-white">Sell or Trade Your Parts & Cars</h4>
        <p className="text-xs text-gray-400 mt-1">Alexander is always seeking premium inventory! We purchase OEM accessories, custom headlights, performance packages, and complete sports cars.</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Part / Car Title */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1" htmlFor="trade-title">What are you selling? *</label>
              <input
                id="trade-title"
                type="text"
                required
                placeholder="e.g. 2012 Shelby GT500 Dual Exhaust Assembly"
                value={partTitle}
                onChange={(e) => setPartTitle(e.target.value)}
                className="w-full bg-black/50 border border-gray-800 text-sm p-2.5 rounded-lg text-gray-200 placeholder-gray-600 focus:border-amber-500 outline-none transition-colors"
              />
            </div>

            {/* Target Car Make */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1" htmlFor="trade-make">Vehicle Make</label>
              <select
                id="trade-make"
                value={carMake}
                onChange={(e) => setCarMake(e.target.value)}
                className="w-full bg-black/50 border border-gray-800 text-sm p-2.5 rounded-lg text-gray-200 focus:border-amber-500 outline-none transition-colors"
              >
                <option value="Ford">Ford</option>
                <option value="Dodge">Dodge</option>
                <option value="Audi">Audi</option>
                <option value="Plymouth">Plymouth</option>
                <option value="Chrysler">Chrysler</option>
                <option value="Other">Other Make / Model</option>
              </select>
            </div>

            {/* Car Model */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1" htmlFor="trade-model">Car Model *</label>
              <input
                id="trade-model"
                type="text"
                required
                placeholder="e.g. Mustang GT"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="w-full bg-black/50 border border-gray-800 text-sm p-2.5 rounded-lg text-gray-200 placeholder-gray-600 focus:border-amber-500 outline-none transition-colors"
              />
            </div>

            {/* Part / Car Year */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1" htmlFor="trade-year">Year (optional)</label>
              <input
                id="trade-year"
                type="text"
                placeholder="e.g. 2012"
                value={partYear}
                onChange={(e) => setPartYear(e.target.value)}
                className="w-full bg-black/50 border border-gray-800 text-sm p-2.5 rounded-lg text-gray-200 placeholder-gray-600 focus:border-amber-500 outline-none transition-colors"
              />
            </div>

            {/* Condition appraisal */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1" htmlFor="trade-condition">Condition appraisal</label>
              <select
                id="trade-condition"
                value={partCondition}
                onChange={(e) => setPartCondition(e.target.value)}
                className="w-full bg-black/50 border border-gray-800 text-sm p-2.5 rounded-lg text-gray-200 focus:border-amber-500 outline-none transition-colors"
              >
                <option value="new">Brand New / In Box (NOS)</option>
                <option value="showroom">Showroom Condition / Mint</option>
                <option value="good">Good / OEM Tested</option>
                <option value="fair">Fair / Core Part (Needs Polish)</option>
              </select>
            </div>

            {/* Expected Price */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1" htmlFor="trade-price">Expected value / Price *</label>
              <input
                id="trade-price"
                type="text"
                required
                placeholder="e.g. $250 or Trade value"
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(e.target.value)}
                className="w-full bg-black/50 border border-gray-800 text-sm p-2.5 rounded-lg text-gray-200 placeholder-gray-600 focus:border-amber-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* User comments */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1" htmlFor="trade-comment">Description and specifications</label>
            <textarea
              id="trade-comment"
              rows={3}
              placeholder="Detail any scratches, part numbers, modifications, or swap requests..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="w-full bg-black/50 border border-gray-800 text-sm p-2.5 rounded-lg text-gray-200 placeholder-gray-600 focus:border-amber-500 outline-none transition-colors resize-none"
            />
          </div>

          <div className="h-px bg-gray-800/80 my-2"></div>

          {/* Contact settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1" htmlFor="trade-user-name">Your Full Name *</label>
              <input
                id="trade-user-name"
                type="text"
                required
                placeholder="e.g. John Sebastian"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full bg-black/50 border border-gray-800 text-sm p-2.5 rounded-lg text-gray-200 placeholder-gray-600 focus:border-amber-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1" htmlFor="trade-user-phone">Phone number *</label>
              <input
                id="trade-user-phone"
                type="tel"
                required
                placeholder="e.g. (951) 555-0199"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="w-full bg-black/50 border border-gray-800 text-sm p-2.5 rounded-lg text-gray-200 placeholder-gray-600 focus:border-amber-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Buttons & Feedback */}
          <div className="space-y-3 pt-2">
            {submitError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl">
                {submitError}
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                id="submit-trade-btn"
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-800 disabled:text-gray-500 disabled:cursor-not-allowed text-black disabled:text-gray-500 font-semibold text-xs font-mono uppercase tracking-wider rounded-lg transition-all amber-glow-btn cursor-pointer"
              >
                {isSubmitting ? "Transmitting trade proposal..." : "Verify Trade Specs"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* SUCCESS SCREEN PORTAL */
        <div id="trade-success-box" className="text-center py-8 space-y-5 animate-fade-in text-gray-300">
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto text-amber-500">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div>
            <h5 className="font-display font-semibold text-lg text-white">Pragmatic Appraisal Configured!</h5>
            <p className="text-xs text-gray-450 max-w-md mx-auto mt-1 leading-normal">
              Alexander reviews incoming automotive inventory immediately. Open the primary messaging channel to secure your review sequence.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-neutral-900/60 border border-gray-850 p-4 rounded-xl text-left text-xs space-y-1.5 font-sans">
            <p className="text-gray-400"><strong className="text-neutral-200">Item Name:</strong> {partTitle}</p>
            <p className="text-gray-400"><strong className="text-neutral-200">Spec Appraisal:</strong> {partYear ? `${partYear} ` : ''}{carMake} {carModel} ({partCondition.toUpperCase()})</p>
            <p className="text-gray-400"><strong className="text-neutral-200">Value Proposal:</strong> <span className="font-mono text-amber-400 font-semibold">${expectedPrice}</span></p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-sm mx-auto">
            <a
              id="trade-whatsapp-cta"
              href={getWhatsAppTradeLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs font-mono uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(16,185,129,0.15)]"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Submit via WhatsApp</span>
            </a>
            <button
              id="trade-reset-btn"
              onClick={() => { setSubmitted(false); setPartTitle(''); setCarModel(''); setExpectedPrice(''); }}
              className="py-2.5 px-4 bg-neutral-900 hover:bg-neutral-850 border border-gray-800 text-gray-400 hover:text-white rounded-lg text-xs font-mono transition-all"
            >
              Propose Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
