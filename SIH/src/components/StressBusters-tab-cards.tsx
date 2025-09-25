import { useState, lazy, Suspense } from "react";
import { ArrowLeft, Gamepad2, Heart, Brain, Clock, Target, Leaf, Sun, Moon } from "lucide-react";
import { openFishingGameWindow } from "./FishingGame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Lazy load the BottleSmashGame to improve performance
const BottleSmashGame = lazy(() => import("./BottleSmashGame").then(module => ({ default: module.BottleSmashGame })));

export function StressBusters() {
  const [showBottleGame, setShowBottleGame] = useState(false);
  const [wellnessView, setWellnessView] = useState<'cards' | 'focus' | 'stress' | 'depression' | 'ptsd'>('cards');
  const [routineView, setRoutineView] = useState<'cards' | 'morning' | 'midday' | 'evening' | 'sleep'>('cards');

  const openBottleGameWindow = () => {
    setShowBottleGame(true);
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

  const renderWellnessContent = () => {
    if (wellnessView === 'focus') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setWellnessView('cards')}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Wellness Toolkit
          </button>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-6">
                <Target className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Focus Enhancement (ADHD Support)</h3>
                <p className="text-gray-600">Evidence-based techniques to improve attention and concentration</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">🧘 Mindful Attention Training</h4>
                <p className="text-indigo-700 mb-4">5-minute focused breathing to strengthen attention span and reduce hyperactivity</p>
                <div className="text-sm text-indigo-600">
                  <p>• Start with 2-3 minutes daily</p>
                  <p>• Focus on breath counting 1-10</p>
                  <p>• Gently return when mind wanders</p>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">⏰ Pomodoro Focus Sessions</h4>
                <p className="text-indigo-700 mb-4">25-minute work intervals with 5-minute breaks to optimize concentration</p>
                <div className="text-sm text-indigo-600">
                  <p>• Set timer for 25 minutes</p>
                  <p>• Single task focus only</p>
                  <p>• Take 5-minute active breaks</p>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">🏃 Movement Breaks</h4>
                <p className="text-indigo-700 mb-4">Brief physical exercises to channel hyperactivity and reset attention</p>
                <div className="text-sm text-indigo-600">
                  <p>• 2-minute desk exercises</p>
                  <p>• Walking meetings when possible</p>
                  <p>• Stretch between focus sessions</p>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">📝 Organization Strategies</h4>
                <p className="text-indigo-700 mb-4">Visual planning tools and task prioritization techniques</p>
                <div className="text-sm text-indigo-600">
                  <p>• Color-coded task categories</p>
                  <p>• Break large tasks into steps</p>
                  <p>• Use visual reminders and calendars</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (wellnessView === 'stress') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setWellnessView('cards')}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Wellness Toolkit
          </button>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-6">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Stress & Anxiety Relief</h3>
                <p className="text-gray-600">Immediate and long-term strategies to calm the nervous system</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h4 className="text-lg font-semibold text-green-900 mb-3">🌬️ 4-7-8 Breathing</h4>
                <p className="text-green-700 mb-4">Inhale 4, hold 7, exhale 8 - activates relaxation response instantly</p>
                <div className="text-sm text-green-600">
                  <p>• Inhale through nose for 4 counts</p>
                  <p>• Hold breath for 7 counts</p>
                  <p>• Exhale through mouth for 8 counts</p>
                  <p>• Repeat 4-8 cycles</p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h4 className="text-lg font-semibold text-green-900 mb-3">🧘 Progressive Muscle Relaxation</h4>
                <p className="text-green-700 mb-4">Systematic tension and release for full-body stress relief</p>
                <div className="text-sm text-green-600">
                  <p>• Start with toes, work upward</p>
                  <p>• Tense muscles for 5 seconds</p>
                  <p>• Release and notice relaxation</p>
                  <p>• 15-20 minute sessions</p>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h4 className="text-lg font-semibold text-green-900 mb-3">🎯 5-4-3-2-1 Grounding</h4>
                <p className="text-green-700 mb-4">Sensory awareness technique to interrupt anxiety spirals</p>
                <div className="text-sm text-green-600">
                  <p>• 5 things you can see</p>
                  <p>• 4 things you can touch</p>
                  <p>• 3 things you can hear</p>
                  <p>• 2 things you can smell</p>
                  <p>• 1 thing you can taste</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (wellnessView === 'depression') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setWellnessView('cards')}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Wellness Toolkit
          </button>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mr-6">
                <Sun className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Depression Support & Energy Boost</h3>
                <p className="text-gray-600">Evidence-based practices to lift mood and increase energy levels</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                <h4 className="text-lg font-semibold text-yellow-900 mb-3">🌅 Morning Light Therapy</h4>
                <p className="text-yellow-700 mb-4">15-minute guided sunlight exposure to regulate circadian rhythm</p>
                <div className="text-sm text-yellow-600">
                  <p>• Get outside within 1 hour of waking</p>
                  <p>• Face east toward morning sun</p>
                  <p>• No sunglasses for optimal benefit</p>
                  <p>• Combine with gentle movement</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                <h4 className="text-lg font-semibold text-yellow-900 mb-3">📝 Gratitude Practice</h4>
                <p className="text-yellow-700 mb-4">Daily journaling of 3 positive experiences to rewire brain patterns</p>
                <div className="text-sm text-yellow-600">
                  <p>• Write 3 specific good things daily</p>
                  <p>• Include why they were meaningful</p>
                  <p>• Do this before bedtime</p>
                  <p>• Notice patterns over time</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                <h4 className="text-lg font-semibold text-yellow-900 mb-3">🏃 Gentle Movement</h4>
                <p className="text-yellow-700 mb-4">Low-impact exercises that boost endorphins and energy</p>
                <div className="text-sm text-yellow-600">
                  <p>• Start with 5-10 minute walks</p>
                  <p>• Try gentle yoga or stretching</p>
                  <p>• Dance to favorite music</p>
                  <p>• Focus on consistency over intensity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (wellnessView === 'ptsd') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setWellnessView('cards')}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Wellness Toolkit
          </button>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">PTSD Support & Trauma Recovery</h3>
                <p className="text-gray-600">Gentle, trauma-informed practices for healing and safety building</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h4 className="text-lg font-semibold text-purple-900 mb-3">🛡️ Safe Space Visualization</h4>
                <p className="text-purple-700 mb-4">Creating mental sanctuary for emotional regulation and calm</p>
                <div className="text-sm text-purple-600">
                  <p>• Imagine a completely safe place</p>
                  <p>• Include all sensory details</p>
                  <p>• Practice accessing it daily</p>
                  <p>• Use during difficult moments</p>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h4 className="text-lg font-semibold text-purple-900 mb-3">🌱 Gentle Embodiment</h4>
                <p className="text-purple-700 mb-4">Slow, mindful body awareness practices for nervous system healing</p>
                <div className="text-sm text-purple-600">
                  <p>• Start with breath awareness</p>
                  <p>• Notice body sensations kindly</p>
                  <p>• Move at your own pace</p>
                  <p>• Stop if overwhelmed</p>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h4 className="text-lg font-semibold text-purple-900 mb-3">🔄 Resource Building</h4>
                <p className="text-purple-700 mb-4">Developing internal resources for stability and resilience</p>
                <div className="text-sm text-purple-600">
                  <p>• Identify personal strengths</p>
                  <p>• Build support network</p>
                  <p>• Practice self-compassion</p>
                  <p>• Create safety anchors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default cards view for wellness
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setWellnessView('focus')}
        >
          <div className="mb-4">
            <div className="w-full h-32 bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-12 h-12 text-indigo-600" />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Focus Enhancement (ADHD Support)</h4>
              <div className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Evidence-based techniques to improve attention and concentration</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">Mindful Training</span>
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">Pomodoro</span>
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">Movement</span>
          </div>
        </div>

        <div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setWellnessView('stress')}
        >
          <div className="mb-4">
            <div className="w-full h-32 bg-gradient-to-r from-green-200 to-green-300 rounded-lg flex items-center justify-center mb-4">
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Stress & Anxiety Relief</h4>
              <div className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Immediate and long-term strategies to calm the nervous system</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">4-7-8 Breathing</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Muscle Relaxation</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Grounding</span>
          </div>
        </div>

        <div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setWellnessView('depression')}
        >
          <div className="mb-4">
            <div className="w-full h-32 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg flex items-center justify-center mb-4">
              <Sun className="w-12 h-12 text-yellow-600" />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Depression Support & Energy Boost</h4>
              <div className="text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Evidence-based practices to lift mood and increase energy levels</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Light Therapy</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Gratitude</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Movement</span>
          </div>
        </div>

        <div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setWellnessView('ptsd')}
        >
          <div className="mb-4">
            <div className="w-full h-32 bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-12 h-12 text-purple-600" />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">PTSD Support & Trauma Recovery</h4>
              <div className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Gentle, trauma-informed practices for healing and safety building</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Safe Space</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Embodiment</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Resources</span>
          </div>
        </div>
      </div>
    );
  };

  const renderRoutineContent = () => {
    if (routineView === 'morning') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setRoutineView('cards')}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Daily Routine
          </button>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mr-6">
                <Sun className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Morning Foundation (6-9 AM)</h3>
                <p className="text-gray-600">Start your day with evidence-based practices for optimal brain function</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <h4 className="text-lg font-semibold text-orange-900 mb-3">☀️ Light Exposure (10-15 mins)</h4>
                <p className="text-orange-700 mb-4">Natural sunlight within 1 hour of waking to regulate circadian rhythm and boost mood</p>
                <div className="text-sm text-orange-600">
                  <p>• Step outside immediately upon waking</p>
                  <p>• Face east toward the morning sun</p>
                  <p>• No sunglasses for optimal light exposure</p>
                  <p>• Combine with light stretching or walking</p>
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <h4 className="text-lg font-semibold text-orange-900 mb-3">💧 Hydration + Nutrition</h4>
                <p className="text-orange-700 mb-4">16-20oz water + protein-rich breakfast to stabilize blood sugar and neurotransmitter production</p>
                <div className="text-sm text-orange-600">
                  <p>• Drink water before coffee/tea</p>
                  <p>• Include 20-30g protein in breakfast</p>
                  <p>• Avoid high-sugar morning foods</p>
                  <p>• Consider electrolytes if needed</p>
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <h4 className="text-lg font-semibold text-orange-900 mb-3">🧘 Mindful Breathing (5 mins)</h4>
                <p className="text-orange-700 mb-4">Box breathing or 4-7-8 technique to activate parasympathetic nervous system</p>
                <div className="text-sm text-orange-600">
                  <p>• Box breathing: 4-4-4-4 pattern</p>
                  <p>• Or 4-7-8: inhale 4, hold 7, exhale 8</p>
                  <p>• Focus purely on the breath</p>
                  <p>• Set intention for the day</p>
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <h4 className="text-lg font-semibold text-orange-900 mb-3">📝 Intention Setting</h4>
                <p className="text-orange-700 mb-4">Write 3 priorities and 1 gratitude to improve focus, motivation, and positive neural pathways</p>
                <div className="text-sm text-orange-600">
                  <p>• List 3 most important tasks</p>
                  <p>• Write 1 thing you're grateful for</p>
                  <p>• Review yesterday's wins</p>
                  <p>• Set positive intention for day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (routineView === 'midday') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setRoutineView('cards')}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Daily Routine
          </button>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                <Sun className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Midday Reset (12-2 PM)</h3>
                <p className="text-gray-600">Maintain energy and focus through the afternoon</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">🍽️ Mindful Eating</h4>
                <p className="text-blue-700 mb-4">Balanced lunch with protein, healthy fats, and complex carbs</p>
                <div className="text-sm text-blue-600">
                  <p>• Eat away from work/screens</p>
                  <p>• Include protein and fiber</p>
                  <p>• Chew slowly and mindfully</p>
                  <p>• Stay hydrated throughout</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">🚶 Active Break</h4>
                <p className="text-blue-700 mb-4">10-minute walk outdoors to reset attention and boost circulation</p>
                <div className="text-sm text-blue-600">
                  <p>• Step outside if possible</p>
                  <p>• Walk at moderate pace</p>
                  <p>• Practice mindful observation</p>
                  <p>• Get natural light exposure</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">💡 Energy Assessment</h4>
                <p className="text-blue-700 mb-4">Quick body scan and adjustment of afternoon priorities</p>
                <div className="text-sm text-blue-600">
                  <p>• Check in with energy levels</p>
                  <p>• Adjust afternoon schedule</p>
                  <p>• Prioritize important tasks</p>
                  <p>• Plan recovery time if needed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (routineView === 'evening') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setRoutineView('cards')}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Daily Routine
          </button>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-6">
                <Moon className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Evening Wind-Down (6-9 PM)</h3>
                <p className="text-gray-600">Transition from day to night with calming practices</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h4 className="text-lg font-semibold text-purple-900 mb-3">📱 Digital Sunset</h4>
                <p className="text-purple-700 mb-4">Reduce screen exposure and switch to warm lighting</p>
                <div className="text-sm text-purple-600">
                  <p>• Dim screens after 7 PM</p>
                  <p>• Use warm light filters</p>
                  <p>• Switch to warm room lighting</p>
                  <p>• Avoid stimulating content</p>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h4 className="text-lg font-semibold text-purple-900 mb-3">📔 Reflection Practice</h4>
                <p className="text-purple-700 mb-4">Journal 3 wins from the day and tomorrow's priorities</p>
                <div className="text-sm text-purple-600">
                  <p>• Write down 3 good things</p>
                  <p>• Reflect on lessons learned</p>
                  <p>• Set 3 priorities for tomorrow</p>
                  <p>• Practice self-compassion</p>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <h4 className="text-lg font-semibold text-purple-900 mb-3">🧘 Relaxation Ritual</h4>
                <p className="text-purple-700 mb-4">Progressive muscle relaxation or gentle stretching</p>
                <div className="text-sm text-purple-600">
                  <p>• Light stretching or yoga</p>
                  <p>• Progressive muscle relaxation</p>
                  <p>• Calming music or sounds</p>
                  <p>• Prepare mind for rest</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (routineView === 'sleep') {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setRoutineView('cards')}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Daily Routine
          </button>
          
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-6">
                <Moon className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Sleep Preparation (9-10 PM)</h3>
                <p className="text-gray-600">Optimize sleep quality for mental health recovery and cognitive function</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">🌡️ Temperature Drop</h4>
                <p className="text-indigo-700 mb-4">Cool bedroom to 65-68°F to trigger natural sleepiness</p>
                <div className="text-sm text-indigo-600">
                  <p>• Set thermostat to 65-68°F</p>
                  <p>• Use breathable bedding</p>
                  <p>• Ensure good air circulation</p>
                  <p>• Consider cooling shower/bath</p>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">📚 Gentle Activities</h4>
                <p className="text-indigo-700 mb-4">Reading, light stretching, or calm music instead of screens</p>
                <div className="text-sm text-indigo-600">
                  <p>• Read fiction or poetry</p>
                  <p>• Listen to calming music</p>
                  <p>• Practice gentle stretching</p>
                  <p>• Avoid stimulating activities</p>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">🌬️ 4-7-8 Breathing</h4>
                <p className="text-indigo-700 mb-4">Activate parasympathetic nervous system for deep sleep</p>
                <div className="text-sm text-indigo-600">
                  <p>• Inhale for 4 counts</p>
                  <p>• Hold breath for 7 counts</p>
                  <p>• Exhale slowly for 8 counts</p>
                  <p>• Repeat 4-8 cycles</p>
                </div>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="text-lg font-semibold text-indigo-900 mb-3">🙏 Gratitude Meditation</h4>
                <p className="text-indigo-700 mb-4">End day with 3 appreciations to boost positive mood</p>
                <div className="text-sm text-indigo-600">
                  <p>• Reflect on 3 grateful moments</p>
                  <p>• Include people who helped you</p>
                  <p>• Notice small positive details</p>
                  <p>• End with peaceful intention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default cards view for routine
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setRoutineView('morning')}
        >
          <div className="mb-4">
            <div className="w-full h-32 bg-gradient-to-r from-orange-200 to-orange-300 rounded-lg flex items-center justify-center mb-4">
              <Sun className="w-12 h-12 text-orange-600" />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Morning Foundation (6-9 AM)</h4>
              <div className="text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Start your day with evidence-based practices for optimal brain function</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">Light Exposure</span>
            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">Hydration</span>
            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">Breathing</span>
          </div>
        </div>

        <div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setRoutineView('midday')}
        >
          <div className="mb-4">
            <div className="w-full h-32 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex items-center justify-center mb-4">
              <Sun className="w-12 h-12 text-blue-600" />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Midday Reset (12-2 PM)</h4>
              <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Maintain energy and focus through the afternoon</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Mindful Eating</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Active Break</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Assessment</span>
          </div>
        </div>

        <div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setRoutineView('evening')}
        >
          <div className="mb-4">
            <div className="w-full h-32 bg-gradient-to-r from-purple-200 to-purple-300 rounded-lg flex items-center justify-center mb-4">
              <Moon className="w-12 h-12 text-purple-600" />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Evening Wind-Down (6-9 PM)</h4>
              <div className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Transition from day to night with calming practices</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Digital Sunset</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Reflection</span>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Relaxation</span>
          </div>
        </div>

        <div 
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setRoutineView('sleep')}
        >
          <div className="mb-4">
            <div className="w-full h-32 bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-lg flex items-center justify-center mb-4">
              <Moon className="w-12 h-12 text-indigo-600" />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">Sleep Preparation (9-10 PM)</h4>
              <div className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Optimize sleep quality for mental health recovery</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">Temperature</span>
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">Activities</span>
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">Gratitude</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Gamepad2 className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Stress Busters
          </h1>
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive stress relief through interactive games, evidence-based wellness strategies, and daily routines designed to support your mental health journey.
        </p>
      </div>

      <Tabs defaultValue="games" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="games" className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4" />
            Interactive Games
          </TabsTrigger>
          <TabsTrigger value="wellness" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Wellness Toolkit
          </TabsTrigger>
          <TabsTrigger value="routine" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Daily Wellness Routine
          </TabsTrigger>
        </TabsList>

        <TabsContent value="games" className="mt-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                🎮 Interactive Stress Relief Games
              </h2>
              <p className="text-gray-600">
                Fun activities to release tension and unwind
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bottle Smash Game */}
              <div
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={openBottleGameWindow}
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <div className="w-full h-20 bg-gradient-to-r from-purple-200 to-purple-300 border-2 border-dashed border-purple-400 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-xs font-medium">🔨 Bottle Smash Image</span>
                  </div>
                  <div className="absolute inset-0 bg-purple-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Open Game →
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Bottle Smash
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Release stress by smashing virtual bottles! Customize colors and enjoy realistic physics.
                </p>
                <div className="flex items-center text-xs text-purple-600">
                  <span className="mr-2">🎯</span>
                  <span>Interactive • Stress Relief</span>
                </div>
              </div>

              {/* Fishing Game */}
              <div
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={openFishingGameWindow}
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <div className="w-full h-20 bg-gradient-to-r from-blue-200 to-blue-300 border-2 border-dashed border-blue-400 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-medium">🎣 Fishing Game Image</span>
                  </div>
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Open Game →
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Peaceful Fishing
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Relax by a tranquil virtual lake with meditative fishing experience.
                </p>
                <div className="flex items-center text-xs text-blue-600">
                  <span className="mr-2">🎣</span>
                  <span>Meditative • Calming</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="wellness" className="mt-6">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                🧠 Complete Wellness Toolkit
              </h2>
              <p className="text-gray-600">
                Evidence-based practices for mental health & cognitive support
              </p>
            </div>

            {renderWellnessContent()}
          </div>
        </TabsContent>

        <TabsContent value="routine" className="mt-6">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                🌅 Evidence-Based Daily Wellness Routine
              </h2>
              <p className="text-gray-600">
                Comprehensive daily practices for optimal mental health across all conditions
              </p>
            </div>

            {renderRoutineContent()}
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-center text-sm text-gray-500 mt-8 p-4 bg-gray-50 rounded-lg">
        <p>🌟 <strong>Pro Tip:</strong> All techniques are grounded in neuroscience research and proven effective for mental health support.</p>
        <p className="mt-1">Combine interactive games with evidence-based practices for comprehensive stress relief and wellness.</p>
      </div>
    </div>
  );
}