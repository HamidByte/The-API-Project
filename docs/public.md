## Public API Endpoints

### Register User

- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Create a new user account by providing valid registration details.
- **Parameters:**
  - `email`: Your email address
  - `password`: Your password

**Request**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "john.doe@example.com", "password": "strongPassword1"}' http://localhost:3000/register
```

**Response**

```json
{
  "uuid": "6a7b8c9d-1234-5678-90ab-cdef12345678",
  "message": "User registered successfully. Please check your email for activation."
}
```

### Login User

- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Authenticate an existing user by providing valid login credentials.
- **Parameters:**
  - `email`: Your email address
  - `password`: Your password

**Request**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "john.doe@example.com", "password": "strongPassword1"}' http://localhost:3000/register
```

**Response**

```json
{
  "uuid": "6a7b8c9d-1234-5678-90ab-cdef12345678",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe123",
  "email": "john.doe@example.com",
  "role": "user",
  "subscriptionStatus": "free",
  "requestCount": 0,
  "creditCount": 0,
  "lastRequestDate": "2024-02-03T08:29:57.919Z",
  "isConfirmed": true,
  "createdAt": "2024-02-03T08:29:58.052Z",
  "updatedAt": "2024-02-03T08:30:11.702Z"
}
```

### Forgot Password

- **Endpoint:** `/forgot-password`
- **Method:** `POST`
- **Description:** Initiate the process of resetting the user's password by sending a reset link to their email.
- **Parameters:**
  - `email`: Your email address

**Request**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email": "john.doe@example.com"}' http://localhost:3000/forgot-password
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
  - `token`: Reset token received via email
  - `password`: Your new password

**Request**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"password": "strongPassword1"}' http://localhost:3000/reset-password/3c857304-3ca3-48d1-b1e7-6d5a41230106
```

**Response:**

```json
{
  "message": "Password reset successful."
}
```
