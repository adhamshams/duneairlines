import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminHomeScreen from './screens/AdminHomeScreen.js';
import AdminFlightScreen from './screens/AdminFlightScreen.js';
import AdminCreateFlightScreen from './screens/AdminCreateFlightScreen';
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import SignUpScreen from './screens/SignUpScreen.js';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminHomeScreen />}/>
          <Route path="/admin/flights" element={<AdminFlightScreen />}/>
          <Route path="/admin/flights/create" element={<AdminCreateFlightScreen />}/>
          <Route path="/" element={<HomeScreen />}/>
          <Route path="/login" element={<LoginScreen />}/>
          <Route path="/signup" element={<SignUpScreen />}/>
          <Route path="/profile" element={<ProfileScreen />}/>
          <Route path='/search/:from/:to/:cabin/:pcount/:fromDate/:toDate' element={<SearchScreen />} />
        </Routes>
    </BrowserRouter>
    );
  }
}

export default App;
