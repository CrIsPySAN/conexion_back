import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

interface UseApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    execute: (...args: any[]) => Promise<void>;
}

export function useApi<T>(
    apiFunction: (...args: any[]) => Promise<T>
): UseApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (...args: any[]) => {
        try {
            setLoading(true);
            setError(null);
            const result = await apiFunction(...args);
            setData(result);
        } catch (err) {
            const axiosError = err as AxiosError<{ error: string }>;
            setError(
                axiosError.response?.data?.error ||
                'Ha ocurrido un error. Por favor, intenta de nuevo.'
            );
        } finally {
            setLoading(false);
        }
    }, [apiFunction]);

    return { data, loading, error, execute };
}