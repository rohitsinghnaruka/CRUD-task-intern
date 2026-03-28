# 🚀 TaskFlow — Scalable REST API with Auth & CRUD

A full-stack task management application built with **Express.js (MVC)** backend and **React (Vite)** frontend, featuring JWT authentication, role-based access control, and comprehensive CRUD operations.

## 📁 Project Structure

```
CRUD-task/
├── backend/                  # Express.js REST API
│   ├── src/
│   │   ├── config/           # Database & environment config
│   │   ├── controllers/      # Route handlers (business logic)
│   │   ├── middleware/        # Auth, roles, validation, errors
│   │   ├── models/           # Mongoose schemas (User, Task)
│   │   ├── routes/v1/        # Versioned API routes
│   │   ├── validators/       # Input validation schemas
│   │   ├── utils/            # Helper functions
│   │   └── app.js            # Express app setup
│   ├── server.js             # Entry point
│   ├── swagger.js            # OpenAPI/Swagger config
│   └── .env.example          # Environment variables template
│
├── frontend/                 # React (Vite) SPA
│   ├── src/
│   │   ├── api/              # Axios instance & API functions
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # Auth state management
│   │   └── pages/            # Page components
│   ├── index.html
│   └── vite.config.js
│
├── README.md                 # This file
└── SCALABILITY.md            # Scalability & deployment notes
```

## 🛠️ Tech Stack

| Layer        | Technology                           |
|-------------|--------------------------------------|
| **Runtime**     | Node.js 18+                          |
| **Backend**     | Express.js 4                         |
| **Database**    | MongoDB (Mongoose ODM)               |
| **Auth**        | JWT (jsonwebtoken) + bcryptjs        |
| **Validation**  | express-validator                    |
| **API Docs**    | swagger-jsdoc + swagger-ui-express   |
| **Security**    | Helmet, CORS, express-rate-limit     |
| **Frontend**    | React 18 (Vite)                      |
| **HTTP Client** | Axios                                |
| **Routing**     | React Router v6                      |
| **Notifications** | react-hot-toast                   |

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ installed
- **MongoDB** running locally (or MongoDB Atlas URI)

### 1. Clone & Setup

```bash
git clone <your-repo-url>
cd CRUD-task
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run dev
```

The backend will start at **http://localhost:5000**

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start at **http://localhost:5173**

### 4. API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:5000/api-docs
- **Health Check**: http://localhost:5000/api/health

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/v1/auth/register` | Public | Register new user |
| `POST` | `/api/v1/auth/login` | Public | Login & get JWT |
| `GET` | `/api/v1/auth/profile` | Protected | Get current user |

### Tasks (CRUD)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/v1/tasks` | Protected | List tasks (filtered, paginated) |
| `POST` | `/api/v1/tasks` | Protected | Create a task |
| `GET` | `/api/v1/tasks/:id` | Protected | Get single task |
| `PUT` | `/api/v1/tasks/:id` | Protected | Update a task |
| `DELETE` | `/api/v1/tasks/:id` | Protected | Delete a task |

### Admin
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/api/v1/admin/users` | Admin Only | List all users |

### Query Parameters (GET /tasks)
- `status` — Filter by status: `pending`, `in-progress`, `completed`
- `priority` — Filter by priority: `low`, `medium`, `high`
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 10, max: 100)
- `sortBy` — Sort field (default: `createdAt`)
- `order` — Sort order: `asc` or `desc`

## 🗃️ Database Schema

### User
```javascript
{
  name: String,          // 2-50 chars, required
  email: String,         // unique, lowercase
  password: String,      // hashed with bcrypt (12 rounds)
  role: String,          // 'user' | 'admin', default: 'user'
  createdAt: Date,
  updatedAt: Date
}
```

### Task
```javascript
{
  title: String,         // 2-100 chars, required
  description: String,   // max 500 chars
  status: String,        // 'pending' | 'in-progress' | 'completed'
  priority: String,      // 'low' | 'medium' | 'high'
  dueDate: Date,         // optional
  user: ObjectId,        // ref: User (task owner)
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Authentication**: Secure token-based auth with configurable expiry
- **Role-Based Access**: User vs Admin separation
- **Input Validation**: All inputs sanitized via express-validator
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Security Headers**: Helmet middleware for HTTP headers
- **CORS**: Configured for frontend origin
- **Request Size Limit**: 10KB JSON body limit

## 🎨 Frontend Features

- **Modern Dark UI** with glassmorphism design
- **JWT Auth Flow**: Register → Login → Protected Dashboard
- **Task Dashboard**: Stats, filters, pagination, CRUD operations
- **Admin Panel**: User management table (admin role only)
- **Toast Notifications**: Success/error feedback for all API calls
- **Responsive Design**: Mobile-friendly layout
- **Animations**: Smooth transitions and micro-interactions

## 📄 Environment Variables

```env
PORT=5000                    # Server port
NODE_ENV=development         # Environment
MONGO_URI=mongodb://...      # MongoDB connection string
JWT_SECRET=your_secret       # JWT signing key
JWT_EXPIRES_IN=7d            # Token expiry
```

## 👨‍💻 Author

**Rohit Singh Naruka**

## 📝 License

ISC
