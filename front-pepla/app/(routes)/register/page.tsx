"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

export default function RegisterPage() {
    const { register } = useAuth()
    const router = useRouter()
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast.error("Las contraseñas no coinciden")
            return
        }

        if (formData.password.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres")
            return
        }

        setIsLoading(true)

        try {
            await register(formData.username, formData.email, formData.password)
            toast.success("¡Cuenta creada exitosamente!")
            router.push('/')
        } catch (error: any) {
            toast.error(error.message || "Error al crear cuenta")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-2">Crear Cuenta</h1>
                    <p className="text-gray-600">Únete a Psyduck ft PePla</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="username">Nombre de Usuario</Label>
                            <Input
                                id="username"
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                placeholder="jugador123"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
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

                        <div>
                            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}