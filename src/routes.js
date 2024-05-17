import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import ProductForm from "./pages/Product-form/Productform";
import MyProducts from "./pages/MyProducts/MyProducts";
import EditProductform from "./pages/Product-form/EditProductForm";
import MyOrders from "./pages/MyOrders/MyOrders";
import EditOrderform from "./pages/Order-form/EditOrderForm";

const routes = (
  <Route>
    <Route path="/" element={<MainLayout />}>
      {/* ==================== Header Navlink Start here =================== */}
      <Route index element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/journal" element={<Journal />} />
      {/* ==================== Header Navlink End here ===================== */}
      <Route path="/category/:category" element={<Offer />} />
      <Route path="/product/:_id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/paymentgateway" element={<Payment />} />
    </Route>
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/create-product" element={<ProductForm />} />
    <Route path="/my-products" element={<MyProducts />} />
    <Route path="/edit-product" element={<EditProductform />} />
    <Route path="/my-orders" element={<MyOrders />} />
    <Route path="/edit-order" element={<EditOrderform />} />
  </Route>
);

export default routes;
