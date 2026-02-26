import { ICard } from "@/types/workCardTypes";

import { useQuery } from "@tanstack/react-query";
import instance from "./instance";


const useTopDesign = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["topdesign"],
        queryFn: async (): Promise<ICard[]> => {
            const res = await instance.get(`/api/top/design`);
            return res.data.data || [];
        }
    });
    return { data, isPending, error }
};

export default useTopDesign;
