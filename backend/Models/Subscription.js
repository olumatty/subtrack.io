const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    renewalDate: {
        type: Date,
        required: true,
    },
    category: {
        type: String, // Change this line
        required: true,
    },
    
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
