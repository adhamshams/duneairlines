import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SignUpScreen(props) {

  let navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault()
    const form = e.target
    axios.post('http://localhost:8082/users', {
      firstName: form[0].value,
      lastName: form[1].value,
      email: form[2].value,
      homeAddress: form[3].value,
      telephoneNumber: form[4].value,
      passportNumber: form[5].value,
      password: form[6].value,
      type: 'Customer'
    })
    .then(res => navigate('/login'))
  }

  useEffect(() => {
    axios.get('http://localhost:8082/users/auth', {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.data.isLoggedIn ? navigate('/') : null)
  })

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={event => handleRegister(event)}> 
        <input placeholder="First Name" required/>
        <input placeholder="Last Name" required/>
        <input required placeholder="Email" type="email"/>
        <input placeholder="Address" required/>
        <input placeholder="Number" required/>
        <input placeholder="Passport Number" required/>
        <input placeholder="password" required type={'password'}/>
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
}

export default SignUpScreen;