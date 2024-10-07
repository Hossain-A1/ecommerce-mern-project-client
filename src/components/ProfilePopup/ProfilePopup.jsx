import "./ProfilePopup.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBox, FaComments, FaGift, FaClipboardList, FaCog, FaSignOutAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logoutUser } from "../../app/features/auth/authSlice";

const ProfilePopup = ({ setProfileModal }) => {
  const url = "http://localhost:4000";
  const { user } = useSelector((state) => state.auth);
  const { _id, name,image } = user.userWithoutPassword;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeCookie = async () => {
    try {
      await axios.post(url + "/api/auth/logout");
      // Remove cookie and log out from Redux state
      Cookies.remove("access_token");
      navigate('/');
      dispatch(logoutUser());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
   <div >
     <div className="profile-popup">
      <div className="profile-popup-container flex-col-start">
        <div className="profile-popup-header flex-row">
          {/* <img src={image} alt="" /> */}
          <FaUser className="profile-popup-icon" />
          <div className="profile-name">
            <h3>{name}</h3>
            <Link className="view-profile" to={`/profile/${_id}`} onClick={() => setProfileModal(false)}>
              View your profile
            </Link>
          </div>
        </div>

        <div className="profile-popup-options">
          <Link to="/" className="popup-link">
            <FaBox /> Purchases and reviews
          </Link>
          <Link to="/" className="popup-link">
            <FaComments /> Messages
          </Link>
          <Link to="/" className="popup-link">
            <FaGift /> Special offers
          </Link>
          <Link to="/" className="popup-link">
            <FaClipboardList /> Registry
          </Link>
          <Link to="/" className="popup-link">
            <FaCog /> Account settings
          </Link>
          <button className="popup-link logout" onClick={removeCookie}>
            <FaSignOutAlt /> Sign out
          </button>
        </div>
      </div>
    </div>

    <div className="overlay" onClick={()=>setProfileModal(false)}></div>
   </div>
  );
};

export default ProfilePopup;
