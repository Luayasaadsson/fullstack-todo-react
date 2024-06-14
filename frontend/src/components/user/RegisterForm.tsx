// src/components/RegisterForm.tsx
import { useState } from "react";
import { registerUser } from "../../api/usersApi";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const data = await registerUser(email, password);
      console.log("Registration successful", data);
    } catch (error) {
      console.error("Registration failed", error);
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
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;
