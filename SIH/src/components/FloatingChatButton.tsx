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

export function FloatingChatButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      type: "bot" as const,
      content: "Hi, I'm here to listen 💙. How are you feeling today?",
      timestamp: new Date(),
      category: "general"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState("greeting");
  const [isMouseOverChat, setIsMouseOverChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current && isChatOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isChatOpen]);

  // Close chat when clicking outside and cleanup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
        setIsMouseOverChat(false);
        document.body.style.overflow = '';
      }
    };

    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Cleanup when chat is closed
      setIsMouseOverChat(false);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Always cleanup on unmount
      document.body.style.overflow = '';
    };
  }, [isChatOpen]);

  // Smart scroll handling - prevent page scroll when mouse is over chat
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isChatOpen && isMouseOverChat && chatRef.current) {
        // Check if the wheel event is happening over the chat window
        const chatRect = chatRef.current.getBoundingClientRect();
        const isOverChat = (
          e.clientX >= chatRect.left &&
          e.clientX <= chatRect.right &&
          e.clientY >= chatRect.top &&
          e.clientY <= chatRect.bottom
        );
        
        if (isOverChat) {
          // Let the chat handle its own scrolling, prevent page scroll
          e.stopPropagation();
        }
      }
    };

    if (isChatOpen && isMouseOverChat) {
      // Add event listener to the document to catch all wheel events
      document.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    }

    return () => {
      document.removeEventListener('wheel', handleWheel, true);
    };
  }, [isChatOpen, isMouseOverChat]);

  const handleChatMouseEnter = () => {
    setIsMouseOverChat(true);
    // Prevent page scrolling when mouse is over chat
    document.body.style.overflow = 'hidden';
  };

  const handleChatMouseLeave = () => {
    setIsMouseOverChat(false);
    // Restore page scrolling when mouse leaves chat
    document.body.style.overflow = '';
  };

  const quickResponses = [
    "I'm feeling stressed",
    "I need motivation", 
    "I'm feeling down",
    "Just need to talk"
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
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center group"
        aria-label="Toggle mental health chat assistant"
      >
        <div className="flex items-center justify-center relative">
          {/* Chat Icon */}
          {isChatOpen ? (
            <X className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
          ) : (
            <svg 
              className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
          )}
          
          {/* Pulse animation */}
          {!isChatOpen && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-ping opacity-20"></div>
          )}
        </div>
        
        {/* Tooltip */}
        {!isChatOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Chat with AI Assistant 💙
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </button>

      {/* Compact Chat Window */}
      {isChatOpen && (
        <div 
          ref={chatRef}
          className="chat-window-container fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transform animate-modal-enter"
          onMouseEnter={handleChatMouseEnter}
          onMouseLeave={handleChatMouseLeave}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <Heart className="w-5 h-5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold truncate">Mental Health Assistant</h3>
                <p className="text-blue-100 text-xs truncate">Here to listen and support you</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Info Banner */}
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-4 py-2 flex-shrink-0">
            <div className="flex items-center justify-center space-x-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs text-center">Supportive conversation - not professional help</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white chat-messages-container"
            onWheel={(e) => {
              // Stop wheel events from propagating to the document
              e.stopPropagation();
            }}
          >
            {messages.map((message) => (
              <div key={message.id} className={`w-full flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-r from-purple-500 to-purple-600'
                  }`}>
                    {message.type === 'user' ? 
                      <User className="w-4 h-4 text-white" /> : 
                      <Heart className="w-4 h-4 text-white" />
                    }
                  </div>
                  <div className={`px-3 py-2 rounded-xl shadow-sm min-w-0 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="w-full flex justify-start chat-typing-indicator">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 px-3 py-2 rounded-xl rounded-tl-sm shadow-sm">
                    <div className="flex items-center space-x-1">
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
            <div className="px-4 py-3 bg-gray-50 border-t flex-shrink-0">
              <p className="text-xs text-gray-600 mb-2 font-medium text-left">Quick responses:</p>
              <div className="flex flex-wrap gap-2 justify-start">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0"
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t flex-shrink-0">
            <form
              onSubmit={e => {
                e.preventDefault();
                sendMessage();
              }}
              className="w-full"
            >
              <div className="flex items-end gap-3 w-full">
                <div className="flex-1 relative min-w-0">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your mind... 💙"
                    className="w-full px-3 py-2 pr-12 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm leading-relaxed"
                    rows={2}
                    maxLength={500}
                    disabled={isTyping}
                  />
                  <div className="absolute bottom-2 right-3 text-xs text-gray-400 pointer-events-none">
                    {inputText.length}/500
                  </div>
                </div>
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex-shrink-0 self-end"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}