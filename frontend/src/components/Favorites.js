import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Favorites() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchFav = async () => {
      const token = localStorage.getItem('token');

      const res = await axios.get(
        'https://bookstore-5yhn.onrender.com/api/auth/favorites',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBooks(res.data);
    };

    fetchFav();
  }, []);

  const styles = {
    page: {
      minHeight: '100vh'
    },

    card: {
      display: 'flex',
      gap: '15px',
      background: 'white',
      padding: '12px',
      margin: '12px 0',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      alignItems: 'center'
    },

    img: {
      width: '80px',
      height: '110px',
      objectFit: 'cover',
      borderRadius: '8px'
    }
  };

  return (
    <div style={styles.page}>
      <h2>❤️ Favorites</h2>

      {books.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        books.map(b => (
          <div key={b._id} style={styles.card}>

            {/* ⭐ IMAGE ADDED */}
            <img
              style={styles.img}
              src={`http://localhost:5000/uploads/${b.image}`}
              alt={b.title}
            />

            <div>
              <h3>{b.title}</h3>
              <p>{b.author}</p>
              <p>{b.category}</p>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Favorites() {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchFav = async () => {
//       const token = localStorage.getItem('token');

//       const res = await axios.get(
//         'http://localhost:5000/api/auth/favorites',
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setBooks(res.data);
//     };

//     fetchFav();
//   }, []);

//   const styles = {
//     page: {
//       padding: '20px'
//     },
//     card: {
//       background: 'white',
//       padding: '10px',
//       margin: '10px 0',
//       borderRadius: '10px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <h2>❤️ Favorites</h2>

//       {books.length === 0 ? (
//         <p>No favorites yet</p>
//       ) : (
//         books.map(b => (
//           <div key={b._id} style={styles.card}>
//             <h3>{b.title}</h3>
//             <p>{b.author}</p>
//             <p>{b.category}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Favorites;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Favorites(){

//   const [books, setBooks] = useState([]);

//   useEffect(()=>{
//     const fetchFav = async ()=>{
//       const token = localStorage.getItem('token');

//       const res = await axios.get(
//         'http://localhost:5000/api/auth/favorites',
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       setBooks(res.data);
//     };

//     fetchFav();
//   },[]);

//   return (
//     <div>
//       <h2>❤️ My Favorite Books</h2>

//       {books.length === 0 ? (
//         <p>No favorites yet</p>
//       ) : (
//         books.map(book => (
//           <div key={book._id}>
//             <h3>{book.title}</h3>
//             <p>{book.author}</p>
//             <p>{book.category}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Favorites;
