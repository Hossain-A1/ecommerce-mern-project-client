import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p>Trendora is powered by 100% renewable electricity.</p>
      </div>
      <div className="footer-main">
        <div className="footer-section">
          <h4>Shop</h4>
          <ul>
            <li>Gift cards</li>
            <li>Trendora Registry</li>
            <li>Sitemap</li>
            <li>Trendora blog</li>
            <li>Trendora United Kingdom</li>
            <li>Trendora Germany</li>
            <li>Trendora Canada</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Sell</h4>
          <ul>
            <li>Sell on Trendora</li>
            <li>Teams</li>
            <li>Forums</li>
            <li>Affiliates & Creators</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li>Trendora, Inc.</li>
            <li>Policies</li>
            <li>Investors</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Impact</li>
            <li>Legal imprint</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li>Help Centre</li>
            <li>Privacy settings</li>
          </ul>
          <div className="footer-icons">
            <FaInstagram />
            <FaFacebookF />
            <FaPinterest />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
