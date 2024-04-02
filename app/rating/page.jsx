"use client"
import React from 'react';
import Link from 'next/link'

const MoodRatingPage = () => {
  // Add your own logic to handle mood rating
  const handleMoodRating = (rating) => {
    console.log(`User rated mood as: ${rating}`);
    // Implement what happens when a user rates their mood
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
      <div style={styles.bottomNav}>
        <button style={styles.navButton}>Home</button>
        <button style={styles.navButton}>Stats</button>
        <button style={styles.navButton}>Badges</button>
      </div>
    </div>
  );
};

export default MoodRatingPage;
