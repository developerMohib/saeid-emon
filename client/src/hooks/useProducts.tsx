// import { useQuery } from "@tanstack/react-query";
// import instance from "./instance";
// import { ICard } from "@/types/workCardTypes";

// // Hook to fetch all products

// const useProducts = () => {
//     const { isPending, isError, error, data, refetch } = useQuery<ICard[]>({
//         queryKey: ["product"],
//         queryFn: async () => {
//             const res = await instance.get("/products/all");
//             return res?.data?.data || null;
//         },
//     });

//     return { isPending, isError, error, data, refetch };
// };

// export default useProducts;


// hooks/useProducts.ts
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
    refetch,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }): Promise<ProductsResponse> => {
      const res = await instance.get(`/products/all?page=${pageParam}&limit=6`);
      return {
        products: res?.data?.data || [],
        pagination: res?.data?.pagination || { hasMore: false, currentPage: pageParam }
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore 
        ? lastPage.pagination.currentPage + 1 
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  // Flatten all products from all pages
  const allProducts = data?.pages.flatMap(page => page.products) || [];

  return {
    data: allProducts,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    refetch,
    totalFetched: allProducts.length,
  };
};

export default useProducts;