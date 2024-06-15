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
    <form
      onSubmit={handleSubmit}
      className="bg-blue-300 p-6 rounded-lg shadow-md w-full max-w-sm mx-auto mt-6"
    >
      <h2 className="text-2xl mb-4 text-center">Add new todo</h2>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Add todo
      </button>
    </form>
  );
}

export default TodoForm;
