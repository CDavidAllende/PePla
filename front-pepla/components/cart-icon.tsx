"use client"

import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"

const CartIcon = () => {
    const router = useRouter()
    const items = useCart(state => state.items)

    return (
        <button
            onClick={() => router.push("/cart")}
            className="relative cursor-pointer"
        >
            <ShoppingCart size={24} strokeWidth={1.5} />
            {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white dark:bg-white dark:text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {items.length}
                </span>
            )}
        </button>
    )
}

export default CartIcon