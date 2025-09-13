import useTodos from "../hooks/useTodos";

const TodoList = () => {
  const { data: todos, error, isLoading } = useTodos();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <ul className="list">
        {todos?.map((todo, index) => (
          <li
            key={index}
            className="py-4 first:pt-0 last:pb-0 border border-b-neutral-700 rounded mb-2 p-3 flex justify-between"
          >
            <div>
              {todo.title} - {todo.completed ? "Completed" : "Pending"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
