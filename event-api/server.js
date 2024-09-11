const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Use the cors middleware to allow requests from the frontend
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"] // Add more origins if needed
}));

// Body parser middleware
app.use(bodyParser.json()); // to parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase') // Add database name
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define Event schema and model
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

// Create an API route to get all events or filter by month
// Create an API route to get all events or filter by month
app.get('/mydatabase/events', async (req, res) => {
  const { month } = req.query;

  // Validate the month query parameter
  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return res.status(400).json({ message: 'Month query parameter must be in the format YYYY-MM' });
  }

  const [year, monthPart] = month.split('-');
  const startDate = new Date(`${year}-${monthPart}-01T00:00:00Z`);
  const endDate = new Date(`${year}-${(parseInt(monthPart) + 1).toString().padStart(2, '0')}-01T00:00:00Z`);

  // Ensure that if monthPart is "12", we adjust for the next year
  if (monthPart === '12') {
    endDate.setFullYear(startDate.getFullYear() + 1, 0, 1);
  }

  try {
    const events = await Event.find({
      start: {
        $gte: startDate,
        $lt: endDate
      }
    });
    res.json(events);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching events', error: err.message });
  }
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
