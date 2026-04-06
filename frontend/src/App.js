import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AddBook from './components/AddBook';
import BookList from './components/BookList';
import Login from './components/Login';
import Register from './components/Register';
import Favorites from './components/Favorites';

function App() {
  const [user, setUser] = useState(localStorage.getItem('role'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
  };

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 25px',
      background: '#2d6cdf',
      color: 'white'
    },
    navLinks: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center'
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold'
    },
    button: {
      padding: '8px 12px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      background: 'crimson',
      color: 'white'
    },
    container: {
      padding: '20px'
    },
    title: {
      margin: 0,
      fontSize: '22px'
    },
    card: {
      marginTop: '20px'
    }
  };

  return (
    <Router>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>📚 Bookstore</h2>

        <div style={styles.navLinks}>
         
          <Link to="/" style={styles.link}>Home</Link>


          {/* ONLY USER CAN SEE FAVORITES */}
          {user === 'user' && (
            <Link to="/favorites" style={styles.link}>
               Favorites
            </Link>
          )}

          {/* ADMIN ONLY */}
          {user === 'admin' && (
            <Link to="/add-book" style={styles.link}>
             Add Book
            </Link>
          )}

          {user && (
            <button style={styles.button} onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div style={styles.container}>

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                {!user && (
                    <Register />
                )}

                {user && (
                  <div style={styles.card}>
                    <BookList />
                  </div>
                )}
              </>
            }
          />

          {/* FAVORITES PAGE */}
          <Route path="/favorites" element={<Favorites />} />

          {/* ADD BOOK PAGE (ADMIN ONLY) */}
          <Route path="/add-book" element={<AddBook />} />

          {!user && (
                          <Route path="/login" element={<Login setUser={setUser} />} />
                )}
        </Routes>

      </div>
    </Router>
  );
}

export default App;
