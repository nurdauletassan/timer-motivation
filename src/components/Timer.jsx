import { useState, useEffect } from 'react';
import { useTimer } from '../context/TimerContext';
import TimeUnit from './TimeUnit';
import QuickSelectButton from './QuickSelectButton';
import TimeAdjustButton from './TimeAdjustButton';
import Quote from './Quote';
import './Timer.css';

const Timer = () => {
  const {
    timeLeft,
    setTimeLeft,
    isRunning,
    setIsRunning,
    startTimer,
    pauseTimer,
    resetTimer: contextResetTimer,
    completeSession
  } = useTimer();
  
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning && timeLeft >= 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            setIsRunning(false);
            completeSession();
            setShowConfetti(true);
            setShowQuote(true);
            setTimeout(() => setShowConfetti(false), 5000);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, timeLeft, setIsRunning, completeSession]);

  useEffect(() => {
    if (isRunning) {
      const h = Math.floor(timeLeft / 3600);
      const m = Math.floor((timeLeft % 3600) / 60);
      const s = timeLeft % 60;

      setHours(h.toString().padStart(2, '0'));
      setMinutes(m.toString().padStart(2, '0'));
      setSeconds(s.toString().padStart(2, '0'));
    }
  }, [timeLeft, isRunning]);

  const handleQuickSelect = (minutes) => {
    setHours('00');
    setMinutes(minutes.toString().padStart(2, '0'));
    setSeconds('00');
  };

  const handleStart = () => {
    const totalSeconds = 
      (parseInt(hours) || 0) * 3600 + 
      (parseInt(minutes) || 0) * 60 + 
      (parseInt(seconds) || 0);
    
    startTimer(totalSeconds);
  };

  const handleReset = () => {
    contextResetTimer();
    setHours('00');
    setMinutes('00');
    setSeconds('00');
    setShowConfetti(false);
  };

  const handleAdjustTime = (adjustment) => {
    if (isRunning) return;
    
    const totalSeconds = 
      (parseInt(hours) || 0) * 3600 + 
      (parseInt(minutes) || 0) * 60 + 
      (parseInt(seconds) || 0);
    
    const newTotalSeconds = Math.max(0, totalSeconds + adjustment);
    
    const h = Math.floor(newTotalSeconds / 3600);
    const m = Math.floor((newTotalSeconds % 3600) / 60);
    const s = newTotalSeconds % 60;

    setHours(h.toString().padStart(2, '0'));
    setMinutes(m.toString().padStart(2, '0'));
    setSeconds(s.toString().padStart(2, '0'));
  };

  const handleTryAgain = () => {
    setShowQuote(false);
    handleReset();
  };

  const shouldShowHours = () => {
    return parseInt(hours) > 0;
  };

  return (
    <div className="timer-container">
      {showConfetti && <div className="confetti" />}
      
      {!showQuote && (
        <>
          {!isRunning && (
            <div className="quick-select">
              <QuickSelectButton minutes={5} onClick={handleQuickSelect} />
              <QuickSelectButton minutes={15} onClick={handleQuickSelect} />
              <QuickSelectButton minutes={25} onClick={handleQuickSelect} />
              <QuickSelectButton minutes={45} onClick={handleQuickSelect} />
            </div>
          )}
          
          <div className={`timer-display-wrapper ${isRunning ? 'running' : ''}`}>
            {!isRunning && (
              <TimeAdjustButton 
                value={-30}
                onClick={handleAdjustTime}
                disabled={isRunning}
              />
            )}

            <div className="timer-display">
              {(!isRunning || shouldShowHours()) && (
                <>
                  <TimeUnit
                    value={hours}
                    onChange={setHours}
                    label="Hours"
                    min="0"
                    max="23"
                    disabled={isRunning}
                  />
                  {isRunning && <span className="time-separator">:</span>}
                </>
              )}
              
              <TimeUnit
                value={minutes}
                onChange={setMinutes}
                label="Minutes"
                min="0"
                max="59"
                disabled={isRunning}
              />
              {isRunning && <span className="time-separator">:</span>}
              
              <TimeUnit
                value={seconds}
                onChange={setSeconds}
                label="Seconds"
                min="0"
                max="59"
                disabled={isRunning}
              />
            </div>

            {!isRunning && (
              <TimeAdjustButton 
                value={30}
                onClick={handleAdjustTime}
                disabled={isRunning}
              />
            )}
          </div>

          <div className="timer-controls">
            {!isRunning ? (
              <button 
                className="start-btn"
                onClick={handleStart}
                disabled={!hours && !minutes && !seconds}
              >
                Start Timer
              </button>
            ) : (
              <button 
                className="pause-btn"
                onClick={pauseTimer}
              >
                Pause
              </button>
            )}
            
            <button 
              className="reset-btn"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </>
      )}

      {showQuote && <Quote onTryAgain={handleTryAgain} />}
    </div>
  );
};

export default Timer; 