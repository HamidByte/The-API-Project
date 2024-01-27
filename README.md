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
2. Set up the database configuration in `config/config.json`. Open `config/config.json` and update the following fields with your MySQL database information:
   ```json
   "development": {
     "username": "your_username",
     "password": "your_password",
     "database": "your_database_name",
     "host": "your_database_host",
     "dialect": "mysql"
   },
   ```
3. Configure environment variables
4. Run migrations: `npx sequelize db:migrate`
5. Seed the database: `npx sequelize db:seed:all`
6. Start the server: `npm start`

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

3. Configure Environment Variables:

   Create a .env file in the root of the project and set the following variables:

   ```env
   SECRET_KEY=your-secret-key
   ```

4. Set up the MySQL database:

   Create a MySQL database and update the connection details in config/config.json.

5. Run the migrations to create tables:

   ```bash
   npx sequelize-cli db:migrate
   ```

6. Start the server:
   ```bash
   npm start
   ```
   or
   ```bash
   npm run dev
   ```
   The server will be running at http://localhost:3000.

## Authentication Endpoints

### Generate Token

- **Endpoint:** `/api/v1/auth/token`
- **Method:** `POST`
- **Description:** Generates a new authentication token for a user.

**Request**

```bash
curl -X POST -d "userId=<user-id>" http://localhost:3000/api/v1/auth/token
```

**Response**

```json
{
  "token": "<generated-token>"
}
```

### Regenerate Token

- **Endpoint:** `/api/v1/auth/token`
- **Method:** `PUT`
- **Description:** Regenerates the existing authentication token for a user.

**Request**

```bash
curl -X PUT -d "userId=<user-id>" http://localhost:3000/api/v1/auth/token
```

**Response**

```json
{
  "token": "<regenerated-token>"
}
```

### Delete Token

- **Endpoint:** `/api/v1/auth/token`
- **Method:** `DELETE`
- **Description:** Deletes the existing authentication token for a user.

**Request**

```bash
curl -X DELETE -d "userId=<user-id>" http://localhost:3000/api/v1/auth/token
```

**Response**

```bash
HTTP/1.1 204 No Content
```

### Check Token Existence

- **Endpoint:** `/api/v1/auth/token/exists`
- **Method:** `GET`
- **Description:** Checks if a token exists for a given user.

**Request**

```bash
curl http://localhost:3000/api/v1/auth/token/exists?userId=<user-id>
```

**Response**

```json
{
  "exists": true
}
```

## API Endpoints

**Important Note:** All requests to the following endpoints require the `userId` parameter in the request body. Ensure to include it for successful authentication and interaction with the API.

### Get Random Quote

- **Endpoint:** `/api/v1/quote/random`
- **Method:** `GET`
- **Description:** Returns a random quote from the database.
- **Example:** `http://localhost:3000/api/v1/quote/random`
- **Authorization:** Requires a valid authentication token. Use the generated token in the `Authorization` header.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" -d '{"userId": "<user-id>"}' http://localhost:3000/api/v1/quote/random
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
- **Authorization:** Requires a valid authentication token. Use the generated token in the `Authorization` header.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" -d '{"userId": "<user-id>"}' http://localhost:3000/api/v1/quote/498765
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
- **Authorization:** Requires a valid authentication token. Use the generated token in the `Authorization` header.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" -d '{"userId": "<user-id>"}' http://localhost:3000/api/v1/quote/search?q=lorem
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
- **Authorization:** Requires a valid authentication token. Use the generated token in the `Authorization` header.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" -d '{"userId": "<user-id>"}' http://localhost:3000/api/v1/quote/category/inspiration
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
- **Authorization:** Requires a valid authentication token. Use the generated token in the `Authorization` header.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" -d '{"userId": "<user-id>"}' http://localhost:3000/api/v1/quote/author/John Doe
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
