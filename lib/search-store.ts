'use client'

import { create } from 'zustand'

type SearchState = {
  isOpen: boolean
  menuOpen: boolean
  query: string
  open: () => void
  close: () => void
  openMenu: () => void
  closeMenu: () => void
  setQuery: (query: string) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  menuOpen: false,
  query: '',
  open: () => set({ isOpen: true, menuOpen: false }),
  close: () => set({ isOpen: false, query: '' }),
  openMenu: () => set({ menuOpen: true, isOpen: false }),
  closeMenu: () => set({ menuOpen: false }),
  setQuery: (query) => set({ query }),
}))
