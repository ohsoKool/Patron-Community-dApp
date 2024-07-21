import { Route, Routes } from "react-router-dom";
import AuthLayout from "@/_auth/AuthLayout";
import RootLayout from "@/_root/RootLayout";
import ExplorePage from "@/_root/pages/ExplorePage";
import Web3Auth from "@/_auth/pages/Web3Auth";
import LandingPage from "@/_public/pages/LandingPage";
import PublicLayout from "@/_public/PublicLayout";

function App() {
  return (
    <>
      <h1 className="text-blue-700">THIS IS REACT</h1>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route index path="/auth" element={<Web3Auth />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route path="/explore" element={<ExplorePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
