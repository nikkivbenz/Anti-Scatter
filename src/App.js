import React, { useState, useEffect, useCallback } from 'react';

function playSound(name) {
  let audio = new Audio(name);
  audio.play();
  return audio; // Return the audio element to control it
}

function showNotification(message) {
  if ('Notification' in window) {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        new Notification('AFK Timer', {
          body: message,
        });
      }
    });
  }
}

function AFKTimer() {
  const [afkTime, setAfkTime] = useState(20); // Initial AFK time in minutes
  const [timer, setTimer] = useState(0);
  const [audio, setAudio] = useState(null); // Store the audio element

  // Wrap the resetTimer function in useCallback
  const resetTimer = useCallback(() => {
    setTimer(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000); // Update timer every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer >= afkTime * 60) {
      // User has been away for the specified time
      if (audio) {
        // Pause and reset the audio element
        audio.pause();
        audio.currentTime = 0;
      }
      // Play the sound
      const newAudio = playSound('Alarm.wav');
      setAudio(newAudio);
      // Show the notification
      showNotification('You have been AFK for too long!');
      // Reset the timer
      resetTimer();
    }
  }, [timer, afkTime, audio, resetTimer]);

  useEffect(() => {
    const handleMouseMove = () => {
      // Reset the timer when the user moves the mouse
      resetTimer();
      if (audio) {
        // Pause and reset the audio element
        audio.pause();
        audio.currentTime = 0;
      }
    };

    // Add a mousemove event listener to reset the timer
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [audio, resetTimer]);

  const handleAfkTimeChange = (event) => {
    const newAfkTime = parseInt(event.target.value, 10);
    setAfkTime(newAfkTime);
    // Reset the timer when the AFK time is changed
    resetTimer();
    if (audio) {
      // Pause and reset the audio element
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <div>
      <h1>AFK Timer</h1>
      <p>Set the AFK time (minutes):</p>
      <input
        type="number"
        value={afkTime}
        onChange={handleAfkTimeChange}
        min="1"
      />
      <p>Time elapsed: {timer} seconds</p>
      <p>Move your mouse to reset the timer.</p>
    </div>
  );
}

export default AFKTimer;