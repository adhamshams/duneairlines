import React from "react";
import { useNavigate } from "react-router-dom";

function Header(props) {

  let navigate = useNavigate();

  return (
    <div>
      <div onClick={() => navigate('/')}>
        <h1 onClick={() => navigate('/')}>Dune Airlines</h1>
      </div>
      {props.firstName ? 
        <h2 onClick={() => props.userType === 'Admin' ? navigate('/admin') : navigate('/profile')}>Hello {props.userType} {props.firstName}</h2>
      :
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Signup</button>
        </div>
      }
    </div>
  );
}

export default Header;
