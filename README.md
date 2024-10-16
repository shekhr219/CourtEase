# IIT2021071
# CourtEase

CourtEase is a sports booking application designed for sports technology companies to manage bookings across multiple centers, sports, and courts. It offers functionalities for center managers to view and create bookings, manage courts and sports, and streamline operations.

## Table of Contents

- [Project Setup](#project-setup)
- [Running the Project](#running-the-project)
- [Deploying the Project](#deploying-the-project)
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Assumptions and Limitations](#assumptions-and-limitations)
- [Special Instructions](#special-instructions)
- [Links](#links)

## Project Setup

1. **Clone the repository**:
   git clone https://github.com/your-username/courtease.git
   cd courtease
2. **Install dependencies for both the frontend and backend**
   cd Frontend
   npm install
   cd ../Backend
   npm install
   
## Running the Project
1.**Backend**
  Navigate to the Backend directory:
   cd Backend
 Set up environment variables (.env file) for the backend:
   PORT=5000
   MONGO_URI=your_mongo_database_url
 Start the backend server:
  npm start
2.**Frontend**
 Navigate to the Frontend directory:
   cd ../Frontend
 Start the frontend development server:
   npm start
## Deploying the Project
1. Frontend Deployment - Deploymed on Vercel
2. Backend Deployment - Deployed on Render
## Prerequisites
 Node.js and npm installed
 MongoDB instance (local or cloud-based like MongoDB Atlas)
## Dependencies
  Frontend: React, Tailwind CSS, Axios, React Router
  Backend: Express, Mongoose,
## Assumptions and Limitations
  Only operations teams can create and manage bookings.
  No payment or customer login feature is currently included
## Special Instructions
  Ensure the MongoDB URI is correctly set in the backend’s .env file.
  Adjust the base URLs for API calls in the frontend as necessary.
## Links
  Frontend: https://court-ease.vercel.app/
  Backend: https://courtease-backend.onrender.com


