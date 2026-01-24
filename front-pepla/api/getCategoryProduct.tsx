import { useState,useEffect } from "react";

export function useGetCategoryProduct(slug: string | string []) {
const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*&filters[category][slug][$eq]=${slug}`;
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResult(json.data);
            } catch (err: any) {
                setError(err.message || "Error al cargar categorías");
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);

    return { loading, result, error };
}