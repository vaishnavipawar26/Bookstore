// ================= server.js =================
const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']); // Google DNS
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5000, ()=> console.log("Server running on port 5000"));
