import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, ArrowRight, Shuffle, Star, Volume2, Maximize2, RotateCcw,
  BookOpen, CheckSquare, Sparkles, Gamepad2, Rocket, Box, Play, Share2, MoreHorizontal
} from 'lucide-react';

export default function FlashcardPlayer({
  studySet,
  onBack,
  studyMode,
  onSwitchMode
}) {
  const [cards, setCards] = useState(studySet.cards || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [starredIds, setStarredIds] = useState(new Set());

  const currentCard = cards[currentIndex] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
  };

  const toggleStar = id => {
    setStarredIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Keyboard shortcut listeners
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Space') {
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header & Back Button */}
      <div className="flex items-center justify-between pb-2 border-b border-[#2e3856]">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold text-[#939bb4] hover:text-white"
        >
          <ArrowLeft size={16} />
          <span>Back to dashboard</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-[#939bb4]">
          <span>Created by</span>
          <strong className="text-white font-bold">Guide_Bwalya</strong>
        </div>
      </div>

      {/* Set Title and Subtitle */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {studySet.title}
        </h1>
        <p className="text-xs text-[#939bb4]">
          {cards.length} terms in set • Spaced Repetition SRS Ready
        </p>
      </div>

      {/* Quizlet Authentic 5-Mode Study Bar (Flashcards | Learn | Test | Match | Blast) */}
      <div className="bg-[#1a1d36] border border-[#2e3856] rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2 shadow-lg">
        {/* Core Modes */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <button
            onClick={() => onSwitchMode('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              studyMode === 'flashcards'
                ? 'bg-[#4255ff] text-white shadow-md'
                : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]'
            }`}
          >
            <BookOpen size={15} />
            <span>Flashcards</span>
          </button>

          <button
            onClick={() => onSwitchMode('learn')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              studyMode === 'learn'
                ? 'bg-[#4255ff] text-white shadow-md'
                : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]'
            }`}
          >
            <Sparkles size={15} />
            <span>Learn</span>
          </button>

          <button
            onClick={() => onSwitchMode('test')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              studyMode === 'test'
                ? 'bg-[#4255ff] text-white shadow-md'
                : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]'
            }`}
          >
            <CheckSquare size={15} />
            <span>Test</span>
          </button>
        </div>

        {/* Learning Games */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <button
            onClick={() => onSwitchMode('match')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              studyMode === 'match'
                ? 'bg-[#4255ff] text-white shadow-md'
                : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]'
            }`}
          >
            <Gamepad2 size={15} />
            <span>Match</span>
          </button>

          <button
            onClick={() => onSwitchMode('match')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              studyMode === 'match'
                ? 'bg-[#4255ff] text-white shadow-md'
                : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]'
            }`}
          >
            <Gamepad2 size={15} />
            <span>Match</span>
          </button>

          <button
            onClick={() => onSwitchMode('blocks')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              studyMode === 'blocks'
                ? 'bg-[#4255ff] text-white shadow-md'
                : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]'
            }`}
          >
            <Box size={15} />
            <span>Blocks</span>
          </button>

          <button
            onClick={() => onSwitchMode('blast')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              studyMode === 'blast'
                ? 'bg-[#4255ff] text-white shadow-md'
                : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]'
            }`}
          >
            <Rocket size={15} />
            <span>Blast</span>
          </button>
        </div>
      </div>

      {/* 3D Flashcard Canvas */}
      <div className="perspective-1000 w-full h-80 sm:h-96">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`w-full h-full relative cursor-pointer transform-style-preserve-3d transition-transform duration-500 rounded-2xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* Front Face (Term) */}
          <div className="absolute inset-0 backface-hidden bg-[#2e3856] border-2 border-[#2e3856] hover:border-[#4255ff]/40 rounded-2xl p-8 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between text-xs text-[#939bb4]">
              <span className="font-bold uppercase tracking-wider text-[11px] text-[#7583ff]">
                Term
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleStar(currentCard.id);
                  }}
                  className="p-1.5 rounded-full hover:bg-[#1a1d36] text-[#939bb4] hover:text-amber-400"
                >
                  <Star size={18} className={starredIds.has(currentCard.id) ? "text-amber-400 fill-amber-400" : ""} />
                </button>
                <button
                  onClick={e => e.stopPropagation()}
                  className="p-1.5 rounded-full hover:bg-[#1a1d36] text-[#939bb4] hover:text-white"
                >
                  <Volume2 size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center text-center px-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                {currentCard.term}
              </h2>
            </div>

            <div className="text-center text-xs text-[#939bb4] font-medium">
              Click anywhere or press Spacebar to flip
            </div>
          </div>

          {/* Back Face (Definition) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#1f2444] border-2 border-[#4255ff]/50 rounded-2xl p-8 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between text-xs text-[#939bb4]">
              <span className="font-bold uppercase tracking-wider text-[11px] text-[#4255ff]">
                Definition
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleStar(currentCard.id);
                  }}
                  className="p-1.5 rounded-full hover:bg-[#1a1d36] text-[#939bb4] hover:text-amber-400"
                >
                  <Star size={18} className={starredIds.has(currentCard.id) ? "text-amber-400 fill-amber-400" : ""} />
                </button>
                <button
                  onClick={e => e.stopPropagation()}
                  className="p-1.5 rounded-full hover:bg-[#1a1d36] text-[#939bb4] hover:text-white"
                >
                  <Volume2 size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center text-center px-6">
              <p className="text-xl sm:text-2xl font-medium text-white leading-relaxed">
                {currentCard.definition}
              </p>
            </div>

            <div className="text-center text-xs text-[#939bb4] font-medium">
              Click anywhere or press Spacebar to flip back
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between px-2 pt-2">
        <button
          onClick={handleShuffle}
          className="p-3 rounded-full bg-[#2e3856] hover:bg-[#394569] text-[#939bb4] hover:text-white transition-colors"
          title="Shuffle cards"
        >
          <Shuffle size={18} />
        </button>

        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-[#2e3856] hover:bg-[#394569] text-white flex items-center justify-center transition-all active:scale-95 shadow"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm font-bold text-white min-w-[70px] text-center">
            {currentIndex + 1} / {cards.length}
          </span>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-[#4255ff] hover:bg-[#3344dd] text-white flex items-center justify-center transition-all shadow-lg active:scale-95"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        <button
          onClick={() => {
            setIsFlipped(false);
            setCurrentIndex(0);
          }}
          className="p-3 rounded-full bg-[#2e3856] hover:bg-[#394569] text-[#939bb4] hover:text-white transition-colors"
          title="Restart set"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Terms list preview below player */}
      <div className="pt-8 space-y-4">
        <h3 className="text-xl font-bold text-white">
          Terms in this set ({cards.length})
        </h3>
        <div className="space-y-3">
          {cards.map((c, i) => (
            <div
              key={c.id || i}
              className="bg-[#2e3856] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-transparent hover:border-[#4255ff]/30 transition-all"
            >
              <span className="font-extrabold text-white text-base sm:w-1/3">
                {c.term}
              </span>
              <span className="text-xs text-[#f6f7fb] sm:w-2/3 leading-relaxed">
                {c.definition}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
