import { Badge } from '@/components/ui/badge';
import useWalletStore from '@/lib/zustand/WalletStore';
import { Link } from 'react-router-dom';

interface NavBarType {
  showAddress?: boolean;
}

const NavBar = ({ showAddress = false }: NavBarType) => {
  const { walletAddress } = useWalletStore();
  return (
    <nav className="flex items-center justify-between w-full border-b border-b-PATRON_BORDER_COLOR px-10 py-3 pt-4">
      <div className="flex justify-center items-center gap-2">
        <Link to={'/'} className="flex justify-start items-center gap-2">
          <img className="h-5" src="/logo.svg" alt="logo" />
          <h1 className="text-xl font-audio-wide text-white">Patron</h1>
        </Link>

        {showAddress && walletAddress && (
          <Badge
            variant={'secondary'}
            className="h-6 ml-1 border-PATRON_BORDER_COLOR cursor-pointer bg-PATRON_LIGHT_GRAY text-PATRON_TEXT_WHITE_SECONDARY hover:text-PATRON_TEXT_WHITE_PRIMARY"
          >
            {walletAddress.slice(0, 7) + '...' + walletAddress.slice(8, walletAddress.length - 30)}
          </Badge>
        )}
      </div>
      <div className="flex justify-center items-center gap-3 md:gap-10 font-fira-code text-sm">
        <h1 className="hover:text-PATRON_TEXT_WHITE_PRIMARY cursor-pointer">Github</h1>
        <h1 className="hover:text-PATRON_TEXT_WHITE_PRIMARY cursor-pointer">Privacy</h1>
      </div>
    </nav>
  );
};

export default NavBar;
