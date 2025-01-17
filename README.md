# User Authentication API

This project is a **Node.js** API for user authentication, built with **Express** and **MongoDB**. It includes features like user registration, login, logout, and fetching user details.

---

## **Setup Instructions**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root folder and add the following environment variables:
   ```env
   PORT=3000
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   ```

4. Run the application:
   ```bash
   npm start
   ```

---

## **Routes**

### **1. Register User**
- **URL:** `/api/users/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
      "username": "string",
      "email": "string",
      "password": "string",
      "cnf_password": "string",
      "gender": "string (male/female/other)",
      "isAdmin": "boolean (optional)"
  }
  ```
- **Responses:**
  - **201 Created:**
    ```json
    {
        "success": true,
        "status": "User registered successfully",
        "data": {
            "_id": "string",
            "username": "string",
            "email": "string",
            "gender": "string",
            "isAdmin": false,
            "isLoggedIn": false
        }
    }
    ```
  - **400 Bad Request:** Missing fields, passwords not matching, or email already registered.

---

### **2. Login User**
- **URL:** `/api/users/login`
- **Method:** `POST`
- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**
  ```json
  {
      "email": "string",
      "password": "string"
  }
  ```
- **Responses:**
  - **200 OK:**
    ```json
    {
        "success": true,
        "status": "Login successful",
        "data": {
            "token": "string",
            "user": {
                "_id": "string",
                "username": "string",
                "email": "string",
                "gender": "string",
                "isAdmin": false,
                "isLoggedIn": true
            }
        }
    }
    ```
  - **400 Bad Request:** Missing fields.
  - **404 Not Found:** User not found.
  - **401 Unauthorized:** Invalid credentials.

---

### **3. Get User by ID**
- **URL:** `/api/users/:id`
- **Method:** `GET`
- **Description:** Fetches user details by their ID.
- **Request Parameters:**
  - `id`: User ID (as URL parameter).
- **Responses:**
  - **200 OK:**
    ```json
    {
        "success": true,
        "status": "User fetched successfully",
        "data": {
            "_id": "string",
            "username": "string",
            "email": "string",
            "gender": "string",
            "isAdmin": false,
            "isLoggedIn": false
        }
    }
    ```
  - **404 Not Found:** User not found.

---

### **4. Logout User**
- **URL:** `/api/users/logout/:id`
- **Method:** `POST`
- **Description:** Logs out a user by setting `isLoggedIn` to `false`.
- **Request Parameters:**
  - `id`: User ID (as URL parameter).
- **Responses:**
  - **200 OK:**
    ```json
    {
        "success": true,
        "status": "Logout successful",
        "data": null
    }
    ```
  - **404 Not Found:** User not found.

---

### **5. Get All Users (Admin Only)**
- **URL:** `/api/users`
- **Method:** `GET`
- **Description:** Fetches all registered users. This route is protected and accessible only by admin users.
- **Headers:**
  - `Authorization`: Bearer `<JWT_TOKEN>`
- **Responses:**
  - **200 OK:**
    ```json
    {
        "success": true,
        "status": "All users fetched successfully",
        "data": [
            {
                "_id": "string",
                "username": "string",
                "email": "string",
                "gender": "string",
                "isAdmin": false,
                "isLoggedIn": false
            }
        ]
    }
    ```
  - **401 Unauthorized:** No token provided or invalid token.
  - **403 Forbidden:** User is not an admin.

---

### **6. Delete User (Admin Only)**
- **URL:** `/api/users/:id`
- **Method:** `DELETE`
- **Description:** Deletes a user by their ID. This route is protected and accessible only by admin users.
- **Headers:**
  - `Authorization`: Bearer `<JWT_TOKEN>`
- **Request Parameters:**
  - `id`: User ID (as URL parameter).
- **Responses:**
  - **200 OK:**
    ```json
    {
        "success": true,
        "status": "User deleted successfully",
        "data": null
    }
    ```
  - **404 Not Found:** User not found.
  - **401 Unauthorized:** No token provided or invalid token.
  - **403 Forbidden:** User is not an admin.

---

## **Project Structure**

```
project-folder
├── controllers
│   └── userController.js    # Contains route handlers for user operations
├── middleware
│   └── authMiddleware.js    # Middleware for route protection
├── models
│   └── userModel.js         # Mongoose schema and model for users
├── routes
│   └── userRoutes.js        # User-related routes
├── .env                     # Environment variables
├── server.js                # Entry point of the application
└── package.json             # Project metadata and dependencies
```

---

## **Dependencies**

- `express` - For building the API.
- `mongoose` - For interacting with MongoDB.
- `dotenv` - For managing environment variables.
- `bcrypt` - For hashing user passwords.
- `jsonwebtoken` - For generating and verifying JWT tokens.
- `nodemon` (dev dependency) - For automatic server restarts during development.

---

## **Future Enhancements**

1. Add role-based access control (RBAC).
2. Implement middleware for JWT authentication.
3. Add password reset functionality.
4. Enhance validation using libraries like `Joi` or `express-validator`.
5. Add tests for API endpoints.

---

## **Author**
Krish Panchani | [GitHub Profile](https://github.com/Krish-Panchani)
