"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NavBar() {
    const [moodData, setMoodData] = useState({ days: [], moodRatings: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');


    const styles = {
        bottomNav: {
            position: 'flex',
            bottom: '0',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            borderTop: '1px solid #1a4548',
        },
        navigation: {
            position: 'fixed',
            bottom: '0',
            right: '0',
            left: '0',
            width: '100%',
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'space-evenly',
            backgroundColor: '#C6E0D3'
        },
        navImage: {
            // You might want to set a specific width and height for your image
            width: '35px', // example size
            height: '35px', // example size
          },
        navButton: {
            padding: '10px 20px',
            fontSize: '18px',
            border: 'none',
            background: 'none',
            color: '#1a4548',
        },
    }

    return (
        <div style={styles.navigation}>
            <button style={styles.navButton}>
                <Link href="/">
                <img src="/home1.png" alt="Home" style={styles.navImage} />
                </Link>
            </button>
            <button style={styles.navButton}>
                <Link href="/stats">
                <img src="/stats1.png" alt="Stats" style={styles.navImage} />
                </Link>
            </button>
            <button style={styles.navButton}>
                <Link href="/badges">
                <img src="/NavBadge.png" alt="Badges" style={styles.navImage} />
                </Link>
            </button>
        </div>
    );
}
