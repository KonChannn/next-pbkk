# KomiXcel Backend

KomiXcel is a platform for managing anime and manga reviews, user authentication, and other related functionalities. This repository contains the backend of the platform, built using **Next.js**, **Prisma**, and **PostgreSQL**.

This README provides detailed information on the setup, functionalities, and testing of the API.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Database Structure](#database-structure)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
  - [Reviews](#reviews)
- [Testing with Postman](#testing-with-postman)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

KomiXcel's backend is a RESTful API that allows users to create accounts, log in, and leave reviews for anime and manga. It uses **JWT authentication** to secure endpoints and **Prisma ORM** to manage database interactions. This project is intended to support a frontend application where users can view and review anime and manga content.

---

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **Prisma ORM**: An open-source database toolkit for Node.js and TypeScript. It provides an abstraction layer for interacting with PostgreSQL.
- **PostgreSQL**: A powerful, open-source relational database management system.
- **JWT (JSON Web Tokens)**: A secure way to authenticate users by verifying their identity via tokens.
- **Bcrypt**: A library for hashing passwords securely.

---

## Setup and Installation

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
[Clone the repository](https://github.com/KonChannn/next-pbkk.git)
```

### 2. Install Dependencies

Navigate into the project directory and install the required dependencies.

```bash
cd komixcel-backend
npm install
```

### 3. Set Up the Database

Ensure that you have PostgreSQL installed and running on your local machine. Then, create a `.env` file in the root directory and set the `DATABASE_URL` to your local PostgreSQL database:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/komixcel"
```

Replace `username` and `password` with your database credentials.

### 4. Migrate the Database

Run the Prisma migration command to create the necessary tables in your database.

```bash
npx prisma migrate dev --name init
```

### 5. Generate Prisma Client

Generate the Prisma client to interact with the database:

```bash
npx prisma generate
```

### 6. Sync Data from Jikan

To populate the database with anime and manga data, you need to sync it with Jikan (an unofficial API for MyAnimeList). To do this:

- Start your backend server.

```bash
npm run dev
```

- Then, navigate to the following URL:

```bash
http://localhost:3000/api/sync-jikan
```

This will trigger a request to fetch anime and manga data from Jikan and store it in your PostgreSQL database.

Note: This API endpoint will populate your `Anime` and `Manga` tables with data. Ensure that you have internet access to successfully fetch the data from the Jikan API.

### 7. Run the Server

Start the Next.js application to launch the backend server.

```bash
npm run dev
```

The server will be running at `http://localhost:3000`.

---

## Database Structure

The database is structured with the following models:

- **User**: Stores user information, including the username, email, and hashed password.
- **Anime**: Stores information about anime, such as title, synopsis, score, and other relevant data.
- **Manga**: Stores information about manga, including title, synopsis, and score.
- **Review**: Stores reviews made by users for either anime or manga, including content, rating (1-5), and the user who made the review.

The relationships between these models are as follows:

- A **User** can have multiple **Reviews**.
- A **Review** is associated with either an **Anime** or **Manga**.
- **Anime** and **Manga** can have multiple **Reviews**.

---

## API Endpoints

### User Authentication

The following endpoints are used for user registration, login, and managing authentication.

#### Register User

**POST** `/api/auth/register`

Create a new user by providing the username, email, and password.

**Request Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User

**POST** `/api/auth/login`

Authenticate a user and return a JWT token.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "<JWT_TOKEN>"
}
```

The JWT token will be required for authentication in protected routes.

---

### Reviews

The following endpoints are used to manage reviews for anime and manga.

#### Create Review

**POST** `/api/reviews/create`

Create a review for either an anime or a manga.

**Request Body**:
```json
{
  "mediaType": "anime",  // or "manga"
  "mediaId": 1,
  "content": "Great anime with a compelling story!",
  "rating": 5
}
```

The `mediaType` specifies whether the review is for an anime or a manga. The `mediaId` corresponds to the ID of the anime or manga in the database.

**Authorization**: Bearer token must be included in the request header for authentication.

---

## Testing with Postman

To test the API using Postman:

1. **Register a New User**
   - **POST** `http://localhost:3000/api/auth/register`
   - Request Body:
     ```json
     {
       "username": "john_doe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```

2. **Login the User to Get JWT Token**
   - **POST** `http://localhost:3000/api/auth/login`
   - Request Body:
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - Copy the JWT token from the response.

3. **Create a Review**
   - **POST** `http://localhost:3000/api/reviews/create`
   - Headers:
     - `Authorization: Bearer <JWT_TOKEN>`
   - Request Body:
     ```json
     {
       "mediaType": "anime",
       "mediaId": 1,
       "content": "Great anime with a compelling story!",
       "rating": 5
     }
     ```

---

## Contributing

We welcome contributions! If you'd like to contribute, please fork the repository and create a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

By following this structure, the README will provide all the essential information for developers to set up and interact with the backend API of your **KomiXcel** platform.
