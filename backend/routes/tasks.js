const express = require('express');
const router = express.Router();

const {validateFields} = require('../utils/validators');
const{
    getTasks,
    addTask,
    findTaskById,
    updateTaskById,
    deleteTaskById,
} = require('../db/tasksRepository');

/*
   GET /tasks
   fetch all tasks
*/
router.get('/', async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});


/*
   GET /task
   fetch a specific task
*/
router.get('/:id', async (req, res,next) => {
  try {
    const taskId = Number(req.params.id);
  if (!Number.isInteger(taskId) || taskId <= 0) {
    const err = new Error('Invalid task ID');
    err.status = 400;
    return next(err);
  }

  const task = await findTaskById(taskId);
  if (!task){
    const err = new Error('Task not found');
    err.status = 404;
    return next(err);
  }

  res.json(task);
  } catch (err) {
    next(err);
  }
});

/*
   POST /tasks
   -Create a new task
*/
router.post('/', async (req, res,next) => {
  try {
  const { title, completed } = req.body || {};
  const allowed = ['title', 'completed'];
  const invalid = validateFields(req.body, allowed);
  if (invalid.length > 0) {
    const err = new Error('Invalid fields');
     err.status = 400;
     err.details = invalid;
    return next(err);
  }

  if (!title || typeof title !== 'string' || title.trim() === "") {
    const err = new Error('Title is required and must be a string and cannot be empty');
    err.status = 400;
    return next(err);
  }
  if (title.length > 100) {
    const err = new Error('Title too long (max 100 characters)');
    err.status = 400;
    return next(err);
  }

  const completedBool = completed === true || completed === 'true' ? true : false;

  const newTask = await addTask(title.trim(),completedBool);
  res.status(201).json(newTask);
  } catch (err) {
    next(err)
  }
});

/*
    PUT /tasks/:id
    -Update the existing task(e.g, edit title or mark as complete)
*/
router.put('/:id',async (req, res,next) => {
  try {
  const taskId = Number(req.params.id);
  const body = req.body || {};
  const { title, completed } = req.body || {};

  if (!Number.isInteger(taskId) || taskId <= 0) {
    const err = new Error('Invalid task ID');
    err.status = 400;
    return next(err);
  }

  const allowed = ['title', 'completed'];
  const invalid = validateFields(req.body, allowed);
  if (invalid.length > 0) {
    const err = new Error('Invalid fields');
    err.status = 400;
    err.details = invalid;
    return next(err);
  }

  const update = {};

  if (title !== undefined) {
    if (typeof title !== 'string') {
      const err = new Error('Title must be a string');
      err.status = 400;
       return next(err);
    }
    if (title.trim() === '') {
      const err = new Error('Title cannot be empty');
      err.status = 400;
      return next(err);
    }
    if (title.length > 100) {
      const err = new Error('Title too long (max 100 characters)');
      err.status = 400;
      return next(err);
    }
    update.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean' && completed !== 'true' && completed !== 'false') {
      const err = new Error('Completed must be true or false');
      err.status = 400;
      return next(err);
    }
    update.completed = completed === true || completed === 'true';
  }

  if (Object.keys(update).length === 0) {
    const err = new Error("No valid fields to update");
    err.status = 400;
    return next(err);
  }


  const updatedTask = await updateTaskById(taskId, update);
  if (!updatedTask){
    const err = new Error('Task not found');
    err.status = 404;
    return next(err);
  }

  res.json(updatedTask);
  } catch (err) {
    next(err);
  }
});

/*
   DELETE /tasks/:id
   -delete a task
*/
router.delete('/:id',async (req, res,next) => {
  try {
    const taskId = Number(req.params.id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    const err = new Error('Invalid task ID');
    err.status = 400;
    return next(err);
  }

  if (Object.keys(req.body || {}).length > 0) {
    const err = new Error('DELETE does not accept a body');
    err.status = 400;
    return next(err);
  }

  const removed = await deleteTaskById(taskId);
  if (!removed){
    const err = new Error('Task not found');
    err.status = 404;
    return next(err);
  }

  res.json({ message: 'Task deleted', task: removed });
  } catch (err) {
    next(err);
  }
  
});

module.exports = router;