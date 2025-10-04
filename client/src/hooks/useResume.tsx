"use client"
// hooks/useProduct.ts
import { useQuery } from "@tanstack/react-query";
import instance from "./instance";

// Hook to fetch a single product by ID

const useResume = () => {
    const { isPending, isError, error, data, refetch } = useQuery({
        queryKey: ["resume"],
        queryFn: async () => {
            const res = await instance.get(`/api/resume`);
            return res?.data?.data;
        },
    });
    return { isPending, isError, error, data, refetch };
};

export default useResume;
