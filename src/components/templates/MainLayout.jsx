import { useState } from "react";
import {  Sidebar } from "../organisms";
import "./MainLayout.css";

const MainLayout = ({ children, userProgress, className = "" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState("atomic-basics");

  // Default user progress if not provided
  const defaultUserProgress = {
    atomicBasics: true,
    elementProperties: false,
    periodicTable: false,
    ionsIsotopes: false,
    electronConfig: false,
    overall: 0.2,
  };

  const progressData = userProgress || defaultUserProgress;

  return (
    <div id="main-layout" className={`main-layout ${className}`}>
      <div className="layout-body">
        <Sidebar
          userProgress={progressData}
          activeTopic={activeTopic}
          onTopicSelect={setActiveTopic}
          className={`layout-sidebar ${sidebarOpen ? "open" : ""}`}
        />

        <main className="layout-main">
          <div className="layout-content">{children}</div>
        </main>
      </div>

      {/* Mobile overlay for sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar toggle button */}
      <button
        className="sidebar-toggle mobile-only"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className="toggle-icon">📚</span>
        <span className="toggle-label">Menu</span>
      </button>
    </div>
  );
};

export default MainLayout;
