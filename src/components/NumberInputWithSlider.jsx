import React, { useState } from "react";

function NumberInputWithSlider({label, min, max, onChange}) {
  const [value, setValue] = useState(min); // Default value in range

  const roundToOneDecimal = (num) => Math.round(num * 10) / 10;

  const handleChange = (e) => {
    const newValue = Math.max(min, Math.min(max, Number(e.target.value)));
    setValue(newValue);
    onChange(newValue)
  };

  const handleSliderChange = (e) => {
    setValue(Number(e.target.value));
    onChange(Number(e.target.value))
  };

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={0.001}
        onChange={handleSliderChange}
        style={{ width: '300px' }}
      />
      <div>Interés seleccionado: {roundToOneDecimal(value * 100)}%</div>
    </div>
  );
}

export default NumberInputWithSlider;
