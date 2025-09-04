// controllers/foods.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));
router.use(express.urlencoded({ extended: true }));

// INDEX - GET /users/:userId/foods
router.get('/', async function (req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) return res.redirect('/');

    res.render('foods/index.ejs', {
      pantry: currentUser.pantry
    });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

router.get('/new', function (req, res) {
  res.render('foods/new.ejs');
});

// CREATE - POST /users/:userId/foods
router.post('/', async function (req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) return res.redirect('/');

    currentUser.pantry.push({ name: req.body.name });
    await currentUser.save();

    res.redirect('/users/' + currentUser._id + '/foods');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// EDIT - GET /users/:userId/foods/:itemId/edit
router.get('/:itemId/edit', async function (req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) return res.redirect('/');

    const item = currentUser.pantry.id(req.params.itemId);
    if (!item) return res.redirect('/users/' + currentUser._id + '/foods');

    res.render('foods/edit.ejs', { item: item });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// UPDATE - PUT /users/:userId/foods/:itemId
router.put('/:itemId', async function (req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) return res.redirect('/');

    const item = currentUser.pantry.id(req.params.itemId);
    if (!item) return res.redirect('/users/' + currentUser._id + '/foods');

    // Update fields
    item.set({ name: req.body.name });
    await currentUser.save();

    res.redirect('/users/' + currentUser._id + '/foods');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// DELETE - DELETE /users/:userId/foods/:itemId
router.delete('/:itemId', async function (req, res) {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser) return res.redirect('/');

    currentUser.pantry.id(req.params.itemId).deleteOne();
    await currentUser.save();

    res.redirect('/users/' + currentUser._id + '/foods');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;
