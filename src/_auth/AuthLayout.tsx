import useWalletStore from '@/lib/zustand/WalletStore';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const { isConnected } = useWalletStore();
  console.log('IS CONNECTED: ', isConnected);
  return <>{!isConnected ? <Outlet /> : <Navigate to="/explore" />};</>;
};

export default AuthLayout;
