"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';




export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

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

  const userCredentials = {
    user1: 'password1',
    user2: 'password2',
    user3: 'password3',
    user4: 'password4',
    user5: 'password5',
    user6: 'password6',
    user7: 'password7',
    user8: 'password8',
    user9: 'password9',
    user10: 'password10',
    user11: 'password11',
    user12: 'password12',
    user13: 'password13',
    user14: 'password14',
    user15: 'password15'

  };


  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Logging in with', username, password); // Debugging line to check the input values
    
    // Check if the username exists and the password matches
    if (userCredentials.hasOwnProperty(username) && userCredentials[username] === password) {
      console.log('Credentials are valid'); // Debugging line
      router.push('/intro');
    } else {
      console.error('Invalid username or password.'); // Debugging line
      alert('Invalid username or password.');
    }
  };

  return (
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
  );
}
