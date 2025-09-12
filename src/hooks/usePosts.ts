import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePosts = (userId: number | undefined) => {
  const fetchPosts = async () => {
    const res = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts",
      { params: { userId } }
    );
    return res.data;
  };

  const postQuery = useQuery<Post[], Error>({
    queryKey: ["users", userId, "posts"],
    queryFn: fetchPosts,
    staleTime: 10 * 1000, // 10 seconds - customize stale time per query
  });

  return postQuery;
};

export default usePosts;
