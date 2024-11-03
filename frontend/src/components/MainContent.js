import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainContent({ user, onUpdateUser }) {
  const [editMode, setEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState(user);

  useEffect(() => {
    setEditableUser(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`https://dummyjson.com/users/${user.id}`, {
        firstName: editableUser.firstName,
        lastName: editableUser.lastName,
        email: editableUser.email,
        username: editableUser.username,
        age: editableUser.age,
        address: editableUser.address,
        phone: editableUser.phone,
      });
      onUpdateUser(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (!user) {
    return <main className="main-content mt-16 ml-5">Select a user from the sidebar to view more details.</main>;
  }

  return (
    <main className="main-content">
      {editMode ? (
        <div className="bg-white rounded-lg p-6 max-w-md mx-5 mt-16 shadow-md">
          <h2 className="text-2xl font-bold text-primary mb-6">Edit User</h2>
          <form className="space-y-4 text-primary">
            {[
              { label: 'First Name', name: 'firstName', type: 'text', value: editableUser.firstName },
              { label: 'Last Name', name: 'lastName', type: 'text', value: editableUser.lastName },
              { label: 'Email', name: 'email', type: 'email', value: editableUser.email },
              { label: 'Username', name: 'username', type: 'text', value: editableUser.username },
              { label: 'Age', name: 'age', type: 'number', value: editableUser.age },
              {
                label: 'City', name: 'city', type: 'text', value: editableUser.address.city,
                onChange: e => setEditableUser({ ...editableUser, address: { ...editableUser.address, city: e.target.value } })
              },
              { label: 'Phone', name: 'phone', type: 'text', value: editableUser.phone },
            ].map(({ label, name, type, value, onChange = handleChange }) => (
              <label key={name} className="block font-semibold">
                {label}:
                <input
                  type={type}
                  name={name}
                  value={value}
                  onChange={onChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </label>
            ))}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleSave}
                type="button"
                className="px-4 py-2 bg-secondary text-white font-semibold rounded-lg shadow-md hover:opacity-70 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg p-6 max-w-md mx-5 mt-16">
            <h2 className="text-2xl font-bold text-primary mb-4">
              {user.firstName} {user.lastName}
            </h2>
            <div className="text-primary space-y-2">
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Username:</span> {user.username}</p>
              <p><span className="font-semibold">Age:</span> {user.age}</p>
              <p><span className="font-semibold">City:</span> {user.address.city}</p>
              <p><span className="font-semibold">Phone:</span> {user.phone}</p>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="mt-6 px-4 py-2 bg-secondary text-white font-semibold rounded-lg shadow-md hover:opacity-70 transition-colors"
            >
              Edit
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default MainContent;
