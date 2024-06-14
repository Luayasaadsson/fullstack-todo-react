import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleteUser } from "../../api/usersApi";
import { RootState } from "../../store/store";

const DeleteUser: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const token = useSelector((state: RootState) => state.user.token);

  const handleDelete = async () => {
    if (token) {
      try {
        await deleteUser(token);
        setMessage("User deleted successfully");
      } catch (error) {
        setMessage("Failed to delete user");
        console.error("Delete Error:", error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete My Account</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteUser;
