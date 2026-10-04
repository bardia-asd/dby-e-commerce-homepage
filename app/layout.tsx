import { Analytics } from '@vercel/analytics/next'
import { Noto_Serif, Vazirmatn } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const vazirmatn = Vazirmatn({ subsets: ['arabic', 'latin'], variable: '--font-vazirmatn' })
const notoSerif = Noto_Serif({ subsets: ['latin', 'latin-ext'], variable: '--font-noto-serif' })

export const metadata: Metadata = {
  title: 'DBY | مدی جاودانه',
  description: 'کالکشن‌های منتخب DBY برای کمد مدرن.',
  generator: 'v0.app',
  openGraph: { title: 'DBY | مدی جاودانه', description: 'کالکشن‌های منتخب DBY برای کمد مدرن.', type: 'website', locale: 'fa_IR' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#ffffff' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${notoSerif.variable}`}><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
