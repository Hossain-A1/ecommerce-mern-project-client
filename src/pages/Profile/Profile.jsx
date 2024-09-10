import './Profile.css';
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../app/features/auth/authSlice';

const Profile = () => {
  const { user: dd } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the id from the URL
  const { data: customer, isLoading, error } = useFetch(`/api/users/${id}`); // Fetch user data
  const user = customer?.payload?.user;

  const newAccessToken = Cookies.get('access_token');
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    image: '', // Will be updated later
  });

  const [imageFile, setImageFile] = useState(null); // Separate state for handling file input

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        phone: user.phone,
        address: user.address,
        image: user.image ? `http://localhost:4000/${user.image}` : '', // Set the image URL
      });
    }
  }, [user]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Update file state for new image
    setFormData({ ...formData, image: URL.createObjectURL(file) }); // Preview the new image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);

      // Append the image only if a new file has been selected
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const res = await axios.put(
        `http://localhost:4000/api/users/${id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${newAccessToken}`,
          },
          withCredentials: true,
        }
      );
      dispatch(loginUser(res.data));
      // Update formData with the new image URL
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: res.data.image ? `http://localhost:4000/${res.data.image}` : prevFormData.image,
      }));
      toggleEditMode(); // Exit edit mode after successful update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile data</p>;

  return (
    <div className='profile-container'>
      {user ? (
        <div className='profile-card'>
          <div className='profile-header'>
            <img 
              src={formData.image} 
              alt='Profile' 
              className='profile-image' 
            />
            <h1>{user.name}</h1>
            <button onClick={toggleEditMode} className='edit-button'>
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          {editMode ? (
            <form onSubmit={handleSubmit} className='profile-edit-form'>
              <div>
                <label>Name</label>
                <input
                className='edit-input'
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Profile Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
              <button type="submit" className='save-button'>Save Changes</button>
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
                <p>{user.isAdmin ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <strong>Banned:</strong>
                <p>{user.isBanned ? 'Yes' : 'No'}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
