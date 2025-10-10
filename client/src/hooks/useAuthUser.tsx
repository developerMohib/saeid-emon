"use client";
import instance from "@/hooks/instance";
import { useQuery } from "@tanstack/react-query";

export const useAuthUser = () => {

  const { isPending, isError, error, data, refetch } = useQuery({
    queryKey: ["admindata"],
    queryFn: async () => {
      const res = await instance.get("/auth/me");      
      return res?.data?.data || null;
    },
  });

  return { isPending, isError, error, data, refetch };
};
