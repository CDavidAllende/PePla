"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Download, CheckCircle, Package } from "lucide-react"

export default function TicketPage() {
    const [ticket, setTicket] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        const savedTicket = localStorage.getItem('lastTicket')
        if (savedTicket) {
            setTicket(JSON.parse(savedTicket))
        } else {
            router.push('/')
        }
    }, [router])

    const handleDownload = () => {
        window.print()
    }

    if (!ticket) return (
        <div className="max-w-4xl mx-auto sm:px-24 py-16 text-center">
            <p>Cargando...</p>
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-24">
                <div className="text-center mb-12 no-print">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                        <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ¡Compra Exitosa!
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                        Tu pedido <span className="font-bold">{ticket.orderNumber}</span> ha sido confirmado
                    </p>
                    <p className="text-sm text-gray-500">
                        Recibirás un email de confirmación en breve
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 text-center">
                        <Package size={48} className="mx-auto mb-3" />
                        <h2 className="text-3xl font-black mb-1">Psyduck ft PePla</h2>
                        <p className="text-sm opacity-90">Tu Tienda de Videojuegos Favorita</p>
                    </div>

                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-3">
                                <h3 className="font-bold text-lg border-b pb-2">Información del Pedido</h3>
                                <div>
                                    <p className="text-sm text-gray-500">Número de Orden</p>
                                    <p className="font-mono font-bold">{ticket.orderNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Fecha y Hora</p>
                                    <p className="font-medium">{ticket.date}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-bold text-lg border-b pb-2">Información del Cliente</h3>
                                <div>
                                    <p className="text-sm text-gray-500">Nombre</p>
                                    <p className="font-medium">{ticket.customer.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{ticket.customer.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Teléfono</p>
                                    <p className="font-medium">{ticket.customer.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold text-lg border-b pb-2 mb-4">Productos Comprados</h3>
                            <div className="space-y-3">
                                {ticket.items.map((item: any, index: number) => (
                                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        {item.images?.[0] && (
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.images[0].url}`}
                                                alt={item.productName}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <p className="font-medium">{item.productName}</p>
                                            <p className="text-xs text-gray-500">{item.origin}</p>
                                        </div>
                                        <p className="font-bold text-green-600">${item.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t-2 border-dashed pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-black">TOTAL:</span>
                                <span className="text-3xl font-black text-green-600">${ticket.total}</span>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                                <strong>Nota:</strong> Conserva este ticket como comprobante de tu compra. Tu pedido será procesado en las próximas 24-48 horas.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
                    <Button onClick={handleDownload} size="lg" variant="outline" className="w-full sm:w-auto">
                        <Download size={20} className="mr-2" />
                        Descargar Ticket
                    </Button>
                    <Button onClick={() => router.push('/')} size="lg" className="w-full sm:w-auto">
                        Volver al inicio
                    </Button>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    body {
                        margin: 0;
                        padding: 20px;
                        background: white !important;
                    }
                }
            `}</style>
        </div>
    )
}