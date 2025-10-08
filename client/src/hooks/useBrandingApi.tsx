"use client"
import { useQuery } from "@tanstack/react-query";
import instance from "./instance";
import { IBranding } from "@/types/brandTypes";

export interface IBrand {
    _id: string;
    name: string;
    img: string;
    link: string;
}


const useGetBrand = () => {
    const { isPending, isError, error, data, refetch } = useQuery<IBranding[]>({
        queryKey: ["brand"],
        queryFn: async () => {
            const res = await instance.get(`/api/brand`);
            console.log('res.data', res.data)
            return res?.data?.brands;
        },
    });
    return { isPending, isError, error, data, refetch };
};

export default useGetBrand;
