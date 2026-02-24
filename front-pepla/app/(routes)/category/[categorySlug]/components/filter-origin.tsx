"use client"

import { useState } from "react"
import { useGetProductField } from "@/api/getProductField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FilterTypes } from "@/types/filters";
import { ProductType } from "@/types/product";
import { RotateCcw } from "lucide-react";

type FilterOriginProps = {
    setFilterOrigin: (origin: string) => void
}

const FilterOrigin = (props: FilterOriginProps) => {
    const { setFilterOrigin } = props
    const { result, loading }: FilterTypes = useGetProductField()
    const [selectedOrigin, setSelectedOrigin] = useState<string>("")

    const uniqueOrigins = result && Array.isArray(result) 
        ? Array.from(new Set(result.map((product: ProductType) => product.origin).filter(Boolean)))
        : []

    const handleOriginChange = (value: string) => {
        setSelectedOrigin(value)
        setFilterOrigin(value)
    }

    const clearFilter = () => {
        setSelectedOrigin("")
        setFilterOrigin("")
    }

    return (
        <div className="border rounded-lg p-6 bg-white dark:bg-gray-900 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Filtrar por región</h3>
                {selectedOrigin && (
                    <button 
                        onClick={clearFilter}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                        title="Restablecer filtro"
                    >
                        <RotateCcw size={14} />
                        Limpiar
                    </button>
                )}
            </div>
            
            {loading && (
                <p className="text-sm text-gray-500">Cargando regiones...</p>
            )}

            {!loading && uniqueOrigins.length > 0 && (
                <RadioGroup onValueChange={handleOriginChange} value={selectedOrigin}>
                    <div className="flex items-center space-x-3 py-3 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                        <RadioGroupItem value="" id="all-origins" />
                        <Label htmlFor="all-origins" className="cursor-pointer font-medium text-gray-700 dark:text-gray-300 flex-1">
                            Todas las regiones
                        </Label>
                    </div>

                    <div className="border-t my-2" />

                    {uniqueOrigins.map((origin: string) => (
                        <div 
                            key={origin} 
                            className="flex items-center space-x-3 py-3 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                            <RadioGroupItem value={origin} id={origin} />
                            <Label 
                                htmlFor={origin} 
                                className="cursor-pointer flex-1 text-gray-700 dark:text-gray-300"
                            >
                                {origin}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            )}
        </div>
    )
}

export default FilterOrigin;
