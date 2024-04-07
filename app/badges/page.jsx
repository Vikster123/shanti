"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import NavBar from '../navBar';
import Wrapper from '../wrapper';



const BadgePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [badges, setBadges] = useState([
    { level: 1, earned: false },
    { level: 2, earned: false },
    { level: 3, earned: false },
    { level: 4, earned: false },
    { level: 5, earned: false },
    { level: 6, earned: false },
    { level: 7, earned: false },
    { level: 8, earned: false },
    { level: 9, earned: false },
    { level: 10, earned: false },
    { level: 11, earned: false },
    { level: 12, earned: false },
    { level: 13, earned: false },
    { level: 14, earned: false },
    { level: 15, earned: false },
    { level: 16, earned: false },
  ])
  const styles = {
    badgePage: {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      color: '#333',
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#f8f4e4',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    badgePyramid: {
      marginTop: '20px',
    },
    badgeRow: {
      display: 'flex',
      justifyContent: 'center',
    },
    badge: {
      width: '25px',
      height: '25px',
      display: 'inline-block',
      margin: '5px',
      // opacity: 0.5,
    },
    earnedBadge: {
      // backgroundColor: '#4CAF50',
      opacity: 1,
    },
    navigation: {
      position: 'absolute',
      bottom: '0',
      width: '100%',
      borderTop: '1px solid #000',
      paddingTop: '10px',
    },
    navButton: {
      padding: '10px 20px',
      fontSize: '18px',
      border: 'none',
      background: 'none',
      color: '#333',
    },
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.apispreadsheets.com/data/GihJ1rodL7lT2xP7/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch mood data.');
      })
      .then((data) => {
        // Extract days and mood ratings from the data
        const loggedInUserName = localStorage.getItem('username')
        const userData = data.data.filter((item) => item.User === loggedInUserName);

        let arrBadges = [...badges]
        userData.forEach((element, i) => {
          arrBadges[i].earned = true
        });
        setBadges([...arrBadges.reverse()])
      })
      .catch((error) => {
        setMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  // This function determines how many badges to show per row

  const levels = [0, 1, 3, 6, 10, 16]
  let i = 0
  const badgeRows = badges.reduce((rows, badge, idx) => {
    if (idx == 0) {
      rows.push([]);
      i = i + 1
    }
    else if (idx % levels[i] == 0) {
      rows.push([]);
      i = i + 1
    }
    rows[rows.length - 1].push(badge);
    return rows;
  }, []);

  return (
    <Wrapper>
      <Image src="/generate_flower.png" alt="Logo" width={100} height={100} />
      <h1>Your Badges</h1>
      <p>The more you fill out your mood tracker, the more badges you earn!</p>
      <p>The more badges you earn, the more levels you move up!</p>
      <div style={styles.badgePyramid}>
        {isLoading ? (
          <p>Loading...</p>
        ) : message ? (
          <p>{message}</p>
        ) :
          badgeRows.map((row, rowIndex) => (
            <div key={rowIndex}
              style={styles.badgeRow}
            >
              {row.map((badge, badgeIndex) => (
                // <div
                //   key={badgeIndex}
                //   style={{
                //     ...styles.badge,
                //     ...(badge.earned ? styles.earnedBadge : null),
                //   }}
                // />
                badge.earned ?
                  <Image src="/FilledBadge.png" alt="Logo" width={100} height={100}
                    key={badgeIndex}
                    style={styles.badge}
                  />
                  :
                  <Image src="/EmptyBadge.png" alt="Logo" width={100} height={100}
                    key={badgeIndex}
                    style={styles.badge}
                  />

              ))}
            </div>
          ))}
      </div>
      <NavBar />
    </Wrapper>
  );
};

export default BadgePage;
