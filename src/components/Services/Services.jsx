import React from "react";
import {
  FaShippingFast,
  FaMoneyCheckAlt,
  FaLock,
  FaHeadset,
  FaTruck,
} from "react-icons/fa";
import "./Services.css";

const Services = () => {
  return (
  <section className="container">
      <div className='services-container'>
      <div className='service-item'>
        <FaShippingFast className='icon' />
        <span>Free Shipping</span>
      </div>
      <div className='service-item'>
        <FaMoneyCheckAlt className='icon' />
        <span>Money Guarantee</span>
      </div>
      <div className='service-item'>
        <FaLock className='icon' />
        <span>Payment Method</span>
      </div>
      <div className='service-item'>
        <FaHeadset className='icon' />
        <span>Online Support</span>
      </div>
      <div className='service-item'>
        <FaTruck className='icon' />
        <span>Fast Delivery</span>
      </div>
    </div>
  </section>
  );
};

export default Services;
