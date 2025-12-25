import { create } from 'zustand'

export const useUser = create((set) => ({
  user: {},
  setUser: (data) => set(() => ({ user: data })),
  removeUser: () => set({ user: {} }),
}))