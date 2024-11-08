import fetchData, { FetchOptions } from "@/utils/fetchData";

async function fetchAuthorizedData<T>(
    url: string,
    token: string,
    options?: FetchOptions,
): Promise<T> {
    return await fetchData(url, {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: `Bearer ${token}`,
        },
    });
}

export default fetchAuthorizedData;
