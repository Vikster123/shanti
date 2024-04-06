'use client'
import React from 'react';

const HeadTag = () => {
  return (
    <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="Mission Shanti" content="Mission Shanti" />
        <meta name="title" content="Mission Shanti" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
        <meta name="theme-color" content="#f8f4e4" />
        <meta name="apple-mobile-web-app-title" content="Mission Shanti" />
        <meta name="description" content="An App to track your daily mood" />
    </head>
  )
}

export default HeadTag