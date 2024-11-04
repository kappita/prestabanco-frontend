import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>My Website</h1>
    </header>
  );
};

const styles = {
  header: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: '24px',
  }
};

export default Header;