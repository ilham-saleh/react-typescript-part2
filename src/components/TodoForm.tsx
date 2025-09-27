import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import type { Todo } from "../hooks/useTodos";
import useAddtodo from "../hooks/useAddTodo";


const TodoForm = () => {
  const addTodo = useAddtodo(() => {
    if (ref.current) ref.current.value = "";
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

  const ref = useRef<HTMLInputElement>(null);

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
