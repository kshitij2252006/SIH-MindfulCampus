import { useState, lazy, Suspense } from "react";
import { ChevronDown, ChevronUp, Gamepad2, Heart, ArrowLeft } from "lucide-react";
import { openFishingGameWindow } from "./FishingGame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Lazy load the BottleSmashGame to improve performance
const BottleSmashGame = lazy(() => import("./BottleSmashGame").then(module => ({ default: module.BottleSmashGame })));

export function StressBusters() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedWellnessCard, setSelectedWellnessCard] = useState<string | null>(null);
  const [selectedRoutineCard, setSelectedRoutineCard] = useState<string | null>(null);
  const [showBottleGame, setShowBottleGame] = useState(false);

  const openBottleGameWindow = () => {
    setShowBottleGame(true);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (showBottleGame) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setShowBottleGame(false)}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Stress Busters
        </button>
        <Suspense fallback={
          <div className="flex items-center justify-center h-96">
            <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        }>
          <BottleSmashGame />
        </Suspense>
      </div>
    );
  }

  const wellnessCards = [
    {
      id: "adhd",
      title: "ADHD Focus & Attention Support",
      subtitle: "Enhance concentration and manage hyperactivity naturally",
      icon: "🧠",
      color: "from-indigo-200 to-blue-200",
      borderColor: "border-indigo-400",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-indigo-600 text-2xl">🧠</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ADHD Focus & Attention Support</h2>
            <p className="text-gray-600">Enhance concentration and manage hyperactivity naturally</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-3">🧘 Mindful Attention Training</h3>
              <p className="text-indigo-700 mb-4">5-minute focused breathing to strengthen attention span and reduce hyperactivity</p>
              <ul className="text-sm text-indigo-600 space-y-2">
                <li>• Focus on breath for 30 seconds</li>
                <li>• Notice when mind wanders</li>
                <li>• Gently return attention to breath</li>
                <li>• Gradually increase duration</li>
                <li>• Practice twice daily</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-3">⚡ Energy Management</h3>
              <p className="text-indigo-700 mb-4">Physical movement and structured breaks to channel hyperactivity</p>
              <ul className="text-sm text-indigo-600 space-y-2">
                <li>• 10-minute movement breaks every hour</li>
                <li>• Fidget tools for focus</li>
                <li>• High-intensity intervals</li>
                <li>• Consistent sleep schedule</li>
                <li>• Protein-rich meals</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-3">📝 Executive Function Support</h3>
              <p className="text-indigo-700 mb-4">Tools and techniques to improve planning and organization</p>
              <ul className="text-sm text-indigo-600 space-y-2">
                <li>• Visual schedules and timers</li>
                <li>• Break tasks into small steps</li>
                <li>• Use external reminders</li>
                <li>• Create structured routines</li>
                <li>• Minimize distractions</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="font-semibold text-indigo-900 mb-3">🎯 Focus Enhancement</h3>
              <p className="text-indigo-700 mb-4">Environmental and cognitive strategies for sustained attention</p>
              <ul className="text-sm text-indigo-600 space-y-2">
                <li>• Pomodoro technique (25-min focus)</li>
                <li>• Background white noise</li>
                <li>• Organized workspace</li>
                <li>• Single-tasking approach</li>
                <li>• Regular brain breaks</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "anxiety",
      title: "Stress & Anxiety Relief",
      subtitle: "Immediate and long-term strategies to calm the nervous system",
      icon: "🌿",
      color: "from-green-200 to-emerald-200",
      borderColor: "border-green-400",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">🌿</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Stress & Anxiety Relief</h2>
            <p className="text-gray-600">Immediate and long-term strategies to calm the nervous system</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">🌬️ 4-7-8 Breathing</h3>
              <p className="text-green-700 mb-4">Inhale 4, hold 7, exhale 8 - activates relaxation response instantly</p>
              <div className="text-sm text-green-600 space-y-2">
                <p><strong>Steps:</strong></p>
                <p>1. Inhale through nose for 4 counts</p>
                <p>2. Hold breath for 7 counts</p>
                <p>3. Exhale through mouth for 8 counts</p>
                <p>4. Repeat 4-8 cycles</p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">🧘 Progressive Muscle Relaxation</h3>
              <p className="text-green-700 mb-4">Systematic tension and release for full-body stress relief</p>
              <div className="text-sm text-green-600 space-y-2">
                <p><strong>Technique:</strong></p>
                <p>1. Tense muscle group for 5 seconds</p>
                <p>2. Release and notice relaxation</p>
                <p>3. Move systematically through body</p>
                <p>4. End with whole-body relaxation</p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">🧠 Grounding Techniques</h3>
              <p className="text-green-700 mb-4">5-4-3-2-1 sensory method to interrupt anxiety spirals</p>
              <div className="text-sm text-green-600 space-y-2">
                <p><strong>Notice:</strong></p>
                <p>• 5 things you can see</p>
                <p>• 4 things you can touch</p>
                <p>• 3 things you can hear</p>
                <p>• 2 things you can smell</p>
                <p>• 1 thing you can taste</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "depression",
      title: "Mood Enhancement & Depression Support",
      subtitle: "Evidence-based approaches to lift mood and increase energy",
      icon: "☀️",
      color: "from-yellow-200 to-orange-200",
      borderColor: "border-yellow-400",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-600 text-2xl">☀️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mood Enhancement & Depression Support</h2>
            <p className="text-gray-600">Evidence-based approaches to lift mood and increase energy</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">🌞 Light Therapy</h3>
              <p className="text-yellow-700 mb-4">15-30 minutes of bright light exposure to regulate circadian rhythms</p>
              <div className="text-sm text-yellow-600 space-y-2">
                <p><strong>Protocol:</strong></p>
                <p>• Morning light within 1 hour of waking</p>
                <p>• 10,000 lux light box for 15-30 minutes</p>
                <p>• Natural sunlight when possible</p>
                <p>• Consistent daily timing</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">🚶 Behavioral Activation</h3>
              <p className="text-yellow-700 mb-4">Structured activities to counteract withdrawal and low energy</p>
              <div className="text-sm text-yellow-600 space-y-2">
                <p><strong>Activities:</strong></p>
                <p>• 10-minute daily walks</p>
                <p>• One enjoyable activity daily</p>
                <p>• Social connection (even brief)</p>
                <p>• Small accomplishable tasks</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">💭 Thought Pattern Awareness</h3>
              <p className="text-yellow-700 mb-4">Cognitive techniques to identify and challenge negative thinking</p>
              <div className="text-sm text-yellow-600 space-y-2">
                <p><strong>Practice:</strong></p>
                <p>• Notice negative thought patterns</p>
                <p>• Ask "Is this thought helpful?"</p>
                <p>• Look for alternative perspectives</p>
                <p>• Focus on small positives</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">🎯 Goal Setting</h3>
              <p className="text-yellow-700 mb-4">Micro-goals and achievements to rebuild sense of accomplishment</p>
              <div className="text-sm text-yellow-600 space-y-2">
                <p><strong>Approach:</strong></p>
                <p>• Set tiny, achievable daily goals</p>
                <p>• Celebrate small wins</p>
                <p>• Track positive activities</p>
                <p>• Build momentum gradually</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "ptsd",
      title: "Trauma Recovery & PTSD Support",
      subtitle: "Gentle, trauma-informed approaches for healing and safety",
      icon: "🛡️",
      color: "from-purple-200 to-pink-200",
      borderColor: "border-purple-400",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 text-2xl">🛡️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Trauma Recovery & PTSD Support</h2>
            <p className="text-gray-600">Gentle, trauma-informed approaches for healing and safety</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">🔒 Safety & Grounding</h3>
              <p className="text-purple-700 mb-4">Establishing felt safety and present-moment awareness</p>
              <div className="text-sm text-purple-600 space-y-2">
                <p><strong>Techniques:</strong></p>
                <p>• Feel feet on the ground</p>
                <p>• Name 5 things you can see</p>
                <p>• Hold a comforting object</p>
                <p>• Use calming scents</p>
                <p>• Practice self-compassion</p>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">💨 Trauma-Informed Breathing</h3>
              <p className="text-purple-700 mb-4">Gentle breathwork that honors autonomic responses</p>
              <div className="text-sm text-purple-600 space-y-2">
                <p><strong>Approach:</strong></p>
                <p>• Start with natural breathing</p>
                <p>• Lengthen exhales gradually</p>
                <p>• Stop if feeling overwhelmed</p>
                <p>• Focus on choice and control</p>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">🔄 Resource Building</h3>
              <p className="text-purple-700 mb-4">Developing internal resources for stability and resilience</p>
              <div className="text-sm text-purple-600 space-y-2">
                <p><strong>Resources:</strong></p>
                <p>• Identify personal strengths</p>
                <p>• Build support network</p>
                <p>• Create daily routines</p>
                <p>• Practice self-care</p>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3">🌊 Window of Tolerance</h3>
              <p className="text-purple-700 mb-4">Learning to recognize and expand your optimal zone</p>
              <div className="text-sm text-purple-600 space-y-2">
                <p><strong>Practice:</strong></p>
                <p>• Notice body sensations</p>
                <p>• Recognize hyper/hypoarousal</p>
                <p>• Use tools to self-regulate</p>
                <p>• Return to window gradually</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const routineCards = [
    {
      id: "morning",
      title: "Morning Foundation",
      subtitle: "Start your day with evidence-based practices for optimal brain function",
      icon: "🌅",
      color: "from-orange-200 to-yellow-200",
      borderColor: "border-orange-400",
      timeframe: "6-9 AM",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-600 text-2xl">🌅</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Morning Foundation (6-9 AM)</h2>
            <p className="text-gray-600">Start your day with evidence-based practices for optimal brain function</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="font-semibold text-orange-900 mb-3">☀️ Light Exposure (10-15 mins)</h3>
              <p className="text-orange-700 mb-4">Natural sunlight within 1 hour of waking to regulate circadian rhythm and boost mood</p>
              <ul className="text-sm text-orange-600 space-y-2">
                <li>• Step outside within 1 hour of waking</li>
                <li>• Face east toward the sunrise if possible</li>
                <li>• No sunglasses needed for maximum benefit</li>
                <li>• 10-15 minutes is sufficient</li>
                <li>• Works even on cloudy days</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="font-semibold text-orange-900 mb-3">💧 Hydration + Nutrition</h3>
              <p className="text-orange-700 mb-4">16-20oz water + protein-rich breakfast to stabilize blood sugar and neurotransmitter production</p>
              <ul className="text-sm text-orange-600 space-y-2">
                <li>• Drink 16-20oz water immediately upon waking</li>
                <li>• Include 20-30g protein in breakfast</li>
                <li>• Add healthy fats (avocado, nuts, olive oil)</li>
                <li>• Choose complex carbohydrates</li>
                <li>• Avoid high sugar foods</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="font-semibold text-orange-900 mb-3">🧘 Mindful Breathing (5 mins)</h3>
              <p className="text-orange-700 mb-4">Box breathing or 4-7-8 technique to activate parasympathetic nervous system</p>
              <ul className="text-sm text-orange-600 space-y-2">
                <li>• Find a quiet spot to sit comfortably</li>
                <li>• Try box breathing: 4-4-4-4 pattern</li>
                <li>• Or 4-7-8: inhale 4, hold 7, exhale 8</li>
                <li>• Focus only on the breath</li>
                <li>• Start with 5 minutes daily</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="font-semibold text-orange-900 mb-3">📝 Intention Setting</h3>
              <p className="text-orange-700 mb-4">Write 3 priorities and 1 gratitude to improve focus and motivation</p>
              <ul className="text-sm text-orange-600 space-y-2">
                <li>• Write down 3 main priorities for the day</li>
                <li>• Note 1 thing you're grateful for</li>
                <li>• Keep it simple and specific</li>
                <li>• Review priorities throughout the day</li>
                <li>• Celebrate completed tasks</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
    // Additional routine cards would go here...
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          🎯 Stress Busters & Wellness Tools
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive stress relief through interactive games, evidence-based wellness strategies, and daily routines designed to support your mental health journey.
        </p>
      </div>

      <Tabs defaultValue="games" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="games" className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            Stress Relief Games
          </TabsTrigger>
          <TabsTrigger value="wellness" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Wellness Toolkit
          </TabsTrigger>
          <TabsTrigger value="routine" className="flex items-center gap-2">
            <span className="text-sm">📋</span>
            Evidence Wellness Routine
          </TabsTrigger>
        </TabsList>

        <TabsContent value="games" className="mt-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                🎮 Interactive Stress Relief Games
              </h2>
              <p className="text-gray-600">
                Engaging activities designed to release tension and promote relaxation through play
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 text-xl">🔨</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Bottle Smash</h4>
                    <p className="text-sm text-gray-600">Satisfying destruction therapy</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Release frustration and tension by throwing virtual objects and watching them shatter into beautiful fragments. 
                  Customize colors, objects, and enjoy realistic physics.
                </p>
                <button
                  onClick={openBottleGameWindow}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
                >
                  Start Smashing
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-xl">🎣</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Peaceful Fishing</h4>
                    <p className="text-sm text-gray-600">Meditative relaxation experience</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Escape to a tranquil lakeside setting. Cast your line, enjoy the peaceful sounds of nature, 
                  and let the gentle rhythm of fishing calm your mind.
                </p>
                <button
                  onClick={openFishingGameWindow}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Go Fishing
                </button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="wellness" className="mt-6">
          {selectedWellnessCard ? (
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 border border-gray-200">
              <button
                onClick={() => setSelectedWellnessCard(null)}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Wellness Toolkit
              </button>
              {wellnessCards.find(card => card.id === selectedWellnessCard)?.content}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  🧠 Mental Health Wellness Toolkit
                </h2>
                <p className="text-gray-600">
                  Targeted strategies and techniques for specific mental health challenges
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wellnessCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedWellnessCard(card.id)}
                    className={`bg-gradient-to-br ${card.color} rounded-lg p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <div className={`w-full h-20 bg-gradient-to-r ${card.color} border-2 border-dashed ${card.borderColor} rounded-lg flex items-center justify-center`}>
                        <span className="text-gray-600 text-xs font-medium">{card.icon} {card.title}</span>
                      </div>
                      <div className="absolute inset-0 bg-gray-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Explore →
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {card.subtitle}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center text-gray-500">
                        <span className="mr-2">🎯</span>
                        <span>Targeted Support</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <span className="mr-2">📚</span>
                        <span>Evidence-Based</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="routine" className="mt-6">
          {selectedRoutineCard ? (
            <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-xl p-6 border border-gray-200">
              <button
                onClick={() => setSelectedRoutineCard(null)}
                className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Wellness Routine
              </button>
              {routineCards.find(card => card.id === selectedRoutineCard)?.content}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  🌅 Evidence-Based Daily Wellness Routine
                </h2>
                <p className="text-gray-600">
                  Choose a time period to explore comprehensive wellness practices
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routineCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedRoutineCard(card.id)}
                    className={`bg-gradient-to-br ${card.color} rounded-lg p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <div className={`w-full h-20 bg-gradient-to-r ${card.color} border-2 border-dashed ${card.borderColor} rounded-lg flex items-center justify-center`}>
                        <span className="text-gray-600 text-xs font-medium">{card.icon} {card.title}</span>
                      </div>
                      <div className="absolute inset-0 bg-gray-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Explore →
                        </span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {card.subtitle}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center text-gray-500">
                        <span className="mr-2">⏰</span>
                        <span>{card.timeframe}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <span className="mr-2">📚</span>
                        <span>Evidence-Based</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}