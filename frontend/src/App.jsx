import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import UserDash from './pages/UserDash';
import { useAuthStore } from './store/authUser'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

function App() {

  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log('user is here',user)

  useEffect(() => {
		authCheck();
	}, [authCheck]);


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<UserDash />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App
