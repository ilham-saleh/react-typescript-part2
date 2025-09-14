import {
  useInfiniteQuery,
  type InfiniteData,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  userId?: number;
  pageSize: number;
}

const useInfinitePosts = (query: PostQuery) => {
  const fetchPosts = async ({ pageParam = 1 }: QueryFunctionContext) => {
    const res = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: {
          userId: query.userId,
          _start: (Number(pageParam) - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      }
    );
    return res.data;
  };

  return useInfiniteQuery<
    Post[],
    Error,
    InfiniteData<Post[]>,
    (string | number | undefined)[],
    number
  >({
    queryKey: ["posts", query.userId, query.pageSize],
    queryFn: fetchPosts,
    initialPageParam: 1,
    staleTime: 10 * 1000,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
  });
};

export default useInfinitePosts;
