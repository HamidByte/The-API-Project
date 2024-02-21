module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          uuid: '4b3c5dd7-5d8e-4f87-8605-71d8693b5e69',
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
          email: 'john@example.com',
          password: 'password123',
          subscriptionStatus: 'free',
          requestCount: 10,
          lastRequestDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
        // Add more user records as needed
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
