const { models, Sequelize } = require('../models')

const getRandomGiphy = async (req, res) => {
  try {
    const giphy = await models.Giphy.findOne({
      order: Sequelize.literal('RANDOM()')
    })

    if (!giphy) {
      return res.status(404).json({
        found: false,
        message: 'No giphy found'
      })
    }

    res.json({
      found: true,
      giphy
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const searchQuote = async (req, res) => {
  const { q } = req.query

  try {
    const giphy = await models.Giphy.findAll({
      where: {
        [Sequelize.Op.or]: [{ giphyTitle: { [Sequelize.Op.iLike]: `%${q}%` } }]
      }
    })

    if (!giphy || giphy.length === 0) {
      return res.status(404).json({ found: false, message: 'No giphy found for the given query' })
    }

    // Pick a random giphy from the search results
    const randomGiphy = giphy[Math.floor(Math.random() * giphy.length)]

    res.json({ found: true, giphy: randomGiphy })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getGiphyById = async (req, res) => {
  const { id } = req.params

  try {
    const giphy = await models.Giphy.findByPk(id)

    if (!giphy) {
      return res.status(404).json({ found: false, message: 'Giphy not found' })
    }

    res.json({ found: true, giphy })
  } catch (error) {
    res.status(500).json({ error: 'Error during fetching giphy by id' })
  }
}

const getGiphyByGifId = async (req, res) => {
  const { gifId } = req.params

  try {
    const giphy = await models.Giphy.findOne({
      where: { gifId: gifId }
    })

    if (!giphy) {
      return res.status(404).json({ found: false, message: 'Giphy not found' })
    }

    res.json({ found: true, giphy })
  } catch (error) {
    res.status(500).json({ error: 'Error during fetching giphy by gifId' })
  }
}

module.exports = {
  getRandomGiphy,
  searchQuote,
  getGiphyById,
  getGiphyByGifId
}
