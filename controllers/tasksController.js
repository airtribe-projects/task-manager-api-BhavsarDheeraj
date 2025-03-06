const { tasks, updateFile } = require('../config/database')

const getAllTasksHandler = (req, res) => {
    res.send(tasks);
}

const getTaskHandler = (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (!task) return res.status(404).send({ message: 'Task not found' });
    res.send(task);
}

const createTaskHandler = async (req, res) => {
    const id = tasks[tasks.length - 1].id + 1;
    const { title, description, completed } = req.body;
    const newTask = { id, title, description, completed };
    tasks.push(newTask);
    await updateFile(tasks);
    res.status(201).send(newTask);
}

const updateTaskHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return res.status(404).send({ message: 'Task not found' });
    const { title, description, completed } = req.body;
    const updatedTask = { id, title, description, completed };
    tasks[index] = updatedTask;
    await updateFile(tasks);
    return res.send(updatedTask);
}

const deleteTaskHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return res.status(404).send({ message: 'Task not found' });
    tasks.splice(index, 1);
    await updateFile(tasks);
    return res.send({ message: 'Task deleted successfully!' });
}

module.exports = {
    getAllTasksHandler,
    getTaskHandler,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler
}