import { useState } from "react";
import Category from "../components/Category/Category";
import Hero from "../components/Hero/Hero";
import ProductSidebar from "../components/ProductSidebar";
import Services from "../components/Services/Services";

const Home = ({ setProfileModal }) => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className=''>
      <>
        {sidebar && (
          <ProductSidebar sidebar={sidebar} setSidebar={setSidebar} />
        )}
      </>
      <>
        <Hero />
        <Services />
        <Category />
      </>
    </div>
  );
};

export default Home;
