import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/_auth/AuthLayout';
import RootLayout from '@/_root/RootLayout';
import Web3Auth from '@/_auth/pages/Web3Auth';
import LandingPage from '@/_public/pages/LandingPage';
import PublicLayout from '@/_public/PublicLayout';
import NotFoundPage from '@/_public/pages/NotFoundPage';
import HomePage from '@/_root/pages/HomePage';
import AllGroups from '@/_root/pages/AllGroups';
import CreateGroup from '@/_root/pages/CreateGroup';

function App() {
  return (
    <>
      <section className="w-full flex flex-col justify-center items-center font-fira-code">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route index path="/auth" element={<Web3Auth />} />
          </Route>
          <Route element={<RootLayout />}>
            <Route path="/all-groups" element={<AllGroups />} />
            <Route path="/create-group" element={<CreateGroup />} />
            <Route path="/test/home" element={<HomePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
