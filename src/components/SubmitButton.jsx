import React from 'react';

const SubmitButton = ({ text, onClick, color = "#fff" }) => {
  const styles = {
    button: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      backgroundColor: color,
      color: "fff",
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }
  };

  return (
    <button onClick={onClick} style={styles.button}>
      {text}
    </button>
  );
};



export default SubmitButton;