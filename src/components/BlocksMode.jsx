import React, { useState, useEffect } from 'react';
import { ArrowLeft, Box, RotateCcw, Zap, Trophy } from 'lucide-react';

export default function BlocksMode({ studySet, onBack }) {
  const cards = studySet.cards || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [combo, setCombo] = useState(1);

  const currentCard = cards[currentIdx] || cards[0];

  useEffect(() => {
    // Generate scrambled block options for the current term
    const wrongTerms = cards.filter((_, i) => i !== currentIdx).map(c => c.term);
    const options = [currentCard.term, ...wrongTerms.slice(0, 3)].sort(() => Math.random() - 0.5);
    setBlocks(options.map((t, idx) => ({ id: idx, text: t, isCorrect: t === currentCard.term })));
  }, [currentIdx, studySet]);

  const handleSelectBlock = block => {
    if (block.isCorrect) {
      setScore(s => s + 50 * combo);
      setCombo(c => c + 1);
      setTimeout(() => {
        setCurrentIdx(i => (i + 1) % cards.length);
      }, 300);
    } else {
      setCombo(1);
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
          <Box size={14} className="text-[#4255ff]" />
          <span>Score: {score} • {combo}x Combo</span>
        </div>
      </div>

      <div className="bg-[#1a1d36] border border-[#2e3856] rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold text-[#7583ff] uppercase tracking-widest bg-[#2e3856] px-3 py-1 rounded-full">
            Blocks Challenge
          </span>
          <p className="text-xl font-bold text-white pt-2 leading-relaxed">
            "{currentCard.definition}"
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4">
          {blocks.map(b => (
            <button
              key={b.id}
              onClick={() => handleSelectBlock(b)}
              className="p-5 rounded-2xl bg-[#2e3856] hover:bg-[#4255ff] text-white font-extrabold text-sm transition-all transform active:scale-95 shadow-lg border border-[#2e3856] hover:border-white/30"
            >
              {b.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
