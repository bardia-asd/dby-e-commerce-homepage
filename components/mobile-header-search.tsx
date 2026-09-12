'use client'

import { Search } from 'lucide-react'
import { useSearchStore } from '@/lib/search-store'

export function MobileHeaderSearch() {
  const openSearch = useSearchStore((state) => state.open)
  return <button type="button" className="mobile-header-search" aria-label="جستجو" onClick={openSearch}><Search size={19} /></button>
}
