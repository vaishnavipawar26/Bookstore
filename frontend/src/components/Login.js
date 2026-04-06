// import React, {useState} from 'react';
// import axios from 'axios';

// function Login({setUser}) {
//   const [data,setData] = useState({email:'', password:''});

//   const handleChange = (e)=>{
//     setData({...data,[e.target.name]:e.target.value});
//   }

//   const handleLogin = async ()=>{
//     const res = await axios.post('http://localhost:5000/api/auth/login', data);

//     // save token + role
//     localStorage.setItem('token', res.data.token);
//     localStorage.setItem('role', res.data.role);

//     setUser(res.data.role);
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       <input name="email" placeholder="Email" onChange={handleChange}/>
//       <input name="password" placeholder="Password" onChange={handleChange}/>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }
// export default Login;


import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

 function Login({setUser}) {
  const [data,setData] = useState({email:'', password:''});
 const navigate = useNavigate();
  const handleChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }

  const handleLogin = async ()=>{
    const res = await axios.post('https://bookstore-5yhn.onrender.com/api/auth/login', data);

    // save token + role
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);

    setUser(res.data.role);
    navigate("/");
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        <p>
          Don’t have an account?{" "}
          <Link to="/" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f2f4f8",
  },
  card: {
    width: "340px",
    padding: "25px",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
