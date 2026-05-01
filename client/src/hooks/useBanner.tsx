"use client"
import instance from './instance';
import { useQuery } from '@tanstack/react-query';

const useBanner = () => {
    const { isPending, isError, error, data, refetch } = useQuery({
        queryKey: ["banner"],
        queryFn: async () => {
            const res = await instance.get(`/api/banner/banner`);
            return res?.data?.data || [];
        },
    });
    return { isPending, isError, error, data, refetch };
};

export default useBanner;