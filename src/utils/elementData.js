// src/utils/elementData.js
export const elementCategories = [
  'alkali-metal',
  'alkaline-earth-metal',
  'transition-metal',
  'post-transition-metal',
  'metalloid',
  'nonmetal',
  'halogen',
  'noble-gas',
  'lanthanide',
  'actinide'
];

export const elementData = [
  {
    atomicNumber: 1,
    symbol: 'H',
    name: 'Hydrogen',
    atomicMass: 1.008,
    category: 'nonmetal',
    period: 1,
    group: 1,
    electronConfiguration: '1s1',
    electronegativity: 2.2,
    description: 'Hydrogen is the lightest and most abundant element in the universe. It is a colorless, odorless gas that is highly flammable.',
    uses: [
      'Rocket fuel',
      'Hydrogenation of fats and oils',
      'Production of ammonia',
      'Welding processes'
    ],
    discoveredBy: 'Henry Cavendish',
    discoveryYear: 1766,
    phase: 'gas',
    density: 0.00008988,
    melt: 14.01,
    boil: 20.28,
    color: '#ffffff'
  },
  {
    atomicNumber: 2,
    symbol: 'He',
    name: 'Helium',
    atomicMass: 4.0026,
    category: 'noble-gas',
    period: 1,
    group: 18,
    electronConfiguration: '1s2',
    electronegativity: null,
    description: 'Helium is a noble gas that is lighter than air and non-flammable. It is the second most abundant element in the universe.',
    uses: [
      'Balloons and airships',
      'Cooling MRI magnets',
      'Pressurizing rocket fuel',
      'Deep-sea diving mixtures'
    ],
    discoveredBy: 'Pierre Janssen',
    discoveryYear: 1868,
    phase: 'gas',
    density: 0.0001785,
    melt: 0.95,
    boil: 4.22,
    color: '#d9ffff'
  },
  {
    atomicNumber: 3,
    symbol: 'Li',
    name: 'Lithium',
    atomicMass: 6.94,
    category: 'alkali-metal',
    period: 2,
    group: 1,
    electronConfiguration: '1s2 2s1',
    electronegativity: 0.98,
    description: 'Lithium is the lightest metal and is highly reactive. It is soft enough to be cut with a knife.',
    uses: [
      'Lithium-ion batteries',
      'Psychiatric medications',
      'Aluminum production',
      'Glass and ceramics'
    ],
    discoveredBy: 'Johan August Arfwedson',
    discoveryYear: 1817,
    phase: 'solid',
    density: 0.534,
    melt: 453.69,
    boil: 1560,
    color: '#cc80ff'
  },
  {
    atomicNumber: 4,
    symbol: 'Be',
    name: 'Beryllium',
    atomicMass: 9.0122,
    category: 'alkaline-earth-metal',
    period: 2,
    group: 2,
    electronConfiguration: '1s2 2s2',
    electronegativity: 1.57,
    description: 'Beryllium is a lightweight but extremely stiff metal. It is toxic and must be handled with care.',
    uses: [
      'X-ray equipment windows',
      'Aerospace components',
      'Nuclear reactors',
      'Precision instruments'
    ],
    discoveredBy: 'Louis Nicolas Vauquelin',
    discoveryYear: 1798,
    phase: 'solid',
    density: 1.85,
    melt: 1560,
    boil: 2742,
    color: '#c2ff00'
  },
  {
    atomicNumber: 5,
    symbol: 'B',
    name: 'Boron',
    atomicMass: 10.81,
    category: 'metalloid',
    period: 2,
    group: 13,
    electronConfiguration: '1s2 2s2 2p1',
    electronegativity: 2.04,
    description: 'Boron is a metalloid that exists in several allotropic forms. It is essential for plant growth.',
    uses: [
      'Glass and ceramics',
      'Detergents and bleaches',
      'Semiconductors',
      'Neutron absorption'
    ],
    discoveredBy: 'Joseph Louis Gay-Lussac',
    discoveryYear: 1808,
    phase: 'solid',
    density: 2.34,
    melt: 2349,
    boil: 4200,
    color: '#ffb5b5'
  },
  {
    atomicNumber: 6,
    symbol: 'C',
    name: 'Carbon',
    atomicMass: 12.011,
    category: 'nonmetal',
    period: 2,
    group: 14,
    electronConfiguration: '1s2 2s2 2p2',
    electronegativity: 2.55,
    description: 'Carbon is the basis of all known life. It forms more compounds than any other element.',
    uses: [
      'Steel production',
      'Diamonds and graphite',
      'Organic chemistry',
      'Carbon dating'
    ],
    discoveredBy: 'Ancient times',
    discoveryYear: null,
    phase: 'solid',
    density: 2.267,
    melt: 3915,
    boil: 3915,
    color: '#909090'
  },
  {
    atomicNumber: 7,
    symbol: 'N',
    name: 'Nitrogen',
    atomicMass: 14.007,
    category: 'nonmetal',
    period: 2,
    group: 15,
    electronConfiguration: '1s2 2s2 2p3',
    electronegativity: 3.04,
    description: 'Nitrogen makes up 78% of Earth\'s atmosphere. It is essential for proteins and DNA.',
    uses: [
      'Fertilizers',
      'Refrigerant',
      'Explosives',
      'Food packaging'
    ],
    discoveredBy: 'Daniel Rutherford',
    discoveryYear: 1772,
    phase: 'gas',
    density: 0.001251,
    melt: 63.15,
    boil: 77.36,
    color: '#3050f8'
  },
  {
    atomicNumber: 8,
    symbol: 'O',
    name: 'Oxygen',
    atomicMass: 15.999,
    category: 'nonmetal',
    period: 2,
    group: 16,
    electronConfiguration: '1s2 2s2 2p4',
    electronegativity: 3.44,
    description: 'Oxygen is essential for respiration and combustion. It is the most abundant element in Earth\'s crust.',
    uses: [
      'Medical treatment',
      'Steel production',
      'Water treatment',
      'Rocket propulsion'
    ],
    discoveredBy: 'Carl Wilhelm Scheele',
    discoveryYear: 1771,
    phase: 'gas',
    density: 0.001429,
    melt: 54.36,
    boil: 90.2,
    color: '#ff0d0d'
  },
  {
    atomicNumber: 9,
    symbol: 'F',
    name: 'Fluorine',
    atomicMass: 18.998,
    category: 'halogen',
    period: 2,
    group: 17,
    electronConfiguration: '1s2 2s2 2p5',
    electronegativity: 3.98,
    description: 'Fluorine is the most reactive and electronegative element. It is a pale yellow gas.',
    uses: [
      'Toothpaste additive',
      'Teflon production',
      'Uranium processing',
      'Refrigerants'
    ],
    discoveredBy: 'Henri Moissan',
    discoveryYear: 1886,
    phase: 'gas',
    density: 0.001696,
    melt: 53.53,
    boil: 85.03,
    color: '#90e050'
  },
  {
    atomicNumber: 10,
    symbol: 'Ne',
    name: 'Neon',
    atomicMass: 20.18,
    category: 'noble-gas',
    period: 2,
    group: 18,
    electronConfiguration: '1s2 2s2 2p6',
    electronegativity: null,
    description: 'Neon is a noble gas that produces a distinctive orange-red glow when used in signs.',
    uses: [
      'Advertising signs',
      'High-voltage indicators',
      'Cryogenic refrigerant',
      'Lasers'
    ],
    discoveredBy: 'William Ramsay',
    discoveryYear: 1898,
    phase: 'gas',
    density: 0.0008999,
    melt: 24.56,
    boil: 27.07,
    color: '#b3e3f5'
  },
  {
    atomicNumber: 11,
    symbol: 'Na',
    name: 'Sodium',
    atomicMass: 22.99,
    category: 'alkali-metal',
    period: 3,
    group: 1,
    electronConfiguration: '1s2 2s2 2p6 3s1',
    electronegativity: 0.93,
    description: 'Sodium is a soft, silvery-white metal that is highly reactive. It is essential for nerve function.',
    uses: [
      'Table salt (sodium chloride)',
      'Street lighting',
      'Coolant in nuclear reactors',
      'Organic synthesis'
    ],
    discoveredBy: 'Humphry Davy',
    discoveryYear: 1807,
    phase: 'solid',
    density: 0.968,
    melt: 370.87,
    boil: 1156,
    color: '#ab5cf2'
  },
  {
    atomicNumber: 12,
    symbol: 'Mg',
    name: 'Magnesium',
    atomicMass: 24.305,
    category: 'alkaline-earth-metal',
    period: 3,
    group: 2,
    electronConfiguration: '1s2 2s2 2p6 3s2',
    electronegativity: 1.31,
    description: 'Magnesium is a lightweight metal that burns with a bright white flame. It is essential for plant photosynthesis.',
    uses: [
      'Aluminum alloys',
      'Fireworks and flares',
      'Medical supplements',
      'Automotive parts'
    ],
    discoveredBy: 'Joseph Black',
    discoveryYear: 1755,
    phase: 'solid',
    density: 1.738,
    melt: 923,
    boil: 1363,
    color: '#8aff00'
  }
];

// Helper functions for element data 

export const getElementByAtomicNumber = (atomicNumber) => {
  return elementData.find(element => element.atomicNumber === atomicNumber);
};

export const getElementBySymbol = (symbol) => {
  return elementData.find(element => element.symbol.toLowerCase() === symbol.toLowerCase());
};

export const getElementsByCategory = (category) => {
  return elementData.filter(element => element.category === category);
};

export const getElementsByPeriod = (period) => {
  return elementData.filter(element => element.period === period);
};

export const getElementsByGroup = (group) => {
  return elementData.filter(element => element.group === group);
};

// Element search show this when search 
export const searchElements = (query) => {
  const searchTerm = query.toLowerCase();
  return elementData.filter(element => 
    element.name.toLowerCase().includes(searchTerm) ||
    element.symbol.toLowerCase().includes(searchTerm) ||
    element.atomicNumber.toString().includes(searchTerm) ||
    element.category.toLowerCase().includes(searchTerm)
  );
};

export default elementData;