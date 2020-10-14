import React from "react";
import { useInfiniteQuery } from "react-query";
import { AddTodo } from "./AddTodo";
import { fetchTodos } from "./api";
import { TodoItem } from "./TodoItem";

function App() {
  const {
    data,
    isLoading,
    isFetchingMore,
    isError,
    error,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery("todos", fetchTodos, {
    getFetchMore: (lastGroup) => lastGroup.offset
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error}</p>;
  }

  return (
    <>
      <AddTodo />
      <ul>
        {data.map((group, i) => (
          <React.Fragment key={i}>
            {group.records.map(({ fields, id }) => (
              <TodoItem key={id} id={id} {...fields}/>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <div>
        <button onClick={() => fetchMore()} disabled={!canFetchMore || isFetchingMore}>
          {isFetchingMore
            ? "Loading more..."
            : canFetchMore
            ? "Load more"
            : "Nothing to load"}
        </button>
      </div>
    </>
  );
}

export default App;
