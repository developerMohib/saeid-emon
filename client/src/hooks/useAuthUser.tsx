"use client";
import instance from "@/hooks/instance";
import { useQuery } from "@tanstack/react-query";

export const useAuthUser = () => {

  const { isPending, isError, error, data, refetch } = useQuery({
    queryKey: ["admindata"],
    queryFn: async () => {
      const res = await instance.get("/auth/me");
      if (!res?.data?.data) throw new Error("No user data found");
      return res.data.data;
    },
  });

  return { isPending, isError, error, data, refetch };
};
