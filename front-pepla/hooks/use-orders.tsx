import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useNotifications } from './use-notifications'

export interface Order {
    id?: number
    documentId?: string
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
    archiveOrder: (documentId: string, jwt: string) => Promise<void>
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
        console.log('User ID:', userId)
        
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
                archived: false,
                user: userId  
            }
        }
        
        console.log('Body a enviar:', JSON.stringify(bodyData, null, 2))
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(bodyData)
        })

        const responseData = await response.json()
        console.log('Respuesta de Strapi:', responseData)

        if (!response.ok) {
            console.error('Error de Strapi:', responseData)
            throw new Error(responseData.error?.message || 'Error al guardar la orden')
        }

        set({ 
            orders: [{ 
                ...order, 
                id: responseData.data.id,
                documentId: responseData.data.documentId 
            }, ...get().orders] 
        })
        
        const { addNotification } = useNotifications.getState()
        addNotification({
            type: 'purchase',
            title: '¡Compra exitosa!',
            message: `Tu pedido ${order.orderNumber} ha sido confirmado`
        })

        console.log('✅ Orden guardada exitosamente')
    } catch (error: any) {
        console.error('Error completo:', error)
        throw error
    }
},
            
          fetchOrders: async (jwt: string, includeArchived: boolean = false) => {
    try {
        const userString = localStorage.getItem('user')
        if (!userString) {
            set({ orders: [] })
            return
        }
        
        const userData = JSON.parse(userString)
        const userId = userData.id
        
        console.log('Fetching orders para usuario ID:', userId)
        
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders?filters[user][id][$eq]=${userId}&populate=*&sort=date:desc`,
            {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
        )

        if (!response.ok) {
            const errorData = await response.json()
            console.error('Error de Strapi:', errorData)
            
            if (response.status === 401 || response.status === 403) {
                set({ orders: [] })
                return
            }
            
            throw new Error('Error al cargar órdenes')
        }

        const data = await response.json()
        
        console.log('Órdenes recibidas:', data.data.length)
        
        let orders = data.data.map((item: any) => ({
            id: item.id,
            documentId: item.documentId,
            orderNumber: item.orderNumber || 'N/A',
            date: item.date ? new Date(item.date).toLocaleString('es-MX') : 'N/A',
            status: item.orderStatus || 'processing',
            customer: {
                name: item.customerName || 'N/A',
                email: item.customerEmail || 'N/A',
                phone: item.customerPhone || 'N/A',
                address: item.customerAddress || 'N/A'
            },
            items: item.items || [],
            total: item.total || 0,
            archived: item.archived || false
        }))

        if (!includeArchived) {
            orders = orders.filter((order: Order) => !order.archived)
        }
        
        set({ orders })
    } catch (error) {
        console.error('Error fetching orders:', error)
        set({ orders: [] })
    }
},
            
            archiveOrder: async (documentId: string, jwt: string) => {
                try {
                    console.log('Archivando orden documentId:', documentId)
                    
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${documentId}`,
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
                        orders: get().orders.filter(order => order.documentId !== documentId)
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
                        .filter(order => order.documentId)
                        .map(order => 
                            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${order.documentId}`, {
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