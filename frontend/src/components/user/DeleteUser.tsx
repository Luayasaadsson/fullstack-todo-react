import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../api/usersApi";
import { RootState } from "../../store/store";
import { logoutUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const useDeleteUser = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (token) {
      try {
        await deleteUser(token);
        dispatch(logoutUser());
        navigate("/login");
      } catch (error) {
        console.error("Delete Error:", error);
        throw new Error("Failed to delete user");
      }
    }
  };

  return { handleDelete };
};
