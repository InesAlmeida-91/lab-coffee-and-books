const express = require('express');
const router = express.Router();
const Place = require('../models/place.model');

// Read
router.get('/list', async (req, res, next) => {
  try {
    const places = await Place.find();
    console.log(places);
    res.render('list', { places });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Create
router.get('/create', async (req, res, next) => {
  try {
    res.render('new');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const { name, type, latitude, longitude } = req.body;
    const newPlace = await Place.create({ 
      name, 
      type,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      }
    });
    console.log(newPlace);
    res.redirect('/list');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Update
router.get('/list/:id/update', async (req, res, next) => {
  try {
    const placeToUpdate = await Place.findById(req.params.id);
    console.log(placeToUpdate);
    res.render('update', { placeToUpdate });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/list/:id/update', async (req, res, next) => {
  try {
    const { name, type, latitude, longitude } = req.body;
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      { 
        name, 
        type, 
        location: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        }
      },
      { new: true }
    );
    console.log(updatedPlace);
    res.redirect('/list');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Delete
router.post('/list/:id/delete', async (req, res, next) => {
  try {
    const deletePlace = await Place.findByIdAndDelete(req.params.id);
    console.log(deletePlace);
    res.redirect('/list');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;