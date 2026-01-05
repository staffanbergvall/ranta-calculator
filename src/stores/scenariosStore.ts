import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Scenario } from '../types/scenarios';
import { ExtendedCalculatorParams } from '../types/calculator';

interface ScenariosState {
  scenarios: Scenario[];
  saveScenario: (name: string, params: ExtendedCalculatorParams) => void;
  deleteScenario: (id: string) => void;
  renameScenario: (id: string, newName: string) => void;
  loadScenario: (id: string) => Scenario | undefined;
  clearAll: () => void;
}

export const useScenariosStore = create<ScenariosState>()(
  persist(
    (set, get) => ({
      scenarios: [],

      saveScenario: (name, params) =>
        set((state) => ({
          scenarios: [
            ...state.scenarios,
            {
              id: crypto.randomUUID(),
              name,
              params,
              createdAt: new Date(),
              color: generateScenarioColor(state.scenarios.length),
            },
          ],
        })),

      deleteScenario: (id) =>
        set((state) => ({
          scenarios: state.scenarios.filter((s) => s.id !== id),
        })),

      renameScenario: (id, newName) =>
        set((state) => ({
          scenarios: state.scenarios.map((s) => (s.id === id ? { ...s, name: newName } : s)),
        })),

      loadScenario: (id) => {
        return get().scenarios.find((s) => s.id === id);
      },

      clearAll: () => set({ scenarios: [] }),
    }),
    {
      name: 'scenarios-storage',
    }
  )
);

// Helper function to generate colors for scenarios
function generateScenarioColor(index: number): string {
  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#14B8A6', // teal
    '#F97316', // orange
  ];
  return colors[index % colors.length];
}
