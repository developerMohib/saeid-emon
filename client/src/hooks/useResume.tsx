"use client"
import { useQuery } from "@tanstack/react-query";
import instance from "./instance";

const useResume = () => {
    const { isPending, isError, error, data, refetch } = useQuery({
        queryKey: ["resume"],
        queryFn: async () => {
            const res = await instance.get(`/api/resume`);
            return res?.data?.data || null;
        },
    });
    return { isPending, isError, error, data, refetch };
};

export default useResume;
