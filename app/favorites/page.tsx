'use client'

import Link from 'next/link'
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { SiteFooter } from '@/components/site-footer'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { MobileHeaderSearch } from '@/components/mobile-header-search'
import { UserDropdown } from '@/components/user-dropdown'

type Favorite = { slug: string; name: string; english: string; price: string; old?: string; image: string; tag?: string }

const initialFavorites: Favorite[] = [
  { slug: 'merino-wool-overcoat', name: 'پالتوی پشم مرینو', english: 'Merino Wool Overcoat', price: '۴۸۵ دلار', old: '۶۸۰ دلار', image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85', tag: 'پیشنهاد ویژه' },
  { slug: 'essential-cotton-hoodie', name: 'هودی کتان مینیمال', english: 'Essential Cotton Hoodie', price: '۱۴۵ دلار', old: '۱۹۵ دلار', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85', tag: 'پرفروش' },
  { slug: 'structured-tote-bag', name: 'کیف دستی ساختاری', english: 'Structured Tote Bag', price: '۲۱۵ دلار', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85' },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites)
  const removeFavorite = (slug: string) => setFavorites((items) => items.filter((item) => item.slug !== slug))

  return <main className="favorites-page" dir="rtl">
    <header className="favorites-header">
      <Link href="/" className="logo">DBY</Link>
      <nav><Link href="/">خانه</Link><Link href="/products">محصولات</Link><Link href="/favorites" className="active">علاقه‌مندی‌ها</Link></nav>
      <div className="favorites-actions"><MobileHeaderSearch /><UserDropdown /></div>
    </header>
    <section className="favorites-shell">
      <div className="favorites-intro"><div><span className="eyebrow">COLLECTED BY YOU</span><h1>علاقه‌مندی‌های من</h1><p>{favorites.length} محصول ذخیره شده برای بعد</p></div><Heart size={28} strokeWidth={1.4} /></div>
      {favorites.length ? <><div className="favorites-toolbar"><span>محصولات ذخیره‌شده</span><button type="button" onClick={() => setFavorites([])}><Trash2 size={14} /> پاک کردن همه</button></div><div className="favorites-grid">{favorites.map((item) => <article className="favorite-card" key={item.slug}><div className="favorite-image"><img src={item.image} alt={item.name} />{item.tag && <span>{item.tag}</span>}<button type="button" onClick={() => removeFavorite(item.slug)} aria-label={`حذف ${item.name} از علاقه‌مندی‌ها`}><Heart size={17} fill="currentColor" /></button></div><div className="favorite-meta"><div><small>DBY · {item.english}</small><h2>{item.name}</h2></div><strong>{item.price}</strong></div><div className="favorite-bottom"><span className="favorite-rating">★★★★★</span>{item.old && <del>{item.old}</del>}<Link href={`/product?product=${item.slug}`}><ArrowLeft size={14} /> مشاهده محصول</Link></div></article>)}</div></> : <div className="favorites-empty"><Heart size={38} strokeWidth={1.2} /><h2>هنوز محصولی ذخیره نکرده‌اید</h2><p>محصولات مورد علاقه‌تان را ذخیره کنید تا بعداً راحت‌تر به آن‌ها برگردید.</p><Link href="/products">مشاهده محصولات <ArrowLeft size={15} /></Link></div>}
    </section>
    <SiteFooter /><MobileBottomNav />
  </main>
}
