import ProfileBadge from '@/components/shared/ProfileBadge';
import { getItemWithExpiry } from '@/lib/localStorage';
import { Link } from 'react-router-dom';
import AddressBadge from '@/components/shared/AddressBadge';

interface NavBarType {
  showAddress?: boolean;
}

const NavBar = ({ showAddress = false }: NavBarType) => {
  const localStorageAddress = getItemWithExpiry('walletAddress');

  return (
    <nav className="flex items-center justify-between w-full border-b border-b-PATRON_BORDER_COLOR px-10 py-3 pt-4">
      <div className="flex justify-center items-center gap-2">
        <Link to={'/'} className="flex justify-start items-center gap-2">
          <img className="h-5" src="/logo.svg" alt="logo" />
          <h1 className="text-xl font-audio-wide text-white">Patron</h1>
        </Link>

        {localStorageAddress !== null && localStorageAddress?.length > 0 && showAddress && (
          <AddressBadge address={localStorageAddress} />
        )}
      </div>
      {localStorageAddress !== null && localStorageAddress?.length > 0 && showAddress && (
        <ProfileBadge />
      )}
    </nav>
  );
};

export default NavBar;
