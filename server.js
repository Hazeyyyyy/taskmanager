const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let tasks = [
  {
    id: 1,
    text: 'Reading books',
    category: 'School',
    completed: false
  }
];

app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  res.json(task);
});

app.post('/api/tasks', (req, res) => {
  const { text, category } = req.body;

  if (!text) {
    return res.status(400).json({
      message: 'Task text is required'
    });
  }

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    text: text,
    category: category || 'Personal',
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json({
    message: 'Task added successfully',
    data: newTask
  });
});

app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  task.text = req.body.text || task.text;
  task.category = req.body.category || task.category;

  if (req.body.completed !== undefined) {
    task.completed = req.body.completed;
  }

  res.json({
    message: 'Task updated successfully',
    data: task
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  tasks = tasks.filter((t) => t.id !== id);

  res.json({
    message: 'Task deleted successfully',
    data: tasks
  });
});

app.patch('/api/tasks/:id/toggle', (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: 'Task not found'
    });
  }

  task.completed = !task.completed;

  res.json({
    message: 'Task status updated',
    data: task
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});