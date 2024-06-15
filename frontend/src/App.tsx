import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./PrivateRoutes/PrivateRoutes";
import { AppDispatch } from "./store/store";
import { loadTodos } from "./store/slices/todosSlice";
import { selectToken } from "./store/slices/userSlice";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      dispatch(loadTodos(token));
    }
  }, [token, dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/dashboard" /> : <RegisterPage />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
