import { Button, Slider, Toggle } from "../atoms";

import "./ControlPanel.css";

const ControlPanel = ({
  protons,
  neutrons,
  electrons,
  onProtonsChange,
  onNeutronsChange,
  onElectronsChange,
  onReset,
  onRandomize,
  isIonMode,
  onIonModeToggle,
  className = "",
}) => {
  return (
    <div className={`control-panel ${className}`}>
      <h3 className="control-panel-title">Atom Builder</h3>

      <div className="control-group">
        <Slider
          label="Protons"
          min={1}
          max={12}
          value={protons}
          onChange={onProtonsChange}
          unit=""
        />

        <Slider
          label="Neutrons"
          min={0}
          max={14}
          value={neutrons}
          onChange={onNeutronsChange}
          unit=""
        />

        <Slider
          label="Electrons"
          min={1}
          max={12}
          value={electrons}
          onChange={onElectronsChange}
          unit=""
        />
      </div>

      <div className="control-actions">
        <Button variant="secondary" onClick={onReset} size="small">
          Reset
        </Button>

        <Button variant="primary" onClick={onRandomize} size="small">
          Randomize
        </Button>
      </div>

      <div className="control-mode">
        <Toggle
          label="Ion Mode"
          checked={isIonMode}
          onChange={onIonModeToggle}
        />
      </div>

      <div className="atom-properties">
        <div className="property">
          <span className="property-label">Atomic Number:</span>
          <span className="property-value">{protons}</span>
        </div>
        <div className="property">
          <span className="property-label">Mass Number:</span>
          <span className="property-value">{protons + neutrons}</span>
        </div>
        <div className="property">
          <span className="property-label">Charge:</span>
          <span className="property-value">
            {protons === electrons
              ? "Neutral"
              : `${electrons - protons > 0 ? "+" : ""}${electrons - protons}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
