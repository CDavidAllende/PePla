"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function CheckoutPage() {
    const { items, removeAll } = useCart()
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })

    const totalPrice = items.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (items.length === 0 && !isProcessing) {
            router.push("/cart")
        }
    }, [items.length, isProcessing, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)
        
        const ticket = {
            orderNumber: `ORD-${Date.now()}`,
            date: new Date().toLocaleString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            customer: formData,
            items: items,
            total: totalPrice
        }

        localStorage.setItem('lastTicket', JSON.stringify(ticket))
        
        await new Promise(resolve => setTimeout(resolve, 100))
        
        removeAll()
        
        router.push('/ticket')
    }

    if (items.length === 0 && !isProcessing) {
        return (
            <div className="max-w-4xl mx-auto sm:px-24 py-16 text-center">
                <p>Redirigiendo al carrito...</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto sm:px-24 py-16">
            <h1 className="text-3xl font-black mb-8">Finalizar Compra</h1>

            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold mb-4">Información de envío</h2>
                        
                        <div>
                            <Label htmlFor="name">Nombre completo *</Label>
                            <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Juan Pérez"
                                disabled={isProcessing}
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                placeholder="juan@example.com"
                                disabled={isProcessing}
                            />
                        </div>

                        <div>
                            <Label htmlFor="phone">Teléfono *</Label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                placeholder="55 1234 5678"
                                disabled={isProcessing}
                            />
                        </div>

                        <div>
                            <Label htmlFor="address">Dirección *</Label>
                            <Input
                                id="address"
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                placeholder="Calle, Número, Colonia, CP"
                                disabled={isProcessing}
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
                        <div className="border rounded-lg p-6 space-y-4">
                            <div className="max-h-64 overflow-y-auto space-y-2">
                                {items.map((product) => (
                                    <div key={product.id} className="flex justify-between text-sm pb-2 border-b">
                                        <span className="truncate mr-2">{product.productName}</span>
                                        <span className="font-medium">${product.price}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="border-t pt-4">
                                <div className="flex justify-between font-black text-lg">
                                    <span>Total</span>
                                    <span className="text-green-600">${totalPrice}</span>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full mt-4"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Procesando...' : 'Confirmar Compra'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}