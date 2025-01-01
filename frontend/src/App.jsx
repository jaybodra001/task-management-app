import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import UserDash from './pages/UserDash';
import Footer from './components/Auth/Footer';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserDash />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
