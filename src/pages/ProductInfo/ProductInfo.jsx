import React, { useEffect, useState } from "react";
import "./ProductInfo.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../../secret";
const ProductInfo = () => {
  const [product, setProduct] = useState({});
  console.log(product);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${serverURL}/api/products/${slug}`);
        if (res.data.success) {
          setProduct(res.data.payload);
        } else {
          console.error("Failed to fetch product:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className='product-info'>
      
      <div className='product-info-image'>
        <img src={product.image} alt={product.name} />
      </div>
      <div className='product-details'>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Shipping: ${product.shipping}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
