import React from "react";
import "./Category.css";

const Category = () => {
  return (
    <section className='container'>
      <div className='category-container'>
        <h2>Popular Categories</h2>
        <div className='category-items'>
          <div className='category-item'>
            <img
              src='https://t4.ftcdn.net/jpg/00/35/06/29/240_F_35062950_K12DWRLtT0EJv1j3Qr1bHdzmaWcg2YSD.jpg'
              alt='Laptops'
            />
            <span>Laptops</span>
          </div>
          <div className='category-item'>
            <img
              src='https://t3.ftcdn.net/jpg/02/49/02/90/240_F_249029042_NEynoRRVIB5P8TA8m8gGP66LAcLW534J.jpg'
              alt='Phones'
            />
            <span>Phones</span>
          </div>
          <div className='category-item'>
            <img
              src='https://t4.ftcdn.net/jpg/04/28/87/95/240_F_428879534_N2s9CLzJIkkD2LejHihtB7HcHYqCSDEf.jpg'
              alt='Tablets'
            />
            <span>Tablets</span>
          </div>
          <div className='category-item'>
            <img
              src='https://t3.ftcdn.net/jpg/00/85/51/56/240_F_85515668_dbMmOjChn3nNgpl8vKlQ7IXtHgboiuPB.jpg'
              alt='Smart Watches'
            />
            <span>Smart Watches</span>
          </div>
          <div className='category-item'>
            <img
              src='https://t3.ftcdn.net/jpg/00/79/36/04/240_F_79360425_13tH0FGR7nYTNlXWKOWtLmzk7BAikO1b.jpg'
              alt='Cameras'
            />
            <span>Cameras</span>
          </div>
          <div className='category-item'>
            <img
              src='https://t3.ftcdn.net/jpg/03/44/79/58/240_F_344795845_7FkTX1Rqu7eedHEDKzWmrZLj9eoNJRfH.jpg'
              alt='Headphones'
            />
            <span>Headphones</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
