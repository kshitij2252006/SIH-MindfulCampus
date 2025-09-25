import { useState } from "react";
import { Trophy, Star, Medal, Target, Calendar, Flame, Award, Lock } from "lucide-react";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  unlockedDate?: string;
  category: 'breathing' | 'mood' | 'journal' | 'streak' | 'milestone';
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Breath',
      description: 'Complete your first breathing exercise',
      icon: <Award className="w-6 h-6" />,
      progress: 0,
      maxProgress: 1,
      isUnlocked: false,
      unlockedDate: '2025-10-15',
      category: 'breathing',
      difficulty: 'bronze'
    },
    {
      id: '2',
      title: 'Breathing Master',
      description: 'Complete 50 breathing exercises',
      icon: <Medal className="w-6 h-6" />,
      progress: 0,
      maxProgress: 0,
      isUnlocked: false,
      category: 'breathing',
      difficulty: 'gold'
    },
    {
      id: '3',
      title: 'Mood Tracker',
      description: 'Log your mood for 7 consecutive days',
      icon: <Target className="w-6 h-6" />,
      progress: 0,
      maxProgress: 7,
      isUnlocked: false,
      category: 'mood',
      difficulty: 'silver'
    },
    {
      id: '4',
      title: 'Journal Keeper',
      description: 'Write 10 journal entries',
      icon: <Star className="w-6 h-6" />,
      progress: 0,
      maxProgress: 10,
      isUnlocked: false,
      category: 'journal',
      difficulty: 'bronze'
    },
    {
      id: '5',
      title: 'Wellness Warrior',
      description: 'Maintain a 30-day wellness streak',
      icon: <Flame className="w-6 h-6" />,
      progress: 0,
      maxProgress: 30,
      isUnlocked: false,
      category: 'streak',
      difficulty: 'platinum'
    },
    {
      id: '6',
      title: 'Milestone Achiever',
      description: 'Unlock 10 achievements',
      icon: <Trophy className="w-6 h-6" />,
      progress: 0,
      maxProgress: 10,
      isUnlocked: false,
      category: 'milestone',
      difficulty: 'gold'
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: '🏆' },
    { id: 'breathing', label: 'Breathing', icon: '🫁' },
    { id: 'mood', label: 'Mood', icon: '😊' },
    { id: 'journal', label: 'Journal', icon: '📝' },
    { id: 'streak', label: 'Streaks', icon: '🔥' },
    { id: 'milestone', label: 'Milestones', icon: '🎯' }
  ];

  const difficultyColors = {
    bronze: 'bg-amber-100 text-amber-800 border-amber-200',
    silver: 'bg-gray-100 text-gray-800 border-gray-200',
    gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    platinum: 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalPoints = achievements
    .filter(a => a.isUnlocked)
    .reduce((total, a) => total + (a.difficulty === 'bronze' ? 10 : a.difficulty === 'silver' ? 25 : a.difficulty === 'gold' ? 50 : 100), 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header & Stats */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
          <Trophy className="w-8 h-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-900">Achievements</h1>
        <p className="text-lg text-gray-600">Track your wellness journey and celebrate your progress</p>
        
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">{unlockedCount}</div>
            <div className="text-sm text-gray-600">Unlocked</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
            <div className="text-sm text-gray-600">Points</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round((unlockedCount / achievements.length) * 100)}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <div key={achievement.id} className={`bg-white p-6 rounded-xl border shadow-sm transition-all hover:shadow-md ${
            achievement.isUnlocked 
              ? 'border-green-200 bg-gradient-to-br from-green-50/50 to-white' 
              : 'border-gray-200'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${
                achievement.isUnlocked 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {achievement.isUnlocked ? achievement.icon : <Lock className="w-6 h-6" />}
              </div>
              <Badge variant="outline" className={difficultyColors[achievement.difficulty]}>
                {achievement.difficulty}
              </Badge>
            </div>

            <h3 className={`font-semibold mb-2 ${
              achievement.isUnlocked ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {achievement.title}
            </h3>
            
            <p className={`text-sm mb-4 ${
              achievement.isUnlocked ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {achievement.description}
            </p>

            {!achievement.isUnlocked && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">
                    {achievement.progress} / {achievement.maxProgress}
                  </span>
                </div>
                <Progress 
                  value={(achievement.progress / achievement.maxProgress) * 100} 
                  className="h-2"
                />
              </div>
            )}

            {achievement.isUnlocked && achievement.unlockedDate && (
              <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md">
                <Calendar className="w-3 h-3" />
                Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Achievement Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">🎯 How to Earn Achievements</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <p className="font-medium mb-2">🥉 Bronze (10 points)</p>
            <p>Complete basic activities and first-time actions</p>
          </div>
          <div>
            <p className="font-medium mb-2">🥈 Silver (25 points)</p>
            <p>Maintain short-term consistency and habits</p>
          </div>
          <div>
            <p className="font-medium mb-2">🥇 Gold (50 points)</p>
            <p>Achieve significant milestones and long-term goals</p>
          </div>
          <div>
            <p className="font-medium mb-2">🏆 Platinum (100 points)</p>
            <p>Master advanced challenges and exceptional dedication</p>
          </div>
        </div>
      </div>
    </div>
  );
}