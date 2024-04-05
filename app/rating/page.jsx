"use client"
import React from 'react';
import Link from 'next/link'
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import NavBar from '../navBar';


const MoodRatingPage = () => {
  // Add your own logic to handle mood rating
  // const handleMoodRating = (rating) => {
  //   console.log(`User rated mood as: ${rating}`);
    // Implement what happens when a user rates their mood

    const router = useRouter(); // Initialize useRouter for navigation

  // Function to update the spreadsheet with mood rating and username
  const updateSpreadsheet = (username, moodRating) => {
    const today = new Date();
    const updateData = {
      //Day: today.toISOString().split('T')[0],
      User: username,
      'Mood Rating': moodRating
    };

    const resp = fetch('https://api.apispreadsheets.com/data/o4uIKexThbokIq3U/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [updateData] })
    })

    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Spreadsheet updated successfully', data);
      // Navigate to another page or show a message after successful update
      router.push('/mood'); // Navigate to a mood page or back to the main page
    })
    .catch(error => {
      console.error('Failed to update mood data.', error);
      alert('Failed to update mood data.');
    });
  };

  const handleMoodRating = (rating) => {
    console.log(`User rated mood as: ${rating}`);
    // Retrieve the username from local storage
    const username = localStorage.getItem('username');
    if (!username) {
      alert('User not identified, please log in.');
      router.push('/login'); // Redirect to login page
      return;
    }
    // Update the spreadsheet with the mood rating and username
    // updateSpreadsheet(username, rating);
    const today = new Date();
    const userData  = {
        Day: today.toISOString().split('T')[0],
        User: username,
        'Mood Rating': rating,
        'emotion':''
    }
    sessionStorage.setItem("user_data", JSON.stringify(userData))
  };


  // Inline styles
  const styles = {
    moodRatingPage: {
      fontFamily: 'Times New Roman, serif',
      color: '#333',
      padding: '40px',
      background: '#f8f4e4',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    },
    header: {
      fontSize: '32px',
      textAlign: 'center',
      marginBottom: '20px',
    },
    scale: {
      fontSize: '22px',
      textAlign: 'center',
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: '600px',
    },
    moodIcon: {
      // Add your styles for the mood icons
    },
    bottomNav: {
      position: 'absolute',
      bottom: '0',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      borderTop: '1px solid #000',
    },
    navButton: {
      padding: '10px 20px',
      fontSize: '18px',
    }
  };

  return (
    <div style={styles.moodRatingPage}>
      <h1 style={styles.header}>Your Mood Tracker</h1>
      <div style={styles.scale}>
        {/* Replace with icons or images */}
        <span style={styles.moodIcon}>😟</span>
        <Link href="/mood"> 
        {Array.from({ length: 10 }, (_, i) => (
          <button key={i + 1} onClick={() => handleMoodRating(i + 1)}>
            {i + 1}
          </button>
        ))}
         </Link>
        <span style={styles.moodIcon}>😊</span>
      </div>
     <NavBar/>
    </div>
  );
};

export default MoodRatingPage;
