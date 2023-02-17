import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../components/Header";

function AdminHomeScreen(props) {

  let navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8082/users/auth', {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.data.isLoggedIn && res.data.type === 'Admin' ? (setFirstName(res.data.firstName), setUserType(res.data.type)) : navigate('/'))
  })

  function handleSearch(e) {
    e.preventDefault()
    const form = e.target
    navigate('/admin/flights', {
      showAll: false,
      flightData: {
        flightNumber: form[0].value, 
        departureTime: form[1].value,
        arrivalTime: form[2].value,
        flightDate: (form[3].value != null && form[3].value.trim().length!==0) ? new Date(form[3].value).setHours(2) : null,
        airportTerminal: form[4].value,
      }
    })
  }

  function handleLogout(){
    localStorage.clear()
    navigate('/')
  }

  return (
    <div>
      <Header userType={userType} firstName={firstName}/>
      <button onClick={() => handleLogout()}>Logout</button>
      <form onSubmit={event => handleSearch(event)}> 
        <input placeholder="Flight Number"/>
        <input placeholder="Departure Time"/>
        <input placeholder="Arrival Time"/>
        <input placeholder="Flight Date" type={'date'}/>
        <input placeholder="Airport Terminal"/>
        <input type="submit" value="Search"/>
      </form>
      <button onClick={() => navigate('/admin/flights', {showAll: true})}>List All Flights</button>
      <button onClick={() => navigate('/admin/flights/create')}>Create Flight</button>
    </div>
  );
}

export default AdminHomeScreen;
