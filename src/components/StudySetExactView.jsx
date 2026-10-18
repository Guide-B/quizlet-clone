import React, { useState, useEffect } from 'react';
import {
  Folder, Headphones, Bookmark, Calendar, Share2, MoreHorizontal,
  Users, Radio, RotateCcw, Check, X, Shuffle, Settings,
  Maximize2, Lightbulb, ChevronRight
} from 'lucide-react';

// SVG illustration for Match game card - peach background, purple flower shape + purple card
function MatchIllustration() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="120" rx="8" fill="#f8c8b4" />
      {/* Purple card behind */}
      <rect x="90" y="15" width="70" height="90" rx="10" fill="#7c3aed" />
      <rect x="100" y="50" width="50" height="6" rx="3" fill="white" opacity="0.9" />
      <rect x="100" y="62" width="40" height="6" rx="3" fill="white" opacity="0.7" />
      <rect x="100" y="74" width="45" height="6" rx="3" fill="white" opacity="0.8" />
      {/* Purple flower/clover shape */}
      <circle cx="55" cy="55" r="18" fill="#7c3aed" />
      <circle cx="37" cy="55" r="14" fill="#7c3aed" />
      <circle cx="55" cy="37" r="14" fill="#7c3aed" />
      <circle cx="73" cy="55" r="14" fill="#7c3aed" />
      <circle cx="55" cy="73" r="14" fill="#7c3aed" />
      <circle cx="55" cy="55" r="10" fill="#7c3aed" />
      {/* Blue triangle */}
      <polygon points="30,110 70,110 50,85" fill="#2563eb" />
    </svg>
  );
}

// SVG illustration for Blocks game card - yellow background, colored blocks grid
function BlocksIllustration() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="120" rx="8" fill="#f5c842" />
      {/* Grid of colored squares */}
      <rect x="30" y="20" width="40" height="36" rx="6" fill="#ef4444" />
      <rect x="80" y="20" width="40" height="36" rx="6" fill="#3b82f6" />
      <rect x="130" y="20" width="40" height="36" rx="6" fill="#ef4444" />
      <rect x="30" y="65" width="40" height="36" rx="6" fill="#ffffff" />
      <rect x="80" y="65" width="40" height="36" rx="6" fill="#ef4444" />
      <rect x="130" y="65" width="40" height="36" rx="6" fill="#3b82f6" />
    </svg>
  );
}

// SVG illustration for Charms game card - sky blue background, stars and shield shapes
function CharmsIllustration() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="120" rx="8" fill="#7dd3fc" />
      {/* Rounded square shapes */}
      <rect x="15" y="25" width="50" height="50" rx="12" fill="#c084fc" opacity="0.9" />
      <rect x="75" y="15" width="50" height="50" rx="12" fill="#a5f3fc" opacity="0.9" />
      <rect x="135" y="35" width="45" height="45" rx="12" fill="#fcd34d" opacity="0.9" />
      <rect x="25" y="75" width="45" height="38" rx="12" fill="#a5f3fc" opacity="0.8" />
      <rect x="110" y="70" width="55" height="42" rx="12" fill="#c084fc" opacity="0.8" />
      {/* White stars */}
      <text x="32" y="58" fill="white" fontSize="22" fontFamily="serif">★</text>
      <text x="155" y="55" fill="white" fontSize="18" fontFamily="serif">★</text>
      <text x="120" y="95" fill="white" fontSize="16" fontFamily="serif">★</text>
    </svg>
  );
}

