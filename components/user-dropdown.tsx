'use client'

import Link from 'next/link'
import { ChevronDown, Heart, LogOut, MapPin, Package, Settings, UserRound } from 'lucide-react'
import { useState } from 'react'

export function UserDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div className="user-dropdown">
      <button type="button" className={`user-dropdown-trigger${open ? ' is-open' : ''}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="منوی حساب کاربری">
        <UserRound size={18} />
        <ChevronDown size={13} />
      </button>
      {open && <div className="user-dropdown-panel" role="menu">
        <div className="user-dropdown-heading"><span className="user-dropdown-avatar"><UserRound size={17} /></span><div><strong>سلام، سارا</strong><small>حساب کاربری شما</small></div></div>
        <Link href="/account" role="menuitem" onClick={() => setOpen(false)}><UserRound size={15} />حساب من</Link>
        <Link href="/account?tab=orders" role="menuitem" onClick={() => setOpen(false)}><Package size={15} />سفارش‌های من</Link>
        <Link href="/account?tab=addresses" role="menuitem" onClick={() => setOpen(false)}><MapPin size={15} />آدرس‌ها</Link>
        <Link href="/account?tab=wishlist" role="menuitem" onClick={() => setOpen(false)}><Heart size={15} />علاقه‌مندی‌ها</Link>
        <Link href="/account?tab=settings" role="menuitem" onClick={() => setOpen(false)}><Settings size={15} />تنظیمات</Link>
        <button type="button" role="menuitem" onClick={() => setOpen(false)}><LogOut size={15} />خروج از حساب</button>
      </div>}
    </div>
  )
}
