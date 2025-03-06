const fs = require('fs');
const data = require('../task.json');

const updateFile = async (tasks) => {
    await fs.promises.writeFile('./task.json', JSON.stringify({ tasks }, null, 2));
}

const getAllTasksHandler = (req, res) => {
    res.send(data.tasks);
}

const getTaskHandler = (req, res) => {
    const id = parseInt(req.params.id);
    const task = data.tasks.find((task) => task.id === id);
    if (!task) return res.status(404).send({ message: 'Task not found' });
    res.send(task);
}

const createTaskHandler = async (req, res) => {
    const id = data.tasks[data.tasks.length - 1].id + 1;
    const { title, description, completed } = req.body;
    const newTask = { id, title, description, completed };
    data.tasks.push(newTask);
    await updateFile(data.tasks);
    res.status(201).send(newTask);
}

const updateTaskHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.tasks.findIndex((task) => task.id === id);
    if (index === -1) return res.status(404).send({ message: 'Task not found' });
    const { title, description, completed } = req.body;
    const updatedTask = { id, title, description, completed };
    data.tasks[index] = updatedTask;
    await updateFile(data.tasks);
    return res.send(updatedTask);
}

const deleteTaskHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.tasks.findIndex((task) => task.id === id);
    if (index === -1) return res.status(404).send({ message: 'Task not found' });
    data.tasks.splice(index, 1);
    await updateFile(data.tasks);
    return res.send({ message: 'Task deleted successfully!' });
}

module.exports = {
    getAllTasksHandler,
    getTaskHandler,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler
}