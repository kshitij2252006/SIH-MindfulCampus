import { useState } from "react";
import { Bell, Plus, Trash2, Clock, Calendar, Repeat } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";

interface Reminder {
  id: string;
  title: string;
  time: string;
  frequency: 'daily' | 'weekly' | 'custom';
  isActive: boolean;
  type: 'meditation' | 'mood-check' | 'breathing' | 'custom';
}

export function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Morning Meditation',
      time: '08:00',
      frequency: 'daily',
      isActive: true,
      type: 'meditation'
    },
    {
      id: '2',
      title: 'Mood Check-in',
      time: '18:00',
      frequency: 'daily',
      isActive: true,
      type: 'mood-check'
    },
    {
      id: '3',
      title: 'Breathing Exercise',
      time: '12:00',
      frequency: 'daily',
      isActive: false,
      type: 'breathing'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    time: '',
    frequency: 'daily' as const,
    type: 'custom' as const
  });

  const reminderTypes = [
    { value: 'meditation', label: '🧘 Meditation', color: 'bg-purple-100 text-purple-800' },
    { value: 'mood-check', label: '😊 Mood Check', color: 'bg-blue-100 text-blue-800' },
    { value: 'breathing', label: '🫁 Breathing', color: 'bg-green-100 text-green-800' },
    { value: 'custom', label: '⚡ Custom', color: 'bg-gray-100 text-gray-800' }
  ];

  const addReminder = () => {
    if (newReminder.title && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        title: newReminder.title,
        time: newReminder.time,
        frequency: newReminder.frequency,
        isActive: true,
        type: newReminder.type
      };
      setReminders([...reminders, reminder]);
      setNewReminder({ title: '', time: '', frequency: 'daily', type: 'custom' });
      setShowAddForm(false);
    }
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const getReminderTypeInfo = (type: string) => {
    return reminderTypes.find(t => t.value === type) || reminderTypes[3];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Reminders</h1>
            <p className="text-gray-600">Set up wellness reminders to stay on track</p>
          </div>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Reminder
        </Button>
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900">Create New Reminder</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Reminder Title</label>
              <Input
                placeholder="e.g., Morning meditation"
                value={newReminder.title}
                onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Time</label>
              <Input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <Select value={newReminder.type} onValueChange={(value: any) => setNewReminder({...newReminder, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reminderTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Frequency</label>
              <Select value={newReminder.frequency} onValueChange={(value: any) => setNewReminder({...newReminder, frequency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={addReminder}>Create Reminder</Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders set</h3>
            <p className="text-gray-600 mb-4">Create your first reminder to get started with wellness notifications</p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Reminder
            </Button>
          </div>
        ) : (
          reminders.map((reminder) => {
            const typeInfo = getReminderTypeInfo(reminder.type);
            return (
              <div key={reminder.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={reminder.isActive}
                      onCheckedChange={() => toggleReminder(reminder.id)}
                    />
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                      <div>
                        <h3 className="font-medium text-gray-900">{reminder.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {reminder.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Repeat className="w-3 h-3" />
                            {reminder.frequency}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">💡 Reminder Tips</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Set reminders at consistent times to build healthy habits</li>
          <li>• Start with 1-2 reminders and gradually add more as needed</li>
          <li>• Choose times when you're typically available and not rushed</li>
          <li>• Use different reminder types to maintain variety in your wellness routine</li>
        </ul>
      </div>
    </div>
  );
}