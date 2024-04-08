"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useLoginContextData } from '@/context/loginContext';
import Wrapper from './wrapper';
import {userCredentials} from '../constants/user';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setLoggedInUserName, setLoggedInUserId, setLoggedInUserData } = useLoginContextData();


  const containerStyle = {
    fontFamily: "Garamond, Georgia, serif",
    backgroundColor: "#f8f4e4",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
  };

  const loginContainerStyle = {
    textAlign: "center",
    backgroundColor: "#f8f4e4",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const inputFieldStyle = {
    width: "80%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#C6E0D3",
  };

  const submitButtonStyle = {
    width: "80%",
    padding: "10px",
    marginTop: "20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  };

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   console.log('Logging in with', username, password); // Debugging line to check the input values

  //   // Check if the username exists and the password matches
  //   if (userCredentials.hasOwnProperty(username) && userCredentials[username] === password) {
  //     console.log('Credentials are valid'); // Debugging line
  //     router.push('/intro');
  //   } else {
  //     console.error('Invalid username or password.'); // Debugging line
  //     alert('Invalid username or password.');
  //   }
  // };

  const updateSpreadsheet = (username) => {
    const today = new Date();
    const updateData = {
      Day: today.toISOString().split('T')[0], // Include the date if necessary
      User: username, // Only update the username
    };

    fetch('https://api.apispreadsheets.com/data/GihJ1rodL7lT2xP7/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [updateData] })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Spreadsheet updated successfully', data);
        router.push('/intro'); // Adjust the redirect as necessary
      })
      .catch(error => {
        console.error('Failed to move to the next page', error);
        alert('Failed to move to the next page.');
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // Check if the username exists and the password matches
    const userExists = userCredentials.find((obj) => {
      return obj.userName === username && obj.password === password;
    });
    if (userExists) {
      setLoggedInUserName(userExists.userName);
      setLoggedInUserId(userExists.userId)
      localStorage.setItem('username', userExists.userName)
      fetch('https://api.apispreadsheets.com/data/GihJ1rodL7lT2xP7/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const tempUserData = data.data.filter((item) => item.User === userExists.userName);  
          setLoggedInUserData([...tempUserData])
        })
        .catch(error => {
          console.error('Failed to move to the next page', error);
          alert('Failed to move to the next page.');
        });
      router.push('/intro');
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <Wrapper>
    <div style={containerStyle}>
      <div style={loginContainerStyle}>
        <Image src="/generate_flower.png" alt="Logo" width={100} height={100} />
        <h1>Welcome!</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputFieldStyle}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputFieldStyle}
            placeholder="Password"
            required
          />
          <button type="submit" style={submitButtonStyle}>Login</button>
        </form>
      </div>
    </div>
    </Wrapper>
  );
}
