import React, { useState } from 'react';
import { BookOpen, Folder, FileText, CheckSquare, Plus, Search, ChevronRight } from 'lucide-react';
import { srsProgressSets, userFolders } from '../data/mockData';

export default function LibraryView({ onSelectSet, onSelectFolder, onOpenCreateSet }) {
  const [activeTab, setActiveTab] = useState('sets'); // 'sets' | 'folders' | 'guides' | 'tests'
  const [search, setSearch] = useState('');

  const filteredSets = srsProgressSets.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 select-none">
      <div className="flex items-center justify-between pb-4 border-b border-[#2e3856]">
        <div>
          <h1 className="text-2xl font-black text-white">Your library</h1>
          <p className="text-xs text-[#939bb4]">
            Manage your study sets, folders, practice tests, and guides.
          </p>
        </div>

        <button
          onClick={onOpenCreateSet}
          className="bg-[#4255ff] hover:bg-[#3344dd] text-white text-xs font-extrabold px-5 py-2.5 rounded-full transition-all flex items-center space-x-1.5 shadow"
        >
          <Plus size={16} />
          <span>New Set</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-6 border-b border-[#2e3856] text-xs font-extrabold">
        {[
          { id: 'sets', label: `Study sets (${srsProgressSets.length})` },
          { id: 'folders', label: `Folders (${userFolders.length})` },
          { id: 'guides', label: 'Study guides (2)' },
          { id: 'tests', label: 'Practice tests (3)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 transition-colors relative ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-[#939bb4] hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4255ff] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Search Filter */}
      <div className="max-w-md">
        <div className="flex items-center bg-[#2e3856] rounded-xl px-3.5 py-2">
          <Search size={16} className="text-[#939bb4] mr-2" />
          <input
            type="text"
            placeholder="Search your library..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-[#939bb4] outline-none"
          />
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'sets' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredSets.map(set => (
            <div
              key={set.id}
              onClick={() => onSelectSet(set)}
              className="bg-[#2e3856] hover:bg-[#343e62] border border-[#2e3856] rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between group shadow"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#7583ff] uppercase tracking-wider">
                  {set.cards.length} terms • Created by you
                </span>
                <h3 className="text-base font-extrabold text-white group-hover:text-[#7583ff] transition-colors leading-snug">
                  {set.title}
                </h3>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-[#939bb4] pt-3 border-t border-[#1a1d36]">
                <span>{set.subtitle}</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform text-[#4255ff]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'folders' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {userFolders.map(folder => (
            <div
              key={folder.id}
              onClick={() => onSelectFolder(folder)}
              className="bg-[#2e3856] hover:bg-[#343e62] border border-[#2e3856] rounded-xl p-4 cursor-pointer transition-all flex items-center space-x-3 group"
            >
              <div className="p-2.5 rounded-lg bg-[#1a1d36] text-[#7583ff]">
                <Folder size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white group-hover:text-[#7583ff] transition-colors truncate">
                  {folder.name}
                </h4>
                <p className="text-[10px] text-[#939bb4]">
                  {folder.count} items
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
