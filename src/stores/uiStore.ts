import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ActiveTab = 'results' | 'charts' | 'goal' | 'comparison' | 'withdrawal' | 'tax' | 'fire' | 'monte' | 'whatif' | 'ai' | 'scenarios';

interface UIState {
  darkMode: boolean;
  activeTab: ActiveTab;
  showHelp: boolean;
  toggleDarkMode: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  toggleHelp: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      darkMode: false,
      activeTab: 'results',
      showHelp: false,

      toggleDarkMode: () =>
        set((state) => {
          const newDarkMode = !state.darkMode;
          // Update document class for Tailwind dark mode
          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { darkMode: newDarkMode };
        }),

      setActiveTab: (tab) => set({ activeTab: tab }),

      toggleHelp: () => set((state) => ({ showHelp: !state.showHelp })),
    }),
    {
      name: 'ui-storage',
      // Initialize dark mode class on load
      onRehydrateStorage: () => (state) => {
        if (state?.darkMode) {
          document.documentElement.classList.add('dark');
        }
      },
    }
  )
);
