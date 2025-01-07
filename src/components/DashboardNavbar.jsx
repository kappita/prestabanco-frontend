import React, { useState } from 'react';
import PrestaBanco from './PrestaBancoLogo';

const DashboardNavbar = ({ userName, onLogout, onConfig }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  const closeDropdown = () => setDropdownVisible(false);

  return (
    <nav style={styles.navbar}>
      <PrestaBanco fontSize='2rem' />
      <div style={styles.userSection} onBlur={closeDropdown}>
        <button style={styles.userButton} onClick={toggleDropdown}>
          Hola, {userName}!
        </button>
        {dropdownVisible && (
          <div style={styles.dropdown}>
            <button style={styles.dropdownItem} onClick={onConfig}>Configuración</button>
            <button style={styles.dropdownItem} onClick={onLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 8rem',
    backgroundColor: '#fff',
    color: '#fff',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  userSection: {
    position: 'relative',
  },
  userButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    borderRadius: '4px',
    marginTop: '5px',
    minWidth: '120px',
    zIndex: 1,
  },
  dropdownItem: {
    width: '100%',
    padding: '10px',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    color: '#333',
  },
};

export default DashboardNavbar;