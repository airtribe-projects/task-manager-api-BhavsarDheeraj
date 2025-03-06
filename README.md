# Task Manager API

## Description
Task Manager API is a RESTful API built using Node.js and Express.js for managing tasks. It provides CRUD operations for tasks and includes error handling, input validation, and testing.

## Features
- Create, read, update, and delete tasks
- In-memory data storage
- Input validation
- Error handling
- Automated testing with Jest

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/airtribe-projects/task-manager-api-BhavsarDheeraj.git
   ```
2. Navigate to the project directory:
   ```sh
   cd task-manager
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage

### Running the server
Start the development server:
```sh
npm start
```
The API will be available at `http://localhost:<PORT>` where `<PORT>` should be specified in the `.env` file or `3000` will be default port.

## API Endpoints

### Task Routes

| Method | Endpoint        | Description                |
|--------|---------------|----------------------------|
| GET    | `/tasks`       | Get all tasks             |
| GET    | `/tasks/:id`   | Get a specific task       |
| POST   | `/tasks`       | Create a new task         |
| PUT    | `/tasks/:id`   | Update an existing task   |
| DELETE | `/tasks/:id`   | Delete a task             |

### Example Request (Create Task)
```sh
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title": "New Task", "completed": false}'
```

## Testing
Run the tests using:
```sh
npm run test
```