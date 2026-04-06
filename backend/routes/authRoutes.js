const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


//  Add to Favorites
router.post('/favorite/:id', auth, async (req,res)=>{
  try {
    const user = await User.findById(req.user.id);

    if(!user) {
      return res.status(404).json({message: "User not found"});
    }

    if(!user.favorites.includes(req.params.id)){
        user.favorites.push(req.params.id);
        await user.save();
    }

    res.json({message: "Added to favorites ❤️"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Server error"});
  }
});

//  Get Favorites
router.get('/favorites', auth, async (req,res)=>{
    const user = await User.findById(req.user.id).populate('favorites');
    res.json(user.favorites);
});


// Register
router.post('/register', async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role 
    });

    await user.save();
    res.json(user);
});

// Login
router.post('/login', async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).json("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if(!valid) return res.status(400).json("Wrong password");

    const token = jwt.sign(
        {id:user._id, role:user.role},
        "SECRET_KEY"
    );

    res.json({token, role:user.role});
});



module.exports = router;