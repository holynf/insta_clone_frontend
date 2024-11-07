import { useEffect, useState } from "react";

interface FetchParams {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    params?: Record<string, any>;
}

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    isError: boolean;
}

function useFetch<T>({
    url,
    method = "GET",
    headers = {},
    params,
}: FetchParams): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchConfig = JSON.stringify({ url, method, headers, params });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const queryString = params ? "?" + new URLSearchParams(params).toString() : "";
                const response = await fetch(url + queryString, { method, headers });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const { results } = await response.json();
                setData(results);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchConfig]);

    return { data, loading, error, isError: !!error };
}

export default useFetch;
