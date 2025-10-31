import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar";
import { Sidebar } from "./components/Layout/Sidebar";
import { useAuth } from "./hooks/useAuth";
import { PageTransition } from "./components/ui/PageTransition";
import { ScreenFatigueReminder } from "./components/ui/ScreenFatigueReminder";

// PWA Components
import OfflineIndicator from "./components/ui/OfflineIndicator";
import PWAInstallPrompt from "./components/ui/PWAInstallPrompt";

// Pages
import Home from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Dashboard } from "./pages/Dashboard";
import OfflineDashboard from "./pages/OfflineDashboard";
import { VisualGenerator } from "./pages/tools/VisualGenerator";
import { DoubtSolving } from "./pages/tools/DoubtSolving";
import { Quizzes } from "./pages/tools/Quizzes";
import { ConversationalTutor } from "./pages/tools/ConversationalTutor";
import { Roadmap } from "./pages/tools/Roadmap";
import { ResumeBuilder } from "./pages/tools/ResumeBuilder";

// Preload logo image instantly on app start
const LOGO_SRC = "/edvanta-logo.png";
const logoImg = new window.Image();
logoImg.src = LOGO_SRC;

// Unified loading logic hook
function useUnifiedLoading(location, authLoading) {
  // Only show loading for 3 seconds on initial mount (refresh)
  const LOADING_MINIMUM_TIME = 3000;
  const [initialLoading, setInitialLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setInitialLoading(false), LOADING_MINIMUM_TIME);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line
  }, []);

  return authLoading || initialLoading;
}

// Layout Component for Dashboard Pages
function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <OfflineIndicator />
      <Navbar />
      <Sidebar />
      <main className="md:ml-64 pt-16 p-3 sm:p-4 md:p-4 min-h-screen overflow-x-hidden">
        <PWAInstallPrompt className="mb-4" />
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}

// Layout Component for Public Pages
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen">
      <OfflineIndicator />
      <Navbar />
      <div className="pt-16">
        {/* Added pt-16 to account for fixed navbar height */}
        <PWAInstallPrompt className="mx-4 mt-4" />
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return null; // or a loading spinner
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}




function AppRoutes() {
  const location = useLocation();
  const { loading: authLoading } = useAuth();
  const isLoading = useUnifiedLoading(location, authLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="text-center">
          <img
            src={LOGO_SRC}
            alt="Loading..."
            className="mx-auto animate-pulse w-20 h-20"
            style={{ opacity: logoImg.complete ? 1 : 0, transition: 'opacity 0.1s' }}
            draggable={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<PageTransition><Home /></PageTransition>}
          />
          <Route
            path="/auth/login"
            element={<PageTransition><Login /></PageTransition>}
          />
          <Route
            path="/auth/signup"
            element={<PageTransition><Signup /></PageTransition>}
          />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/offline-dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <OfflineDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tools/visual-generator"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <VisualGenerator />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tools/doubt-solving"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DoubtSolving />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tools/quizzes"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Quizzes />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tools/conversational-tutor"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ConversationalTutor />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tools/roadmap"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Roadmap />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tools/resume-builder"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ResumeBuilder />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
      <ScreenFatigueReminder />
    </Router>
  );
}

export default App;
