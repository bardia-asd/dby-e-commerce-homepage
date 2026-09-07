'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, ChevronLeft, Heart, Minus, Plus, Search, ShoppingBag, Menu, UserRound } from 'lucide-react'

type Product = { name: string; price: string; old?: string; image: string; tag?: string }

const images = {
  blue: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1000&q=85',
  car: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1000&q=85',
  hoodie: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
  bag: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85',
  editorial: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85',
}

const productCatalog = {
  'merino-wool-overcoat': { name: 'پالتوی پشم مرینو', english: 'Merino Wool Overcoat', price: '۴۸۵ دلار', old: '۶۸۰ دلار', image: images.blue, gallery: [images.blue, images.editorial, images.blue, images.editorial], reviews: '۱۲۴ نظر' },
  'relaxed-linen-trousers': { name: 'شلوار لینن آزاد', english: 'Relaxed Linen Trousers', price: '۱۹۵ دلار', image: images.car, gallery: [images.car, images.editorial, images.car, images.editorial], reviews: '۸۹ نظر' },
  'essential-cotton-hoodie': { name: 'هودی کتان مینیمال', english: 'Essential Cotton Hoodie', price: '۱۴۵ دلار', old: '۱۹۵ دلار', image: images.hoodie, gallery: [images.hoodie, images.editorial, images.hoodie, images.editorial], reviews: '۱۰۵ نظر' },
  'leather-derby-shoes': { name: 'کفش دربی چرمی', english: 'Leather Derby Shoes', price: '۳۲۵ دلار', image: images.bag, gallery: [images.bag, images.editorial, images.bag, images.editorial], reviews: '۷۶ نظر' },
  'structured-tote-bag': { name: 'کیف دستی ساختاری', english: 'Structured Tote Bag', price: '۲۱۵ دلار', image: images.bag, gallery: [images.bag, images.editorial, images.bag, images.editorial], reviews: '۶۴ نظر' },
}

type CatalogProduct = typeof productCatalog[keyof typeof productCatalog]

const related: Product[] = [
  { name: 'شلوار لینن آزاد', price: '۱۹۵ دلار', image: images.car },
  { name: 'هودی کتان مینیمال', price: '۱۴۵ دلار', old: '۱۹۵ دلار', image: images.hoodie, tag: 'پرفروش' },
  { name: 'کفش دربی چرمی', price: '۳۲۵ دلار', image: images.bag, tag: 'جدید' },
  { name: 'کیف دستی ساختاری', price: '۲۱۵ دلار', image: images.bag },
]

function ProductCard({ product }: { product: Product }) {
  return <article className="detail-related-card"><div className="detail-related-image"><img src={product.image} alt={product.name} />{product.tag && <span>{product.tag}</span>}</div><div className="detail-related-meta"><div><small>DBY</small><h3>{product.name}</h3></div><strong>{product.price}</strong></div><div className="rating">★★★★★ <em>{product.old}</em></div><div className="swatches"><i /><i /><i /></div></article>
}

