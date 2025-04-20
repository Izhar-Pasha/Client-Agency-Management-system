# Client & Agency Management System

This is a full-stack web application built to manage agencies and their clients. It allows users to perform all basic CRUD operations in an optimized and responsive interface. The app is structured to follow best practices in both frontend and backend development, making it scalable and easy to maintain.

## About the Project

The system is designed to help businesses or teams keep track of agency data and related clients. The main goal was to create a smooth user experience using component-based architecture, optimized renders, and responsive styling. Whether you're creating a new agency, editing client info, or viewing a list, everything feels fast and intuitive.

### Key Features

- Create, edit, delete agencies and clients
- Dynamic form views for create and update operations
- Fully responsive layout using SCSS with custom mixins
- Optimized component performance using `React.memo` and `useCallback`
- Centralized API calls for better frontend/backend separation
- Real-time data updates without unnecessary re-renders

## Tech Stack Used

**Frontend**

- React.js (with functional components and hooks)
- SCSS (custom mixins for responsiveness)
- Axios (for API requests)

**Backend**

- Node.js
- Express.js
- MongoDB with Mongoose ODM

## Folder Structure (Simplified)

**Client-side**

- `components/` – Contains reusable UI components (Agency, Client/ - form, list, card)
- `api/` – Central file for Axios API calls
- `styles/` – SCSS files with mixins and component-specific styling

**Server-side**

- `routes/` – Express routes for agencies and clients
- `controllers/` – Handles business logic
- `models/` – Mongoose models for Agency and Client
- `config/` – Database connection and environment variables

## How to Run Locally

1. **Clone the Repository**

```bash
git clone https://github.com/Izhar-Pasha/Client-Agency-Management-system
```

2. **Install server dependencies**
   cd backend
   npm init
   npm run dev

3. **Install Client Dependencies**
   cd frontend
   npm install
   npm run dev

4. **Database setup**
   MONGO_URI=MONGODB_URI=mongodb://localhost:27017/client-agency

5. **Developer Notes**
   This project was built with performance and clarity in mind. One of the goals was to avoid common pitfalls like unnecessary re-renders or bloated components. The logic is cleanly separated between parent and child components, and the styling is managed with SCSS for full customization and reusability.

React hooks like useCallback are used where needed to prevent re-rendering, especially in buttons or form fields. API logic is separated into its own file so that components stay focused on UI rendering.

**Final Thoughts**
This project is ideal for anyone looking to manage structured data like agencies and clients through a responsive UI. It showcases best practices in React, Express, and MongoDB and is built in a way that can be easily extended into a production-level tool.

If you're reviewing this as part of an interview or collaboration, feel free to explore the codebase and see the structure in action. Feedback is always welcome!
