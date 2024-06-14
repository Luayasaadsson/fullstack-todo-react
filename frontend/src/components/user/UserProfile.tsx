import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../api/usersApi";
import { RootState, AppDispatch } from "../../store/store";
import { logoutUser } from "../../store/slices/userSlice";

interface User {
  email: string;
}

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.userId);
  const email = useSelector((state: RootState) => state.user.email);

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
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <p>Email: {user.email}</p>
      ) : email ? (
        <p>Email: {email}</p>
      ) : (
        <div>Loading...</div>
      )}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default UserProfile;
