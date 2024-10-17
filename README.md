# Rule Management System

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
5. [Setup Instructions](#setup-instructions)
6. [API Endpoints](#api-endpoints)
7. [Usage](#usage)
8. [Contributing](#contributing)


## Overview
The Rule Management System is an application designed to manage rules and evaluate them based on provided attributes. The system allows users to create, combine, and evaluate rules using an Abstract Syntax Tree (AST) representation. It is built using Node.js for the backend and can be integrated with various frontend frameworks.

## Features
- Save new rules
- Retrieve all saved rules
- Evaluate rules based on provided JSON attributes
- Handle complex rule combinations
- Error handling for invalid rule strings and formats
- User-friendly interface for rule management

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: (React.)
- **Others**: Axios for HTTP requests, CORS for cross-origin requests

## Getting Started
To run this project locally, follow these steps:

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or cloud instance)
- Git (for version control)

### Setup Instructions

1. **Clone the repository**:
  
   git clone https://github.com/bhattk64/rule-management-system.git
   cd rule-management-system


2. Install dependencies: npm install
3. Create a .env file in the root directory and add your MongoDB connection string:MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
PORT=5000
4.Start the server:node server.js

API Endpoints
1. Save a new rule
Endpoint: POST /api/rules
Request Body:{
  "rule": "if temperature > 100 then alert"
}
Response:
{
  "message": "Rule saved successfully"
}
2. Get all rules
Endpoint: GET /api/rules
Response:[
  {
    "rule": "if temperature > 100 then alert",
    "createdAt": "2024-10-17T00:00:00.000Z"
  }
]
### Contributing
Fork the repository
Create your feature branch (git checkout -b feature/YourFeature)
Commit your changes (git commit -m 'Add some feature')
Push to the branch (git push origin feature/YourFeature)
Open a pull request
   
   
