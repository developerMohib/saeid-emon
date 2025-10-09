/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import instance from "./instance";



export default function useCheckAuth() {
  const [loading, setLoading] = useState(true);
  const currentPath = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await instance.get('/auth/check');
      if (res?.data?.authenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);

       
        const protectedRoutes  = [
        '/dashboard',
        '/dashboard/',
        '/create-project',
        '/create-project/'
      ];
        const isProtectedRoute = protectedRoutes.some(route => 
        currentPath.startsWith(route)
      );

      // ✅ ONLY redirect from protected routes, allow all other pages
      if (isProtectedRoute) {
        router.replace("/");
      }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    // Custom event listener for auth changes
    const handleAuthChange = () => checkAuth();
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  return { isAuthenticated, loading, checkAuth };


}

