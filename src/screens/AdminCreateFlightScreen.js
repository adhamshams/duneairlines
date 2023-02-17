import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function AdminCreateFlightScreen() {

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

  async function handleCreate(e) {
    e.preventDefault()
    const form = e.target
    const newFlight = {
      from: form[0].value,
      to: form[1].value,
      flightDate: form[2].value,
      arrivalDate: form[3].value,
      cabin: form[4].value,
      seatsAvailableOnFlight: form[5].value,
      flightNumber: form[6].value,
      airportTerminal: form[7].value,
      departureTime: form[8].value,
      arrivalTime: form[9].value,
      price: form[10].value,
      baggageAllowance: form[11].value
    }
    axios.post('http://localhost:8082/flights', newFlight)
    .then(res => {
      navigate('/admin')
    })
    .catch(err =>{
      console.log(err);
    })
  }
  
  
  return (
    <div>
      <Header userType={userType} firstName={firstName}/>
      <form onSubmit={event => handleCreate(event)}> 
        <input placeholder="From" required/>
        <input placeholder="To" required/>
        <input placeholder="Flight Date" type={'date'} required/>
        <input placeholder="Arrival Date" type={'date'} required/>
        <input placeholder="Cabin" required/>
        <input placeholder="Seats" type={'number'} required/>
        <input placeholder="Flight Number" required/>
        <input placeholder="Airport Terminal" required/>
        <input placeholder="Departure Time" required/>
        <input placeholder="Arrival Time" required/>
        <input placeholder="Price" type={'number'} required/>
        <input placeholder="Baggage Allowance" type={'number'} required/>
        <input type="submit" value="Create"/>
      </form>
    </div>
  )
 }

export default AdminCreateFlightScreen;