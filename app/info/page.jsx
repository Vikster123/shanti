"use client"
import React from 'react';
import Link from 'next/link';

const InfoPage = () => {
  // Inline styles

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const styles = {
    infoPage: {
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
    title: {
      marginBottom: '20px',
      fontSize: '24px',
      textAlign: 'center',
    },
    button: {
      padding: '10px 20px',
      margin: '10px',
      backgroundColor: '#d0e8f2',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      borderRadius: '20px',
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
    <div style={styles.infoPage}>
      {/* Assuming you have an image component or an image file */}
      <img src="/generate_flower.png"  alt="Logo" width={300} height={300} style={{ marginBottom: '30px' }} />
      <h1 style={styles.title}>{`It's okay to not know how you feel.`}</h1>

      <button
        style={styles.button}
        onClick={() => handleExternalLink('https://kidshealth.org/en/teens/emotional-awareness.html')}
      >
        How do I know what I’m feeling?
      </button>
      <button
        style={styles.button}
        onClick={() => handleExternalLink('https://emotioncompass.org/information/primary-secondary-emotions/')}
      >
        More about emotions
      </button>
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

export default InfoPage;
