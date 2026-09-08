"use client"

import { create } from 'zustand'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  isOpen: boolean
  promoCode: string
  discountApplied: boolean
  open: () => void
  close: () => void
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  increase: (id: string) => void
  decrease: (id: string) => void
  remove: (id: string) => void
  applyPromo: (code: string) => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  promoCode: '',
  discountApplied: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  addItem: (item) => set((state) => {
    const existing = state.items.find((entry) => entry.id === item.id && entry.size === item.size && entry.color === item.color)
    return { items: existing ? state.items.map((entry) => entry.id === item.id && entry.size === item.size && entry.color === item.color ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...state.items, { ...item, quantity: 1 }], isOpen: true }
  }),
  increase: (id) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item) })),
  decrease: (id) => set((state) => ({ items: state.items.flatMap((item) => item.id === id ? (item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []) : [item]) })),
  remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  applyPromo: (code) => set({ promoCode: code, discountApplied: code.trim().toLowerCase() === 'dby10' }),
}))
