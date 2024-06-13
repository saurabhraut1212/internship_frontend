import React from 'react';

const MonthDropdown = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="month-select">Select Month:</label>
      <select id="month-select" value={value} onChange={onChange}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthDropdown;
