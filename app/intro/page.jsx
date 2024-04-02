"use client"
import React from 'react';
import Link from 'next/link';


const HomePage = () => {
  // Replace '[Name]' with the actual logic to retrieve the user's name
  const userName = 'admin'; 

  // Inline styles to match the design
  const styles = {
    page: {
      fontFamily: '"Libre Franklin", Libre',
      color: '#000',
      padding: '40px',
      background: '#f8f4e4',
      minHeight: '100vh',
    },
    header: {
      borderBottom: '1px solid #000',
      paddingBottom: '20px',
      marginBottom: '40px',
      textAlign: 'center',
    },
    greeting: {
      fontSize: '24px',
      fontStyle: 'italic',
    },
    mainContent: {
      textAlign: 'center',
    },
    trackButton: {
      backgroundColor: '#C6E0D3',
      color: '#000',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '18px',
      margin: '20px 0',
    },
    infoText: {
      fontSize: '16px',
      margin: '20px 0',
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
    <div style={styles.page}>
      <header style={styles.header}>
        <h1>Shanti</h1>
      </header>
      <main style={styles.mainContent}>
        <h2 style={styles.greeting}>Hey, {userName}</h2>
        <p>Greet the day with positive vibes.</p>
        <hr />
        <p>How are you feeling today?</p>
        {/* Assuming Track your mood should route to /mood-page */}
        <button style={styles.trackButton} onClick={() => window.location.href = '/rating'}>
          Track your mood
        </button>
        <p style={styles.infoText}>
          You can only log your mood once a day. Choose your answers wisely!
        </p>
      </main>
      <div style={styles.bottomNav}>
        <button style={styles.navButton}>
        <Link href="/">
          Home
          </Link>
        </button>
        <button style={styles.navButton}>Stats</button>
        <button style={styles.navButton}>Badges</button>
      </div>
    </div>
  );
};

export default HomePage;
