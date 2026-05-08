import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Home from "./components/Home";
import Promotions from "./components/Promotions";
import Brands from "./components/Brands";
import About from "./components/About";
import Products from "./components/products/Products";
import ProductDetails from "./components/products/ProductDetails";
import Cart from "./components/Cart";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="brands" element={<Brands />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;