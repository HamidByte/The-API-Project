## Giphies API Endpoints

Note: The authorization header requires a valid authentication token. Use the generated token in the `Authorization` header.

### Get Random Giphy

- **Endpoint:** `/api/v1/giphy/random`
- **Method:** `GET`
- **Description:** Returns a random giphy from the database.
- **Example:** `http://127.0.0.1:3000/api/v1/giphy/random`
- **Authorization:** Requires a valid authentication token.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" http://127.0.0.1:3000/api/v1/giphy/random
```

**Response**

```json
{
  "found": true,
  "giphy": {
    "id": 1,
    "gifId": "8H82lz6VblSd9Bf",
    "url": "https://example.com/8H82lz6VblSd9Bf/giphy.gif",
    "hash": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    "fileSize": 78923,
    "giphyTitle": "funny cat dancing GIF",
    "importDate": "2015-08-27T17:45:00.000Z",
    "trendingDate": "2016-02-12T08:22:00.000Z",
    "createdAt": "2024-02-10T14:30:45.000Z",
    "updatedAt": "2024-02-10T14:30:45.000Z"
  }
}
```

### Get Giphy by ID

- **Endpoint:** `/api/v1/giphy/:id`
- **Method:** `GET`
- **Description:** Returns a giphy with the specified ID.
- **Example:** `http://127.0.0.1:3000/api/v1/giphy/1`
- **Authorization:** Requires a valid authentication token.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" http://127.0.0.1:3000/api/v1/giphy/1
```

**Response**

```json
{
  "found": true,
  "giphy": {
    "id": 1,
    "gifId": "8H82lz6VblSd9Bf",
    "url": "https://example.com/8H82lz6VblSd9Bf/giphy.gif",
    "hash": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    "fileSize": 78923,
    "giphyTitle": "funny cat dancing GIF",
    "importDate": "2015-08-27T17:45:00.000Z",
    "trendingDate": "2016-02-12T08:22:00.000Z",
    "createdAt": "2024-02-10T14:30:45.000Z",
    "updatedAt": "2024-02-10T14:30:45.000Z"
  }
}
```

### Search for Random Giphy with Query

- **Endpoint:** `/api/v1/giphy/search?q=cat`
- **Method:** `GET`
- **Description:** Performs a case-insensitive search for a random giphy based on the provided query string in the giphyTitle field.
- **Example:** `http://127.0.0.1:3000/api/v1/giphy/search?q=cat`
- **Authorization:** Requires a valid authentication token.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" http://127.0.0.1:3000/api/v1/giphy/search?q=cat
```

**Response**

```json
{
  "found": true,
  "giphy": {
    "id": 1,
    "gifId": "8H82lz6VblSd9Bf",
    "url": "https://example.com/8H82lz6VblSd9Bf/giphy.gif",
    "hash": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    "fileSize": 78923,
    "giphyTitle": "funny cat dancing GIF",
    "importDate": "2015-08-27T17:45:00.000Z",
    "trendingDate": "2016-02-12T08:22:00.000Z",
    "createdAt": "2024-02-10T14:30:45.000Z",
    "updatedAt": "2024-02-10T14:30:45.000Z"
  }
}
```

### Get Giphy by GifId

- **Endpoint:** `/api/v1/giphy/gifid/:gifId`
- **Method:** `GET`
- **Description:** Returns a giphy with the specified GifId.
- **Example:** `http://127.0.0.1:3000/api/v1/giphy/gifid/8H82lz6VblSd9Bf`
- **Authorization:** Requires a valid authentication token.

**Request**

```bash
curl -X GET -H "Authorization: Bearer <your-generated-token>" http://127.0.0.1:3000/api/v1/giphy/gifid/8H82lz6VblSd9Bf
```

**Response**

```json
{
  "found": true,
  "giphy": {
    "id": 1,
    "gifId": "8H82lz6VblSd9Bf",
    "url": "https://example.com/8H82lz6VblSd9Bf/giphy.gif",
    "hash": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    "fileSize": 78923,
    "giphyTitle": "funny cat dancing GIF",
    "importDate": "2015-08-27T17:45:00.000Z",
    "trendingDate": "2016-02-12T08:22:00.000Z",
    "createdAt": "2024-02-10T14:30:45.000Z",
    "updatedAt": "2024-02-10T14:30:45.000Z"
  }
}
```
