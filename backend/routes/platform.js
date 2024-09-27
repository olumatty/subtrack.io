// routes/platform.js

const express = require('express');
const Platform = require("../Models/Platform"); // Ensure this path is correct
const router = express.Router();

const defaultPlatforms = [
    'Netflix', 'YouTube Premium', 'Spotify', 'Kaspersky',
    'Apple Music+', 'Amazon Prime', 'YouTube Music', 'HBO',
    'AWS', 'Vercel', 'Netlify', 'GCP', 'Gym'
];

// GET /platforms - Retrieve all platforms
router.get('/', async (req, res) => {
    try {
        const userPlatforms = await Platform.find(); // Fetch all custom platforms
        const allPlatforms = [...defaultPlatforms, ...userPlatforms.map(p => p.name)];
        res.json(allPlatforms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving platforms' });
    }
});

// POST /platforms - Add a new platform
router.post('/', async (req, res) => {
    const { name } = req.body;

    // Check if the platform is a default platform
    if (defaultPlatforms.includes(name)) {
        return res.status(400).json({ message: 'Cannot create a default platform.' });
    }

    try {
        const newPlatform = new Platform({ name }); // Create a new platform instance
        await newPlatform.save(); // Save to the database
        res.status(201).json(newPlatform); // Respond with the created platform
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Error adding platform', error: err.message });
    }
});

module.exports = router; // Export the router
