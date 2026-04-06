
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register(){
  const [data,setData] = useState({
    username:'', email:'', password:'', role:'user'
  });

  const handleChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }

  const handleRegister = async ()=>{
    await axios.post('https://bookstore-5yhn.onrender.com/api/auth/register', data);
    alert("Registered");
  }

 

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          style={styles.input}
        />

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

        <select name="role" onChange={handleChange} style={styles.input}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>

        <p>
          Already have account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    background: "#4CAF50",
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
