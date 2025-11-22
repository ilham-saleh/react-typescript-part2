import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import type { Todo } from "../entities/todoEntity";
import ApiClient from "../services/apiClient";

const APIClient = new ApiClient<Todo>("todos/");

const useTodos = () => {
  // we can also customise the useQuery here if needed per query (globally in the main.tsx)
  const query = useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: APIClient.getAll,
    staleTime: 10 * 1000, // 10 seconds - customize stale time per query
  });

  return query;
};

export default useTodos;
