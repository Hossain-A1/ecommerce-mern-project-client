import React, { useState } from "react";
import "./Sidebar.css";

const ProductSidebar = ({ sidebar, setSidebar }) => {
  const [priceRange, setPriceRange] = useState(10);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Handle price range change
  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((item) => item !== category) // unselect category
          : [...prev, category] // add category
    );
  };

  return (
    <aside className={`sidebar ${sidebar ? "sidebar-full" : "sidebar-none"}`}>
      <button onClick={() => setSidebar(false)}>❌</button>
      {sidebar && (
        <div className='filter-content'>
          {/* Filter by Price */}
          <div className='filter-section'>
            <h3>Filter by Price</h3>
            <input
              type='range'
              min='0'
              max='2000'
              value={priceRange}
              onChange={handlePriceChange}
            />
            <p>Selected Price: ${priceRange}</p>
          </div>

          {/* Filter by Category */}
          <div className='filter-section'>
            <h3>Filter by Category</h3>
            <label>
              <input
                type='checkbox'
                value='Phone & Tab'
                checked={selectedCategories.includes("Phone & Tab")}
                onChange={handleCategoryChange}
              />
              Phone & Tab
            </label>
            <label>
              <input
                type='checkbox'
                value='Desktop & Laptop'
                checked={selectedCategories.includes("Desktop & Laptop")}
                onChange={handleCategoryChange}
              />
              Desktop & Laptop
            </label>
            <label>
              <input
                type='checkbox'
                value='Smart Watch'
                checked={selectedCategories.includes("Smart Watch")}
                onChange={handleCategoryChange}
              />
              Smart Watch
            </label>
            <label>
              <input
                type='checkbox'
                value='Shoes'
                checked={selectedCategories.includes("Shoes")}
                onChange={handleCategoryChange}
              />
              Shoes
            </label>
            <label>
              <input
                type='checkbox'
                value='Electronic'
                checked={selectedCategories.includes("Electronic")}
                onChange={handleCategoryChange}
              />
              Electronic
            </label>
          </div>
        </div>
      )}
    </aside>
  );
};

export default ProductSidebar;
