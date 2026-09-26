"use client"

import Link from "next/link"
import { ArrowLeft, CheckCircle2, Mail, RefreshCw } from "lucide-react"
import { useState } from "react"

export default function CheckEmailPage() {
  const [resent, setResent] = useState(false)

  return (
    <main className="auth-page" dir="rtl">
      <section className="auth-visual" aria-label="DBY collection">
        <div className="auth-visual-overlay" />
        <div className="auth-brand-mark">DBY</div>
        <div className="auth-visual-copy">
          <span>CHECK YOUR INBOX</span>
          <h1>خبر خوب<br />در راه است.</h1>
        </div>
      </section>
      <section className="auth-panel">
        <Link className="auth-logo" href="/">DBY</Link>
        <div className="auth-form-wrap">
          <div className="auth-heading">
            <span className="eyebrow">ONE MORE STEP</span>
            <h2>ایمیلت را بررسی کن</h2>
            <p>لینک تأیید حساب به ایمیل شما ارسال شد. برای ادامه، صندوق ورودی خود را بررسی کنید.</p>
          </div>
          <div className="check-email-card" role="status">
            <div className="check-email-icon"><Mail size={27} /></div>
            <CheckCircle2 className="check-email-check" size={18} aria-hidden="true" />
            <strong>لینک تأیید ارسال شد</strong>
            <p>ممکن است ایمیل در پوشه اسپم قرار گرفته باشد.</p>
          </div>
          <button className="auth-submit check-email-resend" type="button" onClick={() => setResent(true)} disabled={resent}>
            {resent ? "ایمیل دوباره ارسال شد" : "ارسال دوباره ایمیل"}
            {resent ? <CheckCircle2 size={17} /> : <RefreshCw size={17} />}
          </button>
          {resent && <p className="auth-message" role="status">ایمیل تأیید دوباره برای شما ارسال شد.</p>}
          <p className="auth-switch"><Link href="/sign-in"><ArrowLeft size={15} /> بازگشت به ورود</Link></p>
        </div>
        <p className="auth-footer">© ۲۰۲۵ DBY — تمامی حقوق محفوظ است.</p>
      </section>
    </main>
  )
}
