import { useEffect, useState } from "react"

export function useGetProductField() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`
console.log("API:", process.env.NEXT_PUBLIC_BACKEND_URL)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setResult(json.data)
      } catch (err: any) {
        setError(err.message || "Error al cargar productos")
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { loading, result, error }
}
