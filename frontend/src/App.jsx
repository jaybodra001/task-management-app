import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Register />    
      <Login />
      <h1 className="text-3xl font-bold underline">
        Jay Mataji
      </h1>
    </>
  )
}

export default App
