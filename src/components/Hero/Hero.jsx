import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
const Hero = () => {
  return (
    <section className="container">
<div className='hero-section'>
      <div >
        <h1>Discover the Latest in Laptop Innovation</h1>
        <p>descover it with its best design and new features!</p>
        <Link to='/' className="primary-btn">SHOP NOW</Link>
      </div>
      <div className="hero-right">
        <img
          src='https://t4.ftcdn.net/jpg/01/59/31/93/240_F_159319340_QQey6yAlz7ZYyB3SQo4twv63vzlxDWQT.jpg'
          alt='hero img'
        />
      </div>
    </div>
    </section>
    
  );
};

export default Hero;
