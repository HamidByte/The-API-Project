# The API Project, Node, Express, PostgreSQL, Sequelize, Session, JWT, Logger

TheAPIProject is a versatile and affordable API platform designed to provide developers with easy access to a diverse range of services. Initially conceived as a "Random Quote Generator API" the project is expanding its vision to encompass a rich collection of data services. Upcoming releases include GIFs, Dummy or Mock APIs for testing, Jokes, and more. With a focus on affordability and simplicity, TheAPIProject stands as the go-to solution for developers seeking dynamic content.

## API Documentation

Explore the API documentation on [Postman](https://www.postman.com/hamidbyte/workspace/the-api-project/overview).

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (https://nodejs.org/)
- PostgreSQL installed and running
- Git (optional, but recommended)

## Dependencies

- Express.js
- PostgreSQL
- Sequelize ORM for database
- ESLint for code linting
- Session-based Authentication for Users
- JWT Authentication for API Keys

## Setting Up PostgreSQL Server and Importing Database

Before running the server locally, ensure that you have set up your PostgreSQL. Import the provided database using the 'database.sql' file. Note the name of the imported database. You may need the database name when configuring the settings in `config/dbConfig.js`.

If you're a developer making modifications to the project, refer to the 'Database Management with Sequelize ORM' section for detailed information on creating the database, migrations, and seeders.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/HamidByte/The-API-Project.git
   ```

2. Install dependencies:

   ```bash
   cd The-API-Project
   npm install
   ```

3. Configure Environment Variables:

   Create a .env file in the root of the project and set the following variables:

   ```env
   SESSION_SECRET_KEY=your-secret-key
   API_SECRET_KEY=your-secret-key
   DATABASE_URL=database-url
   EMAIL_ADDRESS=your-email-address
   EMAIL_PASSWORD=your-email-password
   ```

   - A database URL is required if you intend to use a cloud database, and it's pre-configured for production.
   - To customize, modify the `config/dbConfig.js` file as needed.
   - Certain email services may block SMTP access. For Gmail, generate a Google app password, enabling the "less secure apps access" account setting in your Google account.
   - Note that this setting is turned off by default, and you need to enable it.
   - If you are using another email service provider that supports SMTP, update the settings in `config/emailConfig.js`.

4. Configure the Database Settings:

   Open `config/dbConfig.js` and update the fields below with your PostgreSQL database details:

   ```json
   "development": {
     "username": "your_username",
     "password": "your_password",
     "database": "your_database_name",
     "host": "your_database_host",
     "port": 5432,
     "dialect": "postgres"
   },
   ```

   - The default port for PostgreSQL is 5432.
   - Set the "dialect" to "postgres" for PostgreSQL.
   - After configuring the database settings, import the provided database using the 'database.sql' file.

5. Start the server:

   For development:

   ```bash
   npm start
   ```

   or

   ```bash
   npm run dev
   ```

   For production:

   ```bash
   npm run prod
   ```

   The server will be running at http://localhost:3000.

## Authentication Endpoints

### Register User

- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Create a new user account by providing valid registration details.

**Request**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "john.doe@example.com", "password": "securePassword"}' http://localhost:3000/register
```

**Response**

```json
{
  "message": "User registered successfully. Please check your email for activation."
}
```

### Login User

- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Authenticate an existing user by providing valid login credentials.

**Request**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "john.doe@example.com", "password": "securePassword"}' http://localhost:3000/register
```

**Response**

```json
{
  "uuid": "6a7b8c9d-1234-5678-90ab-cdef12345678",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe123",
  "email": "john.doe@example.com",
  "subscriptionStatus": "free",
  "requestCount": 0,
  "lastRequestDate": "2024-02-03T08:29:57.919Z",
  "isActive": true,
  "createdAt": "2024-02-03T08:29:58.052Z",
  "updatedAt": "2024-02-03T08:30:11.702Z"
}
```

### Activate Account

- **Endpoint:** `/activate?token=<token>`
- **Method:** `GET`
- **Description:** Activate a user account using the activation token sent via email.

**Request**

```bash
curl -X GET http://localhost:3000/activate?token=3c857304-3ca3-48d1-b1e7-6d5a41230106
```

**Response:**

```json
{
  "message": "User activated successfully"
}
```

### Resend Activation Link

- **Endpoint:** `/resend-activation`
- **Method:** `POST`
- **Description:** Resend the activation link to a user who hasn't activated the account within the specified time.

**Request**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "john.doe@example.com"}' http://localhost:3000/resend-activation
```

**Response:**

```json
{
  "message": "Activation link resent successfully. Please check your email for activation."
}
```

### Forget Password

- **Endpoint:** `/forget-password`
- **Method:** `POST`
- **Description:** Initiate the process of resetting the user's password by sending a reset link to their email.

**Request**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "john.doe@example.com"}' http://localhost:3000/forget-password
```

**Response:**

```json
{
  "message": "Password reset email sent successfully."
}
```

### Reset Password

- **Endpoint:** `/reset-password/:token`
- **Method:** `POST`
- **Description:** Reset the user's password using the reset token sent via email.
- **Parameters:**
  - `token`: Reset token received via email.

**Request**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "john.doe@example.com"}' http://localhost:3000/reset-password/3c857304-3ca3-48d1-b1e7-6d5a41230106
```

