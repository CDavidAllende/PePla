"use client"

import { useState } from "react"
import { useGetCategoryProduct } from "@/api/getCategoryProduct"
import FiltersControlsCategory from "./components/filters-controls-category"
import { ResponseType } from "@/types/response"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useParams } from "next/navigation"
import { SkeletonSchema } from "@/components/skeleton-schema"
import ProductCard from "./components/product-card"
import { ProductType } from "@/types/product"

export default function Page() {
  const params = useParams<{ categorySlug: string }>()
  const { categorySlug } = params
  const { result, loading }: ResponseType<any> = useGetCategoryProduct(categorySlug)
  
  const [filterOrigin, setFilterOrigin] = useState<string>("")
  
  const filteredProducts = filterOrigin && result
    ? result.filter((product: ProductType) => 
        product.origin === filterOrigin  
      )
    : result

  console.log(result)

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {result !== null && !loading && result.length > 0 && result[0]?.category?.categoryName && (
        <h1 className="text-3xl font-medium">
          Ps1 {result[0].category.categoryName}
        </h1>
      )}
      <Separator />

      <div className="sm:flex sm:justify-between">
        <FiltersControlsCategory setFilterOrigin={setFilterOrigin} />

        <div className="grid gap-5 mt-8 sm:grid-cols-3 md:gap-10">
          {loading && (
            <SkeletonSchema grid={3} />
          )}
          {filteredProducts !== null && !loading && (
            filteredProducts.map((product: ProductType) => (
               <ProductCard key={product.id} product={product} />
            ))
          )}
          {!loading && filteredProducts && filteredProducts.length === 0 && (
            <p className="text-center col-span-3">
              {filterOrigin 
                ? `No hay productos con origen "${filterOrigin}" en esta categoría` 
                : "No hay productos en esta categoría"
              }
            </p>
          )}
        </div>
      </div>
    </div>
  )
}