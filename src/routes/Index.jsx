import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Verify from "../pages/Verify";
import  { Toaster } from 'react-hot-toast';
import ActivateAccount from "../pages/ActivateAccount";

// import Footer from "../components/Footer";
const Index = () => {
  return (
    <BrowserRouter>
    <Toaster/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/verify' element={<Verify />} />
        <Route path="/activate/:token" element={<ActivateAccount />} />
        <Route path='*' element={<Error />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
};

export default Index;
