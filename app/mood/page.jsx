"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import NavBar from '../navBar';
import Wrapper from '../wrapper';
import {pageObject} from '../../constants/emotionPageData';

const MoodPage = () => {
  const [mood, setMood] = useState('');
  const router = useRouter();

  const handleMoodSelection = (e) => {
    const eValue =e.target.value
    setMood(eValue);
    if (eValue) {
      // Navigate to a route like "/mood/[moodName]", where moodName is dynamic
      const userData = JSON.parse(sessionStorage.getItem("user_data"))
      userData['emotion'] = eValue
      router.push(`/emotions?mood=${eValue.toLowerCase()}`);
    } else {
      alert('Please select a mood first.');
    }
  };

  // const handleDontKnowClick = () => {
  //   // Check if a mood has been selected
  //   if (mood) {
  //     // Navigate to a route like "/mood/[moodName]", where moodName is dynamic
  //     router.push(`/emotions/${mood.toLowerCase()}`);
  //   } else {
  //     // Optionally handle the case where no mood is selected
  //     alert('Please select a mood first.');
  //   }
  // };

  const updateSpreadsheet = (userData, selectedMood) => {

    const username = localStorage.getItem('username');

    // Check if username is not found, which means the user is not logged in
    if (!username) {
      alert('User not identified, please log in.');
      // Optionally, redirect the user to the login page
      router.push('/login');
      return; // Exit the function if no user is found
    }

    // const updateData = {
    //    //Day: today.toISOString().split('T')[0],
    //    //User: 'user1', // This should be dynamically set according to your application's user system
    //   // Emotion: selectedMood,
    //    //'Mood Rating': 5, // Placeholder value, this should be updated accordingly

    //   User: username, // Use the retrieved username
    //   Emotion: selectedMood, // The selected emotion to update

    // };

    fetch('https://api.apispreadsheets.com/data/GihJ1rodL7lT2xP7/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include other headers if required, such as authorization tokens
      },
      body: JSON.stringify({ data: [userData] })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response;
      })
      .then(data => {
        router.push(`/emotions?mood=${selectedMood.toLowerCase()}`);
      })
      .catch(error => {
        console.log('Failed to move to the next page.');
      });
  };

  const handleDontKnowClick = () => {
    if (mood) {
      // Navigate to a route like "/mood/[moodName]", where moodName is dynamic
      const userData = JSON.parse(sessionStorage.getItem("user_data"))
      userData['emotion'] = mood

      updateSpreadsheet(userData, mood);
      // router.push(`/emotions?mood=${mood.toLowerCase()}`);
    } else {
      alert('Please select a mood first.');
    }
  };


  const styles = {
    moodPage: {
      fontFamily: 'Garamond, Georgia, serif',
      color: '#1a4548',
      padding: '40px',
      background: '#f8f4e4',
    },
    header: {
      fontSize: '20px',
      textAlign: 'center',
      marginBottom: '20px',
      padding: '0 40px'
    },
    mainHeading: {
      textAlign: 'center',
      fontSize: '50px',
      margin: '40px 0',
    },
    moodOptions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      paddingBottom: '20px',
    },
    moodButton: {
      padding: '10px 0',
      border: '1px solid #1a4548',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: '18px',
      transition: 'background-color 0.3s',
      borderRadius: '5px',
    },
    selected: {
      backgroundColor: '#1a4548',
      color: '#fff',
    },
    dontKnowButton: {
      padding: '10px',
      textAlign: 'center',
      backgroundColor: 'transparent',
      border: '1px solid #1a4548',
      cursor: 'pointer',
      fontSize: '18px',
      display: 'block',
      width: 'auto',
      margin: '20px auto',
    },
    bottomNav: {
      position: 'fixed', // Changed from 'flex' to 'fixed'
      bottom: '0', // Set to '0' to stick to the bottom
      left: '0', // Align to the left side
      width: '100%', // Full width
      display: 'flex',
      justifyContent: 'space-around',
      borderTop: '1px solid #1a4548',
      backgroundColor: '#f8f4e4', // Match the background color of your app
    },
    navButton: {
      padding: '10px 20px', // You can adjust padding to change the button size
      fontSize: '18px',
      width: '150px', // Set width as desired
      height: '50px', // Set height as desired
      margin: '10px', // Optionally add margins
      // Add other styles such as border, borderRadius, etc.
    },
    navImage: {
      // You might want to set a specific width and height for your image
      width: '35px', // example size
      height: '35px', // example size
    },

    linkBack: {
      display: 'block',
      textAlign: 'center',
      marginTop: '20px',
      textDecoration: 'underline',
    },

  };

  return (
    <Wrapper>
    <header style={styles.header}>
      <h1>Your Mood Tracker</h1>
    </header>
    <div>
      <h1 style={styles.header}>What word would you use to describe your mood?</h1>
      <div style={styles.moodOptions}>
        {pageObject.map((moodOption) => (
          <label key={moodOption.pageLabel} style={mood === moodOption.pageLabel ? { ...styles.moodButton, ...styles.selected } : styles.moodButton}>
            <input
              type="radio"
              name="moodOption"
              value={moodOption.pageLabel}
              checked={mood === moodOption.pageLabel}
              onChange={handleMoodSelection}
            />
            {moodOption.pageLabel}
          </label>
        ))}
      </div>
      {/* <button
        onClick={handleDontKnowClick}
        style={styles.dontKnowButton}
      >
        Next
      </button> */}
    </div>
    <NavBar />
  </Wrapper>
  );
};

export default MoodPage;
