"use client"

import Link from "next/link"
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react"
import { FormEvent, useState } from "react"

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")

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
          <span>FIND YOUR WAY BACK</span>
          <h1>همیشه راهی<br />برای بازگشت هست.</h1>
        </div>
      </section>
      <section className="auth-panel">
        <Link className="auth-logo" href="/">DBY</Link>
        <div className="auth-form-wrap">
          <div className="auth-heading">
            <span className="eyebrow">RESET PASSWORD</span>
            <h2>بازیابی رمز عبور</h2>
            <p>ایمیل حساب کاربری خود را وارد کنید تا لینک بازیابی را برایتان ارسال کنیم.</p>
          </div>
          {submitted ? (
            <div className="auth-success-panel" role="status">
              <CheckCircle2 size={28} />
              <strong>لینک بازیابی ارسال شد</strong>
              <p>اگر حسابی با {email} وجود داشته باشد، لینک بازیابی رمز عبور برای شما ارسال خواهد شد.</p>
              <button className="auth-submit" type="button" onClick={() => setSubmitted(false)}>ارسال دوباره <ArrowLeft size={17} /></button>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <label htmlFor="forgot-email">ایمیل</label>
              <div className="auth-input-icon">
                <Mail size={17} aria-hidden="true" />
                <input id="forgot-email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ایمیل خود را وارد کنید" required autoComplete="email" />
              </div>
              <button className="auth-submit" type="submit">ارسال لینک بازیابی <ArrowLeft size={17} /></button>
            </form>
          )}
          <p className="auth-switch"><Link href="/sign-in">بازگشت به ورود</Link></p>
        </div>
        <p className="auth-footer">© ۲۰۲۵ DBY — تمامی حقوق محفوظ است.</p>
      </section>
    </main>
  )
}
