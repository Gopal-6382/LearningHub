import { useState } from "react";
import { Button } from "../atoms";
import { NavLink } from "react-router-dom"; // react-router navigation
import "./Header.css";

const Header = ({ className = "" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "intro", label: "Introduction", icon: "📚", path: "/" },
    { id: "simulation", label: "Simulation", icon: "🔬", path: "/simulation" },
    { id: "periodic", label: "Periodic Table", icon: "🧪", path: "/periodic" },
    { id: "quiz", label: "Quiz", icon: "📝", path: "/quiz" },
  ];

  return (
    <header className={`app-header ${className}`}>
      <div className="header-content">
        {/* Brand Section */}
        <div className="header-brand">
          <div className="logo">
            <span className="logo-icon">⚛️</span>
            <h1>Atomic Explorer</h1>
          </div>
          <p className="tagline">Discover the Building Blocks of Matter</p>
        </div>

        {/* Navigation */}
        <nav className={`header-nav ${mobileMenuOpen ? "mobile-open" : ""}`}>
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Header Actions */}
        <div className="header-actions">
          <Button
            variant="secondary"
            size="small"
            onClick={() =>
              window.open("https://students.quazaredu.com", "_blank")
            }
          >
            Visit Quazar
          </Button>
        </div>
      </div>

      {/* Progress Indicator (Optional) */}
      <div className="progress-indicator">
        <div
          className="progress-bar"
          style={{
            width: `${
              ((tabs.findIndex((tab) => window.location.pathname.includes(tab.path)) + 1) /
                tabs.length) *
              100
            }%`,
          }}
        ></div>
      </div>
    </header>
  );
};

export default Header;
