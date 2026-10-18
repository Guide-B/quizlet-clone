import React, { useState } from 'react';
import { ArrowLeft, CheckSquare, Clock, Send, Award, RotateCcw } from 'lucide-react';
import { practiceQuestions } from '../data/mockData';

export default function PracticeTest({ onBack }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId, optionIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    practiceQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / practiceQuestions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-quizlet-border">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-semibold text-quizlet-textMuted hover:text-white"
        >
          <ArrowLeft size={16} />
          <span>Back to dashboard</span>
        </button>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 text-quizlet-textMuted">
            <Clock size={14} />
            <span>Untimed</span>
          </div>
          <span className="bg-emerald-600/20 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
            {practiceQuestions.length} Questions
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">Data Mining Concepts Practice Test</h1>
        <p className="text-xs text-quizlet-textMuted">
          Test mode replicates exam conditions with multiple-choice questions and instant score review.
        </p>
      </div>

      {submitted && (
        <div className="bg-gradient-to-r from-quizlet-blue/30 via-purple-900/30 to-indigo-900/30 border border-quizlet-blue/50 rounded-2xl p-6 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Award size={20} className="text-amber-400" />
              <span>Test Results: {percentage}%</span>
            </h3>
            <p className="text-xs text-quizlet-textMuted">
              You scored {score} of {practiceQuestions.length} correct.
            </p>
          </div>
          <button
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
            className="bg-white hover:bg-gray-100 text-quizlet-dark text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow"
          >
            Retake Test
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {practiceQuestions.map((q, qIndex) => (
          <div
            key={q.id}
            className="bg-quizlet-surface border border-quizlet-border rounded-xl p-6 space-y-4 shadow"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-quizlet-textPurple">
                Question {qIndex + 1}
              </span>
              {submitted && (
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    answers[q.id] === q.correctAnswer
                      ? 'bg-emerald-900/60 text-emerald-300'
                      : 'bg-rose-900/60 text-rose-300'
                  }`}
                >
                  {answers[q.id] === q.correctAnswer ? 'Correct' : 'Incorrect'}
                </span>
              )}
            </div>

            <p className="text-base font-semibold text-white leading-relaxed">
              {q.question}
            </p>

            <div className="space-y-2">
              {q.options.map((opt, optIndex) => {
                const isSelected = answers[q.id] === optIndex;
                let borderStyle = 'border-quizlet-border hover:border-quizlet-borderLight bg-[#232746]';

                if (submitted) {
                  if (optIndex === q.correctAnswer) {
                    borderStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-200';
                  } else if (isSelected) {
                    borderStyle = 'border-rose-500 bg-rose-950/60 text-rose-200';
                  }
                } else if (isSelected) {
                  borderStyle = 'border-quizlet-blue bg-quizlet-blue/20 text-white';
                }

                return (
                  <button
                    key={optIndex}
                    onClick={() => handleSelect(q.id, optIndex)}
                    disabled={submitted}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs font-medium transition-all ${borderStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted && (
        <div className="flex justify-end pt-4">
          <button
            onClick={() => setSubmitted(true)}
            className="bg-quizlet-blue hover:bg-quizlet-blueHover text-white text-xs font-bold px-8 py-3 rounded-full transition-all shadow-lg flex items-center space-x-2"
          >
            <Send size={14} />
            <span>Submit Test</span>
          </button>
        </div>
      )}
    </div>
  );
}
