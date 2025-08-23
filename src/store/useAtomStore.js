import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAtomStore = create(
  persist(
    (set, get) => ({
      // Atomic state
      protons: 6,
      neutrons: 6,
      electrons: 6,
      isIonMode: false,

      // Actions
      setProtons: (protons) =>
        set({ protons: Math.max(1, Math.min(118, protons)) }),
      setNeutrons: (neutrons) => set({ neutrons: Math.max(0, neutrons) }),
      setElectrons: (electrons) => set({ electrons: Math.max(1, electrons) }),
      setIonMode: (isIonMode) => {
        set({ isIonMode });
        const { protons } = get();

        if (isIonMode) {
          // Create a simple ion: add or remove 1-3 electrons randomly
          const charge = Math.floor(Math.random() * 3) + 1; // 1,2,3
          const addOrRemove = Math.random() < 0.5 ? -1 : 1;
          set({ electrons: Math.max(1, protons + addOrRemove * charge) });
        } else {
          // Neutral atom
          set({ electrons: protons });
        }
      },

      // Derived properties
      getAtomicNumber: () => get().protons,
      getMassNumber: () => get().protons + get().neutrons,
      getCharge: () => get().electrons - get().protons,

      // Helper actions
      resetAtom: () =>
        set({ protons: 6, neutrons: 6, electrons: 6, isIonMode: false }),
      randomizeAtom: () => {
        const protons = Math.floor(Math.random() * 12) + 1;
        const neutrons = Math.floor(Math.random() * 14);
        const electrons = get().isIonMode
          ? Math.max(1, protons + Math.floor(Math.random() * 5) - 2)
          : protons;

        set({ protons, neutrons, electrons });
      },

      // History for undo/redo
      history: [],
      historyIndex: -1,
      addToHistory: () => {
        const currentState = {
          protons: get().protons,
          neutrons: get().neutrons,
          electrons: get().electrons,
        };

        set((state) => ({
          history: [
            ...state.history.slice(0, state.historyIndex + 1),
            currentState,
          ],
          historyIndex: state.historyIndex + 1,
        }));
      },

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          const previousState = history[historyIndex - 1];
          set({
            ...previousState,
            historyIndex: historyIndex - 1,
          });
        }
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          const nextState = history[historyIndex + 1];
          set({
            ...nextState,
            historyIndex: historyIndex + 1,
          });
        }
      },
    }),
    {
      name: "atom-storage",
      // Add this partialize function to only persist serializable data
      partialize: (state) => ({
        protons: state.protons,
        neutrons: state.neutrons,
        electrons: state.electrons,
        isIonMode: state.isIonMode,
        // Don't persist history arrays as they might contain circular references
        history: [],
        historyIndex: -1,
      }),
    }
  )
);
