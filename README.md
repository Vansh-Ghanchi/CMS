<div align="center">
  <img src="assets/team_logo.png" alt="Falcon_001 Logo" width="200" />
  <h1>🎓 College Management System</h1>
  <p><strong>Team Falcon_001</strong></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Stack: FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
  [![Stack: React](https://img.shields.io/badge/Frontend-React-61DAFB.svg)](https://reactjs.org/)
  [![Stack: PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791.svg)](https://www.postgresql.org/)
</div>

---

## 🚀 Project Overview

The **College Management System (CMS)** is a professional, full-stack application designed to streamline administrative and academic operations. Built with a focus on role-based security, data integrity, and real-time analytics, it provides a robust platform for managing students, faculty, attendance, and financial records.

### 👥 Team Falcon_001
*   **Abhay**
*   **Charitarth**
*   **Vansh**
*   **Nandani**

---

## ✨ Key Features

- 🔐 **Role-Based Access Control (RBAC)**: Secure access for Admins and specialized Management roles (Attendance, Fees, Courses).
- 📅 **Attendance Management**: Real-time tracking of student attendance with dynamic trend analytics.
- 💳 **Advanced Fees System**: A production-grade financial module supporting overpayments, credit balance tracking, and detailed transaction history.
- 📊 **Dashboard Analytics**: Comprehensive data visualization for enrollments, fee collections, and attendance trends.
- 🏗️ **Architectural Integrity**: Single source of truth backend with centralized frontend state management.

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + Axios
- **Backend**: Python FastAPI + SQLAlchemy
- **Database**: PostgreSQL (Production-ready)
- **Auth**: JWT (JSON Web Tokens) with secure HTTP interceptors
---

## ⚙️ Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux/macOS
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Initialize the database:
   ```bash
   python seed.py
   ```
5. Run the server:
   ```bash
   python -m uvicorn app.main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔑 Environment Variables

The system requires the following variables to be configured in your environment or a `.env` file:

- `DATABASE_URL`: Your PostgreSQL connection string.
- `SECRET_KEY`: A secure string for JWT signing.
- `ALGORITHM`: (Optional) Hash algorithm for tokens (Default: HS256).

---

## 📝 Usage Notes

- **API Base URL**: `http://localhost:8000`
- **Default Port**: Frontend runs on `http://localhost:5173`.
- **Admin Access**: Use the seeded credentials from `seed.py` for initial setup.

---

<div align="center">
  <p>Built with ❤️ by Team Falcon_001</p>
</div>
