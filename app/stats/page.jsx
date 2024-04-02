"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  

const MoodPage = () => {
  const [mood, setMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Function to submit mood data to the API
  const submitMoodData = (moodData) => {
    setIsLoading(true);
    fetch("https://api.apispreadsheets.com/data/pUrJZ2f4dFTu3mOc/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "data": moodData }),
    }).then(res => {
      setIsLoading(false);
      if (res.status === 201) {
        setMessage('Your mood has been recorded successfully!');
      } else {
        setMessage('Failed to record your mood. Please try again.');
      }
    }).catch(error => {
      setIsLoading(false);
      setMessage('An error occurred. Please try again.');
    });
  };

  

  // Handler for when a mood is selected
  const handleMoodSelection = (event) => {
    const selectedMood = event.target.value;
    setMood(selectedMood);

    const moodData = {
      Date: new Date().toISOString().split('T')[0],
      Time: new Date().toTimeString().split(' ')[0],
      User: 'admin', // Replace with actual user ID or some identifier
      Emotion: selectedMood,
      MoodRating: moodRating // Logic to convert mood to a rating
    };

    submitMoodData(moodData);
  };

  

  
  const styles = {
    // ... Add your CSS styles as before
  };

  // JSX for your component, including event handlers that call handleMoodSelection
  return (
    <div style={styles.moodPage}>
      {isLoading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      
    </div>
  );
};

export default MoodPage;