**Response:**

```json
{
  "message": "Password reset successful."
}
```

### Get User

- **Endpoint:** `/get-user`
- **Method:** `GET`
- **Description:** Get the user information.
- **Authorization:** Requires a valid session.

**Request**

```bash
curl -X GET http://localhost:3000/get-user
```

**Response:**

```json
{
  "uuid": "6a7b8c9d-1234-5678-90ab-cdef12345678",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe123",
  "email": "john.doe@example.com",
  "subscriptionStatus": "free",
  "requestCount": 0,
  "lastRequestDate": "2024-02-03T08:29:57.919Z",
  "isActive": true,
  "createdAt": "2024-02-03T08:29:58.052Z",
  "updatedAt": "2024-02-03T08:30:11.702Z"
}
```

### User Activation Status

- **Endpoint:** `/is-user-active`
- **Method:** `GET`
- **Description:** Get the user's activation status.
- **Authorization:** Requires a valid session.

**Request**

```bash
curl -X GET http://localhost:3000/is-user-active
```

**Response:**

```json
{
  "isActive": false,
  "message": "User is not activated"
}
```

or

```json
{
  "isActive": true,
  "message": "User is activated"
}
```

### Delete User

- **Endpoint:** `/delete`
- **Method:** `DELETE`
- **Description:** Deletes the user account.
- **Authorization:** Requires a valid session.

**Request**

```bash
curl -X DELETE http://localhost:3000/delete
```

**Response:**

```json
{
  "message": "User deleted successfully."
}
```

## Protected Routes

Note: The authorization header requires a valid session.

### Update User Profile

- **Endpoint:** `/update-profile`
- **Method:** `POST`
- **Description:** Update the user's profile information, including first name, last name, and username.
- **Authorization:** Requires a valid session.

**Request**

```bash
curl -X POST -H "Cookie: session=<your-session-cookie>" -d '{"firstName": "John", "lastName": "Doe", "username": "john_doe", "password": ""}' http://localhost:3000/update-profile
```

**Response:**

```json
{
  "message": "Profile updated successfully."
}
```

### Update User Email

- **Endpoint:** `/update-email`
- **Method:** `POST`
- **Description:** Request to update the user's email address.
- **Authorization:** Requires a valid session.

**Request**

```bash
curl -X POST -H "Cookie: session=<your-session-cookie>" -d '{"email": "john.doe@example.com"}' http://localhost:3000/update-email
```

**Response:**

```json
{
  "message": "A confirmation link has been sent to your email account."
}
```

### Confirm Email Activation Link

- **Endpoint:** `/confirm-email`
- **Method:** `POST`
- **Description:** Confirm the email activation link to update the user's email address.
- **Authorization:** Requires a valid session.

**Request**

```bash
curl -X POST -H "Cookie: session=<your-session-cookie>" http://localhost:3000/confirm-email?token=01abca7e-e185-46f5-a420-85cc43191698&email=john.doe@example.com
```

**Response:**

```json
{
  "message": "User email updated successfully."
}
```

### Generate API Key

- **Endpoint:** `/generate`
- **Method:** `POST`
- **Description:** Generates a new API key for a user.
- **Authorization:** Requires a valid session.

**Request**

```bash
curl -X POST -H "Cookie: session=<your-session-cookie>" -d "tokenExpiration=24h" http://localhost:3000/generate
```

**Response**

