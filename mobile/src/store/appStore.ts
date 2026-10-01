import { create } from 'zustand';

interface AppState {
  unreadNotificationCount: number;
  unreadMessageCount: number;
  activeConversationId: string | null;
  isOnline: boolean;
  setUnreadNotificationCount: (count: number) => void;
  setUnreadMessageCount: (count: number) => void;
  incrementUnreadMessages: () => void;
  setActiveConversation: (id: string | null) => void;
  setOnlineStatus: (online: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  unreadNotificationCount: 0,
  unreadMessageCount: 0,
  activeConversationId: null,
  isOnline: true,

  setUnreadNotificationCount: (count) => set({ unreadNotificationCount: count }),

  setUnreadMessageCount: (count) => set({ unreadMessageCount: count }),

  incrementUnreadMessages: () =>
    set((state) => ({ unreadMessageCount: state.unreadMessageCount + 1 })),

  setActiveConversation: (activeConversationId) => set({ activeConversationId }),

  setOnlineStatus: (isOnline) => set({ isOnline }),
}));
