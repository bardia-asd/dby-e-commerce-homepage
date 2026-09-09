"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowRight, Check, ChevronDown, Lock, RotateCcw, ShieldCheck, Truck } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

const money = (value: number) => `$${value.toLocaleString("en-US")}`

function Field({ label, placeholder, required = true, type = "text" }: { label: string; placeholder: string; required?: boolean; type?: string }) {
  return <label className="checkout-field"><span>{label}{required ? " *" : ""}</span><input type={type} placeholder={placeholder} required={required} /></label>
}

function OrderSummary() {
  const items = useCartStore((state) => state.items)
  const promoCode = useCartStore((state) => state.promoCode)
  const discountApplied = useCartStore((state) => state.discountApplied)
  const [expanded, setExpanded] = useState(false)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = discountApplied ? subtotal * 0.1 : 0
  const shipping = items.length ? 0 : 0
  const total = subtotal - discount + shipping

  return <aside className="checkout-summary">
    <button type="button" className="checkout-summary-toggle" onClick={() => setExpanded((value) => !value)}><span>خلاصه سفارش</span><strong>{money(total)}</strong><ChevronDown size={18} /></button>
    <div className={`checkout-summary-body ${expanded ? "is-expanded" : ""}`}>
      {items.length ? items.map((item) => <div className="checkout-item" key={`${item.id}-${item.size}-${item.color}`}><img src={item.image} alt={item.name} /><div><small>DBY</small><h3>{item.name}</h3><p>سایز: {item.size} · تعداد: {item.quantity}</p></div><strong>{money(item.price * item.quantity)}</strong></div>) : <p className="checkout-empty">سبد خرید شما خالی است.</p>}
      <Link href="/" className="checkout-edit-cart">ویرایش سبد خرید</Link>
      <div className="checkout-promo"><input defaultValue={promoCode} placeholder="کد تخفیف" aria-label="کد تخفیف" /><button type="button" onClick={() => useCartStore.getState().applyPromo("DBY10")}>اعمال</button></div>
      <dl className="checkout-totals"><div><dt>جمع جزء</dt><dd>{money(subtotal)}</dd></div>{discount > 0 && <div className="checkout-discount"><dt>تخفیف</dt><dd>-{money(discount)}</dd></div>}<div><dt>هزینه ارسال</dt><dd>{shipping ? money(shipping) : "رایگان"}</dd></div><div className="checkout-total"><dt>مجموع نهایی</dt><dd>{money(total)}</dd></div></dl>
      <div className="checkout-trust"><span><Truck size={16} />ارسال سریع</span><span><RotateCcw size={16} />ضمانت بازگشت</span><span><ShieldCheck size={16} />پرداخت امن</span></div>
    </div>
  </aside>
}

export default function CheckoutPage() {
  const [payment, setPayment] = useState("online")
  const [accepted, setAccepted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const items = useCartStore((state) => state.items)
  const discountApplied = useCartStore((state) => state.discountApplied)
  const total = useMemo(() => { const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0); return subtotal * (discountApplied ? 0.9 : 1) }, [items, discountApplied])

  if (submitted) return <main className="checkout-page" dir="rtl"><section className="checkout-success"><div><Check size={34} /></div><span className="eyebrow orange">DBY ORDER</span><h1>سفارش شما با موفقیت ثبت شد!</h1><p>شماره سفارش شما: <strong>DBY-248631</strong></p><p>تحویل تقریبی: ۳ تا ۵ روز کاری</p><div><Link href="/" className="checkout-primary">بازگشت به فروشگاه</Link><Link href="/" className="checkout-secondary">مشاهده سفارش</Link></div></section></main>

  return <main className="checkout-page" dir="rtl"><header className="checkout-header"><Link href="/" className="logo">DBY</Link><div className="checkout-steps"><span className="active">۱. اطلاعات ارسال</span><i /><span>۲. روش پرداخت</span><i /><span>۳. بازبینی سفارش</span></div><Link href="/" className="checkout-back"><ArrowRight size={16} /> بازگشت</Link></header><div className="checkout-layout"><OrderSummary /><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); if (!accepted || !items.length) { setError(!items.length ? "سبد خرید شما خالی است." : "لطفاً قوانین و مقررات فروشگاه را تأیید کنید."); return } setError(""); setSubmitted(true) }}>
    <section className="checkout-card"><div className="checkout-section-heading"><span>۱</span><div><h2>اطلاعات ارسال</h2><p>لطفاً اطلاعات تحویل سفارش را وارد کنید.</p></div></div><div className="checkout-fields"><Field label="نام و نام خانوادگی" placeholder="نام کامل شما" /><Field label="شماره تماس" placeholder="۰۹۱۲۱۲۳۴۵۶۷" type="tel" /><Field label="ایمیل" placeholder="you@example.com" type="email" /><Field label="استان" placeholder="استان" /><Field label="شهر" placeholder="شهر" /><Field label="کد پستی" placeholder="۱۰ رقمی" /><label className="checkout-field checkout-full"><span>آدرس کامل *</span><textarea placeholder="خیابان، کوچه، پلاک، واحد" rows={3} required /></label></div></section>
    <section className="checkout-card"><div className="checkout-section-heading"><span>۲</span><div><h2>روش پرداخت</h2><p>روش پرداخت مورد نظر خود را انتخاب کنید.</p></div></div><div className="payment-options"><label className={payment === "online" ? "selected" : ""}><input type="radio" name="payment" checked={payment === "online"} onChange={() => setPayment("online")} />پرداخت آنلاین <small>کارت بانکی</small></label><label className={payment === "cash" ? "selected" : ""}><input type="radio" name="payment" checked={payment === "cash"} onChange={() => setPayment("cash")} />پرداخت در محل <small>در دسترس نیست</small></label></div>{payment === "online" && <div className="card-fields"><Field label="شماره کارت" placeholder="۱۲۳۴ ۵۶۷۸ ۹۰۱۲ ۳۴۵۶" /><Field label="تاریخ انقضا" placeholder="MM / YY" /><Field label="CVV2" placeholder="۱۲۳" /><Field label="رمز دوم" placeholder="رمز پویا" /><p><Lock size={14} />پرداخت شما با رمزنگاری امن انجام می‌شود.</p></div>}</section>
    <section className="checkout-card"><div className="checkout-section-heading"><span>۳</span><div><h2>بازبینی و ثبت سفارش</h2><p>اطلاعات سفارش خود را بررسی کنید.</p></div></div><div className="review-box"><div><strong>آدرس ارسال</strong><button type="button">ویرایش</button></div><p>اطلاعات وارد شده برای ارسال سفارش استفاده می‌شود.</p><div><strong>روش پرداخت</strong><button type="button">ویرایش</button></div><p>{payment === "online" ? "پرداخت آنلاین با کارت بانکی" : "پرداخت در محل"}</p></div><label className="checkout-field checkout-full"><span>یادداشتی برای فروشنده</span><textarea placeholder="یادداشت شما (اختیاری)" rows={3} /></label><label className="terms"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />با قوانین و مقررات فروشگاه موافقم</label>{error && <p className="checkout-error">{error}</p>}<button type="submit" className="checkout-submit" disabled={!accepted || !items.length}>ثبت نهایی سفارش <span>{money(total)}</span></button></section>
  </form></div></main>
}
