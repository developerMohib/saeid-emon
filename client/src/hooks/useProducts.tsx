import { useQuery } from "@tanstack/react-query";
import instance from "./instance";
import { ICard } from "@/types/workCardTypes";

// Hook to fetch all products

const useProducts = () => {
    const { isPending, isError, error, data, refetch } = useQuery<ICard[]>({
        queryKey: ["product"],
        queryFn: async () => {
            const res = await instance.get("/products/all");
            return res?.data?.data || null;
        },
    });

    return { isPending, isError, error, data, refetch };
};

export default useProducts;
