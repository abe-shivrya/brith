/**
 * App.tsx
 *
 * HashRouter routes:
 *   /#/             — Login gate (until authenticated) → Choose workflow
 *   /#/birth        — Birth record form
 *   /#/birth/preview — Birth record document preview
 *   /#/validate     — Validate certificate form
 *   /#/validate/table — Validate certificate table
 *
 * Form data shared via AppContext.
 */

import { useState, type ReactNode } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import ChoosePage from "./pages/ChoosePage";
import BirthFormPage from "./pages/BirthFormPage";
import BirthPreviewPage from "./pages/BirthPreviewPage";
import ValidateFormPage from "./pages/ValidateFormPage";
import QRResultPage from "./pages/QRResultPage";
import VerifyPage from "./pages/VerifyPage";
import body_background from "./assets/body_bg.png";
import "./App.css";

const AUTH_KEY = "crs-auth";

/* Redirects to the login screen (/#/) when the user is not authenticated. */
function RequireAuth({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: ReactNode;
}) {
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === "1",
  );

  const handleLoginSuccess = () => {
    sessionStorage.setItem(AUTH_KEY, "1");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AppProvider>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div
        className="content-body"
        style={{ backgroundImage: `url("${body_background}")` }}
      >
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <ChoosePage />
              ) : (
                <Login onSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/birth"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <BirthFormPage />
              </RequireAuth>
            }
          />
          <Route
            path="/birth/preview"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <BirthPreviewPage />
              </RequireAuth>
            }
          />
          <Route
            path="/validate"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <ValidateFormPage />
              </RequireAuth>
            }
          />
          <Route path="/qr/:id" element={<QRResultPage />} />
          <Route
            path="/verify/:id"
            element={
              <RequireAuth isAuthenticated={isAuthenticated}>
                <VerifyPage />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
      <Footer />
    </AppProvider>
  );
}
