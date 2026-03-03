"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
    children: React.ReactNode
    requireAuth?: boolean
}

export default function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!loading && requireAuth && !isAuthenticated) {
            router.push(`/login?redirect=${pathname}`)
        }
    }, [isAuthenticated, loading, requireAuth, router, pathname])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
        )
    }

    if (requireAuth && !isAuthenticated) {
        return null
    }

    return <>{children}</>
}