"use client"

import { Package, Clock, CheckCircle, XCircle } from "lucide-react"

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      date: "2025-02-20",
      status: "delivered",
      total: 1250,
      items: 3
    },
    {
      id: "ORD-002",
      date: "2025-02-22",
      status: "processing",
      total: 800,
      items: 2
    }
  ]

  const statusConfig = {
    processing: { icon: Clock, label: "En proceso", color: "text-yellow-600 bg-yellow-100" },
    delivered: { icon: CheckCircle, label: "Entregado", color: "text-green-600 bg-green-100" },
    cancelled: { icon: XCircle, label: "Cancelado", color: "text-red-600 bg-red-100" }
  }

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">Mis Pedidos</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Revisa el estado de tus compras y tu historial
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-lg text-gray-500 mb-2">No tienes pedidos aún</p>
          <p className="text-sm text-gray-400">
            Comienza a comprar para ver tu historial aquí
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
            const statusLabel = statusConfig[order.status as keyof typeof statusConfig].label
            const statusColor = statusConfig[order.status as keyof typeof statusConfig].color

            return (
              <div
                key={order.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Pedido {order.id}</h3>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusColor}`}>
                    <StatusIcon size={16} />
                    <span className="text-sm font-medium">{statusLabel}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-gray-600">
                    {order.items} {order.items === 1 ? "producto" : "productos"}
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    ${order.total}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
