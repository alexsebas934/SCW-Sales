import React, { useState } from 'react';
import { Sliders, CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface FitmentWidgetProps {
  onFilterFitment: (filteredIds: string[] | null, selectedText: string | null) => void;
}

export default function FitmentWidget({ onFilterFitment }: FitmentWidgetProps) {
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [results, setResults] = useState<{ match: boolean; count: number; text: string } | null>(null);

  // Derive available models based on selected make to keep interface clean
  const makes = ['Ford', 'Dodge', 'Audi', 'Plymouth', 'Chrysler'];
  const modelsByMake: Record<string, string[]> = {
    Ford: ['Mustang GT', 'Mustang V6', 'Shelby GT500', 'Mustang (General)'],
    Dodge: ['Viper', 'Charger', 'Daimler'],
    Audi: ['S5', 'A5'],
    Plymouth: ['Voyager'],
    Chrysler: ['PT Cruiser'],
  };

  const handleCheckFitment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model || !year) {
      alert("Please select Make, Model and Year to verify parts compatibility.");
      return;
    }

    const yrNum = parseInt(year, 10);
    
    // Find all products that fit this selection
    const matchingProducts = PRODUCTS.filter(p => {
      return p.compatibilities.some(comp => {
        // Match make (case insensitive helper)
        const makeMatch = comp.make.toLowerCase() === make.toLowerCase();
        
        // Match model
        const selectedModelClean = model.toLowerCase();
        const pModelClean = comp.model.toLowerCase();
        
        let modelMatch = false;
        if (selectedModelClean.includes('mustang') && pModelClean.includes('mustang')) {
          modelMatch = true; // matches general mustang parts
        } else if (pModelClean === 'diecast' || pModelClean === 'scent' || pModelClean === 'streetwear' || pModelClean === 'garage work') {
          modelMatch = false; // collectibles/lifestyle aren't car specific fitment usually
        } else {
          modelMatch = pModelClean.includes(selectedModelClean) || selectedModelClean.includes(pModelClean);
        }

        // Match year
        const yearMatch = comp.years.length === 0 || comp.years.includes(yrNum);

        return makeMatch && modelMatch && yearMatch;
      });
    });

    const isMatch = matchingProducts.length > 0;
    const matchText = `${year} ${make} ${model}`;

    setResults({
      match: isMatch,
      count: matchingProducts.length,
      text: matchText
    });
    setChecked(true);

    if (isMatch) {
      onFilterFitment(matchingProducts.map(p => p.id), matchText);
    } else {
      onFilterFitment([], matchText);
    }
  };

  const handleClear = () => {
    setMake('');
    setModel('');
    setYear('');
    setChecked(false);
    setResults(null);
    onFilterFitment(null, null);
  };

  return (
    <div id="fitment-matcher-card" className="glass-panel p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-red-500/30">
      {/* Decorative vertical bar with GT stripes pattern */}
      <div className="absolute right-0 top-0 bottom-0 w-2 flex gap-1 pointer-events-none opacity-20">
        <div className="w-1/2 bg-red-600 h-full"></div>
        <div className="w-1/2 bg-red-600 h-full"></div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
          <Sliders className="w-5 h-5" id="fitment-slider-icon" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-white" id="precision-title">SCW Precision Fit™</h3>
          <p className="text-xs text-gray-400">Lock in your build to show guaranteed compatible stock.</p>
        </div>
      </div>

      <form onSubmit={handleCheckFitment} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* MAKE SELECT */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1" htmlFor="fitment-make">Vehicle Make</label>
            <select
              id="fitment-make"
              value={make}
              onChange={(e) => { setMake(e.target.value); setModel(''); setChecked(false); }}
              className="w-full bg-black/50 border border-gray-800 text-gray-200 text-sm rounded-lg p-2.5 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
            >
              <option value="" className="bg-neutral-900 text-gray-300">Choose Make...</option>
              {makes.map(m => (
                <option key={m} value={m} className="bg-neutral-900 text-gray-300">{m}</option>
              ))}
            </select>
          </div>

          {/* MODEL SELECT */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1" htmlFor="fitment-model">Vehicle Model</label>
            <select
              id="fitment-model"
              value={model}
              onChange={(e) => { setModel(e.target.value); setChecked(false); }}
              disabled={!make}
              className="w-full bg-black/50 border border-gray-800 text-gray-200 text-sm rounded-lg p-2.5 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-neutral-900 text-gray-300">Choose Model...</option>
              {make && modelsByMake[make]?.map(m => (
                <option key={m} value={m} className="bg-neutral-900 text-gray-300">{m}</option>
              ))}
            </select>
          </div>

          {/* YEAR INPUT */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1" htmlFor="fitment-year">Model Year</label>
            <select
              id="fitment-year"
              value={year}
              onChange={(e) => { setYear(e.target.value); setChecked(false); }}
              className="w-full bg-black/50 border border-gray-800 text-gray-200 text-sm rounded-lg p-2.5 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
            >
              <option value="" className="bg-neutral-900 text-gray-300">Select Year...</option>
              {/* Generate standard mustang active years & other classic scales */}
              {Array.from({ length: 19 }, (_, i) => 2023 - i).map(yr => (
                <option key={yr} value={yr.toString()} className="bg-neutral-900 text-gray-300">{yr}</option>
              ))}
              <option value="2003" className="bg-neutral-900 text-gray-300">2003 (New Edge)</option>
              <option value="2001" className="bg-neutral-900 text-gray-300">2001</option>
              <option value="1993" className="bg-neutral-900 text-gray-300">1993 (Foxbody/Classic)</option>
              <option value="1948" className="bg-neutral-900 text-gray-300">1948 Plymouth</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 justify-end">
          {checked && (
            <button
              id="clear-fitment-btn"
              type="button"
              onClick={handleClear}
              className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              Clear Fitment
            </button>
          )}
          <button
            id="verify-fitment-btn"
            type="submit"
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-xs font-mono uppercase tracking-wider rounded-lg transition-all glow-btn"
          >
            Verify Compatibility
          </button>
        </div>
      </form>

      {/* RESULT FEEDBACK CARD */}
      {checked && results && (
        <div
          id="fitment-result-banner"
          className={`mt-4 p-4 rounded-xl border flex items-start gap-3 animate-fade-in transition-all ${
            results.match
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
          }`}
        >
          {results.match ? (
            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-500" />
          ) : (
            <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
          )}
          <div className="flex-1 text-sm">
            <span className="font-semibold block font-display">
              {results.match
                ? `100% Fitment Verified for ${results.text}`
                : `No specific stock matches for ${results.text}`}
            </span>
            <p className="text-xs text-gray-400 mt-1">
              {results.match
                ? `Alexander found ${results.count} premium parts ready to bolt directly onto your specimen.`
                : "Alexander has extensive broker networks! Request a custom part and we will secure it for you."}
            </p>
          </div>
          {!results.match && (
            <span className="bg-amber-500/20 text-amber-300 text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
              Special Order
            </span>
          )}
        </div>
      )}
    </div>
  );
}
