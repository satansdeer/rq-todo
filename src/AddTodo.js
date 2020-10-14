import React, { useRef } from 'react'
import { useQueryCache, useMutation } from 'react-query'
import { createTodo } from './api'

export const AddTodo = () => {
  const inputRef = useRef()
  const queryCache = useQueryCache()

  const [mutateAdd] = useMutation(createTodo, {
    onSuccess: () => queryCache.invalidateQueries("todos")
  })

  const addTodo = () => {
    mutateAdd({text: inputRef.current.value})
    inputRef.current.value = ""
  }

  return <>
    <input ref={inputRef}/>
    <button onClick={addTodo}>Add ToDo</button>
    <hr/>
  </>
}