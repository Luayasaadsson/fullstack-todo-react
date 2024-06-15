import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setUser } from "../../store/slices/userSlice";
import { loginUser } from "../../api/usersApi";
import { Link } from "react-router-dom";

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
    <main className="h-screen flex items-center justify-center bg-blue-500">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        <div className="text-center mt-4">
          <p>Don't have an account?</p>
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </main>
  );
};

export default LoginForm;
