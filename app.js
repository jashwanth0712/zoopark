// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const Object = require('./object'); // Your Mongoose model for objects

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
// Set up multer for handling image uploads if needed

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://jashwanth0712:Jashwanth12345@cluster0.nqmlvz3.mongodb.net/animal_details', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Define your CRUD routes for objects (similar to previous steps)
// Route to get and print the entire data in the "animals" collection
app.get('/animals', async (req, res) => {
    try {
      const animals = await Object.find(); // Assuming your model is named "Object"
      res.status(200).json(animals);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving animals' });
    }
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
