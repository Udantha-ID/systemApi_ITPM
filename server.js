require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios');
const router = require('./routes/PlantationRoute');
const planningRoutes = require('./routes/PlantationPlanRoute')

// Import routes
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Check the loaded URI (optional debug)
console.log("Mongo URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API routes
app.use('/api/users', userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Weather endpoints
const sriLankanCities = [
  "Colombo", "Kandy", "Galle", "Jaffna", "Anuradhapura",
  "Matara", "Negombo", "Trincomalee", "Batticaloa", "Ratnapura"
];

// Get available cities
app.get('/api/cities', (req, res) => {
  res.json(sriLankanCities);
});

// Get weather data
app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: 'City name required' });

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: `${city},LK`,
          appid: process.env.OPENWEATHER_API_KEY,
          units: 'metric'
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// Plantation routes
app.use('/plantations', router);

//planning routes
app.use('/plannings', planningRoutes);
