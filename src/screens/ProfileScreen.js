import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ProfileScreen(props) {

  let navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8082/users/auth', {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.data.isLoggedIn && res.data.type === 'Customer' ? (setFirstName(res.data.firstName), setUserType(res.data.type)) : navigate('/'))
  })

  function handleLogout(){
    localStorage.clear()
    navigate('/')
  }

  return (
    <div>
      <Header userType={userType} firstName={firstName}/>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}

export default ProfileScreen;