```json
{
  "apiKey": {
    "uuid": "generated-uuid",
    "token": "generated-token",
    "tokenExpiration": "24h",
    "userId": "user-id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### Get API Key

- **Endpoint:** `/get-api`
- **Method:** `PUT`
- **Description:** Fetch the existing API key for a user.
- **Authorization:** Requires a valid session.

**Request**

```bash
curl -X PUT -H "Cookie: session=<your-session-cookie>" http://localhost:3000/get-api
```

**Response**

```json
{
  "apiKey": {
    "uuid": "generated-uuid",
    "token": "generated-token",
    "tokenExpiration": "24h",
    "userId": "user-id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

### Delete API Key

- **Endpoint:** `/revoke`
- **Method:** `DELETE`
- **Description:** Deletes the existing API key for a user.
- **Authorization:** Requires a valid session.

**Request**

```bash
curl -X DELETE -H "Cookie: session=<your-session-cookie>" http://localhost:3000/revoke
```

**Response**

```json
{
  "message": "API Key has been successfully deleted"
}
```

## API Endpoints

Note: The authorization header Requires a valid authentication token. Use the generated token in the `Authorization` header.

### Get Random Quote

- **Endpoint:** `/api/v1/quote/random`
- **Method:** `GET`
- **Description:** Returns a random quote from the database.
- **Example:** `http://localhost:3000/api/v1/quote/random`
- **Authorization:** Requires a valid authentication token.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" http://localhost:3000/api/v1/quote/random
```

**Response**

```json
{
  "found": true,
  "quote": {
    "id": 498765,
    "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu est vel enim lacinia sodales.",
    "author": "John Doe",
    "category": "inspiration, philosophy",
    "createdAt": "2024-02-01T10:15:30.000Z",
    "updatedAt": "2024-02-01T10:15:30.000Z"
  }
}
```

### Get Random Quote by ID

- **Endpoint:** `/api/v1/quote/:id`
- **Method:** `GET`
- **Description:** Returns a quote with the specified ID.
- **Example:** `http://localhost:3000/api/v1/quote/1`
- **Authorization:** Requires a valid authentication token.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" http://localhost:3000/api/v1/quote/498765
```

**Response**

```json
{
  "found": true,
  "quote": {
    "id": 498765,
    "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu est vel enim lacinia sodales.",
    "author": "John Doe",
    "category": "inspiration, philosophy",
    "createdAt": "2024-02-01T10:15:30.000Z",
    "updatedAt": "2024-02-01T10:15:30.000Z"
  }
}
```

### Search for Random Quote with Query

- **Endpoint:** `/api/v1/quote/search?q=query`
- **Method:** `GET`
- **Description:** Performs a case-insensitive search for a random quote based on the provided query string in the quote and category fields.
- **Example:** `http://localhost:3000/api/v1/quote/search?q=lorem`
- **Authorization:** Requires a valid authentication token.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" http://localhost:3000/api/v1/quote/search?q=lorem
```

**Response**

```json
{
  "found": true,
  "quote": {
    "id": 498765,
    "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu est vel enim lacinia sodales.",
    "author": "John Doe",
    "category": "inspiration, philosophy",
    "createdAt": "2024-02-01T10:15:30.000Z",
    "updatedAt": "2024-02-01T10:15:30.000Z"
  }
}
```

### Get Random Quotes by Category

- **Endpoint:** `/api/v1/quote/category/:category`
- **Method:** `GET`
- **Description:** Returns a randomly selected quote from the list of quotes belonging to the specified category.
- **Example:** `http://localhost:3000/api/v1/quote/category/inspiration`
- **Authorization:** Requires a valid authentication token.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" http://localhost:3000/api/v1/quote/category/inspiration
```

**Response**

```json
{
  "found": true,
  "quote": {
    "id": 498765,
    "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu est vel enim lacinia sodales.",
    "author": "John Doe",
    "category": "inspiration, philosophy",
    "createdAt": "2024-02-01T10:15:30.000Z",
    "updatedAt": "2024-02-01T10:15:30.000Z"
  }
}
```

### Get Random Quotes by Author

- **Endpoint:** `/api/v1/quote/author/:author`
- **Method:** `GET`
- **Description:** Returns a randomly selected quote from the list of quotes written by the specified author.
- **Example:** `http://localhost:3000/api/v1/quote/author/John Green`
- **Authorization:** Requires a valid authentication token.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" http://localhost:3000/api/v1/quote/author/John Doe
```

**Response**

```json
{
  "found": true,
  "quote": {
    "id": 498765,
    "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu est vel enim lacinia sodales.",
    "author": "John Doe",
    "category": "inspiration, philosophy",
    "createdAt": "2024-02-01T10:15:30.000Z",
    "updatedAt": "2024-02-01T10:15:30.000Z"
  }
}
```

## Acknowledgments

Thank you to the open-source community for providing valuable tools and libraries.

## Session Middleware

We utilize `connect-session-sequelize` to automatically create a Session table in the database whenever a new session is initiated, ensuring synchronization with the database. This middleware tracks incoming requests, updating the session in the database, and responds with an encrypted cookie.

In order to configure it to create a new column named `userId` with a default value of `null` and update it upon user login, note that `connect-session-sequelize` doesn't inherently support this feature. However, you can achieve this by manually modifying the table structure in your PostgreSQL database.

Manually adjust the `Sessions` table in your PostgreSQL database by adding the `userId` column with a default value of `null`:

```sql
ALTER TABLE "Sessions" ADD COLUMN "userId" UUID DEFAULT NULL;
```

## Database Management with Sequelize ORM

Ensure Sequelize CLI is installed globally by running the following command:

```bash
npm install -g sequelize-cli
```

### Create Database

Run the following command to create the database defined in your Sequelize configuration:

```bash
npx sequelize db:create
```

This command (`npx sequelize db:create`) is used to create the database as specified in your Sequelize configuration. Make sure your configuration file (`config/dbConfig.js`) is correctly set up before running this command.

### Migrations

Migrations in Sequelize are scripts that define changes to your database schema, such as creating or modifying tables. The `npx sequelize db:migrate` command is used to apply any pending migrations in your Sequelize project.

When you run `npx sequelize db:migrate`, Sequelize will search for pending migration files in the `migrations` directory and execute them in the order they were created. Each migration file contains JavaScript code that defines the changes to be made to the database schema. Migrations are crucial for managing database changes in a structured and version-controlled manner. They allow you to evolve your database schema over time while keeping track of changes, making collaboration with other developers more manageable.

If you have modified the default configuration file (`config/config.json`) to use a custom configuration file (`config/dbConfig.js`), ensure that you use the `--config` option when running Sequelize CLI commands. For example:

```bash
npx sequelize-cli db:migrate --config config/dbConfig.js
```

Additionally, if you consistently want to use this custom configuration file without specifying it each time, consider creating a `.sequelizerc` file in your project's root directory. This file can specify the custom configuration file path for Sequelize CLI commands.

With the .sequelizerc file in place, Sequelize CLI commands will automatically use the specified configuration file:

```bash
npx sequelize-cli db:migrate
```

### Generating Migrations

To create new migrations for changes in your models, use the Sequelize CLI to generate migration files. For example:

```bash
npx sequelize-cli migration:generate --name create-user
```

This command generates a new migration file in the `migrations` directory. Edit this file to define the changes you want to make to the database schema. Finally, run `npx sequelize-cli db:migrate` to apply those changes.

Remember, migrations are used to manage changes to your database schema over time. They are typically employed when you make changes to your models (e.g., adding a new column). If your models and database are already in sync, there might be no need to create new migrations until you make further changes to your models.

### Generating Models

`npx sequelize model:generate` is used to generate a new Sequelize model file. Models define the structure of your data and are often used with migrations to create or modify database tables.

Example:

```bash
npx sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
```

This creates a new model file in the `models` directory. Use this model file to define your data structure, and Sequelize CLI can generate migrations based on the model definitions.

### Model-Specific Migrations

To create migrations for Sequelize models, generate migration files using `npx sequelize model:generate`. Adjust the commands based on your specific model definitions:

1. User Model Migration:

```bash
npx sequelize model:generate --name User --attributes uuid:UUID:primaryKey,firstName:string,lastName:string,username:string,email:string:unique,password:string,subscriptionStatus:enum,requestCount:integer,lastRequestDate:date
```

Review the generated migration file to ensure data types and constraints match your model.

2. ApiKey Model Migration:

```bash
npx sequelize model:generate --name ApiKey --attributes uuid:UUID:primaryKey,token:string,tokenExpiration:string,userId:UUID:unique
```

Review the generated migration file to ensure it matches your ApiKey model.

3. Quote Model Migration:

```bash
npx sequelize model:generate --name Quote --attributes quote:string,author:string,category:string
```

Review the generated migration file for the Quote model.

### Creating Migrations

After generating migration files, run the following command to apply changes to your database:

If you are using Sequelize version 6 or later:

```bash
npx sequelize db:migrate
```

If you are using an older version and have `sequelize-cli `installed separately:

```bash
npx sequelize-cli db:migrate
```

Ensure you have a PostgreSQL database created and configured in your Sequelize `config/dbConfig.js` file.

To undo the last migration:

```bash
npx sequelize db:migrate:undo
```

Migrations should be used carefully, especially in production. It's good practice to back up your database before applying or undoing migrations.

The `npx sequelize model:generate` command automatically generates migration files based on the model definition. However, it's good practice to review generated migration files to ensure they accurately reflect your database schema.

Remember to adjust Sequelize CLI commands based on your project's specific structure and file organization. If you encounter issues, check error messages and adjust accordingly.

## Seeders

Seeders are scripts designed to insert predefined data into your database tables. They are invaluable for populating databases with initial or default data. This guide will walk you through creating and executing seeders in Sequelize.

### Usage and Commands

The `npx sequelize db:seed:all` command in Sequelize is used to execute all seeders defined in your Sequelize project. Seeders are typically stored in the `seeders` directory. When you run `npx sequelize db:seed:all`, Sequelize will execute all the seeders one by one, inserting predefined data into the respective tables in your database.

```bash
npx sequelize db:seed:all
```

Be cautious with seeders, especially in production environments, as they can modify data in your database. They are commonly used for initial data setup, testing, or populating databases with default values. If you need to undo changes made by seeders, you can use the `npx sequelize db:seed:undo:all` command.

### Creating Seeders

Below are examples of seeders for your models (`User`, `ApiKey`, and `Quote`) with some dummy data. Create separate seeders for each model and save these scripts in the `seeders` directory.

1. User Seeder (`seeders/20220129120000-demo-user.js`):

```js
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
```

2. ApiKey Seeder (`seeders/20220129120100-demo-token.js`):

```js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ApiKey',
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
```

3. Quote Seeder (`seeders/20220129120200-demo-quote.js`):

```js
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
```

To execute all seeders and populate your database:

```bash
npx sequelize db:seed:all
```

This command will execute all the seeders, and your database will be populated with the dummy data you specified in the seeders. Adjust the data in the seeders according to your needs.

## Automated Migration Generation

The Sequelize CLI allows developers to generate empty migration files using the `migration:generate` command. However, these generated files intentionally remain empty, providing developers with the flexibility to define specific changes to the database schema.

While the Sequelize CLI does not automatically generate migration code based on your models, creating a script to automate this process can be highly convenient. Below is an example Node.js script that generates migration files and inserts the corresponding code:

1. Create a file named `generate-migrations.js` in your project directory:

```js
const fs = require('fs')
const path = require('path')

// Define your models here
const models = [
  {
    name: 'User',
    attributes: 'uuid:UUID:primaryKey,firstName:string,lastName:string,username:string,email:string:unique,password:string,subscriptionStatus:enum,requestCount:integer,lastRequestDate:date'
  },
  {
    name: 'ApiKey',
    attributes: 'uuid:UUID:primaryKey,token:string,tokenExpiration:string,userId:UUID:unique'
  },
  {
    name: 'Quote',
    attributes: 'quote:string,author:string,category:string'
  }
]

// Set the migrations directory
const migrationsDir = path.join(__dirname, 'migrations')

// Ensure the migrations directory exists
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir)
}

// Generate migration files
models.forEach(model => {
  const migrationName = `create-${model.name.toLowerCase()}.js`
  const migrationPath = path.join(migrationsDir, migrationName)

  const migrationContent = `
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('${model.name}s', {
      ${model.attributes.split(',').join(',\n      ')}
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('${model.name}s');
  },
};
`

  fs.writeFileSync(migrationPath, migrationContent)

  console.log(`Generated migration file: ${migrationPath}`)
})

console.log('Migration files generated successfully.')
```

2. Run the script:

```bash
node generate-migrations.js
```

This script will generate migration files for each model, with the corresponding code inside, based on the defined attributes. Adjust the models and attributes in the script according to your project's needs.

After running the script, use the Sequelize CLI to apply the migrations:

```bash
npx sequelize-cli db:migrate
```

Note: This approach involves some manual setup in the script, and it may not cover all edge cases. Always review the generated migration files to ensure they match your models and database requirements.
