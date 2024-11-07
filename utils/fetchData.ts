import { apiUrl } from "@/utils/envPath";

type FetchOptions = {
    method?: string;
    headers?: HeadersInit;
    body?: any;
};

async function fetchData<T>(url: string, options?: FetchOptions): Promise<T> {
    try {
        const response = await fetch(apiUrl + url, {
            method: options?.method || "GET",
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            body: options?.body ? JSON.stringify(options.body) : undefined,
        });

        if (!response.ok) {
            const errorBody = await response.json();
            const errorMessage = errorBody.message || `HTTP error! Status: ${response.status}`;
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in fetch request:", error);
        throw error;
    }
}

export default fetchData;
