import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    image: null,
    price: '',
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setBook({ ...book, image: e.target.files[0] });
    } else {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    Object.keys(book).forEach(key => formData.append(key, book[key]));

    await axios.post('http://localhost:5000/api/books', formData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Book Added ✅");
    navigate('/');
  };

  const styles = {
    page: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    input: {
      display: 'block',
      margin: '10px 0',
      padding: '10px',
      width: '95%',
      border: '1px solid #ddd',
      borderRadius: '6px'
    },
    btn: {
      padding: '10px 15px',
      background: '#2d6cdf',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      width: '100%',
      marginTop: '10px'
    },
    card: {
      background: 'white',
      padding: '25px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      width: '350px'
    },
    title: {
      textAlign: 'center',
      marginBottom: '15px'
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h2 style={styles.title}>Add Book</h2>

        <input type="file"  name="image" style={styles.input} onChange={handleChange} />

        <input
          style={styles.input}
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          name="author"
          placeholder="Author"
          onChange={handleChange}
        />

        <select
          style={styles.input}
          name="category"
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Thriller">Thriller</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Historical">Historical</option>
          <option value="Self-Help">Self-Help</option>
        </select>

        <input
          style={styles.input}
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
  style={styles.input}
  name="price"
  placeholder="Price (₹)"
  onChange={handleChange}
/>

        <button style={styles.btn} onClick={handleSubmit}>
          Add Book
        </button>

      </div>

    </div>
  );
}

export default AddBook;









// import React, { useState } from 'react';
// import axios from 'axios';

// function AddBook() {
//   const [book, setBook] = useState({
//     title: '',
//     author: '',
//     category: '',
//     description: '',
//     image: null
//   });

//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setBook({ ...book, image: e.target.files[0] });
//     } else {
//       setBook({ ...book, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async () => {
//     const token = localStorage.getItem('token');

//     if (!book.title || !book.author) {
//       alert("Title and Author required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", book.title);
//     formData.append("author", book.author);
//     formData.append("category", book.category);
//     formData.append("description", book.description);
//     formData.append("image", book.image);

//     await axios.post(
//       'http://localhost:5000/api/books',
//       formData,
//       {
//         headers: {
//            Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     alert("Book Added");
//   };

//   return (
//     <div>
//       <input type="file" name="image" onChange={handleChange} />

//       <input name="title" placeholder="Title" onChange={handleChange} />
//       <input name="author" placeholder="Author" onChange={handleChange} />

//       <select name="category" onChange={handleChange}>
//         <option value="">Select Category</option>
//         <option value="Thriller">Thriller</option>
//         <option value="Fantasy">Fantasy</option>
//         <option value="Historical">Historical</option>
//         <option value="Self-Help">Self-Help</option>
//       </select>

//       <input name="description" placeholder="Description" onChange={handleChange} />
//       <button onClick={handleSubmit}>Add</button>
//     </div>
//   );
// }

// export default AddBook;