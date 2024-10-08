import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../app/features/products/productSlice";
import Loading from "../../helpers/Loading";
import ProductItem from "../../components/ProductItem/ProductItem";
import "./Mobile.css";

const Mobile = () => {
  const [phones, setPhones] = useState([]);
  console.log(phones);
  const dispatch = useDispatch();

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.product || {});

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Filter phones when products are updated
  useEffect(() => {
    if (products.length > 0) {
      const filteredPhones = products.filter(
        (item) => item.category.slug === "smart-phone"
      );
      setPhones(filteredPhones);
    }
  }, [products]);

  return (
    <main>
      {loading && <Loading />}
      {error && <div>Error: {error}</div>}

      <div className="shop-items">
        {phones.length > 0 ? (
          phones.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </main>
  );
};

export default Mobile;
