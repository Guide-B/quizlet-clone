import React, { useState, useEffect } from 'react';
import { ArrowLeft, Rocket, Zap, Shield, RotateCcw } from 'lucide-react';

export default function BlastMode({ studySet, onBack }) {
  const [score, setScore] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');

  const cards = studySet.cards || [];
  const currentCard = cards[currentIdx] || cards[0];

  const handleShoot = e => {
    e.preventDefault();
    if (!userInput.trim()) return;

    if (userInput.trim().toLowerCase() === currentCard.term.toLowerCase()) {
      setScore(s => s + 100);
      setMessage('Direct Hit! +100 PTS');
      setUserInput('');
      setTimeout(() => {
        setMessage('');
        setCurrentIdx(i => (i + 1) % cards.length);
      }, 500);
    } else {
      setMessage(`Wrong target! Expected: ${currentCard.term}`);
      setTimeout(() => setMessage(''), 1500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-center select-none">
      <div className="flex items-center justify-between pb-4 border-b border-[#2e3856]">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold text-[#939bb4] hover:text-white"
        >
          <ArrowLeft size={16} />
          <span>Back to set</span>
        </button>

        <div className="flex items-center space-x-3 text-xs font-bold text-white bg-[#2e3856] px-4 py-1.5 rounded-full">
          <Rocket size={14} className="text-[#4255ff]" />
          <span>Score: {score}</span>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#1a1d36] to-[#0a092d] border-2 border-[#4255ff]/50 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2">
          <span className="text-[11px] font-extrabold text-[#7583ff] uppercase tracking-widest bg-[#2e3856] px-3 py-1 rounded-full">
            Blast Asteroid Target
          </span>
          <p className="text-xl sm:text-2xl font-bold text-white pt-2 leading-relaxed">
            "{currentCard.definition}"
          </p>
        </div>

        {message && (
          <div className="text-xs font-bold text-emerald-400 animate-bounce">
            {message}
          </div>
        )}

        <form onSubmit={handleShoot} className="max-w-md mx-auto flex items-center gap-2">
          <input
            type="text"
            autoFocus
            placeholder="Type matching term to blast..."
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            className="flex-1 bg-[#2e3856] border border-[#2e3856] focus:border-[#4255ff] rounded-full px-5 py-3 text-sm text-white outline-none"
          />
          <button
            type="submit"
            className="bg-[#4255ff] hover:bg-[#3344dd] text-white font-black px-6 py-3 rounded-full text-xs transition-transform active:scale-95 shadow flex items-center space-x-1"
          >
            <Zap size={14} />
            <span>Blast</span>
          </button>
        </form>
      </div>
    </div>
  );
}
