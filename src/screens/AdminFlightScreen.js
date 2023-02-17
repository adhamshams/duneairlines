import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";


function AdminFlightScreen(props) {

  let navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [userType, setUserType] = useState('');

  const [flights, setFlights] = useState([]);
  const {showAll, flightData} = useLocation();

  useEffect(() => {
    axios.get('http://localhost:8082/users/auth', {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.data.isLoggedIn && res.data.type === 'Admin' ? (setFirstName(res.data.firstName), setUserType(res.data.type)) : navigate('/'))
  })

  useEffect(() => {
    if(showAll){
      axios.get('http://localhost:8082/flights')
      .then(res => {
        setFlights(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      axios.post('http://localhost:8082/flights/search', flightData)
        .then(res => {
          setFlights(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [showAll, flightData])

  return (
    <div>
      <Header userType={userType} firstName={firstName}/>
      <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>From</th>
              <th>To</th>
              <th>Flight Date</th>
              <th>Cabin</th>
              <th>Seats Available</th>
              <th>Cabin</th>
              <th>Baggage Allowance</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.flightNumber}</td>
                <td>{flight.from}</td>
                <td>{flight.to}</td>
                <td>{flight.flightDate.substring(0,10)}</td>
                <td>{flight.cabin}</td>
                <td>{flight.seatsAvailableOnFlight}</td>
                <td>{flight.cabin}</td>
                <td>{flight.baggageAllowance}</td>
                <td>{flight.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default AdminFlightScreen;
