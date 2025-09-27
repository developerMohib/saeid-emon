"use client"
// hooks/useProduct.ts
import { useQuery } from "@tanstack/react-query";
import instance from "./instance";
import { ICard } from "@/types/workCardTypes";

const useProduct = (id: string | undefined) => {
  return useQuery<ICard>({
    queryKey: ["singleproduct", id],
    queryFn: async () => {
      const res = await instance.get(`/api/cards/single/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export default useProduct;
