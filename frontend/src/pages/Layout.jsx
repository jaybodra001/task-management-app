import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';

const Layout = () => {
  const { logout } = useAuthStore();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-600 w-60 text-white">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/profile"
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
              to="/add-task"
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
              to="/manage-tasks"
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

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet /> {/* This renders the matched route's component */}
      </div>
    </div>
  );
};

export default Layout;
