import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale/es';
registerLocale('es', es)

const BirthdatePicker = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(selectedDate)
    onDateChange(date);
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>Seleccione su fecha de nacimiento:</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        locale="es"
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}  // Allows scrolling through last 100 years
        placeholderText="Seleccione su fecha de nacimiento"
        maxDate={new Date()}  // Disable future dates
        style={styles.datePicker}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
  },
};

export default BirthdatePicker;
