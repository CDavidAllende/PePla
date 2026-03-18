"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Camera, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

export default function AvatarUpload() {
    const { user, updateAvatar } = useAuth()
    const [uploading, setUploading] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !user) return

        if (file.size > 2 * 1024 * 1024) {
            toast.error('La imagen debe ser menor a 2MB')
            return
        }

        if (!file.type.startsWith('image/')) {
            toast.error('Solo se permiten imágenes')
            return
        }

        setUploading(true)

        try {
            const formData = new FormData()
            formData.append('files', file)
            formData.append('refId', user.id.toString())
            formData.append('ref', 'plugin::users-permissions.user')
            formData.append('field', 'avatar')

            const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.jwt}`
                },
                body: formData
            })

            if (!uploadResponse.ok) {
                throw new Error('Error al subir la imagen')
            }

            const uploadData = await uploadResponse.json()
            const avatarUrl = uploadData[0].url

            console.log('Imagen subida exitosamente:', avatarUrl)

            const avatarKey = `avatar_user_${user.id}`
            localStorage.setItem(avatarKey, avatarUrl)

            updateAvatar(avatarUrl)

            toast.success('¡Foto de perfil actualizada!')

        } catch (error) {
            console.error('Error:', error)
            toast.error('Error al subir la imagen')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="avatar-upload"
                disabled={uploading}
            />
            <label htmlFor="avatar-upload">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={uploading}
                    className="cursor-pointer bg-white text-purple-600 border-white hover:bg-white/90"
                    asChild
                >
                    <span>
                        {uploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Subiendo...
                            </>
                        ) : (
                            <>
                                <Camera className="mr-2 h-4 w-4" />
                                Cambiar foto
                            </>
                        )}
                    </span>
                </Button>
            </label>
        </div>
    )
}