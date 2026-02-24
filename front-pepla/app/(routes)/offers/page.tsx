"use client"

import { useEffect, useState } from "react"
import { ResponseType } from "@/types/response"
import { ProductType } from "@/types/product"
import ProductCard from "../category/[categorySlug]/components/product-card"
import { SkeletonSchema } from "@/components/skeleton-schema"
import { Sparkles } from "lucide-react"

export default function OffersPage() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`
        )
        const data = await response.json()
        
        const allProducts = data.data || []
        const shuffled = [...allProducts].sort(() => Math.random() - 0.5)
        const selected = shuffled.slice(0, 8)
        
        const withDiscounts = selected.map((product: ProductType) => ({
          ...product,
          originalPrice: product.price,
          discount: Math.floor(Math.random() * 4 + 1) * 10, // 10, 20, 30 o 40%
          price: Math.floor(product.price * (1 - (Math.floor(Math.random() * 4 + 1) * 10) / 100))
        }))
        
        setProducts(withDiscounts)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching offers:", error)
        setLoading(false)
      }
    }

    fetchRandomProducts()
  }, [])

  return (
    <div className="max-w-7xl py-4 mx-auto sm:py-16 sm:px-24">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 text-yellow-800 dark:text-yellow-100 px-4 py-2 rounded-full mb-4">
          <Sparkles size={20} />
          <span className="text-sm font-bold uppercase tracking-wide">Ofertas Especiales</span>
        </div>
        
        <h1 className="text-4xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
          ¡Descuentos Increíbles!
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Aprovecha estos descuentos limitados en juegos seleccionados al azar
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading && <SkeletonSchema grid={8} />}
        
        {!loading && products.length > 0 && (
          products.map((product: any) => (
            <div key={product.id} className="relative">
              <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                -{product.discount}%
              </div>
              <ProductCard product={product} />
            </div>
          ))
        )}
        
        {!loading && products.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-500">
              No hay ofertas disponibles en este momento
            </p>
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
        >
          Ver otras ofertas
        </button>
      </div>
    </div>
  )
}