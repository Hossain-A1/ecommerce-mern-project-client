import "./ProfilePopup.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logoutUser } from "../../app/features/auth/authSlice";
const ProfilePopup = ({ setProfileModal }) => {
  const url = "http://localhost:4000";
  const { user } = useSelector((state) => state.auth);

  const {_id} =user
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removeCookie = async () => {
    try {
      await axios.post(url + "/api/auth/logout");
      // Remove cookie and log out from Redux state
   Cookies.remove("access_token");
      dispatch(logoutUser())
      navigate('/')
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className='profile-popup'>
      <div className=''>
        <div>
          <p>mrhossainahmed&@gmail.com</p>
          <Link to={`/profile/${_id}`} onClick={() => setProfileModal(false)}>
            View your profile
          </Link>
        </div>

        <div>
          <button onClick={removeCookie}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
