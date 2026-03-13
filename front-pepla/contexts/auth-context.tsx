'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { toast } from 'sonner'
import { useCurrency, countries } from '@/hooks/use-currency'

interface User {
    id: number
    username: string
    email: string
    jwt: string
    avatar?: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (identifier: string, password: string) => Promise<void>
    register: (username: string, email: string, password: string) => Promise<void>
    logout: () => void
    loading: boolean
    updateAvatar: (avatarUrl: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const updateAvatar = (avatarUrl: string) => {
        if (user) {
            const updatedUser = { ...user, avatar: avatarUrl }
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
        }
    }

    const login = async (identifier: string, password: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier, password }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error?.message || 'Error al iniciar sesión')
        }

        const avatarKey = `avatar_user_${data.user.id}`
        const savedAvatar = localStorage.getItem(avatarKey)

        const userData = {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            jwt: data.jwt,
            avatar: savedAvatar || undefined
        }

        console.log('Usuario guardado:', userData)

        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        
        // CARGAR LA MONEDA DEL USUARIO
        const { loadUserCurrency } = useCurrency.getState()
        loadUserCurrency(data.user.id)
        
        toast.success(`¡Bienvenido ${data.user.username}!`)
    } catch (error: any) {
        console.error('Error en login:', error)
        toast.error(error.message)
        throw error
    }
}

    const register = async (username: string, email: string, password: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error?.message || 'Error al registrarse')
            }

            const userData = {
                id: data.user.id,
                username: data.user.username,
                email: data.user.email,
                jwt: data.jwt,
                avatar: undefined
            }

            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))
            toast.success(`¡Cuenta creada! Bienvenido ${data.user.username}`)
        } catch (error: any) {
            toast.error(error.message)
            throw error
        }
    }

    const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('orders-storage')
    
    const { setCountry } = useCurrency.getState()
    setCountry(countries[1])
    
    toast.success('Sesión cerrada')
}

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, loading, updateAvatar }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider')
    }
    return context
}