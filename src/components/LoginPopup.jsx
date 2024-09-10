import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { z } from "zod";
import { registrationSchema, loginSchema } from "../libs/validationSchemas"; // Adjust the import as needed
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { loginUser } from "../app/features/auth/authSlice";


const LoginPopup = ({ setLoginModal }) => {
  const serverURL = "http://localhost:4000";
  const { userAndToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [currState, setCurrState] = useState("Register");
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  // State to store form errors
  const [errors, setErrors] = useState({});
  3;

  const onChangehandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    let schema;
    let newURL = serverURL;
    if (currState === "Register") {
      schema = registrationSchema;
      newURL += "/api/users/process-register";
    } else if (currState === "login") {
      schema = loginSchema;
      newURL += "/api/auth/login";
    }

    try {
      // Validate form data
      schema.parse(formData);

      const serverResponse = await axios.post(newURL, formData, {
        withCredentials: true, // Important for cookies
      });
      if (serverResponse.data.success) {
        setLoginModal(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
        });

        // You can't access HttpOnly cookies like this, but they will be sent automatically with future requests
        Cookies.get("access_token");
        Cookies.get("refresh_token");

        dispatch(loginUser(serverResponse.data.payload?.userWithoutPassword ));

        // Display success message
        toast.success(
          `Go to your email (${formData.email}) to activate your account.`,
          {
            duration: 6000,
          }
        );
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Extract and set validation errors
        const formattedErrors = error.format();

        // Flatten the error object if needed
        const flatErrors = Object.keys(formattedErrors).reduce((acc, key) => {
          if (formattedErrors[key]._errors) {
            acc[key] = formattedErrors[key]._errors[0]; // Get the first error message
          }
          return acc;
        }, {});

        setErrors(flatErrors);
      } else {
        toast.error("Error: " + error.message);
      }
    }
  };

  return (
    <div className=' login-popup  '>
      <form
        className='flex-col-register  login-popup-container'
        onSubmit={handleUserLogin}
      >
        {currState === "Register" && (
          <div className='login-popup-header'>
            <h2 className='register-title'>Create an account</h2>
            <p className='modal-close' onClick={() => setLoginModal(false)}>
              X
            </p>
          </div>
        )}

        {currState === "Register" ? (
          <>
            {/* Name Field */}
            <div className='flex-col-register'>
              <label className='label' htmlFor='name'>
                Name
              </label>
              <input
                name='name'
                onChange={onChangehandler}
                value={formData.name}
                className='input'
                type='text'
                placeholder='Write your name'
              />
              {errors.name && <i className='form-error'>{errors.name}</i>}
            </div>

            {/* Email Field */}
            <div className='flex-col-register'>
              <label className='label' htmlFor='email'>
                Email
              </label>
              <input
                name='email'
                onChange={onChangehandler}
                value={formData.email}
                className='input'
                type='email'
                placeholder='Write your email'
              />
              {errors.email && <i className='form-error'>{errors.email}</i>}
            </div>

            {/* Password Field */}
            <div className='flex-col-register'>
              <label className='label' htmlFor='password'>
                Password
              </label>
              <input
                name='password'
                onChange={onChangehandler}
                value={formData.password}
                className='input'
                type='password'
                placeholder='Write your password'
              />
              {errors.password && (
                <i className='form-error'>{errors.password}</i>
              )}
            </div>

            {/* Phone Field */}
            <div className='flex-col-register'>
              <label htmlFor='phone' className='label'>
                Phone
              </label>
              <input
                name='phone'
                onChange={onChangehandler}
                value={formData.phone}
                className='input'
                type='tel'
                placeholder='Write your phone'
              />
              {errors.phone && <i className='form-error'>{errors.phone}</i>}
            </div>

            {/* Address Field */}
            <div className='flex-col-register'>
              <label htmlFor='address' className='label'>
                Address
              </label>
              <input
                name='address'
                onChange={onChangehandler}
                value={formData.address}
                className='input'
                type='text'
                placeholder='Write your Address'
              />
              {errors.address && <i className='form-error'>{errors.address}</i>}
            </div>
          </>
        ) : (
          <div>
            <h2 className='register-title'>Login</h2>

            {/* Email Field */}
            <div className='flex-col-register'>
              <label className='label' htmlFor='email'>
                Email
              </label>
              <input
                name='email'
                onChange={onChangehandler}
                value={formData.email}
                className='input'
                type='email'
                placeholder='Write your email'
              />
              {errors.email && <i className='form-error'>{errors.email}</i>}
            </div>

            {/* Password Field */}
            <div className='flex-col-register'>
              <label className='password' htmlFor='password'>
                Password
              </label>
              <input
                name='password'
                onChange={onChangehandler}
                value={formData.password}
                className='input'
                type='password'
                placeholder='Write your password'
              />
              {errors.password && (
                <i className='form-error'>{errors.password}</i>
              )}
            </div>
          </div>
        )}

        <button type='submit' className='btn'>
          {currState === "Register" ? "Create account" : "Login"}
        </button>

        {currState === "Register" ? (
          <p>
            Already have an account?{" "}
            <button
              className='redirect-btn'
              onClick={() => setCurrState("login")}
            >
              Login here
            </button>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <button
              className='redirect-btn'
              onClick={() => setCurrState("Register")}
            >
              Click here
            </button>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
