import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = process.env.JWT_SECRET || "my_super_secret_key_123"; // use env variable in production

// Connect to MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "your_mysql_password",
  database: process.env.DB_NAME || "your_mysql_database",
  port: Number(process.env.DB_PORT || 3306)
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Register route
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
  
  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Server error" });
    }
    if (result.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error("Bcrypt error:", err);
        return res.status(500).json({ error: "Error hashing password" });
      }
      const sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
      db.query(sql, [username, email, hash], (err, result) => {
        if (err) {
          console.error("Database insert error:", err);
          return res.status(500).json({ error: "Error saving user" });
        }
        res.status(201).json({ 
          message: "User registered successfully",
          userId: result.insertId 
        });
      });
    });
  });
});

// Login route with JWT
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
      return res.status(500).json({ error: "Server error" });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = result[0];
    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) {
        console.error("Bcrypt compare error:", err);
        return res.status(500).json({ error: "Error checking password" });
      }
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
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
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Protected route
app.get("/api/profile", authenticateToken, (req, res) => {
  res.json({ 
    message: "This is a protected route", 
    user: req.user 
  });
});

// Add a route to get user details by ID
app.get("/api/user/:id", authenticateToken, (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT id, username, email FROM users WHERE id = ?";
  
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

// Serve frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.join(__dirname, "build");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

const PORT = Number(process.env.PORT || 5000);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
