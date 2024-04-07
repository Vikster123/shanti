"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useLoginContextData } from '@/context/loginContext';
import Wrapper from './wrapper';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setLoggedInUserName, setLoggedInUserId, setLoggedInUserData } = useLoginContextData();


  const containerStyle = {
    fontFamily: "'Arial', sans-serif",
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

  const userCredentials = [
    { userName: "user1", userId: 1, password: "password1" },
    { userName: "user2", userId: 2, password: "password2" },
    { userName: "user3", userId: 3, password: "password3" },
    { userName: "user4", userId: 4, password: "password4" },
    { userName: "user5", userId: 5, password: "password5" },
    { userName: "user6", userId: 6, password: "password6" },
    { userName: "user7", userId: 7, password: "password7" },
    { userName: "user8", userId: 8, password: "password8" },
    { userName: "user9", userId: 9, password: "password9" },
    { userName: "user10", userId: 10, password: "password10" },
    { userName: "user11", userId: 11, password: "password11" },
    { userName: "user12", userId: 12, password: "password12" },
    { userName: "user13", userId: 13, password: "password13" },
    { userName: "user14", userId: 14, password: "password14" },
    { userName: "user15", userId: 15, password: "password15" },
    { userName: "user16", userId: 16, password: "password16" },
    { userName: "user17", userId: 17, password: "password17" },
    { userName: "user18", userId: 18, password: "password18" },
    { userName: "user19", userId: 19, password: "password19" },
    { userName: "user20", userId: 20, password: "password20" },
    { userName: "user21", userId: 21, password: "password21" },
    { userName: "user22", userId: 22, password: "password22" },
    { userName: "user23", userId: 23, password: "password23" },
    { userName: "user24", userId: 24, password: "password24" },
    { userName: "user25", userId: 25, password: "password25" }
  ]


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
