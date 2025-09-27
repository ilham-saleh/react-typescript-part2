import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../constants";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const useTodos = () => {
  const fetchTodos = async () => {
    const res = await axios.get<Todo[]>(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return res.data;
  };

  // we can also customise the useQuery here if needed per query (globally in the main.tsx)
  const query = useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: fetchTodos,
    staleTime: 10 * 1000, // 10 seconds - customize stale time per query
  });

  return query;
};

export default useTodos;
