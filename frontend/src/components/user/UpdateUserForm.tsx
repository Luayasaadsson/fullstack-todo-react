import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../api/usersApi";
import { RootState, AppDispatch } from "../../store/store";
import { setUser } from "../../store/slices/userSlice";

const UpdateUserForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      try {
        const data = await updateUser(email, password, token);
        setMessage("User updated successfully!");
        dispatch(setUser({ userId: userId!, email, token }));
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
    <form
      onSubmit={handleSubmit}
      className="bg-blue-300 p-6 rounded-lg shadow-md w-full max-w-sm mx-auto mt-6"
    >
      <h1 className="text-2xl mb-4 text-center">Update your profile</h1>
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="New Email"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Update
      </button>
      {message && (
        <p
          className={`mt-4 ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default UpdateUserForm;
