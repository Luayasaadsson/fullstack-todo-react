import React, { useState } from "react";
import UserProfile from "./../user/UserProfile";
import UpdateUserForm from "./..//user/UpdateUserForm";
import TodoList from "./../todos/TodoList";
import TodoForm from "./../todos/TodoForm";

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <UserProfile />;
      case "update":
        return <UpdateUserForm />;
      case "addTodo":
        return <TodoForm />;
      case "viewTodos":
        return <TodoList />;
      default:
        return <UserProfile />;
    }
  };

  return (
<div className="min-h-screen bg-[linear-gradient(to_bottom,#0F2027,#203A43,#2C5364)] flex flex-col items-center justify-center">
      <div className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white text-center">
        <p>Welcome back</p>
      </div>
      <div className="bg-white p-3 md:p-2 rounded-lg shadow-md w-full max-w-2xl mb-4">
        <div className="flex flex-wrap justify-around mb-4">
          <button
            onClick={() => setActiveSection("profile")}
            className={`py-2 px-4 m-2 rounded-lg transition duration-200 ${
              activeSection === "profile"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveSection("update")}
            className={`py-2 px-4 m-2 rounded-lg transition duration-200 ${
              activeSection === "update"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            Update Profile
          </button>
          <button
            onClick={() => setActiveSection("addTodo")}
            className={`py-2 px-4 m-2 rounded-lg transition duration-200 ${
              activeSection === "addTodo"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            Add Todo
          </button>
          <button
            onClick={() => setActiveSection("viewTodos")}
            className={`py-2 px-4 m-2 rounded-lg transition duration-200 ${
              activeSection === "viewTodos"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            View Todos
          </button>
        </div>
        <div>{renderSection()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
