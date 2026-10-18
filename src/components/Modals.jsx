import React, { useState } from 'react';
import { X, Sparkles, Mic, Upload, FileText, Send, ArrowRight } from 'lucide-react';

export function AskQuizletModal({ isOpen, onClose }) {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'quizlet', text: 'Hi Guide! What would you like to study or clarify today? Ask me any question, paste lecture notes, or request a summary.' }
  ]);

  if (!isOpen) return null;

  const handleSend = e => {
    e.preventDefault();
    if (!prompt.trim()) return;
    const userMsg = prompt;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setPrompt('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'quizlet',
          text: `Great question regarding "${userMsg.slice(0, 30)}..."! In summary: this concept centers on structured active recall and systematic validation. Would you like me to generate 5 flashcard terms for this?`
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-quizlet-surface border border-quizlet-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px]">
        {/* Header */}
        <div className="p-4 border-b border-quizlet-border flex items-center justify-between bg-quizlet-dark">
          <div className="flex items-center space-x-2">
            <Sparkles size={18} className="text-quizlet-blue fill-quizlet-blue" />
            <h3 className="text-sm font-bold text-white">Ask Quizlet AI</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-quizlet-textMuted hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-quizlet-blue text-white ml-auto rounded-tr-none'
                  : 'bg-[#232746] text-quizlet-text mr-auto rounded-tl-none border border-quizlet-border'
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Prompt Input */}
        <form onSubmit={handleSend} className="p-3 border-t border-quizlet-border bg-quizlet-dark flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask anything about your coursework..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="flex-1 bg-quizlet-surface border border-quizlet-border rounded-full px-4 py-2 text-xs text-white placeholder-quizlet-textMuted outline-none focus:border-quizlet-blue"
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-full bg-quizlet-blue hover:bg-quizlet-blueHover text-white flex items-center justify-center transition-colors flex-shrink-0"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}

export function RecordLectureModal({ isOpen, onClose }) {
  const [isRecording, setIsRecording] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-quizlet-surface border border-quizlet-border w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-6 text-center">
        <div className="flex justify-between items-center pb-2 border-b border-quizlet-border">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Mic size={16} className="text-quizlet-textPurple" />
            <span>Record Lecture / Audio</span>
          </h3>
          <button onClick={onClose} className="text-quizlet-textMuted hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="py-6 space-y-4">
          <div
            onClick={() => setIsRecording(!isRecording)}
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center cursor-pointer transition-all ${
              isRecording
                ? 'bg-rose-600 animate-pulse ring-8 ring-rose-500/30'
                : 'bg-quizlet-pill hover:bg-quizlet-pillHover border border-quizlet-border'
            }`}
          >
            <Mic size={32} className="text-white" />
          </div>

          <p className="text-xs text-quizlet-textMuted max-w-xs mx-auto">
            {isRecording
              ? "Recording in progress... Click again to finish and generate flashcards."
              : "Capture audio from live class lectures or audio files to transcribe and generate study sets automatically."}
          </p>
        </div>

        <div className="border-t border-dashed border-quizlet-border pt-4">
          <label className="cursor-pointer block p-4 rounded-xl border border-quizlet-border hover:bg-quizlet-surfaceHover text-xs text-quizlet-textMuted">
            <Upload size={18} className="mx-auto mb-1 text-quizlet-blue" />
            <span>Or drag and drop audio/video file (MP3, WAV, M4A)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
