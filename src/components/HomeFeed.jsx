import React, { useState } from 'react';
import { MoreVertical, ChevronRight, Users, Headphones } from 'lucide-react';

// Jump Back In SRS cards
const jbiCards = [
  {
    id: 'jbi-1',
    title: 'Car Brand Logos (All)',
    completed: 0,
    total: 133,
    label: '0/133 cards completed',
  },
  {
    id: 'jbi-2',
    title: 'HSK Standard Course 4B',
    completed: 0,
    total: 199,
    label: '0/199 cards completed',
  },
];

// Recents items
const recents = [
  {
    id: 'r1',
    title: 'Car Brand Logos (All)',
    meta: '380 cards · by you',
    icon: 'cards',
    color: '#4255ff',
  },
  {
    id: 'r2',
    title: 'Data Mining Concepts Practice Test',
    meta: 'Practice test · by you',
    icon: 'test',
    color: '#ff6b6b',
  },
  {
    id: 'r3',
    title: 'HSK Standard Course 4B Vocabulary',
    meta: '301 cards · by you',
    icon: 'cards',
    color: '#4255ff',
  },
  {
    id: 'r4',
    title: 'Data Mining Chapter 1: KDD, Data Types, Method…',
    meta: '45 cards · by you',
    icon: 'cards',
    color: '#4255ff',
  },
  {
    id: 'r5',
    title: 'Data Mining Chapter 1: KDD, Data Types, Method…',
    meta: 'Study guide · by you',
    icon: 'guide',
    color: '#ff9f43',
  },
];

