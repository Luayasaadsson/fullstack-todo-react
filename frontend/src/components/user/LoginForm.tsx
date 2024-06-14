import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setUser } from "../../store/slices/userSlice";
import { loginUser } from "../../api/usersApi";

interface LoginResponse {
  userId: number;
  token: string;
  message: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response: LoginResponse = await loginUser(email, password);
      console.log("Response from login function:", response);

      if (response.userId && response.token) {
        dispatch(
          setUser({ userId: response.userId, email, token: response.token })
        );
        console.log("Login successful, token:", response.token);
      } else {
        setError("Login response missing userId or token");
        console.error("Login response missing userId or token");
      }
    } catch (error) {
      setError("Login failed");
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Log In"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
};

export default LoginForm;
