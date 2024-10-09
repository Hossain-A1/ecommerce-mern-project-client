import React, { useEffect } from 'react'
import Loading from '../../helpers/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../app/features/products/productSlice';
import ProductItem from '../ProductItem/ProductItem';

const Products = () => {
  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.product || {});
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      fetchAllProducts({ endpoint: "products"})
    );
  }, [dispatch]);
  return (
    <div>
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
    </div>
  )
}

export default Products