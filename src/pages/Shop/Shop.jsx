import React, { useEffect } from "react";
import "./Shop.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../helpers/Loading";
import ProductItem from "../../components/ProductItem/ProductItem";
import {
  fetchAllProducts,
  setPage,
} from "../../app/features/products/productSlice";

const Shop = () => {
  const dispatch = useDispatch();
  const {
    products = [],
    loading,
    error,
    pagination,
  } = useSelector((state) => state.product || {});

  useEffect(() => {
    dispatch(
      fetchAllProducts({ endpoint: "products", page: pagination.currentPage })
    );
  }, [dispatch, pagination.currentPage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleNextPage = () => {
    scrollToTop();
    if (pagination.nextPage) {
      dispatch(setPage(pagination.nextPage)); // Update the page in Redux
    }
  };

  const handlePrevPage = () => {
    scrollToTop();
    if (pagination.prevPage) {
      dispatch(setPage(pagination.prevPage)); // Update the page in Redux
    }
  };

  return (
    <main>
      {loading && <Loading loading={loading} />}
      {error && <div>Error: {error}</div>}

      <div className='shop-items'>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>

      <div className='pagination-buttons flex-center'>
        <button
          className='primary-btn'
          onClick={handlePrevPage}
          disabled={!pagination.prevPage}
        >
          Previous Page
        </button>
        <button
          className='primary-btn'
          onClick={handleNextPage}
          disabled={!pagination.nextPage}
        >
          Next Page
        </button>
      </div>
    </main>
  );
};

export default Shop;
