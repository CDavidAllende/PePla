"use client"

import { useAuth } from "@/contexts/auth-context"
import { useNotifications } from "@/hooks/use-notifications"
import { Button } from "@/components/ui/button"
import { User, Mail, Package, Heart, Bell, LogOut, Trash2, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import AvatarUpload from "@/components/avatar-upload"
import AuthGuard from "@/components/auth-guard"

function ProfileContent() {
    const { user, logout } = useAuth()
    const router = useRouter()
    const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications()
    const [showNotifications, setShowNotifications] = useState(false)

    if (!user) return null

    const maskEmail = (email?: string) => {
    if (!email) return ""

    const [name, domain] = email.split('@')

    if (name.length <= 2) return email

    const masked =
     name[0] +
     name[1] +
     '*'.repeat(name.length - 4) +
     name.slice(-2)

     return `${masked}@${domain}`
    }

    const handleNotificationClick = (notif: any) => {
        markAsRead(notif.id)
    }

    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-24">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-4 overflow-hidden">
                        {user.avatar ? (
                            <img 
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user.avatar}`}
                                alt={user.username}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={48} />
                        )}
                    </div>
                    <h1 className="text-3xl font-black mb-1">{user.username}</h1>
                    <p className="text-sm opacity-90 mb-4">{maskEmail(user.email)}</p>
                    
                    <AvatarUpload />
                </div>

                <div className="p-8 space-y-6">
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <User size={20} />
                            Perfil
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Nombre de usuario</p>
                                <p className="font-medium">{user.username}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Correo electrónico</p>
                                <p className="font-medium">{maskEmail(user.email)}</p>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            className="mt-4 cursor-pointer"
                            onClick={() => alert('Función de editar perfil próximamente')}
                        >
                            Editar perfil
                        </Button>
                    </div>

                    <div className="border-b pb-6">
                        <h2 className="text-xl font-bold mb-4">Accesos rápidos</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="justify-start h-auto py-4"
                                onClick={() => router.push('/orders')}
                            >
                                <Package className="mr-3 " size={20} />
                                <div className="text-left cursor-pointer">
                                    <p className="font-medium ">Mis Pedidos</p>
                                    <p className="text-xs text-gray-500 ">Ver historial de compras</p>
                                </div>
                            </Button>

                            <Button
                                variant="outline"
                                className="justify-start h-auto py-4"
                                onClick={() => router.push('/loved-products')}
                            >
                                <Heart className="mr-3" size={20} />
                                <div className="text-left cursor-pointer">
                                    <p className="font-medium">Favoritos</p>
                                    <p className="text-xs text-gray-500">Productos guardados</p>
                                </div>
                            </Button>
                        </div>
                    </div>

                    <div className="border-b pb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Bell size={20} />
                                Notificaciones
                                {unreadCount > 0 && (
                                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                        {unreadCount}
                                    </span>
                                )}
                            </h2>
                            {notifications.length > 0 && (
                                <div className="flex gap-2">
                                    {unreadCount > 0 && (
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={markAllAsRead}
                                        >
                                            <Check size={16} className="mr-1" />
                                            Marcar todas
                                        </Button>
                                    )}
                                    <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={clearAll}
                                        className="text-red-600"
                                    >
                                        <Trash2 size={16} className="mr-1" />
                                        Limpiar
                                    </Button>
                                </div>
                            )}
                        </div>

                        {notifications.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <Bell size={48} className="mx-auto mb-3 opacity-30" />
                                <p>No tienes notificaciones</p>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                                            notif.read 
                                                ? 'bg-gray-50 dark:bg-gray-800/50' 
                                                : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                                        }`}
                                        onClick={() => handleNotificationClick(notif)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="font-medium">{notif.title}</p>
                                                    {!notif.read && (
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {notif.message}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">{notif.date}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    deleteNotification(notif.id)
                                                }}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Button 
                        variant="outline" 
                        className="w-full text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                        onClick={logout}
                    >
                        <LogOut className="mr-2" size={20} />
                        Cerrar sesión
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default function ProfilePage() {
    return (
        <AuthGuard>
            <ProfileContent />
        </AuthGuard>
    )
}