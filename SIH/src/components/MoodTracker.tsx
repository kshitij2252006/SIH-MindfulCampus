import { useState } from "react";
import { Calendar, TrendingUp, BarChart3, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";

interface MoodEntry {
  date: string;
  mood: string;
  energy: number;
  stress: number;
  notes: string;
  activities: string[];
}

export function MoodTracker() {
  const [currentView, setCurrentView] = useState<'log' | 'progress'>('log');
  const [selectedMood, setSelectedMood] = useState('');
  const [energyLevel, setEnergyLevel] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      date: '2025-10-03',
      mood: 'happy',
      energy: 7,
      stress: 3,
      notes: 'Had a great morning routine with breathing exercises',
      activities: ['exercise', 'meditation', 'socializing']
    },
    {
      date: '2025-10-02',
      mood: 'anxious',
      energy: 4,
      stress: 8,
      notes: 'Work presentation went well despite initial nerves',
      activities: ['work', 'breathing']
    },
    {
      date: '2025-09-25',
      mood: 'calm',
      energy: 6,
      stress: 4,
      notes: 'Peaceful weekend, spent time in nature',
      activities: ['nature', 'reading', 'rest']
    }
  ]);

  const moods = [
    { value: 'amazing', emoji: '🤩', label: 'Amazing', color: 'bg-green-500' },
    { value: 'happy', emoji: '😊', label: 'Happy', color: 'bg-green-400' },
    { value: 'good', emoji: '🙂', label: 'Good', color: 'bg-green-300' },
    { value: 'neutral', emoji: '😐', label: 'Neutral', color: 'bg-gray-400' },
    { value: 'sad', emoji: '😢', label: 'Sad', color: 'bg-blue-400' },
    { value: 'anxious', emoji: '😰', label: 'Anxious', color: 'bg-orange-400' },
    { value: 'angry', emoji: '😠', label: 'Angry', color: 'bg-red-400' },
    { value: 'terrible', emoji: '😫', label: 'Terrible', color: 'bg-red-500' }
  ];

  const activities = [
    'exercise', 'meditation', 'socializing', 'work', 'family time', 
    'hobbies', 'nature', 'reading', 'music', 'cooking', 'cleaning',
    'shopping', 'travel', 'rest', 'learning', 'breathing', 'journaling'
  ];

  const handleSaveMoodEntry = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      energy: energyLevel,
      stress: stressLevel,
      notes,
      activities: selectedActivities
    };

    setMoodEntries([newEntry, ...moodEntries.filter(entry => entry.date !== newEntry.date)]);
    
    // Reset form
    setSelectedMood('');
    setEnergyLevel(5);
    setStressLevel(5);
    setNotes('');
    setSelectedActivities([]);
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const getMoodEmoji = (moodValue: string) => {
    return moods.find(m => m.value === moodValue)?.emoji || '😐';
  };

  const getMoodColor = (moodValue: string) => {
    return moods.find(m => m.value === moodValue)?.color || 'bg-gray-400';
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0;
    const moodValues = moodEntries.map(entry => {
      const moodIndex = moods.findIndex(m => m.value === entry.mood);
      return moodIndex !== -1 ? moodIndex : 3; // Default to neutral
    });
    return moodValues.reduce((sum, val) => sum + val, 0) / moodValues.length;
  };

  const getWeeklyProgress = () => {
    const last7Days = moodEntries.slice(0, 7);
    return last7Days.map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en', { weekday: 'short' }),
      mood: moods.findIndex(m => m.value === entry.mood),
      energy: entry.energy,
      stress: entry.stress
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Mood Tracker</h1>
        <p className="text-gray-600">Monitor your emotional well-being and identify patterns</p>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setCurrentView('log')}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentView === 'log' 
                ? 'bg-white shadow-sm font-medium' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Daily Log
          </button>
          <button
            onClick={() => setCurrentView('progress')}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentView === 'progress' 
                ? 'bg-white shadow-sm font-medium' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Visual Progress
          </button>
        </div>
      </div>

      {currentView === 'log' ? (
        <div className="space-y-6">
          {/* Today's Check-in */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              How are you feeling today?
            </h2>
            
            <div className="space-y-6">
              {/* Mood Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select your mood</label>
                <div className="grid grid-cols-4 gap-3">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        selectedMood === mood.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{mood.emoji}</div>
                      <div className="text-xs font-medium">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy & Stress Levels */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Energy Level: {energyLevel}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Exhausted</span>
                    <span>Energized</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stress Level: {stressLevel}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stressLevel}
                    onChange={(e) => setStressLevel(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Relaxed</span>
                    <span>Very Stressed</span>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">What did you do today?</label>
                <div className="flex flex-wrap gap-2">
                  {activities.map((activity) => (
                    <button
                      key={activity}
                      onClick={() => toggleActivity(activity)}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        selectedActivities.includes(activity)
                          ? 'bg-blue-100 border-blue-300 text-blue-800'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
                <Textarea
                  placeholder="How was your day? Any thoughts or reflections..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveMoodEntry} className="w-full" disabled={!selectedMood}>
                Save Today's Entry
              </Button>
            </div>
          </Card>

          {/* Recent Entries */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Entries</h2>
            {moodEntries.map((entry) => (
              <Card key={entry.date} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getMoodEmoji(entry.mood)}</span>
                    <div>
                      <div className="font-medium">{new Date(entry.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-600 capitalize">{entry.mood}</div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>Energy: {entry.energy}/10</div>
                    <div>Stress: {entry.stress}/10</div>
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-gray-700 mb-2">{entry.notes}</p>
                )}
                {entry.activities.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {entry.activities.map((activity, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {activity}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Progress View */
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{moodEntries.length}</div>
              <div className="text-sm text-gray-600">Total Entries</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">
                {getAverageMood().toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Average Mood</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">7</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </Card>
          </div>

          {/* Weekly Overview */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              This Week's Overview
            </h2>
            <div className="space-y-4">
              {getWeeklyProgress().map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium">{day.date}</div>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-12">Mood:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getMoodColor(moodEntries[index]?.mood || 'neutral')}`}
                          style={{ width: `${((day.mood + 1) / moods.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-16">Energy:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-yellow-400"
                          style={{ width: `${(day.energy / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-12">Stress:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-red-400"
                          style={{ width: `${(day.stress / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Insights */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Insights & Patterns
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">💡 Mood Boosters</h3>
                <p className="text-sm text-blue-700">
                  You tend to feel better on days when you exercise and meditate. Try to maintain these activities!
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-900 mb-2">⚠️ Stress Patterns</h3>
                <p className="text-sm text-yellow-700">
                  Your stress levels tend to be higher on weekdays. Consider implementing more stress-relief techniques during work hours.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">🎯 Weekly Goal</h3>
                <p className="text-sm text-green-700">
                  Aim for 5 more mood entries this week to unlock the "Consistent Tracker" achievement!
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}