import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookDetails from './BookDetails';

function BookList() {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);

  const role = localStorage.getItem('role');

  useEffect(() => {
    axios.get(`https://bookstore-5yhn.onrender.com/api/books?category=${category}`)
      .then(res => setBooks(res.data));
  }, [category]);

  const deleteBook = async (id) => {
    const token = localStorage.getItem('token');

    await axios.delete(`https://bookstore-5yhn.onrender.com/api/books/${id}`, {
      headers: { Authorization: token }
    });

    setBooks(books.filter(b => b._id !== id));
  };

  const addToFav = async (id) => {
    const token = localStorage.getItem('token');

    await axios.post(
      `https://bookstore-5yhn.onrender.com/api/auth/favorite/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Added to Favorites ❤️");
  };

  if (selectedBook) {
    return <BookDetails id={selectedBook} setSelectedBook={setSelectedBook} />;
  }

  // ⭐ USER STYLES (IMAGE-FIRST DESIGN)
  const userStyles = {
    page: {
      padding: '15px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
      gap: '15px'
    },

    select: {
      gridColumn: '1 / -1',
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '10px'
    },

    card: {
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 3px 12px rgba(0,0,0,0.12)',
      cursor: 'pointer',
      transition: '0.2s',
      display: 'flex',
      flexDirection: 'column',
    },

   imgWrapper: {
  width: '100%',
  height: '260px',
  background: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',   // ✅ required for smooth curve
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px'
},

    img: {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px'
},

    content: {
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },

    title: {
      fontSize: '14px',
      fontWeight: 'bold',
      margin: '0'
    },

    text: {
      fontSize: '12px',
      margin: '0',
      color: 'gray'
    },

    btn: {
      marginTop: '8px',
      padding: '8px',
      width: '100%',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      background: '#2d6cdf',
      color: 'white',
      fontSize: '12px'
    }
  };

  // ⭐ ADMIN STYLES (UNCHANGED)
  const adminStyles = {
    page: {
      padding: '20px',
      background: '#f4f6f9',
      minHeight: '100vh'
    },

    select: {
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '15px'
    },

    card: {
      display: 'flex',
      gap: '20px',
      background: 'white',
      padding: '15px',
      margin: '15px 0',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      alignItems: 'center'
    },

    img: {
      width: '100px',
      height: '140px',
      objectFit: 'cover',
      borderRadius: '8px'
    },

    btn: {
      padding: '8px 12px',
      marginRight: '10px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      background: '#2d6cdf',
      color: 'white'
    },

    deleteBtn: {
      background: 'crimson'
    }
  };

  return (
    <div>

      {/* CATEGORY */}
      <select
        style={role === 'user' ? userStyles.select : adminStyles.select}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Thriller">Thriller</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Historical">Historical</option>
        <option value="Self-Help">Self-Help</option>
      </select>

      {/* ================= USER VIEW ================= */}
      {role === 'user' && (
        <div style={userStyles.page}>
          {books.map(b => (
            <div
              key={b._id}
              style={userStyles.card}
              onClick={() => setSelectedBook(b._id)}
            >

              {/* IMAGE AREA (FULL CONTROLLED DISPLAY) */}
              <div style={userStyles.imgWrapper}>
                <img
                  style={userStyles.img}
                  src={`https://bookstore-5yhn.onrender.com/uploads/${b.image}`}
                  alt={b.title}
                />
              </div>

              {/* INFO BELOW IMAGE */}
              <div style={userStyles.content}>
                <h3 style={userStyles.title}>{b.title}</h3>

                <p style={userStyles.text}>
                  <b>Author:</b> {b.author}
                </p>

                <p style={userStyles.text}>
                  {b.category}
                </p>

                <button
                  style={userStyles.btn}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToFav(b._id);
                  }}
                >
                  ❤️ Favorite
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ================= ADMIN VIEW ================= */}
      {role === 'admin' && (
        <div style={adminStyles.page}>
          {books.map(b => (
            <div key={b._id} style={adminStyles.card}>

              <img
                style={adminStyles.img}
                src={`https://bookstore-5yhn.onrender.com/uploads/${b.image}`}
                alt={b.title}
              />

              <div>
                <h3>{b.title}</h3>
                <p><b>Author:</b> {b.author}</p>
                <p><b>Category:</b> {b.category}</p>

                <button
                  style={{ ...adminStyles.btn, ...adminStyles.deleteBtn }}
                  onClick={() => deleteBook(b._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default BookList;

