import { useQuery } from "@tanstack/react-query";
import todoService from "../services/todoService";
import { CACHE_KEY_TODOS } from "../constants";
import type { Todo } from "../services/todoService";

const useTodos = () => {
  // we can also customise the useQuery here if needed per query (globally in the main.tsx)
  const query = useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
    staleTime: 10 * 1000, // 10 seconds - customize stale time per query
  });

  return query;
};

export default useTodos;
