import React, { useState } from "react";

const ProductSidebar = ({sidebar,setSidebar}) => {
  return (
    <aside  onClick={(setSidebar(true))}>
      <div>
        <h3>Filter by price</h3>
      </div>

      <div>
        <h3>filter by category</h3>
      </div>
    </aside>
  );
};

export default ProductSidebar;
