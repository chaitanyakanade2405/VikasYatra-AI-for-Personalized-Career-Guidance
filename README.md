# VikasYatra – AI-Powered Career Guidance Platform

VikasYatra (meaning *“Journey of Progress”*) is a full-stack AI-powered educational platform designed to provide **personalized career guidance** using cutting-edge Generative AI.

It combines multiple intelligent tools like tutoring, quizzes, resume analysis, and roadmap generation into one seamless web application.

---

## 🌟 Features

### 🧠 AI-Powered Modules

- 🤖 **Conversational AI Tutor**
  - Multi-mode learning (Tutor, Debate, Interview, Chat)
  - Voice input/output support

- 💬 **Doubt-Solving Chatbot**
  - Persistent chat sessions
  - Context-aware responses

- 📝 **AI Quiz Generator**
  - Dynamic difficulty levels
  - Auto scoring with feedback

- 🛤️ **Career Roadmap Generator**
  - Graph-based (DAG) learning paths
  - Personalized based on goals & skills

- 📄 **Resume Analyzer**
  - Match score (0–100)
  - Strengths & improvement suggestions

- 🎬 **Visual Content Generator**
  - Convert text/PDF/audio → AI-generated video
  - Includes narration + captions

- 🌍 **Multilingual Translation**
  - Supports multiple languages
  - Auto language detection

---

## 🏗️ Tech Stack

### 💻 Frontend
- React 18
- Vite
- Tailwind CSS
- Firebase Authentication

### ⚙️ Backend
- Flask (Python)
- REST APIs
- MongoDB Atlas

### 🤖 AI & ML
- Gemini 2.5 Flash & Pro (Google Vertex AI)
- Imagen 4.0 (Image Generation)
- Whisper (Speech-to-Text)
- gTTS (Text-to-Speech)
- Google Translate API

### ☁️ Services
- Cloudinary (Media Storage)
- Firebase (Auth)
- Vercel (Deployment)

---

## 🧩 System Architecture
```text
Frontend (React)
↓
Flask API Gateway
↓
Service Layer (9 Modules)
↓
AI Models + Database + Cloud Services
```

- Modular architecture using Flask Blueprints
- Microservices-inspired design
- Scalable & maintainable

---

## ⚡ Key Highlights

- 🔗 **40+ REST API endpoints**
- 🧱 **Modular backend (9 services)**
- 🧠 **Multi-model AI integration**
- 📊 **User analytics dashboard**
- 🔄 **Graceful fallback system (no downtime)**

---

## 📊 Performance

- ⚡ Fast responses using Gemini Flash
- 🎥 Async video generation pipeline
- 💾 MongoDB + in-memory fallback
- 📈 Scalable via serverless deployment

---

## 🚀 Getting Started

### 📌 Prerequisites

Make sure you have the following installed:

- Node.js (v18+ recommended)
- Python (v3.9+ recommended)
- MongoDB Atlas account or local MongoDB
- Git

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/vikasyatra.git
cd vikasyatra
```
### 2️⃣ Setup Backend
```bash
cd backend
pip install -r requirements.txt
```
### 🔑 Create .env file in backend folder:
```bash
MONGO_URI=your_mongodb_uri
GOOGLE_API_KEY=your_vertex_ai_key
CLOUDINARY_URL=your_cloudinary_url
FIREBASE_CONFIG=your_firebase_config
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```
### ▶️ Run Backend Server
```bash
python app.py
```
### 3️⃣ Setup Frontend

Open a new terminal:
```bash
cd frontend
npm install
```
### ▶️ Run Frontend
```bash
npm run dev
```
### 4️⃣ Access the App
```bash
Frontend: http://localhost:5173
Backend API: http://localhost:5000
```
### 📁 Project Structure
```text
vikasyatra/
│
├── frontend/        # React app
├── backend/
│   ├── routes/      # Flask blueprints
│   ├── services/    # Business logic
│   ├── utils/       # Helper functions
│   └── app.py
│
├── models/          # Database schemas
├── assets/          # Static files
└── README.md
```
### 🎯 Use Cases
- 🎓 Students exploring career paths
- 💼 Job seekers improving resumes
- 📚 Self-learners building skills
- 🌍 Rural users needing guidance

### ⚠️ Limitations
- No RAG-based knowledge retrieval yet
- Limited multilingual voice support
- In-memory job queue (not persistent)

### 🔮 Future Improvements
- 🔍 RAG-based tutoring system
- 📱 Mobile app (React Native)
- 🧠 AI evaluation metrics (BLEU/ROUGE)
- 🔐 Secure authentication validation
- ⚙️ Redis-based job queue
