// models/Platform.js

const mongoose = require('mongoose');

// Define the schema for the platform
const platformSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure platform names are unique
    },
}, { timestamps: true });

// Create the model only if it doesn't already exist
const Platform = mongoose.models.Platform || mongoose.model('Platform', platformSchema);

module.exports = Platform; // Export the model
