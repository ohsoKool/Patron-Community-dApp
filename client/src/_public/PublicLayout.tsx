import Particles from '@/components/magicui/particles';
import { useTheme } from '@/components/shared/ThemeProvider';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className="w-full relative">
        <Particles
          className="absolute inset-0 z-0"
          quantity={theme === 'dark' ? 100 : 400}
          ease={80}
          color={theme === 'dark' ? '#ffff' : '#0000'}
          refresh
        />
        <Outlet />
      </div>
    </>
  );
};

export default PublicLayout;
