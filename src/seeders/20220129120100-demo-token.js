module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ApiKeys',
      [
        {
          uuid: 'a53c0f39-d8c0-4e3d-969e-6ab5cc547f41',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          tokenExpiration: '2022-12-31',
          userId: '4b3c5dd7-5d8e-4f87-8605-71d8693b5e69',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        // Add more token records as needed
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ApiKeys', null, {})
  }
}
