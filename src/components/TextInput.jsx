import React from 'react';

const TextInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div className='w-[70%]'>
      {label && <label style={styles.label}>{label}</label>}
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        style={styles.input} 
      />
    </div>
  );
};

const styles = {
  inputContainer: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '4px',
    fontSize: '17px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  }
};

export default TextInput;