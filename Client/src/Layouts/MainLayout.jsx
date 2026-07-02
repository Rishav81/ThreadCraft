import { Outlet } from "react-router-dom";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      {/* IMPORTANT: prevents overlap */}
      <main className="pt-[0px]">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
