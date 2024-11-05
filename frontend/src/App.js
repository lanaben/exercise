import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header';
import Footer from './components/Footer';
import { fetchUsers } from './services/userService';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    getUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) => 
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(updatedUser);
  };

  const handleUserDelete = (deletedUser) => {
    setUsers((prevUsers) => 
      prevUsers.filter((user) => user.id !== deletedUser.id)
    );
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar users={users} onUserSelect={handleUserSelect} />
        <MainContent 
          user={selectedUser} 
          onUpdateUser={handleUserUpdate} 
          onDeleteUser={handleUserDelete}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
