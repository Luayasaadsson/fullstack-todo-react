import RegisterForm from "./components/user/RegisterForm";
import LoginForm from "./components/user/LoginForm";
import UserProfile from "./components/user/UserProfile";
import UpdateUserForm from "./components/user/UpdateUserForm";
import DeleteUser from "./components/user/DeleteUser";

function App() {
  return (
    <>
      <RegisterForm />
      <LoginForm />
      <UserProfile />
      <UpdateUserForm />
      <DeleteUser />
    </>
  );
}

export default App;
