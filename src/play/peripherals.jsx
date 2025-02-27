import React from 'react';

export function Peripherals() {
  const [timer, setTimer] = React.useState(0);
  const [currentDate, setCurrentDate] = React.useState('');

    // Increment timer every second
    React.useEffect(() => {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    // Set the current date when the component mounts
    React.useEffect(() => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setCurrentDate(formattedDate);
    }, []);
  

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      };

      return (
        <div>
        <h2>
        <label for="timer">Time:   </label>
        <input type="text" id="timer" value={formatTime(timer)} readonly />
      </h2>
      <h3>
        Daily Puzzle: {currentDate}
      </h3>
      </div>
  );

}