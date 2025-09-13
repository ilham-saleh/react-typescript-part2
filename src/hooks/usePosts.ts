import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  userId?: number;
  page: number;
  pageSize: number;
}

const usePosts = (query: PostQuery) => {
  const fetchPosts = async () => {
    const res = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        params: {
          userId: query.userId, // ✅ correct param name
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      }
    );
    return res.data;
  };

  return useQuery<Post[], Error>({
    queryKey: ["posts", query.userId, query.page, query.pageSize],
    queryFn: fetchPosts,
    staleTime: 10 * 1000,
    placeholderData: (previousData) => previousData,
  });
};

export default usePosts;
