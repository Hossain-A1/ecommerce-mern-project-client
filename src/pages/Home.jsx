import { useState } from "react";
import Category from "../components/Category/Category";
import Hero from "../components/Hero/Hero";
import ProductSidebar from "../components/Sidebar/ProductSidebar";
import Services from "../components/Services/Services";
import { FaListUl } from "react-icons/fa";

const Home = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div>
      <button onClick={() => setSidebar(true)} className="toggle-filter"> <FaListUl/> Filter</button>

      <div className={`${sidebar && "flex-space-between"}`}>
        {sidebar && (
          <div>
            <ProductSidebar sidebar={sidebar} setSidebar={setSidebar} />
          </div>
        )}

        <div className={` ${sidebar ? "main-contents" : ""}`}>
          <Hero />
          <Services />
          <Category />
        </div>
      </div>
    </div>
  );
};

export default Home;
