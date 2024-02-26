## User API Endpoints (Authentication Required)

Note: The request header requires a valid cookie.

You can send a request with a cookie using either `-b` or `-H` in curl. Both options can be used to send cookies in a request, but they serve slightly different purposes:

`-b`: This option is specifically designed for sending cookies. It allows you to specify the cookie data directly. For example:

```bash
curl -X GET -b "connect.sid=your-session-cookie-value" http://localhost:3000/get-user
```

`-H`: This option is used to include additional HTTP headers in the request. While you can use it to send cookies by specifying the Cookie header, it's a more general-purpose option. For example:

```bash
curl -X GET -H "Cookie: connect.sid=your-session-cookie-value" http://localhost:3000/get-user
```

In the context of sending cookies, both options can achieve the same result. You can choose the one that you find more convenient or readable. The examples above demonstrate the use of both options for sending cookies.

### Activate Account

- **Endpoint:** `/activate?code=<code>`
- **Method:** `GET`
- **Description:** Activate a user account using the activation code sent via email.
- **Authorization:** Requires a valid session.
- **Parameters:**
  - `code`: Activation code received via email

**Request**

```bash
curl -X GET -b "connect.sid=your-session-cookie-value" http://localhost:3000/activate?code=F68536
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
- **Authorization:** Requires a valid session.
- **Parameters:**
  - `email`: Your email address

**Request**

```bash
curl -X POST -b "connect.sid=your-session-cookie-value" -H "Content-Type: application/json" -d '{"email": "john.doe@example.com"}' http://localhost:3000/resend-activation
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
curl -X GET -b "connect.sid=your-session-cookie-value" http://localhost:3000/get-user
```

**Response:**

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

### User Activation Status

- **Endpoint:** `/is-user-active`
- **Method:** `GET`
- **Description:** Get the user's activation status.
- **Authorization:** Requires a valid session.

**Request**

```bash
curl -X GET -b "connect.sid=your-session-cookie-value" http://localhost:3000/is-user-active
```

**Response:**

```json
{
  "isConfirmed": false,
  "message": "User is not activated"
}
```

or

```json
{
  "isConfirmed": true,
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
curl -X DELETE -b "connect.sid=your-session-cookie-value" http://localhost:3000/delete
```

**Response:**

```json
{
  "message": "User deleted successfully."
}
```

### Update User Profile

- **Endpoint:** `/update-profile`
- **Method:** `POST`
- **Description:** Update the user's profile information, including first name, last name, and username.
- **Authorization:** Requires a valid session.
- **Parameters:**
  - `firstName`: Your first name
  - `lastName`: Your last name
  - `username`: Your username
  - `password`: Your new password

**Request**

```bash
curl -X POST -b "connect.sid=your-session-cookie-value" -d '{"firstName": "John", "lastName": "Doe", "username": "john_doe", "password": ""}' http://localhost:3000/update-profile
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
- **Parameters:**
  - `email`: Your new email address

**Request**

```bash
curl -X POST -b "connect.sid=your-session-cookie-value" -d '{"email": "john.doe@example.com"}' http://localhost:3000/update-email
```

**Response:**

```json
{
  "message": "A confirmation link has been sent to your email account."
}
```

### Confirm Update User Email

- **Endpoint:** `/confirm-email/:token`
- **Method:** `POST`
- **Description:** Confirm the email activation link to update the user's email address.
- **Authorization:** Requires a valid session.
- **Parameters:**
  - `email`: Your new email address

**Request**

```bash
curl -X POST -b "connect.sid=your-session-cookie-value" http://localhost:3000/confirm-email/3b8397dd-5b7c-4bd0-8e05-6f24bfdfb139
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
- **Parameters:**
  - `tokenExpiration`: Token expiration

**Request**

```bash
curl -X POST -b "connect.sid=your-session-cookie-value" -d "tokenExpiration=24h" http://localhost:3000/generate
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
- **Method:** `GET`
- **Description:** Fetch the existing API key for a user.
- **Authorization:** Requires a valid session.

**Request**

```bash
curl -X GET -b "connect.sid=your-session-cookie-value" http://localhost:3000/get-api
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
curl -X DELETE -b "connect.sid=your-session-cookie-value" http://localhost:3000/revoke
```

**Response**

```json
{
  "message": "API Key has been successfully deleted"
}
```
