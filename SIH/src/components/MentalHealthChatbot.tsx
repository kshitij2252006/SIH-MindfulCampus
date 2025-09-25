import { useState, useEffect, useRef } from "react";

// Icon components
const Heart = (props: any) => <span {...props}>💙</span>;
const AlertTriangle = (props: any) => <span {...props}>⚠</span>;
const User = (props: any) => <span {...props}>🙂</span>;
const Send = (props: any) => <span {...props}>➤</span>;
const X = (props: any) => <span {...props}>✕</span>;

// Conversation Database (safe topics)
const conversationDatabase = {
  stress: {
    keywords: ['stressed', 'pressure', 'overwhelmed', 'too much', "can't cope", 'busy', 'tired'],
    initialResponse: "It sounds like you're under a lot of pressure. Would you like to talk about what's making you feel this way?",
    followUp: "How is this stress affecting your daily life? Are you able to take breaks or do something relaxing?",
    solutions: {
      mild: "Try taking a few deep breaths, going for a short walk, or writing down your thoughts. Small steps can help.",
      moderate: "Consider organizing your tasks and taking regular breaks. Talking to a friend or family member may also help.",
      severe: "If stress is affecting your daily life, it might help to talk to a professional or counselor."
    }
  },
  motivation: {
    keywords: ['motivation', 'lazy', "can't start", 'procrastinate', 'no energy'],
    initialResponse: "It's normal to feel unmotivated sometimes. Is there something specific you want to work on?",
    followUp: "What usually helps you get started when you feel this way?",
    solutions: {
      mild: "Try breaking tasks into smaller steps and celebrate small wins.",
      moderate: "Setting a simple routine and rewarding yourself can help build momentum.",
      severe: "If this feeling lasts a long time, consider reaching out for support or changing your environment."
    }
  },
  relationships: {
    keywords: ['friend', 'family', 'relationship', 'argument', 'misunderstanding'],
    initialResponse: "Relationships can be challenging. Would you like to share more about what's going on?",
    followUp: "How do you usually handle situations like this?",
    solutions: {
      mild: "Open and honest communication can help. Try to listen and express your feelings calmly.",
      moderate: "Taking a short break and revisiting the conversation later can be helpful.",
      severe: "If things feel stuck, consider seeking advice from someone you trust."
    }
  },
  general: {
    keywords: ['help', 'support', 'listen', 'talk', 'confused', 'lost', 'struggling', 'hard time', 'bad day', 'feeling down'],
    initialResponse: "Thank you for reaching out. I'm here to listen. Would you like to talk about what's on your mind?",
    followUp: "How long have you been feeling this way? What would help you feel a bit better today?",
    solutions: {
      mild: "Sometimes sharing your thoughts or doing something you enjoy can help.",
      moderate: "Connecting with friends or taking a break might be helpful.",
      severe: "If these feelings continue, consider talking to someone you trust."
    }
  }
};

// Analyze message
const analyzeMessage = (message: string, context: any[] = [], stage = 'greeting') => {
  const lowerMessage = message.toLowerCase();
  const determineSeverity = (category: string, message: string) => {
    const severeIndicators = ['every day', 'weeks', 'months', 'constantly', 'always', 'never stops', 'getting worse', "can't sleep", "can't eat", "can't work"];
    const moderateIndicators = ['sometimes', 'often', 'most days', 'affecting', 'difficult', 'struggling'];
    if (severeIndicators.some(indicator => message.toLowerCase().includes(indicator))) {
      return 'severe';
    } else if (moderateIndicators.some(indicator => message.toLowerCase().includes(indicator))) {
      return 'moderate';
    }
    return 'mild';
  };
  for (const [category, data] of Object.entries(conversationDatabase)) {
    const matches = data.keywords.filter(keyword => lowerMessage.includes(keyword));
    if (matches.length > 0) {
      const severity = determineSeverity(category, message);
      return { 
        category, 
        severity,
        matches, 
        stage: stage === 'greeting' ? 'exploring' : stage 
      };
    }
  }
  return { category: 'general', severity: 'mild', stage: stage === 'greeting' ? 'exploring' : stage };
};

