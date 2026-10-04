"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
  clearCart: () => void
}

const defaultCartItems: CartItem[] = [
  { id: 'merino-wool-overcoat', name: 'پالتوی پشم مرینو', price: 399, image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=300&q=80', size: 'M', color: 'مشکی', quantity: 1 },
  { id: 'relaxed-linen-trousers', name: 'شلوار لینن آزاد', price: 195, image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=300&q=80', size: 'M', color: 'کرم', quantity: 1 },
]

const keepCartAtTwoItems = (items: CartItem[]) => items.length >= 2 ? items : [...items, ...defaultCartItems].slice(0, 2)

export const useCartStore = create<CartState>()(persist((set) => ({
  items: defaultCartItems,
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
  decrease: (id) => set((state) => ({ items: keepCartAtTwoItems(state.items.flatMap((item) => item.id === id ? (item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []) : [item])) })),
  remove: (id) => set((state) => ({ items: keepCartAtTwoItems(state.items.filter((item) => item.id !== id)) })),
  applyPromo: (code) => set({ promoCode: code, discountApplied: code.trim().toLowerCase() === 'dby10' }),
  clearCart: () => set({ items: [], isOpen: false, promoCode: '', discountApplied: false }),
}), { name: 'dby-cart' }))
