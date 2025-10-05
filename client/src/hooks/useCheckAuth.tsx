/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface DecodedToken {
  exp: number;
}

export default function useCheckAuth(cookieName: string = "token") {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkAuth = () => {
    const token = Cookies.get(cookieName);

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // ⛔ Token expired
        Cookies.remove(cookieName);
        setIsAuthenticated(false);
        
        // ✅ Redirect to home page
        router.replace("/"); 
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      Cookies.remove(cookieName);
      setIsAuthenticated(false);
      router.replace("/");
    }
  };

  useEffect(() => {
    checkAuth();

    // প্রতি 5 সেকেন্ড পর চেক করা (token মেয়াদ শেষ হয়েছে কিনা)
    const interval = setInterval(checkAuth, 5 * 1000);

    // login/logout detect করার জন্য custom event
    const handleAuthChange = () => checkAuth();
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, [cookieName]);

  return isAuthenticated;
}

