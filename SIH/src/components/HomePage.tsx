import { useState, useEffect } from "react";
import { Calendar, Heart, MessageCircle, BookOpen, Sparkles, Phone } from "lucide-react";
import { QuoteRotator } from "./QuoteRotator";

interface HomePageProps {
  onNavigate: (section: string, subsection?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  // Peaceful background images for rotation
  const peacefulBackgrounds = [
    "https://images.unsplash.com/photo-1694181918496-8052c5a97294?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG1vdW50YWluJTIwbGFrZSUyMG1lZGl0YXRpb24lMjBjYWxtfGVufDF8fHx8MTc1NzQzMDYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1619741812015-5d2e803d5d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJlbmUlMjBmb3Jlc3QlMjBwYXRoJTIwbWluZGZ1bG5lc3MlMjBuYXR1cmV8ZW58MXx8fHwxNzU3NDMwNjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1610112836912-12d9b160c333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFucXVpbCUyMGJlYWNoJTIwc3Vuc2V0JTIwcGVhY2VmdWwlMjB3YXZlc3xlbnwxfHx8fDE3NTc0MzA2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1713026960725-8c71b5e6b2e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBnYXJkZW4lMjBtZWRpdGF0aW9uJTIwc3RvbmVzJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzU3NDMwNjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1687627239765-c156c2f38d19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwbWVhZG93JTIwZmxvd2VycyUyMHN0cmVzcyUyMHJlbGllZiUyMG5hdHVyZXxlbnwxfHx8fDE3NTc0MzA2MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Rotate background images every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBackgroundIndex((prev) => (prev + 1) % peacefulBackgrounds.length);
        setIsTransitioning(false);
      }, 1000); // 1 second transition
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [peacefulBackgrounds.length]);

  const quickActions = [
    {
      title: "Start Breathing Exercise",
      description: "Find calm with guided breathing patterns",
      icon: <Heart className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-50 hover:bg-blue-100",
      onClick: () => onNavigate('toolsMenu', 'breathing')
    },
    {
      title: "Log Your Mood",
      description: "Track how you're feeling today",
      icon: <Calendar className="w-8 h-8 text-green-600" />,
      color: "bg-green-50 hover:bg-green-100",
      onClick: () => onNavigate('moodMenu', 'daily')
    },
    {
      title: "Get Support",
      description: "Connect with peer support or crisis help",
      icon: <MessageCircle className="w-8 h-8 text-purple-600" />,
      color: "bg-purple-50 hover:bg-purple-100",
      onClick: () => onNavigate('chatMenu', 'peer')
    },
    {
      title: "Explore Resources",
      description: "Read helpful articles and watch videos",
      icon: <BookOpen className="w-8 h-8 text-orange-600" />,
      color: "bg-orange-50 hover:bg-orange-100",
      onClick: () => onNavigate('resourcesMenu', 'articles')
    }
  ];


  const stats = [
    { label: "Days Active", value: "1", subtitle: "Keep going!" },
    { label: "Exercises Completed", value: "0", subtitle: "Great progress" },
    { label: "Mood Entries", value: "0", subtitle: "This week" },
    { label: "Achievements", value: "0", subtitle: "Unlocked" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section with Rotating Background Images */}
      <div 
        className={`relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 min-h-[60vh] flex flex-col justify-center transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-75' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.3)), url('${peacefulBackgrounds[currentBackgroundIndex]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center space-y-6 px-8 py-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to Your MindfulCampus Journey
          </h1>
          
          {/* Quote Rotator with enhanced styling */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-[0px] mx-[120px] my-[33px]">
              <QuoteRotator />
            </div>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-blue-300/15 rounded-full blur-lg"></div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <div
            key={index}
            onClick={action.onClick}
            className={`p-6 rounded-xl border cursor-pointer transition-all duration-200 ${action.color}`}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              {action.icon}
              <h3 className="font-semibold text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">Your Progress</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-sm font-medium text-gray-700">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.subtitle}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Focus */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          Today's Focus
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900">Mindful Morning</h3>
            <p className="text-sm text-blue-700 mt-1">Start your day with 5 minutes of box breathing to center yourself.</p>
            <button 
              onClick={() => onNavigate('toolsMenu', 'breathing')}
              className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Try Now →
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Support */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-red-600 mt-1" />
          <div>
            <h3 className="font-semibold text-red-900">Need Immediate Support?</h3>
            <p className="text-sm text-red-700 mt-1">
              If you're experiencing a mental health crisis, help is available 24/7.
            </p>
            <button 
              onClick={() => onNavigate('helpMenu', 'helpline')}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Get Help Now
            </button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="font-semibold text-green-900 mb-3">💡 Daily Wellness Tip</h3>
          <p className="text-sm text-green-700">
            Practice the 5-4-3-2-1 grounding technique: Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.
          </p>
        </div>
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="font-semibold text-purple-900 mb-3">🎯 Weekly Challenge</h3>
          <p className="text-sm text-purple-700">
            Complete 7 mood check-ins this week to unlock the "Mindful Week" achievement and track your emotional patterns.
          </p>
        </div>
      </div>
    </div>
  );
}