"use client"

import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { FormEvent, useState } from "react"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (form.get("password") !== form.get("confirmPassword")) {
      setError("رمزهای عبور با هم مطابقت ندارند.")
      setSubmitted(false)
      return
    }
    setError("")
    setSubmitted(true)
  }

  return (
    <main className="auth-page" dir="rtl">
      <section className="auth-visual" aria-label="DBY collection">
        <div className="auth-visual-overlay" />
        <div className="auth-brand-mark">DBY</div>
        <div className="auth-visual-copy">
          <span>JOIN THE DBY WORLD</span>
          <h1>سبک خودت<br />را بساز.</h1>
        </div>
      </section>
      <section className="auth-panel">
        <Link className="auth-logo" href="/">DBY</Link>
        <div className="auth-form-wrap">
          <div className="auth-heading">
            <span className="eyebrow">WELCOME TO DBY</span>
            <h2>حساب خودت را بساز</h2>
            <p>به جمع ما بپیوندید و تجربه‌ای متفاوت از خرید داشته باشید.</p>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="name">نام و نام خانوادگی</label>
            <input id="name" name="name" type="text" placeholder="نام خود را وارد کنید" required autoComplete="name" />
            <label htmlFor="signup-email">ایمیل</label>
            <input id="signup-email" name="email" type="email" placeholder="ایمیل خود را وارد کنید" required autoComplete="email" />
            <label htmlFor="signup-password">رمز عبور</label>
            <div className="auth-password-field">
              <input id="signup-password" name="password" type={showPassword ? "text" : "password"} placeholder="حداقل ۶ کاراکتر" required minLength={6} autoComplete="new-password" />
              <button type="button" aria-label={showPassword ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            <label htmlFor="confirm-password">تکرار رمز عبور</label>
            <div className="auth-password-field">
              <input id="confirm-password" name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="رمز عبور را دوباره وارد کنید" required minLength={6} autoComplete="new-password" />
              <button type="button" aria-label={showConfirm ? "پنهان کردن رمز عبور" : "نمایش رمز عبور"} onClick={() => setShowConfirm((visible) => !visible)}>{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            <label className="auth-checkbox"><input type="checkbox" required name="terms" /> <span>شرایط استفاده و حریم خصوصی DBY را می‌پذیرم.</span></label>
            <button className="auth-submit" type="submit">ایجاد حساب <ArrowLeft size={17} /></button>
            {error && <p className="auth-message auth-error" role="alert">{error}</p>}
            {submitted && <p className="auth-message" role="status">حساب شما آماده ایجاد است. اتصال به سرویس ثبت‌نام بعداً اضافه می‌شود.</p>}
          </form>
          <p className="auth-switch">قبلاً حساب ساخته‌اید؟ <Link href="/sign-in">ورود به حساب</Link></p>
        </div>
        <p className="auth-footer">© ۲۰۲۵ DBY — تمامی حقوق محفوظ است.</p>
      </section>
    </main>
  )
}
