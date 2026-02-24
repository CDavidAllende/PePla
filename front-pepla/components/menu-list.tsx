"use client"

import * as React from "react"
import Link from "next/link"

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
    <NavigationMenu viewport={isMobile} className="relative z-50">
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sobre nosotros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      PePla
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Tu Tienda de Videojuegos favorita
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/orders" title="Tienda">
        Accede a toda tu información de compra, pedidos y mucho más.
      </ListItem>
      <ListItem href="/offers" title="Ofertas">
        Promos y descuentos de la semana.
      </ListItem>
      <ListItem href="/category/accesorios" title="Accesorios">
        Productos complementarios como controles, cables, cargadores, etc.
      </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Consolas</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {consoles.map((component) => (
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
          <NavigationMenuTrigger>Géneros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {genres.map((genre) => (
                <ListItem
                  key={genre.title}
                  title={genre.title}
                  href={genre.href}
                >
                  {genre.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/category/accesorios">Accesorios</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuList

const consoles: { title: string; href: string; description: string }[] = [
  {
    title: "PlayStation 1",
    href: "/category/play-station-1",
    description: "La que popularizó el 3D en consolas y lanzó sagas legendarias como Final Fantasy y Metal Gear.",
  },
  {
    title: "PlayStation 2",
    href: "/category/play-station-2",
    description: "La consola más vendida de la historia, enorme catálogo y compatibilidad con DVDs.",
  },
  {
    title: "PlayStation 3",
    href: "/category/play-station-3",
    description: "Introdujo el juego online de PlayStation, Blu-ray y títulos más cinematográficos.",
  },
  {
    title: "PlayStation 4",
    href: "/category/play-station-4",
    description: "Consola enfocada en potencia y exclusivos, ideal para gaming moderno en HD.",
  },
  {
    title: "Nintendo 64",
    href: "/category/nintendo-64",
    description: "Revolucionó los juegos en 3D con clásicos como Mario 64 y Zelda Ocarina of Time.",
  },
  {
    title: "Gamecube",
    href: "/category/gamecube",
    description: "Pequeña y potente, famosa por sus exclusivos de Nintendo y juegos muy pulidos.",
  },
  {
    title: "Wii",
    href: "/category/wii",
    description: "Innovó con controles por movimiento y atrajo a todo tipo de jugadores.",
  },
  {
    title: "Xbox",
    href: "/category/xbox",
    description: "Primera consola de Microsoft, destacó por su potencia y el inicio de Halo.",
  },
  {
    title: "Xbox 360",
    href: "/category/xbox-360",
    description: "Popularizó el juego online en consola con Xbox Live y grandes sagas.",
  },
  {
    title: "PSP",
    href: "/category/play-station-portable-psp",
    description: "Consola portátil potente para su época, ideal para juegos grandes en formato móvil.",
  },
]

const genres: { title: string; href: string; description: string }[] = [
  {
    title: "Acción",
    href: "/genre/accion",
    description: "Juegos llenos de adrenalina, combate y desafíos en tiempo real.",
  },
  {
    title: "Carreras",
    href: "/genre/carreras",
    description: "Velocidad pura con autos, motos y competencias emocionantes.",
  },
  {
    title: "Peleas",
    href: "/genre/peleas",
    description: "Combates uno contra uno con personajes únicos y combos espectaculares.",
  },
  {
    title: "Fantasía",
    href: "/genre/fantasia",
    description: "Mundos mágicos con criaturas épicas y aventuras inolvidables.",
  },
  {
    title: "Mundo Abierto",
    href: "/genre/mundo-abierto",
    description: "Explora vastos mundos sin límites y crea tu propia aventura.",
  },
  {
    title: "Shooter",
    href: "/genre/shooter",
    description: "Acción con armas de fuego, desde FPS hasta third-person shooters.",
  },
  {
    title: "Plataformas",
    href: "/genre/plataformas",
    description: "Salta, corre y resuelve acertijos en niveles llenos de creatividad.",
  },
  {
    title: "Terror",
    href: "/genre/terror",
    description: "Experiencias aterradoras que pondrán a prueba tus nervios.",
  },
  {
    title: "RPG",
    href: "/genre/rpg",
    description: "Roles profundos, historias épicas y sistemas de progresión complejos.",
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