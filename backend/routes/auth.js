const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {

  // try {
  //   const { username, password } = req.body;
    
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   const user = new User({ username, password: hashedPassword });
  //   await user.save();
  //   console.log(user)
  //   res.status(201).json({ message: 'User created successfully' });
  // } catch (error) {
  //   res.status(500).json({ message: 'Error creating user', error });
  // }
  const { username, password } = req.body;
  try {
    const checkUser = await User.findOne({ username });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({ username, password: hashedPassword });

      await user.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }

});

router.post('/login', async (req, res) => {
    
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User doesn't exists! Please register first" });
 
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      success:true,
      message:'Logged in successfully',
      token ,
    username});
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

module.exports = router;
