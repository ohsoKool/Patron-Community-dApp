import { getItemWithExpiry } from '@/lib/localStorage';
import { Navigate, Outlet } from 'react-router-dom';

const RootLayout = () => {
  const localStorageAddress = getItemWithExpiry('walletAddress');
  return <>{localStorageAddress ? <Outlet /> : <Navigate to="/" />}</>;
};

export default RootLayout;
