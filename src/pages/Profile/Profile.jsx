import "./Profile.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/features/auth/authSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const { id } = useParams();

  const { user: customer } = useSelector((state) => state.auth);
  const user = customer.userWithoutPassword;
  const dispatch = useDispatch();

  const newAccessToken = Cookies.get("access_token");
  const [editMode, setEditMode] = useState(false);
  const [imageFile, setImageFile] = useState(null); // Store the uploaded file

  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
    image: user.image, // Existing image from user data
  });

  const [updatePassword, setUpdatePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmedPassword: "",
  });
  const handlePassInputChanage = (e) => {
    const { name, value } = e.target;
    setUpdatePassword({ ...updatePassword, [name]: value });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Generate a temporary URL for the uploaded file
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  // API request for updating user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const res = await axios.put(
        `http://localhost:4000/api/users/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${newAccessToken}`,
          },
          withCredentials: true,
        }
      );

      // Update user state after successful update
      dispatch(loginUser(res.data.payload));
      toggleEditMode();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // API request for updating user password
  const handleUpdatePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateData = new FormData();
      updateData.append("oldPassword", updatePassword.oldPassword);
      updateData.append("newPassword", updatePassword.newPassword);
      updateData.append("confirmedPassword", updatePassword.confirmedPassword);
      const updatePass = await axios.put(
        `http://localhost:4000/api/users/update-password/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${newAccessToken}`,
          },
          withCredentials: true,
        }
      );
dispatch(loginUser(updatePass.data.payload))
      toast.success("Your password has been updated.");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // ----------------------//
  useEffect(() => {
    setFormData({
      name: user.name,
      phone: user.phone,
      address: user.address,
      image: user.image, // Set existing image
    });
  }, []);
  return (
    <div className='profile-container'>
      {user ? (
        <div className='profile-card'>
          <div className='profile-header'>
            <img
              src={formData.image || "default-profile.jpg"} // Show uploaded image or existing one
              alt='Profile'
              className='profile-image'
            />
            <h1>{formData.name}</h1>
            <button onClick={toggleEditMode} className='edit-button'>
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>
          {editMode ? (
            <form onSubmit={handleSubmit} className='profile-edit-form'>
              <div>
                <label>Name</label>
                <input
                  className='edit-input'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  className='edit-input'
                  type='text'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  className='edit-input'
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Profile Image</label>
                <input
                  className='edit-input'
                  type='file'
                  name='image'
                  onChange={handleImageChange}
                />
              </div>
              <button type='submit' className='save-button'>
                Save Changes
              </button>
            </form>
          ) : (
            <div className='profile-details'>
              <div>
                <strong>Email:</strong>
                <p>{user.email}</p>
              </div>
              <div>
                <strong>Phone:</strong>
                <p>{user.phone}</p>
              </div>
              <div>
                <strong>Address:</strong>
                <p>{user.address}</p>
              </div>
              <div>
                <strong>Admin:</strong>
                <p>{user.isAdmin ? "Yes" : "No"}</p>
              </div>
              <div>
                <strong>Banned:</strong>
                <p>{user.isBanned ? "Yes" : "No"}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>No user data available</p>
      )}
      {/* update password start here */}
    {
      user &&(
        <div className='update-password'>
        <form
          onSubmit={handleUpdatePasswordSubmit}
          className='profile-edit-form'
        >
          <div>
            <label htmlFor='oldPassword'>OldPassword</label>
            <input
              className='edit-input'
              type='text'
              name='oldPassword'
              value={updatePassword.oldPassword}
              onChange={handlePassInputChanage}
              placeholder='Inter old password'
            />
          </div>
          <div>
            <label htmlFor='newPassword'>NewPassword</label>
            <input
              className='edit-input'
              type='text'
              name='newPassword'
              value={updatePassword.newPassword}
              onChange={handlePassInputChanage}
              placeholder='Inter new password'
            />
          </div>
          <div>
            <label htmlFor='confirmedPassword'>ConfirmedPassword</label>
            <input
              className='edit-input'
              type='text'
              name='confirmedPassword'
              value={updatePassword.confirmedPassword}
              onChange={handlePassInputChanage}
              placeholder='Inter Confirme password'
            />
          </div>
          <button type='submit' className='save-button'>
            Update Password
          </button>
        </form>
      </div>
      )
    }
    </div>
  );
};

export default Profile;
