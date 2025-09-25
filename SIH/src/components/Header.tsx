import { Menu, Bell, Trophy, Info, User, LogOut, LogIn } from "lucide-react";
import { MindfulCampusLogo } from './MindfulCampusLogo';

interface HeaderProps {
  onMenuClick: () => void;
  onNavigate: (page: string) => void;
  currentUser?: { username: string } | null;
  onLogout?: () => void;
  onLogin?: () => void;
  isGuestMode?: boolean;
}

export function Header({ onMenuClick, onNavigate, currentUser, onLogout, onLogin, isGuestMode }: HeaderProps) {
  const moreMenuItems = [
    { 
      icon: <Info className="w-4 h-4" />, 
      text: "About", 
      onClick: () => onNavigate('about')
    },
    { 
      icon: <Bell className="w-4 h-4" />, 
      text: "Reminders", 
      onClick: () => onNavigate('reminders')
    },
    { 
      icon: <Trophy className="w-4 h-4" />, 
      text: "Achievements", 
      onClick: () => onNavigate('achievements')
    },
    { 
      icon: <User className="w-4 h-4" />, 
      text: "Profile", 
      onClick: () => onNavigate('profile')
    }
  ];

  return (
    <header className="fixed top-0 left-0 h-[8vh] w-full bg-gradient-to-r from-slate-50 to-blue-50 border-b border-blue-200/50 backdrop-blur-sm z-20 flex items-center justify-between px-4 shadow-sm">
      {/* Left side - Menu button */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg bg-white/80 border border-blue-200/50 cursor-pointer hover:bg-blue-50 hover:border-blue-300 flex items-center justify-center transition-all duration-200 shadow-sm"
        >
          <Menu className="w-6 h-6 text-blue-700" />
        </button>
      </div>

      {/* Center - App title */}
      <div className="flex-1 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="relative transform hover:scale-110 transition-transform duration-300">
            <MindfulCampusLogo 
              size={32} 
              className="drop-shadow-lg"
            />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            MindfulCampus
          </h1>
        </div>
      </div>

      {/* Right side - User info and menu items */}
      <div className="flex items-center gap-2">
        {/* User greeting */}
        {currentUser && (
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/40 border border-blue-200/50 rounded-lg">
            <User className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Welcome, {currentUser.username}
            </span>
          </div>
        )}
        
        {/* Guest mode indicator */}
        {isGuestMode && !currentUser && (
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-amber-50/60 border border-amber-200/50 rounded-lg">
            <User className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">
              Browsing as Guest
            </span>
          </div>
        )}
        
        {/* Menu items */}
        <div className="flex items-center gap-1">
          {moreMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 border border-blue-200/50 hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-200"
              title={item.text}
            >
              <span className="text-blue-600">{item.icon}</span>
              <span className="text-sm font-medium text-blue-700 hidden sm:inline">
                {item.text}
              </span>
            </button>
          ))}
          
          {/* Login/Logout button */}
          {currentUser ? (
            onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-200/50 hover:bg-red-100 hover:border-red-300 transition-colors duration-150"
                title="Sign Out"
              >
                <span className="text-red-600"><LogOut className="w-4 h-4" /></span>
                <span className="text-sm font-medium text-red-700 hidden sm:inline">
                  Sign Out
                </span>
              </button>
            )
          ) : (
            onLogin && (
              <button
                onClick={onLogin}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200/50 hover:bg-green-100 hover:border-green-300 transition-colors duration-150"
                title="Sign In"
              >
                <span className="text-green-600"><LogIn className="w-4 h-4" /></span>
                <span className="text-sm font-medium text-green-700 hidden sm:inline">
                  Sign In
                </span>
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}