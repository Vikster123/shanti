"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLoginContextData } from '@/context/loginContext';
import NavBar from '../navBar';
import Wrapper from "../wrapper";
import { useRouter } from 'next/navigation';

const HomePage = () => {
  // Replace '[Name]' with the actual logic to retrieve the user's name
  const userName = 'admin';
  const { loggedInUserName, loggedInUserData, setLoggedInUserName, setLoggedInUserData } = useLoginContextData();
  const [disableButton, setDisableButton] = useState(true);
  const router = useRouter();

  // Inline styles to match the design
  const styles = {
    page: {
      fontFamily: 'Libre Franklin, Libre',
      color: '#000',
      padding: '40px',
      background: '#f8f4e4',
      // minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
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
    navImage: {
      // You might want to set a specific width and height for your image
      width: '35px', // example size
      height: '35px', // example size
    },
    navButton: {
      padding: '10px 20px',
      fontSize: '18px',
    }
  };

  useEffect(() => {
    if (loggedInUserName) {
      const today = new Date();
      const dayList = loggedInUserData.filter((item) => item.Day === today.toISOString().split('T')[0])
      setDisableButton((dayList.length == 0) ? false : true)
    }
  }, [loggedInUserData]);

  useEffect(() => {
    if (!loggedInUserName) {
      fetch('https://api.apispreadsheets.com/data/o4uIKexThbokIq3U/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const tempLoggedInUserName = localStorage.getItem('username')
          const tempUserData = data.data.filter((item) => item.User === tempLoggedInUserName);
          setLoggedInUserName(tempLoggedInUserName)
          setLoggedInUserData([...tempUserData])
        })
        .catch(error => {
          console.error('Failed to move to the next page', error);
          alert('Failed to move to the next page.');
        });

      const today = new Date();
      const dayList = loggedInUserData.filter((item) => item.Day === today.toISOString().split('T')[0])
      setDisableButton((dayList.length == 0) ? false : true)
    }
  }, []);

  return (
    <Wrapper>
      <header style={styles.header}>
        <h1>Shanti</h1>
      </header>
      <main style={styles.mainContent}>
        <h2 style={styles.greeting}>Hey, {loggedInUserName ? loggedInUserName : 'User'}</h2>
        <p>Greet the day with positive vibes.</p>
        <hr />
        <p>How are you feeling today?</p>
        {/* Assuming Track your mood should route to /mood-page */}
        {/* {!disableButton ? */}
          <button style={styles.trackButton} onClick={() => router.push('/rating')}>
            Track your mood
          </button>
          {/* : */}
          {/* <button type="button" style={styles.trackButton}>
            Already Done
          </button>
        } */}
        <p style={styles.infoText}>
          You can only log your mood once a day. Choose your answers wisely!
        </p>
      </main>
      <NavBar />
    </Wrapper>
  );
};

export default HomePage;