export default function StudySetExactView({ studySet, onSwitchMode, onOpenAskQuizlet }) {
  const cards = studySet?.cards || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffleActive, setShuffleActive] = useState(true);
  const [knownCount, setKnownCount] = useState(0);
  const [learningCount, setLearningCount] = useState(0);

  const currentCard = cards[currentIndex] || cards[0] || { term: 'Porsche', definition: 'German luxury automobile manufacturer' };
  const total = cards.length || 380;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % Math.max(cards.length, 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + Math.max(cards.length, 1)) % Math.max(cards.length, 1));
  };

  const markKnown = () => { setKnownCount(k => k + 1); handleNext(); };
  const markLearning = () => { setLearningCount(l => l + 1); handleNext(); };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsFlipped(f => !f);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards.length]);

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-24 select-none">
      {/* Top Breadcrumb & Action Pill Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#f6f7fb]">
          <Folder size={14} className="text-[#939bb4]" />
          <span>University class</span>
        </div>
        <div className="flex items-center space-x-2 text-xs flex-wrap gap-2">
          <button className="flex items-center space-x-1.5 bg-[#1e2545] hover:bg-[#2e3856] text-white px-4 py-2 rounded-full font-semibold transition-all" style={{ border: '1px solid #2e3856' }}>
            <Headphones size={14} className="text-[#939bb4]" />
            <span>Listen as a podcast</span>
          </button>
          <button className="p-2 rounded-full bg-[#1e2545] hover:bg-[#2e3856] text-white transition-colors" style={{ border: '1px solid #2e3856' }}>
            <Bookmark size={15} />
          </button>
          <button className="flex items-center space-x-1.5 bg-[#1e2545] hover:bg-[#2e3856] text-white px-3.5 py-2 rounded-full font-semibold transition-all" style={{ border: '1px solid #2e3856' }}>
            <Calendar size={14} />
            <span>Add to calendar</span>
          </button>
          <button className="p-2 rounded-full bg-[#1e2545] hover:bg-[#2e3856] text-white transition-colors" style={{ border: '1px solid #2e3856' }}>
            <Share2 size={15} />
          </button>
          <button className="p-2 rounded-full bg-[#1e2545] hover:bg-[#2e3856] text-white transition-colors" style={{ border: '1px solid #2e3856' }}>
            <MoreHorizontal size={15} />
          </button>
        </div>
      </div>

      {/* Set Title */}
      <h1 className="text-3xl font-black text-white tracking-tight">
        {studySet?.title || 'Car Brand Logos (All)'}
      </h1>

      {/* Study with friends | Play live games */}
      <div className="grid grid-cols-2 gap-3 max-w-2xl">
        <button className="flex items-center justify-center space-x-2 py-3 px-5 rounded-full font-bold text-sm text-white transition-all" style={{ background: '#1e2545', border: '1px solid #2e3856' }}>
          <Users size={16} />
          <span>Study with friends</span>
          <span className="bg-[#4255ff] text-white text-[10px] font-black px-2 py-0.5 rounded-full">New</span>
        </button>
        <button className="flex items-center justify-center space-x-2 py-3 px-5 rounded-full font-bold text-sm text-white transition-all" style={{ background: '#1e2545', border: '1px solid #2e3856' }}>
          <Radio size={16} />
          <span>Play live games</span>
        </button>
      </div>

      {/* 3 Mode Tabs: Flashcards | Learn | Test */}
      <div className="grid grid-cols-3 gap-3 max-w-2xl">
        <button
          onClick={() => onSwitchMode('flashcards')}
          className="flex items-center justify-center space-x-2.5 py-4 px-4 rounded-xl font-bold text-sm text-white transition-all"
          style={{ background: '#1e2545', border: '1px solid #2e3856' }}
        >
          <div className="w-8 h-8 rounded-lg bg-[#4255ff] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </div>
          <span>Flashcards</span>
        </button>

        <button
          onClick={() => onSwitchMode('learn')}
          className="flex items-center justify-center space-x-2.5 py-4 px-4 rounded-xl font-bold text-sm text-white transition-all"
          style={{ background: '#1e2545', border: '1px solid #2e3856' }}
        >
          <div className="w-8 h-8 rounded-lg bg-[#4255ff] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
          </div>
          <span>Learn</span>
        </button>

        <button
          onClick={() => onSwitchMode('test')}
          className="flex items-center justify-center space-x-2.5 py-4 px-4 rounded-xl font-bold text-sm text-white transition-all"
          style={{ background: '#1e2545', border: '1px solid #2e3856' }}
        >
          <div className="w-8 h-8 rounded-lg bg-[#4255ff] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <span>Test</span>
        </button>
      </div>

      {/* Flashcard Canvas */}
      <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#1e2545', border: '1px solid #2e3856' }}>
        {/* Get a hint bar */}
        <div className="px-5 pt-4 pb-0 flex items-center justify-between">
          <button className="flex items-center space-x-1.5 text-[#f6f7fb] text-xs font-bold hover:text-[#7583ff] transition-colors">
            <Lightbulb size={15} />
            <span>Get a hint</span>
          </button>
        </div>

        {/* Card Viewport - click to flip */}
        <div
          onClick={() => setIsFlipped(f => !f)}
          className="min-h-[340px] flex items-center justify-center cursor-pointer px-8 py-8"
          style={{ perspective: '1000px' }}
        >
          {!isFlipped ? (
            <div className="text-center space-y-5">
              {/* Car logo SVG illustration */}
              <div className="mx-auto flex items-center justify-center" style={{ width: 160, height: 120 }}>
                <svg viewBox="0 0 160 120" width="160" height="120" xmlns="http://www.w3.org/2000/svg">
                  {/* Vector-like car logo placeholder */}
                  <polygon points="80,10 150,100 10,100" fill="#b91c1c" stroke="#888" strokeWidth="2" />
                  <polygon points="80,30 130,90 30,90" fill="#991b1b" />
                  <text x="80" y="85" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
                    {currentCard.term || 'VECTOR'}
                  </text>
                </svg>
              </div>
              <h2 className="text-3xl font-black text-white">{currentCard.term || 'Car Brand'}</h2>
            </div>
          ) : (
            <div className="text-center max-w-lg">
              <p className="text-xl font-bold text-white leading-relaxed">
                {currentCard.definition || 'Identify the car brand from the logo'}
              </p>
            </div>
          )}
        </div>

        {/* Shortcut lilac banner */}
        <div className="flex items-center justify-center space-x-2 py-2.5 px-4 text-xs font-bold" style={{ background: '#b4bcff', color: '#0a092d' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a092d" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
          </svg>
          <span>Shortcut</span>
          <span>Press</span>
          <kbd className="bg-white px-2 py-0.5 rounded shadow-sm text-[11px] font-black" style={{ color: '#0a092d' }}>Space</kbd>
          <span>or click on the card to flip</span>
        </div>
      </div>

      {/* Control bar */}
      <div className="flex items-center justify-between gap-4 pt-1">
        {/* Sort flashcards */}
        <button className="text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors" style={{ background: '#1e2545', border: '1px solid #2e3856' }}>
          Sort flashcards
        </button>

        {/* Center: X | count | Check */}
        <div className="flex items-center space-x-3">
          <button
            onClick={markLearning}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:bg-rose-900/30"
            style={{ background: '#1e2545', border: '1px solid #2e3856' }}
          >
            <X size={20} className="text-[#939bb4]" />
          </button>

          <span className="text-sm font-bold text-white min-w-[60px] text-center">
            {currentIndex + 1} / {total}
          </span>

          <button
            onClick={markKnown}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:bg-emerald-900/30"
            style={{ background: '#1e2545', border: '1px solid #2e3856' }}
          >
            <Check size={20} className="text-[#939bb4]" />
          </button>
        </div>

        {/* Right: Undo, Shuffle (active), Settings, Fullscreen */}
        <div className="flex items-center space-x-1 text-[#939bb4]">
          <button onClick={handlePrev} className="p-2 rounded-full hover:bg-[#2e3856] hover:text-white transition-colors" title="Previous">
            <RotateCcw size={18} />
          </button>
          <button
            onClick={() => setShuffleActive(s => !s)}
            className={`p-2 rounded-full transition-colors ${shuffleActive ? 'text-white' : 'hover:bg-[#2e3856] hover:text-white'}`}
            style={shuffleActive ? { background: '#2e3856', border: '2px solid #4255ff' } : {}}
            title="Shuffle"
          >
            <Shuffle size={18} className={shuffleActive ? 'text-white' : ''} />
          </button>
          <button className="p-2 rounded-full hover:bg-[#2e3856] hover:text-white transition-colors" title="Settings">
            <Settings size={18} />
          </button>
          <button className="p-2 rounded-full hover:bg-[#2e3856] hover:text-white transition-colors" title="Fullscreen">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal rule */}
      <div className="border-t" style={{ borderColor: '#2e3856' }} />

      {/* Games section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Play your way to mastery with fun games</h3>

        <div className="flex space-x-4 overflow-x-auto pb-2 relative">
          {/* Match card */}
          <div
            onClick={() => onSwitchMode('match')}
            className="flex-shrink-0 w-48 rounded-2xl overflow-hidden cursor-pointer group transition-all hover:scale-[1.02]"
            style={{ background: '#1e2545', border: '1px solid #2e3856' }}
          >
            <div className="px-3 pt-3 pb-1">
              <h4 className="font-bold text-white text-sm">Match</h4>
            </div>
            <div className="h-28 mx-3 mb-3 rounded-xl overflow-hidden">
              <MatchIllustration />
            </div>
          </div>

          {/* Blocks card */}
          <div
            onClick={() => onSwitchMode('blocks')}
            className="flex-shrink-0 w-48 rounded-2xl overflow-hidden cursor-pointer group transition-all hover:scale-[1.02]"
            style={{ background: '#1e2545', border: '1px solid #2e3856' }}
          >
            <div className="px-3 pt-3 pb-1">
              <h4 className="font-bold text-white text-sm">Blocks</h4>
            </div>
            <div className="h-28 mx-3 mb-3 rounded-xl overflow-hidden">
              <BlocksIllustration />
            </div>
          </div>

          {/* Charms (NEW) card */}
          <div
            onClick={() => onSwitchMode('blast')}
            className="flex-shrink-0 w-48 rounded-2xl overflow-hidden cursor-pointer group transition-all hover:scale-[1.02] relative"
            style={{ background: '#1e2545', border: '1px solid #2e3856' }}
          >
            <div className="px-3 pt-3 pb-1 flex items-center space-x-2">
              <h4 className="font-bold text-white text-sm">Charms</h4>
              <span className="bg-[#4255ff] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">NEW</span>
            </div>
            <div className="h-28 mx-3 mb-3 rounded-xl overflow-hidden">
              <CharmsIllustration />
            </div>
          </div>

          {/* Scroll arrow */}
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#2e3856] hover:bg-[#394569] text-white flex items-center justify-center shadow-lg">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Creator Info */}
      <div className="pt-4 flex items-center space-x-3">
        <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=150&q=80"
            alt="Guide_Bwalya"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs text-[#939bb4]">Created by</p>
          <p className="text-sm font-bold text-white">Guide_Bwalya</p>
          <p className="text-xs text-[#939bb4]">Created 2 years ago</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#939bb4]">Identify the car brand from the logo</p>

      {/* Students also studied */}
      <div className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-white">Students also studied</h3>
        <div className="flex space-x-2 border-b" style={{ borderColor: '#2e3856' }}>
          <button className="pb-3 px-1 text-sm font-bold text-white border-b-2 border-white">Flashcard sets</button>
          <button className="pb-3 px-1 text-sm font-semibold text-[#939bb4] hover:text-white transition-colors">Study guides</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {['2029 Syllabus Focus Items', 'Menu & Pricing', 'Hangar B', 'Car Logos Quiz'].map((title, i) => (
            <div
              key={i}
              className="rounded-xl p-4 cursor-pointer transition-all hover:opacity-90"
              style={{ background: '#1e2545', border: '1px solid #2e3856' }}
            >
              <p className="text-sm font-semibold text-white truncate">{title}</p>
              <p className="text-xs text-[#939bb4] mt-1">Flashcard set</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
