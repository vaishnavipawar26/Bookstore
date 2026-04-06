const router = require('express').Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const multer = require("multer");

// =======================
// 📁 MULTER CONFIG
// =======================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// =======================
// ➕ ADD BOOK (ADMIN ONLY + IMAGE)
// =======================
router.post('/', auth, upload.single("image"), async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json("Only admin allowed");
        }

        const { title, author, category, description ,price} = req.body;

        const newBook = new Book({
            title,
            author,
            category,
            description,
            price,
            image: req.file ? req.file.filename : null
        });

        await newBook.save();
        res.json(newBook);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// =======================
// 📚 GET ALL BOOKS (FILTER)
// =======================
router.get('/', async (req, res) => {
    const category = req.query.category;

    let books;
    if (category && category !== 'All') {
        books = await Book.find({
            category: { $regex: `^${category}$`, $options: 'i' }
        });
    } else {
        books = await Book.find();
    }

    res.json(books);
});

// =======================
// 🔍 SEARCH BOOKS
// =======================
router.get('/search', async (req, res) => {
    const query = req.query.q;

    const books = await Book.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { author: { $regex: query, $options: 'i' } }
        ]
    });

    res.json(books);
});

// =======================
// 📖 GET SINGLE BOOK
// =======================
router.get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.json(book);
});

// =======================
// ✏️ UPDATE BOOK
// =======================
router.put('/:id', async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedBook);
});

// =======================
// 🗑 DELETE BOOK
// =======================
router.delete('/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book Deleted" });
});


// =======================
// 🗑 buy BOOK
// =======================

router.post('/buy/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Here we just simulate purchase
    res.json({
      message: "Book purchased successfully",
      book
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;