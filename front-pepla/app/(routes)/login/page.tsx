"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

export default function LoginPage() {
    const { login } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectTo = searchParams.get('redirect') || '/'
    
    const [formData, setFormData] = useState({
        identifier: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await login(formData.identifier, formData.password)
            toast.success("¡Bienvenido de vuelta!")
            router.push(redirectTo)
        } catch (error: any) {
            toast.error(error.message || "Error al iniciar sesión")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-2">Iniciar Sesión</h1>
                    <p className="text-gray-600">Accede a tu cuenta de Psyduck ft PePla</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="identifier">Email o Usuario</Label>
                            <Input
                                id="identifier"
                                type="text"
                                required
                                value={formData.identifier}
                                onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                                placeholder="tu@email.com"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Regístrate aquí
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}