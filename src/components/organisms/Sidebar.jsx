import { Button } from "../atoms";
import "./Sidebar.css";

const Sidebar = ({
  userProgress,
  onTopicSelect,
  activeTopic,
  className = "",
}) => {
  const topics = [
    {
      id: "atomic-basics",
      title: "Atomic Basics",
      description: "Learn about protons, neutrons, and electrons",
      icon: "⚛️",
      completed: userProgress.atomicBasics,
      locked: false,
    },
    {
      id: "element-properties",
      title: "Element Properties",
      description: "Discover how elements are defined and classified",
      icon: "🧪",
      completed: userProgress.elementProperties,
      locked: !userProgress.atomicBasics,
    },
    {
      id: "periodic-table",
      title: "Periodic Table",
      description: "Explore the organization of elements",
      icon: "📊",
      completed: userProgress.periodicTable,
      locked: !userProgress.elementProperties,
    },
    {
      id: "ions-isotopes",
      title: "Ions & Isotopes",
      description: "Understand atomic variations and charges",
      icon: "⚡",
      completed: userProgress.ionsIsotopes,
      locked: !userProgress.periodicTable,
    },
    {
      id: "electron-config",
      title: "Electron Configuration",
      description: "Learn how electrons are arranged in atoms",
      icon: "🔍",
      completed: userProgress.electronConfig,
      locked: !userProgress.ionsIsotopes,
    },
  ];

  return (
    <aside className={`sidebar ${className}`}>
      <div className="sidebar-header">
        <h2>Learning Path</h2>
        <div className="progress-display">
          <span className="progress-label">Progress</span>
          <span className="progress-value">
            {Math.round(userProgress.overall * 100)}%
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${userProgress.overall * 100}%` }}
          ></div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={`topic-item ${
              activeTopic === topic.id ? "active" : ""
            } ${topic.locked ? "locked" : ""}`}
            onClick={() => !topic.locked && onTopicSelect(topic.id)}
            disabled={topic.locked}
          >
            <div className="topic-icon">{topic.icon}</div>
            <div className="topic-content">
              <h3 className="topic-title">{topic.title}</h3>
              <p className="topic-description">{topic.description}</p>
            </div>
            <div className="topic-status">
              {topic.locked ? (
                <span className="lock-icon">🔒</span>
              ) : topic.completed ? (
                <span className="completed-icon">✅</span>
              ) : (
                <span className="incomplete-icon">📖</span>
              )}
            </div>
          </button>
        ))}
      </nav>
      {/* This will be go to your login page */}
      <div className="sidebar-actions">
        <Button
          variant="secondary"
          size="small"
          onClick={() =>
            window.open("https://students.quazaredu.com", "_blank")
          }
          fullWidth
        >
          Explore More Topics
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
