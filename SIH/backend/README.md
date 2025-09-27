# MindfulCampus Backend API

Node.js/Express backend for the MindfulCampus mental health application.

## Features

- 🔐 User Authentication (Register/Login)
- 🗄️ MySQL Database Integration
- 🔑 JWT Token-based Authorization
- 🛡️ Security Headers & CORS Protection
- 🔄 Health Check Endpoints
- 📊 Production-ready Configuration

## API Endpoints

### Public Endpoints
- `GET /` - API Information
- `GET /api/health` - Health Check
- `POST /api/register` - User Registration
- `POST /api/login` - User Login

### Protected Endpoints (Require JWT Token)
- `GET /api/profile` - Get User Profile
- `GET /api/user/:id` - Get User Details

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key
DB_HOST=your_mysql_host
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=mindfulcampus_db
DB_PORT=3306
FRONTEND_URL=https://your-frontend-url.netlify.app
```

## Deployment Options

### Option 1: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the backend folder
4. Add MySQL database service
5. Configure environment variables
6. Deploy!

### Option 2: Render
1. Go to [render.com](https://render.com)
2. Create new web service
3. Connect your GitHub repository
4. Set root directory to `backend`
5. Configure environment variables
6. Deploy!

### Option 3: Heroku
1. Install Heroku CLI
2. Create new app: `heroku create mindfulcampus-api`
3. Add MySQL addon: `heroku addons:create jawsdb:kitefin`
4. Configure environment variables
5. Deploy: `git push heroku main`

## Database Setup

The application automatically creates the required tables:

```sql
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file with your configuration

3. Start development server:
   ```bash
   npm run dev
   ```

4. Server runs on http://localhost:5000

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT tokens with expiration
- Input validation and sanitization
- CORS protection
- SQL injection prevention
- Error handling middleware

## Health Monitoring

- Health check endpoint: `/api/health`
- Database connection monitoring
- Automatic reconnection on failure
- Graceful shutdown handling