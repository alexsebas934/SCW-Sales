import { Star, MessageSquare, Award, Clock, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data';

export default function ReviewList() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="alexander-reputation-grid">
      {/* LEFT: Overall Reputation Rating Card */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between" id="profile-recap-card">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase font-mono tracking-wider text-red-500 bg-red-500/10 px-2.5 py-1 rounded">Seller Profile</span>
            <span className="text-xs text-gray-500 font-mono">Member Since 2018</span>
          </div>

          <p className="text-sm font-mono text-gray-400">Marketplace Operator</p>
          <h4 className="font-display font-bold text-2xl text-white mt-1">Alexander Lazcano</h4>
          <p className="text-xs text-gray-400 mt-1">Lake Elsinore, California</p>

          {/* Large Stars rating */}
          <div className="my-6">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-display font-extrabold text-white">4.9</span>
              <div>
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">30+ Highly Rated Sales</p>
              </div>
            </div>
          </div>

          {/* Verified Strengths List */}
          <div className="space-y-3 pt-4 border-t border-gray-800">
            <h5 className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Alexander's Core Strengths</h5>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-neutral-900/50 border border-gray-800 p-2.5 rounded-lg flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs text-gray-300 font-medium font-sans">Punctual Meetups</span>
              </div>
              <div className="bg-neutral-900/50 border border-gray-800 p-2.5 rounded-lg flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-500 shrink-0" />
                <span className="text-xs text-gray-300 font-medium font-sans">Rapid Replies</span>
              </div>
              <div className="bg-neutral-900/50 border border-gray-800 p-2.5 rounded-lg flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs text-gray-300 font-medium font-sans">Fair Pricing</span>
              </div>
              <div className="bg-neutral-900/50 border border-gray-800 p-2.5 rounded-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
                <span className="text-xs text-gray-300 font-medium font-sans">Exact Descriptions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Quote Guarantee */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-400">
          <p className="italic">"My business is built around direct client trust. All parts are personally cleaned, inspected, and guaranteed exactly as described here."</p>
          <p className="mt-2 text-[10px] text-gray-500 font-mono">— Alexander Lazcano</p>
        </div>
      </div>

      {/* RIGHT: Individual Reviews scroll area */}
      <div className="lg:col-span-2 space-y-4 max-h-[460px] overflow-y-auto pr-2 hide-scrollbar" id="individual-reviews-list">
        {REVIEWS.map((review) => (
          <div key={review.id} className="bg-neutral-955 border border-gray-800/80 p-5 rounded-2xl hover:border-gray-800 transition-colors" id={`review-card-${review.id}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h5 className="font-display font-semibold text-white">{review.name}</h5>
                <span className="text-[10px] text-gray-500 font-mono">{review.date}</span>
              </div>
              <div className="flex text-amber-400 font-mono bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10 text-xs items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>5.0</span>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed italic">"{review.comment}"</p>

            {/* Strengths tags */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {review.notableStrengths.map((str, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 bg-neutral-900 border border-gray-850 text-gray-400 rounded-full"
                >
                  ✓ {str}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
