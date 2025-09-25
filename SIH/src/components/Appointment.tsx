import { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Mail, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

interface Provider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  image: string;
  availability: string[];
  location: string;
  phone: string;
  email: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Appointment {
  id: string;
  providerId: string;
  providerName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

const providers: Provider[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    specialty: 'Clinical Psychologist',
    rating: 4.9,
    experience: '12+ years',
    image: '👩‍⚕️',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    location: 'Srinagar Mental Health Center, Jammu & Kashmir',
    phone: '+91 9419-123-456',
    email: 'priya.sharma@srinagarwellness.in'
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    specialty: 'Psychiatrist',
    rating: 4.8,
    experience: '15+ years',
    image: '👨‍⚕️',
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    location: 'Government Medical College, Jammu',
    phone: '+91 9419-234-567',
    email: 'rajesh.kumar@gmcjammu.gov.in'
  },
  {
    id: '3',
    name: 'Dr. Sunita Devi',
    specialty: 'Therapist (LMFT)',
    rating: 4.9,
    experience: '8+ years',
    image: '👩‍💼',
    availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    location: 'Kashmir Valley Therapy Center, Srinagar',
    phone: '+91 9419-345-678',
    email: 'sunita.devi@kvtc.in'
  },
  {
    id: '4',
    name: 'Dr. Mohit Singh',
    specialty: 'Addiction Counselor',
    rating: 4.7,
    experience: '10+ years',
    image: '👨‍💼',
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    location: 'Jammu De-Addiction Center, Jammu',
    phone: '+91 9419-456-789',
    email: 'mohit.singh@jdac.org.in'
  }
];

const timeSlots: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: false },
  { time: '4:00 PM', available: true },
  { time: '5:00 PM', available: true }
];

const appointmentTypes = [
  'Initial Consultation',
  'Follow-up Session',
  'Therapy Session',
  'Medication Review',
  'Group Session',
  'Emergency Consultation'
];

