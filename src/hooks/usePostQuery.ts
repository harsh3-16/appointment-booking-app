import { useState, useCallback, useRef, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import apiClient from '../lib/apiClient';

interface ApiResponse<T> {
  status: string;
  data: T;
}

interface QueryResult<T> {
  loading: boolean;
  data: T | null;
  error: any | null;
  postQuery: ({ url, data, config }: { url: string; data?: any; config?: AxiosRequestConfig }) => Promise<void>;
}

export const usePostQuery = <T>({ onSuccess, onFail }: { onSuccess?: (data: T) => void; onFail?: (err: any) => void } = {}): QueryResult<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any | null>(null);
  const isMounted = useRef(true);

  // Stabilize callbacks to prevent infinite loops (Maximum Update Depth Fix)
  const onSuccessRef = useRef(onSuccess);
  const onFailRef = useRef(onFail);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onFailRef.current = onFail;
  }, [onSuccess, onFail]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const postQuery = useCallback(
    async (config: AxiosRequestConfig) => {
      if (!isMounted.current) return;
      
      setLoading(true);
      setError(null);
      
      const startTime = Date.now();

      try {
        const response = await apiClient.post<ApiResponse<T>>(config.url!, config.data, config);
        
        // Enforce minimum 800ms loading to prevent skeleton flash (Rule A5)
        const duration = Date.now() - startTime;
        if (duration < 800) {
          await new Promise((resolve) => setTimeout(resolve, 800 - duration));
        }

        if (isMounted.current) {
          setData(response.data.data);
          onSuccessRef.current?.(response.data.data);
        }
      } catch (err: any) {
        if (axios.isCancel(err)) return;

        if (isMounted.current) {
          setError(err);
          onFailRef.current?.(err);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    },
    [] // Identity now stable
  );

  return { loading, data, error, postQuery };
};
