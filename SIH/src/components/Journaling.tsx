import { useState } from "react";
import { Plus, Search, Calendar, Trash2, Edit3 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: string;
  tags: string[];
}

export function Journaling() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      title: "Morning Reflection",
      content: "Today I woke up feeling grateful for the small moments of peace in my daily routine. The breathing exercises from yesterday really helped me sleep better.",
      date: "2024-12-03",
      mood: "grateful",
      tags: ["morning", "gratitude", "sleep"]
    },
    {
      id: "2", 
      title: "Stress at Work",
      content: "Had a challenging presentation today. Used the 4-7-8 breathing technique before going in and it really helped calm my nerves. I'm learning to be kind to myself during difficult moments.",
      date: "2024-12-02",
      mood: "anxious",
      tags: ["work", "stress", "coping"]
    }
  ]);

  const [isWriting, setIsWriting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "",
    tags: ""
  });

  const prompts = [
    "What am I grateful for today?",
    "How did I handle stress today?",
    "What made me smile recently?",
    "What challenge did I overcome?",
    "How am I taking care of myself?",
    "What positive changes am I noticing?",
    "What would I tell a friend in my situation?",
    "What are three things that went well today?"
  ];

  const moodOptions = [
    { value: "happy", emoji: "😊", color: "text-yellow-500" },
    { value: "calm", emoji: "😌", color: "text-blue-500" },
    { value: "grateful", emoji: "🙏", color: "text-green-500" },
    { value: "anxious", emoji: "😰", color: "text-orange-500" },
    { value: "sad", emoji: "😢", color: "text-gray-500" },
    { value: "angry", emoji: "😠", color: "text-red-500" },
    { value: "neutral", emoji: "😐", color: "text-gray-400" }
  ];

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSaveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      date: new Date().toISOString().split('T')[0],
      mood: newEntry.mood,
      tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    setEntries([entry, ...entries]);
    setNewEntry({ title: "", content: "", mood: "", tags: "" });
    setIsWriting(false);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const getMoodEmoji = (mood: string) => {
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption ? moodOption.emoji : "😐";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Personal Journal</h1>
        <p className="text-gray-600">Express your thoughts, track your progress, and reflect on your journey</p>
      </div>

      {/* Writing Prompts */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h2 className="font-semibold text-blue-900 mb-3">💭 Writing Prompts</h2>
        <div className="grid md:grid-cols-2 gap-2">
          {prompts.slice(0, 4).map((prompt, index) => (
            <button
              key={index}
              onClick={() => {
                setNewEntry(prev => ({ ...prev, content: prompt + "\n\n" }));
                setIsWriting(true);
              }}
              className="text-left p-3 bg-white rounded-lg border hover:border-blue-300 transition-colors text-sm"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setIsWriting(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Entry
        </Button>
      </div>

      {/* Writing Interface */}
      {isWriting && (
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold mb-4">New Journal Entry</h2>
          <div className="space-y-4">
            <Input
              placeholder="Entry title..."
              value={newEntry.title}
              onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">How are you feeling?</label>
                <div className="flex flex-wrap gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setNewEntry(prev => ({ ...prev, mood: mood.value }))}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        newEntry.mood === mood.value 
                          ? 'bg-blue-100 border-blue-300' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {mood.emoji} {mood.value}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Tags (comma separated)</label>
                <Input
                  placeholder="gratitude, work, family..."
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
                />
              </div>
            </div>

            <Textarea
              placeholder="What's on your mind today? Take your time and write freely..."
              value={newEntry.content}
              onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
              rows={8}
              className="resize-none"
            />

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setIsWriting(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEntry}>
                Save Entry
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchTerm ? "No entries match your search." : "No journal entries yet. Start writing to track your thoughts and progress!"}
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-900">{entry.title}</h3>
                  <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(entry.date).toLocaleDateString()}
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-3">{entry.content}</p>
              
              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}