import { useState, useCallback, useMemo } from "react";
import { elementData } from "../utils/elementData";

const useAtomBuilder = (
  initialProtons = 6,
  initialNeutrons = 6,
  initialElectrons = 6
) => {
  const [protons, setProtons] = useState(initialProtons);
  const [neutrons, setNeutrons] = useState(initialNeutrons);
  const [electrons, setElectrons] = useState(initialElectrons);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Calculate derived properties
  const atomicNumber = protons;
  const massNumber = protons + neutrons;
  const charge = electrons - protons;

  // Find the element based on proton count
  const element = useMemo(() => {
    return elementData.find((e) => e.atomicNumber === protons) || null;
  }, [protons]);

  // Update atom configuration
  const updateAtom = useCallback(
    (newProtons, newNeutrons, newElectrons) => {
      const newState = {
        protons: newProtons,
        neutrons: newNeutrons,
        electrons: newElectrons,
      };

      // Add to history (for undo/redo)
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(newState);
        return newHistory;
      });
      setHistoryIndex((prev) => prev + 1);

      setProtons(newProtons);
      setNeutrons(newNeutrons);
      setElectrons(newElectrons);
    },
    [historyIndex]
  );

  // Individual setters with validation
  const setProtonsSafe = useCallback(
    (value) => {
      const newProtons = Math.max(1, Math.min(118, value)); // Limit to known elements
      const newNeutrons = Math.max(0, neutrons);
      const newElectrons = Math.max(1, electrons);
      updateAtom(newProtons, newNeutrons, newElectrons);
    },
    [neutrons, electrons, updateAtom]
  );

  const setNeutronsSafe = useCallback(
    (value) => {
      const newNeutrons = Math.max(0, value);
      updateAtom(protons, newNeutrons, electrons);
    },
    [protons, electrons, updateAtom]
  );

  const setElectronsSafe = useCallback(
    (value) => {
      const newElectrons = Math.max(1, value);
      updateAtom(protons, neutrons, newElectrons);
    },
    [protons, neutrons, updateAtom]
  );

  // Reset to default atom
  const resetAtom = useCallback(() => {
    updateAtom(initialProtons, initialNeutrons, initialElectrons);
  }, [initialProtons, initialNeutrons, initialElectrons, updateAtom]);

  // Randomize atom
  const randomizeAtom = useCallback(() => {
    const randomProtons = Math.floor(Math.random() * 12) + 1; // 1-12 for common elements
    const randomNeutrons = Math.floor(Math.random() * 14);
    const randomElectrons = Math.max(
      1,
      randomProtons + Math.floor(Math.random() * 3) - 1
    ); // Allow ions

    updateAtom(randomProtons, randomNeutrons, randomElectrons);
  }, [updateAtom]);

  // Create ion by adding/removing electrons
  const createIon = useCallback(
    (chargeChange) => {
      const newElectrons = Math.max(1, electrons + chargeChange);
      setElectronsSafe(newElectrons);
    },
    [electrons, setElectronsSafe]
  );

  // Create isotope by changing neutrons
  const createIsotope = useCallback(
    (neutronChange) => {
      const newNeutrons = Math.max(0, neutrons + neutronChange);
      setNeutronsSafe(newNeutrons);
    },
    [neutrons, setNeutronsSafe]
  );

  // Undo/redo functionality
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = useCallback(() => {
    if (canUndo) {
      const previousState = history[historyIndex - 1];
      setProtons(previousState.protons);
      setNeutrons(previousState.neutrons);
      setElectrons(previousState.electrons);
      setHistoryIndex((prev) => prev - 1);
    }
  }, [canUndo, history, historyIndex]);

  const redo = useCallback(() => {
    if (canRedo) {
      const nextState = history[historyIndex + 1];
      setProtons(nextState.protons);
      setNeutrons(nextState.neutrons);
      setElectrons(nextState.electrons);
      setHistoryIndex((prev) => prev + 1);
    }
  }, [canRedo, history, historyIndex]);

  // Export atom data
  const atomData = useMemo(
    () => ({
      protons,
      neutrons,
      electrons,
      atomicNumber,
      massNumber,
      charge,
      element,
      isStable:
        Math.abs(charge) <= 2 &&
        neutrons >= protons - 2 &&
        neutrons <= protons + 2,
      electronConfiguration: calculateElectronConfiguration(electrons),
      history: {
        canUndo,
        canRedo,
        undo,
        redo,
      },
    }),
    [
      protons,
      neutrons,
      electrons,
      atomicNumber,
      massNumber,
      charge,
      element,
      canUndo,
      canRedo,
      undo,
      redo,
    ]
  );

  return {
    // State
    ...atomData,

    // Actions
    setProtons: setProtonsSafe,
    setNeutrons: setNeutronsSafe,
    setElectrons: setElectronsSafe,
    updateAtom,
    resetAtom,
    randomizeAtom,
    createIon,
    createIsotope,

    // History
    history: atomData.history,
  };
};

// Helper function to calculate electron configuration
const calculateElectronConfiguration = (electronCount) => {
  const shells = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p", "5s"];
  const maxElectrons = [2, 2, 6, 2, 6, 2, 10, 6, 2];

  let remainingElectrons = electronCount;
  const configuration = [];

  for (let i = 0; i < shells.length && remainingElectrons > 0; i++) {
    const electronsInShell = Math.min(remainingElectrons, maxElectrons[i]);
    configuration.push(`${shells[i]}${electronsInShell}`);
    remainingElectrons -= electronsInShell;
  }

  return configuration.join(" ");
};

export default useAtomBuilder;
