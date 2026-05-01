
import { useInfiniteQuery } from "@tanstack/react-query";
import instance from "./instance";
import { ICard } from "@/types/workCardTypes";

interface ProductsResponse {
  products: ICard[];
  pagination: {
    hasMore: boolean;
    currentPage: number;
  };
}

const useProducts = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    refetch
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1,  }): Promise<ProductsResponse> => {
      const res = await instance.get(`/products/all?page=${pageParam}&limit=9`);
      
      if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to fetch products");
      }
      
      return {
        products: res.data.data || [],
        pagination: res.data.pagination || { 
          hasMore: false, 
          currentPage: pageParam 
        }
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore 
        ? lastPage.pagination.currentPage + 1 
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    // Prevent unnecessary refetches on window focus
    refetchOnWindowFocus: false,
  });

  // Flatten all products from all pages
  const allProducts = data?.pages.flatMap(page => page.products) || [];

  return {
    data: allProducts,
    error: error as Error,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,refetch,
    totalFetched: allProducts.length,
  };
};

export default useProducts;