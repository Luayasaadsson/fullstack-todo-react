import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../api/usersApi";
import { RootState, AppDispatch } from "../../store/store";
import { logoutUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDeleteUser } from "../user/DeleteUser";

interface User {
  email: string;
}

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.userId);
  const email = useSelector((state: RootState) => state.user.email);
  const navigate = useNavigate();
  const { handleDelete } = useDeleteUser();

  useEffect(() => {
    if (token && userId) {
      getUser(userId, token)
        .then((userData: User) => {
          setUser(userData);
          setError(null);
        })
        .catch((error: Error) => {
          console.error("Failed to fetch user", error);
          setError("Failed to fetch user data");
        });
    }
  }, [userId, token]);

  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleDeleteUser = async () => {
    try {
      await handleDelete();
      setMessage("User deleted successfully");
    } catch (error) {
      setMessage("Failed to delete user");
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center p-4 bg-blue-300 shadow-md rounded-lg w-full max-w-sm mx-auto mt-6">
      <h1 className="text-2xl mb-4">User profile</h1>
      {user ? (
        <p className="text-lg">{user.email}</p>
      ) : email ? (
        <p className="text-lg">{email}</p>
      ) : (
        <div className="text-gray-500">Loading...</div>
      )}
      <div className="flex gap-4">
        <button
          onClick={handleLogout}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Log out
        </button>
        <button
          onClick={handleDeleteUser}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Delete account
        </button>
      </div>
      {message && (
        <p
          className={`mt-4 ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default UserProfile;
