"use client"

import { useCart } from "@/hooks/use-cart"
import { useLovedProducts } from "@/hooks/use-loved-products"
import { formatPrice } from "@/lib/formatPrice"
import { ProductType } from "@/types/product"
import { Heart, ShoppingCart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { useCurrency } from "@/hooks/use-currency"

export type InfoProductProps = {
    product: ProductType
}

const InfoProduct = (props: InfoProductProps) => {
    const { product } = props
    const { country } = useCurrency()
    const router = useRouter()
    const pathname = usePathname()
    const { isAuthenticated, user } = useAuth()
    const { addItem } = useCart()
    const { addLoveItem, lovedItems } = useLovedProducts()
    const [showShareMenu, setShowShareMenu] = useState(false)

    const redirectToLogin = () => {
        router.push(`/login?redirect=${pathname}`)
    }

    const handleAddToCart = () => {
        addItem(product, isAuthenticated, redirectToLogin)
    }

    const handleAddToFavorites = () => {
        addLoveItem(product, isAuthenticated, redirectToLogin)
    }

    const handleShare = () => {
        setShowShareMenu(!showShareMenu)
    }

    const shareWhatsApp = () => {
        const message = `🎮 ¡Mira este juego! 🎮\n\n${product.productName}\nConsola: ${product.category.categoryName}\n\n${window.location.href}`
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`
        window.open(whatsappLink, '_blank')
    }

    const shareTwitter = () => {
        const text = `🎮 ${product.productName}\nConsola: ${product.category.categoryName}\n\n${window.location.href}`
        const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
        window.open(twitterLink, '_blank')
    }

    const shareFacebook = () => {
        const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
        window.open(facebookLink, '_blank')
    }

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        alert('¡Link copiado al portapapeles!')
        setShowShareMenu(false)
    }

    const nativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.productName,
                    text: `🎮 ${product.productName} - ${product.category.categoryName}`,
                    url: window.location.href
                })
            } catch (error) {
                console.log('Error al compartir:', error)
            }
        } else {
            setShowShareMenu(!showShareMenu)
        }
    }

    const isLoved = lovedItems.some(item => item.id === product.id)

    return (
        <div className="px-6">
            <div className="justify-between mb-3 sm:flex">
    <h1 className="text-2xl">{product.productName}</h1>
    <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="px-2 py-1 text-xs bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full w-fit">
            {product.origin}
        </p>
        {product.genero && (
            <p className="px-2 py-1 text-xs bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full w-fit">
                {product.genero}
            </p>
        )}
        {product.genero2 && (
            <p className="px-2 py-1 text-xs bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full w-fit">
                {product.genero2}
            </p>
        )}
    </div>
</div>
            <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-lg">{country.symbol}{product.price} {country.currency}</p>

                <div className="flex items-center gap-2">
                    <Button onClick={handleShare} className="bg-blue-600 hover:bg-blue-700">
                        <Share2 size={20} />
                    </Button>
                    <Button 
                        onClick={handleAddToFavorites}
                        variant="outline"
                        size="icon"
                        className="border-gray-300 hover:border-red-500"
                    >
                        <Heart
                            size={20}
                            className={`transition-colors ${
                                isLoved 
                                    ? "fill-red-500 stroke-red-500" 
                                    : "fill-none stroke-gray-600 dark:stroke-gray-300"
                            }`}
                        />
                    </Button>
                </div>
            </div>
            <p className="mb-5">{product.description}</p>

            {showShareMenu && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <Button
                        onClick={shareWhatsApp}
                        variant="ghost"
                        className="flex flex-col items-center gap-2 h-auto py-4"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span className="text-xs">WhatsApp</span>
                    </Button>

                    <Button
                        onClick={shareTwitter}
                        variant="ghost"
                        className="flex flex-col items-center gap-2 h-auto py-4"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <span className="text-xs">Twitter</span>
                    </Button>

                    <Button
                        onClick={shareFacebook}
                        variant="ghost"
                        className="flex flex-col items-center gap-2 h-auto py-4"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span className="text-xs">Facebook</span>
                    </Button>

                    <Button
                        onClick={copyLink}
                        variant="ghost"
                        className="flex flex-col items-center gap-2 h-auto py-4"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        <span className="text-xs">Copiar Link</span>
                    </Button>
                </div>
            )}

            <Button className="w-full" onClick={handleAddToCart}>
                <ShoppingCart size={20} className="mr-2" />
                Comprar
            </Button>
        </div>
    )
}

export default InfoProduct