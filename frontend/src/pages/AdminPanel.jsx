import { useState, useEffect } from 'react';
import { adminAPI } from '../api/index.js';
import toast from 'react-hot-toast';
import './AdminPanel.css';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await adminAPI.getAllUsers();
        setUsers(res.data.data.users);
      } catch (error) {
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="admin-header animate-fade-in">
          <div>
            <h1 className="admin-title">🛡️ Admin Panel</h1>
            <p className="admin-subtitle">Manage users and monitor platform activity</p>
          </div>
          <div className="admin-badge">
            <span className="badge badge-admin">Admin Access</span>
          </div>
        </div>

        <div className="admin-stats animate-fade-in">
          <div className="stat-card glass-card">
            <div className="stat-value">{users.length}</div>
            <div className="stat-label">Total Users</div>
            <div className="stat-icon">👥</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-value stat-completed">
              {users.filter((u) => u.role === 'admin').length}
            </div>
            <div className="stat-label">Admins</div>
            <div className="stat-icon">🛡️</div>
          </div>
          <div className="stat-card glass-card">
            <div className="stat-value stat-progress">
              {users.filter((u) => u.role === 'user').length}
            </div>
            <div className="stat-label">Regular Users</div>
            <div className="stat-icon">👤</div>
          </div>
        </div>

        <div className="admin-table-wrapper glass-card animate-slide-up">
          <div className="admin-table-header">
            <h2 className="admin-table-title">All Users</h2>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <h3 className="empty-state-title">No users found</h3>
            </div>
          ) : (
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user._id} className={`animate-fade-in stagger-${Math.min(i + 1, 5)}`} style={{ opacity: 0 }}>
                      <td>
                        <div className="user-cell">
                          <div className="user-cell-avatar">
                            {user.name?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <span className="user-cell-name">{user.name}</span>
                        </div>
                      </td>
                      <td className="user-cell-email">{user.email}</td>
                      <td>
                        <span className={`badge badge-${user.role}`}>{user.role}</span>
                      </td>
                      <td className="user-cell-date">{formatDate(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
