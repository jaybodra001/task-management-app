import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import UserDash from './pages/UserDash';
import { useAuthStore } from './store/authUser'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import Profile from './components/Profile';
import AddTask from './components/AddTask';
import ManageTasks from './components/ManageTasks';

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
          <Route path="/" element={user ? <Profile /> : <Navigate to={"/login"}/>} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to={"/user"}/>} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to={"/user"}/>} />
          <Route path="/user/" element={user ? <Profile /> : <Navigate to={"/login"}/>} />
          <Route path="/user/profile" element={<Profile /> } />
          <Route path="/user/add-task" element={<AddTask />} />
          <Route path="/user/manage-tasks" element={<ManageTasks />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App
