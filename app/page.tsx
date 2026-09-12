'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Heart, Menu, Search, ShoppingBag, UserRound } from 'lucide-react'
import { SearchOverlay } from '@/components/search-overlay'
import { MegaMenu } from '@/components/mega-menu'
import { MobileNavDrawer } from '@/components/mobile-nav-drawer'
import { useSearchStore } from '@/lib/search-store'
import { CartDrawer } from '@/components/cart-drawer'
import { useCartStore } from '@/lib/cart-store'

const heroImage = 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=90'
const images = {
  blue: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85',
  street: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',
  hoodie: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85',
  bag: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85',
  stairs: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
  car: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=900&q=85',
  coat: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85',
  editorial: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85',
}
const products = [
  { name: 'پالتوی پشم مرینو', en: 'Merino Wool Overcoat', price: '۴۸۵ دلار', old: '۶۸۰ دلار', image: images.blue, tag: 'جدید' },
  { name: 'شلوار لینن آزاد', en: 'Relaxed Linen Trousers', price: '۱۹۵ دلار', image: images.car },
  { name: 'هودی کتان مینیمال', en: 'Essential Cotton Hoodie', price: '۱۴۵ دلار', old: '۱۹۵ دلار', image: images.hoodie, tag: 'پرفروش' },
  { name: 'کفش دربی چرمی', en: 'Leather Derby Shoes', price: '۳۲۵ دلار', image: images.bag, tag: 'جدید' },
  { name: 'کیف دستی ساختاری', en: 'Structured Tote Bag', price: '۲۱۵ دلار', image: images.bag },
  { name: 'کت فیلد تکنیکال', en: 'Technical Field Jacket', price: '۳۹۵ دلار', old: '۵۲۰ دلار', image: images.coat, tag: 'حراج' },
  { name: 'یقه اسکی کشمیر', en: 'Cashmere Turtleneck', price: '۳۴۵ دلار', image: images.street, tag: 'پریمیوم' },
  { name: 'پیراهن ابریشمی', en: 'Silk Slip Dress', price: '۲۷۵ دلار', old: '۳۸۰ دلار', image: heroImage, tag: 'حراج' },
]
const categories = [
  ['زنانه', '۲۱۸ محصول', heroImage], ['مردانه', '۱۲۴ محصول', images.coat], ['استریت‌ور', '۸۹ محصول', images.hoodie], ['کفش', '۶۷ محصول', images.bag], ['اکسسوری', '۱۴۵ محصول', images.bag], ['تابستان ۲۰۲۶', '۵۶ محصول', images.stairs],
]

function SectionHeading({ eyebrow, title, dark = false }: { eyebrow: string; title: string; dark?: boolean }) {
  return <div className="section-heading"><span className={dark ? 'eyebrow light' : 'eyebrow'}>{eyebrow}</span><h2 className={dark ? 'light' : ''}>{title}</h2></div>
}

function ProductCard({ product, dark = false }: { product: typeof products[number]; dark?: boolean }) {
  const productUrl = `/product?product=${encodeURIComponent(product.en.toLowerCase().replaceAll(' ', '-'))}`
  return <article className={`product-card ${dark ? 'dark-card' : ''}`}>
    <Link className="product-card-link" href={productUrl} aria-label={`مشاهده ${product.name}`}>
      <div className="product-image"><img src={product.image} alt={product.name} /><span aria-hidden="true" className="heart"><Heart size={16} /></span>{product.tag && <span className="tag">{product.tag}</span>}</div>
      <div className="product-meta"><div><span className="brand">DBY</span><h3>{product.name}</h3><span className="english">{product.en}</span></div><strong>{product.price}</strong></div>
      <div className="rating" aria-label="۵ ستاره">★★★★★</div><div className="swatches"><i /><i /><i /><i /></div>
    </Link>
  </article>
}

