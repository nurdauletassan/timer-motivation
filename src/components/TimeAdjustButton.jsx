import './TimeAdjustButton.css';

const TimeAdjustButton = ({ value, onClick, disabled }) => {
  return (
    <button 
      className={`time-adjust-btn ${value > 0 ? 'plus' : 'minus'}`}
      onClick={() => onClick(value)}
      disabled={disabled}
    >
      {value > 0 ? `+${value}` : value}
    </button>
  );
};

export default TimeAdjustButton; 