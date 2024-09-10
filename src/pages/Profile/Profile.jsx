import './Profile.css';
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams(); // Get the id from the URL
  const { data, isLoading, error } = useFetch(`/api/users/${id}`); // Use useFetch to get user data
const {user} =data.payload
console.log(user);
  
  return (
    <main className='add'>
      <div>
       {
        user &&(
          <div>
             <h1>{user.name}</h1>
             <p>{user.email}</p>
          </div>
        )
       }
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, dolore dignissimos enim provident assumenda nihil ea quae fuga dolor sint quo ex asperiores voluptate delectus quaerat. Sit excepturi at nostrum.</p>
    </main>
  );
};

export default Profile;
