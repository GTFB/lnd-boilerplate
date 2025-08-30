import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // UI State
  sidebarOpen: boolean;
  searchOpen: boolean;

  // User State
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
  } | null;

  // App State
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    timestamp: Date;
  }>;

  // Actions
  toggleSidebar: () => void;
  toggleSearch: () => void;
  setUser: (user: AppState['user']) => void;
  addNotification: (
    notification: Omit<AppState['notifications'][0], 'id' | 'timestamp'>
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      sidebarOpen: false,
      searchOpen: false,
      user: null,
      notifications: [],

      // Actions
      toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
      toggleSearch: () => set(state => ({ searchOpen: !state.searchOpen })),

      setUser: user => set({ user }),

      addNotification: notification =>
        set(state => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: Math.random().toString(36).substr(2, 9),
              timestamp: new Date(),
            },
          ],
        })),

      removeNotification: id =>
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'app-storage',
      partialize: state => ({
        user: state.user,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
