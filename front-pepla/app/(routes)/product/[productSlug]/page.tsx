"use client"

import { useGetProductBySlug } from "@/api/getProductBySlug";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation"
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";
import { ProductType } from "@/types/product";

export default function Page() {
    const params = useParams<{ productSlug: string }>()
    const { productSlug } = params;

    const { result, loading }: ResponseType = useGetProductBySlug(productSlug as string)

    console.log("Result completo:", result)

    if (loading || result == null) {
        return <SkeletonProduct />
    }

    const product: ProductType = Array.isArray(result) ? result[0] : result

    console.log("Product:", product)
    console.log("Images:", product?.images)

    if (!product || !product.images) {
        return (
            <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
                <p className="text-center">Producto no encontrado o sin imágenes</p>
            </div>
        )
    }

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
            <div className="grid sm:grid-cols-2 gap-8">
                <div>
                    <CarouselProduct images={product.images} />
                </div>
                <InfoProduct product={product} />
            </div>
        </div>
    )
}