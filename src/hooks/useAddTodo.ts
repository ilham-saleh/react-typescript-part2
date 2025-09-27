import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "./useTodos";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../constants";

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddtodo = (AddTodo: () => void) => {
  const queryClient = useQueryClient();

  const postTodo = async (todo: Todo) => {
    const res = await axios.post<Todo>(
      "https://jsonplaceholder.typicode.com/todos",
      todo
    );
    return res.data; // ✅ return Todo, not AxiosResponse
  };

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) => postTodo(todo),

    onMutate: (newTodo: Todo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (oldTodos) => {
        return [newTodo, ...(oldTodos ?? [])];
      });

      AddTodo();

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (oldTodos) =>
        oldTodos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};

export default useAddtodo;
