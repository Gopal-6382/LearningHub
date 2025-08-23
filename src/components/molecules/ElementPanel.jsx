import { Tooltip } from "../atoms";
import "./ElementInfo.css";

const ElementInfo = ({ element, className = "" }) => {
  if (!element) {
    return (
      <div className={`element-info ${className}`}>
        <div className="element-info-placeholder">
          Build an atom to see element information
        </div>
      </div>
    );
  }

  return (
    <div className={`element-info ${className}`}>
      <div className="element-header">
        <div className="element-symbol">{element.symbol}</div>
        <div className="element-name">{element.name}</div>
        <div className="element-number">
          Atomic Number: {element.atomicNumber}
        </div>
      </div>

      <div className="element-details">
        <div className="detail-row">
          <span className="detail-label">Atomic Mass:</span>
          <span className="detail-value">{element.atomicMass}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Category:</span>
          <span className="detail-value">{element.category}</span>
        </div>

        <div className="detail-row">
          <span className="detail-label">Electron Configuration:</span>
          <Tooltip content="Distribution of electrons in atomic orbitals">
            <span className="detail-value with-tooltip">
              {element.electronConfiguration}
            </span>
          </Tooltip>
        </div>

        <div className="detail-row">
          <span className="detail-label">Electronegativity:</span>
          <span className="detail-value">{element.electronegativity}</span>
        </div>
      </div>

      <div className="element-description">
        <h4>About {element.name}</h4>
        <p>{element.description}</p>
      </div>

      {element.uses && (
        <div className="element-uses">
          <h4>Common Uses</h4>
          <ul>
            {element.uses.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ElementInfo;
