import './QuickSelectButton.css';

const QuickSelectButton = ({ minutes, onClick }) => {
  return (
    <button onClick={() => onClick(minutes)}>
      {minutes} min
    </button>
  );
};

export default QuickSelectButton; 