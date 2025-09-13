import { useState } from "react";
import usePosts from "../hooks/usePosts";

const PostsList = () => {
  const [userId, setUserId] = useState<number>();
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const {
    data: posts,
    error,
    isLoading,
  } = usePosts({ userId, page, pageSize });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    setPage(1);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <select
        onChange={handleChange}
        value={userId}
        className="m-4 p-2 border rounded"
      >
        <option>Sort by</option>
        <option value="1">User 1</option>
        <option value="2">user 2</option>
        <option value="3">User 3</option>
      </select>

      <ul className="p-4 list">
        {posts?.map((post) => (
          <li className="py-4 first:pt-0 last:pb-0" key={post.id}>
            <h2>{post.userId}</h2>
            <h3 className="text-xl">{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default PostsList;
