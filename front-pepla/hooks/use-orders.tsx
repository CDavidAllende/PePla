import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Order {
    id?: number
    orderNumber: string
    date: string
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
    customer: {
        name: string
        email: string
        phone: string
        address: string
    }
    items: any[]
    total: number
    archived?: boolean
}

interface OrdersStore {
    orders: Order[]
    addOrder: (order: Order, jwt: string, userId: number) => Promise<void>
    fetchOrders: (jwt: string, includeArchived?: boolean) => Promise<void>
    archiveOrder: (orderId: number, jwt: string) => Promise<void>
    archiveAllOrders: (jwt: string) => Promise<void>
    updateOrderStatus: (orderNumber: string, status: Order['status']) => void
    getOrders: () => Order[]
}

export const useOrders = create(
    persist<OrdersStore>(
        (set, get) => ({
            orders: [],
            
            addOrder: async (order: Order, jwt: string, userId: number) => {
                try {
                    console.log('Guardando orden en Strapi...')
                    
                    const bodyData = {
                        data: {
                            orderNumber: order.orderNumber,
                            date: new Date(),
                            orderStatus: order.status,
                            customerName: order.customer.name,
                            customerEmail: order.customer.email,
                            customerPhone: order.customer.phone,
                            customerAddress: order.customer.address,
                            total: order.total,
                            items: order.items,
                            archived: false
                        }
                    }
                    
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${jwt}`
                        },
                        body: JSON.stringify(bodyData)
                    })

                    const responseData = await response.json()

                    if (!response.ok) {
                        console.error('Error de Strapi:', responseData)
                        throw new Error(responseData.error?.message || 'Error al guardar la orden')
                    }

                    set({ 
                        orders: [{ ...order, id: responseData.data.id }, ...get().orders] 
                    })
                    
                    console.log('✅ Orden guardada exitosamente')
                } catch (error: any) {
                    console.error('Error completo:', error)
                    set({ 
                        orders: [order, ...get().orders] 
                    })
                    throw error
                }
            },
            
            fetchOrders: async (jwt: string, includeArchived: boolean = false) => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders?populate=*&sort=date:desc`,
                        {
                            headers: {
                                'Authorization': `Bearer ${jwt}`
                            }
                        }
                    )

                    if (!response.ok) {
                        throw new Error('Error al cargar órdenes')
                    }

                    const data = await response.json()
                    
                    let orders = data.data.map((item: any) => ({
                        id: item.id,
                        orderNumber: item.orderNumber || item.attributes?.orderNumber || 'N/A',
                        date: item.date ? new Date(item.date).toLocaleString('es-MX') : 
                              (item.attributes?.date ? new Date(item.attributes.date).toLocaleString('es-MX') : 'N/A'),
                        status: item.orderStatus || item.attributes?.orderStatus || 'processing',
                        customer: {
                            name: item.customerName || item.attributes?.customerName || 'N/A',
                            email: item.customerEmail || item.attributes?.customerEmail || 'N/A',
                            phone: item.customerPhone || item.attributes?.customerPhone || 'N/A',
                            address: item.customerAddress || item.attributes?.customerAddress || 'N/A'
                        },
                        items: item.items || item.attributes?.items || [],
                        total: item.total || item.attributes?.total || 0,
                        archived: item.archived || item.attributes?.archived || false
                    }))

                    if (!includeArchived) {
                        orders = orders.filter((order: Order) => !order.archived)
                    }
                    
                    set({ orders })
                } catch (error) {
                    console.error('Error fetching orders:', error)
                }
            },
            
            archiveOrder: async (orderId: number, jwt: string) => {
    try {
        console.log('Archivando orden ID:', orderId)
        
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${orderId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    data: {
                        archived: true
                    }
                })
            }
        )

        const responseData = await response.json()
        console.log('Respuesta de Strapi:', responseData)
        console.log('Status:', response.status)

        if (!response.ok) {
            console.error('Error completo:', responseData)
            throw new Error(responseData.error?.message || 'Error al archivar la orden')
        }

        set({
            orders: get().orders.filter(order => order.id !== orderId)
        })
        
        console.log('✅ Orden archivada exitosamente')
    } catch (error) {
        console.error('Error al archivar orden:', error)
        throw error
    }
},

            archiveAllOrders: async (jwt: string) => {
                try {
                    const currentOrders = get().orders
                    
                    const archivePromises = currentOrders
                        .filter(order => order.id)
                        .map(order => 
                            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${order.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${jwt}`
                                },
                                body: JSON.stringify({
                                    data: {
                                        archived: true
                                    }
                                })
                            })
                        )

                    await Promise.all(archivePromises)
                    
                    set({ orders: [] })
                    
                    console.log('✅ Todas las órdenes archivadas exitosamente')
                } catch (error) {
                    console.error('Error al archivar todas las órdenes:', error)
                    throw error
                }
            },
            
            updateOrderStatus: (orderNumber: string, status: Order['status']) => {
                set({
                    orders: get().orders.map(order =>
                        order.orderNumber === orderNumber
                            ? { ...order, status }
                            : order
                    )
                })
            },
            
            getOrders: () => get().orders,
        }),
        {
            name: "orders-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)