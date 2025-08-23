import { MainLayout } from '../components/templates';
import { Button } from '../components/atoms';
import { useAtomBuilder, useElementData } from '../hooks';
import { useNavigate } from "react-router-dom"; // React Router hook
import './Introduction.css';

const Introduction = () => {
  const { randomizeAtom } = useAtomBuilder();
  const { stats } = useElementData();
  const navigate = useNavigate(); // router navigation

  const features = [
    {
      icon: '⚛️',
      title: 'Interactive Atom Builder',
      description: 'Create atoms by adding protons, neutrons, and electrons. See real-time changes in atomic properties.'
    },
    {
      icon: '🧪',
      title: 'Element Explorer',
      description: 'Discover detailed information about each element, including properties, uses, and electron configuration.'
    },
    {
      icon: '📊',
      title: 'Periodic Table',
      description: 'Explore the organized system of elements and understand periodic trends and patterns.'
    },
    {
      icon: '🎯',
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with engaging quizzes that adapt to your learning progress.'
    }
  ];

  const learningObjectives = [
    'Understand the basic structure of an atom',
    'Identify subatomic particles and their properties',
    'Learn how elements are organized in the periodic table',
    'Explore electron configuration and atomic properties',
    'Understand ions, isotopes, and atomic variations'
  ];

  return (
    <MainLayout activeTab="intro">
      <div className="introduction-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover the <span className="text-gradient">Building Blocks</span> of Matter
            </h1>
            <p className="hero-description">
              Explore the fascinating world of atomic structure through interactive simulations, 
              detailed element information, and engaging learning activities designed for Class 10 students.
            </p>
            <div className="hero-actions">
              {/* Navigate to Periodic Table */}
              <Button 
                size="large" 
                variant="primary"
                onClick={() => navigate("/periodic")}
              >
                Start Exploring
              </Button>
              
              {/* Random Atom and go to Simulation */}
              <Button 
                size="large" 
                variant="secondary"
                onClick={() => {
                  randomizeAtom(); // optional, initialize random atom
                  navigate("/simulation");
                }}
              >
                Random Atom
              </Button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="atom-animation">
              <div className="nucleus"></div>
              <div className="orbit orbit-1"></div>
              <div className="orbit orbit-2"></div>
              <div className="electron electron-1"></div>
              <div className="electron electron-2"></div>
              <div className="electron electron-3"></div>
            </div>
          </div>
        </section>

        {/* ...Features, Learning Objectives, Stats, CTA sections remain unchanged... */}
      </div>
    </MainLayout>
  );
};

export default Introduction;
