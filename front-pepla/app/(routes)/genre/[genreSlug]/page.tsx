"use client"

import { useGetProductsByGenre } from "@/api/getProductsByGenre" 
import { ResponseType } from "@/types/response"
import { Separator } from "@/components/ui/separator"
import { useParams } from "next/navigation"
import { SkeletonSchema } from "@/components/skeleton-schema"
import ProductCard from "../../category/[categorySlug]/components/product-card"
import { ProductType } from "@/types/product"

export default function GenrePage() {
  const params = useParams<{ genreSlug: string }>()
  const { genreSlug } = params
  const { result, loading }: ResponseType<any> = useGetProductsByGenre(genreSlug)

  const genreTitle = genreSlug
    ? genreSlug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : ""

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {result !== null && !loading && result.length > 0 && (
        <h1 className="text-3xl font-medium">
          Juegos de {genreTitle}
        </h1>
      )}
      <Separator />

      <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
        {loading && <SkeletonSchema grid={3} />}
        
        {result !== null && !loading && (
          result.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
        
        {!loading && result && result.length === 0 && (
          <p className="text-center col-span-3">
            No hay juegos disponibles en este género
          </p>
        )}
      </div>
    </div>
  )
}