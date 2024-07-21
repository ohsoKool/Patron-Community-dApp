import { Navigate, Outlet } from "react-router-dom";

const RootLayout = () => {
  const isConnected = false;
  return (
    <>
      <h1>This is root layout</h1>
      {isConnected ? <Outlet /> : <Navigate to="/auth" />}
    </>
  );
};

export default RootLayout;
