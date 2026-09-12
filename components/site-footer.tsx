import Link from 'next/link'

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-brand"><div className="logo">DBY</div><p>مدی پریمیوم برای کمد مدرن.<br />قطعات جاودانه، کیفیت استثنایی.</p><div className="social-pills"><i>IG</i><i>TW</i><i>TK</i><i>YT</i></div></div>{[['شرکت','درباره ما','فرصت‌های شغلی','رسانه','پایداری','فروشگاه‌ها'],['کالکشن‌ها','مردانه','زنانه','استریت‌ور','کفش','اکسسوری'],['پشتیبانی','سؤالات متداول','ارسال','مرجوعی','راهنمای سایز','تماس با ما'],['قوانین','حریم خصوصی','شرایط استفاده','کوکی‌ها']].map(([title, ...items]) => <div className="footer-col" key={title}><b>{title}</b>{items.map(item => <Link href="#" key={item}>{item}</Link>)}</div>)}<div className="footer-bottom"><span>© ۱۴۰۵ دیزاین بای یاش (DBY). تمامی حقوق محفوظ است.</span><span>ایران / تومان</span></div></footer>
} 
