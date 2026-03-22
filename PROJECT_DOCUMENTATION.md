# 📘 VikasYatra — Complete Project Documentation

> **VikasYatra** (Sanskrit: *Path of Progress*) is a full-stack, AI-powered career guidance and personalized learning ecosystem. It acts as a virtual mentor for students — generating learning roadmaps, tutoring them via voice/text, analyzing resumes, generating quizzes, and converting study material into visual storyboard videos.

---

## 📑 Table of Contents

1. [Tech Stack](#-tech-stack)
2. [System Architecture](#-system-architecture)
3. [Project Structure](#-project-structure)
4. [Core Concepts & Design Patterns](#-core-concepts--design-patterns)
5. [Feature-Wise Workflow](#-feature-wise-workflow)
6. [API Reference](#-api-reference)
7. [Frontend Deep Dive](#-frontend-deep-dive)
8. [Database Schema](#-database-schema)
9. [Deployment Architecture](#-deployment-architecture)
10. [How to Set Up & Run Locally](#-how-to-set-up--run-locally)
11. [How to Represent / Present This Project](#-how-to-represent--present-this-project)

---

## 🧰 Tech Stack

### Frontend

| Technology          | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| **React 18**        | UI library (component-based SPA)               |
| **Vite 6**          | Lightning-fast dev server & bundler             |
| **React Router v7** | Client-side routing with protected routes       |
| **Tailwind CSS 4**  | Utility-first CSS framework                     |
| **Firebase SDK**    | Authentication (Google OAuth), Firestore, Storage |
| **Axios**           | HTTP client for API communication               |
| **Radix UI**        | Accessible, unstyled UI primitives (Tabs, Progress, Slots) |
| **Lucide React**    | Icon library                                    |
| **PWA (Service Worker)** | Offline-first capability, installability   |

### Backend

| Technology                    | Purpose                                      |
| ----------------------------- | -------------------------------------------- |
| **Python 3 / Flask 3.1**      | Lightweight REST API server                   |
| **Flask-CORS**                | Cross-Origin Resource Sharing middleware       |
| **Google Vertex AI (Gemini)** | Core AI engine for text generation            |
| **Google GenAI SDK**          | Image generation (Imagen 4.0)                 |
| **Google Cloud Translate v2** | Multi-language translation support             |
| **MongoDB Atlas (PyMongo)**   | NoSQL database for user data persistence       |
| **Cloudinary**                | Cloud storage for resume uploads & video hosting |
| **ReportLab**                 | Server-side PDF generation (roadmap export)    |
| **gTTS**                      | Google Text-to-Speech for audio narration      |
| **MoviePy**                   | Programmatic video composition & rendering     |
| **Pillow (PIL)**              | Image processing and captioning                |
| **PyPDF2 / python-docx**      | Resume file parsing (PDF & DOCX)               |
| **OpenAI Whisper**            | Audio transcription (speech-to-text)           |

### Infrastructure & DevOps

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| **Vercel**       | Serverless deployment (both frontend & backend) |
| **Firebase**     | Authentication + User profile storage  |
| **MongoDB Atlas**| Cloud-hosted NoSQL database     |
| **Cloudinary**   | Media asset CDN & storage       |
| **Gmail SMTP**   | Transactional email notifications |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │   Home   │ │Dashboard │ │  Tools   │ │   Auth   │            │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
│       │              │            │            │                  │
│       └──────────────┼────────────┼────────────┘                 │
│                      │            │                               │
│              ┌───────▼──────┐  ┌──▼────────────┐                 │
│              │  useAuth()   │  │ axios → /api/* │                 │
│              │  (Firebase)  │  │  (HTTP Client) │                 │
│              └──────────────┘  └───────┬────────┘                 │
│                                        │                          │
│                   PWA Layer (Service Worker, Offline Sync)        │
└────────────────────────────────────────┼──────────────────────────┘
                                         │  HTTPS
                                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SERVER (Flask Python API)                       │
│                                                                   │
│  index.py → create_app() (Application Factory)                   │
│       │                                                           │
│       ├── /api/roadmap/*      → Vertex AI → MongoDB              │
│       ├── /api/chat/*         → Vertex AI → MongoDB              │
│       ├── /api/tutor/*        → Vertex AI → MongoDB              │
│       ├── /api/quizzes/*      → Vertex AI → MongoDB              │
│       ├── /api/resume/*       → Cloudinary + Vertex AI           │
│       ├── /api/visual/*       → Vertex AI + Imagen + gTTS        │
│       │                         + MoviePy → Cloudinary           │
│       ├── /api/translate      → Google Cloud Translate           │
│       ├── /api/email/send     → Gmail SMTP                       │
│       └── /api/user-stats     → MongoDB (aggregation)            │
│                                                                   │
│  utils/                                                           │
│       ├── ai_utils.py         → Vertex AI wrapper + chat mgmt   │
│       ├── mongo_utils.py      → MongoDB connection helper        │
│       ├── cloudinary_utils.py → Upload/fetch from Cloudinary     │
│       ├── pdf_utils.py        → PDF & DOCX text extraction       │
│       ├── visual_utils.py     → Video generation pipeline        │
│       └── quizzes_utils.py    → AI quiz generation logic         │
└─────────────────────────┬───────────────────────────────────────┘
                          │
           ┌──────────────┼──────────────┐
           ▼              ▼              ▼
    ┌────────────┐ ┌────────────┐ ┌────────────┐
    │ MongoDB    │ │ Vertex AI  │ │ Cloudinary │
    │ Atlas      │ │ (Gemini)   │ │ CDN        │
    └────────────┘ └────────────┘ └────────────┘
```

### Architecture Pattern: **Monorepo with Decoupled Client-Server**

- The `client/` and `server/` each deploy independently to **Vercel**.
- The frontend rewrites `/api/*` requests to the backend's deployed URL.
- The backend follows the **Flask Application Factory** pattern (`create_app()`).
- Each feature is a **Flask Blueprint**, keeping routes modular and maintainable.

---

## 📂 Project Structure

```
VikasYatra/
├── client/                          # React Frontend (Vite)
│   ├── public/
│   │   ├── VikasYatra-logo.png      # App logo
│   │   ├── manifest.json            # PWA manifest
│   │   ├── sw.js                    # Service Worker (offline support)
│   │   └── default-avatar.svg       # Default user avatar
│   ├── src/
│   │   ├── App.jsx                  # Root component (routing, layouts)
│   │   ├── main.jsx                 # React entry point
│   │   ├── index.css                # Global styles
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.jsx       # Top navigation bar
│   │   │   │   └── Sidebar.jsx      # Side navigation (dashboard)
│   │   │   └── ui/
│   │   │       ├── button.jsx       # Reusable button (CVA)
│   │   │       ├── card.jsx         # Card component
│   │   │       ├── badge.jsx        # Badge component
│   │   │       ├── input.jsx        # Input component
│   │   │       ├── tabs.jsx         # Tabs (Radix)
│   │   │       ├── progress.jsx     # Progress bar (Radix)
│   │   │       ├── PageTransition   # Route transition animations
│   │   │       ├── ScreenFatigueReminder # Health reminder popup
│   │   │       ├── PWAInstallPrompt # Install-as-app prompt
│   │   │       ├── OfflineIndicator # Network status banner
│   │   │       └── ...              # Other offline/debug components
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Dashboard.jsx        # User dashboard (stats, tools)
│   │   │   ├── OfflineDashboard.jsx # Offline-capable dashboard
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx        # Login (Firebase)
│   │   │   │   └── Signup.jsx       # Registration (Firebase)
│   │   │   └── tools/
│   │   │       ├── Roadmap.jsx             # Career roadmap generator
│   │   │       ├── DoubtSolving.jsx        # AI doubt solver chatbot
│   │   │       ├── ConversationalTutor.jsx # Voice-enabled AI tutor
│   │   │       ├── Quizzes.jsx             # Quiz generator & taker
│   │   │       ├── ResumeBuilder.jsx       # Resume analyzer
│   │   │       └── VisualGenerator.jsx     # Text-to-video generator
│   │   ├── hooks/
│   │   │   ├── useAuth.js           # Firebase auth state hook
│   │   │   ├── useOfflineStorage.js # IndexedDB/localStorage helpers
│   │   │   ├── useOfflineSync.js    # Background data sync
│   │   │   ├── usePWA.js            # PWA install & update hook
│   │   │   └── useResponsive.js     # Responsive breakpoint hook
│   │   ├── lib/
│   │   │   ├── firebase.js          # Firebase initialization
│   │   │   └── utils.js             # Utility functions (cn, etc.)
│   │   └── utils/
│   │       ├── test-pwa.js          # PWA test utilities
│   │       └── test-sync.js         # Sync test utilities
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── vercel.json                  # Frontend deploy config
│
├── server/                          # Flask Backend
│   ├── index.py                     # Entry point (WSGI app)
│   ├── app/
│   │   ├── __init__.py              # Application factory (create_app)
│   │   ├── config.py                # Centralized configuration
│   │   ├── routes/
│   │   │   ├── roadmap.py           # Career roadmap endpoints
│   │   │   ├── chatbot.py           # Doubt solving chat endpoints
│   │   │   ├── tutor.py             # Voice tutor endpoints
│   │   │   ├── quizzes.py           # Quiz generation endpoints
│   │   │   ├── resume.py            # Resume upload & analysis
│   │   │   ├── visual.py            # Video generation endpoints
│   │   │   ├── translate.py         # Translation endpoints
│   │   │   ├── email.py             # Email notification endpoints
│   │   │   └── user_stats.py        # Dashboard statistics
│   │   └── utils/
│   │       ├── ai_utils.py          # Vertex AI wrapper (31KB)
│   │       ├── cloudinary_utils.py  # Cloud file upload/fetch
│   │       ├── mongo_utils.py       # MongoDB connection helper
│   │       ├── pdf_utils.py         # PDF/DOCX parsing
│   │       ├── visual_utils.py      # Full video pipeline (19KB)
│   │       └── quizzes_utils.py     # Quiz AI generation
│   ├── requirements.txt             # Python dependencies
│   └── vercel.json                  # Backend deploy config
│
└── README.md                        # Root-level README
```

---

## 🧠 Core Concepts & Design Patterns

### 1. Flask Application Factory Pattern
The backend uses `create_app()` in `app/__init__.py` to construct the Flask app, register all 9 blueprints, and attach CORS middleware. This enables:
- Clean separation of concerns
- Easy testing (spin up fresh app instances)
- Lazy blueprint registration (avoiding circular imports)

### 2. Blueprint-Based Modular Routing
Each feature is encapsulated as a **Flask Blueprint**:
| Blueprint       | Prefix                    | Feature                         |
| --------------- | ------------------------- | ------------------------------- |
| `roadmap_bp`    | `/api/roadmap/*`          | AI career roadmap generation     |
| `chatbot_bp`    | `/api/chat/*`             | Doubt-solving chatbot            |
| `tutor_bp`      | `/api/tutor/*`            | Conversational tutor (voice/text)|
| `quizzes_bp`    | `/api/quizzes/*`, `/api/quiz-history` | Quiz generation & history |
| `resume_bp`     | `/api/resume/*`           | Resume upload & AI analysis      |
| `visual_bp`     | `/api/visual/*`           | Text/PDF/Audio → Video pipeline  |
| `translate_bp`  | `/api/translate`          | Multi-language translation       |
| `email_bp`      | `/api/email/*`            | Transactional email via Gmail    |
| `user_stats_bp` | `/api/user-stats`         | Dashboard statistics aggregation |

### 3. Vertex AI as the Core Intelligence Layer
Almost every feature relies on **Google Vertex AI (Gemini 2.5 Flash/Pro)**:
- **Prompt Engineering**: Each feature uses task-specific system prompts to shape AI behavior (e.g., the chatbot has a 10-rule educational tutor persona).
- **Lazy Import Pattern**: `vertexai` SDK is lazily imported with `try/except`, allowing the app to run without AI (with graceful fallbacks).
- **Base64 Credentials**: Service account JSON is stored as a Base64-encoded env var and decoded at runtime for Vertex AI initialization.

### 4. Graceful Degradation & Fallbacks
The system is resilient by design:
- If **MongoDB** is unavailable → data is stored in **in-memory dictionaries** as a fallback.
- If **Vertex AI** SDK is missing → **static fallback responses** are served to the user.
- If **Cloudinary** fails → error messages are returned without crashing the server.
- All routes return structured JSON errors with appropriate HTTP status codes.

### 5. Firebase Authentication Flow
```
User clicks "Login with Google"
    → Firebase GoogleAuthProvider popup
    → Firebase returns authUser (JWT + profile)
    → useAuth() hook sets user state
    → Firestore lookup for extended profile (users/{uid})
    → Protected routes gate on user !== null
    → user.email sent to backend with every API call
```

### 6. PWA (Progressive Web App)
The app is designed to work offline:
- **Service Worker** (`sw.js`): Caches static assets, intercepts network requests.
- **Manifest** (`manifest.json`): Enables "Add to Home Screen" on mobile.
- **Offline Hooks**: `useOfflineStorage`, `useOfflineSync` manage data persistence in IndexedDB/localStorage and sync when back online.
- **Offline Dashboard**: A dedicated `OfflineDashboard` page shows cached data.

### 7. User Identification Strategy
Every API call includes `user_email` (from Firebase Auth) as the primary identifier. MongoDB documents are keyed by `user_email`, enabling per-user data isolation without a custom auth system on the backend.

---

## 🔄 Feature-Wise Workflow

### 🗺️ Feature 1: AI Career Roadmap

```
User enters: Goal + Background + Duration
    │
    ▼
POST /api/roadmap/generate
    │
    ├── Vertex AI Gemini generates a directed graph:
    │   • nodes: [{id, title, description, recommended_weeks, resources}]
    │   • edges: [{from, to}]
    │
    ├── MongoDB stores the roadmap document
    │
    └── Returns JSON roadmap → Frontend renders interactive graph
    
Additional operations:
    GET  /api/roadmap/user?user_email=...          → List all user roadmaps
    GET  /api/roadmap/<id>?user_email=...          → Get specific roadmap
    DELETE /api/roadmap/<id>?user_email=...        → Delete a roadmap
    GET  /api/roadmap/download/<id>?user_email=... → Download as PDF (ReportLab)
```

### 💬 Feature 2: Doubt-Solving Chatbot

```
User types a question
    │
    ▼
POST /api/chat/message
    │
    ├── Builds a context-aware prompt from:
    │   • System prompt (educational tutor persona)
    │   • Last 10 messages of chat history
    │   • Current question
    │
    ├── Vertex AI generates response
    │
    ├── Chat session + messages saved to MongoDB
    │
    └── Returns AI response → Frontend displays in chat UI

Session management:
    POST   /api/chat/createChat       → New session
    GET    /api/chat/loadChat         → Load all sessions
    PUT    /api/chat/saveChat         → Bulk save sessions
    PUT    /api/chat/updateMessages   → Update session messages
    DELETE /api/chat/deleteChat/<id>  → Delete session
    PATCH  /api/chat/updateActivity   → Update last-active timestamp
```

### 🎙️ Feature 3: Conversational Tutor

```
User speaks or types a prompt  (mode: tutor/mentor, subject: any)
    │
    ▼
POST /api/tutor/ask
    │
    ├── ai_utils.get_vertex_response() processes with:
    │   • Mode-specific system prompts (tutor vs mentor)
    │   • Subject context
    │   • Voice optimization (shorter sentences for TTS)
    │   • Conversation history from MongoDB
    │
    ├── Chat history persisted in voice_chats collection
    │
    └── Returns response → Frontend plays via Web Speech API

Session lifecycle:
    POST /api/tutor/session/start   → Start session (resumes if active)
    POST /api/tutor/session/end     → End & cleanup session
    GET  /api/tutor/session/active  → Check for active session
    POST /api/tutor/voice/toggle    → Toggle voice output
    POST /api/tutor/voice/optimize  → Re-format text for voice
    GET  /api/tutor/chat/history    → Paginated chat history
    POST /api/tutor/chat/clear      → Clear history (with confirmation)
```

### 📝 Feature 4: AI Quiz Generator

```
User provides: Topic + Difficulty + Number of Questions
    │
    ▼
POST /api/quizzes/generate
    │
    ├── quizzes_utils.create_quiz() calls Vertex AI:
    │   • Generates MCQ questions with correct answers
    │   • Returns structured JSON with options
    │
    └── Returns quiz data → Frontend renders interactive quiz

Quiz lifecycle:
    POST   /api/tools/quizzes       → Save generated quiz to MongoDB
    GET    /api/tools/quizzes       → List user's saved quizzes
    DELETE /api/tools/quizzes/<id>  → Delete a quiz
    POST   /api/quizzes/submit      → Submit answers → Score & feedback

Quiz History:
    GET    /api/quiz-history        → User's quiz completion history
    POST   /api/quiz-history        → Log completion record
    DELETE /api/quiz-history        → Clear user's history
```

### 📄 Feature 5: Resume Analyzer

```
User uploads resume (PDF/DOCX) + enters job description
    │
    ▼
POST /api/resume/upload
    │  → Uploads to Cloudinary → Returns {url, public_id}
    │
    ▼
POST /api/resume/analyze
    │
    ├── Fetches file from Cloudinary OR uses provided text
    ├── Extracts text (PyPDF2 / python-docx)
    ├── Sends to Vertex AI (Gemini 2.5 Pro):
    │   "Analyze resume against job description"
    │   Returns: {strengths, improvements, match_score, summary}
    │
    ├── _safe_extract_json() parses LLM output robustly
    ├── _normalize_analysis() ensures consistent schema
    │
    └── Returns analysis → Frontend displays score + insights
```

### 🎬 Feature 6: Visual Generator (Text → Video)

```
User provides: Text / PDF URL / Audio URL
    │
    ▼
POST /api/visual/job/text  (or /job/pdf, /job/audio)
    │
    ├── Creates a background job (threading)
    ├── Returns {job_id, status: "queued"} immediately
    │
    ▼ (Background Worker)
    ├── Step 1: Vertex AI extracts "key moments" + image prompts
    ├── Step 2: Google Imagen generates AI images per scene
    ├── Step 3: gTTS generates narration audio per scene
    ├── Step 4: Pillow adds text captions to images
    ├── Step 5: MoviePy composites images + audio → video clips
    ├── Step 6: Clips concatenated into final video
    ├── Step 7: Upload to Cloudinary → Returns URL
    │
    └── Email notification sent to user when complete

Polling:
    GET /api/visual/job/<job_id>  → Check job status + get video URL
```

### 🌐 Feature 7: Translation

```
POST /api/translate
    body: {"text": "Hello", "to": "hi", "from": "en"}
    │
    ├── Google Cloud Translate v2 API
    ├── In-memory LRU cache (5-min TTL) to avoid redundant calls
    ├── Batch support (up to 100 texts per request)
    │
    └── Returns: {translations: [{input, translated, detected_source}]}
```

### 📊 Feature 8: User Statistics (Dashboard)

```
GET /api/user-stats?user_email=...
    │
    ├── MongoDB Aggregation:
    │   • Count roadmaps → "Active Roadmaps"
    │   • Unwind roadmap nodes → Count unique skills → "Skills Learning"
    │   • Count quiz_history documents → "Quizzes Taken"
    │   • Calculate estimated learning time
    │
    └── Returns stats → Dashboard displays cards
```

---

## 📡 API Reference

| Method   | Endpoint                                    | Description                          |
| -------- | ------------------------------------------- | ------------------------------------ |
| `GET`    | `/`                                         | Health check                         |
| `GET`    | `/api/runtime-features`                     | Check available AI libraries         |
| **Roadmap** | | |
| `POST`   | `/api/roadmap/generate`                     | Generate AI career roadmap           |
| `GET`    | `/api/roadmap/user?user_email=...`          | Get all user roadmaps                |
| `GET`    | `/api/roadmap/<id>?user_email=...`          | Get specific roadmap                 |
| `DELETE` | `/api/roadmap/<id>?user_email=...`          | Delete a roadmap                     |
| `GET`    | `/api/roadmap/download/<id>?user_email=...` | Download roadmap as PDF              |
| **Chat** | | |
| `POST`   | `/api/chat/message`                         | Send message, get AI response        |
| `POST`   | `/api/chat/createChat`                      | Create new chat session              |
| `GET`    | `/api/chat/loadChat?userEmail=...`          | Load all chat sessions               |
| `PUT`    | `/api/chat/saveChat`                        | Bulk save chat sessions              |
| `PUT`    | `/api/chat/updateMessages/<id>/messages`    | Update session messages              |
| `DELETE` | `/api/chat/deleteChat/<id>`                 | Delete chat session                  |
| `PATCH`  | `/api/chat/updateActivity/<id>/activity`    | Update session activity              |
| `POST`   | `/api/chat/ask`                             | Legacy doubt-solving endpoint        |
| **Tutor** | | |
| `POST`   | `/api/tutor/ask`                            | Ask tutor question (voice/text)      |
| `POST`   | `/api/tutor/session/start`                  | Start tutor session                  |
| `POST`   | `/api/tutor/session/end`                    | End tutor session                    |
| `GET`    | `/api/tutor/session/active?userEmail=...`   | Check for active session             |
| `POST`   | `/api/tutor/voice/toggle`                   | Toggle voice output                  |
| `POST`   | `/api/tutor/voice/optimize`                 | Optimize text for voice              |
| `GET`    | `/api/tutor/voice/connection`               | Check voice service availability     |
| `GET`    | `/api/tutor/chat/history?userEmail=...`     | Get paginated chat history           |
| `POST`   | `/api/tutor/chat/clear`                     | Clear chat history                   |
| `GET`    | `/api/tutor/health`                         | Tutor service health check           |
| **Quiz** | | |
| `POST`   | `/api/quizzes/generate`                     | Generate quiz from topic             |
| `GET`    | `/api/tools/quizzes?user_email=...`         | List saved quizzes                   |
| `POST`   | `/api/tools/quizzes`                        | Save a quiz                          |
| `DELETE` | `/api/tools/quizzes/<id>`                   | Delete a quiz                        |
| `POST`   | `/api/quizzes/submit`                       | Submit answers & get score           |
| `GET`    | `/api/quiz-history?user_email=...`          | Get quiz history                     |
| `POST`   | `/api/quiz-history`                         | Log quiz completion                  |
| `DELETE` | `/api/quiz-history?user_email=...`          | Clear quiz history                   |
| **Resume** | | |
| `POST`   | `/api/resume/upload`                        | Upload resume (multipart)            |
| `POST`   | `/api/resume/analyze`                       | Analyze resume vs job description    |
| **Visual** | | |
| `POST`   | `/api/visual/job/text`                      | Enqueue text → video job             |
| `POST`   | `/api/visual/job/pdf`                       | Enqueue PDF → video job              |
| `POST`   | `/api/visual/job/audio`                     | Enqueue audio → video job            |
| `GET`    | `/api/visual/job/<job_id>`                  | Poll job status                      |
| `POST`   | `/api/visual/text-to-video`                 | Synchronous text → video             |
| `POST`   | `/api/visual/pdf-url-to-video`              | Synchronous PDF → video              |
| `POST`   | `/api/visual/audio-url-to-video`            | Synchronous audio → video            |
| **Other** | | |
| `POST`   | `/api/translate`                            | Translate text                       |
| `POST`   | `/api/email/send`                           | Send email notification              |
| `GET`    | `/api/user-stats?user_email=...`            | Get user stats                       |
| `GET`    | `/api/user-stats/debug?user_email=...`      | Debug data sources                   |

---

## 🖥️ Frontend Deep Dive

### Routing Architecture

```
/                        → Home (public landing page)
/auth/login              → Login with Firebase
/auth/signup             → Registration with Firebase

/dashboard               → 🔒 User Dashboard (stats, quick actions)
/offline-dashboard       → 🔒 Offline-capable Dashboard
/tools/roadmap           → 🔒 AI Career Roadmap Generator
/tools/doubt-solving     → 🔒 AI Doubt Solver Chatbot
/tools/conversational-tutor → 🔒 Voice-Enabled AI Tutor
/tools/quizzes           → 🔒 AI Quiz Generator & Taker
/tools/resume-builder    → 🔒 Resume Analyzer
/tools/visual-generator  → 🔒 Text-to-Video Generator

🔒 = Protected by ProtectedRoute (requires Firebase auth)
```

### Layout System

- **PublicLayout**: `Navbar` + content (no sidebar)
- **DashboardLayout**: `Navbar` + `Sidebar` (fixed left, 256px) + content area with padding

### Custom Hooks

| Hook                 | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| `useAuth()`          | Manages Firebase auth state, returns `{user, userProfile, loading}` |
| `useOfflineStorage()`| IndexedDB/localStorage abstraction for offline data  |
| `useOfflineSync()`   | Background sync queue for offline → online data push |
| `usePWA()`           | Detects PWA install state, handles install prompt     |
| `useResponsive()`    | Returns current breakpoint for responsive layouts     |

### UI Components (ShadCN-style)

Built using `class-variance-authority` (CVA) for variant-based styling:
- `Button` — with `variant` and `size` props
- `Card`, `CardHeader`, `CardContent`, `CardFooter`
- `Badge` — with `variant` prop
- `Input`, `Tabs`, `Progress`

### Wellness Feature

`ScreenFatigueReminder` — Periodically prompts users to take breaks (eye care).

---

## 💾 Database Schema

### MongoDB Collections

```
Database: <MONGODB_DB_NAME>

├── roadmaps
│   ├── id: UUID
│   ├── user_email: string
│   ├── title: string (goal)
│   ├── description: string (background)
│   ├── duration_weeks: number
│   ├── created_at: datetime
│   └── data: { nodes: [...], edges: [...] }
│
├── chat_sessions
│   ├── _id: ObjectId
│   ├── userEmail: string
│   ├── name: string
│   ├── messages: [{ role, content, timestamp }]
│   ├── messageCount: number
│   ├── createdAt: ISO string
│   └── lastActivity: ISO string
│
├── voice_chats
│   ├── user_email: string
│   ├── session_id: string
│   ├── role: "user" | "assistant"
│   ├── content: string
│   └── timestamp: ISO string
│
├── active_sessions
│   ├── user_email: string
│   ├── session_id: string
│   ├── mode: string
│   └── subject: string
│
├── quizzes
│   ├── id: UUID
│   ├── topic: string
│   ├── difficulty: "easy" | "medium" | "hard"
│   ├── questions: [{ id, question, options, correctAnswer }]
│   ├── created_by: email
│   ├── created_at: ISO string
│   └── num_questions: number
│
└── quiz_history
    ├── id: UUID
    ├── userId: email
    ├── quizId: string
    ├── quizTitle: string
    ├── topic: string
    ├── difficulty: string
    ├── totalQuestions: number
    ├── correctAnswers: number
    ├── percentage: number
    ├── completedAt: ISO string
    └── timeTaken: string
```

### Firebase (Firestore)

```
users/{uid}
    ├── displayName: string
    ├── email: string
    ├── photoURL: string
    └── ... (extended profile data)
```

---

## 🚀 Deployment Architecture

```
                    ┌─────────────────────┐
                    │   Vercel (Frontend)  │
                    │   client/vercel.json │
                    │                     │
                    │  /api/* → REWRITES  │──────┐
                    │  to backend URL     │      │
                    └─────────────────────┘      │
                                                  │
                                                  ▼
                    ┌─────────────────────┐
                    │  Vercel (Backend)   │
                    │  server/vercel.json │
                    │                     │
                    │  @vercel/python     │
                    │  index.py → WSGI    │
                    └─────────────────────┘
```

- **Frontend** (`client/vercel.json`): Uses Vercel rewrites to proxy `/api/*` to `https://edvanta-backend.vercel.app/api/$1`, and routes everything else to `index.html` for SPA routing.
- **Backend** (`server/vercel.json`): Uses `@vercel/python` to serve `index.py` as a serverless WSGI application.

---

## ⚙️ How to Set Up & Run Locally

### Prerequisites

- **Node.js** ≥ 18.x (for the frontend)
- **Python** ≥ 3.10 (for the backend)
- **MongoDB Atlas** account (or local MongoDB)
- **Firebase** project (for authentication)
- **Google Cloud** project with Vertex AI API enabled
- **Cloudinary** account (for file/media uploads)

### Step 1: Clone the Repository

```bash
git clone https://github.com/chaitanyakanade2405/VikasYatra-AI-for-Personalized-Career-Guidance.git
cd VikasYatra-AI-for-Personalized-Career-Guidance
```

### Step 2: Set Up the Backend

```bash
cd server

# Create and activate virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example)
copy .env.example .env
# Then edit .env with your actual credentials
```

**Required `.env` variables:**

```env
# Flask
FLASK_ENV=development
SECRET_KEY=your-secret-key
PORT=5000

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/
MONGODB_DB_NAME=vikasyatra

# Google Cloud / Vertex AI
GOOGLE_PROJECT_ID=your-gcp-project-id
GOOGLE_LOCATION=us-central1
GOOGLE_CREDENTIALS_JSON_BASE64=<base64-encoded service account JSON>
VERTEX_MODEL_NAME=gemini-2.5-flash

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Gmail SMTP)
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=your-app-password

# API Keys
GEMINI_API_KEY=your-gemini-api-key
```

```bash
# Run the backend
python index.py
# Server starts at http://localhost:5000
```

### Step 3: Set Up the Frontend

```bash
cd client

# Install dependencies
npm install

# Create .env file
```

**Required `.env` variables:**

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

```bash
# Run the frontend
npm run dev
# App opens at http://localhost:5173
```

---

## 🎤 How to Represent / Present This Project

### For a College Project Presentation (BE Project / Viva):

**Slide 1 — Title & Team**
- Project Title: *VikasYatra: AI-Powered Personalized Career Guidance*
- Team members, guide name, college, academic year

**Slide 2 — Problem Statement**
- Students lack personalized guidance for career paths
- No single platform provides roadmaps + tutoring + assessment + resume feedback
- Generic AI tools are not education-focused

**Slide 3 — Proposed Solution**
- An integrated AI ecosystem that acts as a personal career mentor
- 6 core modules: Roadmap, Tutor, Chatbot, Quizzes, Resume Analyzer, Visual Generator

**Slide 4 — Architecture Diagram**
- Use the system architecture diagram from this document
- Highlight: React → Flask → Vertex AI → MongoDB flow

**Slide 5 — Tech Stack**
- Use the tech stack tables from this document
- Emphasize: AI-first approach, cloud-native, PWA-ready

**Slide 6-11 — Feature Demos** (one slide per feature)
- For each: Screenshot → How it works → AI prompt strategy → Data flow

**Slide 12 — AI Concepts Used**
- **Prompt Engineering**: Task-specific system prompts for each module
- **Conversational Context**: Chat history passed to LLM for multi-turn conversation
- **Multimodal AI**: Text generation (Gemini) + Image generation (Imagen) + TTS (gTTS)
- **Directed Graph Generation**: AI structures roadmaps as nodes + edges
- **JSON-Constrained Output**: Prompts instruct AI to return structured JSON
- **Resume NLP Analysis**: Matching resume skills against job description requirements

**Slide 13 — Key Technical Highlights**
- Flask Application Factory + Blueprint architecture
- Graceful degradation (in-memory fallbacks)
- Progressive Web App with offline support
- Async video generation with job queue pattern
- Firebase Auth integration with backend identity propagation

**Slide 14 — Future Scope**
- Custom ML model for resume analysis (mentioned in README)
- Enhanced visual storyboard generator
- Multi-language support expansion
- Mobile native apps
- Gamification of learning paths

**Slide 15 — Conclusion & Q&A**

### For a GitHub README / Portfolio:
- Use the existing README.md as a base
- Add badges (tech stack, build status)
- Add screenshots/GIFs of each feature
- Link to this document for technical deep-dive

### For a Research Paper / Report:
- **Abstract**: Problem + Solution + Tech Stack + Results
- **Literature Survey**: Existing career guidance platforms, AI in ed-tech
- **System Design**: Use the architecture diagrams and workflows here
- **Implementation**: Detail each module with code snippets from routes/
- **Testing**: API endpoint testing, UI testing
- **Results**: User feedback, demo screenshots
- **References**: Vertex AI docs, React docs, Flask docs, MongoDB docs

---

*This document was generated by analyzing every file in the VikasYatra repository — all 9 server route modules, 6 utility modules, 6 frontend page components, 6 custom hooks, configuration files, deployment configs, and the PWA setup.*
