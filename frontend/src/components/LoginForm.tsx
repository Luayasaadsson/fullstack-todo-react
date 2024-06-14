import { useState } from "react";
import { loginUser } from "../api/usersApi";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const { userId, token, message } = await loginUser(email, password);
      console.log("Response from login function:", userId, token, message);

      if (userId && token) {
        dispatch(setUser({ userId, token }));
        console.log("Login successful, token:", token);
      } else {
        console.error("Login response missing userId or token");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LoginForm;
