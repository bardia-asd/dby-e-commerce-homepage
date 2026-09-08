"use client"

import { useEffect, useMemo, useState } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'

const money = (value: number) => `$${value.toFixed(2)}`

export function CartDrawer() {
  const { items, isOpen, close, increase, decrease, remove, applyPromo, promoCode, discountApplied } = useCartStore()
  const [code, setCode] = useState(promoCode)
  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price * item.quantity, 0), [items])
  const discount = discountApplied ? subtotal * .1 : 0
  const total = subtotal - discount

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return <div className="cart-layer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
    <button className="cart-backdrop" onClick={close} aria-label="بستن سبد خرید" />
    <aside className="cart-drawer" dir="rtl">
      <header className="cart-header"><h2 id="cart-title">سبد خرید ({items.reduce((total, item) => total + item.quantity, 0)})</h2><button onClick={close} aria-label="بستن"><X size={20} /></button></header>
      <div className="cart-content">
        {items.length === 0 ? <div className="cart-empty"><strong>سبد خرید شما خالی است</strong><p>محصولات مورد علاقه‌تان را به سبد خرید اضافه کنید.</p></div> : <div className="cart-items">{items.map((item) => <article className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-item-info"><small>DBY</small><h3>{item.name}</h3><span>سایز: {item.size} <i style={{ background: item.color === 'مشکی' ? '#111' : '#a58a69' }} /></span><div className="cart-quantity"><button onClick={() => decrease(item.id)} aria-label="کاهش تعداد"><Minus size={13} /></button><b>{item.quantity}</b><button onClick={() => increase(item.id)} aria-label="افزایش تعداد"><Plus size={13} /></button></div></div><strong className="cart-item-price">{money(item.price * item.quantity)}</strong><button className="cart-remove" onClick={() => remove(item.id)} aria-label={`حذف ${item.name}`}><X size={14} /></button></article>)}</div>}
      </div>
      <div className="cart-summary"><div className="promo-row"><input value={code} onChange={(event) => setCode(event.target.value)} placeholder="کد تخفیف" aria-label="کد تخفیف" /><button onClick={() => applyPromo(code)}>اعمال</button></div>{discountApplied && <p className="promo-success">✓ تخفیف ۱۰٪ اعمال شد</p>}<dl><div><dt>جمع جزء</dt><dd>{money(subtotal)}</dd></div>{discountApplied && <div className="discount-line"><dt>تخفیف</dt><dd>-{money(discount)}</dd></div>}<div><dt>ارسال</dt><dd>رایگان</dd></div><div className="total-line"><dt>مجموع</dt><dd>{money(total)}</dd></div></dl><button className="checkout-button" disabled={!items.length}>تسویه حساب</button><button className="continue-button" onClick={close}>ادامه خرید</button></div>
    </aside>
  </div>
}
