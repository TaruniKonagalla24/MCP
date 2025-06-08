import React from 'react';
import './AdminUsers.css';
import BackToAdminDashboard from './BackToAdminDashboard';
const usersMock = [
  { id: 1, username: 'user1', progress: 70 },
  { id: 2, username: 'user2', progress: 40 },
  { id: 3, username: 'user3', progress: 90 },
];

const AdminUsers = () => {
  return (
    <div className="admin-users-container">
        <BackToAdminDashboard />
      <h2>Users & Progress</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {usersMock.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${user.progress}%` }}
                  >
                    {user.progress}%
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
