# 🧠 Task Manager – Fullstack App (Dockerized)

This is a fullstack task management application built with the MERN stack and containerized using Docker. It allows users to manage tasks through a RESTful API and a responsive frontend UI.

---

## 🔧 Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **ORM**: Mongoose
- **Containerization**: Docker, Docker Compose

---

## 📁 Project Structure

 task-manager-fullstack/
├── backend/                  # Node.js + Express backend
│   ├── controllers/          # Route logic
│   ├── middlewares/          # Auth and error handling
│   ├── models/               # Mongoose models
│   ├── routes/               # API endpoints
│   ├── uploads/              # File storage (e.g., multer)
│   ├── docs/                 # API documentation (Markdown / Swagger)
│   ├── .env                  # Environment variables
│   ├── Dockerfile            # Backend container setup
│   └── index.js              # Entry point
│
├── frontend/                 # Vite + Vue frontend
│   ├── src/                  # Vue components and pages
│   ├── public/               # Static assets
│   ├── Dockerfile            # Frontend container setup
│   └── vite.config.js        # Vite config
│
├── docker-compose.yml        # Multi-container setup (MongoDB, backend, frontend)
└── README.md                 # Project documentation



     ## 📄 API Documentation

You can find the complete API documentation for the backend inside the [`backend/docs/`](./backend/docs/) folder.

It includes all available endpoints, methods, request/response formats, and authentication details.
