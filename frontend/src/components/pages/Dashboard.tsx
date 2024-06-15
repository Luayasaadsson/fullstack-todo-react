import React from "react";
import UserProfile from "./../user/UserProfile";
import UpdateUserForm from "./..//user/UpdateUserForm";
import DeleteUser from "./../user/DeleteUser";
import TodoList from "./../todos/TodoList";
import TodoForm from "./../todos/TodoForm";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <UserProfile />
      <UpdateUserForm />
      <DeleteUser />
      <TodoList />
      <TodoForm />
    </div>
  );
};

export default Dashboard;
