// src/pages/Simulation.jsx
import { MainLayout } from '../components/templates';
import { Simulation as SimulationOrganism } from '../components/organisms';
import { useAtomBuilder } from '../hooks';
import './Simulation.css';


const Simulation = () => {
  const atomBuilder = useAtomBuilder();

  return (
    <MainLayout activeTab="simulation">
      <div className="simulation-page">
        <div className="simulation-header">
          <h1>Atomic Structure Simulation</h1>
          <p>Build and explore atoms by adjusting the number of protons, neutrons, and electrons</p>
        </div>

        <SimulationOrganism
          elementData={{
            protons: atomBuilder.protons,
            neutrons: atomBuilder.neutrons,
            electrons: atomBuilder.electrons,
            elementInfo: atomBuilder.element
          }}
          onElementChange={({ protons, neutrons, electrons }) => {
            atomBuilder.setProtons(protons);
            atomBuilder.setNeutrons(neutrons);
            atomBuilder.setElectrons(electrons);
          }}
        />

        <div className="simulation-educational-content">
          <div className="concept-section">
            <h2>Understanding Atomic Structure</h2>
            <div className="concept-grid">
              <div className="concept-card">
                <h3>Protons</h3>
                <p>Positively charged particles in the nucleus that determine the atomic number and element identity.</p>
                <ul>
                  <li>Charge: +1</li>
                  <li>Mass: ~1 atomic mass unit</li>
                  <li>Location: Nucleus</li>
                </ul>
              </div>
              
              <div className="concept-card">
                <h3>Neutrons</h3>
                <p>Neutral particles in the nucleus that contribute to atomic mass and stability.</p>
                <ul>
                  <li>Charge: 0</li>
                  <li>Mass: ~1 atomic mass unit</li>
                  <li>Location: Nucleus</li>
                </ul>
              </div>
              
              <div className="concept-card">
                <h3>Electrons</h3>
                <p>Negatively charged particles that orbit the nucleus and determine chemical properties.</p>
                <ul>
                  <li>Charge: -1</li>
                  <li>Mass: ~1/1836 atomic mass unit</li>
                  <li>Location: Electron cloud</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="activity-section">
            <h2>Try These Activities</h2>
            <div className="activity-grid">
              <div className="activity-card">
                <h3>Build a Neutral Atom</h3>
                <p>Set electrons equal to protons to create a neutral atom with no charge.</p>
              </div>
              
              <div className="activity-card">
                <h3>Create an Ion</h3>
                <p>Add or remove electrons to create positive or negative ions.</p>
              </div>
              
              <div className="activity-card">
                <h3>Make an Isotope</h3>
                <p>Change the number of neutrons to create different isotopes of the same element.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Simulation;