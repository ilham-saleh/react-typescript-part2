import React, { useState } from "react";
import useInfinitePosts from "../hooks/useInfinitePosts";

const InfinitePosts = () => {
  const [userId, setUserId] = useState<number>();
  const pageSize = 10;

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts({ userId, pageSize });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null; // ✅ handle undefined

  return (
    <>
      <select
        onChange={handleChange}
        value={userId}
        className="m-4 p-2 border rounded"
      >
        <option>Sort by</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>

      <ul className="p-4 list">
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.map((post) => (
              <li className="py-4 first:pt-0 last:pb-0" key={post.id}>
                <h2>{post.userId}</h2>
                <h3 className="text-xl">{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </>
  );
};

export default InfinitePosts;
