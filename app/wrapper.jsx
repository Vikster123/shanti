"use client"
import React from 'react';

const Wrapper = (props) => {
  const styles = {
    wrapper: {
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      color: '#333',
      textAlign: 'center',
      backgroundColor: '#f8f4e4',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  };


  return (
    <div style={styles.wrapper}>
        {props.children}
    </div>
  );
};

export default Wrapper;
