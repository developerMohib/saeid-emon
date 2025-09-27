"use client";
import { useEffect, useState } from "react";
import instance from "@/hooks/instance";
import { useUser } from "@/context/UserContext";

export const useAuthUser = () => {
  const { setUser } = useUser();
const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await instance.get("/auth/me", { withCredentials: true });
      if (res.data?.user) setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, [setUser]);
return {loading}
};
