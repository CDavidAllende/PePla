"use client"

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { useCart } from "@/hooks/use-cart";
import { ResponseType } from "@/types/response"
import { ProductType } from "@/types/product"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import ProductCard from "@/app/(routes)/category/[categorySlug]/components/product-card"
import { useEffect, useState } from "react"
import { SkeletonSchema } from "./skeleton-schema";

const FeaturedProducts = () => {
    const { loading, result }: ResponseType = useGetFeaturedProducts();
    const { addItem } = useCart()
    const [shuffledProducts, setShuffledProducts] = useState<ProductType[]>([])

    const shuffleArray = (array: ProductType[]) => {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }

    useEffect(() => {
        if (result && Array.isArray(result)) {
            const shuffled = shuffleArray(result)
            setShuffledProducts(shuffled.slice(0, 8))
        }
    }, [result])

    if (loading) {
        return (
            <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
                <div className="px-6 mb-8 relative">
                    <span className="absolute -top-6 left-6 text-8xl font-black text-gray-100 select-none pointer-events-none">
                        TOP
                    </span>
                    <h3 className="text-4xl font-black tracking-tight relative z-10">
                        Juegos destacados
                    </h3>
                </div>
                <SkeletonSchema grid={3} />
            </div>
        )
    }

    if (!shuffledProducts || shuffledProducts.length === 0) {
        return null
    }

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <div className="px-6 mb-8 relative">
            <span className="absolute -top-6 left-6 text-8xl font-black select-none pointer-events-none text-gray-300 dark:text-gray-800">
                TOP
            </span>
            <h3 className="text-4xl font-black tracking-tight relative z-10">
                Juegos destacados
            </h3> 
        </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full px-6"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {shuffledProducts.map((product) => (
                        <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                            <ProductCard product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex -left-12" />
                <CarouselNext className="hidden sm:flex -right-12" />
            </Carousel>
        </div>
    )
}

export default FeaturedProducts;