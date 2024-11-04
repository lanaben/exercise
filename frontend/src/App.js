import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/users');
        console.log("Response data:", response.data); 
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setSelectedUser(updatedUser);
  };

  return (
    <div className="flex h-full w-full bg-background">
      <Sidebar users={users} onUserSelect={handleUserSelect} />
      <MainContent user={selectedUser} onUpdateUser={handleUserUpdate} />
    </div>
  );
}

export default App;
