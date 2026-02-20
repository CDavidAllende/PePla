"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ProductCard from "@/app/(routes)/category/[categorySlug]/components/product-card"
import { ProductType } from "@/types/product"
import { SkeletonSchema } from "../skeleton-schema"

const SearchProducts = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)

    // Live search mientras escribe (debounced)
    useEffect(() => {
        if (searchTerm.length < 2) {
            setResults([])
            setHasSearched(false)
            return
        }

        const delaySearch = setTimeout(() => {
            handleSearch()
        }, 500) // Espera 500ms después de que el usuario deja de escribir

        return () => clearTimeout(delaySearch)
    }, [searchTerm])

    const handleSearch = async () => {
        if (searchTerm.trim().length < 2) return

        setLoading(true)
        setHasSearched(true)

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[productName][$containsi]=${searchTerm}&populate=*`
            )
            const data = await response.json()
            setResults(data.data || [])
        } catch (error) {
            console.error("Error searching products:", error)
            setResults([])
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSearch()
    }

    const clearSearch = () => {
        setSearchTerm("")
        setResults([])
        setHasSearched(false)
    }

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
            {/* Título de la sección */}
            <div className="mb-8">
                <h3 className="text-3xl font-black mb-2">Buscar juegos</h3>
                <p className="text-gray-500">Encuentra tu próximo juego favorito</p>
            </div>

            {/* Barra de búsqueda */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                            type="text"
                            placeholder="Buscar por nombre del juego..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-10 h-12 text-lg"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                    <Button type="submit" size="lg" className="px-8">
                        Buscar
                    </Button>
                </div>
            </form>

            {/* Resultados */}
            {loading && (
                <div>
                    <p className="text-sm text-gray-500 mb-4">Buscando...</p>
                    <SkeletonSchema grid={3} />
                </div>
            )}

            {!loading && hasSearched && results.length > 0 && (
                <div>
                    <p className="text-sm text-gray-500 mb-4">
                        Se encontraron {results.length} resultado(s) para "{searchTerm}"
                    </p>
                    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10">
                        {results.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}

            {!loading && hasSearched && results.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-500 mb-2">
                        No se encontraron juegos para "{searchTerm}"
                    </p>
                    <p className="text-sm text-gray-400">
                        Intenta con otro término de búsqueda
                    </p>
                </div>
            )}

            {!hasSearched && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-400">
                        Escribe el nombre de un juego para comenzar
                    </p>
                </div>
            )}
        </div>
    )
}

export default SearchProducts