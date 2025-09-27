import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const app = express();

// CORS Configuration for production
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "http://localhost:3000",
    "https://*.netlify.app",
    "https://*.vercel.app"
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Security headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

const SECRET_KEY = process.env.JWT_SECRET || "fallback_secret_key_change_in_production";

// Enhanced database connection with retry logic
const createDBConnection = () => {
  const dbConfig = {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "mindfulcampus_db",
    port: Number(process.env.DB_PORT || 3306),
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
  };

  const connection = mysql.createConnection(dbConfig);
  
  connection.connect((err) => {
    if (err) {
      console.error("Database connection failed:", err.message);
      setTimeout(createDBConnection, 2000);
    } else {
      console.log("MySQL Connected Successfully!");
      // Create tables if they don't exist
      initializeDatabase(connection);
    }
  });

  connection.on('error', (err) => {
    console.error('Database error:', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      createDBConnection();
    } else {
      throw err;
    }
  });

  return connection;
};

// Initialize database tables
const initializeDatabase = (db) => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.query(createUsersTable, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Database tables initialized successfully");
    }
  });
};

const db = createDBConnection();

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "MindfulCampus Backend API",
    status: "running",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok",
    database: "connected",
    timestamp: new Date().toISOString()
  });
});

// Register route with enhanced validation
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
  
  // Input validation
  if (!username || !email || !password) {
    return res.status(400).json({ 
      error: "Missing required fields",
      required: ["username", "email", "password"]
    });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ 
      error: "Password must be at least 6 characters long" 
    });
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ 
      error: "Invalid email format" 
    });
  }
  
  if (username.length < 3) {
    return res.status(400).json({ 
      error: "Username must be at least 3 characters long" 
    });
  }
  
  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Server error during registration" });
    }
    if (result.length > 0) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    bcrypt.hash(password, 12, (err, hash) => {
      if (err) {
        console.error("Bcrypt error:", err);
        return res.status(500).json({ error: "Error processing password" });
      }
      const sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
      db.query(sql, [username, email, hash], (err, result) => {
        if (err) {
          console.error("Database insert error:", err);
          return res.status(500).json({ error: "Error creating user account" });
        }
        res.status(201).json({ 
          message: "User registered successfully",
          userId: result.insertId,
          username: username
        });
      });
    });
  });
});

// Login route with enhanced security
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  
  // Input validation
  if (!email || !password) {
    return res.status(400).json({ 
      error: "Email and password are required" 
    });
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ 
      error: "Invalid email format" 
    });
  }
  
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Server error during login" });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result[0];
    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) {
        console.error("Bcrypt compare error:", err);
        return res.status(500).json({ error: "Error during authentication" });
      }
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email, 
          username: user.username 
        },
        SECRET_KEY,
        { expiresIn: "24h" }
      );
      
      res.json({ 
        message: "Login successful", 
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    });
  });
});

// JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

// Protected routes
app.get("/api/profile", authenticateToken, (req, res) => {
  res.json({ 
    message: "Profile accessed successfully", 
    user: req.user 
  });
});

app.get("/api/user/:id", authenticateToken, (req, res) => {
  const userId = req.params.id;
  
  // Users can only access their own profile
  if (req.user.id !== parseInt(userId)) {
    return res.status(403).json({ error: "Access denied" });
  }
  
  const sql = "SELECT id, username, email, created_at FROM users WHERE id = ?";
  
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: result[0] });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Start server
const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => {
  console.log(`🚀 MindfulCampus Backend Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  db.end();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  db.end();
  process.exit(0);
});