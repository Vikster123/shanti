"use client"
import React, {useEffect} from 'react';
import { useLoginContextData } from '@/context/loginContext';
import { useRouter, usePathname } from 'next/navigation';

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
  const { loggedInUserName } = useLoginContextData();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if(loggedInUserName && pathName === '/') {
      router.push('/intro');
    } else if(!loggedInUserName) {
      router.push('/');
    }
  },[])

  return (
    <div style={styles.wrapper}>
        {props.children}
    </div>
  );
};

export default Wrapper;
