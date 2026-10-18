import React, { useState } from 'react';
import { Search, Mic, Plus, Menu, X } from 'lucide-react';

export default function TopNavbar({
  onToggleSidebar,
  onOpenCreateMenu,
  onOpenRecordLecture,
  searchQuery,
  setSearchQuery,
  onOpenProfile
}) {
  return (
    <header className="h-16 bg-[#0a092d] px-4 flex items-center justify-between sticky top-0 z-40 select-none border-b border-[#1a1d36]">
      {/* Left: Hamburger menu + Q+ Logo */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          aria-label="menu"
          className="p-1.5 rounded-lg text-white hover:bg-[#2e3856] transition-colors focus:outline-none"
        >
          <Menu size={24} />
        </button>

        {/* Q+ Logo */}
        <a href="#home" className="flex items-center space-x-0.5 focus:outline-none group">
          <span className="font-black text-2xl tracking-tighter text-white">Q</span>
          <span className="font-extrabold text-[#4255ff] text-xl leading-none -mt-1">+</span>
        </a>
      </div>

      {/* Center Search Input */}
      <div className="flex-1 max-w-xl mx-4 sm:mx-8">
        <div className="relative flex items-center bg-[#2e3856] hover:bg-[#343e62] rounded-lg px-3.5 py-2.5 transition-all focus-within:ring-2 focus-within:ring-[#4255ff] focus-within:bg-[#1a1d36]">
          <Search size={18} className="text-[#939bb4] mr-2.5 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search for study guides"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#f6f7fb] placeholder-[#939bb4] outline-none font-normal"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-[#939bb4] hover:text-white p-0.5">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Right Controls: Record lecture pill, Blue + Button, Lion Avatar */}
      <div className="flex items-center space-x-3">
        {/* Record lecture pill */}
        <button
          onClick={onOpenRecordLecture}
          className="hidden md:flex items-center space-x-2 bg-[#2e3856] hover:bg-[#394569] text-[#f6f7fb] text-xs font-bold px-4 py-2.5 rounded-full transition-all border border-transparent hover:border-[#4255ff]/40"
        >
          <Mic size={14} className="text-[#7583ff]" />
          <span>Record lecture</span>
        </button>

        {/* Blue Circular Plus (+) Button */}
        <button
          onClick={onOpenCreateMenu}
          aria-label="Create"
          className="w-10 h-10 rounded-full bg-[#4255ff] hover:bg-[#3344dd] text-white flex items-center justify-center transition-transform active:scale-95 shadow-lg flex-shrink-0"
          title="Create"
        >
          <Plus size={22} className="stroke-[2.5]" />
        </button>

        {/* Lion Avatar profile icon */}
        <button
          onClick={onOpenProfile}
          aria-label="Settings"
          className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-[#4255ff] transition-all flex-shrink-0 cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=150&q=80"
            alt="Guide"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
