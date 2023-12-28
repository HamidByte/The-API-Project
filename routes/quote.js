const express = require('express');
const { models, Sequelize, sequelize } = require('../models');

const router = express.Router();

// // GET /api/quotes
// router.get('/', async (req, res) => {
//   const quotes = await models.Quote.findAll();
//   res.json(quotes);
// });

// // POST /api/quotes
// router.post('/', async (req, res) => {
//   const { quote, author, category } = req.body;
//   const newQuote = await models.Quote.create({ quote, author, category });
//   res.json(newQuote);
// });

// GET /api/quotes/random
router.get('/random', async (req, res) => {
  try {
  // // Get the count of quotes in the database
  //   const count = await models.Quote.count();

  //   // Generate a random ID within the range of existing IDs
  //   const randomId = Math.floor(Math.random() * count) + 1;

  //   // Fetch the quote with the random ID
  //   const quote = await models.Quote.findByPk(randomId);

    // Better way to do that
    const quote = await models.Quote.findOne({
      order: sequelize.literal('RAND()'), // Order by a random row for MySQL
    });

    if (!quote) {
      return res.status(404).json({ message: 'No quotes found' });
    }

    res.json(quote);
  } catch (error) {
    console.error('Error fetching random quote:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET /api/quotes/search?q=query
router.get('/search', async (req, res) => {
  const { q } = req.query;

  try {
    const quotes = await models.Quote.findAll({
      where: {
        // Use Sequelize's "Op.like" operator for a case-insensitive search
        [Sequelize.Op.or]: [
          
          { quote: { [Sequelize.Op.like]: `%${q}%` } }, // Search in the quote field
          { category: { [Sequelize.Op.like]: `%${q}%` } }, // Search in the category field
        ],
      },
    });

    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ message: 'No quotes found for the given query' });
    }

    // Pick a random quote from the search results
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    res.json(randomQuote);
  } catch (error) {
    console.error('Error searching quotes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET /api/quotes/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const quote = await models.Quote.findByPk(id);

    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    res.json(quote);
  } catch (error) {
    console.error('Error fetching quote by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;