export function Appointment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    emergencyContact: '',
    insurance: ''
  });

  // Generate calendar dates for current month
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDates, setCalendarDates] = useState<Date[]>([]);

  useEffect(() => {
    generateCalendarDates();
  }, [currentDate]);

  const generateCalendarDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const dates: Date[] = [];

    // Add previous month's trailing dates
    const startDayOfWeek = firstDay.getDay();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      dates.push(new Date(year, month, -i));
    }

    // Add current month's dates
    for (let day = 1; day <= lastDay.getDate(); day++) {
      dates.push(new Date(year, month, day));
    }

    // Add next month's leading dates
    const endDayOfWeek = lastDay.getDay();
    for (let i = 1; i <= 6 - endDayOfWeek; i++) {
      dates.push(new Date(year, month + 1, i));
    }

    setCalendarDates(dates);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const handleProviderSelect = (provider: Provider) => {
    setSelectedProvider(provider);
    setCurrentStep(2);
  };

  const handleDateSelect = (date: Date) => {
    if (date < new Date()) return; // Prevent selecting past dates
    setSelectedDate(date);
    setCurrentStep(3);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep(4);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProvider || !selectedDate || !selectedTime || !appointmentType) {
      toast.error('Please complete all required fields');
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
      date: selectedDate.toDateString(),
      time: selectedTime,
      type: appointmentType,
      status: 'scheduled',
      notes: bookingData.notes
    };

    setAppointments(prev => [...prev, newAppointment]);
    toast.success('Appointment booked successfully!');
    
    // Reset form
    setCurrentStep(1);
    setSelectedProvider(null);
    setSelectedDate(null);
    setSelectedTime('');
    setAppointmentType('');
    setShowBookingForm(false);
    setBookingData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      notes: '',
      emergencyContact: '',
      insurance: ''
    });
  };

  const cancelAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' as const }
          : apt
      )
    );
    toast.success('Appointment cancelled successfully');
  };

  const isDateAvailable = (date: Date) => {
    if (!selectedProvider) return false;
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return selectedProvider.availability.includes(dayName) && date >= new Date();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Book Your Appointment
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Schedule a session with our qualified MindfulCampus professionals. Choose from our experienced team of therapists, psychologists, and counselors.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                currentStep >= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-12 h-1 mx-2 rounded transition-colors ${
                  currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[500px]">
        {/* Step 1: Select Provider */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Choose Your Provider</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {providers.map((provider) => (
                <Card 
                  key={provider.id}
                  className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300"
                  onClick={() => handleProviderSelect(provider)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{provider.image}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">{provider.name}</h3>
                      <p className="text-blue-600 font-medium">{provider.specialty}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 ml-1">{provider.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{provider.experience}</span>
                      </div>
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {provider.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {provider.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {provider.email}
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-500">Available: {provider.availability.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Date */}
        {currentStep === 2 && selectedProvider && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Select Date</h2>
              <p className="text-gray-600">Booking with {selectedProvider.name}</p>
            </div>
            
            <Card className="max-w-lg mx-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => navigateMonth('prev')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button 
                  onClick={() => navigateMonth('next')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDates.map((date, index) => {
                  const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                  const isAvailable = isDateAvailable(date);
                  const isToday = date.toDateString() === new Date().toDateString();
                  
                  return (
                    <button
                      key={index}
                      onClick={() => isAvailable ? handleDateSelect(date) : null}
                      disabled={!isAvailable}
                      className={`p-2 text-sm rounded-lg transition-all ${
                        !isCurrentMonth 
                          ? 'text-gray-300 cursor-not-allowed'
                          : isAvailable
                            ? 'hover:bg-blue-100 text-gray-700 cursor-pointer'
                            : 'text-gray-300 cursor-not-allowed'
                      } ${
                        isToday ? 'ring-2 ring-blue-400' : ''
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </Card>

            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(1)}
                className="mr-4"
              >
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Select Time */}
        {currentStep === 3 && selectedDate && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Select Time</h2>
              <p className="text-gray-600">{formatDate(selectedDate)}</p>
            </div>

            <Card className="max-w-lg mx-auto p-6">
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available ? handleTimeSelect(slot.time) : null}
                    disabled={!slot.available}
                    className={`p-3 rounded-lg border transition-all ${
                      slot.available
                        ? 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700'
                        : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Clock className="w-4 h-4 inline mr-2" />
                    {slot.time}
                  </button>
                ))}
              </div>
            </Card>

            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(2)}
              >
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Appointment Details & Booking */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Complete Your Booking</h2>
              <p className="text-gray-600">
                {selectedProvider?.name} • {selectedDate && formatDate(selectedDate)} • {selectedTime}
              </p>
            </div>

            <Card className="max-w-2xl mx-auto p-6">
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={bookingData.firstName}
                      onChange={(e) => setBookingData(prev => ({...prev, firstName: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={bookingData.lastName}
                      onChange={(e) => setBookingData(prev => ({...prev, lastName: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={bookingData.email}
                      onChange={(e) => setBookingData(prev => ({...prev, email: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={bookingData.phone}
                      onChange={(e) => setBookingData(prev => ({...prev, phone: e.target.value}))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="appointmentType">Appointment Type *</Label>
                  <Select value={appointmentType} onValueChange={setAppointmentType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="insurance">Insurance Provider</Label>
                    <Input
                      id="insurance"
                      placeholder="e.g., Blue Cross, Aetna"
                      value={bookingData.insurance}
                      onChange={(e) => setBookingData(prev => ({...prev, insurance: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      placeholder="Name and phone number"
                      value={bookingData.emergencyContact}
                      onChange={(e) => setBookingData(prev => ({...prev, emergencyContact: e.target.value}))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific concerns or information you'd like to share..."
                    className="h-24"
                    value={bookingData.notes}
                    onChange={(e) => setBookingData(prev => ({...prev, notes: e.target.value}))}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setCurrentStep(3)}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Book Appointment
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>

      {/* Upcoming Appointments */}
      {appointments.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Your Appointments</h2>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{appointment.providerName}</h3>
                    <p className="text-gray-600">{appointment.type}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {appointment.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {appointment.time}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'scheduled' 
                          ? 'bg-green-100 text-green-800'
                          : appointment.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    {appointment.notes && (
                      <p className="text-sm text-gray-600 mt-2">Notes: {appointment.notes}</p>
                    )}
                  </div>
                  {appointment.status === 'scheduled' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cancelAppointment(appointment.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}