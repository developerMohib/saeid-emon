/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import instance from "./instance";

// Types
interface AuthResponse {
  authenticated: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

interface UseCheckAuthReturn {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  checkAuth: (retryCount?: number) => Promise<void>;
}

interface AxiosError extends Error {
  code?: string;
  response?: {
    status: number;
    statusText: string;
    data?: unknown;
  };
  config?: {
    url?: string;
    method?: string;
  };
}

export default function useCheckAuth(): UseCheckAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currentPath = usePathname();
  const router = useRouter();

  const checkAuth = async (retryCount: number = 0): Promise<void> => {
    try {
      setError(null);
      
      // Mobile-friendly timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const res = await instance.get<AuthResponse>('/auth/check', {
        signal: controller.signal,
        timeout: 8000,
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      clearTimeout(timeoutId);

      if (res?.data?.authenticated) {
        setIsAuthenticated(true);
        setError(null);
      } else {
        setIsAuthenticated(false);
        handleRedirect();
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      
      console.error("Auth check failed:", {
        name: error.name,
        message: error.message,
        code: error.code
      });

      setIsAuthenticated(false);

      // Handle different error types
      if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
        // Network issue - retry after delay
        if (retryCount < 2) {
          setTimeout(() => checkAuth(retryCount + 1), 1000 * (retryCount + 1));
          return;
        }
        // After max retries, show error but don't redirect
        setError('Network issue. Please check your connection.');
      } else if (error.response?.status === 401) {
        // Unauthorized - redirect only from protected routes
        setError('Please login to continue.');
        handleRedirect();
      } else {
        // Other errors - don't redirect immediately
        setError('Authentication check failed. Please try again.');
      }
    } finally {
      if (retryCount === 0) { // Only set loading false on first attempt
        setLoading(false);
      }
    }
  };

  const handleRedirect = (): void => {
    const protectedRoutes: string[] = ['/dashboard', '/create-project'];

    const isProtectedRoute = protectedRoutes.some(route => 
      currentPath.startsWith(route)
    );
    
 

    // Only redirect if on protected route AND not already on public route
    if (isProtectedRoute) {
      router.replace("/auth/login");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [currentPath]);

  return { isAuthenticated, loading, error, checkAuth };
}