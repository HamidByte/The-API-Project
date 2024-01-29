const { models, Sequelize, sequelize } = require('../models')
const { getRandomOrder } = require('../config/utils/databaseUtils')

const getRandomQuote = async (req, res) => {
  try {
    // // Get the count of quotes in the database
    //   const count = await models.Quote.count();

    //   // Generate a random ID within the range of existing IDs
    //   const randomId = Math.floor(Math.random() * count) + 1;

    //   // Fetch the quote with the random ID
    //   const quote = await models.Quote.findByPk(randomId);

    // Alternative method for random
    const quote = await models.Quote.findOne({
      order: getRandomOrder(sequelize.getDialect())
    })

    if (!quote) {
      return res.status(404).json({
        found: false,
        message: 'No quotes found'
      })
    }

    res.json({
      found: true,
      quote
    })
  } catch (error) {
    console.error('Error fetching random quote:', error)
    res.status(500).json({ found: false, message: 'Internal Server Error' })
  }
}

const searchQuote = async (req, res) => {
  const { q } = req.query

  try {
    const quotes = await models.Quote.findAll({
      where: {
        // Use Sequelize's "Op.like" operator for a case-insensitive search
        [Sequelize.Op.or]: [
          { quote: { [Sequelize.Op.like]: `%${q}%` } }, // Search in the quote field
          { category: { [Sequelize.Op.like]: `%${q}%` } } // Search in the category field
        ]
      }
    })

    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ found: false, message: 'No quotes found for the given query' })
    }

    // Pick a random quote from the search results
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    res.json({ found: true, quote: randomQuote })
  } catch (error) {
    console.error('Error searching quotes:', error)
    res.status(500).json({ found: false, message: 'Internal Server Error' })
  }
}

const getQuoteById = async (req, res) => {
  const { id } = req.params

  try {
    const quote = await models.Quote.findByPk(id)

    if (!quote) {
      return res.status(404).json({ found: false, message: 'Quote not found' })
    }

    res.json({ found: true, quote })
  } catch (error) {
    console.error('Error fetching quote by ID:', error)
    res.status(500).json({ found: false, message: 'Internal Server Error' })
  }
}

const getQuoteByCategory = async (req, res) => {
  const { category } = req.params

  try {
    const quotes = await models.Quote.findAll({
      where: {
        category: { [Sequelize.Op.like]: `%${category}%` }
      }
    })

    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ found: false, message: 'No quotes found for the given category' })
    }

    // Pick a random quote from the list
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    res.json({ found: true, quote: randomQuote })
  } catch (error) {
    console.error('Error fetching quotes by category:', error)
    res.status(500).json({ found: false, message: 'Internal Server Error' })
  }
}

const getQuoteByAuthor = async (req, res) => {
  const { author } = req.params

  try {
    const quotes = await models.Quote.findAll({
      where: {
        author: { [Sequelize.Op.like]: `%${author}%` }
      }
    })

    if (!quotes || quotes.length === 0) {
      return res.status(404).json({ found: false, message: 'No quotes found for the given author' })
    }

    // Pick a random quote from the list
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    res.json({ found: true, quote: randomQuote })
  } catch (error) {
    console.error('Error fetching quotes by author:', error)
    res.status(500).json({ found: false, message: 'Internal Server Error' })
  }
}

// const getAllQuotes = async (req, res) => {
//   try {
//     const quotes = await models.Quote.findAll()
//     res.json(quotes)
//   } catch (error) {
//     console.error('Error fetching all quotes:', error)
//     res.status(500).json({ found: false, message: 'Internal Server Error' })
//   }
// }

// const insertNewQuote = async (req, res) => {
//   try {
//     const { quote, author, category } = req.body
//     const newQuote = await models.Quote.create({ quote, author, category })
//     res.json(newQuote)
//   } catch (error) {
//     console.error('Error inserting new quote:', error)
//     res.status(500).json({ found: false, message: 'Internal Server Error' })
//   }
// }

module.exports = {
  getRandomQuote,
  searchQuote,
  getQuoteById,
  getQuoteByCategory,
  getQuoteByAuthor
  //   getAllQuotes,
  //   insertNewQuote
}
