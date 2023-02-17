import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function LoginScreen(props) {

  let navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault()
    const form = e.target
    axios.post('http://localhost:8082/users/signin', {
      email: form[0].value,
      password: form[1].value,
    })
    .then(res => {
      localStorage.setItem("token", res.data.token);
      navigate('/')
    })
  }

  useEffect(() => {
    axios.get('http://localhost:8082/users/auth', {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.data.isLoggedIn ? navigate('/') : null)
  }, [])

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={event => handleLogin(event)}> 
        <input placeholder="Email" required/>
        <input placeholder="Password" required type={'password'}/>
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
}

export default LoginScreen;