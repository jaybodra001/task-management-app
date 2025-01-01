import React, { useState } from 'react';

const Profile = () => {

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl mb-4">Profile</h2>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2" htmlFor="name">
          Name
        </label>
          <input
            type="text"
            id="name"
            className="border p-2 rounded w-full"
          />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2" htmlFor="email">
          Email
        </label>
          <input
            type="email"
            id="email"
            className="border p-2 rounded w-full"
          />
      </div>

      <div className="flex justify-between mt-4">
          <button
            className="p-2 bg-green-500 text-white rounded"
          >
            Edit Profile
          </button>
      </div>
      <div className="mt-6">
        <h3 className="text-xl mb-4">Change Password</h3>
          <div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="old-password">
                Old Password
              </label>
              <input
                type="password"
                id="old-password"
                className="border p-2 rounded w-full"
                placeholder='*****************'
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="new-password">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="border p-2 rounded w-full"
                placeholder='*****************'
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="confirm-password">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="border p-2 rounded w-full"
                placeholder='*****************'
              />
            </div>

           
          </div>
        
          <button
            className="p-2 bg-yellow-500 text-white rounded"
          >
            Change Password
          </button>
          </div>
    </div>
  );
};

export default Profile;
