import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">⚡</span>
          <span className="navbar-title">TaskFlow</span>
        </Link>

        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`navbar-link ${isActive('/admin') ? 'active' : ''}`}
                >
                  Admin
                </Link>
              )}
              <div className="navbar-user">
                <div className="navbar-avatar">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="navbar-user-info">
                  <span className="navbar-user-name">{user?.name}</span>
                  <span className={`badge badge-${user?.role}`}>{user?.role}</span>
                </div>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm" id="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`navbar-link ${isActive('/login') ? 'active' : ''}`}
              >
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
