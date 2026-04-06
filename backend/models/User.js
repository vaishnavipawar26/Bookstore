const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }, // ✅ COMMA ADDED HERE

    favorites: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
    ]
});

module.exports = mongoose.model('User', userSchema);