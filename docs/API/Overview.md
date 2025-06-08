# API Overview

This document provides an overview of the Rago Meditation Server API, including authentication, endpoints, and usage examples.

## Base URL

All API endpoints are prefixed with `/api/v1`.

```
https://api.ragomeditation.com/api/v1
```

## Authentication

Most API endpoints require authentication. Include the JWT token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully"
}
```

### Error Responses

Error responses include an `error` field with details:

```json
{
  "success": false,
  "error": {
    "code": "AUTH_ERROR",
    "message": "Invalid credentials"
  }
}
```

## Rate Limiting

- 100 requests per minute per IP address
- 1000 requests per hour per authenticated user

## Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Log in and get JWT token
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Invalidate token

### Users

- `GET /api/v1/users/me` - Get current user profile
- `PATCH /api/v1/users/me` - Update user profile
- `POST /api/v1/users/me/avatar` - Upload profile picture
- `DELETE /api/v1/users/me` - Delete account

### Sessions

- `GET /api/v1/sessions` - Get meditation sessions
- `GET /api/v1/sessions/:id` - Get session details
- `POST /api/v1/sessions` - Create a new session
- `PATCH /api/v1/sessions/:id` - Update a session
- `DELETE /api/v1/sessions/:id` - Delete a session

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Pagination

List endpoints support pagination using `limit` and `page` query parameters:

```
GET /api/v1/sessions?limit=10&page=1
```

Response includes pagination metadata:

```json
{
  "data": [],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```
