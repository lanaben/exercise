import React, { useState, useEffect } from 'react';
import { updateUser, deleteUser } from '../services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';
import FormField from './FormField';

const MainContent = ({ user, onUpdateUser, onDeleteUser }) => {
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
      toast.success('User updated successfully.');
      setEditMode(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
      onDeleteUser(user);
    } catch (error) {
      toast.error('Failed to delete user. Please try again.');
    }
  };

  if (!user) {
    return <main className="p-8 text-center pt-16 text-gray-500">Select a user from the sidebar to view details.</main>;
  }

  const fieldLabels = {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    age: 'Age',
    gender: 'Gender',
    phone: 'Phone'
  };

  return (
    <main className="flex-1 pt-16 px-8">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={true} />
      <div className="bg-white p-6 mx-auto">
        {editMode ? (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-6">Edit User</h2>
            <form className="space-y-4">
              {['firstName', 'lastName', 'email', 'age', 'gender', 'phone'].map((field) => (
                <FormField
                  key={field}
                  label={fieldLabels[field]}
                  type={field === 'age' ? 'number' : 'text'}
                  name={field}
                  value={editableUser[field]}
                  onChange={handleChange}
                />
              ))}
              <div className="flex justify-end mt-6 space-x-3">
                <Button onClick={handleSave} text="Save" className="bg-secondary text-white" />
                <Button onClick={() => setEditMode(false)} text="Cancel" className="bg-gray-300 text-gray-700" />
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {user.firstName} {user.lastName}
            </h2>
            <div className="space-y-2 text-gray-700">
              {['email', 'age', 'gender', 'phone'].map((field) => (
                <p key={field}>
                  <strong className="capitalize">{fieldLabels[field]}:</strong> {user[field]}
                </p>
              ))}
            </div>
            <div className="mt-6 space-x-2">
              <Button onClick={() => setEditMode(true)} text="Edit" className="bg-secondary text-white" />
              <Button onClick={handleDelete} text="Delete" className="bg-red-800 text-white" />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default MainContent;
