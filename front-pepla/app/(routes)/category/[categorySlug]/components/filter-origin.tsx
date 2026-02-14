"use client"

import { useGetProductField } from "@/api/getProductField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FilterTypes } from "@/types/filters";
import { ProductType } from "@/types/product";

type FilterOriginProps = {
    setFilterOrigin: (origin: string) => void
}

const FilterOrigin = (props: FilterOriginProps) => {
    const { setFilterOrigin } = props
    const { result, loading }: FilterTypes = useGetProductField()

    const uniqueOrigins = result && Array.isArray(result) 
        ? Array.from(new Set(result.map((product: ProductType) => product.origin).filter(Boolean)))
        : []

    console.log("🔍 Orígenes únicos encontrados:", uniqueOrigins)

    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Origen</p>
            
            {loading && (
                <p className="text-sm text-gray-500">Cargando origen ...</p>
            )}

            {!loading && uniqueOrigins.length === 0 && (
                <p className="text-sm text-gray-500">No hay orígenes disponibles</p>
            )}

            {!loading && uniqueOrigins.length > 0 && (
                <RadioGroup onValueChange={setFilterOrigin} defaultValue="">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="all-origins" />
                        <Label htmlFor="all-origins" className="cursor-pointer font-medium">
                            Todos
                        </Label>
                    </div>

                    {/* Resto de orígenes */}
                    {uniqueOrigins.map((origin: string) => (
                        <div key={origin} className="flex items-center space-x-2">
                            <RadioGroupItem value={origin} id={origin} />
                            <Label htmlFor={origin} className="cursor-pointer">
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