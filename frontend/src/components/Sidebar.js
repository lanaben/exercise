import React from 'react';

function Sidebar({ users = [], onUserSelect }) {
  return (
    <aside className="sidebar ml-10">
      <h2 className="text-primary mt-5 text-lg">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="user mt-5 bg-primary text-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            onClick={() => onUserSelect(user)}
          >
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
