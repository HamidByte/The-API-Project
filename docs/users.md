## User API Endpoints (Authentication Required)

Note: The request header requires a valid cookie.

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

Note: When specifying the `tokenExpiration` in the request body, you have the option to provide it in a human-readable format such as `24h` or in seconds, for example, `86400`.

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
