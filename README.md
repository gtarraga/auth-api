# Backend Data Management

## Project Overview:

RESTful API that enables users to manage data, with an emphasis on user resources.

## Features Highlight:

### User Data Management

This API supports essential Create, Read, Update, and Delete operations for user data. Each user entry comprises the following details:

- **ID:** A unique identifier for users (UUID)
- **Name:** User's name
- **Email:** User's email address
- **Password:** Securely stored user password

## Libraries Utilized:

- **Node.js:** A versatile runtime environment for server-side JavaScript applications.
- **Express.js:** A lightweight web application framework simplifying routing and HTTP request handling.
- **TypeORM:** An Object-Relational Mapping (ORM) library for TypeScript, facilitating database interactions.
- **JWT:** JSON Web Tokens for secure authentication and authorization.
- **bcrypt:** Employed for password hashing to enhance user data security (disabled in this test version for easier DB setup).

## Testing Instructions:

To test the API, utilize Postman, a popular tool for API testing. Follow these steps:

1. **Clone the Repository:** Clone this repository to your local machine using `git clone`.
    
2. **Install Dependencies:** Go to the project directory and execute `npm install` to install required dependencies.
    
3. **Database Setup:** Ensure a PostgreSQL database is up and running. Update database connection details in `data-source.ts` creating a `.env` file for the environment variables.
    
4. **Create a user** in the users table for the API testing
    
5. **Start the Server:** Launch the server by running `npm start`.
    
6. **Testing via Postman:** Open Postman and import the provided [documentation](https://documenter.getpostman.com/view/6047055/2s9XxyRDiP) for an understanding of API endpoints.
    
7. **Authentication:** Utilize provided test credentials to acquire a JWT token using the `/auth/login` endpoint.
    
8. **API Endpoints:** Utilize different endpoints to perform CRUD operations on user data. Attach the JWT token to authorized routes in the request header for authentication.
    

## Detailed Documentation:

Refer to the comprehensive API documentation [here](https://documenter.getpostman.com/view/6047055/2s9XxyRDiP).
