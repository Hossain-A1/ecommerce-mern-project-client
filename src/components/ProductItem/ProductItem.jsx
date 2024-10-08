import React from "react";
import { Link } from "react-router-dom";
import "./ProductItem.css"; // Create a CSS file for styling

const ProductItem = ({ product }) => {
  return (
    <div className="product-card">
      {/* Link to navigate based on the product's slug */}
      <Link to={`/products/${product.slug}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
