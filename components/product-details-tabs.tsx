'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type ProductDetailsTabsProps = {
  description: string
  specs: Record<string, string>
}

export function ProductDetailsTabs({ description, specs }: ProductDetailsTabsProps) {
  return (
    <Tabs defaultValue="description" dir="rtl" className="product-details-tabs">
      <TabsList className="product-details-tabs-list">
        <TabsTrigger value="description">توضیحات</TabsTrigger>
        <TabsTrigger value="specifications">مشخصات</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="product-details-tab-content">
        <p>{description}</p>
      </TabsContent>
      <TabsContent value="specifications" className="product-details-tab-content">
        <dl className="product-specs">
          {Object.entries(specs).map(([label, value]) => (
            <div key={label} className="product-spec-row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </TabsContent>
    </Tabs>
  )
}
