"use client"

import Link from "next/link"
import { ChevronDown, ArrowLeft } from "lucide-react"
import { useState } from "react"

const columns = [
  { title: "پوشاک", links: ["همه پوشاک", "تی‌شرت و تاپ", "پیراهن", "کت و پالتو", "شلوار"] },
  { title: "اکسسوری", links: ["کیف‌ها", "کفش‌ها", "جواهرات", "عینک آفتابی", "اکسسوری مو"] },
  { title: "کالکشن‌ها", links: ["تازه رسیده‌ها", "پرفروش‌ها", "ضروریات تابستان", "قطعات پریمیوم", "حراج"] },
]

export function MegaMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mega-menu-wrap" onMouseLeave={() => setOpen(false)}>
      <button className={`mega-trigger${open ? " is-open" : ""}`} onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        دسته‌بندی‌ها <ChevronDown size={14} />
      </button>
      {open && <div className="mega-menu" role="menu">
        <div className="mega-columns">
          {columns.map((column) => <div className="mega-column" key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map((link) => <Link href="/products" key={link} onClick={() => setOpen(false)}>{link}</Link>)}
          </div>)}
        </div>
        <Link href="/products" className="mega-feature" onClick={() => setOpen(false)}>
          <div><span>انتخاب سردبیر</span><strong>ضروریات<br />کمد تابستانی</strong><b>مشاهده کالکشن <ArrowLeft size={14} /></b></div>
        </Link>
      </div>}
    </div>
  )
}
