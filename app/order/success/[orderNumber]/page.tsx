import Link from "next/link"
import { Check, Copy, PackageCheck } from "lucide-react"

export default async function OrderSuccessPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await params
  return <main className="checkout-page order-success-page" dir="rtl"><section className="checkout-success"><div><Check /></div><span className="eyebrow orange">DBY ORDER</span><h1>سفارش شما ثبت شد</h1><p>از خرید شما متشکریم. سفارش شما با موفقیت ثبت و برای پردازش ارسال شد.</p><div className="success-order-number"><PackageCheck /><span>شماره سفارش</span><strong>{orderNumber}</strong><button type="button" aria-label="کپی شماره سفارش" onClick={() => navigator.clipboard?.writeText(orderNumber)}><Copy /></button></div><p>تاریخ تقریبی تحویل: ۳ تا ۵ روز کاری</p><div className="success-actions"><Link href="/account" className="checkout-primary">پیگیری سفارش</Link><Link href="/products" className="checkout-secondary">ادامه خرید</Link></div></section></main>
}
