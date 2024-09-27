const express = require('express');
const router = express.Router();
const Subscription = require('../Models/Subscription');

// Get all subscriptions
router.get('/', async (req, res) => {
    try {
        const subscriptions = await Subscription.find(); // Fetch all subscriptions
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subscriptions.", error: error.message });
    }
});

// Add a new subscription
router.post('/', async (req, res) => {
    const { name, cost, renewalDate, category } = req.body;
    const newSubscription = new Subscription({ name, cost, renewalDate, category });
    try {
        await newSubscription.save();
        res.status(201).json(newSubscription);
    } catch (error) {
        res.status(400).json({ message: "Error adding subscription.", error: error.message });
    }
});

// Edit a subscription
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, cost, renewalDate, category } = req.body;
    try {
        const updatedSubscription = await Subscription.findByIdAndUpdate(id, { name, cost, renewalDate, category }, { new: true });
        if (!updatedSubscription) {
            return res.status(404).json({ message: "Subscription not found." });
        }
        res.status(200).json(updatedSubscription);
    } catch (error) {
        res.status(400).json({ message: "Error updating subscription.", error: error.message });
    }
});

// Delete a subscription
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSubscription = await Subscription.findByIdAndDelete(id);
        if (!deletedSubscription) {
            return res.status(404).json({ message: "Subscription not found." });
        }
        res.status(200).json({ message: "Subscription deleted." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting subscription.", error: error.message });
    }
});

module.exports = router;
