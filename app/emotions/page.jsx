"use client"
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { pageObject } from '../../constants/emotionPageData'; // Make sure the path is correct
import Image from "next/image";
import NavBar from '../navBar';
import Wrapper from "../wrapper"
import { useRouter } from 'next/navigation';

const EmotionDetailPage = () => {
  const params = useSearchParams();
  const moodName = params.get('mood')
  const router = useRouter();
  const [moodData, setMoodData] = useState(null);
  const [rightMood, setRightMood] = useState(true);

  useEffect(() => {
    if (moodName) {
      const data = pageObject.find((mood) => mood.pageLabel === moodName.toUpperCase());
      setMoodData(data);
      setRightMood(false)
    }
  }, [moodName]);

  if (!moodData) {
    return <div>No information available for this mood.</div>;
  }


  // Define the styles here
  const styles = {
    dontKnowButton: {
      backgroundColor: '#C6E0D3',
      color: '#1a4548',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '18px',
      margin: '20px 0',
    },
    pageStyles: {
      paddingTop: '0px', // Adjust padding as needed
      boxSizing: 'border-box', // Make sure paddings don't affect the width calculations
      fontSize: '18px',
      fontWeight: 'bold'
    },
    buttonDiv: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    }
  }

  const updateSpreadsheet = (userData, selectedMood) => {
    const username = localStorage.getItem('username');
    // Check if username is not found, which means the user is not logged in
    if (!username) {
      alert('User not identified, please log in.');
      // Optionally, redirect the user to the login page
      router.push('/');
      return; // Exit the function if no user is found
    }

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
      .catch(error => {
        console.log('Failed to move to the next page.');
      });
  };

  const handleDontKnowClick = () => {
    router.push(`/mood`);
  };

  const handleRightMoodClick = () => {
    if (moodName) {
      // Navigate to a route like "/mood/[moodName]", where moodName is dynamic
      const userData = JSON.parse(sessionStorage.getItem("user_data"))
      userData['emotion'] = moodName

      updateSpreadsheet(userData, moodName);

      setRightMood(true)
      // router.push(`/emotions?mood=${mood.toLowerCase()}`);
    } else {
      alert('Please select a mood first.');
    }
  };



  return (
    <Wrapper>
      <div style={styles.pageStyles}>
        <img src={moodData.imageUrl} width={100} height={100} />
        <a href={moodData.pageUrl} target="_blank" rel="noopener noreferrer">
      <p >{moodData.pageLabel}</p>
      </a>
        <p >{moodData.subMsg}</p>
        <p >{moodData.msg1}</p>
        {moodData.pageLabel !== "I DONT KNOW" && <h1>Something to Think About...</h1>}
        <p >{moodData.question1}</p>
        <p >{moodData.question2}</p>
        {!rightMood &&
          <div style={styles.buttonDiv}>
            <button
              onClick={handleDontKnowClick}
              style={styles.dontKnowButton}
            >
              Not the right mood ?
            </button>
            <button
              onClick={handleRightMoodClick}
              style={styles.dontKnowButton}
            >
              Right mood
            </button>
          </div>
        }
        <h1>{moodData.pageLabel2}</h1>
        {moodData.meditateLink ? 
          <p ><a href={moodData.meditateLink} target='_blank'>Meditate</a> for 5 minutes.</p> 
        : ''}
        {moodData.musicLink ? 
          <p >Listen to <a href={moodData.musicLink} target='_blank'>Music</a>.</p> 
        : ''}
        {moodData.journalLink ? 
          <p ><a href={moodData.journalLink} target='_blank'>Journal</a> about your feelings.</p> 
        : ''}
         {moodData.idkUrl1 ? 
          <p ><a href={moodData.idkUrl1} target='_blank'>How do I know what I am feeling?</a> </p> 
        : ''}
         {moodData.idkUrl2 ? 
          <p ><a href={moodData.idkUrl2} target='_blank'>More about emotions</a> </p> 
        : ''}
        {moodData.subMsg3 ? <p >{moodData.subMsg3}</p> : ''}
        {moodData.subMsg4 ? <p >{moodData.subMsg4}</p> : ''}
        {moodData.subMsg5 ? <p >{moodData.subMsg5}</p> : ''}
        {moodData.subMsg6 ? <p >{moodData.subMsg6}</p> : ''}
        {moodData.subMsg7 ? <p >{moodData.subMsg7}</p>: ''}
        {/* ... other mood data ... */}
      </div>
      
      <NavBar />
    </Wrapper >
  );
};

export default function EmotionDetailPageWrapper() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <EmotionDetailPage />
    </Suspense>
  )
}