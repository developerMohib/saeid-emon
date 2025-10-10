"use client"
// hooks/useProduct.ts
import { useQuery } from "@tanstack/react-query";
import instance from "./instance";

// Hook to fetch a single product by ID

const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["singleproduct", id],
    queryFn: async () => {
      const res = await instance.get(`/api/cards/single/${id}`);
      return res.data || null;
    },
    enabled: !!id,
  });
};

export default useProduct;
