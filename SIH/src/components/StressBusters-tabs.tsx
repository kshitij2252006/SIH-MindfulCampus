import { useState, lazy, Suspense } from "react";
import { ChevronDown, ChevronUp, Gamepad2, Heart, ArrowLeft } from "lucide-react";
import { openFishingGameWindow } from "./FishingGame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Lazy load the BottleSmashGame to improve performance
const BottleSmashGame = lazy(() => import("./BottleSmashGame").then(module => ({ default: module.BottleSmashGame })));

export function StressBusters() {
  const [showBottleGame, setShowBottleGame] = useState(false);

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

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Gamepad2 className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            🎯 Stress Busters & Wellness Hub
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
            <Heart className="w-4 h-4" />
            Wellness Toolkit
          </TabsTrigger>
          <TabsTrigger value="routine" className="flex items-center gap-2">
            <span className="text-sm">🌅</span>
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

            <div className="space-y-8">
              {/* Focus Enhancement (ADHD Support) */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-600 text-xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Focus Enhancement (ADHD Support)</h4>
                    <p className="text-sm text-gray-600">Evidence-based techniques to improve attention and concentration</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h5 className="font-medium text-indigo-900 mb-2">🧘 Mindful Attention Training</h5>
                    <p className="text-sm text-indigo-700">5-minute focused breathing to strengthen attention span and reduce hyperactivity</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h5 className="font-medium text-indigo-900 mb-2">⏰ Pomodoro Focus Sessions</h5>
                    <p className="text-sm text-indigo-700">25-minute work intervals with 5-minute breaks to optimize concentration</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h5 className="font-medium text-indigo-900 mb-2">🏃 Movement Breaks</h5>
                    <p className="text-sm text-indigo-700">Brief physical exercises to channel hyperactivity and reset attention</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h5 className="font-medium text-indigo-900 mb-2">📝 Organization Strategies</h5>
                    <p className="text-sm text-indigo-700">Visual planning tools and task prioritization techniques</p>
                  </div>
                </div>
              </div>

              {/* Stress & Anxiety Relief */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">🌿</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Stress & Anxiety Relief</h4>
                    <p className="text-sm text-gray-600">Immediate and long-term strategies to calm the nervous system</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-medium text-green-900 mb-2">🌬️ 4-7-8 Breathing</h5>
                    <p className="text-sm text-green-700">Inhale 4, hold 7, exhale 8 - activates relaxation response instantly</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-medium text-green-900 mb-2">🧘 Progressive Muscle Relaxation</h5>
                    <p className="text-sm text-green-700">Systematic tension and release for full-body stress relief</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-medium text-green-900 mb-2">🎯 5-4-3-2-1 Grounding</h5>
                    <p className="text-sm text-green-700">Sensory awareness technique to interrupt anxiety spirals</p>
                  </div>
                </div>
              </div>

              {/* Depression Support */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-yellow-600 text-xl">☀️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Depression Support & Energy Boost</h4>
                    <p className="text-sm text-gray-600">Evidence-based practices to lift mood and increase energy levels</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h5 className="font-medium text-yellow-900 mb-2">🌅 Morning Light Therapy</h5>
                    <p className="text-sm text-yellow-700">15-minute guided sunlight exposure to regulate circadian rhythm</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h5 className="font-medium text-yellow-900 mb-2">📝 Gratitude Practice</h5>
                    <p className="text-sm text-yellow-700">Daily journaling of 3 positive experiences to rewire brain patterns</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h5 className="font-medium text-yellow-900 mb-2">🏃 Gentle Movement</h5>
                    <p className="text-sm text-yellow-700">Low-impact exercises that boost endorphins and energy</p>
                  </div>
                </div>
              </div>

              {/* PTSD Support */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 text-xl">💜</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">PTSD Support & Trauma Recovery</h4>
                    <p className="text-sm text-gray-600">Gentle, trauma-informed practices for healing and safety building</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-medium text-purple-900 mb-2">🛡️ Safe Space Visualization</h5>
                    <p className="text-sm text-purple-700">Creating mental sanctuary for emotional regulation and calm</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-medium text-purple-900 mb-2">🌱 Gentle Embodiment</h5>
                    <p className="text-sm text-purple-700">Slow, mindful body awareness practices for nervous system healing</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-medium text-purple-900 mb-2">🔄 Resource Building</h5>
                    <p className="text-sm text-purple-700">Developing internal resources for stability and resilience</p>
                  </div>
                </div>
              </div>
            </div>
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

            <div className="space-y-8">
              {/* Morning Routine (6-9 AM) */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-orange-600 text-xl">🌅</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Morning Foundation (6-9 AM)</h4>
                    <p className="text-sm text-gray-600">Start your day with evidence-based practices for optimal brain function</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h5 className="font-medium text-orange-900 mb-2">☀️ Light Exposure (10-15 mins)</h5>
                    <p className="text-sm text-orange-700">Natural sunlight within 1 hour of waking to regulate circadian rhythm and boost mood (supports all mental health conditions)</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h5 className="font-medium text-orange-900 mb-2">💧 Hydration + Nutrition</h5>
                    <p className="text-sm text-orange-700">16-20oz water + protein-rich breakfast to stabilize blood sugar and neurotransmitter production</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h5 className="font-medium text-orange-900 mb-2">🧘 Mindful Breathing (5 mins)</h5>
                    <p className="text-sm text-orange-700">Box breathing or 4-7-8 technique to activate parasympathetic nervous system and reduce cortisol</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h5 className="font-medium text-orange-900 mb-2">📝 Intention Setting</h5>
                    <p className="text-sm text-orange-700">Write 3 priorities and 1 gratitude to improve focus, motivation, and positive neural pathways</p>
                  </div>
                </div>
              </div>

              {/* Midday Routine (12-2 PM) */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-xl">☀️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Midday Reset (12-2 PM)</h4>
                    <p className="text-sm text-gray-600">Maintain energy and focus through the afternoon</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-2">🍽️ Mindful Eating</h5>
                    <p className="text-sm text-blue-700">Balanced lunch with protein, healthy fats, and complex carbs to maintain stable energy and mood</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-2">🚶 Active Break</h5>
                    <p className="text-sm text-blue-700">10-minute walk outdoors to reset attention and boost circulation</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-2">💡 Energy Assessment</h5>
                    <p className="text-sm text-blue-700">Quick body scan and adjustment of afternoon priorities based on current energy levels</p>
                  </div>
                </div>
              </div>

              {/* Evening Routine (6-9 PM) */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 text-xl">🌙</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Evening Wind-Down (6-9 PM)</h4>
                    <p className="text-sm text-gray-600">Transition from day to night with calming practices</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-medium text-purple-900 mb-2">📱 Digital Sunset</h5>
                    <p className="text-sm text-purple-700">Reduce screen exposure and switch to warm lighting to promote natural melatonin production</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-medium text-purple-900 mb-2">📔 Reflection Practice</h5>
                    <p className="text-sm text-purple-700">Journal 3 wins from the day and tomorrow's priorities to process emotions and plan ahead</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-medium text-purple-900 mb-2">🧘 Relaxation Ritual</h5>
                    <p className="text-sm text-purple-700">Progressive muscle relaxation or gentle stretching to release physical tension</p>
                  </div>
                </div>
              </div>

              {/* Sleep Preparation (9-10 PM) */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-600 text-xl">😴</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Sleep Preparation (9-10 PM)</h4>
                    <p className="text-sm text-gray-600">Optimize sleep quality for mental health recovery and cognitive function</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h5 className="font-medium text-indigo-900 mb-2">🌡️ Temperature Drop</h5>
                    <p className="text-sm text-indigo-700">Cool bedroom to 65-68°F to trigger natural sleepiness and improve sleep quality</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h5 className="font-medium text-indigo-900 mb-2">📚 Gentle Activities</h5>
                    <p className="text-sm text-indigo-700">Reading, light stretching, or calm music instead of screens to prepare mind for rest</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h5 className="font-medium text-indigo-900 mb-2">🌬️ 4-7-8 Breathing</h5>
                    <p className="text-sm text-indigo-700">Activate parasympathetic nervous system for deep, restorative sleep</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h5 className="font-medium text-indigo-900 mb-2">🙏 Gratitude Meditation</h5>
                    <p className="text-sm text-indigo-700">End day with 3 appreciations to boost positive mood and promote peaceful sleep</p>
                  </div>
                </div>
              </div>
            </div>
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