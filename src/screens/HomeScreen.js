import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../components/Header";

function HomeScreen(props) {

  let navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8082/users/auth', {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.data.isLoggedIn ? (setFirstName(res.data.firstName), setUserType(res.data.type)) : setFirstName(''))
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    const form = e.target
    navigate(`/search/${form[0].value}/${form[1].value}/${form[2].value === '' ? null : form[2].value}/${form[3].value}/${form[4].value === '' ? null : form[4].value}/${form[5].value === '' ? null : form[5].value}`)
  }

  return (
    <div>
      <Header userType={userType} firstName={firstName}/>
      <form onSubmit={event => handleSearch(event)}> 
        <input placeholder="From" required/>
        <input placeholder="To" required/>
        <input placeholder="Cabin"/>
        <input placeholder="Passenger Count" type={'number'} required/>
        <input placeholder="Departure Date" type={'date'}/>
        <input placeholder="Return Date" type={'date'}/>
        <input type="submit" value="Search"/>
      </form>
    </div>
  );
}


export default HomeScreen;