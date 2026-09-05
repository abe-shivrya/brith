/**
 * Login.tsx
 *
 * Login gate for the home page (/#/).
 * Checks the entered credentials against the fixed username/password
 * and calls onSuccess() when they match.
 */

import { useState, type FormEvent } from "react";
import "./Login.css";

const USERNAME = "sshivraj";
const PASSWORD = "Mitra@143.king";

export default function Login({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log()
    if (username === USERNAME && password === PASSWORD) {
      setError("");
      onSuccess();
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">
          Enter your credentials to access the home page
        </p>

        <label className="login-field">
          <span className="login-label">Username</span>
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label className="login-field">
          <span className="login-label">Password</span>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-submit">
          Sign In
        </button>
      </form>
    </div>
  );
}