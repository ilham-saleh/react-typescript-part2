import { useState } from "react";
import usePosts from "../hooks/usePosts";

const PostsList = () => {
  const [userId, setUserId] = useState<number>();
  const { data: posts, error, isLoading } = usePosts(userId);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <select
        onChange={(e) => setUserId(Number(e.target.value))}
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
    </>
  );
};

export default PostsList;
