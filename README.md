# Random Quote Generator API

Random Quote Generator API provides APIs for accessing random quotes and performing searches based on various criteria. It uses Node.js, Express.js, Sequelize for MySQL database, and ESLint for code linting.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (https://nodejs.org/)
- MySQL database installed and running
- Git (optional, but recommended)

## Dependencies

- Express.js
- Sequelize ORM
- MySQL database

## Running the API Locally

1. Install dependencies: `npm install`
2. Set up the database configuration in `config/config.json`.
   Open `config/config.json` and update the following fields with your MySQL database information:
   ```json
   "development": {
     "username": "your_username",
     "password": "your_password",
     "database": "your_database_name",
     "host": "your_database_host",
     "dialect": "mysql"
   },
   ```
3. Run migrations: `npx sequelize db:migrate`
4. Seed the database: `npx sequelize db:seed:all`
5. Start the server: `npm start`
6. Access the API at `http://localhost:3000/api/quotes`

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/mhamid49/random-quote-generator-api.git
    ```
2. Install dependencies:
    ```bash
    cd random-quote-generator-api
    npm install
    ```
3. Set up the MySQL database:

    Create a MySQL database and update the connection details in config/config.json.
    
4. Run the migrations to create tables:

    ```bash
    npx sequelize-cli db:migrate
    ```

5. Start the server:
    ```bash
    npm run dev
    ```
    The server will be running at http://localhost:3000.

## API Endpoints

### Get Random Quote

- **Endpoint:** `/api/quotes/random`
- **Method:** `GET`
- **Description:** Returns a random quote from the database.
- **Example:** `http://localhost:3000/api/quotes/random`

### Get Quote by ID

- **Endpoint:** `/api/quotes/:id`
- **Method:** `GET`
- **Description:** Returns a quote with the specified ID.
- **Example:** `http://localhost:3000/api/quotes/1`

### Search for Random Quote with Query

- **Endpoint:** `/api/quotes/search?q=query`
- **Method:** `GET`
- **Description:** Performs a case-insensitive search for a random quote based on the provided query string in the quote and category fields.
- **Example:** `http://localhost:3000/api/quotes/search?q=inspiration`

## Acknowledgments

Thank you to the open-source community for providing valuable tools and libraries.