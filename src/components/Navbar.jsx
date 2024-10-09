import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaRegHeart, FaGift, FaListUl } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserEdit } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import LoginPopup from "./LoginPopup";
import Cookies from "js-cookie";
import ProfilePopup from "./ProfilePopup/ProfilePopup";
const Navbar = ({ profileModal, setProfileModal }) => {
  const [menu, setMenu] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  // Accessing the tokens from cookies
  const accessToken = Cookies.get("access_token");

  return (
    <header className='navbar   '>
      <div className='  container'>
        <div className='nav-top flex-space-between '>
          <div className='logo  '>
            <h2 className='nav-logo'>Trendora</h2>
            <button className='category-btn flex-cente flex-space-between'>
              <FaListUl className='category-icon' />
              <p className='category'>Category</p>
              <div className='search'>
                <input type='search' placeholder='Search for anything' />
                <p className='search-bar-icon'>
                  <BsSearch className='search-icon' />
                </p>
              </div>
            </button>
          </div>

          <div className=' flex-center mid-between'>
            <div className='mid-center'>
              <div className='search-input'>
                <input type='search' placeholder='Search...' />
                <p className='search-bar-icon'>
                  <BsSearch className='search-icon' />
                </p>
              </div>
            </div>
            {loginModal && (
              <div className='overlay  '>
                <LoginPopup setLoginModal={setLoginModal} />
              </div>
            )}

            <div className='flex-center end'>
              <div className='nav-right'>
                <div className=''>
                  {/* profile start here */}
                  <div>
                    {profileModal && (
                      <ProfilePopup setProfileModal={setProfileModal} />
                    )}
                  </div>

                  {!accessToken && (
                    <button onClick={() => setLoginModal(true)} className=''>
                      Sign in
                    </button>
                  )}
                </div>
                <NavLink to='/love'>
                  {<FaRegHeart className='right-icons' />}
                </NavLink>
                <NavLink to='/gift'>
                  {<FaGift className='right-icons' />}
                </NavLink>
                {accessToken && (
                  <div
                    onClick={() => setProfileModal(true)}
                    className='profile-icon'
                  >
                    <FaUserEdit className='right-icon-profile' />
                  </div>
                )}

                <NavLink to='/cart'>
                  {<FiShoppingCart className='right-icons' />}
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <ul className='navbar-bottom-menu flex-center '>
          <NavLink to='/' className={menu === "home" ? "active" : "nav-links"}>
            home{" "}
          </NavLink>
          <NavLink
            to='/savings'
            className={menu === "/savings" ? "active" : "nav-links"}
          >
            Savings
          </NavLink>

          <NavLink
            to='/shop'
            className={menu === "/shop" ? "active" : "nav-links"}
          >
            shop
          </NavLink>
          <NavLink
            to='/mobile'
            className={menu === "/mobile" ? "active" : "nav-links"}
          >
            phone & tab
          </NavLink>
          <NavLink
            to='/desktop'
            className={menu === "/desktop" ? "active" : "nav-links"}
          >
            desktop & laptop
          </NavLink>
          <NavLink
            to='/contact'
            className={menu === "/contact" ? "active" : "nav-links"}
          >
            contact us
          </NavLink>
        </ul>
      </div>
      <p className='hr-design'></p>
    </header>
  );
};

export default Navbar;
