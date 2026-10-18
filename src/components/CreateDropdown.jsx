import React, { useEffect, useRef } from 'react';
import {
  Mic, BookOpen, Radio, FileText, CheckSquare, Folder, Users, Sparkles, ChevronRight
} from 'lucide-react';

export default function CreateDropdown({ isOpen, onClose, onSelectOption }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target) && !e.target.closest('button[aria-label="Create"]')) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const options = [
    { id: 'audio_recording', label: 'Audio recording', icon: Mic, desc: 'Record lecture or upload audio', badge: null },
    { id: 'flashcard_set', label: 'Flashcard set', icon: BookOpen, desc: 'Create study sets from scratch', badge: null },
    { id: 'podcast', label: 'Podcast', icon: Radio, desc: 'Turn notes into audio podcasts', badge: 'Beta' },
    { id: 'study_guide', label: 'Study guide', icon: FileText, desc: 'Transform materials into structured notes', badge: null },
    { id: 'practice_test', label: 'Practice test', icon: CheckSquare, desc: 'Generate simulated exams', badge: null },
    { id: 'folder', label: 'Folder', icon: Folder, desc: 'Organize sets and documents', badge: null },
    { id: 'study_group', label: 'Study group', icon: Users, desc: 'Collaborate with classmates', badge: null },
  ];

  return (
    <div
      ref={ref}
      className="absolute top-14 right-16 sm:right-28 w-72 bg-[#1a1d36] border border-[#2e3856] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 select-none overflow-hidden"
    >
      <div className="px-4 py-2 border-b border-[#2e3856]">
        <span className="text-[11px] font-bold text-[#939bb4] uppercase tracking-wider">
          Create new
        </span>
      </div>

      <div className="py-1">
        {options.map(opt => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => {
                onSelectOption(opt.id);
                onClose();
              }}
              className="w-full px-4 py-2.5 flex items-center space-x-3.5 hover:bg-[#2e3856] transition-colors text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#2e3856] group-hover:bg-[#4255ff] text-[#7583ff] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-white group-hover:text-[#f6f7fb]">
                    {opt.label}
                  </span>
                  {opt.badge && (
                    <span className="text-[9px] bg-[#4255ff] text-white font-extrabold px-1.5 py-0.2 rounded-full">
                      {opt.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#939bb4] truncate">
                  {opt.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
