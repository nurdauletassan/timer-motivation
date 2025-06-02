import { createContext, useState, useContext, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem('timer-sessions');
    return savedSessions ? JSON.parse(savedSessions) : [];
  });
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    localStorage.setItem('timer-sessions', JSON.stringify(sessions));
  }, [sessions]);

  const startTimer = (duration) => {
    if (duration <= 0) return; // 🚨 Защита от нуля или отрицательных значений
    setTimeLeft(duration);
    setIsRunning(true);
    setCurrentSession({
      startTime: Date.now(),
      duration,
      completed: false
    });
  };
  

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(0);
    setIsRunning(false);
    setCurrentSession(null);
  };

  const completeSession = () => {
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        completed: true,
        endTime: Date.now()
      };
      setSessions(prev => [...prev, completedSession]);
      setCurrentSession(null);
    }
  };

  return (
    <TimerContext.Provider value={{
      timeLeft,
      setTimeLeft,
      isRunning,
      setIsRunning,
      sessions,
      currentSession,
      startTimer,
      pauseTimer,
      resetTimer,
      completeSession
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}; 