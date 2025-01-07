import React, { useState } from 'react';
import { nationalities } from '../utils/nationalities';

const Dropdown = ({label, elements, onSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleSelect = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    onSelect(country);
  };

  return (
    <div style={styles.container}>
      <select 
        value={selectedCountry} 
        onChange={handleSelect} 
        style={styles.select}
      >
        
        <option value="" disabled>{label}  ▼
        </option>
        {elements.map((val, index) => (
          <option key={index} value={val}>
            {val}
          </option>
        ))}
      </select>
      
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
  },
  select: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    appearance: 'none',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
};

export default Dropdown;
