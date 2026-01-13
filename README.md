# TaskFlow

A comprehensive project management tool featuring Graph, List, and Timeline views, built with React and Golang.

## Prerequisites

- **Go**: Version 1.21 or higher.
- **Node.js**: Version 18 or higher (for the frontend environment).

## Getting Started

To run the application, you need to start both the backend server and the frontend client concurrently.

### 1. Backend (Golang)

The backend serves the API at `http://localhost:8080`.

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Initialize the module (if not already done) and tidy dependencies:
   ```bash
   go mod tidy
   ```

3. Start the server:
   ```bash
   go run main.go
   ```

You should see a message indicating the server is running on port 8080.

### 2. Frontend (React)

The frontend is a React application that connects to the Go backend.

1. Open a new terminal window (keep the backend running) and navigate to the project root.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   *(Or `npm start` depending on your setup)*

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173` or `http://localhost:3000`).

## Architecture

- **Frontend**: React, TypeScript, Tailwind CSS. Handles the UI and visualization (Graph, List, Timeline).
- **Backend**: Golang. Provides a REST API for Tasks, Users, and Notifications. Stores data in-memory for this demo.

## Configuration

The frontend API connection is configured in `services/api.ts`.
- `USE_MOCK_API`: Set to `false` to connect to the Go backend.
- `API_BASE_URL`: Defaults to `http://localhost:8080/api/v1`.
