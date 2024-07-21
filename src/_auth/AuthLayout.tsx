import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      This is Auth layout
      <Outlet />
    </>
  );
};

export default AuthLayout;
