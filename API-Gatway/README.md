# API Gateway - User Authentication Service

## Description

This is a Node.js based API Gateway service that handles user authentication with features like signup and user management. The service is built using Express.js and follows a layered architecture pattern with proper error handling and response formatting.

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- Express-Rate-Limiter
- Http-Proxy-Middleware

## Features

- User signup/signin with email and password
- Password validation (minimum 6 characters) - Authentication
- Email validation and uniqueness check - Authentication
- Add role to the user with isAdmin check - Authorization
- Structured error handling
- Standardized API responses
- Database CRUD operations

## API Endpoints

### Sign Up

Create a new user account.

```
POST /api/v1/user/signup
```

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Successfully created a new user",
  "data": jwt_token,
  "error": {}
}
```

#### Error Responses

**Invalid Password:**

```json
{
  "success": false,
  "message": "Incorrect Password",
  "data": {},
  "error": {
    "statusCode": 400,
    "name": "AppError",
    "message": "Incorrect Password"
  }
}
```

**Email Already Exists:**

```json
{
  "success": false,
  "message": "Email already registered",
  "data": {},
  "error": {
    "statusCode": 400,
    "name": "AppError",
    "message": "Email already registered"
  }
}
```

### Sign In

Login a user.

```
POST /api/v1/user/signin
```

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": jwt_token,
  "error": {}
}
```

#### Error Responses

**Invalid/No JWT Token:**

```json
{
  "success": false,
  "message": "Missing JWT token",
  "data": {},
  "error": {
    "statusCode": 404,
    "name": "AppError",
    "message": "Missing JWT token"
  }
}
```

**Invalid Password:**

```json
{
  "success": false,
  "message": "Incorrect password",
  "data": {},
  "error": {
    "statusCode": 400,
    "name": "AppError",
    "message": "Incorrect password"
  }
}
```

**Non_Registered/Invalid Email:**

```json
{
  "success": false,
  "message": "User not found",
  "data": {},
  "error": {
    "statusCode": 400,
    "name": "AppError",
    "message": "User not found"
  }
}
```

### Add Role

Add role to a user.

```
POST /api/v1/user/role
```

#### Request Body

```json
{
  "id": Target_user_id,
  "role": "ADMIN/CUSTOMER"
}
```

#### Success Response

```json
{
    "success": true,
    "message": "Successfully completed the request",
    "data": {
        "id": Target_user_id,
        "email": "user@gmail.com",
        "password": "encrypted password",
        "createdAt": "2024-12-29T20:05:21.000Z",
        "updatedAt": "2024-12-29T20:05:21.000Z"
    },
    "error": {}
}
```

#### Error Responses

**User is Not Admin:**

```json
{
  "success": false,
  "message": "User not authorized for this action"
}
```

**JWT Token Expired:**

```json
{
  "success": false,
  "explaination": "Missing JWT token",
}
```

**Invalid/No JWT Token:**

```json
{
  "success": false,
  "message": "Missing JWT token",
  "data": {},
  "error": {
    "statusCode": 404,
    "name": "AppError",
    "message": "Missing JWT token"
  }
}
```

**Unknown User:**

```json
{
  "success": false,
  "message": "Somthing went wrong",
  "data": {},
  "error": {
    "statusCode": 400,
    "name": "AppError",
    "message": "User not found for given ID"
  }
}
```

**Unknown Role:**

```json
{
  "success": false,
  "message": "Somthing went wrong",
  "data": {},
  "error": {
    "statusCode": 400,
    "name": "AppError",
    "message": "No role found for given name"
  }
}
```

## Setup and Installation

1. Clone the repository

```bash
git clone <repository-url>
cd api-gateway
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables
   Create a `.env` file in the root directory and add:

```env
PORT=3001
SALT_ROUNDS=any_number
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=expiry_time
FLIGHTS_SERVICE="http://localhost:<port_number>"
BOOKING_SERVICE="http://localhost:<port_number>"
```

4. Run database migrations

```bash
npx sequelize-cli db:migrate
```

5. Start the server

```bash
npm start
```

## Error Handling

The application implements centralized error handling with:

- Custom AppError class for application-specific errors
- Standardized error responses
- HTTP status code mapping
- Validation error handling
- Database error handling

## Response Formats

### Success Response Structure

```json
{
  "success": true,
  "message": "Success message",
  "data": {},
  "error": {}
}
```

### Error Response Structure

```json
{
  "success": false,
  "message": "Error message",
  "data": {},
  "error": {
    "statusCode": 400,
    "name": "ErrorName",
    "message": "Detailed error message"
  }
}
```

## Author

Shr-ss

## Version

1.0.0