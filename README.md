# DevConnect

A full-stack MERN application for developers to create profiles, showcase skills, add projects, and connect with other developers.

## Features
- Authentication (JWT based)
- View Developer profiles and their skills
- Project management (CRUD operations)
- Dark modern UI

## Tech Stack
- Frontend: React.js (Vite), functional components, context API/hooks
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Utilities: JWT, bcrypt

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or a MongoDB Atlas URI

### Backend Setup

1. Navigate to the `backend` folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create the `.env` file (if not present) and add these variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/devconnect
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the backend development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the `frontend` folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

### Running Backend with Docker

To build and run the backend using Docker:

```bash
cd backend
docker build -t devconnect-backend .
docker run -p 5000:5000 -e PORT=5000 -e JWT_SECRET=your_secret devconnect-backend
```
## 👨‍💻 Author
Sonu Madhesiya
