"use client"

import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { FormEvent, useState } from "react"

export function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="auth-page" dir="rtl">
      <section className="auth-visual" aria-label="DBY collection">
        <div className="auth-visual-overlay" />
        <div className="auth-brand-mark">DBY</div>
        <div className="auth-visual-copy">
          <span>THE NEW COLLECTION</span>
          <h1>پوشیدن<br />لحظه‌هاست.</h1>
        </div>
      </section>
      <section className="auth-panel">
        <Link className="auth-logo" href="/">DBY</Link>
        <div className="auth-form-wrap">
          <div className="auth-heading">
            <span className="eyebrow">WELCOME BACK</span>
            <h2>خوش برگشتی</h2>
            <p>برای ادامه وارد حساب کاربری خود شوید.</p>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email">ایمیل</label>
            <input id="email" name="email" type="email" placeholder="ایمیل خود را وارد کنید" required autoComplete="email" />
            <div className="auth-label-row">
              <label htmlFor="password">رمز عبور</label>
              <Link href="/forgot-password">رمز عبور را فراموش کرده‌اید؟</Link>
            </div>
            <div className="auth-password-field">
              <input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="رمز عبور خود را وارد کنید" required minLength={6} autoComplete="current-password" />
              <button type="button" aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            <label className="auth-checkbox"><input type="checkbox" name="remember" /> <span>مرا به خاطر بسپار</span></label>
            <button className="auth-submit" type="submit">ورود به حساب <ArrowLeft size={17} /></button>
            {submitted && <p className="auth-message" role="status">فرم آماده ارسال است. اتصال به حساب کاربری بعداً اضافه می‌شود.</p>}
          </form>
          <p className="auth-switch">حساب کاربری ندارید؟ <Link href="/sign-up">ایجاد حساب</Link></p>
        </div>
        <p className="auth-footer">© ۲۰۲۵ DBY — تمامی حقوق محفوظ است.</p>
      </section>
    </main>
  )
}

export default SignInPage

