import React, { useState } from 'react';

const Register = () => {
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form  className="w-full max-w-md p-6 bg-white border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {/* Name Field */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Register
      </button>
    </form>
    </div>
  );
};

export default Register;
