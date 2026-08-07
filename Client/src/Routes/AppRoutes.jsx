import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import MainLayout from "../Layouts/MainLayout";
import AuthTransition from "../Components/Ui/AuthTransition";
import LoadingScreen from "../Components/Ui/LoadingScreen";
import KidHero from "../Pages/Kid/KidHero";

const Hero = lazy(() => import("../Pages/Home/Hero"));
const Shop = lazy(() => import("../Pages/Shop/Shop"));
const Landing = lazy(() => import("../Pages/Men/Landing"));
const WomenHero = lazy(() => import("../Pages/Women/WomenHero"));
const AddProduct = lazy(() => import("../Pages/Products/AddProduct"));

const Login = lazy(() => import("../Pages/Auth/Login"));
const Register = lazy(() => import("../Pages/Auth/Register"));

const PageNotFound = lazy(() => import("../Pages/PageNotFound"));

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="sync">
      <Suspense fallback={<LoadingScreen />}>
        <Routes location={location} key={location.pathname}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Hero />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/men" element={<Landing />} />
            <Route path="/women" element={<WomenHero />} />
            <Route path="/kids" element={<KidHero />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Route>

          <Route
            path="/login"
            element={
              <AuthTransition>
                <Login />
              </AuthTransition>
            }
          />

          <Route
            path="/register"
            element={
              <AuthTransition>
                <Register />
              </AuthTransition>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRoutes;
