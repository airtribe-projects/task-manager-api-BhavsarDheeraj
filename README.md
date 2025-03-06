# Task Manager API

A RESTful API for managing tasks built with Node.js and Express.js. This project provides endpoints to create, read, update, and delete tasks, with additional features like filtering, sorting, and priority-based task management.

## Prerequisites

- Node.js >= 18.0.0
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/airtribe-projects/task-manager-api-BhavsarDheeraj.git
cd task-manager-api-BhavsarDheeraj
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks. Supports filtering by completion status and sorting |
| GET | `/tasks/priority/:level` | Get tasks by priority level (low/medium/high) |
| GET | `/tasks/:id` | Get a specific task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |

### Query Parameters

#### GET /tasks
- `completed`: Filter tasks by completion status (true/false)
- `sortBy`: Sort tasks by field (title, completed, createdAt, updatedAt)

### Request Body Format

#### POST /tasks and PUT /tasks/:id
```json
{
  "title": "Task title",
  "description": "Task description",
  "completed": false
}
```

## Task Structure

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "priority": "low",
  "createdAt": "2025-03-06T00:00:00.000Z",
  "updatedAt": "2025-03-06T00:00:00.000Z"
}
```

## Features

- CRUD operations for tasks
- Task filtering by completion status
- Sorting tasks by various fields
- Priority-based task management
- Data persistence using JSON file
- Input validation middleware
- Error handling

## Scripts

- `npm run dev`: Start development server with nodemon
- `npm test`: Run tests (Node.js >= 18 required)

## Dependencies

- express: Web framework
- dotenv: Environment variable management
- nodemon: Development server with hot reload
- tap: Testing framework
- supertest: HTTP testing library

## Project Structure 
```
task-manager/
├── app.js # Application entry point
├── config/
│ └── database.js # Database configuration
├── controllers/
│ └── tasksController.js # Task handlers
├── middlewares/
│ └── validateTaskMiddleware.js # Input validation
├── routers/
│ ├── index.js # Router exports
│ └── tasksRouter.js # Task routes
└── task.json # Data storage
```

## Author
Dheeraj