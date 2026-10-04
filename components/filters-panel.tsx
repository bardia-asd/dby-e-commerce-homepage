'use client'

import { useState } from 'react'
import { ChevronDown, ChevronLeft, X } from 'lucide-react'

const colors = ['#00bf35', '#f10b14', '#f4da00', '#f57900', '#18bddc', '#164ee8', '#7b09e8', '#eb0a9f', '#fff', '#111']
const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large']
const categories = ['تی‌شرت', 'شلوارک', 'پیراهن', 'هودی', 'شلوار جین']
const styles = ['کژوال', 'رسمی', 'مهمانی', 'باشگاه']

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return <section className="filter-section"><button className="filter-section-title" onClick={() => setOpen(!open)}><strong>{title}</strong>{open ? <ChevronDown size={18}/> : <ChevronLeft size={18}/>}</button>{open && <div className="filter-section-content">{children}</div>}</section>
}

export function FiltersContent({ onCategory, onPriceChange }: { onCategory?: (value: string) => void; onPriceChange?: (min: number, max: number) => void }) {
  const [selectedColor, setSelectedColor] = useState(5)
  const [selectedSize, setSelectedSize] = useState('Large')
  const [min, setMin] = useState(50)
  const [max, setMax] = useState(200)
  return <div className="filters-content" dir="rtl">
    <Section title="دسته‌بندی" defaultOpen={false}><div className="filter-link-list">{categories.map((item) => <button key={item} onClick={() => onCategory?.(item)}>{item}<ChevronLeft size={17}/></button>)}</div></Section>
    <Section title="قیمت"><div className="price-range"><div className="range-track"><input aria-label="حداقل قیمت" type="range" min="50" max="200" value={min} onChange={(event) => setMin(Math.min(Number(event.target.value), max - 1))}/><input aria-label="حداکثر قیمت" type="range" min="50" max="200" value={max} onChange={(event) => setMax(Math.max(Number(event.target.value), min + 1))}/></div><div className="range-values"><span>${min}</span><span>${max}</span></div><div className="price-inputs"><label>حداقل قیمت<input type="number" min="0" value={min} onChange={(event) => { const value = Math.max(0, Number(event.target.value)); const nextMin = Math.min(value, max - 1); setMin(nextMin); onPriceChange?.(nextMin, max) }} /></label><label>حداکثر قیمت<input type="number" min="1" value={max} onChange={(event) => { const value = Math.max(1, Number(event.target.value)); const nextMax = Math.max(value, min + 1); setMax(nextMax); onPriceChange?.(min, nextMax) }} /></label></div></div></Section>
    <Section title="رنگ‌ها"><div className="filter-colors">{colors.map((color, index) => <button key={color} className={selectedColor === index ? 'selected' : ''} style={{ backgroundColor: color }} aria-label={`رنگ ${index + 1}`} onClick={() => setSelectedColor(index)}>{selectedColor === index && '✓'}</button>)}</div></Section>
    <Section title="سایز"><div className="filter-sizes">{sizes.map((size) => <button key={size} className={selectedSize === size ? 'selected' : ''} onClick={() => setSelectedSize(size)}>{size}</button>)}</div></Section>
    <Section title="استایل لباس" defaultOpen={false}><div className="filter-link-list">{styles.map((item) => <button key={item}>{item}<ChevronLeft size={17}/></button>)}</div></Section>
  </div>
}

export function FiltersPanel({ open, onOpenChange, onCategory, onPriceChange }: { open: boolean; onOpenChange: (open: boolean) => void; onCategory?: (value: string) => void; onPriceChange?: (min: number, max: number) => void }) {
  return <><aside className="filters-sidebar"><FiltersContent onCategory={onCategory} onPriceChange={onPriceChange}/><button className="filters-apply" onClick={() => onOpenChange(false)}>اعمال فیلتر</button></aside>{open && <div className="filters-sheet-layer"><button className="filters-sheet-backdrop" aria-label="بستن فیلترها" onClick={() => onOpenChange(false)}/><aside className="filters-sheet"><header><h2>فیلترها</h2><button onClick={() => onOpenChange(false)} aria-label="بستن"><X size={24}/></button></header><FiltersContent onCategory={onCategory} onPriceChange={onPriceChange}/><button className="filters-apply" onClick={() => onOpenChange(false)}>اعمال فیلتر</button></aside></div>}</>
}
