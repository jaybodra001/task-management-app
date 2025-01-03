import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Auth/Footer";
const Home = () => {
  return <>
  <Navbar/>
  <Sidebar />
  <div className="flex-1 p-6">
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold text-gray-900">Home</h1>
    </div>
  </div>
  <Footer />
  </>;
};

export default Home;
