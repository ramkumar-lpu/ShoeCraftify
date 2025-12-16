import express from 'express';
const router = express.Router();
import Design from '../models/Design.js';

// Middleware to check if user is authenticated (assuming you have one, or we check req.user)
// For now, we'll check req.user inside the route or assume main server passes it if session based

// Save a new design
router.post('/', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const { templateId, name, customization, price, imageUrl } = req.body;

        const newDesign = new Design({
            user: req.user._id,
            templateId,
            name,
            customization,
            price,
            imageUrl
        });

        const savedDesign = await newDesign.save();

        res.status(201).json({
            success: true,
            design: savedDesign,
            message: 'Design saved successfully'
        });
    } catch (error) {
        console.error('Error saving design:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get user's designs
router.get('/my-designs', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const designs = await Design.find({ user: req.user._id }).sort({ createdAt: -1 });

        res.json({
            success: true,
            designs
        });
    } catch (error) {
        console.error('Error fetching designs:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
