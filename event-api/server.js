const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Use the cors middleware
app.use(cors({
  origin: "http://localhost:5173" // Corrected CORS origin
}));

// Body parser middleware
app.use(bodyParser.json()); // to parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase') // Add database name
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define Event schema and model
// Event schema
const eventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  info: String,
  img: String,
  like: { type: Number, default: 0 },
  comment: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  impressions: { type: Number, default: 0 }
});

// Model
const Event = mongoose.model('Event', eventSchema);

// Create an API route to add an event
app.post('/mydatabase/events', async (req, res) => {
  const { title, start, end, info, img, like = 0, comment = 0, shares = 0, impressions = 0 } = req.body;

  const event = new Event({
    title,
    start,
    end,
    info,
    img,
    like,
    comment,
    shares,
    impressions
  });

  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: 'Error saving event', error: err });
  }
});

// Create an API route to get all events
app.get('/mydatabase/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching events', error: err });
  }
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
