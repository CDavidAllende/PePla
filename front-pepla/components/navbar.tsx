"use client";

import { useRouter } from "next/navigation";
import { Heart, LogOut, User as UserIcon } from "lucide-react";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import CartIcon from "./cart-icon";
import LovedIcon from "./loved-icon";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "./ui/button";

const Navbar = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
      <h1
        className="text-3xl"
        onClick={() => router.push("/")}
      >
        Psyduck ft <span className="font-bold">PePla</span>
      </h1>

      <div className="items-center justify-between hidden sm:flex ">
        <MenuList />
      </div>

      <div className="flex sm:hidden">
        <ItemsMenuMobile />
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-7 ">
        <CartIcon />
        <LovedIcon />
        
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
              <UserIcon size={16} />
              <span className="text-sm font-medium">{user?.username}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              title="Cerrar sesión"
            >
              <LogOut size={20} strokeWidth={1.5} />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/login')}
            title="Iniciar sesión"
          >
            <UserIcon size={20} strokeWidth={1.5} />
          </Button>
        )}

        <ToggleTheme />
      </div>
    </div>
  );
};

export default Navbar;