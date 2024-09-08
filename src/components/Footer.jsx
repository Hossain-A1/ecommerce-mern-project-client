
import { Link } from "react-router-dom";
import { FaFacebookF,FaTwitter,FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <h2>
            Yummys<span>D</span>oor
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
            placeat odit velit vero atque maxime fugiat. Cum magnam tenetur
            debitis provident similique nulla molestiae reiciendis, error,
            officia a nobis repellat.
          </p>

          <div className='footer-social-icons'>
            <Link to='https://www.facebook.com/hossainislam.nur.9'>
            <FaFacebookF className="icon"/>
            </Link>
            <Link to='https://x.com/Hossain08343121'>
            <FaTwitter className="icon"/>
            </Link>
            <Link to='https://www.linkedin.com/in/hossain-ahmed-163b11236'>
            <FaLinkedinIn className="icon"/>
            </Link>
          </div>
        </div>
        <div className='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+88-013-004-16147</li>
            <li>contact@yummysdoor.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='copyright'>
        Copyright {new Date().getFullYear()} © yummysdoor.com- All Right
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;