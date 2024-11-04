import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer style={styles.footer}>
      <p>&copy; 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
    
  );
};

const styles = {
  footer: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    bottom: 0,
    width: '100%',
  }
};

export default Footer;