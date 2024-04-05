"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import NavBar from '../navBar';
import Wrapper from '../wrapper';

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
      fontFamily: 'Times New Roman, serif',
      color: '#000',
      padding: '40px',
      background: '#f8f4e4',
      minHeight: '100vh',
    },
    header: {
      textAlign: 'center',
      borderBottom: '1px solid #000',
    },
    mainHeading: {
      textAlign: 'center',
      fontSize: '24px',
      margin: '40px 0',
    },
    moodOptions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      paddingBottom: '20px',
    },
    moodButton: {
      padding: '15px 0',
      border: '1px solid #000',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: '18px',
      transition: 'background-color 0.3s',
      borderRadius: '0',
    },
    selected: {
      backgroundColor: '#000',
      color: '#fff',
    },
    dontKnowButton: {
      padding: '10px',
      textAlign: 'center',
      backgroundColor: 'transparent',
      border: '1px solid #000',
      cursor: 'pointer',
      fontSize: '18px',
      display: 'block',
      width: 'auto',
      margin: '20px auto',
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
    },
    linkBack: {
      display: 'block',
      textAlign: 'center',
      marginTop: '20px',
      textDecoration: 'underline',
    },
  };

  const pageObject = [
    {
      pageLabel: 'HAPPY',
      subMsg: 'A little reminder:',
      msg1: 'The perfect moment is right now. You got this!',
      question1: 'What makes you feel happy or joyful?',
      question2: 'What have you done to make you feel happy?',
      pageLabel2: 'How Can I Stay Happy?',
      subMsg3: 'Do what you love',
      subMsg4: 'Create a goal',
      subMsg5: 'Work on a goal you created',
      subMsg6: 'Do something you wanted to do for a long time',
      subMsg7: 'Do something kind for someone',
      imageUrl: "/Image1.png"
    },
    {
      pageLabel: 'EXCITED',
      subMsg: 'An affirmation for you.',
      msg1: 'I am building myself a better life each day.',
      question1: 'What is influencing your excitement?',
      question2: 'Are you excited for someone or something?',
      pageLabel2: 'How Can I Use my Excitement?',
      subMsg3: 'Do what you love',
      subMsg4: 'Do something out of your comfort zone',
      subMsg5: 'Think about the present- what are you excited for right now',
      subMsg6: 'Share your excitement with others',
      subMsg7: 'Take a walk to your new place',
      imageUrl: "/Image2.png"
    },
    {

      pageLabel:
        'GRATEFUL',

      subMsg:
        'An affirmation for you.',

      msg1:
        'I am grateful for things that bring me joy.',

      question1:
        'What are you grateful for right now?',

      question2:
        'What are you grateful for in your life?',

      pageLabel2: 'How Can I Stay Grateful?',
      subMsg3: 'Do what you love',
      subMsg4: 'Create a goal',
      subMsg5: 'Work on a goal you created',
      subMsg6: 'Do something you wanted to do for a long time',
      subMsg7: 'Do something kind for someone',
      imageUrl: "/Image3.png"

    },

    {

      pageLabel:
        'HOPEFUL',

      subMsg:
        'An affirmation for you.',

      msg1:
        'You have what it takes to achieve anything you set your mind to.',

      question1:
        'Are you taking action to make your hopes come true?',

      question2:
        'If so, what are you doing to make your hopes come true?',

      pageLabel2: 'How Can I Stay Hopeful?',
      subMsg3: 'Do what you love',
      subMsg4: 'Create a goal',
      subMsg5: 'Work on a goal you created',
      subMsg6: 'Do something you wanted to do for a long time',
      subMsg7: 'Do something kind for someone',

      imageUrl: "/Image4.png"

    },

    {

      pageLabel:
        'SCARED',

      subMsg:
        'A little reminder:',

      msg1:
        'You are in control of your life and emotions.',

      question1:
        'What are you scared or worried about?',

      question2:
        'Are the factors of your fear in your control?',
      pageLabel2: 'How Can I Stay Happy?',
      subMsg3: 'Do what you love',
      subMsg4: 'Create a goal',
      subMsg5: 'Work on a goal you created',
      subMsg6: 'Do something you wanted to do for a long time',
      subMsg7: 'Do something kind for someone',
      imageUrl: "/Image5.png"

    },

    {

      pageLabel:
        'SAD',

      subMsg:
        'An affirmation for you.',

      msg1:
        'I trust that I am on the right path.',

      question1:
        'What or who is driving your sadness?',

      question2:
        'Did you tell someone how you feel? ',
      pageLabel2: 'How Can I Stay Happy?',
      subMsg3: 'Do what you love',
      subMsg4: 'Create a goal',
      subMsg5: 'Work on a goal you created',
      subMsg6: 'Do something you wanted to do for a long time',
      subMsg7: 'Do something kind for someone',
      imageUrl: "/Image6.png"

    },

    {

      pageLabel:
        'FRUSTRATED',

      subMsg:
        '',

      msg1:
        'It’s okay to feel frustrated.Other people feel frustrated too.',

      question1:
        'What are you feeling frustrated about?',

      question2:
        'Why are you frustrated about it?',
      pageLabel2: 'How Can I Stay Happy?',
      subMsg3: 'Do what you love',
      subMsg4: 'Create a goal',
      subMsg5: 'Work on a goal you created',
      subMsg6: 'Do something you wanted to do for a long time',
      subMsg7: 'Do something kind for someone',
      imageUrl: "/Image7.png"

    },

    {

      pageLabel:
        'OVERWHELMED',

      subMsg:
        '',

      msg1:
        'You are confident and capable. Don’t sweat it. You got this.',

      question1:
        'Why do you feel the way you do?',

      question2:
        'Are you sure you feel the way you think you do?',
      pageLabel2: 'How Can I Stay Happy?',
      subMsg3: 'Do what you love',
      subMsg4: 'Create a goal',
      subMsg5: 'Work on a goal you created',
      subMsg6: 'Do something you wanted to do for a long time',
      subMsg7: 'Do something kind for someone',
      imageUrl: "/Image8.png"

    },

    {

      pageLabel:
        'CALM',

      subMsg:
        '',

      msg1:
        'Calm is a sense of peacefulness. The perfect time to get things done.',

      question1:
        'What caused you to feel calm?',

      question2:
        'How do you become calm in tough situations?',
      pageLabel2: 'How Can I Stay Happy?',
      subMsg3: 'Do what you love',
      subMsg4: 'Create a goal',
      subMsg5: 'Work on a goal you created',
      subMsg6: 'Do something you wanted to do for a long time',
      subMsg7: 'Do something kind for someone',

      imageUrl: "/Image8.png"

    },

    {

      pageLabel:
        'LONELY',

      subMsg:
        '',

      msg1:
        'You are loved. Your loneliness will pass.',

      question1:
        'Why are you feeling lonely right now?',

      question2:
        'How often do you feel left out or lonely?',
      pageLabel2: 'How Can I Stay Happy?',
      subMsg3: 'Do what you love',
      subMsg4: 'Create a goal',
      subMsg5: 'Work on a goal you created',
      subMsg6: 'Do something you wanted to do for a long time',
      subMsg7: 'Do something kind for someone',
      imageUrl: "/Image9.png"

    },

  ];

  return (
    <Wrapper>
    <header style={styles.header}>
      <h1>Your Mood Tracker</h1>
    </header>
    <div>
      <h2 style={styles.mainHeading}>What word would you use to describe your mood?</h2>
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
