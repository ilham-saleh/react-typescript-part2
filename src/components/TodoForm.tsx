import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import type { Todo } from "../hooks/useTodos";

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const queryClient = useQueryClient();

  const ref = useRef<HTMLInputElement>(null);

  const postTodo = async (todo: Todo) => {
    const res = await axios.post<Todo>(
      "https://jsonplaceholder.typicode.com/todos",
      todo
    );
    return res.data; // ✅ return Todo, not AxiosResponse
  };

  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) => postTodo(todo),

    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
        return [newTodo, ...(oldTodos ?? [])];
      });

      if (ref.current) ref.current.value = "";

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) =>
        oldTodos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },

    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (ref.current && ref.current?.value) {
      addTodo.mutate({
        id: 0,
        title: ref.current?.value,
        completed: false,
      });
    }
  };

  return (
    <>
      {addTodo.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-2">
          {addTodo.error?.message}
        </div>
      )}
      <form className="w-full max-w-sm m-2" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            ref={ref}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            aria-label="New Todo"
          />
          <button
            //   onClick={() => console.log(ref.current?.value)}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            {addTodo.isPending ? "Adding" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
