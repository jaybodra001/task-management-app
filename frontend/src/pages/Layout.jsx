import React, { useState } from 'react';
import AddTask from '../components/AddTask';
import ManageTasks from '../components/ManageTasks'; // Assuming you have this component

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState('addTask');

  const handleClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-600 w-60 text-white">
        <ul className="space-y-4">
          <li
            className="p-4 hover:bg-gray-700 cursor-pointer text-center"
            onClick={() => handleClick('addTask')}
          >
            Add Task
          </li>
          <li
            className="p-4 hover:bg-gray-700 cursor-pointer text-center"
            onClick={() => handleClick('manageTasks')}
          >
            Manage Tasks
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeComponent === 'addTask' && <AddTask />}
        {activeComponent === 'manageTasks' && <ManageTasks />}
      </div>
    </div>
  );
};

export default Layout;
