const express = require('express');
const { getAllTasksHandler, getTaskHandler, createTaskHandler, updateTaskHandler, deleteTaskHandler } = require('../controllers/tasksController');


const router = new express.Router();


const validateTaskMiddleware = (req, res, next) => {
    const { title, description, completed } = req.body;
    if (!title) return res.status(400).send({ message: 'Invalid title provided' });
    if (!description) return res.status(400).send({ message: 'Invalid description provided' });
    if (typeof completed !== 'boolean') return res.status(400).send({ message: 'Invalid completed status provided' });
    next();
}


router.get('/', getAllTasksHandler);

router.get('/:id', getTaskHandler);

router.post('/', validateTaskMiddleware, createTaskHandler);

router.put('/:id', validateTaskMiddleware, updateTaskHandler);

router.delete('/:id', deleteTaskHandler);

module.exports = router;