function CardIcon({ type, color }) {
  if (type === 'cards') {
    return (
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#2e3856' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="6" width="18" height="13" rx="2" stroke={color} strokeWidth="2" />
          <path d="M7 6V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1" stroke={color} strokeWidth="2" />
        </svg>
      </div>
    );
  }
  if (type === 'test') {
    return (
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#2e3856' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="#ff6b6b" strokeWidth="2" />
          <rect x="9" y="3" width="6" height="4" rx="1" stroke="#ff6b6b" strokeWidth="2" />
          <path d="M9 12l2 2 4-4" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#2e3856' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#ff9f43" strokeWidth="2" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#ff9f43" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Jump Back In Card - exact replica of real Quizlet cards
function JBICard({ card, onContinue }) {
  const pct = Math.round((card.completed / card.total) * 100);
  return (
    <div className="relative rounded-2xl overflow-hidden flex-1 min-w-[300px]" style={{ background: '#1e2545', border: '1px solid #2e3856' }}>
      <div className="p-5 flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-base font-bold text-white leading-tight truncate">{card.title}</h3>
          <div className="mt-3 h-1.5 rounded-full bg-[#2e3856] overflow-hidden max-w-[200px]">
            <div className="h-full rounded-full bg-[#4255ff]" style={{ width: `${pct}%`, minWidth: pct === 0 ? '30px' : undefined }} />
          </div>
          <p className="text-xs text-[#939bb4] mt-2">{card.label}</p>
          <button
            onClick={() => onContinue(card)}
            className="mt-4 bg-[#4255ff] hover:bg-[#3344dd] text-white text-sm font-bold px-6 py-2 rounded-full transition-all active:scale-95"
          >
            Continue
          </button>
        </div>
        {/* Card stack illustration */}
        <div className="flex-shrink-0 relative w-28 h-24 mr-2">
          <div className="absolute bottom-0 right-0 w-20 h-16 rounded-xl bg-[#3d4a6b] rotate-6" />
          <div className="absolute bottom-2 right-2 w-20 h-16 rounded-xl bg-[#2e3856] -rotate-2 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-purple-400 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#a78bfa" strokeWidth="1.5" />
                <path d="M4 7l2 2 4-4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <button className="absolute top-3 right-3 p-1 rounded-full text-[#939bb4] hover:text-white transition-colors">
        <MoreVertical size={16} />
      </button>
    </div>
  );
}

export default function HomeFeed({ onSelectSet }) {
  const [jbiPage, setJbiPage] = useState(0);

  const visibleCards = jbiCards.slice(jbiPage * 2, jbiPage * 2 + 2);
  const hasNext = (jbiPage + 1) * 2 < jbiCards.length;

  return (
    <div className="max-w-4xl mx-auto pb-24 space-y-8 pt-2">
      {/* Jump back in */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Jump back in</h2>
        <div className="relative flex gap-4 overflow-hidden">
          {visibleCards.map(card => (
            <JBICard key={card.id} card={card} onContinue={onSelectSet} />
          ))}
          {hasNext && (
            <button
              onClick={() => setJbiPage(p => p + 1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#2e3856] hover:bg-[#394569] text-white flex items-center justify-center shadow-lg z-10"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>
        {/* Dot indicators */}
        <div className="flex justify-center space-x-2 mt-3">
          {Array.from({ length: Math.ceil(jbiCards.length / 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setJbiPage(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === jbiPage ? 'bg-white' : 'bg-[#2e3856]'}`}
            />
          ))}
        </div>
      </section>

      {/* Recents */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Recents</h2>
        <div className="grid grid-cols-2 gap-3">
          {recents.map(item => (
            <button
              key={item.id}
              onClick={() => onSelectSet({ id: item.id, title: item.title })}
              className="flex items-center space-x-3 bg-[#1e2545] hover:bg-[#2e3856] rounded-xl px-4 py-3 text-left transition-all border border-transparent hover:border-[#4255ff]/20"
            >
              <CardIcon type={item.icon} color={item.color} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                <p className="text-xs text-[#939bb4] mt-0.5">{item.meta}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Study with friends */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Study with friends</h2>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#1e2545', border: '1px solid #2e3856' }}>
          <div className="flex">
            <div className="flex-1 p-6">
              <div className="w-10 h-10 rounded-full bg-[#4255ff] flex items-center justify-center mb-4">
                <Users size={20} className="text-white" />
              </div>
              <button className="absolute top-4 right-4 text-[#939bb4] hover:text-white">
                <MoreVertical size={16} />
              </button>
              <h3 className="text-lg font-bold text-white mb-2">You can now study with friends!</h3>
              <p className="text-sm text-[#939bb4] mb-5">
                Invite your friends to any activity and share your progress and results with each other!
              </p>
              <button className="w-full bg-[#4255ff] hover:bg-[#3344dd] text-white font-bold py-3 px-6 rounded-full text-sm transition-all">
                Start studying with friends
              </button>
            </div>
            <div className="w-48 flex-shrink-0 bg-pink-100 rounded-r-2xl relative overflow-hidden">
              {/* Illustrated preview */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-blue-400" />
                    <div className="flex-1 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-orange-400" />
                    <div className="flex-1 h-3 rounded-full bg-blue-300" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-red-400" />
                    <div className="flex-1 h-3 rounded-full bg-blue-200" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-purple-400" />
                    <div className="flex-1 h-3 rounded-full bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalize your content */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Personalize your content</h2>
        <div className="rounded-2xl p-6 relative" style={{ background: '#1e2545', border: '1px solid #2e3856' }}>
          <button className="absolute top-4 right-4 text-[#939bb4] hover:text-white">
            <MoreVertical size={16} />
          </button>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4">
            <span className="text-[#0a092d] font-black text-lg">Q</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Find the latest content based on your courses</h3>
          <button className="mt-4 bg-[#2e3856] hover:bg-[#394569] text-white font-bold py-2 px-5 rounded-full text-sm transition-all">
            Update school and courses
          </button>
        </div>
      </section>

      {/* New: Podcast mode */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">New: Podcast mode</h2>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#1e2545', border: '1px solid #2e3856' }}>
          <div className="flex">
            <div className="flex-1 p-6">
              <div className="w-10 h-10 rounded-full bg-[#4255ff] flex items-center justify-center mb-4">
                <Headphones size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Make a podcast from your notes</h3>
              <button className="mt-4 w-full bg-[#4255ff] hover:bg-[#3344dd] text-white font-bold py-3 px-6 rounded-full text-sm transition-all">
                Generate a podcast
              </button>
            </div>
            <div className="w-48 flex-shrink-0 bg-indigo-900 rounded-r-2xl relative overflow-hidden flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-red-500 mx-auto flex items-center justify-center">
                  <span className="text-white font-black text-lg">X</span>
                </div>
                <div className="h-1 w-24 bg-indigo-400 rounded-full" />
                <div className="h-1 w-20 bg-indigo-400/60 rounded-full" />
                <div className="flex items-center justify-center space-x-3 mt-2">
                  <div className="w-6 h-6 rounded-full border-2 border-white/40" />
                  <div className="w-8 h-8 rounded-full bg-[#4255ff] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                      <path d="M3 2l7 4-7 4V2z" />
                    </svg>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-white/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh finds */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Fresh finds</h2>
          <button className="text-[#939bb4] hover:text-white">
            <MoreVertical size={16} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: 'Chapter 5 Vocab', meta: '23 studiers recently', cards: 48 },
            { title: 'Biology Terms', meta: '8 studiers recently', cards: 92 },
            { title: 'Math Formulas', meta: '36 studiers recently', cards: 31 },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: '#1e2545', border: '1px solid #2e3856' }}
            >
              <div className="h-24 bg-gradient-to-br from-[#4255ff]/20 to-[#7583ff]/10 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="8" width="24" height="18" rx="3" stroke="#4255ff" strokeWidth="2" />
                  <path d="M10 8V7a3 3 0 0 1 6 0v1" stroke="#4255ff" strokeWidth="2" />
                </svg>
              </div>
              <div className="p-3">
                <div className="flex items-center space-x-1 text-xs text-[#939bb4] mb-1">
                  <Users size={11} />
                  <span>{item.meta}</span>
                </div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
