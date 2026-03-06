"use client"

import { Heart, ShoppingCart, User } from "lucide-react"
import { useRouter } from "next/navigation"
import MenuList from "./menu-list"
import ItemsMenuMobile from "./items-menu-mobile"
import ToggleTheme from "./toggle-theme"
import CartIcon from "./cart-icon"
import { useAuth } from "@/contexts/auth-context"
import { useNotifications } from "@/hooks/use-notifications"

const Navbar = () => {
    const router = useRouter()
    const { isAuthenticated, user } = useAuth()
    const { getUnreadCount } = useNotifications()
    const unreadCount = getUnreadCount()

    return (
        <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
            <h1 className="text-3xl" onClick={() => router.push("/")}>
                Psyduck <span className="font-bold">ft PePla</span>
            </h1>
            <div className="items-center justify-between hidden sm:flex">
                <MenuList />
            </div>
            <div className="flex sm:hidden">
                <ItemsMenuMobile />
            </div>
            <div className="flex items-center justify-between gap-2 sm:gap-7">
                {isAuthenticated && (
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="relative">
                            <User 
                                className="cursor-pointer" 
                                strokeWidth={1} 
                                onClick={() => router.push("/profile")}
                            />
                            {unreadCount > 0 && (
                                <span className="absolute -bottom-1 -left-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <span 
                            className="text-sm font-medium cursor-pointer hover:underline"
                            onClick={() => router.push("/profile")}
                        >
                            {user?.username}
                        </span>
                    </div>
                )}

                {isAuthenticated ? (
                    <>
                        <Heart 
                            strokeWidth={1} 
                            className="cursor-pointer" 
                            onClick={() => router.push("/loved-products")} 
                        />
                        <CartIcon />
                    </>
                ) : (
                    <User 
                        strokeWidth={1} 
                        className="cursor-pointer" 
                        onClick={() => router.push("/login")}
                    />
                )}
                <ToggleTheme />
            </div>
        </div>
    )
}

export default Navbar