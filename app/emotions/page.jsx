"use client"
import React, { useEffect, useState, Suspense  } from 'react';
import { useSearchParams  } from 'next/navigation';
import { pageObject } from '../../constants/emotionPageData'; // Make sure the path is correct

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

  return (
    <div>
      <h1>{moodData.pageLabel}</h1>
      <p>{moodData.subMsg}</p>
      <p>{moodData.msg1}</p>
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