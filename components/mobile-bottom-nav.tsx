'use client'

import Link from 'next/link'
import { Heart, Home, LayoutGrid, ShoppingBag, UserRound } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'

export function MobileBottomNav() {
  const openCart = useCartStore((state) => state.open)
  const cartCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))

  return (
    <nav className="mobile-bottom-nav" aria-label="ناوبری موبایل" dir="rtl">
      <Link href="/" aria-label="خانه"><Home size={19} /><span>خانه</span></Link>
      <button type="button" onClick={openCart} aria-label="سبد خرید"><span className="bottom-cart-icon"><ShoppingBag size={19} />{cartCount > 0 && <b>{cartCount}</b>}</span><span>سبد</span></button>
      <Link href="/account" aria-label="حساب کاربری"><UserRound size={19} /><span>حساب</span></Link>
      <Link href="/products" aria-label="دسته‌بندی‌ها"><LayoutGrid size={19} /><span>دسته‌بندی</span></Link>
      <Link href="/favorites" aria-label="علاقه‌مندی‌ها"><Heart size={19} /><span>علاقه‌مندی</span></Link>
    </nav>
  )
}
