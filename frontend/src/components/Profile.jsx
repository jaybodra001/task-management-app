import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Auth/Footer';
import { useAuthStore } from '../store/authUser';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Populate user data when the component mounts
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  // Handle profile update
  const handleProfileUpdate = async () => {
    try {
      await updateProfile({ name, email });
    } catch (error) {
      toast.error('Failed to update profile.');
    }
  };

  // Handle password change
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('All fields are required!');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
  
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long!');
      return;
    }
  
    try {
      await changePassword({ oldPassword, newPassword });
      toast.success('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('Failed to change password.');
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Profile</h2>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="border p-2 rounded w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="p-2 bg-green-500 text-white rounded"
                onClick={handleProfileUpdate}
              >
                Update Profile
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
                    placeholder="*****************"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
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
                    placeholder="*****************"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                    placeholder="*****************"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="p-2 bg-yellow-500 text-white rounded"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
