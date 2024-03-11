# The API Project, Node, Express, PostgreSQL, Sequelize ORM, Session, JWT, Subscription, Logger

TheAPIProject is a versatile and affordable API platform designed to provide developers with easy access to a diverse range of services. Initially conceived as a "Random Quote Generator API" the project is expanding its vision to encompass a rich collection of data services. Upcoming releases include GIFs, Dummy or Mock APIs for testing, Jokes, and more. With a focus on affordability and simplicity, TheAPIProject stands as the go-to solution for developers seeking dynamic content.

## Frontend Repository

For the corresponding frontend, visit the [The API Project Frontend](https://github.com/HamidByte/The-API-Project-Frontend).

## Documentation

- [Public API](./docs/public.md)
- [Users API](./docs/users.md)
- [Quotes API](./docs/quotes.md)
- [Giphies API](./docs/giphies.md)
- [OCR API](./docs/ocr.md)
- [Session Middleware](./docs/session_middleware.md)
- [Database Management using Sequelize ORM](./docs/database_management.md)

Note: Find all API-related configurations in `src/config/`, such as `src/config/subscriptionConfig.js`, `src/config/ocrOptions.js`, etc.

## API Documentation on Postman

Explore the API documentation [API Documentation](https://documenter.getpostman.com/view/11546737/2sA2r55Rev) and [Postman Workspace](https://www.postman.com/hamidbyte/workspace/the-api-project/overview).

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (https://nodejs.org/)
- PostgreSQL installed and running
- Git (optional, but recommended)

## Project Dependencies

- Express.js
- PostgreSQL
- Sequelize ORM (for database)
- ESLint (for code linting)
- Session-based Authentication (for Users)
- JWT Authentication (for API Access Keys)

## Setting Up PostgreSQL Server and Importing Database

Before starting the local server, make sure you have PostgreSQL Server installed and running.

If you're a developer making modifications to the project, refer to the `Database Management with Sequelize ORM` section for detailed information on creating the database, migrations, and seeders.

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

   Create `.env.development` and `.env.production` files in the root of the project for the development and production environments, respectively and set the following variables in each file:

   **.env.development:**

   ```env
   SESSION_SECRET_KEY=your-secret-key
   API_SECRET_KEY=your-secret-key
   EMAIL_ADDRESS=your-email-address
   EMAIL_PASSWORD=your-email-password
   BASE_URL_CLIENT=http://127.0.0.1:5173

   # Server environmental variables (optional)
   HOST=127.0.0.1
   PORT=3000
   BASE_URL_SERVER=http://127.0.0.1:3000
   ```

   **.env.production:**

   ```env
   SESSION_SECRET_KEY=your-secret-key
   API_SECRET_KEY=your-secret-key
   DATABASE_URL=database-url
   EMAIL_ADDRESS=your-email-address
   EMAIL_PASSWORD=your-email-password
   BASE_URL_CLIENT=your-client-url

   # Server environmental variables (optional)
   HOST=your-host-name
   PORT=your-port-number
   BASE_URL_SERVER=your-base-url-server
   ```

   - A database URL is required if you intend to use a cloud database, and it's pre-configured for production.
   - To customize, modify the `src/config/dbConfig.js` file as needed.
   - Certain email services may block SMTP access. For Gmail, generate a Google app password, enabling the `less secure apps access` account setting in your Google account.
   - Note that this setting is turned off by default, and you need to enable it.
   - If you are using another email service provider that supports SMTP, update the settings in `src/config/emailConfig.js`.

4. Configure the Database Settings:

   Create a database in PostgreSQL Server. Open `src/config/dbConfig.js` and update the fields below with your PostgreSQL database details:

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
   - Set the `dialect` to `postgres` for PostgreSQL.
   - (optional) Use the `.data/database/database.sql` file to import the provided database, if available.

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

## Acknowledgments

We express our gratitude to the open-source community for their invaluable contributions, which have played a pivotal role in enhancing our project by providing essential tools and libraries.
