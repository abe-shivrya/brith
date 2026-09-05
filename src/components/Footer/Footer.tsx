/**
 * Footer.tsx – CRS gov.in style footer with clickable links.
 *
 * Structure:
 *   - Government site logos row
 *   - Quick links (linked to dc.crsorgi.gov.in)
 *   - Second column of quick links
 *   - Last updated, developer credit, copyright bar
 */

import footerLogoSprite from "../../assets/footer-logo-sprite.png";
import intlYearLogo from "../../assets/international_year.png";
import "./Footer.css";

const CRS_BASE = "https://dc.crsorgi.gov.in/crs";

const quickLinks1 = [
  { label: "Website Policy", path: "/website-policy" },
  { label: "Mobile App Privacy Policy", path: "/mobile-app-policy" },
  { label: "Terms & Conditions", path: "/terms-conditions" },
  { label: "Accessibility Statement", path: "/accessibility-statement" },
  { label: "Web Information Manager", path: "/web-information-manager" },
];

const quickLinks2 = [
  { label: "Sitemap", path: "/sitemap" },
  { label: "Contact Us", path: "/contact-us" },
  { label: "Product & Services", path: "/product-services" },
  { label: "Pricing", path: "/pricing" },
  { label: "Cancellation Policy", path: "/cancellation-policy" },
  { label: "Grievance Management Policy", path: "/grievance-management" },
];

// ─── EDIT HERE: Government logos ───
// Update x, width, height to position each logo from the sprite
// const govLogos = [
//   { name: "data-gov",      title: "Data Gov",       x: 0,    y: -25, width: 165, height: 50, backgroundSize: "985%" },
//   { name: "india-gov",     title: "India Gov",      x: -410,  y: -2, width: 165, height: 50, backgroundSize: "985%" },
//   { name: "pmica",         title: "PMICA",          x: 330,  y: 0, width: 165, height: 50, backgroundSize: "985%" },
//   { name: "make-in-india", title: "Make in India",  x: 495,  y: 0, width: 165, height: 50, backgroundSize: "985%" },
//   { name: "digital-india", title: "Digital India",  x: 660,  y: 0, width: 165, height: 50, backgroundSize: "985%" },
//   { name: "mygov",         title: "MyGov",          x: 825,  y: 0, width: 165, height: 50, backgroundSize: "985%" },
// ];

const govLogos = [
  { name: "data-gov",      title: "Data Gov",       x: 2,   y: -15, width: 165, height: 50, backgroundSize: "1588px 65px" },
  { name: "india-gov",     title: "India Gov",      x: -362, y: 0,  width: 165, height: 50, backgroundSize: "1111px 48px" },
  { name: "pmica",         title: "PMICA",          x: -1525, y: -30, width: 165, height: 50, backgroundSize: "1695px 75px" }, 
  { name: "make-in-india", title: "Make in India",  x: -583, y: 1,  width: 165, height: 50, backgroundSize: "1111px 48px" },
  { name: "digital-india", title: "Digital India",  x: -142, y: 1,  width: 165, height: 50, backgroundSize: "1111px 48px" },
  { name: "mygov",         title: "MyGov",          x: -802, y: 2,  width: 165, height: 50, backgroundSize: "1111px 48px" },
  { name: "intl-year",     title: "International Year", img: intlYearLogo, width: 165, height: 50 },
];

export default function Footer() {
  return (
    <footer className="crs-footer">
      <div className="crs-footer-inner">
        {/* ───── Government logos row ───── */}
        {/* EDIT HERE: update x, width, height for each logo */}
        <ul className="crs-gov-sites">
          {govLogos.map((logo) => (
            <li key={logo.name} className="crs-gov-logo-item">
              {logo.img ? (
                <img
                  className="crs-gov-logo"
                  src={logo.img}
                  alt={logo.title}
                  style={{ width: `${logo.width}px`, height: `${logo.height}px` }}
                />
              ) : (
                <div
                  className="crs-gov-logo"
                  style={{
                    width: `${logo.width}px`,
                    height: `${logo.height}px`,
                    backgroundImage: `url("${footerLogoSprite}")`,
                    backgroundPosition: `${logo.x}px ${logo.y}px`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: logo.backgroundSize || "auto",
                  }}
                  title={logo.title}
                />
              )}
            </li>
          ))}
        </ul>

        {/* ───── Quick links row 1 ───── */}
        <ul className="crs-quick-links">
          {quickLinks1.map((link) => (
            <li key={link.path}>
              <a
                href={`${CRS_BASE}${link.path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ───── Quick links row 2 ───── */}
        <ul className="crs-quick-links crs-quick-links-last">
          <li><span className="crs-link-label">Feedback</span></li>
          {quickLinks2.map((link) => (
            <li key={link.path}>
              <a
                href={`${CRS_BASE}${link.path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="crs-footer-updated">
          Last Updated: 30-01-2024 12:16:17
        </p>
        <p className="crs-footer-dev">
          Website Developed &amp; Maintained by Office of the Registrar General
          &amp; Census Commissioner of India
        </p>
        <p className="crs-footer-ministry">
          Ministry of Home Affairs
        </p>
      </div>

      {/* ───── Copyright bar ───── */}
      <div className="crs-copyright-bar">
        <p className="crs-copyright-text">
          © 2026 - The Registrar General &amp; Census Commissioner of India -{" "}
          <span className="crs-copyright-time">
            <span className="material-icons crs-time-icon">schedule</span>
            {new Date().toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            ,{" "}
            {new Date().toLocaleTimeString("en-IN", {
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </p>
      </div>
    </footer>
  );
}
