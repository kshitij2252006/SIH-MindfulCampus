import { Heart, Users, Shield, Target } from "lucide-react";

export function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Heart className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-900">About MindfulCampus</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A comprehensive MindfulCampus companion designed to support your emotional well-being through evidence-based tools and resources.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To provide accessible, evidence-based MindfulCampus tools that empower individuals to take control of their emotional well-being and build resilience in their daily lives.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Our Vision</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            A world where mental health support is accessible to everyone, stigma-free, and integrated seamlessly into daily life through technology and community.
          </p>
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="text-3xl mb-2">🧘</div>
            <h3 className="font-semibold text-gray-900">Self-Help Tools</h3>
            <p className="text-sm text-gray-600">Breathing exercises, journaling, and stress relief activities</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Mood Tracking</h3>
            <p className="text-sm text-gray-600">Visual progress tracking and emotional awareness tools</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl mb-2">🤝</div>
            <h3 className="font-semibold text-gray-900">Support Network</h3>
            <p className="text-sm text-gray-600">Crisis support and peer connection features</p>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Privacy & Security</h2>
        </div>
        <div className="space-y-3 text-gray-600">
          <p>🔒 Your data is encrypted and stored securely</p>
          <p>👤 Anonymous options available for sensitive features</p>
          <p>🚫 We never share personal information without consent</p>
          <p>🛡️ All communications are confidential and secure</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-center space-y-4 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
        <p className="text-gray-600">
          If you're experiencing a mental health crisis, please contact emergency services or visit our Crisis Support section for immediate help.
        </p>
        <div className="text-sm text-gray-500">
          Version 1.0 • Built with care for mental wellness
        </div>
      </div>
    </div>
  );
}