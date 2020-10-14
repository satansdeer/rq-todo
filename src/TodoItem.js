import React from "react";
import { useMutation, useQueryCache } from "react-query";
import { deleteTodo, updateTodo } from "./api";

export const TodoItem = ({ id, text, completed }) => {
  const queryCache = useQueryCache()

  const [mutateDelete] = useMutation(deleteTodo, {
    onSuccess: () => queryCache.invalidateQueries("todos")
  }) 

  const [mutateCheck] = useMutation(updateTodo, {
    onSuccess: () => queryCache.invalidateQueries("todos")
  })

  const onCheck = (event) => {
    mutateCheck({id, fields: { completed: event.target.checked }})
  }

  const remove = () => {
    mutateDelete(id)
  }

  return (
    <li>
      <span>{text}</span>
      <input type="checkbox" onChange={onCheck} checked={!!completed}/>
      <button onClick={remove}>Delete</button>
    </li>
  );
};
