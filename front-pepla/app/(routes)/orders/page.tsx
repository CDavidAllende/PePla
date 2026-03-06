"use client"

import { useOrders, Order } from "@/hooks/use-orders"
import { useAuth } from "@/contexts/auth-context"
import { Package, Clock, CheckCircle, XCircle, Eye, Archive, ArchiveX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import AuthGuard from "@/components/auth-guard"
import { toast } from "sonner"

function OrdersContent() {
    const { orders, fetchOrders, archiveOrder, archiveAllOrders } = useOrders()
    const { user } = useAuth()
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [archiving, setArchiving] = useState<string | null>(null)
    const [archivingAll, setArchivingAll] = useState(false)

    useEffect(() => {
        const loadOrders = async () => {
            if (user?.jwt) {
                await fetchOrders(user.jwt, false) // false = no incluir archivadas
            }
            setLoading(false)
        }
        loadOrders()
    }, [user, fetchOrders])

    const handleArchiveOrder = async (documentId: string) => {
    if (!window.confirm('¿Archivar este pedido? Podrás verlo en "Pedidos archivados".')) {
        return
    }

    setArchiving(documentId)
    try {
        await archiveOrder(documentId, user!.jwt)
        toast.success('Pedido archivado correctamente')
    } catch (error) {
        toast.error('Error al archivar el pedido')
    } finally {
        setArchiving(null)
    }
}

    const handleArchiveAllOrders = async () => {
        if (!window.confirm('¿Archivar TODOS los pedidos? Podrás verlos en "Pedidos archivados".')) {
            return
        }

        setArchivingAll(true)
        try {
            await archiveAllOrders(user!.jwt)
            toast.success('Todos los pedidos han sido archivados')
        } catch (error) {
            toast.error('Error al archivar los pedidos')
        } finally {
            setArchivingAll(false)
        }
    }

    const statusConfig = {
        processing: { 
            icon: Clock, 
            label: "En proceso", 
            color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30" 
        },
        shipped: { 
            icon: Package, 
            label: "Enviado", 
            color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30" 
        },
        delivered: { 
            icon: CheckCircle, 
            label: "Entregado", 
            color: "text-green-600 bg-green-100 dark:bg-green-900/30" 
        },
        cancelled: { 
            icon: XCircle, 
            label: "Cancelado", 
            color: "text-red-600 bg-red-100 dark:bg-red-900/30" 
        }
    }

    if (loading) {
    return (
        <div className="max-w-6xl mx-auto py-16 text-center">
            <p>Cargando pedidos...</p>
        </div>
    )
    }
    console.log('Órdenes actuales:', orders)
    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-black mb-2">Mis Pedidos</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Revisa el estado de tus compras activas
                    </p>
                </div>
                
                {orders.length > 0 && (
                    <Button
                        variant="outline"
                        onClick={handleArchiveAllOrders}
                        disabled={archivingAll}
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                    >
                        <Archive size={16} className="mr-2" />
                        {archivingAll ? 'Archivando...' : 'Archivar Todos'}
                    </Button>
                )}
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-lg text-gray-500 mb-2">No tienes pedidos activos</p>
                    <p className="text-sm text-gray-400 mb-6">
                        Comienza a comprar o revisa tus pedidos archivados
                    </p>
                    <Button onClick={() => window.location.href = '/'}>
                        Ir a la tienda
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => {
                        const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
                        const statusLabel = statusConfig[order.status as keyof typeof statusConfig].label
                        const statusColor = statusConfig[order.status as keyof typeof statusConfig].color

                        return (
                            <div
                                key={order.id || order.orderNumber}
                                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg">Pedido {order.orderNumber}</h3>
                                        <p className="text-sm text-gray-500">{order.date}</p>
                                        <p className="text-sm text-gray-600 mt-1">{order.customer.name}</p>
                                    </div>
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusColor}`}>
                                        <StatusIcon size={16} />
                                        <span className="text-sm font-medium">{statusLabel}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-600">
                                            {order.items.length} {order.items.length === 1 ? "producto" : "productos"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xl font-bold text-green-600">
                                            ${order.total}
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            <Eye size={16} className="mr-2" />
                                            Ver
                                        </Button>
                                        {order.id && (
                                            <Button
        variant="outline"
        size="sm"
        onClick={() => handleArchiveOrder(order.documentId!)}
        disabled={archiving === order.documentId}
        className="text-orange-600 hover:text-orange-700"
        title="Archivar pedido"
    >
        {archiving === order.documentId ? '...' : <Archive size={16} />}
    </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {selectedOrder && (
                <div 
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedOrder(null)}
                >
                    <div 
                        className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-black mb-4">Detalles del Pedido</h2>
                        
                        <div className="space-y-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-500">Número de Orden</p>
                                <p className="font-mono font-bold">{selectedOrder.orderNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Fecha</p>
                                <p className="font-medium">{selectedOrder.date}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Cliente</p>
                                <p className="font-medium">{selectedOrder.customer.name}</p>
                                <p className="text-sm">{selectedOrder.customer.email}</p>
                            </div>
                        </div>

                        <h3 className="font-bold mb-3">Productos:</h3>
                        <div className="space-y-2 mb-6">
                            {selectedOrder.items.map((item: any, index: number) => (
                                <div key={index} className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                                    <span>{item.productName}</span>
                                    <span className="font-bold">${item.price}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 mb-4">
                            <div className="flex justify-between text-xl font-black">
                                <span>Total:</span>
                                <span className="text-green-600">${selectedOrder.total}</span>
                            </div>
                        </div>

                        <Button onClick={() => setSelectedOrder(null)} className="w-full">
                            Cerrar
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function OrdersPage() {
    return (
        <AuthGuard>
            <OrdersContent />
        </AuthGuard>
    )
}