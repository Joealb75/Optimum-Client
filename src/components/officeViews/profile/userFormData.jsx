import { useState, useEffect } from 'react';
import { updateUser } from "../../../data-services/user_data.js";

export const UserFormData = ({ user, onUpdate }) => {
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setUpdatedUser({
        username: user?.username,
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateUser(user?.id, updatedUser);
      onUpdate();
      setIsEditingUser(false);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-[#228B22]"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isExpanded && (
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEditingUser ? (
                  <input
                    type="text"
                    name="username"
                    value={updatedUser.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                ) : (
                  user?.username
                )}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEditingUser ? (
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      name="first_name"
                      placeholder='First Name'
                      value={updatedUser.first_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      name="last_name"
                      placeholder='Last Name'
                      value={updatedUser.last_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                ) : (
                  `${user?.first_name} ${user?.last_name}`
                )}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEditingUser ? (
                  <input
                    type="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                ) : (
                  user?.email
                )}
              </dd>
            </div>
          </dl>
          <div className="flex justify-end px-4 py-3 bg-gray-50 sm:px-6">
            {isEditingUser ? (
              <button
                onClick={handleSaveChanges}
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-[#228B22] mr-2"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditingUser(true)}
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-[#228B22]"
              >
                Edit User Info
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


