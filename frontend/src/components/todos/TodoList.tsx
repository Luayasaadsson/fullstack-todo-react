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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.content}</p>
          <p>{todo.completed ? "Completed" : "Not Completed"}</p>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
          <button onClick={() => startEditing(todo)}>Edit</button>
          <button onClick={() => toggleCompleted(todo)}>
            {todo.completed ? "Incomplete" : "Complete"}
          </button>
        </div>
      ))}
      {editingTodo && (
        <div>
          <h3>Edit Todo</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          />
          <button onClick={saveTodo}>Save</button>
          <button onClick={cancelEditing}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default TodoList;
