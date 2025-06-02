import { useState } from 'react';
import './NameInput.css';

const NameInput = ({ onNameSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="name-input-container">
      <h2>Welcome to Motivational Timer</h2>
      <p>Please enter your name to get started</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="name-input"
          autoFocus
        />
        <button 
          type="submit" 
          className="start-btn"
          disabled={!name.trim()}
        >
          Start Your Journey
        </button>
      </form>
    </div>
  );
};

export default NameInput; 