## Quotes API Endpoints

Note: The authorization header requires a valid authentication token. Use the generated token in the `Authorization` header.

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
    "id": 1,
    "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu est vel enim lacinia sodales.",
    "author": "John Doe",
    "category": "inspiration, philosophy",
    "createdAt": "2024-02-01T10:15:30.000Z",
    "updatedAt": "2024-02-01T10:15:30.000Z"
  }
}
```

### Get Quote by ID

- **Endpoint:** `/api/v1/quote/:id`
- **Method:** `GET`
- **Description:** Returns a quote with the specified ID.
- **Example:** `http://localhost:3000/api/v1/quote/1`
- **Authorization:** Requires a valid authentication token.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" http://localhost:3000/api/v1/quote/1
```

**Response**

```json
{
  "found": true,
  "quote": {
    "id": 1,
    "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu est vel enim lacinia sodales.",
    "author": "John Doe",
    "category": "inspiration, philosophy",
    "createdAt": "2024-02-01T10:15:30.000Z",
    "updatedAt": "2024-02-01T10:15:30.000Z"
  }
}
```

### Search for Random Quote with Query

- **Endpoint:** `/api/v1/quote/search?q=lorem`
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
    "id": 1,
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
    "id": 1,
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
    "id": 1,
    "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu est vel enim lacinia sodales.",
    "author": "John Doe",
    "category": "inspiration, philosophy",
    "createdAt": "2024-02-01T10:15:30.000Z",
    "updatedAt": "2024-02-01T10:15:30.000Z"
  }
}
```
