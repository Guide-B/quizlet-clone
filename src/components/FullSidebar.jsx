import React from 'react';
import {
  Home, BookOpen, Users, Bell, Layers, Headphones, FileText,
  Gamepad2, CheckSquare, BookMarked, Folder, ChevronDown, Plus
} from 'lucide-react';

const folders = [
  { id: 'f1', name: 'Chinese Phrasebook' },
  { id: 'f2', name: 'Practice Tests' },
  { id: 'f3', name: 'Textbooks' },
];

export default function FullSidebar({ activeRoute, onSelectRoute, onOpenCreateFolder }) {
  return (
    <aside
      className="w-[220px] flex-shrink-0 bg-[#0a092d] flex flex-col h-full overflow-y-auto select-none"
      style={{ borderRight: '1px solid #1a1d36' }}
    >
      {/* Top nav items */}
      <div className="pt-3 pb-2 px-3 flex flex-col space-y-0.5">
        <NavItem
          id="home"
          icon={Home}
          label="Home"
          active={activeRoute === 'home'}
          onClick={() => onSelectRoute('home')}
        />
        <NavItem
          id="library"
          icon={BookOpen}
          label="Your library"
          active={activeRoute === 'library'}
          onClick={() => onSelectRoute('library')}
        />
        <NavItem
          id="study_groups"
          icon={Users}
          label="Study groups"
          active={activeRoute === 'study_groups'}
          onClick={() => onSelectRoute('study_groups')}
        />
        <NavItem
          id="notifications"
          icon={Bell}
          label="Notifications"
          active={activeRoute === 'notifications'}
          onClick={() => onSelectRoute('notifications')}
          badge="7"
        />
      </div>

      {/* Divider */}
      <div className="mx-4 my-2 border-t border-[#2e3856]" />

      {/* Start here */}
      <div className="px-4 pt-1 pb-1">
        <span className="text-xs font-bold text-[#586380] uppercase tracking-wider">Start here</span>
      </div>
      <div className="px-3 flex flex-col space-y-0.5 pb-2">
        <NavItem
          id="flashcards"
          icon={Layers}
          label="Flashcards"
          active={activeRoute === 'flashcards'}
          onClick={() => onSelectRoute('flashcards')}
        />
        <NavItem
          id="podcasts"
          icon={Headphones}
          label="Podcasts"
          active={activeRoute === 'podcasts'}
          onClick={() => onSelectRoute('podcasts')}
          badge="Beta"
          badgeStyle="pill"
        />
        <NavItem
          id="study_guides"
          icon={FileText}
          label="Study Guides"
          active={activeRoute === 'study_guides'}
          onClick={() => onSelectRoute('study_guides')}
        />
        <NavItem
          id="games"
          icon={Gamepad2}
          label="Games"
          active={activeRoute === 'games'}
          onClick={() => onSelectRoute('games')}
        />
        <NavItem
          id="practice"
          icon={CheckSquare}
          label="Practice Tests"
          active={activeRoute === 'practice'}
          onClick={() => onSelectRoute('practice')}
        />
        <NavItem
          id="expert"
          icon={BookMarked}
          label="Expert Solutions"
          active={activeRoute === 'expert'}
          onClick={() => onSelectRoute('expert')}
        />
      </div>

      {/* Divider */}
      <div className="mx-4 my-2 border-t border-[#2e3856]" />

      {/* Your folders */}
      <div className="px-3 pb-4">
        <div className="flex items-center justify-between px-2 py-1 mb-1">
          <span className="text-sm font-bold text-[#f6f7fb]">Your folders</span>
          <button
            onClick={onOpenCreateFolder}
            className="text-[#939bb4] hover:text-white transition-colors p-0.5 rounded"
          >
            <Plus size={16} />
          </button>
        </div>
        {folders.map(f => (
          <button
            key={f.id}
            onClick={() => onSelectRoute(f.id)}
            className={`w-full flex items-center space-x-2.5 px-2 py-2 rounded-lg text-sm transition-colors ${
              activeRoute === f.id
                ? 'bg-[#2e3856] text-white'
                : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]/60'
            }`}
          >
            <Folder size={16} className="flex-shrink-0" />
            <span className="truncate text-left">{f.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function NavItem({ id, icon: Icon, label, active, onClick, badge, badgeStyle }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-2 py-2 rounded-lg text-sm font-semibold transition-colors group ${
        active
          ? 'bg-[#2e3856] text-white'
          : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]/60'
      }`}
    >
      <div className="flex items-center space-x-2.5">
        <Icon size={18} className={active ? 'text-white' : 'text-[#939bb4] group-hover:text-white'} />
        <span>{label}</span>
      </div>
      {badge && badgeStyle === 'pill' && (
        <span className="bg-[#586380] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      {badge && !badgeStyle && (
        <span className="bg-rose-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}
