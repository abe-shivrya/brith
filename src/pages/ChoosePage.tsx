/**
 * ChoosePage.tsx
 *
 * Landing page with two workflow buttons.
 * Route: /#/
 */

import { Link } from "react-router-dom";
import "./ChoosePage.css";

export default function ChoosePage() {
  return (
    <div className="choose-screen">
      <h2 className="choose-title">Welcome</h2>
      <p className="choose-subtitle">Select a workflow to continue</p>
      <div className="choose-buttons">
        <Link to="/birth" className="choose-btn choose-btn-birth">
          <span className="material-icons choose-btn-icon">description</span>
          <span className="choose-btn-label">Birth Record Entry</span>
          <span className="choose-btn-desc">
            Enter birth record data and generate a print-ready certificate
          </span>
        </Link>
        <Link to="/validate" className="choose-btn choose-btn-validate">
          <span className="choose-btn-icon">✓</span>
          <span className="choose-btn-label">Validate Certificate</span>
          <span className="choose-btn-desc">
            Enter certificate details and verify against the registry
          </span>
        </Link>
      </div>
    </div>
  );
}
