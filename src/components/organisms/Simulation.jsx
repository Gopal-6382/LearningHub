import{ useRef, useEffect, useState } from "react";
import { Stage, Layer, Circle, Text } from "react-konva";
import { motion } from "framer-motion"; // Removed unused AnimatePresence
import { Button, Tooltip } from "../atoms";
import { ControlPanel, ElementInfo } from "../molecules";
import { useAtomStore } from "../../store/useAtomStore";
import { Play, Pause, RotateCcw, Shuffle, Atom } from "lucide-react";

const Simulation = ({ className = "" }) => {
  const {
    protons,
    neutrons,
    electrons,
    isIonMode,
    setProtons,
    setNeutrons,
    setElectrons,
    setIonMode,
    resetAtom,
    randomizeAtom,
    getAtomicNumber,
    getMassNumber,
    getCharge,
  } = useAtomStore();

  // Get element data based on atomic number
  const element = getElementByAtomicNumber(protons);

  const [dimensions, setDimensions] = useState({ width: 500, height: 400 });
  const [isAnimating, setIsAnimating] = useState(true);
  const [electronAngles, setElectronAngles] = useState({});
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize electron angles
  useEffect(() => {
    const initialAngles = {};
    for (let i = 0; i < electrons; i++) {
      initialAngles[i] = Math.random() * Math.PI * 2;
    }
    setElectronAngles(initialAngles);
  }, [electrons]);

  // Handle container resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: Math.min(containerRef.current.offsetWidth, 500),
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Animation loop
  useEffect(() => {
    if (isAnimating) {
      const animate = () => {
        setElectronAngles((prev) => {
          const newAngles = { ...prev };
          Object.keys(newAngles).forEach((key) => {
            newAngles[key] = (newAngles[key] + 0.02) % (Math.PI * 2);
          });
          return newAngles;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  const calculateElectronPosition = (electronIndex, orbitRadius) => {
    const angle = electronAngles[electronIndex] || 0;
    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius;
    return { x, y };
  };

  const renderElectronShells = () => {
    const shells = [];
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    // Determine shell count based on electron configuration
    const shellCount = electrons <= 2 ? 1 : electrons <= 10 ? 2 : 3;

    for (let i = 0; i < shellCount; i++) {
      const radius = 50 + i * 70;
      shells.push(
        <Circle
          key={`shell-${i}`}
          x={centerX}
          y={centerY}
          radius={radius}
          stroke="#e5e7eb"
          strokeWidth={1}
          dash={[5, 5]}
          opacity={0.6}
        />
      );
    }

    return shells;
  };

  const renderElectrons = () => {
    const electronsArray = [];
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    // Determine shell count based on electron configuration
    const shellCount = electrons <= 2 ? 1 : electrons <= 10 ? 2 : 3;

    for (let i = 0; i < electrons; i++) {
      // Determine which shell this electron belongs to
      let shellIndex;
      if (i < 2) shellIndex = 0;
      else if (i < 10) shellIndex = 1;
      else shellIndex = 2;

      const radius = 50 + shellIndex * 70;
      const position = calculateElectronPosition(i, radius);

      electronsArray.push(
        <Circle
          key={`electron-${i}`}
          x={centerX + position.x}
          y={centerY + position.y}
          radius={8}
          fill="#4cc9f0"
          stroke="#3a0ca3"
          strokeWidth={2}
          shadowColor="rgba(76, 201, 240, 0.5)"
          shadowBlur={10}
          shadowOpacity={0.8}
        />
      );
    }

    return electronsArray;
  };

  const renderNucleus = () => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const nucleusSize = 20 + Math.min(protons + neutrons, 50) * 0.6;

     
    return (
      <>
        <Circle
          x={centerX}
          y={centerY}
          radius={nucleusSize}
          fill="#f24144"
          stroke="#d90429"
          strokeWidth={2}
          shadowColor="rgba(249, 65, 68, 0.5)"
          shadowBlur={15}
          shadowOpacity={0.7}
        />

        <Text
          x={centerX}
          y={centerY}
          text={`${protons}p\n${neutrons}n`}
          fontSize={14}
          fontFamily="sans-serif"
          fill={protons > neutrons ? "#ffff66" : "#00ffff"}
          align="center"
          verticalAlign="middle"
          width={nucleusSize * 2}
          height={nucleusSize * 2}
          offsetX={nucleusSize}
          offsetY={nucleusSize}
        />
      </>
    );
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-6 p-4 bg-white rounded-xl shadow-sm"
      >
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Atom className="mr-2" size={24} />
          Atomic Structure Simulation
        </h2>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="small"
            onClick={() => setIsAnimating(!isAnimating)}
            icon={isAnimating ? <Pause size={16} /> : <Play size={16} />}
          >
            {isAnimating ? "Pause" : "Play"}
          </Button>
          <Tooltip content="Reset to default element">
            <Button
              variant="secondary"
              size="small"
              onClick={resetAtom}
              icon={<RotateCcw size={16} />}
            >
              Reset
            </Button>
          </Tooltip>
          <Button
            variant="primary"
            size="small"
            onClick={randomizeAtom}
            icon={<Shuffle size={16} />}
          >
            Randomize
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Canvas */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 bg-gray-50 rounded-xl p-4 shadow-sm"
        >
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              {element?.name || "Unknown Element"}
            </h3>
            <p className="text-sm text-gray-500">
              {protons} protons, {neutrons} neutrons, {electrons} electrons
            </p>
          </div>

          <div
            className="simulation-canvas bg-white rounded-lg border border-gray-200 overflow-hidden"
            ref={containerRef}
          >
            <Stage width={dimensions.width} height={dimensions.height}>
              <Layer>
                {renderElectronShells()}
                {renderNucleus()}
                {renderElectrons()}
              </Layer>
            </Stage>
          </div>

          {/* Properties Summary */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-sm text-blue-600 font-medium">
                Atomic Number
              </div>
              <div className="text-xl font-bold text-blue-800">
                {getAtomicNumber()}
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-sm text-green-600 font-medium">
                Mass Number
              </div>
              <div className="text-xl font-bold text-green-800">
                {getMassNumber()}
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <div className="text-sm text-purple-600 font-medium">Charge</div>
              <div className="text-xl font-bold text-purple-800">
                {getCharge() === 0
                  ? "Neutral"
                  : `${getCharge() > 0 ? "+" : ""}${getCharge()}`}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-96"
        >
          <ControlPanel
            protons={protons}
            neutrons={neutrons}
            electrons={electrons}
            onProtonsChange={setProtons}
            onNeutronsChange={setNeutrons}
            onElectronsChange={setElectrons}
            onReset={resetAtom}
            onRandomize={randomizeAtom}
            isIonMode={isIonMode}
            onIonModeToggle={setIonMode}
          />
        </motion.div>
      </div>

      {/* Element Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <ElementInfo element={element} />
      </motion.div>
    </div>
  );
};

// Helper function to get element data
function getElementByAtomicNumber(atomicNumber) {
  const elements = {
    1: { name: "Hydrogen", symbol: "H", atomicMass: 1.008 },
    2: { name: "Helium", symbol: "He", atomicMass: 4.0026 },
    3: { name: "Lithium", symbol: "Li", atomicMass: 6.94 },
    4: { name: "Beryllium", symbol: "Be", atomicMass: 9.0122 },
    5: { name: "Boron", symbol: "B", atomicMass: 10.81 },
    6: { name: "Carbon", symbol: "C", atomicMass: 12.011 },
    7: { name: "Nitrogen", symbol: "N", atomicMass: 14.007 },
    8: { name: "Oxygen", symbol: "O", atomicMass: 15.999 },
    9: { name: "Fluorine", symbol: "F", atomicMass: 18.998 },
    10: { name: "Neon", symbol: "Ne", atomicMass: 20.18 },
    // Add more elements as needed
  };

  return elements[atomicNumber] || null;
}

export default Simulation;
