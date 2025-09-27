-- MindfulCampus Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Mood tracking table
CREATE TABLE IF NOT EXISTS mood_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  mood_level INT NOT NULL CHECK (mood_level >= 1 AND mood_level <= 10),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Journal entries table
CREATE TABLE IF NOT EXISTS journal_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  mood VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Breathing exercise sessions
CREATE TABLE IF NOT EXISTS breathing_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  exercise_type VARCHAR(100) NOT NULL,
  duration_minutes INT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Game scores and achievements
CREATE TABLE IF NOT EXISTS game_scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  game_name VARCHAR(100) NOT NULL,
  score INT NOT NULL,
  level_reached INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User achievements
CREATE TABLE IF NOT EXISTS achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  achievement_type VARCHAR(100) NOT NULL,
  achievement_name VARCHAR(255) NOT NULL,
  description TEXT,
  unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Appointment reminders
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  appointment_date DATETIME NOT NULL,
  reminder_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_mood_entries_user_date ON mood_entries(user_id, created_at);
CREATE INDEX idx_journal_entries_user_date ON journal_entries(user_id, created_at);
CREATE INDEX idx_breathing_sessions_user_date ON breathing_sessions(user_id, created_at);
CREATE INDEX idx_game_scores_user_game ON game_scores(user_id, game_name, score DESC);
CREATE INDEX idx_achievements_user ON achievements(user_id, achievement_type);
CREATE INDEX idx_appointments_user_date ON appointments(user_id, appointment_date);