export function ProductDetailPage() {
  const [product, setProduct] = useState<CatalogProduct>(productCatalog['merino-wool-overcoat'])
  const [activeImage, setActiveImage] = useState(0)
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('product') as keyof typeof productCatalog | null
    if (slug && productCatalog[slug]) {
      setProduct(productCatalog[slug])
      setActiveImage(0)
    }
  }, [])
  const gallery = product.gallery
  const [color, setColor] = useState('مشکی')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [favorite, setFavorite] = useState(false)
  const [openPanel, setOpenPanel] = useState('description')
  const [warning, setWarning] = useState(false)
  const selected = Boolean(color && size)
  const panels = [
    ['description', 'توضیحات', 'تفسیری مدرن از پالتوی کلاسیک. از پشم مرینو خالص با خطوط تمیز و معماری‌شده دوخته شده و با آستر کامل، فرم آرام و متفکری دارد.'],
    ['care', 'مواد و نگهداری', 'پشم مرینو خالص با آستر ویسکوز. برای حفظ فرم لباس، خشکشویی تخصصی پیشنهاد می‌شود.'],
    ['shipping', 'ارسال و بازگشت کالا', 'ارسال رایگان برای سفارش‌های بالای ۱۵۰ دلار و امکان بازگشت تا ۳۰ روز.'],
    ['size', 'راهنمای سایز', 'برای انتخاب دقیق، اندازه دور سینه و سرشانه خود را با جدول سایز مقایسه کنید.'],
  ]
  return <main className="product-detail-page" dir="rtl">
    <header className="detail-header"><div className="logo">DBY</div><nav><a href="/">مردانه</a><a href="/">زنانه</a><a href="/">تازه‌ها</a><a href="/">کالکشن‌ها</a><a href="/">حراج</a><a href="/">اکسسوری</a></nav><div className="detail-actions"><Search size={18} /><UserRound size={18} /><Heart size={18} /><ShoppingBag size={18} /><Menu className="detail-menu" size={20} /></div></header>
    <div className="detail-shell">
      <div className="detail-breadcrumb"><a href="/">خانه</a><ChevronLeft size={15} /><a href="/">همه محصولات</a><ChevronLeft size={15} /><span>{product.name}</span></div>
      <section className="detail-layout">
        <div className="detail-gallery"><div className="detail-main-image"><img src={gallery[activeImage]} alt={product.name} /></div><div className="detail-thumbnails">{gallery.map((image, index) => <button className={index === activeImage ? 'active' : ''} onClick={() => setActiveImage(index)} key={`${image}-${index}`}><img src={image} alt={`نمای ${index + 1} محصول`} /></button>)}</div></div>
        <div className="detail-info"><span className="brand">DBY</span><h1>{product.name}</h1><div className="detail-rating"><span>★★★★★</span><small>{product.reviews}</small></div><div className="price-row"><strong>{product.price}</strong>{product.old && <><del>{product.old}</del><b>٪۲۹ تخفیف</b></>}</div><div className="option-block"><div className="option-label">رنگ <span>— {color}</span></div><div className="color-options"><button className={color === 'مشکی' ? 'selected black' : 'black'} onClick={() => setColor('مشکی')} aria-label="مشکی" /><button className={color === 'کرم' ? 'selected cream' : 'cream'} onClick={() => setColor('کرم')} aria-label="کرم" /><button className={color === 'سرمه‌ای' ? 'selected navy' : 'navy'} onClick={() => setColor('سرمه‌ای')} aria-label="سرمه‌ای" /></div></div><div className="option-block"><div className="option-label"><span>سایز</span><a href="#size">راهنمای سایز</a></div><div className="size-options">{['XS', 'S', 'M', 'L', 'XL'].map(item => <button className={size === item ? 'selected' : ''} onClick={() => { setSize(item); setWarning(false) }} key={item}>{item}</button>)}</div>{warning && <small className="size-warning">لطفاً یک سایز انتخاب کنید</small>}</div><div className="quantity-row"><b>تعداد</b><div><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="کم کردن"><Minus size={14} /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="زیاد کردن"><Plus size={14} /></button></div></div><div className="purchase-row"><button className="add-button" disabled={!selected} onClick={() => { if (!size) setWarning(true) }}>افزودن به سبد</button><button className={`favorite-button ${favorite ? 'selected' : ''}`} onClick={() => setFavorite(!favorite)} aria-label="افزودن به علاقه‌مندی‌ها"><Heart size={19} fill={favorite ? 'currentColor' : 'none'} /></button></div><button className="buy-button" disabled={!selected}>خرید فوری</button><div className="trust-mini"><span>♧ ارسال رایگان بالای ۱۵۰ دلار</span><span>↶ ۳۰ روز مهلت بازگشت</span><span>◇ ضمانت اصالت کالا</span></div><div className="detail-accordions">{panels.map(([id, title, text]) => <div className={`detail-accordion ${openPanel === id ? 'open' : ''}`} key={id}><button onClick={() => setOpenPanel(openPanel === id ? '' : id)}><b>{title}</b><ChevronDown size={16} /></button>{openPanel === id && <p>{text}</p>}</div>)}</div></div>
      </section>
      <section className="related-section"><h2>شاید این‌ها را هم بپسندید</h2><div className="related-grid">{related.map(product => <ProductCard key={product.name} product={product} />)}</div></section>
    </div>
  </main>
}
