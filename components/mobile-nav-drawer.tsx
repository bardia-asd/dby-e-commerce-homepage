'use client'

import { useEffect } from 'react'
import { Search, ShoppingBag, X, ChevronLeft } from 'lucide-react'
import { useSearchStore } from '@/lib/search-store'

const links = [
  ['خانه', '#top'],
  ['مردانه', '#new'],
  ['زنانه', '#new'],
  ['محصولات جدید', '#new'],
  ['مجموعه‌ها', '#collections'],
  ['حراج', '#best'],
  ['اکسسوری', '#categories'],
] as const

export function MobileNavDrawer() {
  const isOpen = useSearchStore((state) => state.menuOpen)
  const close = useSearchStore((state) => state.closeMenu)
  const openSearch = useSearchStore((state) => state.open)

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [close, isOpen])

  if (!isOpen) return null

  return (
    <div className="mobile-nav-layer" dir="rtl">
      <button className="mobile-nav-backdrop" onClick={close} aria-label="بستن منو" />
      <aside className="mobile-nav-drawer" aria-label="منوی موبایل">
        <div className="mobile-nav-header">
          <div className="logo">DBY</div>
          <div className="mobile-nav-actions">
            <button onClick={openSearch} aria-label="جستجو"><Search size={20} /></button>
            <button className="mobile-cart" aria-label="سبد خرید"><ShoppingBag size={20} /><span>۱</span></button>
            <button onClick={close} aria-label="بستن منو"><X size={21} /></button>
          </div>
        </div>
        <nav className="mobile-nav-list">
          {links.map(([label, href]) => (
            <a href={href} onClick={close} key={label}>
              <span>{label}</span>
              <ChevronLeft size={17} aria-hidden="true" />
            </a>
          ))}
        </nav>
      </aside>
    </div>
  )
}
