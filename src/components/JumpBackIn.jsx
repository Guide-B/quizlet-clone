import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical, Flame } from 'lucide-react';
import { srsProgressSets } from '../data/mockData';

export default function JumpBackIn({ onSelectSet }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(srsProgressSets.length / itemsPerPage);

  const displayedSets = srsProgressSets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#f6f7fb] flex items-center space-x-2">
          <span>Jump back in</span>
        </h2>

        {/* Carousel pagination arrows */}
        <div className="flex items-center space-x-2">
          <button
            aria-label="Previous"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="w-8 h-8 rounded-full bg-[#2e3856] hover:bg-[#394569] disabled:opacity-40 disabled:hover:bg-[#2e3856] text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="w-8 h-8 rounded-full bg-[#2e3856] hover:bg-[#394569] disabled:opacity-40 disabled:hover:bg-[#2e3856] text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedSets.map(set => (
          <div
            key={set.id}
            className="bg-[#2e3856] hover:bg-[#343e62] border border-[#2e3856] rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 relative group shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 className="text-base font-bold text-[#f6f7fb] group-hover:text-[#7583ff] transition-colors truncate">
                  {set.title}
                </h3>
                <p className="text-xs text-[#939bb4]">
                  {set.subtitle}
                </p>
              </div>

              {/* More options button */}
              <button
                aria-label="More options"
                className="p-1.5 rounded-full text-[#939bb4] hover:text-white hover:bg-[#1a1d36]/60 transition-colors"
                title="Options"
              >
                <MoreVertical size={16} />
              </button>
            </div>

            {/* Bottom: Progress Bar + Continue Pill Button */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex-1 bg-[#1a1d36] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#4255ff] h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((set.completedCards / set.totalCards) * 100)}%` }}
                />
              </div>

              <button
                onClick={() => onSelectSet(set)}
                className="bg-[#4255ff] hover:bg-[#3344dd] text-white text-xs font-extrabold px-6 py-2 rounded-full transition-all shadow-md active:scale-95 flex-shrink-0"
              >
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Numerical Carousel Indicators: 1, 2 */}
      <div className="flex items-center justify-center space-x-2 pt-1">
        {[1, 2].map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-7 h-7 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
              currentPage === page
                ? 'bg-white text-[#0a092d] shadow'
                : 'bg-white/20 text-white hover:bg-white/40'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </section>
  );
}
