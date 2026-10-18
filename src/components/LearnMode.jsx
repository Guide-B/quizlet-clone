import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, RotateCcw } from 'lucide-react';
import { practiceQuestions } from '../data/mockData';

export default function LearnMode({ studySet, onBack, onSwitchMode }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const question = practiceQuestions[currentIdx];

  const handleSelect = index => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === question.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setCurrentIdx(i => i + 1);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-quizlet-border">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold text-quizlet-textMuted hover:text-white"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-bold text-white bg-quizlet-surface px-3 py-1 rounded-full border border-quizlet-border">
          <Sparkles size={14} className="text-quizlet-blue" />
          <span>Learn Mode (Adaptive Recall)</span>
        </div>
      </div>

      {currentIdx >= practiceQuestions.length ? (
        <div className="bg-quizlet-surface border border-quizlet-border rounded-2xl p-10 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 bg-quizlet-blue/20 text-quizlet-blue rounded-full flex items-center justify-center mx-auto text-2xl font-black">
            🎯
          </div>
          <h2 className="text-2xl font-bold text-white">Round Completed!</h2>
          <p className="text-sm text-quizlet-textMuted">
            You answered <strong className="text-white">{score}</strong> out of <strong className="text-white">{practiceQuestions.length}</strong> questions correctly ({Math.round((score / practiceQuestions.length) * 100)}% mastery).
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="bg-quizlet-blue hover:bg-quizlet-blueHover text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all flex items-center space-x-2"
            >
              <RotateCcw size={14} />
              <span>Practice Again</span>
            </button>
            <button
              onClick={() => onSwitchMode('flashcards')}
              className="bg-quizlet-pill hover:bg-quizlet-pillHover text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all"
            >
              Back to Flashcards
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-quizlet-surface border border-quizlet-border rounded-2xl p-8 space-y-6 shadow-2xl">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center text-xs text-quizlet-textMuted">
            <span>Question {currentIdx + 1} of {practiceQuestions.length}</span>
            <span>Score: {score}</span>
          </div>

          <h3 className="text-xl font-bold text-white leading-snug">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              let optStyle = "bg-[#232746] hover:bg-[#2e345c] text-white border-transparent";
              if (isAnswered) {
                if (idx === question.correctAnswer) {
                  optStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200";
                } else if (idx === selectedOption) {
                  optStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                } else {
                  optStyle = "bg-[#232746]/50 text-gray-500 border-transparent opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between text-sm font-medium ${optStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && idx === question.correctAnswer && (
                    <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 ml-2" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== question.correctAnswer && (
                    <XCircle size={18} className="text-rose-400 flex-shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-quizlet-dark border border-quizlet-border space-y-2 animate-in fade-in">
              <p className="text-xs font-bold text-white">Explanation:</p>
              <p className="text-xs text-quizlet-textMuted leading-relaxed">
                {question.explanation}
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="bg-quizlet-blue hover:bg-quizlet-blueHover text-white text-xs font-bold px-6 py-2 rounded-full transition-all shadow"
                >
                  Next Question →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
