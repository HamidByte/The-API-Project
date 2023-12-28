const express = require('express');
const quoteRoutes = require('./quote');

const router = express.Router();

// Define quote routes
router.use('/quotes', quoteRoutes);

module.exports = router;