import React, { useState } from 'react';
import {
  Home, BookOpen, Users, Radio, FileText, Gamepad2, CheckSquare, Sparkles,
  Folder, ChevronDown, ChevronRight, X, Plus, ExternalLink
} from 'lucide-react';
import { navLinks, userFolders } from '../data/mockData';

const iconMap = {
  Home, BookOpen, Users, Radio, FileText, Gamepad2, CheckSquare, Sparkles
};

export default function Sidebar({ isOpen, onClose, activeRoute, onSelectRoute, onOpenCreateFolder }) {
  const [foldersOpen, setFoldersOpen] = useState(true);

  return (
    <>
      {/* Backdrop for mobile drawer */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-16 h-full lg:h-[calc(100vh-64px)] w-64 bg-[#0a092d] border-r border-[#2e3856] z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-3.5 space-y-4 overflow-y-auto flex-1">
          {/* Mobile close button */}
          <div className="flex items-center justify-between pb-2 border-b border-[#2e3856] lg:hidden">
            <span className="font-extrabold text-white text-base">Navigation</span>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#939bb4] hover:text-white hover:bg-[#2e3856]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Primary Navigation Links */}
          <nav className="space-y-1">
            {navLinks.map(link => {
              const Icon = iconMap[link.icon] || Home;
              const isActive = activeRoute === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectRoute(link.id);
                    onClose();
                  }}
                  className={`w-full flex items-center space-x-3.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-[#2e3856] text-white shadow-sm'
                      : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]/60'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-[#4255ff]' : 'text-[#939bb4]'} />
                  <span className="flex-1 flex items-center justify-between">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-[#4255ff] text-white font-extrabold px-1.5 py-0.2 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          <hr className="border-[#2e3856]" />

          {/* Folders Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2 py-1">
              <button
                onClick={() => setFoldersOpen(!foldersOpen)}
                className="flex items-center space-x-1 text-xs font-bold text-[#939bb4] hover:text-white uppercase tracking-wider"
              >
                <span>Folders</span>
                {foldersOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
              <button
                onClick={onOpenCreateFolder}
                className="p-1 rounded-full text-[#939bb4] hover:text-white hover:bg-[#2e3856]"
                title="Create new folder"
              >
                <Plus size={14} />
              </button>
            </div>

            {foldersOpen && (
              <div className="space-y-0.5">
                {userFolders.map(folder => (
                  <button
                    key={folder.id}
                    onClick={() => {
                      onSelectRoute(`folder-${folder.id}`);
                      onClose();
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left truncate ${
                      activeRoute === `folder-${folder.id}`
                        ? 'bg-[#2e3856] text-white'
                        : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]/50'
                    }`}
                    title={folder.name}
                  >
                    <Folder size={15} className="text-[#7583ff] flex-shrink-0" />
                    <span className="truncate flex-1">{folder.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Links & Badge */}
        <div className="p-4 border-t border-[#2e3856] bg-[#0a092d] text-xs text-[#939bb4] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-xs">Quizlet Plus</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>
          <div className="flex space-x-3 text-[11px] text-[#7583ff]">
            <a href="#privacy" className="hover:underline">Privacy</a>
            <span>•</span>
            <a href="#terms" className="hover:underline">Terms</a>
          </div>
        </div>
      </aside>
    </>
  );
}
