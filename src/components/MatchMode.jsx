import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, RotateCcw, Trophy } from 'lucide-react';

export default function MatchMode({ studySet, onBack }) {
  const [tiles, setTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState(new Set());
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  // Initialize randomized tiles
  useEffect(() => {
    const rawCards = (studySet.cards || []).slice(0, 6);
    const tileList = [];
    rawCards.forEach((c, idx) => {
      tileList.push({ id: `term-${idx}`, pairId: idx, text: c.term, type: 'term' });
      tileList.push({ id: `def-${idx}`, pairId: idx, text: c.definition, type: 'definition' });
    });
    setTiles(tileList.sort(() => Math.random() - 0.5));
    setMatchedPairs(new Set());
    setTime(0);
    setTimerRunning(true);
  }, [studySet]);

  // Timer
  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => setTime(t => t + 0.1), 100);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleTileClick = tile => {
    if (matchedPairs.has(tile.pairId)) return;
    if (!selectedTile) {
      setSelectedTile(tile);
    } else {
      if (selectedTile.id === tile.id) {
        setSelectedTile(null);
      } else if (selectedTile.pairId === tile.pairId && selectedTile.type !== tile.type) {
        // Matched!
        const nextMatched = new Set(matchedPairs);
        nextMatched.add(tile.pairId);
        setMatchedPairs(nextMatched);
        setSelectedTile(null);
        if (nextMatched.size === (studySet.cards || []).slice(0, 6).length) {
          setTimerRunning(false);
        }
      } else {
        // Mismatched
        setSelectedTile(tile);
      }
    }
  };

  const isComplete = matchedPairs.size > 0 && matchedPairs.size === (studySet.cards || []).slice(0, 6).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none">
      <div className="flex items-center justify-between pb-4 border-b border-[#2e3856]">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold text-[#939bb4] hover:text-white"
        >
          <ArrowLeft size={16} />
          <span>Back to set</span>
        </button>

        <div className="flex items-center space-x-2 bg-[#2e3856] px-4 py-1.5 rounded-full text-white font-bold text-xs">
          <Clock size={14} className="text-[#7583ff]" />
          <span>{time.toFixed(1)}s</span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-2xl font-black text-white">Match Mode</h2>
        <p className="text-xs text-[#939bb4]">
          Drag or click matching tiles to clear them as fast as you can!
        </p>
      </div>

      {isComplete ? (
        <div className="bg-[#1a1d36] border border-[#4255ff] rounded-2xl p-10 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
          <Trophy size={48} className="text-amber-400 mx-auto" />
          <h3 className="text-2xl font-extrabold text-white">Awesome work!</h3>
          <p className="text-sm text-[#939bb4]">
            You cleared all tiles in <strong className="text-white font-bold">{time.toFixed(1)} seconds</strong>!
          </p>
          <button
            onClick={() => {
              const rawCards = (studySet.cards || []).slice(0, 6);
              const tileList = [];
              rawCards.forEach((c, idx) => {
                tileList.push({ id: `term-${idx}`, pairId: idx, text: c.term, type: 'term' });
                tileList.push({ id: `def-${idx}`, pairId: idx, text: c.definition, type: 'definition' });
              });
              setTiles(tileList.sort(() => Math.random() - 0.5));
              setMatchedPairs(new Set());
              setTime(0);
              setTimerRunning(true);
            }}
            className="bg-[#4255ff] hover:bg-[#3344dd] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {tiles.map(tile => {
            const isMatched = matchedPairs.has(tile.pairId);
            const isSelected = selectedTile && selectedTile.id === tile.id;

            if (isMatched) {
              return (
                <div
                  key={tile.id}
                  className="h-28 rounded-xl border border-transparent opacity-0 transition-opacity pointer-events-none"
                />
              );
            }

            return (
              <div
                key={tile.id}
                onClick={() => handleTileClick(tile)}
                className={`h-28 rounded-xl p-3 border-2 flex items-center justify-center text-center text-xs font-medium cursor-pointer transition-all duration-150 shadow-md ${
                  isSelected
                    ? 'border-[#4255ff] bg-[#4255ff]/20 text-white ring-2 ring-[#4255ff]'
                    : 'border-[#2e3856] bg-[#2e3856] hover:bg-[#343e62] text-[#f6f7fb]'
                }`}
              >
                <span className="line-clamp-4 leading-snug">{tile.text}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
