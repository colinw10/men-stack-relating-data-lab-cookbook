// controllers/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.get('/', async function (req, res) {
  try {
    const users = await User.find({}, 'username pantry');
    res.render('users/index.ejs', { users: users });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});


router.get('/:userId', async function (req, res) {
  try {
    const otherUser = await User.findById(req.params.userId);
    if (!otherUser) return res.redirect('/users');

    res.render('users/show.ejs', { otherUser: otherUser });
  } catch (err) {
    console.log(err);
    res.redirect('/users');
  }
});

module.exports = router;
