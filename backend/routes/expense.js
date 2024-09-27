// Example: expenses.js route
const express = require('express');
const router = express.Router();
const Subscription = require('../Models/Subscription');

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const subscriptions = await Subscription.find({});
        
        // Calculate total expenses
        const totalExpense = subscriptions.reduce((total, sub) => total + sub.cost, 0);
        
        // Format expenses
        const expenses = subscriptions.map(sub => ({
            name: sub.name,
            cost: sub.cost,
            startDate: new Date(), // Current date as the start date
            endDate: sub.renewalDate,
            category: sub.category
        }));

        // Return both total expense and individual expenses
        res.status(200).json({
            totalExpense,
            expenses
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching expenses." });
    }
});

module.exports = router;