// Improved support responses
const supportResponses = [
  "I'm here for you. Would you like to share more?",
  "It's okay to feel this way. What do you think might help?",
  "Remember, you're not alone. Is there something specific you'd like to talk about?",
  "Thank you for opening up. How can I support you further?",
  "Would you like some tips or just someone to listen?"
];

// Generate response (improved)
const generateResponse = (userMessage: string, currentStage: string) => {
  const analysis = analyzeMessage(userMessage, [], currentStage);
  const categoryData = conversationDatabase[analysis.category as keyof typeof conversationDatabase];
  if (!categoryData) {
    return {
      response: "I'm here to listen. Could you tell me more about what's on your mind?",
      newStage: 'exploring',
      category: 'general'
    };
  }
  switch (currentStage) {
    case 'greeting':
    case 'exploring':
      return {
        response: categoryData.initialResponse,
        newStage: 'supporting',
        category: analysis.category
      };
    case 'supporting':
      return {
        response: categoryData.followUp,
        newStage: 'providing_solutions',
        category: analysis.category
      };
    case 'providing_solutions':
      const solutions = categoryData.solutions;
      if (typeof solutions === 'object' && solutions[analysis.severity as keyof typeof solutions]) {
        return {
          response: solutions[analysis.severity as keyof typeof solutions],
          newStage: 'ongoing_support',
          category: analysis.category
        };
      } else if (typeof solutions === 'string') {
        return {
          response: solutions,
          newStage: 'ongoing_support', 
          category: analysis.category
        };
      }
      break;
    case 'ongoing_support':
      return {
        response: supportResponses[Math.floor(Math.random() * supportResponses.length)],
        newStage: 'ongoing_support',
        category: analysis.category
      };
    default:
      return {
        response: categoryData.initialResponse,
        newStage: 'exploring',
        category: analysis.category
      };
  }
  return {
    response: "Could you tell me more about how this is affecting your daily life?",
    newStage: 'exploring',
    category: analysis.category
  };
};

interface MentalHealthChatbotProps {
  onClose: () => void;
}

export function MentalHealthChatbot({ onClose }: MentalHealthChatbotProps) {
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      type: "bot",
      content: "Hi, I'm here to listen 💙. How are you feeling today?",
      timestamp: new Date(),
      category: "general"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState("greeting");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const quickResponses = [
    "I'm feeling stressed",
    "I need motivation",
    "I'm having a hard time with friends",
    "I'm feeling down",
    "I just need someone to talk to"
  ];

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      content: inputText.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText.trim();
    setInputText('');
    setIsTyping(true);
    const responseData = generateResponse(currentInput, conversationStage);
    const typingDelay = Math.min(Math.max(responseData.response.length * 25, 1000), 3000);
    setTimeout(() => {
      setConversationStage(responseData.newStage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot' as const,
        content: responseData.response,
        category: responseData.category,
        stage: responseData.newStage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, typingDelay);
  };

  const handleQuickResponse = (response: string) => {
    setInputText(response);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Mental Health Assistant</h3>
              <p className="text-blue-100 text-sm">Here to listen and support you</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-6 py-3">
          <div className="flex items-center justify-center space-x-2 text-center">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">This chatbot is for supportive conversation and not a substitute for professional help.</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[400px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white" style={{ scrollbarWidth: 'thin', scrollbarColor: '#a78bfa #f3f4f6' }}>
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-r from-purple-500 to-purple-600'
                }`}>
                  {message.type === 'user' ? 
                    <User className="w-5 h-5 text-white" /> : 
                    <Heart className="w-5 h-5 text-white" />
                  }
                </div>
                <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-sm' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Responses: only show for first message */}
        {messages.length === 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-600 mb-3 font-medium">Quick responses:</p>
            <div className="flex flex-wrap gap-2">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(response)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {response}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 bg-white border-t">
          <form
            onSubmit={e => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind... I'm here to listen and support you 💙"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  rows={3}
                  maxLength={1000}
                  disabled={isTyping}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                  {inputText.length}/1000
                </div>
              </div>
              <button
                type="button"
                onClick={sendMessage}
                disabled={!inputText.trim() || isTyping}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}