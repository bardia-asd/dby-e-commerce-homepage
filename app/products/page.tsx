'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ChevronDown, Menu, Search, ShoppingBag, SlidersHorizontal, UserRound } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { useSearchStore } from '@/lib/search-store'
import { FiltersPanel } from '@/components/filters-panel'
import { SiteFooter } from '@/components/site-footer'
import { MegaMenu } from '@/components/mega-menu'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { UserDropdown } from '@/components/user-dropdown'

const products = [
  { slug: 'merino-wool-overcoat', name: 'پالتوی پشم مرینو', en: 'Merino Wool Overcoat', price: 485, old: 680, image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=85', tag: 'جدید', category: 'Women' },
  { slug: 'relaxed-linen-trousers', name: 'شلوار لینن آزاد', en: 'Relaxed Linen Trousers', price: 195, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85', category: 'Men' },
  { slug: 'essential-cotton-hoodie', name: 'هودی کتان مینیمال', en: 'Essential Cotton Hoodie', price: 145, old: 195, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85', tag: 'پرفروش', category: 'Streetwear' },
  { slug: 'leather-derby-shoes', name: 'کفش دربی چرمی', en: 'Leather Derby Shoes', price: 325, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85', tag: 'جدید', category: 'Shoes' },
  { slug: 'structured-tote-bag', name: 'کیف دستی ساختاری', en: 'Structured Tote Bag', price: 215, image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85', category: 'Accessories' },
  { slug: 'technical-field-jacket', name: 'کت فیلد تکنیکال', en: 'Technical Field Jacket', price: 395, old: 520, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85', tag: 'فروش ویژه', category: 'Men' },
  { slug: 'cashmere-turtleneck', name: 'یقه‌اسکی کشمیر', en: 'Cashmere Turtleneck', price: 345, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85', tag: 'پریمیوم', category: 'Women' },
  { slug: 'silk-slip-dress', name: 'پیراهن اسلیپ ابریشمی', en: 'Silk Slip Dress', price: 275, old: 380, image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85', tag: 'فروش ویژه', category: 'Women' },
]
const categories = ['همه', 'مردانه', 'زنانه', 'استریت‌ویر', 'کفش', 'اکسسوری']
const categoryMap: Record<string, string> = { مردانه: 'Men', زنانه: 'Women', 'استریت‌ویر': 'Streetwear', کفش: 'Shoes', اکسسوری: 'Accessories' }

function ProductCard({ product }: { product: typeof products[number] }) {
  return <Link href={`/product?product=${product.slug}`} className="catalog-card"><div className="catalog-image"><img src={product.image} alt={product.name} />{product.tag && <span>{product.tag}</span>}</div><div className="catalog-meta"><div><small>DBY</small><h2>{product.name}</h2></div><strong>${product.price}</strong></div>{product.old && <del>${product.old}</del>}<div className="rating">★★★★★</div><div className="swatches"><i/><i/><i/><i/></div></Link>
}

export default function ProductsPage() {
  const [category, setCategory] = useState('همه')
  const [filterOpen, setFilterOpen] = useState(false)
  const [sort, setSort] = useState('جدیدترین')
  const openMenu = useSearchStore((state) => state.openMenu)
  const openSearch = useSearchStore((state) => state.open)
  const openCart = useCartStore((state) => state.open)
  const cartCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))
  const visibleProducts = useMemo(() => [...products].filter((product) => category === 'همه' || product.category === categoryMap[category]).sort((a, b) => sort === 'قیمت: کم به زیاد' ? a.price - b.price : sort === 'قیمت: زیاد به کم' ? b.price - a.price : 0), [category, sort])
  return <main className="catalog-page" dir="rtl"><header className="catalog-header"><Link href="/" className="logo">DBY</Link><nav><Link href="/">خانه</Link><MegaMenu /><Link href="/products">محصولات</Link><Link href="/#collections">کالکشن‌ها</Link><Link href="/">درباره ما</Link></nav><div className="catalog-actions"><button onClick={openSearch} aria-label="جستجو"><Search size={18}/></button><UserDropdown /><button onClick={openCart} aria-label="سبد خرید"><ShoppingBag size={18}/>{cartCount > 0 && <b>{cartCount}</b>}</button><button className="catalog-menu" onClick={openMenu} aria-label="منو"><Menu size={19}/></button></div></header><section className="catalog-shell"><div className="catalog-breadcrumb"><Link href="/">خانه</Link><span>›</span><span>همه محصولات</span></div><h1>همه محصولات</h1><div className="catalog-toolbar"><button className="filter-trigger" onClick={() => setFilterOpen(true)}><SlidersHorizontal size={15}/> فیلترها</button><div className="category-tabs">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="result-count">{visibleProducts.length} نتیجه</span><label className="sort-control"><span>مرتب‌سازی:</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option>جدیدترین</option><option>قیمت: کم به زیاد</option><option>قیمت: زیاد به کم</option></select><ChevronDown size={14}/></label></div><div className="catalog-content-layout"><FiltersPanel open={filterOpen} onOpenChange={setFilterOpen} onCategory={(value) => setCategory(value === 'تی‌شرت' ? 'همه' : value)}/><div className="catalog-grid">{visibleProducts.map((product) => <ProductCard key={product.slug} product={product}/>)}</div></div></section><SiteFooter /><MobileBottomNav />{filterOpen && <div className="catalog-filter-layer"><button className="catalog-filter-backdrop" aria-label="بستن فیلترها" onClick={() => setFilterOpen(false)}/><aside className="catalog-filter-panel"><div><h2>فیلترها</h2><button onClick={() => setFilterOpen(false)} aria-label="بستن">×</button></div><label>دسته‌بندی</label>{categories.slice(1).map((item) => <button key={item} className={category === item ? 'selected' : ''} onClick={() => { setCategory(item); setFilterOpen(false) }}>{item}</button>)}<label>مرتب‌سازی</label>{['جدیدترین', 'قیمت: کم به زیاد', 'قیمت: زیاد به کم'].map((item) => <button key={item} className={sort === item ? 'selected' : ''} onClick={() => { setSort(item); setFilterOpen(false) }}>{item}</button>)}</aside></div>}</main>
}
