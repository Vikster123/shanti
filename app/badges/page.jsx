"use client"
import React from 'react';
import Link from 'next/link';
import Image from "next/image";

const badges = [
  { level: 1, earned: true, src: '/generate_flower.png'},
  { level: 2, earned: true },
  { level: 3, earned: false },
  { level: 4, earned: false },
];

const BadgePage = () => {
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
      width: '60px',
      height: '60px',
      backgroundColor: '#cccccc',
      display: 'inline-block',
      margin: '10px',
      opacity: 0.5,
    },
    earnedBadge: {
      backgroundColor: '#4CAF50',
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

  // This function determines how many badges to show per row
  const badgeRows = badges.reduce((rows, badge, idx) => {
    if (idx % 3 === 0) rows.push([]);
    rows[rows.length - 1].push(badge);
    return rows;
  }, []);

  return (
    <div style={styles.badgePage}>
        <Image src="/generate_flower.png" alt="Logo" width={100} height={100} />
      <h1>Your Badges</h1>
      <p>The more you fill out your mood tracker, the more badges you earn!</p>
      <p>The more badges you earn, the more levels you move up!</p>
      <div style={styles.badgePyramid}>
        {badgeRows.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.badgeRow}>
            {row.map((badge, badgeIndex) => (
              <div
                key={badgeIndex}
                style={{
                  ...styles.badge,
                  ...(badge.earned ? styles.earnedBadge : null),
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={styles.navigation}>
        <button style={styles.navButton}>Home</button>
        <button style={styles.navButton}>Stats</button>
        <button style={styles.navButton}>
        <Link href="/badges">
           Badges
           </Link>
           </button>
      </div>
    </div>
  );
};

export default BadgePage;
