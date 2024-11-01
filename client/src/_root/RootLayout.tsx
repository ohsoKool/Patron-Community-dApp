import NavBar from '@/components/shared/NavBar';
import SidebarComp from '@/components/root/SideBarComp';
import { getItemWithExpiry } from '@/lib/localStorage';
import { Navigate, Outlet } from 'react-router-dom';

const RootLayout = () => {
  const localStorageAddress = getItemWithExpiry('walletAddress');
  return (
    <>
      {localStorageAddress ? (
        <>
          <div className="w-full min-h-screen">
            <NavBar showAddress />
            <div className="w-full h-full flex justify-start items-start">
              <SidebarComp />
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RootLayout;
