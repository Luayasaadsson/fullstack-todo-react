import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./../../store/store";
import { addTodo } from "./../../store/slices/todosSlice";
import { selectToken } from "./../../store/slices/userSlice";

function TodoForm() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      const todoData = {
        id: 0,
        title,
        content,
        completed: false,
        published: false,
      };
      dispatch(addTodo({ todoData, token }));
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
