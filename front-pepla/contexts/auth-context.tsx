"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    id: number
    username: string
    email: string
    jwt: string
}

interface AuthContextType {
    user: User | null
    login: (identifier: string, password: string) => Promise<void>
    register: (username: string, email: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

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

            const userData = {
                id: data.user.id,
                username: data.user.username,
                email: data.user.email,
                jwt: data.jwt,
            }

            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))
        } catch (error: any) {
            throw new Error(error.message || 'Error al iniciar sesión')
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
            }

            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))
        } catch (error: any) {
            throw new Error(error.message || 'Error al registrarse')
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        router.push('/')
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            isAuthenticated: !!user,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}