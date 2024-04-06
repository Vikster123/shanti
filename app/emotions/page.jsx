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
      padding: '10px',
      textAlign: 'center',
      backgroundColor: 'transparent',
      border: '1px solid #000',
      cursor: 'pointer',
      fontSize: '18px',
      display: 'block',
      width: 'auto',
      margin: '5px 5px',
    },
    pageStyles: {
      background: '#f5f5dc', // This is a beige color, adjust as needed
      minHeight: '60vh', // Ensure the background color covers the whole page
      paddingTop: '20px', // Adjust padding as needed
      boxSizing: 'border-box', // Make sure paddings don't affect the width calculations
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDiv: {
      display: 'flex',
      flexDirection: 'row'
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

    fetch('https://api.apispreadsheets.com/data/o4uIKexThbokIq3U/', {
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
        <img src={moodData.imageUrl} width={300} height={300} />
        <a href={moodData.pageUrl} target="_blank" rel="noopener noreferrer">
      <p >{moodData.pageLabel}</p>
      </a>
        <p >{moodData.subMsg}</p>
        <p >{moodData.msg1}</p>
        <p>{moodData.pageLabel2}</p>
        <p >{moodData.subMsg3}</p>
        <p >{moodData.subMsg4}</p>
        <p >{moodData.subMsg5}</p>
        <p >{moodData.subMsg6}</p>
        <p >{moodData.subMsg7}</p>
        {/* ... other mood data ... */}
      </div>
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
            Right mood ?
          </button>
        </div>
      }
      <NavBar />
    </Wrapper >
  );
};

export default EmotionDetailPage
// export default function Searchbar() {
//   return (
//     // You could have a loading skeleton as the `fallback` too
//     <Suspense>
//       <EmotionDetailPage />
//     </Suspense>
//   )
// }