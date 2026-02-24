"use client"

import { useGetCategoryProduct } from "@/api/getCategoryProduct"
import FiltersControlsCategory from "./components/filters-controls-category"
import { ResponseType } from "@/types/response"
import { Separator } from "@/components/ui/separator"
import { useParams } from "next/navigation"
import { SkeletonSchema } from "@/components/skeleton-schema"
import ProductCard from "./components/product-card"
import { ProductType } from "@/types/product"
import { useState } from "react"
import Console3DModel from "@/components/console-3d-model"

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

  const isAccessories = categorySlug === "accesorios"

  return (
    <div className="max-w-7xl py-4 mx-auto sm:py-16 sm:px-24">
      {result !== null && !loading && result.length > 0 && result[0]?.category?.categoryName && (
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Catálogo
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
            {result[0].category.categoryName}
          </h1>
        </div>
      )}

      {!isAccessories && (
        <div className="mb-12">
          <Console3DModel consoleSlug={categorySlug} />
        </div>
      )}

      <Separator className="my-8" />

      <div className="grid lg:grid-cols-[320px_1fr] gap-12">
        {!isAccessories && (
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <FiltersControlsCategory setFilterOrigin={setFilterOrigin} />
          </aside>
        )}

        <main className={isAccessories ? "lg:col-span-2" : ""}>
          <h2 className="text-2xl font-bold mb-6">
            {isAccessories 
              ? (filterOrigin ? `Accesorios ${filterOrigin}` : 'Todos los accesorios')
              : (filterOrigin ? `Juegos ${filterOrigin}` : 'Todos los juegos')
            }
          </h2>
          <div className={`grid gap-6 sm:grid-cols-2 ${isAccessories ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {loading && <SkeletonSchema grid={isAccessories ? 4 : 3} />}
            
            {filteredProducts !== null && !loading && (
              filteredProducts.map((product: ProductType) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
            
            {!loading && filteredProducts && filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-500">
                  {filterOrigin 
                    ? `No hay ${isAccessories ? 'accesorios' : 'juegos'} con origen "${filterOrigin}"` 
                    : `No hay ${isAccessories ? 'accesorios' : 'juegos'} disponibles`
                  }
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}