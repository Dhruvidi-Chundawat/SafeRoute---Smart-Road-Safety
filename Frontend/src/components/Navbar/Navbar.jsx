import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Icon from '../UI/Icon';
import styles from './Navbar.module.css';
import GoogleTranslate from "../GoogleTranslate";

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/emergency', label: 'SOS', icon: 'alert' },
  { to: '/hospitals', label: 'Hospitals', icon: 'hospital' },
  { to: '/predict', label: 'AI Predict', icon: 'brain' },
  { to: '/dashboard', label: 'Analytics', icon: 'chart' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleAuth = () => {
    if (user) logout();
    else navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <NavLink to="/" className={styles.logo}>
        <Icon name="shield" size={26} color="var(--accent)" />
        <span>SAFEROUTE</span>
      </NavLink>

      {/* Desktop Links */}
      <div className={styles.links}>
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.linkActive : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Auth Button */}
      <div className={styles.right}>
        <GoogleTranslate />
        
        {user ? (
          <div className={styles.userWrap}>
            <span className={styles.userName}>
              <Icon name="user" size={15} />
              {user.name.split(' ')[0]}
            </span>
            <button className={styles.logoutBtn} onClick={handleAuth} title="Sign out">
              <Icon name="logout" size={16} />
            </button>
          </div>
        ) : (
          <button className={styles.loginBtn} onClick={handleAuth}>
            <Icon name="lock" size={14} />
            Login
          </button>
        )}

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <Icon name={icon} size={16} />
              {label}
            </NavLink>
          ))}
          <button className={styles.mobileAuth} onClick={handleAuth}>
            <Icon name={user ? 'logout' : 'lock'} size={16} />
            {user ? 'Sign Out' : 'Login'}
          </button>
        </div>
      )}
    </nav>
  );
}
