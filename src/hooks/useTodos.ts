import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/apiClient";
import { CACHE_KEY_TODOS } from "../constants";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const apiClient = new ApiClient<Todo>("todos");

const useTodos = () => {
  // we can also customise the useQuery here if needed per query (globally in the main.tsx)
  const query = useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: apiClient.getAll,
    staleTime: 10 * 1000, // 10 seconds - customize stale time per query
  });

  return query;
};

export default useTodos;
