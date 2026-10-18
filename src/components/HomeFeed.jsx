import React, { useState } from 'react';
import { MoreVertical, ChevronRight } from 'lucide-react';

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

const recents = [
  {
    id: 'r1',
    title: 'Car Brand Logos (All)',
    meta: '380 cards · by you',
    iconType: 'cards',
  },
  {
    id: 'r2',
    title: 'Data Mining Concepts Practice Test',
    meta: 'Practice test · by you',
    iconType: 'test',
  },
  {
    id: 'r3',
    title: 'HSK Standard Course 4B Vocabulary',
    meta: '301 cards · by you',
    iconType: 'cards',
  },
  {
    id: 'r4',
    title: 'Data Mining Chapter 1: KDD, Data Types, Method…',
    meta: '45 cards · by you',
    iconType: 'cards',
  },
  {
    id: 'r5',
    title: 'Data Mining Chapter 1: KDD, Data Types, Method…',
    meta: 'Study guide · by you',
    iconType: 'guide',
  },
];

function RecentsIcon({ type }) {
  if (type === 'cards') {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#2e3856] flex items-center justify-center flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="4" width="14" height="16" rx="2" stroke="#7583ff" strokeWidth="2" />
          <path d="M9 4V2.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5V4" stroke="#7583ff" strokeWidth="2" />
          <circle cx="12" cy="12" r="1.5" fill="#7583ff" />
        </svg>
      </div>
    );
  }
  if (type === 'test') {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#2e3856] flex items-center justify-center flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="#ff8f3d" strokeWidth="2" />
          <path d="M8 8h8M8 12h5M8 16h8" stroke="#ff8f3d" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-xl bg-[#2e3856] flex items-center justify-center flex-shrink-0">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="#db2777" strokeWidth="2" />
        <path d="M8 10l2 2 4-4" stroke="#db2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 16h8" stroke="#db2777" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function CardFanIllustration() {
  return (
    <div className="relative w-44 h-32 flex-shrink-0">
      {/* 4 Cards Fanning Out */}
      <div 
        className="absolute bottom-2 right-12 w-20 h-28 rounded-xl border border-[#3b476b] bg-[#1e2545] -rotate-[22deg] origin-bottom-right shadow-md flex items-center justify-center"
        style={{ borderColor: '#ff8f3d' }}
      >
        <div className="w-5 h-5 rounded-full bg-[#ff8f3d]/20 border border-[#ff8f3d] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#ff8f3d]" />
        </div>
      </div>
      <div 
        className="absolute bottom-2 right-8 w-20 h-28 rounded-xl border border-[#3b476b] bg-[#1e2545] -rotate-[12deg] origin-bottom-right shadow-md flex items-center justify-center"
        style={{ borderColor: '#3b82f6' }}
      >
        <div className="w-5 h-5 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
        </div>
      </div>
      <div 
        className="absolute bottom-2 right-4 w-20 h-28 rounded-xl border border-[#3b476b] bg-[#1e2545] -rotate-[3deg] origin-bottom-right shadow-md flex items-center justify-center"
        style={{ borderColor: '#a855f7' }}
      >
        <div className="w-6 h-6 rounded-full border-2 border-[#a855f7] flex items-center justify-center">
          <span className="text-[#a855f7] text-[10px] font-bold">↺</span>
        </div>
      </div>
      <div 
        className="absolute bottom-2 right-0 w-22 h-28 rounded-xl border-2 border-[#10b981] bg-[#1e2545] rotate-[6deg] origin-bottom-right shadow-lg flex items-center justify-center"
      >
        <div className="w-7 h-7 rounded-full bg-[#10b981] flex items-center justify-center shadow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function JBICard({ card, onContinue }) {
  return (
    <div className="relative rounded-2xl bg-[#2e3856]/40 border border-[#2e3856] flex-1 min-w-[340px] p-6 flex flex-col justify-between overflow-hidden group hover:border-[#4255ff]/40 transition-all">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-bold text-[#f6f7fb] truncate">{card.title}</h3>
          <div className="mt-4 h-2 w-48 rounded-full bg-[#1a1d36] overflow-hidden">
            <div className="h-full bg-[#4255ff] rounded-full w-2" />
          </div>
          <p className="text-xs text-[#939bb4] mt-2.5 font-medium">{card.label}</p>
        </div>
        <CardFanIllustration />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => onContinue(card)}
          className="bg-[#4255ff] hover:bg-[#3344dd] text-white text-xs font-bold px-7 py-2.5 rounded-full transition-all active:scale-95 shadow"
        >
          Continue
        </button>
        <button className="p-1 rounded-full text-[#939bb4] hover:text-white transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
}

export default function HomeFeed({ onSelectSet }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 select-none pb-24">
      {/* Jump back in */}
      <section>
        <h2 className="text-xl font-extrabold text-[#f6f7fb] mb-4">Jump back in</h2>
        <div className="relative flex gap-4 items-stretch">
          <JBICard card={jbiCards[0]} onContinue={onSelectSet} />
          <div className="relative flex-1 min-w-[340px] rounded-2xl bg-[#2e3856]/40 border border-[#2e3856] p-6 flex flex-col justify-between overflow-hidden">
            <div>
              <h3 className="text-lg font-bold text-[#f6f7fb] truncate">{jbiCards[1].title}</h3>
              <div className="mt-4 h-2 w-48 rounded-full bg-[#1a1d36] overflow-hidden">
                <div className="h-full bg-[#4255ff] rounded-full w-2" />
              </div>
              <p className="text-xs text-[#939bb4] mt-2.5 font-medium">{jbiCards[1].label}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => onSelectSet(jbiCards[1])}
                className="bg-[#4255ff] hover:bg-[#3344dd] text-white text-xs font-bold px-7 py-2.5 rounded-full transition-all active:scale-95 shadow"
              >
                Continue
              </button>
              <button className="p-1 rounded-full text-[#939bb4] hover:text-white transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>

            {/* Right arrow slider control matching Quizlet */}
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1a1d36] border border-[#2e3856] text-white flex items-center justify-center shadow-xl hover:bg-[#2e3856] transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-2 mt-3.5">
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-[#2e3856]" />
        </div>
      </section>

      {/* Recents */}
      <section>
        <h2 className="text-xl font-extrabold text-[#f6f7fb] mb-4">Recents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {recents.map(item => (
            <button
              key={item.id}
              onClick={() => onSelectSet({ id: item.id, title: item.title })}
              className="flex items-center space-x-3.5 bg-[#2e3856]/40 hover:bg-[#2e3856] border border-[#2e3856] rounded-xl px-4 py-3 text-left transition-all group"
            >
              <RecentsIcon type={item.iconType} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#f6f7fb] truncate group-hover:text-[#7583ff] transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-[#939bb4] mt-0.5">{item.meta}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Study with friends */}
      <section>
        <h2 className="text-xl font-extrabold text-[#f6f7fb] mb-4">Study with friends</h2>
        <div className="rounded-2xl bg-[#2e3856]/40 border border-[#2e3856] flex flex-col md:flex-row overflow-hidden relative">
          <div className="flex-1 p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-[#4255ff] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <button className="text-[#939bb4] hover:text-white transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
              <h3 className="text-xl font-black text-[#f6f7fb] mb-2">You can now study with friends!</h3>
              <p className="text-sm text-[#939bb4] leading-relaxed max-w-md">
                Invite your friends to any activity and share your progress and results with each other!
              </p>
            </div>
            <button className="mt-6 w-full sm:w-auto bg-[#4255ff] hover:bg-[#3344dd] text-white font-bold py-3 px-8 rounded-full text-xs transition-all self-start shadow-md">
              Start studying with friends
            </button>
          </div>

          {/* Real styled graphic matching Quizlet */}
          <div className="w-full md:w-80 bg-gradient-to-tr from-purple-200 via-pink-100 to-indigo-100 p-6 flex items-center justify-center relative overflow-hidden">
            <div className="w-full bg-white rounded-xl shadow-lg p-3 space-y-2.5">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#4255ff] text-white flex items-center justify-center text-[10px] font-bold">1</div>
                <div className="flex-1 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-bold">2</div>
                <div className="flex-1 h-3 rounded-full bg-sky-400 w-3/4" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">3</div>
                <div className="flex-1 h-3 rounded-full bg-sky-300 w-1/2" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-bold">4</div>
                <div className="flex-1 h-3 rounded-full bg-sky-200 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personalize your content */}
      <section>
        <h2 className="text-xl font-extrabold text-[#f6f7fb] mb-4">Personalize your content</h2>
        <div className="rounded-2xl bg-[#2e3856]/40 border border-[#2e3856] p-7 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
              <span className="text-[#0a092d] font-black text-xl">Q</span>
            </div>
            <button className="text-[#939bb4] hover:text-white transition-colors">
              <MoreVertical size={16} />
            </button>
          </div>
          <h3 className="text-lg font-bold text-[#f6f7fb] mb-4">Find the latest content based on your courses</h3>
          <button className="bg-[#2e3856] hover:bg-[#394569] text-white font-bold py-2.5 px-6 rounded-full text-xs transition-all">
            Update school and courses
          </button>
        </div>
      </section>
    </div>
  );
}
