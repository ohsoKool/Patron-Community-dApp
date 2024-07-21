import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <h1>This is public layout</h1>
      <Outlet />
    </>
  );
};

export default PublicLayout;
