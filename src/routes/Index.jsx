import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Verify from "../pages/Verify";
import  { Toaster } from 'react-hot-toast';
import ActivateAccount from "../pages/ActivateAccount";
import { useState } from "react";
import Profile from "../pages/Profile/Profile";

// import Footer from "../components/Footer";
const Index = () => {
  const [profileModal, setProfileModal] = useState(false);
  return (
    <BrowserRouter>
    <Toaster/>
      <Navbar profileModal={profileModal} setProfileModal={setProfileModal}  />
      <Routes>
        <Route path='/' element={<Home />} setProfileModal={setProfileModal}/>
        <Route path='/verify' element={<Verify />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path="/activate/:token" element={<ActivateAccount />} />
        <Route path='*' element={<Error />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
};

export default Index;
