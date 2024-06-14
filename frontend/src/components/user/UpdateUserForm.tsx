import React, { useState } from "react";
import { useSelector } from "react-redux";
import { updateUser } from "../../api/usersApi";
import { RootState } from "../../store/store";

const UpdateUserForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const token = useSelector((state: RootState) => state.user.token);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      try {
        const data = await updateUser(email, password, token);
        setMessage("User updated successfully!");
        console.log("Update data:", data);
      } catch (error) {
        console.error("Update Error:", error);
        setMessage("Failed to update user.");
      }
    } else {
      setMessage("No authentication token found. Please log in again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Your Profile</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="New Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
      />
      <button type="submit">Update</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdateUserForm;
