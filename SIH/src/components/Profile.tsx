import { useState } from "react";
import { User, Edit3, Save, X, Calendar, Award, Target, Settings, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
  preferences: {
    reminderTime: string;
    favoriteExercise: string;
    privacyLevel: 'public' | 'private' | 'friends';
  };
  stats: {
    totalSessions: number;
    currentStreak: number;
    achievementsUnlocked: number;
    journalEntries: number;
  };
}

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Your name",
    email: "your.email@example.com",
    phone: "+91 your-phone-number",
    location: "INDIA",
    bio: "Mental wellness enthusiast focusing on mindfulness and personal growth. Enjoying the journey of self-discovery through meditation and journaling.",
    joinDate: "2025-10-10",
    preferences: {
      reminderTime: "09:00",
      favoriteExercise: "Box Breathing",
      privacyLevel: "private"
    },
    stats: {
      totalSessions: 0,
      currentStreak: 1,
      achievementsUnlocked: 0,
      journalEntries: 0
    }
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const recentAchievements = [
    { title: "First Breath", date: "2025-10-15", icon: "🏆" },
    { title: "Mood Tracker", date: "2025-10-20", icon: "🎯" },
    { title: "Journal Keeper", date: "2025-10-25", icon: "⭐" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/api/placeholder/80/80" alt={profile.name} />
              <AvatarFallback className="text-xl bg-blue-100 text-blue-600">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              {isEditing ? (
                <Input
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  className="text-2xl font-semibold mb-2 w-64"
                />
              ) : (
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">{profile.name}</h1>
              )}
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(profile.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Contact Information
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500" />
                {isEditing ? (
                  <Input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-gray-700">{profile.email}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500" />
                {isEditing ? (
                  <Input
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-gray-700">{profile.phone}</span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                {isEditing ? (
                  <Input
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                    className="flex-1"
                  />
                ) : (
                  <span className="text-gray-700">{profile.location}</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">About Me</h3>
            {isEditing ? (
              <Textarea
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                rows={4}
                className="resize-none"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">{profile.stats.totalSessions}</div>
          <div className="text-sm text-blue-700">Total Sessions</div>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{profile.stats.currentStreak}</div>
          <div className="text-sm text-green-700">Current Streak</div>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">{profile.stats.achievementsUnlocked}</div>
          <div className="text-sm text-yellow-700">Achievements</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">{profile.stats.journalEntries}</div>
          <div className="text-sm text-purple-700">Journal Entries</div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Recent Achievements
        </h3>
        <div className="space-y-3">
          {recentAchievements.map((achievement, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-xl">{achievement.icon}</span>
                <span className="font-medium text-gray-900">{achievement.title}</span>
              </div>
              <span className="text-sm text-gray-600">
                {new Date(achievement.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Preferences
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Default Reminder Time</label>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {profile.preferences.reminderTime}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Favorite Exercise</label>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {profile.preferences.favoriteExercise}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Privacy Level</label>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {profile.preferences.privacyLevel}
            </Badge>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Account Settings</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm">Change Password</Button>
          <Button variant="outline" size="sm">Export Data</Button>
          <Button variant="outline" size="sm">Privacy Settings</Button>
          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}