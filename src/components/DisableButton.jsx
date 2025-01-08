import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Button = ({ text, onClick, disabled, variant = 'primary' }) => {
  const [color, setColor] = useState('#ABABAB');
  const baseStyles = `px-4 py-2 rounded text-white font-semibold transition-colors duration-300`;
  const variants = {
    primary: `bg-blue-500 hover:bg-blue-600 text-black font-normal`,
    secondary: `bg-gray-500 hover:bg-gray-600`,
    danger: `bg-red-500 hover:bg-red-600`,
  };


  useEffect( () => {
    if (disabled) {
      setColor('#ABABAB')
    } else {
      
      setColor('#6EEB83')
    }
  }, [disabled])
  

  const disabledStyles = `bg-gray-300 text-gray-500 cursor-not-allowed`;
  const activeStyles = variants[variant] || variants.primary;

  return (
    <button
      className={`${baseStyles} ${disabled ? disabledStyles : activeStyles}`}
      style={{backgroundColor: color}}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
};

export default Button;
