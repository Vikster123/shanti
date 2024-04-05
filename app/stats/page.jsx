"use client"
import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import NavBar from "../navBar"
import Wrapper from "../wrapper"
Chart.register(...registerables);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {

    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 10, // Assuming your mood scale goes up to 10
      stepSize: 1,
    },
    x: {
    },
  },
};

export default function MoodChart() {
  const [moodData, setMoodData] = useState({ days: [], moodRatings: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.apispreadsheets.com/data/o4uIKexThbokIq3U/")
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
        const days = userData.map(item => `Day ${item.Day}`);
        const moodRatings = userData.map(item => item["Mood Rating"]);
        setMoodData({ days, moodRatings });
      })
      .catch((error) => {
        setMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const chartData = {
    labels: moodData.days,
    datasets: [
      {
        label: 'Daily Mood Scale',
        data: moodData.moodRatings,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const styles = {
    statsPage: {
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
  }

  return (

    <Wrapper>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "90vh", justifyContent: "center" }}>
        <div style={{ display: 'flex', height: "50vh", justifyContent: "center" }}>
          {isLoading ? (
            <p>Loading...</p>
          ) : message ? (
            <p>{message}</p>
          ) : (
            <Line data={chartData} options={options} />
          )}
        </div>
      </div>
      <NavBar />
    </Wrapper>
  );
}
