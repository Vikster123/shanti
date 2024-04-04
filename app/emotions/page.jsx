"use client"
import React, { useEffect, useState, Suspense  } from 'react';
import { useSearchParams  } from 'next/navigation';
import { pageObject } from '../../constants/emotionPageData'; // Make sure the path is correct
import Image from "next/image";

const EmotionDetailPage = () => {
const params = useSearchParams();
const moodName = params.get('mood')
  const [moodData, setMoodData] = useState(null);

  useEffect(() => {
    if (moodName) {
      const data = pageObject.find((mood) => mood.pageLabel === moodName.toUpperCase());
      setMoodData(data);
    }
  }, [moodName]);

  if (!moodData) {
    return <div>No information available for this mood.</div>;
  }

  // Define the styles here
  const pageStyles = {
    background: '#f5f5dc', // This is a beige color, adjust as needed
    minHeight: '100vh', // Ensure the background color covers the whole page
    padding: '20px', // Adjust padding as needed
    boxSizing: 'border-box', // Make sure paddings don't affect the width calculations
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
  

  return (
    <div style={pageStyles}> 
      <img src={moodData.imageUrl}  width={100} height={100} />
      <p >{moodData.pageLabel}</p>
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
  );
};

export default function Searchbar() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <EmotionDetailPage />
    </Suspense>
  )
}