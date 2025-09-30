"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// A hook to check for authentication by looking for a specific cookie (default is "token")

export default function useRequireAuth(cookieName: string = "token") {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get(cookieName);
    if (!token) {
      router.push("/");
    } else {
      setChecked(true);
    }
  }, [router, cookieName]);

  return checked;
}
