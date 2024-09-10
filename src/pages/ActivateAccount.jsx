import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie"
const ActivateAccount = () => {
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();
  const [activationStatus, setActivationStatus] = useState("Activating...");

  const activateAccount = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/activate",
        { token }
      );

      if (response.data.success) {
        Cookies.get("access_token");
      Cookies.get("refresh_token");
        toast.success("Account successfully activated!");
        setActivationStatus("Account activated! Redirecting...");
        navigate("/")
      }
    } catch (error) {
      if (error.response?.data?.success === false) {
        setActivationStatus("Account already activated.");
navigate('/')
      } 
    }
  };

 useEffect(()=>{
activateAccount()
 },[token])

  return (
    <div>
      <p>{activationStatus}</p> {/* Show activation status */}
    </div>
  );
};

export default ActivateAccount;
