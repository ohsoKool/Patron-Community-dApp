import useWalletStore from '@/lib/zustand/WalletStore';
const HomePage = () => {
  const { isConnected, walletAddress } = useWalletStore();
  return (
    <>
      <h1>This is Home</h1>

      <h1 className="text-white">{isConnected ? 'hey' : 'hello'}</h1>
      <h1 className="text-white">{walletAddress}</h1>
    </>
  );
};

export default HomePage;
