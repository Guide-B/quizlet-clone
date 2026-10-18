import React from 'react';
import { Layers, CheckSquare, FileText, MoreVertical } from 'lucide-react';
import { recentsShelf } from '../data/mockData';

const iconMap = {
  Layers,
  CheckSquare,
  FileText
};

export default function RecentsShelf({ onSelectRecent }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#f6f7fb]">Recents</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentsShelf.map(item => {
          const Icon = iconMap[item.icon] || Layers;

          return (
            <div
              key={item.id}
              onClick={() => onSelectRecent(item)}
              className="bg-[#2e3856] hover:bg-[#343e62] border border-[#2e3856] rounded-xl p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between group shadow"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-md bg-[#1a1d36] text-[#7583ff]">
                      <Icon size={14} />
                    </div>
                    <span className="text-[11px] font-bold text-[#939bb4] uppercase tracking-wider">
                      {item.type.replace('_', ' ')}
                    </span>
                  </div>

                  <button
                    onClick={e => e.stopPropagation()}
                    aria-label="More options"
                    className="p-1 rounded-full text-[#939bb4] hover:text-white hover:bg-[#1a1d36]/60 transition-colors"
                  >
                    <MoreVertical size={14} />
                  </button>
                </div>

                <h4 className="text-sm font-bold text-[#f6f7fb] group-hover:text-[#7583ff] transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1a1d36]/80 flex items-center justify-between text-xs text-[#939bb4]">
                <span>{item.metadata}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
