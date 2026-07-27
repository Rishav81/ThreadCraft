import { Route, Routes } from "react-router-dom";
import Hero from "../Pages/Home/Hero";
import Shop from "../Pages/Shop/Shop";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MainLayout from "../Layouts/MainLayout";
import PageNotFound from "../Pages/PageNotFound";

import Landing from "../Pages/Men/Landing";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Hero />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/men" element={<Landing />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
