"use client"

import { useCart } from "@/hooks/use-cart"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CartPage() {
    const { items, removeItem, removeAll } = useCart()
    const router = useRouter()

    const totalPrice = items.reduce((total, item) => total + item.price, 0)

    if (items.length === 0) {
        return (
            <div className="max-w-6xl mx-auto px-24 py-32 text-center">
                <h1 className="text-3xl font-black mb-4">Tu carrito está vacío</h1>
                <p className="text-gray-500 mb-8">
                    Agrega productos para continuar
                </p>
                <Button onClick={() => router.back()}>
                    Seguir comprando
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto sm:px-24 py-16">
            <h1 className="text-3xl font-black mb-8 px-4">Tu carrito</h1>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4 px-4">
                    {items.map((product) => (
                        <div
                            key={product.id}
                            className="flex gap-4 border rounded-lg p-4 hover:shadow-md transition"
                        >
                            {product.images?.[0] && (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`}
                                    alt={product.productName}
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                            )}

                            <div className="flex-1">
                                <h3 className="font-bold text-lg">
                                    {product.productName}
                                </h3>
                                <p className="text-sm text-gray-500 mb-1">
                                    {product.origin}
                                </p>
                                <p className="text-sm text-gray-500 mb-1">
                                    {product.genero}
                                </p>
                                <p className="text-green-600 font-bold text-lg">
                                    ${product.price}
                                </p>
                            </div>

                            <button
                                onClick={() => removeItem(product.id)}
                                className="text-gray-400 hover:text-red-500 transition self-start"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={removeAll}
                        className="text-sm text-gray-400 hover:text-red-500 transition underline"
                    >
                        Vaciar carrito
                    </button>
                </div>
                <div className="md:col-span-1 px-4">
                    <div className="border rounded-lg p-6 sticky top-8">
                        <h2 className="text-xl font-black mb-4">
                            Resumen del pedido
                        </h2>

                        <div className="space-y-2 mb-4 text-sm">
                            {items.map((product) => (
                                <div key={product.id} className="flex justify-between">
                                    <span className="text-gray-600 truncate mr-2">
                                        {product.productName}
                                    </span>
                                    <span className="font-medium">${product.price}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 mb-6">
                            <div className="flex justify-between font-black text-lg">
                                <span>Total</span>
                                <span>${totalPrice}</span>
                            </div>
                        </div>

                        <Button 
                            className="w-full" 
                            onClick={() => console.log("Checkout")}
                        >
                            Proceder al pago
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}