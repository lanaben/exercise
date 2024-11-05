import React, { useState, useEffect } from 'react';
import { updateUser, deleteUser } from '../services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function MainContent({ user, onUpdateUser, onDeleteUser }) {
  const [editMode, setEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState(user);

  useEffect(() => {
    setEditableUser(user);
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const updatedUser = await updateUser(user.id, editableUser);
    if (updatedUser) {
      onUpdateUser(updatedUser);
      toast.success("User updated successfully.");
      setEditMode(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
      onDeleteUser(user);
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  if (!user) {
    return <main className="p-8 text-center pt-16 text-gray-500">Select a user from the sidebar to view details.</main>;
  }

  return (
    <main className="flex-1 pt-16 px-8">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={true} />
      <div className="bg-white p-6 mx-auto">
        {editMode ? (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-6">Edit User</h2>
            <form className="space-y-4">
              {['firstName', 'lastName', 'email', 'age', 'gender', 'phone'].map((field) => (
                <label key={field} className="block">
                  <span className="block font-semibold capitalize">{field}:</span>
                  <input
                    type={field === 'age' ? 'number' : 'text'}
                    name={field}
                    value={editableUser[field] || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                  />
                </label>
              ))}
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-secondary text-white font-semibold hover:opacity-90 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold hover:opacity-90 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-4">{user.firstName} {user.lastName}</h2>
            <div className="space-y-2 text-gray-700">
              {['email', 'age', 'gender', 'phone'].map((field) => (
                <p key={field}><strong className="capitalize">{field}:</strong> {user[field]}</p>
              ))}
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="mt-6 px-4 py-2 bg-secondary text-white font-semibold hover:opacity-90 transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete()}
              className="mt-6 mx-2 px-4 py-2 bg-red-800 text-white font-semibold hover:opacity-90 transition"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default MainContent;
