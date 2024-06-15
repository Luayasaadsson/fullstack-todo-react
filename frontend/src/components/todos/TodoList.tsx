import { useEffect, useState } from "react";
import { AppDispatch } from "./../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTodos,
  removeTodo,
  editTodo,
  toggleTodoCompleted,
  selectTodos,
  selectTodosLoading,
  selectTodosError,
} from "./../../store/slices/todosSlice";
import { selectToken } from "./../../store/slices/userSlice";

interface Todo {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  published: boolean;
}

function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const todos = useSelector(selectTodos);
  const loading = useSelector(selectTodosLoading);
  const error = useSelector(selectTodosError);

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(loadTodos(token));
    }
  }, [token, dispatch]);

  const handleDelete = (id: number) => {
    if (token) {
      dispatch(removeTodo({ id, token }));
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setContent(todo.content);
  };

  const cancelEditing = () => {
    setEditingTodo(null);
    setTitle("");
    setContent("");
  };

  const saveTodo = () => {
    if (editingTodo && token) {
      dispatch(
        editTodo({ id: editingTodo.id, todoData: { title, content }, token })
      );
      cancelEditing();
    }
  };

  const toggleCompleted = (todo: Todo) => {
    if (token) {
      dispatch(
        toggleTodoCompleted({ id: todo.id, completed: !todo.completed, token })
      );
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center p-6 bg-blue-300 rounded-lg">
      <div className="w-full max-w-2xl">
        {todos.length === 0 ? (
          <div className="text-center">No todos found</div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <h3 className="text-lg font-bold">{todo.title}</h3>
              <p className="text-gray-700">{todo.content}</p>
              <p className={todo.completed ? "text-green-500" : "text-red-500"}>
                {todo.completed ? "Completed" : "Not Completed"}
              </p>
              <div className="flex flex-wrap space-x-2 mt-4">
                <button
                  onClick={() => startEditing(todo)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleCompleted(todo)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
              {editingTodo?.id === todo.id && (
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-4">
                  <h3 className="text-2xl mb-4 text-center">Edit Todo</h3>
                  <div className="mb-4">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Content"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={saveTodo}
                      className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
