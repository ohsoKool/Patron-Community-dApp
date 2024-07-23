import useWalletStore from '@/lib/zustand/WalletStore';
import { Navigate, Outlet } from 'react-router-dom';

const RootLayout = () => {
  const { isConnected } = useWalletStore();
  return <>{isConnected ? <Outlet /> : <Navigate to="/auth" />}</>;
};

export default RootLayout;
