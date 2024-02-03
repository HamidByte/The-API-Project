const { models, Sequelize } = require('../models')

const handleServerError = (res, error, operation) => {
  const errorMessage = `${operation}: ${error.message}`

  if (process.env.NODE_ENV === 'development') {
    console.error(errorMessage, error)
    res.status(500).json({ error: 'Internal Server Error', message: errorMessage })
  } else {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getRandomQuote = async (req, res) => {
  try {
    const quote = await models.Quote.findOne({
      order: Sequelize.literal('RANDOM()')
    })

    if (!quote) {
      return res.status(404).json({
        found: false,
        message: 'No quote found'
      })
    }

    res.json({
      found: true,
      quote
    })
  } catch (error) {
    handleServerError(res, error, 'Error during fetching random quote')
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
      return res.status(404).json({ found: false, message: 'No quote found for the given query' })
    }

    // Pick a random quote from the search results
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    res.json({ found: true, quote: randomQuote })
  } catch (error) {
    handleServerError(res, error, 'Error during searching quote')
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
    handleServerError(res, error, 'Error during fetching quote by id')
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
      return res.status(404).json({ found: false, message: 'No quote found for the given category' })
    }

    // Pick a random quote from the list
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    res.json({ found: true, quote: randomQuote })
  } catch (error) {
    handleServerError(res, error, 'Error during fetching quote by category')
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
      return res.status(404).json({ found: false, message: 'No quote found for the given author' })
    }

    // Pick a random quote from the list
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

    res.json({ found: true, quote: randomQuote })
  } catch (error) {
    handleServerError(res, error, 'Error during fetching quote by author')
  }
}

// const getAllQuotes = async (req, res) => {
//   try {
//     const quotes = await models.Quote.findAll()
//     res.json(quotes)
//   } catch (error) {
//     handleServerError(res, error, 'Error during fetching all quotes')
//   }
// }

// const insertNewQuote = async (req, res) => {
//   try {
//     const { quote, author, category } = req.body
//     const newQuote = await models.Quote.create({ quote, author, category })
//     res.json(newQuote)
//   } catch (error) {
//     handleServerError(res, error, 'Error during inserting new quote')
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
