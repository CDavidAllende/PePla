import { useState, useEffect } from "react"

export function useGetProductsByGenre(genreSlug: string) {
    const genre = genreSlug.replace(/-/g, " ")
    
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[genero][$eqi]=${genre}&populate=*`
    
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(url)
                const json = await resp.json()
                setResult(json.data)
                setLoading(false)
            } catch (error: any) {
                setError(error)
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { loading, result, error }
}