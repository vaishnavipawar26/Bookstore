const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    image: String,
    author: String,
    category: String,
    description: String,
    price: {
  type: Number,
  required: true
}
});

module.exports = mongoose.model('Book', bookSchema);