import { useState } from 'react';
import { TimerProvider } from './context/TimerContext';
import { ThemeProvider } from './context/ThemeContext';
import Timer from './components/Timer';
import ThemeToggle from './components/ThemeToggle';
import NameInput from './components/NameInput';
import './App.css';

function App() {
  // Store user's name in state and localStorage
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('timer-username') || '';
  });

  // Handle when user submits their name
  const handleNameSubmit = (name) => {
    setUserName(name);
    localStorage.setItem('timer-username', name);
  };

  return (
    <ThemeProvider>
      <TimerProvider>
        <div className="app">
          <ThemeToggle />
          <header>
            <h1>Motivational Timer</h1>
            {userName && <p>Welcome back, {userName}!</p>}
          </header>

          <main>
            {!userName ? (
              <NameInput onNameSubmit={handleNameSubmit} />
            ) : (
              <Timer />
            )}
          </main>
        </div>
      </TimerProvider>
    </ThemeProvider>
  );
}

export default App;
