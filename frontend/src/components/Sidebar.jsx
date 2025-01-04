import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
import { useAuthStore } from '../store/authUser';

const Sidebar = () => {

  const { logout } = useAuthStore();
  return (
    <div className="bg-gray-600 w-60 text-white">
      <ul className="space-y-1">
        <li>
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              `p-4 block text-center cursor-pointer ${
                isActive ? 'bg-gray-700' : 'bg-gray-500 hover:bg-gray-700'
              }`
            }
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user/add-task"
            className={({ isActive }) =>
              `p-4 block text-center cursor-pointer ${
                isActive ? 'bg-gray-700' : 'bg-gray-500 hover:bg-gray-700'
              }`
            }
          >
            Add Task
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user/manage-tasks"
            className={({ isActive }) =>
              `p-4 block text-center cursor-pointer ${
                isActive ? 'bg-gray-700' : 'bg-gray-500 hover:bg-gray-700'
              }`
            }
          >
            Manage Tasks
          </NavLink>
        </li>
        <li
          className="p-4 text-center cursor-pointer bg-gray-500 hover:bg-gray-700"
          onClick={logout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
