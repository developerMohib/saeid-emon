"use client";
import instance from "@/hooks/instance";
import { useUser } from "@/context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useAuthUser = () => {
  const { setUser } = useUser();

  const { isPending, isError, error, data, refetch } = useQuery({
    queryKey: ["admin-user"],
    queryFn: async () => {
      const res = await instance.get("/auth/me");
      if (!res?.data?.data) throw new Error("No user data found");
      return res.data.data;
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      console.log(data);
    }
  }, [data, setUser]);

  return { isPending, isError, error, data, refetch };
};
