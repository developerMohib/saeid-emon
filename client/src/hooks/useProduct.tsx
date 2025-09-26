"use client"
// hooks/useProduct.ts
import { useQuery } from "@tanstack/react-query";
import instance from "./instance";
import { ICard } from "@/types/workCardTypes";

const useProduct = (id: string | undefined) => {
  console.log('id from hook', id)
  return useQuery({
    queryKey: ["singleproduct", id],
    queryFn: async () => {
      console.log('res from use product')
      const res = await instance.get(`/api/cards/single/${id}`);
      console.log('res from use product', res)
      return res.data;
    },
    enabled: !!id,
  });
};

export default useProduct;
