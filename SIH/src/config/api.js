// API Configuration for Frontend
// Copy this configuration to your frontend project

const API_CONFIG = {
  // Development (local)
  development: {
    BASE_URL: 'http://localhost:5000',
    API_URL: 'http://localhost:5000/api'
  },
  
  // Production (replace with your actual backend URL)
  production: {
    BASE_URL: 'https://your-backend-url.railway.app', // Replace with actual URL
    API_URL: 'https://your-backend-url.railway.app/api' // Replace with actual URL
  }
};

// Automatically detect environment
const environment = process.env.NODE_ENV || 'development';
export const API_BASE_URL = API_CONFIG[environment].BASE_URL;
export const API_URL = API_CONFIG[environment].API_URL;

// API Endpoints
export const ENDPOINTS = {
  // Authentication
  REGISTER: '/register',
  LOGIN: '/login',
  PROFILE: '/profile',
  
  // User Management
  USER: '/user',
  
  // Health Check
  HEALTH: '/health'
};

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  
  return response.json();
};

export default API_CONFIG;