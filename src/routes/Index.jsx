import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Verify from "../pages/Verify";
import { Toaster } from "react-hot-toast";
import ActivateAccount from "../pages/ActivateAccount";
import { useState } from "react";
import Profile from "../pages/Profile/Profile";
import Savings from "../pages/Savings/Savings";
import Mobile from "../pages/Mobile/Mobile";
import Desktop from "../pages/Desktop/Desktop";
import Shop from "../pages/Shop/Shop";
import Contact from "../pages/Contact/Contact";
import ProductInfo from "../pages/ProductInfo/ProductInfo";

// import Footer from "../components/Footer";
const Index = () => {
  const [profileModal, setProfileModal] = useState(false);
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar profileModal={profileModal} setProfileModal={setProfileModal} />
      <Routes>
        <Route path='/' element={<Home />} setProfileModal={setProfileModal} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/activate/:token' element={<ActivateAccount />} />
        <Route path='/savings' element={<Savings />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/mobile' element={<Mobile />} />
        <Route path='/desktop' element={<Desktop />} />
        <Route path='/products/:slug' element={<ProductInfo />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='*' element={<Error />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
};

export default Index;
