import React from 'react';

function Sidebar({ users, onUserSelect }) {
  return (
    <aside className="w-64 p-6">
      <h2 className="text-xl font-bold text-primary mb-4">Users</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onUserSelect(user)}
            className="bg-primary text-white p-4 cursor-pointer hover:opacity-90 border-4 border-border border-double transition"
          >
            <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
