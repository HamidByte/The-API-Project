module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Quotes',
      [
        {
          quote: 'To be or not to be, that is the question.',
          author: 'William Shakespeare',
          category: 'Literature',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        // Add more quote records as needed
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Quotes', null, {})
  }
}
