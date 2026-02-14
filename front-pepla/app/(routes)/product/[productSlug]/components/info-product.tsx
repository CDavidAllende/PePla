"use client"

import { ProductType } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface InfoProductProps {
    product: ProductType
}

const InfoProduct = (props: InfoProductProps) => {
    const { product } = props

    return (
        <div className="px-6">
            <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-green-600 mb-4">${product.price}</p>
            
            <div className="space-y-2 mb-6">
                <p className="text-sm text-gray-500">
                    <span className="font-semibold">Origen:</span> {product.origin}
                </p>
                <p className="text-sm text-gray-500">
                    <span className="font-semibold">Género:</span> {product.genero}
                </p>
            </div>

            <div className="flex items-center gap-5">
                <Button 
                    className="w-full" 
                    onClick={() => console.log("Comprar", product)}
                >
                    Comprar
                </Button>
                <Heart 
                    size={30}
                    strokeWidth={1} 
                    className="transition duration-300 cursor-pointer hover:fill-black flex-shrink-0" 
                    onClick={() => console.log("Agregar a favoritos", product)} 
                />
            </div>
        </div>
    )
}

export default InfoProduct;