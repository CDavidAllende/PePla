import { useEffect, useState } from "react";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";

export function useGetCategorias(): ResponseType<CategoryType[]> {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`;

    const [result, setResult] = useState<CategoryType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

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
