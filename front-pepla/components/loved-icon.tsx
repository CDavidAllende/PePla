"use client"

import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLovedProducts } from "@/hooks/use-loved-products"

const LovedIcon = () => {
    const router = useRouter()
    const lovedItems = useLovedProducts(state => state.lovedItems)

    return (
        <button
            onClick={() => router.push("/loved-products")}
            className="relative cursor-pointer"
        >
            <Heart size={24} strokeWidth={1} />
            {lovedItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {lovedItems.length}
                </span>
            )}
        </button>
    )
}

export default LovedIcon