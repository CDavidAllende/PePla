import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Notification {
    id: string
    type: 'purchase' | 'info' | 'success'
    title: string
    message: string
    date: string
    read: boolean
}

interface NotificationsStore {
    notifications: Notification[]
    addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void
    markAsRead: (id: string) => void
    markAllAsRead: () => void
    deleteNotification: (id: string) => void
    clearAll: () => void
    getUnreadCount: () => number
}

export const useNotifications = create(
    persist<NotificationsStore>(
        (set, get) => ({
            notifications: [],
            
            addNotification: (notification) => {
                const newNotification: Notification = {
                    ...notification,
                    id: `notif-${Date.now()}`,
                    date: new Date().toLocaleString('es-MX'),
                    read: false
                }
                set({
                    notifications: [newNotification, ...get().notifications]
                })
            },
            
            markAsRead: (id) => {
                set({
                    notifications: get().notifications.map(notif =>
                        notif.id === id ? { ...notif, read: true } : notif
                    )
                })
            },
            
            markAllAsRead: () => {
                set({
                    notifications: get().notifications.map(notif => ({ ...notif, read: true }))
                })
            },
            
            deleteNotification: (id) => {
                set({
                    notifications: get().notifications.filter(notif => notif.id !== id)
                })
            },
            
            clearAll: () => {
                set({ notifications: [] })
            },
            
            getUnreadCount: () => {
                return get().notifications.filter(notif => !notif.read).length
            }
        }),
        {
            name: "notifications-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)