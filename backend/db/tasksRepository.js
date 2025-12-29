const pool = require('../db/pool');

/*
  Get all tasks
*/
const getTasks = async () => {
  const [rows] = await pool.query(
    'SELECT id, title, completed FROM tasks'
  );
  return rows;
};

/*
  Get task by ID
*/
const findTaskById = async (id) => {
  const [rows] = await pool.query(
    'SELECT id, title, completed FROM tasks WHERE id = ?',
    [id]
  );
  return rows[0] || null;
};

/*
  Create task
*/
const addTask = async (title, completed) => {
  const [result] = await pool.query(
    'INSERT INTO tasks (title, completed) VALUES (?, ?)',
    [title, completed]
  );

  return {
    id: result.insertId,
    title,
    completed
  };
};

/*
  Update task
*/
const updateTaskById = async (id, data) => {
  const fields = [];
  const values = [];

  if (data.title !== undefined) {
    fields.push('title = ?');
    values.push(data.title);
  }

  if (data.completed !== undefined) {
    fields.push('completed = ?');
    values.push(data.completed);
  }

  if (fields.length === 0) return null;

  values.push(id);

  const [result] = await pool.query(
    `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`,
    values
  );

  if (result.affectedRows === 0) return null;

  return findTaskById(id);
};

/*
  Delete task
*/
const deleteTaskById = async (id) => {
  const task = await findTaskById(id);
  if (!task) return null;

  await pool.query(
    'DELETE FROM tasks WHERE id = ?',
    [id]
  );

  return task;
};

module.exports = {
  getTasks,
  findTaskById,
  addTask,
  updateTaskById,
  deleteTaskById
};
