"use client"

import { useLovedProducts } from "@/hooks/use-loved-products"
import { useCart } from "@/hooks/use-cart"
import { X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function LovedProductsPage() {
    const { lovedItems, removeLoveItem, removeAll } = useLovedProducts()
    const { addItem } = useCart()
    const router = useRouter()

    if (lovedItems.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-24 py-32 text-center">
                <h1 className="text-3xl font-black mb-4">No tienes productos favoritos</h1>
                <p className="text-gray-500 mb-8">
                    Agrega productos a tu lista de deseos para verlos aquí
                </p>
                <Button onClick={() => router.push("/")}>
                    Explorar productos
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto sm:px-24 py-16">
            <div className="flex items-center justify-between mb-8 px-4">
                <h1 className="text-3xl font-black">Mis productos favoritos</h1>
                <button
                    onClick={removeAll}
                    className="text-sm text-gray-400 hover:text-red-500 transition underline"
                >
                    Limpiar todos
                </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {lovedItems.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition group relative"
                    >
                        <button
                            onClick={() => removeLoveItem(product.id)}
                            className="absolute top-2 right-2 z-10 bg-white dark:bg-black rounded-full p-2 shadow-md hover:bg-red-500 hover:text-white transition"
                        >
                            <X size={16} />
                        </button>

                        {product.images?.[0] && (
                            <div 
                                className="relative h-48 cursor-pointer"
                                onClick={() => router.push(`/product/${product.slug}`)}
                            >
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`}
                                    alt={product.productName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-4">
                            <h3 
                                className="font-bold text-lg mb-2 cursor-pointer hover:underline"
                                onClick={() => router.push(`/product/${product.slug}`)}
                            >
                                {product.productName}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                                {product.description}
                            </p>
                            
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xl font-bold text-green-600">
                                    ${product.price}
                                </span>
                                <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                    {product.origin}
                                </span>
                            </div>

                            <Button 
                                className="w-full"
                                onClick={() => addItem(product)}
                            >
                                <ShoppingCart size={16} className="mr-2" />
                                Agregar al carrito
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}