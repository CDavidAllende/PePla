"use client"
import { useRouter } from "next/navigation"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import { CardContent, Card } from "./ui/card"

export const dataCarouselTop = [
    {
        id: 1,
        title: "Envio en las proximas 24 hrs",
        description: "Como cliente nos aseguramos que tus envios lleguen en 24/48 horas. Mas info aqui",
        link: "#!"
    },
    {
        id: 2,
        title: "Los Martes consigue hasta un -15% (solo en articulos marcados)",
        description: "Todos los martes podras encontrar ariculos marcados con un descuento",
        link: "#!"
    },
    {
        id: 3,
        title: "Devoluciones y entregas Gratis",
        description: "Si tu compra es de mas de $400 la entrega es gratis y las devoluciones tambien...",
        link: "#!"
    },
    {
        id: 4,
        title: "Juegos Nuevos, Descuentos Grandes",
        description: "Los juegos mas nuevos puedes encotrarlos en descuento hasta de un 50%, pero apresurate que son pocas unidades",
        link: "#!"
    },
    {
        id: 5,
        title: "13 de Diciembre?",
        description: "Si de casualidad entras el 13 de Diciembre todo estara con un descuento de 75%, por que?",
        link: "#!"
    },
]


const CarouselTextBanner = () => {
  const router = useRouter()

  return (
    <div className="bg-gray-100 py-4 border-b">
      <Carousel className="w-full">
        <CarouselContent>
          {dataCarouselTop.map(({ id, title, link }) => (
            <CarouselItem key={id} className="basis-full">
              <div 
                className="flex justify-center items-center min-h-[50px] cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => router.push(link)}
              >
                <p className="text-sm font-medium text-center px-4">
                  {title}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default CarouselTextBanner