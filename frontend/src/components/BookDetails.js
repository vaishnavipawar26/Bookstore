import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookDetails({ id, setSelectedBook }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(res => setBook(res.data));
  }, [id]);

  if (!book) return <p style={{ padding: '20px' }}>Loading...</p>;


  const handleBuy = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("Please login first");
      return;
    }

    await axios.post(
      `http://localhost:5000/api/books/buy/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Purchase Successful ✅");

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert("Purchase Failed ❌");
  }
};

  const styles = {
    box: {
      background: 'white',
      padding: '20px',
      margin: '20px auto',
      maxWidth: '600px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    btn: {
      marginTop: '15px',
      padding: '10px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      width: '100%'
    },
    buyBtn: {
      marginTop: '10px',
      padding: '10px',
      border: 'none',
      borderRadius: '6px',
      background: '#28a745',
      color: 'white',
      cursor: 'pointer',
      width: '100%',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.box}>
      <h2>{book.title}</h2>

      <p><b>Author:</b> {book.author}</p>
      <p><b>Category:</b> {book.category}</p>
      <p><b>Description:</b> {book.description}</p>

      {/* 💰 PRICE (IMPORTANT) */}
      <p><b>Price:</b> ₹{book.price}</p>

      {/* 🛒 BUY BUTTON */}
      <button style={styles.buyBtn} onClick={handleBuy}>
        🛒 Buy Now
      </button>

      {/* BACK BUTTON */}
      <button style={styles.btn} onClick={() => setSelectedBook(null)}>
        ⬅ Back
      </button>
    </div>
  );
}

export default BookDetails;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function BookDetails({ id, setSelectedBook }) {
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/books/${id}`)
//       .then(res => setBook(res.data));
//   }, [id]);

//   if (!book) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>{book.title}</h2>
//       <p><b>Author:</b> {book.author}</p>
//       <p><b>Category:</b> {book.category}</p>
//       <p><b>Description:</b> {book.description}</p>

//       <button onClick={() => setSelectedBook(null)}>Back</button>
//     </div>
//   );
// }

// export default BookDetails;