import { useQuery } from "@tanstack/react-query";
import instance from "./instance";
import { ICard } from "@/types/workCardTypes";

interface MyProjectsResponse {
  success: boolean;
  message: string;
  data: ICard[];
  count: number;
  timestamp: string;
}

const useManageDashboard = () => {
  const {
    data,
    error,
    isPending,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["my-projects"],
    queryFn: async (): Promise<MyProjectsResponse> => {
      const res = await instance.get("/api/manages/dashboard");
      
      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to fetch projects");
      }
      
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (cache time)
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data || [],
    error: error as Error,
    isPending,
    isError,
    isSuccess,
    refetch,
    totalCount: data?.count || 0,
    lastUpdated: data?.timestamp,
  };
};

export default useManageDashboard;