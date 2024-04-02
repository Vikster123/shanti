"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { pageObject } from '../data/page'; // Make sure the path is correct

const EmotionDetailPage = () => {
  const router = useRouter();
  const { moodName } = router.query;
  const [moodData, setMoodData] = useState(null);

  useEffect(() => {
    if (moodName) {
      const data = pageObject.find((mood) => mood.pageLabel.toLowerCase() === moodName.toLowerCase());
      setMoodData(data);
    }
  }, [moodName]);

  if (!moodData) {
    return <div>No information available for this mood.</div>;
  }

  return (
    <div>
      <h1>{moodData.pageLabel}</h1>
      <p>{moodData.subMsg}</p>
      <p>{moodData.msg1}</p>
      {/* ... other mood data ... */}
    </div>
  );
};

export default EmotionDetailPage;
