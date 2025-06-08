# Authentication API

This document describes the authentication endpoints for the Rago Meditation Server.

## Register a New User

Create a new user account.

```http
POST /api/v1/auth/register
```

### Request Body

| Parameter   | Type   | Required | Description          |
|-------------|--------|----------|----------------------|
| name        | string | Yes      | User's full name     |
| email       | string | Yes      | User's email address |
| password    | string | Yes      | Password (min 8 chars) |


### Example Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Response (201 Created)

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-06-08T10:00:00.000Z"
    },
    "tokens": {
      "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  },
  "message": "User registered successfully"
}
```

## Login

Authenticate a user and get JWT tokens.

```http
POST /api/v1/auth/login
```

### Request Body

| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| email     | string | Yes      | User's email address |
| password  | string | Yes      | User's password      |

### Example Request

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "tokens": {
      "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  },
  "message": "Login successful"
}
```

## Refresh Token

Get a new access token using a refresh token.

```http
POST /api/v1/auth/refresh
```

### Request Headers

```
Authorization: Bearer <refresh_token>
```

### Response (200 OK)

```json
{
  "success": true,
  "data": {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Token refreshed successfully"
}
```

## Logout

Invalidate the current refresh token.

```http
POST /api/v1/auth/logout
```

### Request Headers

```
Authorization: Bearer <refresh_token>
```

### Response (200 OK)

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "AUTH_ERROR",
    "message": "Invalid credentials"
  }
}
```

### 409 Conflict

```json
{
  "success": false,
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "Email already in use"
  }
}
```

## Security Considerations

- Always use HTTPS
- Store refresh tokens securely (HTTP-only cookies recommended)
- Set appropriate CORS headers
- Implement rate limiting
- Use secure, random refresh tokens
- Set appropriate token expiration times
- Implement token blacklisting for logout
