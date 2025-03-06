const express = require('express');
const { getAllTasksHandler, getTaskHandler, createTaskHandler, updateTaskHandler, deleteTaskHandler } = require('../controllers/tasksController');
const { validateTaskMiddleware } = require('../middlewares/validateTaskMiddleware');

const router = new express.Router();

router.get('/', getAllTasksHandler);

router.get('/:id', getTaskHandler);

router.post('/', validateTaskMiddleware, createTaskHandler);

router.put('/:id', validateTaskMiddleware, updateTaskHandler);

router.delete('/:id', deleteTaskHandler);

module.exports = router;