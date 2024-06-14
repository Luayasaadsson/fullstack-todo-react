import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "./components/user/RegisterForm";
import LoginForm from "./components/user/LoginForm";
import UserProfile from "./components/user/UserProfile";
import UpdateUserForm from "./components/user/UpdateUserForm";
import DeleteUser from "./components/user/DeleteUser";
import TodoList from "./components/todos/TodoList";
import TodoForm from "./components/todos/TodoForm";
import { AppDispatch } from "./store/store";
import { loadTodos } from "./store/slices/todosSlice";
import { selectToken } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(loadTodos(token));
    }
  }, [token, dispatch]);

  return (
    <>
      {!token ? (
        <>
          <RegisterForm />
          <LoginForm />
        </>
      ) : (
        <>
          <UserProfile />
          <UpdateUserForm />
          <DeleteUser />
          <TodoList />
          <TodoForm />
        </>
      )}
    </>
  );
}

export default App;
