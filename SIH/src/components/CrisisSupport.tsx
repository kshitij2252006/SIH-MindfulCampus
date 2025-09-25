import { Phone, MessageSquare, Globe, Clock, AlertTriangle, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function CrisisSupport() {
  const emergencyContacts = [
    {
      name: "Vandrevala Foundation Helpline",
      number: "+91 99996 66555",
      description: "24/7 free and confidential mental health support",
      available: "24/7",
      country: "India"
    },
    {
      name: "KIRAN Mental Health Helpline",
      number: "1800-599-0019",
      description: "Government of India mental health helpline",
      available: "24/7",
      country: "India"
    },
    {
      name: "Sneha India Foundation",
      number: "+91 44 2464 0050",
      description: "Emotional support and suicide prevention",
      available: "24/7",
      country: "India"
    },
    {
      name: "J&K Mental Health Support",
      number: "+91 194 245 0000",
      description: "Regional mental health support for Jammu & Kashmir",
      available: "24/7",
      country: "Jammu & Kashmir"
    }
  ];

  const internationalContacts = [
    { country: "Jammu", name: "GMC Jammu Psychiatry", number: "+91 191 257 4444", available: "24/7" },
    { country: "Srinagar", name: "SMHS Hospital Mental Health", number: "+91 194 240 1013", available: "24/7" },
    { country: "Ladakh", name: "SNM Hospital Leh", number: "+91 198 225 2014", available: "Mon-Sat 9am-5pm" },
    { country: "Kashmir", name: "District Hospital Anantnag", number: "+91 193 723 2168", available: "24/7" }
  ];

  const warningSignsCategories = [
    {
      title: "Emotional Signs",
      signs: [
        "Feeling hopeless or trapped",
        "Severe emotional pain or distress",
        "Feeling like a burden to others",
        "Extreme mood swings",
        "Feeling empty or numb"
      ]
    },
    {
      title: "Behavioral Signs", 
      signs: [
        "Talking about death or suicide",
        "Giving away possessions",
        "Withdrawing from friends and family",
        "Increased substance use",
        "Dramatic changes in routine"
      ]
    },
    {
      title: "Physical Signs",
      signs: [
        "Changes in sleep patterns",
        "Loss of appetite or overeating",
        "Lack of energy or fatigue",
        "Unexplained aches and pains",
        "Neglecting personal hygiene"
      ]
    }
  ];

  const selfCareStrategies = [
    {
      title: "Immediate Coping",
      strategies: [
        "Call someone you trust",
        "Remove any means of self-harm",
        "Go to a safe, public place",
        "Practice deep breathing",
        "Use grounding techniques (5-4-3-2-1)"
      ]
    },
    {
      title: "Building Support",
      strategies: [
        "Create a support network list",
        "Join a support group",
        "Consider professional therapy",
        "Develop a safety plan",
        "Practice regular self-care"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-red-100 rounded-full">
            <Heart className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Crisis Support & Help</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          You are not alone. Help is available 24/7. Your life matters and there are people who want to support you.
        </p>
      </div>

      {/* Emergency Alert */}
      <Card className="p-6 bg-red-50 border-red-200 border-2">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-red-900">If you are in immediate danger</h2>
            <p className="text-red-800">
              If you are having thoughts of suicide or are in immediate danger, please call emergency services 
              or go to your nearest emergency room right away.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-red-600 hover:bg-red-700">
                <Phone className="w-4 h-4 mr-2" />
                Call 100 (Police Emergency)
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <Phone className="w-4 h-4 mr-2" />
                Call 108 (Medical Emergency)
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                <Phone className="w-4 h-4 mr-2" />
                Call 1800-599-0019 (KIRAN)
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Crisis Hotlines */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">24/7 Crisis Hotlines</h2>
        <div className="grid gap-4">
          {emergencyContacts.map((contact, index) => (
            <Card key={index} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-gray-600">{contact.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {contact.available}
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {contact.country}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Phone className="w-4 h-4 mr-2" />
                    {contact.number}
                  </Button>
                  {contact.number.includes("Text") && (
                    <Button variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Text Support
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* International Resources */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Regional Mental Health Centers - J&K</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {internationalContacts.map((contact, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">{contact.country}</h3>
                  <span className="text-xs text-gray-500">{contact.available}</span>
                </div>
                <p className="text-sm text-gray-600">{contact.name}</p>
                <Button size="sm" variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  {contact.number}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Warning Signs */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Recognizing Warning Signs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {warningSignsCategories.map((category, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.signs.map((sign, signIndex) => (
                  <li key={signIndex} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    {sign}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* Coping Strategies */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Coping Strategies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {selfCareStrategies.map((category, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.title}</h3>
              <ul className="space-y-3">
                {category.strategies.map((strategy, strategyIndex) => (
                  <li key={strategyIndex} className="text-sm text-gray-700 flex items-start gap-3">
                    <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full text-xs font-medium flex items-center justify-center mt-0.5 flex-shrink-0">
                      ✓
                    </span>
                    {strategy}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* Safety Planning */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Create a Safety Plan</h2>
        <p className="text-blue-800 mb-4">
          A safety plan is a written plan that helps you stay safe when you're having thoughts of suicide. 
          It includes your personal warning signs, coping strategies, and people you can contact for help.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Download Safety Plan Template
        </Button>
      </Card>

      {/* Professional Help */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Finding Professional Help</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Types of Mental Health Professionals</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Psychiatrists - Can prescribe medication</li>
              <li>• Psychologists - Provide therapy and testing</li>
              <li>• Licensed Therapists - Provide counseling</li>
              <li>• Social Workers - Provide support and resources</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">How to Find Help</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Ask your primary care doctor for referrals</li>
              <li>• Contact your insurance company</li>
              <li>• Use online therapist directories</li>
              <li>• Call local mental health organizations</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Final Message */}
      <Card className="p-6 bg-green-50 border-green-200 text-center">
        <Heart className="w-8 h-8 text-green-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-green-900 mb-2">Remember</h2>
        <p className="text-green-800">
          Recovery is possible. Treatment works. You matter. There are people who care about you and want to help. 
          Taking the step to reach out for help takes courage, and you have that courage within you.
        </p>
      </Card>
    </div>
  );
}