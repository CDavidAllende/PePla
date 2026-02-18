"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { ProductType } from "@/types/product"
import { Expand, ShoppingCart } from "lucide-react"
import IconButton from "@/components/icon-button"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { useLovedProducts } from "@/hooks/use-loved-products"

type ProductCardProps = {
    product: ProductType
}

const ProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter()
    const { addItem } = useCart()
    const { addLoveItem } = useLovedProducts()

    return (
        <div className="border rounded-lg p-4 hover:shadow-lg transition">
            {product.images && product.images.length > 0 && (
                <Carousel className="w-full mb-3">
                    <CarouselContent>
                        {product.images.map((image) => (
                            <CarouselItem key={image.id} className="relative group">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                                    alt={image.alternativeText || product.productName}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                    <div className="flex justify-center gap-x-6">
                                        <IconButton 
                                            onClick={() => router.push(`/product/${product.slug}`)} 
                                            icon={<Expand size={20} className="text-gray-600"/>} 
                                        />
                                        <IconButton 
                                            onClick={() => addItem(product)} 
                                            icon={<ShoppingCart size={20} className="text-gray-600"/>} 
                                        />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )}

            <h3 className="font-bold text-lg mb-2">
                {product.productName}
            </h3>

            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {product.description}
            </p>

            <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">
                    ${product.price}
                </span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {product.origin}
                </span>
            </div>
        </div>
    )
}

export default ProductCard