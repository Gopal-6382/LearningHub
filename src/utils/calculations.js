// Atomic mass calculations
export const calculateAtomicMass = (protons, neutrons) => {
  // Simplified calculation of atomic mass
  return protons + neutrons;
};

// Charge calculations
export const calculateCharge = (protons, electrons) => {
  return electrons - protons;
};

export const getChargeSymbol = (charge) => {
  if (charge === 0) return '';
  if (charge > 0) return `+${charge}`;
  return `${charge}`;
};

// Electron configuration calculations
export const calculateElectronConfiguration = (electronCount) => {
  const shells = [
    { shell: '1s', max: 2 },
    { shell: '2s', max: 2 },
    { shell: '2p', max: 6 },
    { shell: '3s', max: 2 },
    { shell: '3p', max: 6 },
    { shell: '4s', max: 2 },
    { shell: '3d', max: 10 },
    { shell: '4p', max: 6 },
    { shell: '5s', max: 2 },
    { shell: '4d', max: 10 },
    { shell: '5p', max: 6 },
    { shell: '6s', max: 2 },
    { shell: '4f', max: 14 },
    { shell: '5d', max: 10 },
    { shell: '6p', max: 6 },
    { shell: '7s', max: 2 },
    { shell: '5f', max: 14 },
    { shell: '6d', max: 10 },
    { shell: '7p', max: 6 }
  ];

  let remainingElectrons = electronCount;
  const configuration = [];

  for (const { shell, max } of shells) {
    if (remainingElectrons <= 0) break;
    
    const electronsInShell = Math.min(remainingElectrons, max);
    configuration.push(`${shell}${electronsInShell}`);
    remainingElectrons -= electronsInShell;
  }

  return configuration.join(' ');
};

// Stability calculations
export const calculateStability = (protons, neutrons) => {
  // Simplified stability calculation
  const neutronProtonRatio = neutrons / protons;
  
  if (protons <= 20) {
    // For light elements, stable when N ≈ Z
    return Math.abs(neutrons - protons) <= 2;
  } else {
    // For heavier elements, more neutrons are needed for stability
    return neutronProtonRatio >= 1 && neutronProtonRatio <= 1.5;
  }
};

// Binding energy approximation (simplified)
export const calculateBindingEnergy = (protons, neutrons) => {
  // Very simplified calculation - real binding energy requires complex nuclear models
  const massNumber = protons + neutrons;
  return 8.5 * massNumber - 0.00085 * massNumber * massNumber;
};

// Half-life estimation (very simplified)
export const estimateHalfLife = (protons, neutrons, isStable) => {
  if (isStable) return 'Stable';
  
  const instability = Math.abs(neutrons - protons);
  // const massNumber = protons + neutrons;
  
  // Very rough estimation for educational purposes
  if (instability > 10) return 'Milliseconds to seconds';
  if (instability > 5) return 'Seconds to minutes';
  if (instability > 2) return 'Minutes to hours';
  return 'Hours to years';
};

// Radioactive decay calculations
export const calculateDecay = (initialAmount, halfLife, time) => {
  return initialAmount * Math.pow(0.5, time / halfLife);
};

// pH calculation for ions (simplified)
export const calculatePH = (hPlusConcentration) => {
  return -Math.log10(hPlusConcentration);
};

// Energy level calculations for electrons
export const calculateEnergyLevel = (n) => {
  // Simplified energy calculation for hydrogen-like atoms: E = -13.6/n² eV
  return -13.6 / (n * n);
};

// Wavelength from energy transition
export const calculateWavelength = (initialLevel, finalLevel) => {
  const energyDifference = Math.abs(calculateEnergyLevel(finalLevel) - calculateEnergyLevel(initialLevel));
  if (energyDifference === 0) return 0;
  return 1240 / energyDifference; // Simplified formula in nanometers
};

// Isotope abundance calculation
export const calculateAverageAtomicMass = (isotopes) => {
  return isotopes.reduce((sum, isotope) => 
    sum + (isotope.mass * isotope.abundance), 0
  );
};

// Quantum number calculations
export const calculateQuantumNumbers = (electronConfig) => {
  // This is a simplified version for educational purposes
  const config = electronConfig.split(' ');
  const results = [];
  
  for (const orbital of config) {
    const [shell, electrons] = orbital.split(/(?=[0-9])/);
    const n = parseInt(shell[0]);
    const l = getAzimuthalQuantumNumber(shell[1]);
    
    for (let i = 0; i < parseInt(electrons); i++) {
      results.push({
        n,
        l,
        m: i - Math.floor(parseInt(electrons) / 2),
        s: i % 2 === 0 ? 0.5 : -0.5
      });
    }
  }
  
  return results;
};

const getAzimuthalQuantumNumber = (orbitalType) => {
  switch (orbitalType) {
    case 's': return 0;
    case 'p': return 1;
    case 'd': return 2;
    case 'f': return 3;
    default: return 0;
  }
};

// Element property predictions
export const predictElementProperties = (protons) => {
  if (protons <= 2) return 'Nonmetal, gas';
  if (protons <= 5) return 'Metalloid';
  if (protons <= 10) return 'Nonmetal';
  if (protons <= 12) return 'Metal';
  if (protons <= 18) return 'Nonmetal to metalloid';
  return 'Metal';
};

export default {
  calculateAtomicMass,
  calculateCharge,
  getChargeSymbol,
  calculateElectronConfiguration,
  calculateStability,
  calculateBindingEnergy,
  estimateHalfLife,
  calculateDecay,
  calculatePH,
  calculateEnergyLevel,
  calculateWavelength,
  calculateAverageAtomicMass,
  calculateQuantumNumbers,
  predictElementProperties
};