import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { BreathingExercise } from "./components/BreathingExercise";

import { StressBusters } from "./components/StressBusters-tab-cards";
import { MoodTracker } from "./components/MoodTracker";

import { CrisisSupport } from "./components/CrisisSupport";
import { About } from "./components/About";
import { Reminders } from "./components/Reminders";
import { Achievements } from "./components/Achievements";
import { Profile } from "./components/Profile";
import { Appointment } from "./components/Appointment";
import { FloatingChatButton } from "./components/FloatingChatButton";

const themes = {
  "Blue": {
    body: "bg-gradient-to-br from-blue-400 to-green-200",
    content: "bg-gradient-to-br from-blue-50 to-white"
  },
  "Green": {
    body: "bg-gradient-to-br from-green-400 to-yellow-200", 
    content: "bg-gradient-to-br from-green-50 to-green-25"
  },
  "Purple": {
    body: "bg-gradient-to-br from-purple-400 to-pink-300",
    content: "bg-gradient-to-br from-purple-50 to-purple-25"
  }
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>("Blue");
  const [isInitializing, setIsInitializing] = useState(false);
  
  // Get current section from URL
  const getCurrentSection = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path === '/breathing') return 'toolsMenu';
    if (path === '/stress-busters') return 'toolsMenu';
    if (path === '/mood-tracker') return 'moodMenu';
    if (path === '/appointments') return 'appointmentMenu';
    if (path === '/crisis-support') return 'helpMenu';
    if (path === '/about') return 'about';
    if (path === '/reminders') return 'reminders';
    if (path === '/achievements') return 'achievements';
    if (path === '/profile') return 'profile';
    return 'home';
  };
  
  const getCurrentSubsection = () => {
    const path = location.pathname;
    if (path === '/breathing') return 'breathing';
    if (path === '/stress-busters') return 'stress';
    return undefined;
  };

  const handleMenuClick = useCallback(() => {
    setIsNavHidden(!isNavHidden);
  }, [isNavHidden]);

  const handleNavigate = useCallback((section: string, subsection?: string) => {
    // Check if user is in guest mode and trying to access restricted features
    const restrictedSections = ['toolsMenu', 'moodMenu', 'appointmentMenu'];
    if (isGuestMode && !isLoggedIn && restrictedSections.includes(section)) {
      setShowLoginPrompt(true);
      return;
    }
    
    // Navigate to the appropriate URL
    let path = '/';
    if (section === 'toolsMenu') {
      if (subsection === 'breathing') path = '/breathing';
      else if (subsection === 'stress') path = '/stress-busters';
    } else if (section === 'moodMenu') {
      path = '/mood-tracker';
    } else if (section === 'appointmentMenu') {
      path = '/appointments';
    } else if (section === 'helpMenu') {
      path = '/crisis-support';
    } else if (section === 'about') {
      path = '/about';
    }
    
    navigate(path);
    
    // Reset theme when leaving breathing exercise
    if (section !== 'toolsMenu' || subsection !== 'breathing') {
      setCurrentTheme("Blue");
    }
  }, [isGuestMode, isLoggedIn, navigate]);

  const handleHeaderNavigate = useCallback((page: string) => {
    // Check if user is in guest mode and trying to access restricted features
    const restrictedPages = ['profile', 'achievements', 'reminders'];
    if (isGuestMode && !isLoggedIn && restrictedPages.includes(page)) {
      setShowLoginPrompt(true);
      return;
    }
    
    // Navigate to the appropriate URL
    let path = '/';
    if (page === 'profile') path = '/profile';
    else if (page === 'achievements') path = '/achievements';
    else if (page === 'reminders') path = '/reminders';
    
    navigate(path);
    setCurrentTheme("Blue");
  }, [isGuestMode, isLoggedIn, navigate]);

  const handleThemeChange = useCallback((theme: keyof typeof themes) => {
    setCurrentTheme(theme);
  }, []);

  const handleLogin = useCallback((userData: { username: string }) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setIsGuestMode(false);
    setShowLoginPrompt(false);
    
    // Store login state asynchronously without blocking
    setTimeout(() => {
      try {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(userData));
      } catch (error) {
        console.warn('Failed to save login state:', error);
      }
    }, 0);
  }, []);

  const handleSkipLogin = useCallback(() => {
    setIsGuestMode(true);
    setShowLoginPrompt(false);
  }, []);

  const handleLoginPromptClose = useCallback(() => {
    setShowLoginPrompt(false);
  }, []);

  const handleShowLogin = useCallback(() => {
    setIsGuestMode(false);
    setShowLoginPrompt(false);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setIsGuestMode(false);
    setCurrentUser(null);
    setCurrentTheme("Blue");
    navigate('/'); // Navigate to home on logout
    
    // Clear stored login state asynchronously
    setTimeout(() => {
      try {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
      } catch (error) {
        console.warn('Failed to clear login state:', error);
      }
    }, 0);
  }, [navigate]);

  // Calculate main content class
  const getMainContentClass = () => {
    const currentSection = getCurrentSection();
    const currentSubsection = getCurrentSubsection();
    const isBreathing = currentSection === 'toolsMenu' && currentSubsection === 'breathing';
    const isHome = currentSection === 'home';
    
    if (isBreathing) {
      return themes[currentTheme].content;
    } else if (isHome) {
      return 'bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-indigo-50/80';
    } else {
      return 'bg-gradient-to-br from-white/95 via-blue-50/40 to-indigo-50/30 backdrop-blur-sm';
    }
  };

  // Check for existing login state on app start
  useEffect(() => {
    const checkLoginState = () => {
      try {
        const storedLoginState = localStorage.getItem('isLoggedIn');
        const storedUser = localStorage.getItem('currentUser');
        
        if (storedLoginState === 'true' && storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData?.username) {
            setCurrentUser(userData);
            setIsLoggedIn(true);
            setIsGuestMode(false);
          }
        }
      } catch (error) {
        console.warn('Error loading stored login state:', error);
      }
    };

    // Run immediately without delay
    checkLoginState();
  }, []);



  // Apply body class for theme changes
  useEffect(() => {
    const currentSection = getCurrentSection();
    const currentSubsection = getCurrentSubsection();
    let bodyClass = "";
    if (currentSection === 'toolsMenu' && currentSubsection === 'breathing') {
      bodyClass = themes[currentTheme].body;
    } else if (currentSection === 'home') {
      bodyClass = "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50";
    } else {
      bodyClass = "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50";
    }
    
    document.body.className = bodyClass;
  }, [location.pathname, currentTheme, getCurrentSection, getCurrentSubsection]);

  // Prevent background scrolling when modals are open
  useEffect(() => {
    const isModalOpen = (!isLoggedIn && !isGuestMode) || (showLoginPrompt && isGuestMode);
    
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoggedIn, isGuestMode, showLoginPrompt]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Main Application */}
      <div className={`flex-1 transition-all duration-500 ${!isLoggedIn && !isGuestMode ? 'blur-sm brightness-50 pointer-events-none' : ''}`}>
        <Header 
          onMenuClick={handleMenuClick} 
          onNavigate={handleHeaderNavigate}
          currentUser={currentUser}
          onLogout={handleLogout}
          onLogin={handleShowLogin}
          isGuestMode={isGuestMode}
        />
        
        <Navigation 
          isHidden={isNavHidden}
          onNavigate={handleNavigate}
          currentSection={getCurrentSection()}
          currentSubsection={getCurrentSubsection()}
        />

        <main className={`pt-[8vh] min-h-[92vh] p-8 transition-all duration-500 ${
          isNavHidden 
            ? 'w-full ml-0' 
            : 'w-[calc(100vw-22vw)] ml-[22vw]'
        } ${getMainContentClass()}`}>
          <div className="max-w-full overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
              <Route path="/home" element={<HomePage onNavigate={handleNavigate} />} />
              <Route path="/breathing" element={
                <BreathingExercise 
                  onThemeChange={handleThemeChange}
                  currentTheme={currentTheme}
                />
              } />
              <Route path="/stress-busters" element={<StressBusters />} />
              <Route path="/mood-tracker" element={<MoodTracker />} />
              <Route path="/appointments" element={<Appointment />} />
              <Route path="/crisis-support" element={<CrisisSupport />} />
              <Route path="/about" element={<About />} />
              <Route path="/reminders" element={<Reminders />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/profile" element={<Profile />} />
              {/* Catch all route - redirect to home */}
              <Route path="*" element={<HomePage onNavigate={handleNavigate} />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Login Modal Overlay */}
      {!isLoggedIn && !isGuestMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md transform animate-modal-enter">
            <LoginPage onLogin={handleLogin} onSkipLogin={handleSkipLogin} />
          </div>
        </div>
      )}

      {/* Login Prompt Modal for Guest Users */}
      {showLoginPrompt && isGuestMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={handleLoginPromptClose} />
          <div className="relative z-10 w-full max-w-sm transform animate-modal-enter">
            <div className="bg-gradient-to-br from-blue-500/95 via-purple-600/95 to-teal-500/95 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/30">
              <div className="text-center">
                <div className="bg-white/20 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m0-4V9a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Sign In Required</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  Please sign in to access this feature and save your wellness progress.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setIsGuestMode(false);
                      setShowLoginPrompt(false);
                    }}
                    className="w-full bg-white/20 backdrop-blur-sm text-white py-2.5 px-4 rounded-lg font-medium hover:bg-white/30 transition-all duration-300 border border-white/20"
                  >
                    Sign In Now
                  </button>
                  <button
                    onClick={handleLoginPromptClose}
                    className="w-full text-white/80 hover:text-white py-2 px-4 rounded-lg text-sm transition-colors duration-300"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button - Always visible */}
      <FloatingChatButton />
    </div>
  );
}