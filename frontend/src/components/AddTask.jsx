import React, { useState } from 'react';
import { useAuthStore } from '../store/authUser';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Auth/Footer';
import { useNavigate } from 'react-router-dom'; 

const AddTask = () => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const { addTask, isAddTask } = useAuthStore();
  
  // const navigate = useNavigate(); 

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask({ title, description })
    // navigate('/manage-tasks')
  };

  return (
    <div>
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-6">
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Task</h2>
            <form onSubmit={handleAddTask}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 h-48"
                  placeholder="Enter task description"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Create Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
    </div>
  );
};

export default AddTask;
