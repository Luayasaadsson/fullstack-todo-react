import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../api/usersApi";
import { RootState } from "../../store/store";

interface User {
  email: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const token = useSelector((state: RootState) => state.user.token);
  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    if (token && userId) {
      getUser(userId, token)
        .then(setUser)
        .catch((error) => {
          console.error("Failed to fetch user", error);
          setError("Failed to fetch user data");
        });
    }
  }, [userId, token]);

  if (!user) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
