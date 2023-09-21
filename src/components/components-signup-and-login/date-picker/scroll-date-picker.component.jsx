import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ScrollDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
        setSelectedDate(date);
  };

  return (
        <div className="scroll-date-picker-section">
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy" // Customize date format
                showMonthDropdown // Enable month dropdown
                showYearDropdown // Enable year dropdown
                dropdownMode="select" // Use a dropdown for month and year selection
            />
    </div>
  );
}

export default ScrollDatePicker;
