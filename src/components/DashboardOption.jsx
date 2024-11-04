

import React from 'react';

const DashboardOption = ({ icon, title, description, onClick }) => {
  return (
    <button style={styles.button} onClick={onClick}>
      <div style={styles.iconContainer}>{icon}</div>
      <div style={styles.textContainer}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.description}>{description}</p>
      </div>
    </button>
  );
};

const styles = {
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: 'none',
    borderRadius: '15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '18px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s',
    width: '100%',      // Takes full width in grid item
    height: '100%',     // Adjust height as needed
    textAlign: 'center',
  },
  iconContainer: {
    fontSize: '30px',
    marginBottom: '10px',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    margin: 0,
  },
  description: {
    fontSize: '14px',
    margin: '5px 0 0',
  },
};

export default DashboardOption