import React, { useState } from 'react';
import TopNavbar from './components/TopNavbar';
import FullSidebar from './components/FullSidebar';
import IconRailSidebar from './components/IconRailSidebar';
import StudySetExactView from './components/StudySetExactView';
import LearnMode from './components/LearnMode';
import PracticeTest from './components/PracticeTest';
import MatchMode from './components/MatchMode';
import BlocksMode from './components/BlocksMode';
import BlastMode from './components/BlastMode';
import CreateDropdown from './components/CreateDropdown';
import LibraryView from './components/LibraryView';
import HomeFeed from './components/HomeFeed';
import { AskQuizletModal, RecordLectureModal } from './components/Modals';
import { srsProgressSets } from './data/mockData';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('home');
  const [activeStudySet, setActiveStudySet] = useState(null);
  const [studyMode, setStudyMode] = useState('flashcards');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAskQuizletOpen, setIsAskQuizletOpen] = useState(false);
  const [isRecordLectureOpen, setIsRecordLectureOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showToast = message => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Navigate to a study set (from home feed JBI, Recents, etc.)
  const openStudySet = set => {
    setActiveStudySet(set || srsProgressSets[0]);
    setStudyMode('flashcards');
    setActiveRoute('set');
  };

  const handleSidebarRoute = route => {
    if (route === 'home') {
      setActiveRoute('home');
      setActiveStudySet(null);
    } else if (route === 'library') {
      setActiveRoute('library');
    } else if (route === 'flashcards') {
      setActiveStudySet(srsProgressSets[0]);
      setStudyMode('flashcards');
      setActiveRoute('set');
    } else if (route === 'practice') {
      setActiveStudySet(srsProgressSets[0]);
      setStudyMode('test');
      setActiveRoute('set');
    } else if (route === 'games') {
      setActiveStudySet(srsProgressSets[0]);
      setStudyMode('match');
      setActiveRoute('set');
    } else {
      setActiveRoute(route);
    }
  };

  const handleCreateOption = optionId => {
    setCreateMenuOpen(false);
    switch (optionId) {
      case 'audio_recording':
        setIsRecordLectureOpen(true);
        break;
      case 'flashcard_set':
        setActiveStudySet(srsProgressSets[0]);
        setStudyMode('flashcards');
        setActiveRoute('set');
        showToast('Created new Flashcard set!');
        break;
      case 'podcast':
        showToast('Generated new Podcast!');
        break;
      case 'study_guide':
        showToast('Created new Study Guide!');
        break;
      case 'practice_test':
        setActiveStudySet(srsProgressSets[0]);
        setStudyMode('test');
        setActiveRoute('set');
        showToast('Started Practice Test!');
        break;
      case 'folder':
        showToast('Created new Folder!');
        break;
      case 'study_group':
        showToast('Invite link created for Study Group!');
        break;
      default:
        break;
    }
  };

  // Determine which view to show
  const renderMain = () => {
    if (activeRoute === 'home') {
      return (
        <HomeFeed onSelectSet={openStudySet} />
      );
    }
    if (activeRoute === 'library') {
      return (
        <LibraryView
          onSelectSet={set => openStudySet(set)}
          onSelectFolder={f => showToast(`Opened ${f.name}`)}
          onOpenCreateSet={() => handleCreateOption('flashcard_set')}
        />
      );
    }
    // Study set & game modes
    if (studyMode === 'learn') {
      return (
        <LearnMode
          studySet={activeStudySet}
          onBack={() => setStudyMode('flashcards')}
          onSwitchMode={mode => setStudyMode(mode)}
        />
      );
    }
    if (studyMode === 'test') {
      return (
        <PracticeTest onBack={() => setStudyMode('flashcards')} />
      );
    }
    if (studyMode === 'match') {
      return (
        <MatchMode
          studySet={activeStudySet}
          onBack={() => setStudyMode('flashcards')}
        />
      );
    }
    if (studyMode === 'blocks') {
      return (
        <BlocksMode
          studySet={activeStudySet}
          onBack={() => setStudyMode('flashcards')}
        />
      );
    }
    if (studyMode === 'blast') {
      return (
        <BlastMode
          studySet={activeStudySet}
          onBack={() => setStudyMode('flashcards')}
        />
      );
    }
    // Default: flashcard view (set page)
    return (
      <StudySetExactView
        studySet={activeStudySet || srsProgressSets[0]}
        onSwitchMode={mode => setStudyMode(mode)}
        onOpenAskQuizlet={() => setIsAskQuizletOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#0a092d] text-[#f6f7fb] flex flex-col font-sans selection:bg-[#4255ff] selection:text-white relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2e3856] border border-[#4255ff] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2">
          <CheckCircle2 size={16} className="text-[#4255ff]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <TopNavbar
        onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
        onOpenCreateMenu={() => setCreateMenuOpen(!createMenuOpen)}
        onOpenRecordLecture={() => setIsRecordLectureOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenProfile={() => showToast('Account settings')}
      />

      {/* Create Dropdown */}
      <CreateDropdown
        isOpen={createMenuOpen}
        onClose={() => setCreateMenuOpen(false)}
        onSelectOption={handleCreateOption}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Toggleable Sidebar: collapses to Icon-Rail like on Quizlet */}
        {isSidebarCollapsed ? (
          <IconRailSidebar
            activeRoute={activeRoute}
            onSelectRoute={handleSidebarRoute}
          />
        ) : (
          <FullSidebar
            activeRoute={activeRoute}
            onSelectRoute={handleSidebarRoute}
            onOpenCreateFolder={() => showToast('Created new Folder')}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-8 py-6 relative">
          {renderMain()}

          {/* Floating Ask Quizlet pill */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
            <button
              onClick={() => setIsAskQuizletOpen(true)}
              className="bg-white hover:bg-gray-100 text-[#0a092d] font-black text-xs px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2 border border-white/40 transition-transform active:scale-95"
            >
              <span>Ask Quizlet</span>
              <Sparkles size={16} className="text-[#4255ff] fill-[#4255ff]" />
            </button>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AskQuizletModal isOpen={isAskQuizletOpen} onClose={() => setIsAskQuizletOpen(false)} />
      <RecordLectureModal isOpen={isRecordLectureOpen} onClose={() => setIsRecordLectureOpen(false)} />
    </div>
  );
}