export default function Page() {
  const openMenu = useSearchStore((state) => state.openMenu)
  const openSearch = useSearchStore((state) => state.open)
  const openCart = useCartStore((state) => state.open)
  const cartCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))
  const [filter, setFilter] = useState('همه')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const filters = ['همه', 'جدید', 'پرفروش', 'حراج', 'پریمیوم']
  const filtered = useMemo(() => filter === 'همه' ? products : products.filter((p) => p.tag === filter), [filter])
  return <main dir="rtl" id="top">
    <SearchOverlay products={products} />
    <CartDrawer />
    <MobileNavDrawer />
    <header className="site-header"><button className="mobile-menu" onClick={openMenu} aria-label="باز کردن منو"><Menu size={20} /></button><div className="logo">DBY</div><nav><MegaMenu /><a href="#new">تازه‌ها</a><a href="#collections">کالکشن‌ها</a><a href="#best">پرفروش‌ها</a><a href="#about">درباره ما</a></nav><div className="header-actions"><button className="header-icon" onClick={openSearch} aria-label="باز کردن جستجو"><Search size={18} /></button><Link href="/account" aria-label="حساب کاربری"><UserRound size={18} /></Link><Heart size={18} /><button className="header-icon cart-trigger" onClick={openCart} aria-label="باز کردن سبد خرید"><ShoppingBag size={18} /><span className="cart-count">{cartCount || ''}</span></button></div></header>
    <section className="hero"><img src={heroImage} alt="مدل با لباس سفید در کالکشن تابستانی" /><div className="hero-overlay" /><div className="hero-content"><span className="eyebrow light">کالکشن تابستان — ۱۴۰۵</span><h1>کشف<br /><em>مدی جاودانه</em></h1><p>مجموعه‌هایی برای زندگی مدرن و انتخاب‌های ماندگار.</p><div className="hero-buttons"><a className="button primary" href="#new">خرید کالکشن</a><a className="button outline" href="#lookbook">مشاهده لوک‌بوک</a></div></div><div className="scroll">اسکرول <span /></div></section>
    <section className="categories section" id="categories"><div className="container"><div className="heading-row"><SectionHeading eyebrow="مرور کنید" title="خرید بر اساس دسته‌بندی" /><a className="view-all" href="#new">مشاهده همه ←</a></div><div className="category-grid">{categories.map(([name, count, image]) => <a className="category-card" href="#new" key={name}><img src={image} alt={name} /><div><strong>{name}</strong><span>{count}</span></div></a>)}</div></div></section>
    <section className="section arrivals" id="new"><div className="container"><div className="heading-row"><SectionHeading eyebrow="تازه رسیده" title="محصولات جدید" /><a className="view-all" href="#best">مشاهده همه ←</a></div><div className="product-grid four">{products.slice(0,4).map((p) => <ProductCard product={p} key={p.name} />)}</div></div></section>
    <section className="promo container" id="collections"><div className="promo-image"><img src={images.editorial} alt="نمایی از فروشگاه و کالکشن تابستانی" /></div><div className="promo-copy"><span className="eyebrow orange">زمان محدود</span><h2>کالکشن<br /><em>تابستان ۱۴۰۵</em></h2><p>تا ۵۰٪ تخفیف روی قطعات منتخب.<br />ضروریات جاودانه، بازتعریف شده.</p><a className="button orange-button" href="#new">همین حالا خرید ک��ید</a></div></section>
    <section className="section trending" id="best"><div className="container"><div className="heading-row"><SectionHeading eyebrow="منتخب شما" title="ترندهای این روزها" /><div className="filters">{filters.map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div><div className="product-grid four">{filtered.map((p) => <ProductCard product={p} key={p.name} />)}</div><a className="button dark-outline" href="#new">مشاهده همه محصولات</a></div></section>
    <section className="lookbook section container" id="lookbook"><div className="lookbook-image"><img src={images.blue} alt="لوک‌بوک بهاری DBY" /><span className="hotspot one" /><span className="hotspot two" /><span className="hotspot three" /></div><div className="lookbook-copy"><span className="eyebrow">ادیتوریال</span><h2>لوک‌بوک<br /><em>بهاری</em></h2><p>قطعاتی بی‌دردسر برای کمد لباسی فکرشده. روی نقاط تصویر بروید تا هر آیتم را ببینید.</p>{products.slice(0,3).map(p => <div className="look-item" key={p.name}><b>{p.name}</b><span>{p.price} ←</span></div>)}<a className="text-link" href="#new">خرید استایل کامل ←</a></div></section>
    <section className="dark-section" id="about"><div className="container"><div className="heading-row"><SectionHeading eyebrow="محبوب مشتریان" title="پرفروش‌ترین‌ها" dark /><div className="round-actions"><button aria-label="قبلی"><ArrowRight size={18} /></button><button aria-label="بعدی"><ArrowLeft size={18} /></button></div></div><div className="product-grid five">{products.slice(0,5).map(p => <ProductCard product={p} dark key={p.name} />)}</div></div></section>
    <section className="trust"><div className="container trust-grid">{[['◈','ارسال رایگان','برای سفارش‌های بالای ۱۵۰ دلار. ارسال سریع و روز بعدی.'],['↶','مرجوعی آسان','مرجوعی رایگان تا ۳۰ روز، بدون پرسش.'],['◇','پرداخت امن','رمزگذاری SSL ۲۵۶ بیتی برای همه تراکنش‌ها.'],['♧','کیفیت پریمیوم','هر قطعه مطابق استانداردهای دقیق کیفیت.'],['◌','پشتیبانی ۲۴/۷','تیم ما همیشه آماده کمک به شماست.']].map(([icon,title,text]) => <div className="trust-item" key={title}><span>{icon}</span><strong>{title}</strong><p>{text}</p></div>)}</div></section>
    <section className="testimonial section"><span className="eyebrow">نظرات مشتریان</span><h2>مشتریان ما چه می‌گویند</h2><div className="quote"><div className="stars">★★★★★</div><blockquote>«کیفیتی کاملاً بی‌نقص. فرم لباس معماری‌شده است بدون اینکه خ��ک باشد — با شما حرکت می‌کند. این همان لباسی است که برای همیشه نگه می‌دارید.»</blockquote><div className="reviewer"><div className="avatar">س</div><div><b>سوفی لوران</b><small>پالتوی پشم مرینو · <span>تأیید شده</span></small></div></div></div><div className="carousel-dots">← <b /> • • →</div></section>
    <section className="social section"><span className="eyebrow">@DBYOFFICIAL</span><h2>دنیای ما را دنبال کنید</h2><div className="social-grid">{[heroImage, images.blue, images.hoodie, images.editorial, images.stairs, images.car].map((image, i) => <img key={i} src={image} alt="استایل DBY" />)}</div></section>
    <section className="newsletter"><span className="eyebrow light">خبرنامه</span><h2>الهام بگیرید<span>.</span></h2><p>تازه‌ها، پیشنهادهای اختصاصی و محتوای ادیتوریال —<br />با دقت برای شما ارسال می‌شود.</p>{subscribed ? <p className="success">عضویت شما با موفقیت انجام شد.</p> : <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true) }}><input type="email" placeholder="ایمیل شما" value={email} onChange={(e) => setEmail(e.target.value)} required /><button className="orange-button">عضویت</button></form>}<small>بدون اسپم. هر زمان خواستید لغو کنید.</small></section>
    <footer><div className="footer-brand"><div className="logo">DBY</div><p>مدی پریمیوم برای کمد مدرن.<br />قطعات جاودانه، کیفیت استثنایی.</p><div className="social-pills"><i>IG</i><i>TW</i><i>TK</i><i>YT</i></div></div>{[['شرکت','درباره ما','فرصت‌های شغلی','رسانه','پایداری','فروشگاه‌ها'],['کالکشن‌ها','مردانه','زنانه','استریت‌ور','کفش','اکسسوری'],['پشتیبانی','سؤالات متداول','ارسال','مرجوعی','راهنمای سایز','تماس با ما'],['قوانین','حریم خصوصی','شرایط استفاده','کوکی‌ها']].map(([title, ...items]) => <div className="footer-col" key={title}><b>{title}</b>{items.map(item => <a href="#" key={item}>{item}</a>)}</div>)}<div className="footer-bottom"><span>© ۱۴۰۵ دیزاین بای یاش (DBY). تمامی حقوق محفوظ است.</span><span>ایران / تومان</span></div></footer>
  </main>
}
