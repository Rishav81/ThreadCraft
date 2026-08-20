import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import MainLayout from "../Layouts/MainLayout";
import AuthTransition from "../Components/Ui/AuthTransition";
import LoadingScreen from "../Components/Ui/LoadingScreen";
import LoginModal from "../Components/Layout/LoginModal";

const ProductDetails = lazy(() => import("../Pages/Products/ProductDetails"));

const Hero = lazy(() => import("../Pages/Home/Hero"));
const KidHero = lazy(() => import("../Pages/Kid/KidHero"));
const NewArrivalHero = lazy(
  () => import("../Pages/New-Arrival/NewArrivalHero"),
);
const CollectionHero = lazy(() => import("../Pages/Collection/CollectionHero"));
const Landing = lazy(() => import("../Pages/Men/Landing"));
const WomenHero = lazy(() => import("../Pages/Women/WomenHero"));
const AddProduct = lazy(() => import("../Pages/Products/AddProduct"));

const Login = lazy(() => import("../Pages/Auth/Login"));
const Register = lazy(() => import("../Pages/Auth/Register"));
const Cart = lazy(() => import("../Pages/Cart/Cart"));
const CheckOut = lazy(() => import("../Pages/Cart/CheckOut"));
const OrderConfirmed = lazy(() => import("../Pages/Order/OrderConfiirmed"));
const Orders = lazy(() => import("../Pages/Order/Orders"));

const PageNotFound = lazy(() => import("../Pages/PageNotFound"));

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="sync">
        <Suspense fallback={<LoadingScreen />}>
          <Routes location={location} key={location.pathname}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Hero />} />
              <Route path="/collections" element={<CollectionHero />} />
              <Route path="/men" element={<Landing />} />
              <Route path="/women" element={<WomenHero />} />
              <Route path="/kids" element={<KidHero />} />
              <Route path="/new-Arrival" element={<NewArrivalHero />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/order-confirmed" element={<OrderConfirmed />} />
              <Route path="/orders" element={<Orders />} />
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
      <LoginModal />
    </>
  );
};

export default AppRoutes;
