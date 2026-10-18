import React from 'react';
import {
  Home, Folder, Users, Bell, Layers, Headphones, FileEdit,
  Grid2X2, CheckCheck, BookOpen
} from 'lucide-react';

export default function IconRailSidebar({ activeRoute, onSelectRoute }) {
  const topIcons = [
    { id: 'home', icon: Home, title: 'Home' },
    { id: 'library', icon: Folder, title: 'Your library' },
    { id: 'study_groups', icon: Users, title: 'Study groups' },
    { id: 'notifications', icon: Bell, title: 'Notifications', badge: '7' }
  ];

  const middleIcons = [
    { id: 'flashcards', icon: Layers, title: 'Flashcards' },
    { id: 'audio', icon: Headphones, title: 'Audio & Podcasts' },
    { id: 'notes', icon: FileEdit, title: 'Study Guides' },
    { id: 'games', icon: Grid2X2, title: 'Games' },
    { id: 'practice', icon: CheckCheck, title: 'Practice Tests' },
    { id: 'textbooks', icon: BookOpen, title: 'Expert Solutions' }
  ];

  const folderIcons = [
    { id: 'folder_1', icon: Folder, title: 'Chinese Phrasebook' },
    { id: 'folder_2', icon: Folder, title: 'Operating Systems' },
    { id: 'folder_3', icon: Folder, title: 'Microcomputer Systems' },
    { id: 'folder_4', icon: Folder, title: 'Textbooks' }
  ];

  return (
    <aside className="w-16 bg-[#0a092d] border-r border-[#1a1d36] flex flex-col items-center py-4 space-y-6 select-none flex-shrink-0">
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-4">
        {topIcons.map(item => {
          const Icon = item.icon;
          const isActive = activeRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectRoute(item.id)}
              className={`p-2.5 rounded-xl transition-all relative ${
                isActive
                  ? 'bg-[#2e3856] text-white shadow-sm'
                  : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]/50'
              }`}
              title={item.title}
            >
              <Icon size={20} className={isActive ? 'text-[#4255ff]' : ''} />
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <hr className="w-8 border-[#2e3856]" />

      {/* Middle Section */}
      <div className="flex flex-col items-center space-y-3.5">
        {middleIcons.map(item => {
          const Icon = item.icon;
          const isActive = activeRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectRoute(item.id)}
              className={`p-2.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#2e3856] text-white shadow-sm'
                  : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]/50'
              }`}
              title={item.title}
            >
              <Icon size={20} className={isActive ? 'text-[#4255ff]' : ''} />
            </button>
          );
        })}
      </div>

      <hr className="w-8 border-[#2e3856]" />

      {/* Bottom Folders Section */}
      <div className="flex flex-col items-center space-y-3.5">
        {folderIcons.map(item => {
          const Icon = item.icon;
          const isActive = activeRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectRoute(item.id)}
              className={`p-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#2e3856] text-white'
                  : 'text-[#939bb4] hover:text-white hover:bg-[#2e3856]/50'
              }`}
              title={item.title}
            >
              <Icon size={19} className="stroke-[1.75]" />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
