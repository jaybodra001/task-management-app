import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Auth/Footer';

const ManageTasks = () => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Manage Tasks</h2>

            <div className="mb-4">
              <button className="p-2 bg-blue-500 text-white rounded">
                Add Task
              </button>
            </div>

            {/* Task List */}
            <div>
              <h3 className="text-xl mb-2">Tasks</h3>
              <div className="mb-2 p-4 border bg-gray-100 rounded">
                <h4 className="font-bold">HI JAY</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sit asperiores
                  excepturi nam consequatur pariatur soluta obcaecati commodi molestias, possimus
                  repudiandae placeat consectetur ratione ullam cum accusamus esse a nemo.
                </p>
                <div className="flex space-x-2 mt-2">
                  <button className="p-2 bg-green-500 text-white rounded">Mark as</button>
                  <button className="p-2 bg-yellow-500 text-white rounded">Edit</button>
                  <button className="p-2 bg-red-500 text-white rounded">Delete</button>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button className="p-2 bg-gray-500 text-white rounded">Previous</button>
              <span className="self-center">1</span>
              <button className="p-2 bg-gray-500 text-white rounded">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ManageTasks;
