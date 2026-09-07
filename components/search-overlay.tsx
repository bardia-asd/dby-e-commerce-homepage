'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { useSearchStore } from '@/lib/search-store'

type SearchProduct = { name: string; price: string; image: string; en?: string }

type SearchOverlayProps = { products: SearchProduct[] }

const trending = ['پالتوی پشمی', 'شلوار کتان', 'پیراهن تابستانی', 'کیف چرم', 'بافت کشمیر']

export function SearchOverlay({ products }: SearchOverlayProps) {
  const { isOpen, query, close, setQuery } = useSearchStore()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return
    inputRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, close])

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('fa-IR')
    if (!normalized) return products.slice(0, 4)
    return products.filter((product) => [product.name, product.en].filter(Boolean).join(' ').toLocaleLowerCase('fa-IR').includes(normalized))
  }, [products, query])

  if (!isOpen) return null

  return <div className="search-overlay" role="dialog" aria-modal="true" aria-label="جستجوی محصولات">
    <button className="search-backdrop" aria-label="بستن جستجو" onClick={close} />
    <section className="search-panel" onClick={(event) => event.stopPropagation()}>
      <div className="search-topbar">
        <div className="search-field"><Search size={22} aria-hidden="true" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جستجوی استایل، محصول، مجموعه..." aria-label="جستجو" /></div>
        <button className="search-close" onClick={close} aria-label="بستن جستجو"><X size={24} /></button>
      </div>
      {!query && <div className="search-trending"><span className="search-label">پرکاربردترین جستجوها</span><div className="search-pills">{trending.map((item) => <button key={item} onClick={() => setQuery(item)}>{item}</button>)}</div></div>}
      <div className="search-featured"><span className="search-label">{query ? 'نتایج جستجو' : 'محصولات ویژه'}</span>{results.length ? <div className="search-product-grid">{results.map((product) => <article className="search-product" key={product.name}><div className="search-product-image"><img src={product.image} alt={product.name} /></div><h3>{product.name}</h3><span>{product.price}</span></article>)}</div> : <p className="search-empty">محصولی با این عبارت پیدا نشد.</p>}</div>
    </section>
  </div>
}
