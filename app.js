// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config()
const Object = require('./object'); // Your Mongoose model for objects
const AuthObject = require('./auth');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
// Set up multer for handling image uploads if needed

// Connect to MongoDB Atlas
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});
  // Middleware for authentication
  const authenticate = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await AuthObject.findOne({ username, password });
      
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
      
      // Attach the authenticated user to the request object for later use
      req.authenticatedUser = user;
      next();
    } catch (error) {
      res.status(500).json({ error: 'Error authenticating user' });
    }
  };
// Define your CRUD routes for objects (similar to previous steps)
// Route to get and print the entire data in the "animals" collection
app.get('/animals',async (req, res) => {
    try {
      const animals = await AuthObject.find(); // Assuming your model is named "Object"
      res.status(200).json(animals);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving animals' });
    }
  });

  
// Create a new animal
app.post('/animals', async (req, res) => {
    try {
      const {
        img_link,
        name,
        scientific_name,
        population_trend,
        iucn_status,
        wpa,
        habitats_and_ecology,
        description,
        map_img_link,
      } = req.body;
  
      const newAnimal = new Object({
        img_link,
        name,
        scientific_name,
        population_trend,
        iucn_status,
        wpa,
        habitats_and_ecology,
        description,
        map_img_link,
      });
  
      const savedAnimal = await newAnimal.save();
      res.status(201).json(savedAnimal);
    } catch (error) {
      res.status(500).json({ error: 'Error creating animal' });
    }
  });
  
  // Get a specific animal by ID
  app.get('/animals/:animalId', async (req, res) => {
    try {
      const animal = await Object.findById(req.params.animalId);
      if (!animal) {
        return res.status(404).json({ error: 'Animal not found' });
      }
      res.status(200).json(animal);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving animal' });
    }
  });
  
  // Update an existing animal by ID
  app.put('/animals/:animalId', async (req, res) => {
    try {
      const {
        img_link,
        name,
        scientific_name,
        population_trend,
        iucn_status,
        wpa,
        habitats_and_ecology,
        description,
        map_img_link,
      } = req.body;
  
      const updatedAnimal = await Object.findByIdAndUpdate(
        req.params.animalId,
        {
          img_link,
          name,
          scientific_name,
          population_trend,
          iucn_status,
          wpa,
          habitats_and_ecology,
          description,
          map_img_link,
        },
        { new: true }
      );
  
      if (!updatedAnimal) {
        return res.status(404).json({ error: 'Animal not found' });
      }
  
      res.status(200).json(updatedAnimal);
    } catch (error) {
      res.status(500).json({ error: 'Error updating animal' });
    }
  });
  
  // Delete an animal by ID
  app.delete('/animals/:animalId', async (req, res) => {
    try {
      const deletedAnimal = await Object.findByIdAndDelete(req.params.animalId);
      if (!deletedAnimal) {
        return res.status(404).json({ error: 'Animal not found' });
      }
      res.status(204).send({ message: 'successfully deleted' }); // No content response for successful deletion
    } catch (error) {
      res.status(500).json({ error: 'Error deleting animal' });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
