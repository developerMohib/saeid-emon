import { useQuery } from "@tanstack/react-query";
import instance from "./instance";
import { ICard } from "@/types/workCardTypes";

// Hook to fetch all products

const useProducts = () => {
    const { isPending, isError, error, data, refetch } = useQuery<ICard[]>({
        queryKey: ["product"],
        queryFn: async () => {
            const res = await instance.get("/api/cards/all");
            return res?.data?.data;
        },
    });

    return { isPending, isError, error, data, refetch };
};

export default useProducts;
