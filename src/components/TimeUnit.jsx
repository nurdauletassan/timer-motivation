import { useState } from 'react';
import './TimeUnit.css';

const TimeUnit = ({ value, onChange, label, min, max, disabled }) => {
  const [tempValue, setTempValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    if (disabled) return;
    setIsFocused(true);
    setTempValue('');
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!tempValue) {
      setTempValue(value);
    } else {
      const numValue = parseInt(tempValue);
      if (isNaN(numValue) || numValue < parseInt(min) || numValue > parseInt(max)) {
        setTempValue(value);
      } else {
        onChange(tempValue.padStart(2, '0'));
      }
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue === '' || /^\d{0,2}$/.test(newValue)) {
      setTempValue(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return (
    <div className="time-unit">
      <input
        type="number"
        value={isFocused ? tempValue : value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        min={min}
        max={max}
        disabled={disabled}
      />
      <span>{label}</span>
    </div>
  );
};

export default TimeUnit; 