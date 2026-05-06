"use client"
import instance from './instance';
import { useQuery } from '@tanstack/react-query';

const useAuthor = () => {
    const { isPending, isError, error, data, refetch } = useQuery({
        queryKey: ["authorData"],
        queryFn: async () => {
            const res = await instance.get(`/api/author/author`);
            return res?.data?.data || [];
        },
    });
    return { isPending, isError, error, data, refetch };
};

export default useAuthor;