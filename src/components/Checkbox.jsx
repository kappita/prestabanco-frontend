import React, { useState } from 'react';

function Checkbox({ label, isChecked, onChange }) {

  const handleChange = (e) => {
    onChange(e.target.checked) // Call the onChange prop with the new state
  };

  return (
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        style={{ marginRight: '8px' }}
      />
      {label}
    </label>
  );
}

export default Checkbox;
