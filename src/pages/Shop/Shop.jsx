import React, { useEffect } from "react";
import "./Shop.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../app/features/products/productSlice";
import Loading from "../../helpers/Loading";
import ProductItem from "../../components/ProductItem/ProductItem";

const Shop = () => {
  const dispatch = useDispatch();
  
  const { products = [], loading, error } = useSelector(
    (state) => state.product || {}
  ); // Ensure products defaults to an empty array
  useEffect(() => {
    dispatch(fetchAllProducts('products'));
  }, [dispatch]);

  return (
    <main>
      {loading && <Loading loading={loading} />}
      {error && <div>Error: {error}</div>}
      
      <div className="shop-items">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </main>
  );
};

export default Shop;
