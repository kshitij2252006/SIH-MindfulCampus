import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface NavigationProps {
  isHidden: boolean;
  onNavigate: (section: string, subsection?: string) => void;
  currentSection: string;
  currentSubsection?: string;
}

export function Navigation({ isHidden, onNavigate, currentSection, currentSubsection }: NavigationProps) {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  // Auto-expand active menu
  useEffect(() => {
    if (currentSection === 'toolsMenu' && !openMenus.includes('toolsMenu')) {
      setOpenMenus(prev => [...prev, 'toolsMenu']);
    }
  }, [currentSection, openMenus]);

  const toggleSubMenu = (menuId: string) => {
    setOpenMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleNavigation = (section: string, subsection?: string) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      onNavigate(section, subsection);
    };
  };

  const isMenuActive = (menuId: string) => {
    switch (menuId) {
      case 'homeMenu':
        return currentSection === 'home';
      case 'toolsMenu':
        return currentSection === 'toolsMenu';
      case 'moodMenu':
        return currentSection === 'moodMenu';
      case 'appointmentMenu':
        return currentSection === 'appointmentMenu';
      case 'helpMenu':
        return currentSection === 'helpMenu';
      default:
        return false;
    }
  };

  const isSubsectionActive = (subsection: string) => {
    return currentSection === 'toolsMenu' && currentSubsection === subsection;
  };

  const menuItems = [
    {
      id: "homeMenu",
      icon: "🏠",
      title: "Home",
      isDirect: true,
      onClick: handleNavigation('home')
    },
    {
      id: "toolsMenu", 
      icon: "🧘",
      title: "Self-Help Tools",
      items: [
        { text: "Breathing exercises", onClick: handleNavigation('toolsMenu', 'breathing'), subsection: 'breathing' },
        { text: "Stress busters", onClick: handleNavigation('toolsMenu', 'stress'), subsection: 'stress' }
      ]
    },
    {
      id: "moodMenu",
      icon: "😊",
      title: "Mood Tracker",
      isDirect: true,
      onClick: handleNavigation('moodMenu')
    },
    {
      id: "appointmentMenu",
      icon: "📅",
      title: "Appointment",
      isDirect: true,
      onClick: handleNavigation('appointmentMenu')
    },
    {
      id: "helpMenu",
      icon: "🚨", 
      title: "Get Help / Crisis Support",
      isDirect: true,
      onClick: handleNavigation('helpMenu'),
      isEmergency: true
    }
  ];

  return (
    <nav className={`fixed top-[8vh] left-0 h-[92vh] bg-white/95 backdrop-blur-md border-r border-blue-200/60 transition-all duration-500 z-10 shadow-lg ${
      isHidden ? 'w-0 overflow-hidden' : 'w-[22vw]'
    }`}>
      {menuItems.map((menu) => (
        <div key={menu.id}>
          {menu.isDirect ? (
            // Direct navigation items (no submenu)
            <div 
              className={`p-4 cursor-pointer border-b border-blue-200/30 hover:bg-blue-100/50 hover:border-blue-300/50 flex items-center transition-all duration-200 ${
                menu.isEmergency ? 'text-red-600 hover:bg-red-50' : 'text-blue-800'
              } ${
                isMenuActive(menu.id) 
                  ? 'bg-blue-100/80 border-blue-400/80 shadow-xl shadow-blue-500/30 ring-2 ring-blue-400/60 backdrop-blur-sm transform scale-[1.02] font-semibold' 
                  : ''
              }`}
              onClick={menu.onClick}
            >
              <span className="font-medium">{menu.icon} {menu.title}</span>
            </div>
          ) : (
            // Menu items with submenus
            <>
              <div 
                className={`p-4 cursor-pointer border-b border-blue-200/30 hover:bg-blue-100/50 hover:border-blue-300/50 flex items-center justify-between transition-all duration-200 ${
                  menu.isEmergency ? 'text-red-600 hover:bg-red-50' : 'text-blue-800'
                } ${
                  isMenuActive(menu.id) 
                    ? 'bg-blue-100/80 border-blue-400/80 shadow-xl shadow-blue-500/30 ring-2 ring-blue-400/60 backdrop-blur-sm transform scale-[1.02] font-semibold' 
                    : ''
                }`}
                onClick={() => toggleSubMenu(menu.id)}
              >
                <span className="font-medium">{menu.icon} {menu.title}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  openMenus.includes(menu.id) ? 'rotate-180' : ''
                } ${menu.isEmergency ? 'text-red-500' : 'text-blue-600'}`} />
              </div>
              <div className={`bg-blue-50/90 backdrop-blur-sm overflow-hidden transition-all duration-400 ${
                openMenus.includes(menu.id) ? 'max-h-[500px]' : 'max-h-0'
              }`}>
                {menu.items && menu.items.map((item, index) => (
                  <p 
                    key={index}
                    className={`py-3 px-8 cursor-pointer hover:bg-blue-100/70 transition-all duration-200 text-blue-700 hover:text-blue-800 font-medium ${
                      isSubsectionActive(item.subsection) 
                        ? 'bg-blue-200/90 text-blue-900 shadow-lg shadow-blue-400/40 ring-2 ring-blue-500/50 backdrop-blur-sm transform translate-x-1 font-semibold border-l-4 border-blue-500' 
                        : ''
                    }`}
                    onClick={item.onClick}
                  >
                    {item.text}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </nav>
  );
}