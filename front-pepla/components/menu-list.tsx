"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const MenuList = () => {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sobre nosotros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      PePla
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Tu Tienda? de Videojuegos favoritaa
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/shop" title="Tienda">
                Accede a toda tu informacion de compra,pedidos y mucho mas.
              </ListItem>
              <ListItem href="/offers" title="Ofertas">
                Promos y decuentos de la semana.
              </ListItem>
              <ListItem href="/" title="Accesorios">
                Productos complementarios como controles,cables,cargadores, etc.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Consolas</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/accesorios">Accesorios</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink>Xploids</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuList;

const components: { title: string; href: string; description: string }[] = [
  {
    title: "PlayStation 1",
    href: "/docs/primitives/alert-dialog",
    description:
      "La que popularizó el 3D en consolas y lanzó sagas legendarias como Final Fantasy y Metal Gear.",
  },
  {
    title: "PlayStation 2",
    href: "/docs/primitives/hover-card",
    description:
      "La consola más vendida de la historia, enorme catálogo y compatibilidad con DVDs.",
  },
  {
    title: "PlayStation 3",
    href: "/docs/primitives/progress",
    description:
      "Introdujo el juego online de PlayStation, Blu-ray y títulos más cinematográficos.",
  },
  {
    title: "PlayStation 4",
    href: "/docs/primitives/scroll-area",
    description: "Consola enfocada en potencia y exclusivos, ideal para gaming moderno en HD.",
  },
  {
    title: "Nintendo 64",
    href: "/docs/primitives/tabs",
    description:
      "Revolucionó los juegos en 3D con clásicos como Mario 64 y Zelda Ocarina of Time.",
  },
  {
    title: "Gamecube",
    href: "/docs/primitives/tooltip",
    description:
      "Pequeña y potente, famosa por sus exclusivos de Nintendo y juegos muy pulidos.",
  },
  {
    title: "Wii",
    href: "/docs/primitives/tooltip",
    description:
      "Innovó con controles por movimiento y atrajo a todo tipo de jugadores.",
  },
  {
    title: "Xbox",
    href: "/docs/primitives/tooltip",
    description:
      "Primera consola de Microsoft, destacó por su potencia y el inicio de Halo.",
  },
  {
    title: "Xbox 360",
    href: "/docs/primitives/tooltip",
    description:
      "Popularizó el juego online en consola con Xbox Live y grandes sagas.",
  },
  {
    title: "PSP",
    href: "/docs/primitives/tooltip",
    description:
      "Consola portátil potente para su época, ideal para juegos grandes en formato móvil.",
  },
]

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

