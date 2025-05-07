require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios');

const userRoutes = require('./routes/userRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

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

// Sample Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/analyses', analysisRoutes);

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
// Enhanced cities endpoint
app.get('/api/cities', (req, res) => {
  try {
    res.json({
      status: 'success',
      data: sriLankanCities,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch cities list'
    });
  }
});


// Robust weather endpoint
app.get('/api/weather', async (req, res) => {
  try {
    // Use provided city or default to Colombo
    const city = req.query.city || 'Colombo';
    
    if (typeof city !== 'string') {
      return res.status(400).json({
        status: 'error',
        code: 'INVALID_CITY',
        message: 'City parameter must be a string',
        example: `${req.protocol}://${req.get('host')}/api/weather?city=Kandy`,
        availableCities: sriLankanCities
      });
    }

    // Check if city is in our predefined list
    if (!sriLankanCities.includes(city)) {
      return res.status(400).json({
        status: 'error',
        code: 'UNSUPPORTED_CITY',
        message: 'Requested city is not in our supported list',
        availableCities: sriLankanCities,
        example: `${req.protocol}://${req.get('host')}/api/weather?city=Colombo`
      });
    }

    // Validate API key
    if (!process.env.OPENWEATHER_API_KEY) {
      console.error('OpenWeather API key missing in environment variables');
      return res.status(500).json({
        status: 'error',
        code: 'SERVER_CONFIG_ERROR',
        message: 'Server configuration error'
      });
    }

    // Make API request with error handling
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: `${city.trim()},LK`,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'en'
      },
      timeout: 10000, // 10 second timeout
      validateStatus: (status) => status < 500 // Don't throw for 4xx errors
    });

    // Handle OpenWeather API errors
    if (response.data.cod && response.data.cod !== 200) {
      return res.status(400).json({
        status: 'error',
        code: 'WEATHER_API_ERROR',
        message: response.data.message || 'Failed to fetch weather data',
        availableCities: sriLankanCities
      });
    }

    // Validate API response structure
    if (!response.data.main || !response.data.weather) {
      throw new Error('Invalid response structure from weather API');
    }

    // Transform data for frontend
    const weatherData = {
      location: response.data.name,
      temperature: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      conditions: response.data.weather[0].description,
      wind: response.data.wind,
      visibility: response.data.visibility,
      timestamp: new Date().toISOString()
    };

    res.json({
      status: 'success',
      data: weatherData
    });

  } catch (error) {
    console.error('Weather endpoint error:', {
      message: error.message,
      stack: error.stack,
      request: error.config?.params
    });

    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.message || 'Failed to fetch weather data';

    res.status(statusCode).json({
      status: 'error',
      code: 'WEATHER_API_ERROR',
      message: errorMessage,
      details: statusCode === 401 ? 'Check your OpenWeather API key' : undefined,
      availableCities: sriLankanCities
    });
  }
});

