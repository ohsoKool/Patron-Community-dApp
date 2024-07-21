import Particles from '@/components/magicui/particles';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <div className="w-full relative">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={'#ffff'}
          refresh
        />
        <Outlet />
      </div>
    </>
  );
};

export default PublicLayout;
