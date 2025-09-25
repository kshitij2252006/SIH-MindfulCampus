import { useState, useEffect } from "react";
import { Send, Bot, User, Lightbulb, Heart, Brain, Smile } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'suggestion' | 'normal';
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your wellness companion. I'm here to listen, support, and help you with MindfulCampus resources. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickSuggestions = [
    { text: "I'm feeling anxious", icon: <Brain className="w-4 h-4" /> },
    { text: "I need breathing exercises", icon: <Heart className="w-4 h-4" /> },
    { text: "I'm feeling sad", icon: <Smile className="w-4 h-4" /> },
    { text: "I need motivation", icon: <Lightbulb className="w-4 h-4" /> }
  ];

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Anxiety responses
    if (message.includes('anxious') || message.includes('anxiety') || message.includes('worry') || message.includes('nervous')) {
      const anxietyResponses = [
        "I understand you're feeling anxious. Let's try some grounding techniques. Can you name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste?",
        "Anxiety can be overwhelming. Remember that this feeling is temporary. Try taking slow, deep breaths. Would you like me to guide you through a breathing exercise?",
        "It's completely normal to feel anxious sometimes. You're not alone in this. Have you tried our breathing exercises or stress-busting activities?"
      ];
      return anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
    }

    // Sadness/Depression responses
    if (message.includes('sad') || message.includes('depressed') || message.includes('down') || message.includes('low')) {
      const sadnessResponses = [
        "I'm sorry you're feeling this way. Your feelings are valid, and it's okay to not be okay sometimes. Small steps count - have you done something kind for yourself today?",
        "Feeling sad is a natural human emotion. You're brave for reaching out. Consider journaling about your feelings or talking to someone you trust.",
        "I hear you. When we're feeling low, self-care becomes even more important. Would you like some suggestions for gentle activities that might help?"
      ];
      return sadnessResponses[Math.floor(Math.random() * sadnessResponses.length)];
    }

    // Stress responses
    if (message.includes('stress') || message.includes('overwhelmed') || message.includes('pressure')) {
      const stressResponses = [
        "Stress can feel overwhelming, but you have tools to manage it. Try breaking tasks into smaller, manageable steps. Our stress-busters section has some fun activities that might help!",
        "When stressed, our body needs release. Consider trying our bottle smash game for immediate stress relief, or some breathing exercises for longer-term calm.",
        "Feeling overwhelmed is your mind's way of asking for a break. It's okay to pause, breathe, and take things one step at a time."
      ];
      return stressResponses[Math.floor(Math.random() * stressResponses.length)];
    }

    // Breathing/meditation requests
    if (message.includes('breath') || message.includes('meditat') || message.includes('calm') || message.includes('relax')) {
      const breathingResponses = [
        "Breathing exercises are wonderful for finding calm. Try the 4-7-8 technique: breathe in for 4, hold for 7, out for 8. You can also check our breathing exercises section for guided sessions!",
        "Great choice! Deep breathing activates your body's relaxation response. Would you like me to guide you through a quick session, or would you prefer to use our interactive breathing tool?",
        "Mindful breathing is one of the most powerful tools for mental wellness. Start with just 5 minutes of focused breathing - it can make a real difference."
      ];
      return breathingResponses[Math.floor(Math.random() * breathingResponses.length)];
    }

    // Motivation/encouragement
    if (message.includes('motivat') || message.includes('encourage') || message.includes('support') || message.includes('help')) {
      const motivationResponses = [
        "You've already taken a brave step by reaching out. That shows incredible strength. Every small action towards your wellbeing matters, and you're doing great.",
        "Remember: progress isn't always linear, and that's perfectly okay. You're on a journey of growth, and every step counts, even the small ones.",
        "You have more resilience than you realize. Check out our achievements section to celebrate your progress, or set a small, achievable wellness goal for today."
      ];
      return motivationResponses[Math.floor(Math.random() * motivationResponses.length)];
    }

    // Sleep/tired
    if (message.includes('sleep') || message.includes('tired') || message.includes('insomnia') || message.includes('rest')) {
      const sleepResponses = [
        "Good sleep is crucial for mental health. Try creating a calming bedtime routine: dim lights, avoid screens, and maybe try some gentle breathing exercises before bed.",
        "Sleep troubles can really affect our mood and thinking. Consider keeping a sleep journal in our journaling section to identify patterns that might be affecting your rest.",
        "Rest is not selfish - it's necessary. If you're having trouble sleeping, progressive muscle relaxation or guided meditation might help prepare your body for rest."
      ];
      return sleepResponses[Math.floor(Math.random() * sleepResponses.length)];
    }

    // Gratitude/positive
    if (message.includes('thank') || message.includes('grateful') || message.includes('good') || message.includes('better') || message.includes('happy')) {
      const positiveResponses = [
        "I'm so glad to hear that! Acknowledging the good moments is a powerful practice. Consider writing down three things you're grateful for today in our journaling section.",
        "That's wonderful! Celebrating positive moments, no matter how small, helps build resilience. Keep nurturing those feelings of gratitude and joy.",
        "It's beautiful when we can find light in our days. Your positive attitude is inspiring, and remember - you deserve to feel good!"
      ];
      return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    }

    // Crisis/emergency
    if (message.includes('crisis') || message.includes('emergency') || message.includes('hurt') || message.includes('harm')) {
      return "I'm concerned about your wellbeing. If you're in immediate danger, please contact emergency services (911). For crisis support, please visit our Crisis Support section or contact the National Suicide Prevention Lifeline at 988. You matter, and help is available.";
    }

    // General responses
    const generalResponses = [
      "I'm here to listen and support you. Can you tell me more about what's on your mind?",
      "Thank you for sharing with me. Your feelings and experiences are important. How can I best support you right now?",
      "I appreciate you opening up. Mental wellness is a journey, and you don't have to navigate it alone. What would be most helpful for you today?",
      "Every person's wellness journey is unique. I'm here to help you find what works best for you. Would you like to explore any of our wellness tools together?"
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(messageText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const handleSendMessage = () => {
    sendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white rounded-xl border border-blue-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Wellness Companion</h2>
            <p className="text-blue-100 text-sm">Your supportive AI assistant</p>
          </div>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="p-4 bg-blue-50 border-b border-blue-200">
        <p className="text-sm text-blue-700 mb-2">Quick responses:</p>
        <div className="flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick(suggestion.text)}
              className="text-xs bg-white border-blue-200 hover:bg-blue-100 text-blue-700"
            >
              {suggestion.icon}
              <span className="ml-1">{suggestion.text}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gradient-to-br from-green-400 to-blue-500 text-white'
                }`}>
                  {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className={`text-xs mt-1 opacity-70 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          This is an AI assistant for wellness support. For emergencies, contact 911 or visit Crisis Support.
        </p>
      </div>
    </div>
  );
}