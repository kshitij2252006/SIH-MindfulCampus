import { useState } from "react";
import { Search, BookOpen, Play, Image, ExternalLink, Clock, Star } from "lucide-react";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'infographic';
  category: string;
  readTime?: string;
  videoLength?: string;
  rating: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  url?: string;
}

export function Resources() {
  const [currentView, setCurrentView] = useState<'all' | 'articles' | 'videos' | 'infographics'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Understanding Anxiety: A Beginner\'s Guide',
      description: 'Learn about the science behind anxiety and practical strategies for managing symptoms in daily life.',
      type: 'article',
      category: 'anxiety',
      readTime: '8 min read',
      rating: 4.8,
      difficulty: 'beginner',
      tags: ['anxiety', 'coping', 'science'],
      url: '#'
    },
    {
      id: '2',
      title: 'Progressive Muscle Relaxation Technique',
      description: 'A step-by-step video guide to progressive muscle relaxation for reducing physical tension and stress.',
      type: 'video',
      category: 'relaxation',
      videoLength: '12 min',
      rating: 4.9,
      difficulty: 'beginner',
      tags: ['relaxation', 'technique', 'stress'],
      url: '#'
    },
    {
      id: '3',
      title: 'The Stress Response Cycle',
      description: 'Visual breakdown of how stress affects your body and mind, with tips for completing the stress cycle.',
      type: 'infographic',
      category: 'stress',
      rating: 4.7,
      difficulty: 'intermediate',
      tags: ['stress', 'physiology', 'visualization'],
      url: '#'
    },
    {
      id: '4',
      title: 'Building Resilience Through Daily Habits',
      description: 'Research-backed strategies for developing emotional resilience and bouncing back from challenges.',
      type: 'article',
      category: 'resilience',
      readTime: '12 min read',
      rating: 4.9,
      difficulty: 'intermediate',
      tags: ['resilience', 'habits', 'research'],
      url: '#'
    },
    {
      id: '5',
      title: 'Mindful Breathing for Sleep',
      description: 'A gentle guided practice to help you unwind and prepare for restful sleep using breathing techniques.',
      type: 'video',
      category: 'sleep',
      videoLength: '15 min',
      rating: 4.8,
      difficulty: 'beginner',
      tags: ['sleep', 'breathing', 'mindfulness'],
      url: '#'
    },
    {
      id: '6',
      title: 'Cognitive Distortions Quick Reference',
      description: 'Handy visual guide to identifying and challenging common negative thought patterns.',
      type: 'infographic',
      category: 'cognitive',
      rating: 4.6,
      difficulty: 'beginner',
      tags: ['thoughts', 'CBT', 'reference'],
      url: '#'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Topics' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'stress', label: 'Stress Management' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'resilience', label: 'Resilience' },
    { value: 'cognitive', label: 'Cognitive Health' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesView = currentView === 'all' || resource.type === currentView;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesView && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen className="w-4 h-4" />;
      case 'video': return <Play className="w-4 h-4" />;
      case 'infographic': return <Image className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Mental Health Resources</h1>
        <p className="text-gray-600">Curated articles, videos, and guides to support your mental wellness journey</p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Resources', count: resources.length },
            { key: 'articles', label: 'Articles', count: resources.filter(r => r.type === 'article').length },
            { key: 'videos', label: 'Videos', count: resources.filter(r => r.type === 'video').length },
            { key: 'infographics', label: 'Infographics', count: resources.filter(r => r.type === 'infographic').length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setCurrentView(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === tab.key
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Featured Resource */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-lg">
            <Star className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <Badge className="mb-2 bg-blue-100 text-blue-800">Featured</Badge>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Mental Health First Aid Guide</h3>
            <p className="text-gray-700 mb-4">
              A comprehensive guide covering how to recognize mental health challenges in yourself and others, 
              when to seek help, and how to provide initial support in crisis situations.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Read Guide
            </Button>
          </div>
        </div>
      </Card>

      {/* Resources Grid */}
      <div className="grid gap-6">
        {filteredResources.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No resources match your search criteria. Try adjusting your filters.
          </div>
        ) : (
          filteredResources.map((resource) => (
            <Card key={resource.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star className="w-4 h-4 fill-current" />
                      {resource.rating}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">{resource.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={getDifficultyColor(resource.difficulty)}>
                      {resource.difficulty}
                    </Badge>
                    {resource.readTime && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {resource.readTime}
                      </Badge>
                    )}
                    {resource.videoLength && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {resource.videoLength}
                      </Badge>
                    )}
                    {resource.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex lg:flex-col gap-2">
                  <Button className="flex-1 lg:flex-none">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {resource.type === 'video' ? 'Watch' : 'Read'}
                  </Button>
                  <Button variant="outline" className="flex-1 lg:flex-none">
                    Save
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Quick Access Links */}
      <Card className="p-6 bg-gray-50">
        <h2 className="font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Crisis Resources', emoji: '🚨', category: 'emergency' },
            { title: 'Sleep Help', emoji: '😴', category: 'sleep' },
            { title: 'Anxiety Support', emoji: '💙', category: 'anxiety' },
            { title: 'Stress Relief', emoji: '🧘', category: 'stress' }
          ].map((link, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(link.category)}
              className="p-4 bg-white rounded-lg border hover:border-blue-300 transition-colors text-center"
            >
              <div className="text-2xl mb-2">{link.emoji}</div>
              <div className="text-sm font-medium">{link.title}</div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}