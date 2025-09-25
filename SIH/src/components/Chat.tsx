import { useState } from "react";
import { Send, Heart, MessageCircle, Users, Shield, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface ChatMessage {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  hearts: number;
  replies: number;
  isAnonymous: boolean;
}

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  lastActive: string;
  category: string;
}

export function Chat() {
  const [currentView, setCurrentView] = useState<'peer' | 'anonymous'>('peer');
  const [newMessage, setNewMessage] = useState('');

  const supportGroups: SupportGroup[] = [
    {
      id: '1',
      name: 'Daily Check-ins',
      description: 'Share how your day went and support others in their journey',
      members: 234,
      lastActive: '2 min ago',
      category: 'general'
    },
    {
      id: '2',
      name: 'Anxiety Support Circle',
      description: 'A safe space to discuss anxiety and coping strategies',
      members: 189,
      lastActive: '15 min ago',
      category: 'anxiety'
    },
    {
      id: '3',
      name: 'Mindfulness & Meditation',
      description: 'Share meditation experiences and mindfulness tips',
      members: 156,
      lastActive: '1 hour ago',
      category: 'mindfulness'
    },
    {
      id: '4',
      name: 'Work-Life Balance',
      description: 'Managing stress and finding balance in professional life',
      members: 98,
      lastActive: '3 hours ago',
      category: 'work'
    }
  ];

  const recentMessages: ChatMessage[] = [
    {
      id: '1',
      author: 'Alex M.',
      content: 'Had my first panic attack-free week in months! The breathing exercises from this app really helped. Thank you to everyone for the encouragement 💙',
      timestamp: '5 min ago',
      hearts: 12,
      replies: 4,
      isAnonymous: false
    },
    {
      id: '2', 
      author: 'Anonymous',
      content: 'Struggling with work anxiety today. Anyone have tips for dealing with presentation nerves?',
      timestamp: '12 min ago',
      hearts: 8,
      replies: 7,
      isAnonymous: true
    },
    {
      id: '3',
      author: 'Jordan K.',
      content: 'Completed my 30-day meditation streak today! Started with just 2 minutes and now doing 15. Progress feels good 🧘‍♀️',
      timestamp: '1 hour ago',
      hearts: 23,
      replies: 8,
      isAnonymous: false
    },
    {
      id: '4',
      author: 'Sam R.',
      content: 'Reminder that healing isn\'t linear. Having a rough patch but I know it will pass. Sending love to anyone else struggling today ❤️',
      timestamp: '2 hours ago',
      hearts: 31,
      replies: 12,
      isAnonymous: false
    }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Community Support</h1>
        <p className="text-gray-600">Connect with others on similar journeys and share encouragement</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setCurrentView('peer')}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
              currentView === 'peer' 
                ? 'bg-white shadow-sm font-medium' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Peer Support
          </button>
          <button
            onClick={() => setCurrentView('anonymous')}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
              currentView === 'anonymous' 
                ? 'bg-white shadow-sm font-medium' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            Anonymous Sharing
          </button>
        </div>
      </div>

      {/* Community Guidelines */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Community Guidelines</h3>
            <p className="text-sm text-blue-700">
              This is a safe space for support and encouragement. Be kind, respectful, and remember that everyone is on their own unique journey. 
              No medical advice - always consult professionals for serious concerns.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chat Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Message Composer */}
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-900">
                  {currentView === 'peer' ? 'Share with the community' : 'Share anonymously'}
                </span>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder={currentView === 'peer' 
                    ? "Share your thoughts, victories, or ask for support..." 
                    : "Share anonymously - no username will be shown..."
                  }
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              {currentView === 'anonymous' && (
                <p className="text-xs text-gray-500">
                  🔒 Your identity is completely protected in anonymous mode
                </p>
              )}
            </div>
          </Card>

          {/* Messages */}
          <div className="space-y-4">
            {recentMessages
              .filter(msg => currentView === 'anonymous' ? msg.isAnonymous : !msg.isAnonymous)
              .map((message) => (
                <Card key={message.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {message.isAnonymous ? 'Anonymous' : message.author}
                        </span>
                        {message.isAnonymous && (
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            Anonymous
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{message.timestamp}</span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{message.content}</p>
                    
                    <div className="flex items-center gap-4 pt-2">
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors">
                        <Heart className="w-4 h-4" />
                        {message.hearts}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        {message.replies} replies
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Support Groups */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Support Groups</h3>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Join
              </Button>
            </div>
            <div className="space-y-3">
              {supportGroups.map((group) => (
                <div key={group.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm text-gray-900">{group.name}</h4>
                    <span className="text-xs text-gray-500">{group.members}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{group.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {group.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{group.lastActive}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Online Now */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Community Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Online now</span>
                <span className="text-sm font-medium text-green-600">47 people</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Messages today</span>
                <span className="text-sm font-medium">128</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Support given</span>
                <span className="text-sm font-medium text-blue-600">234 ❤️</span>
              </div>
            </div>
          </Card>

          {/* Crisis Support */}
          <Card className="p-4 bg-red-50 border-red-200">
            <h3 className="font-semibold text-red-900 mb-2">Need Immediate Help?</h3>
            <p className="text-sm text-red-700 mb-3">
              If you're in crisis, please reach out to a mental health professional or crisis hotline immediately.
            </p>
            <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
              Get Crisis Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}