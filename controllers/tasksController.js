const { tasks, updateFile } = require('../config/database')

const getAllTasksHandler = (req, res) => {
    try {
        const { completed, sortBy } = req.query;
        let filteredTasks = [...tasks];

        if (completed !== undefined) {
            const isCompleted = completed === 'true';
            filteredTasks = filteredTasks.filter((task) => task.completed === isCompleted);
        }

        if (sortBy) {
            const sortingStrategies = {
                title: (a, b) => a.title.localeCompare(b.title),
                completed: (a, b) => b.completed - a.completed,
                createdAt: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
                updatedAt: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
            };

            const sortStrategy = sortingStrategies[sortBy];
            if (!sortStrategy) {
                return res.status(400).send({
                    message: `Invalid sort parameter. Allowed values: ${Object.keys(sortingStrategies).join(', ')}`
                });
            }

            filteredTasks.sort(sortStrategy);
        }

        return res.send(filteredTasks);
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

const getTaskByPriorityHandler = (req, res) => {
    try {
        const priorityLevel = req.params.level;
        const filteredTasks = tasks.filter((task) => task.priority === priorityLevel);
        return res.send(filteredTasks);
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

const getTaskHandler = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = tasks.find((task) => task.id === id);
        if (!task) return res.status(404).send({ message: 'Task not found' });
        return res.send(task);
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

const createTaskHandler = async (req, res) => {
    try {
        const id = tasks[tasks.length - 1].id + 1;
        const { title, description, completed } = req.body;
        const newTask = { id, title, description, completed, createdAt: new Date().toISOString() };
        tasks.push(newTask);
        await updateFile(tasks);
        return res.status(201).send(newTask);
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

const updateTaskHandler = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = tasks.findIndex((task) => task.id === id);
        if (index === -1) return res.status(404).send({ message: 'Task not found' });
        const { title, description, completed } = req.body;
        const updatedTask = { id, title, description, completed, updatedAt: new Date().toISOString() };
        tasks[index] = updatedTask;
        await updateFile(tasks);
        return res.send(updatedTask);
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

const deleteTaskHandler = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = tasks.findIndex((task) => task.id === id);
        if (index === -1) return res.status(404).send({ message: 'Task not found' });
        tasks.splice(index, 1);
        await updateFile(tasks);
        return res.send({ message: 'Task deleted successfully!' });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

module.exports = {
    getAllTasksHandler,
    getTaskByPriorityHandler,
    getTaskHandler,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler
}