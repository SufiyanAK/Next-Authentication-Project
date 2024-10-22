# Next.js Authentication Project

This project is a simple authentication system built using **Next.js**, **JWT (JSON Web Token)**, and **TypeScript**. It features a secure signup, login, email verification, and profile system with public and private routes. 

## Project Overview

The app allows users to:
- Sign up with their email
- Log in with their email and password
- Verify their email using a token sent to their inbox
- Access private routes after authentication

## Features
- **JWT Authentication**: Secure token-based authentication to protect private routes.
- **Email Verification**: Users must verify their email before accessing certain features.
- **Public and Private Routes**: Ensures proper access control.
- **Error Handling**: Comprehensive error handling to provide feedback on invalid credentials, unverified emails, etc.

## Code Structure

The project follows a clean and modular code structure with separation of concerns:

- **src/app**: Contains Next.js pages and API routes.
  - `api/login/route.ts`: API route for user login.
  - `api/signup/route.ts`: API route for new user registration.
  - `api/profile/route.ts`: API route to fetch user profile data (private route).
  - `api/verifyemail/route.ts`: API route for email verification.
  - **Pages**: Public and private pages, such as login, signup, and profile.

- **src/db/connectDB.ts**: Database connection file for MongoDB.

- **src/helper/mailer.ts**: Helper function to send email using **nodemailer** for email verification.

- **src/models/user.model.js**: MongoDB user schema model.

## Packages Used

- **Next.js**: The framework used for the project.
- **JWT**: JSON Web Token for authentication.
- **Nodemailer**: Sending email for account verification.
- **Tailwind CSS**: For styling the app.
- **TypeScript**: For type safety.
- **MongoDB**: As the database to store user data.

## Best Practices
- **Modular Code**: Each functionality is broken down into small, reusable modules.
- **TypeScript**: For improved code quality and type checking.
- **Environment Variables**: Sensitive data like database credentials are managed using `.env` file.
- **Error Handling**: Proper error handling implemented at API routes to provide useful feedback to users.

## Error Handling

- Clear error messages for invalid login credentials.
- Checks for unverified email accounts and sends verification links.
- Handles cases where token verification fails or is expired.

## Getting Started

1. Clone the repository
    ```bash
    git clone <repo-url>
    ```
2. Install dependencies
    ```bash
    npm install
    ```
3. Setup environment variables in the `.env` file.
4. Run the development server
    ```bash
    npm run dev
    ```
5. Visit the app at `http://localhost:3000`.

## Future Improvements
- Improve UI with more design features.
- Implement social login options.
- Enhance email security with two-factor authentication.

