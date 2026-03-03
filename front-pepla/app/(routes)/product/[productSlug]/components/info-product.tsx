"use client"

import { ProductType } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

interface InfoProductProps {
    product: ProductType
}

const InfoProduct = (props: InfoProductProps) => {
    const { product } = props
    const { addItem } = useCart()
    const { addLoveItem, lovedItems } = useLovedProducts()
    const { isAuthenticated } = useAuth()
    const router = useRouter()
    
    const isLoved = lovedItems.some(item => item.id === product.id)

    const handleAddToCart = () => {
        addItem(
            product, 
            isAuthenticated, 
            () => router.push('/login?redirect=' + window.location.pathname)
        )
    }

    const handleToggleFavorite = () => {
        addLoveItem(
            product,
            isAuthenticated,
            () => router.push('/login?redirect=' + window.location.pathname)
        )
    }

    return (
        <div className="px-6">
            <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-green-600 mb-4">${product.price}</p>
            
            <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-500">
                    <span className="font-semibold">Origen:</span> {product.origin}
                </p>
                <p className="text-sm text-gray-500">
                    <span className="font-semibold">Género:</span> {product.genero}
                </p>
            </div>

            <div className="flex items-center gap-5">
                <Button 
                    className="w-full" 
                    onClick={handleAddToCart}
                >
                    Agregar al carrito
                </Button>
                <Heart 
                    size={30}
                    strokeWidth={1} 
                    className={`transition duration-300 cursor-pointer hover:fill-red-500 flex-shrink-0 ${
                        isLoved ? 'fill-red-500 text-red-500' : ''
                    }`}
                    onClick={handleToggleFavorite} 
                />
            </div>
        </div>
    )
}

export default InfoProduct;