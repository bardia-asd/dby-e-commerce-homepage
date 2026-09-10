'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, Heart, LogOut, MapPin, Package, Settings, UserRound } from 'lucide-react'

const tabs = [
  { id: 'profile', label: 'اطلاعات حساب', icon: UserRound },
  { id: 'orders', label: 'سفارش‌های من', icon: Package },
  { id: 'addresses', label: 'آدرس‌ها', icon: MapPin },
  { id: 'wishlist', label: 'علاقه‌مندی‌ها', icon: Heart },
  { id: 'settings', label: 'تنظیمات', icon: Settings },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]
  const ActiveIcon = active.icon

  return <main className="account-page" dir="rtl">
    <header className="account-header"><Link href="/" className="logo">DBY</Link><nav><Link href="/">خانه</Link><Link href="/products">محصولات</Link><Link href="/#collections">کالکشن‌ها</Link><Link href="/#about">درباره ما</Link></nav><Link href="/products" className="account-close" aria-label="بازگشت"><ChevronLeft size={20} /></Link></header>
    <section className="account-shell">
      <div className="account-intro"><div><span className="eyebrow">حساب کاربری</span><h1>سلام، سارا</h1><p>اطلاعات حساب و سفارش‌های خود را مدیریت کنید.</p></div><div className="account-avatar">س</div></div>
      <div className="account-layout">
        <aside className="account-sidebar"><div className="account-user"><div className="account-avatar small">س</div><div><strong>سارا احمدی</strong><span>sara@example.com</span></div></div><div className="account-tabs">{tabs.map((tab) => { const Icon = tab.icon; return <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}><Icon size={17} /><span>{tab.label}</span><ChevronLeft size={14} /></button> })}</div><button className="account-logout"><LogOut size={17} /> خروج از حساب</button></aside>
        <section className="account-content"><div className="account-content-heading"><div><span className="eyebrow">{activeTab === 'profile' ? 'پروفایل من' : active.label}</span><h2><ActiveIcon size={22} />{active.label}</h2></div><span className="account-status">حساب فعال</span></div>{activeTab === 'profile' && <form className="profile-form" onSubmit={(event) => { event.preventDefault(); setSaved(true) }}><div className="profile-form-grid"><label>نام و نام خانوادگی<input defaultValue="سارا احمدی" /></label><label>ایمیل<input type="email" defaultValue="sara@example.com" /></label><label>شماره موبایل<input defaultValue="۰۹۱۲ ۳۴۵ ۶۷۸۹" /></label><label>تاریخ تولد<input placeholder="روز / ماه / سال" /></label><label className="profile-full">درباره من<textarea rows={4} defaultValue="علاقه‌مند به طراحی، کیفیت و قطعات ماندگار." /></label></div><div className="profile-actions"><button type="submit">ذخیره تغییرات</button>{saved && <span>تغییرات با موفقیت ذخیره شد.</span>}</div></form>}{activeTab === 'orders' && <div className="account-placeholder"><Package size={34} /><h3>هنوز سفارشی ثبت نکرده‌اید</h3><p>اولین انتخاب خود را از مجموعه DBY پیدا کنید.</p><Link href="/products">مشاهده محصولات</Link></div>}{activeTab === 'addresses' && <div className="address-grid"><article><MapPin size={18}/><strong>آدرس اصلی</strong><p>تهران، خیابان ولیعصر<br />کوچه‌ی بهار، پلاک ۲۴</p><button>ویرایش آدرس</button></article><article className="address-add">+<span>افزودن آدرس جدید</span></article></div>}{activeTab === 'wishlist' && <div className="account-placeholder"><Heart size={34} /><h3>لیست علاقه‌مندی‌ها خالی است</h3><p>محصولات مورد علاقه‌تان را برای بعد ذخیره کنید.</p><Link href="/products">کشف محصولات</Link></div>}{activeTab === 'settings' && <div className="settings-list"><label><span><strong>ایمیل‌های DBY</strong><small>تازه‌ها و پیشنهادهای اختصاصی را دریافت کنید.</small></span><input type="checkbox" defaultChecked /></label><label><span><strong>اعلان سفارش‌ها</strong><small>وضعیت سفارش را به شما اطلاع می‌دهیم.</small></span><input type="checkbox" defaultChecked /></label></div>}</section>
      </div>
    </section>
  </main>
}
