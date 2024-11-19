const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

let tasks = [
  {
    id: 1,
    title: "Task 1",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    completed: true,
  },
  {
    id: 3,
    title: "Task 3",
    completed: false,
  },
];

let taskCounter = tasks.length + 1;

app.use(bodyParser.json());

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.post("/tasks", (req, res, next) => {
  const existingTask = tasks.find((task) => task.title === req.body.title);

  if (existingTask)
    return res.status(400).json({ message: "Task already exists" });

  if (!req.body.title || typeof req.body.title !== "string") {
    return res.status(400).json({ message: "Invalid title" });
  }

  if (
    req.body.completed === null ||
    req.body.completed === undefined ||
    typeof req.body.completed !== "boolean"
  ) {
    return res.status(400).json({ message: "Invalid completed" });
  }

  const newTask = {
    id: taskCounter,
    title: req.body.title,
    completed: req.body.completed,
  };
  taskCounter++;
  tasks.push(newTask);
  res.status(200).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  console.log(id)


  if (!id) return res.status(400).json({ message: "Task not found" });
  const task = tasks.find((task) => task.id == id);

  if (!task) return res.status(400).json({ message: "Task not found" });

  if (!req.body.title || typeof req.body.title !== "string") {
    return res.status(400).json({ message: "Invalid title" });
  }

  if (
    req.body.completed === null ||
    req.body.completed === undefined ||
    typeof req.body.completed !== "boolean"
  ) {
    return res.status(400).json({ message: "Invalid completed" });
  }

  task.title = req.body.title;
  task.completed = req.body.completed;
  res.status(200).json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.parms;

  if (!id || typeof id !== "number")
    return res.status(400).json({ message: "Invalid ID" });

  const existingTask = tasks.find((task) => task.id === id);
  if (!existingTask) return res.status(400).json({ message: "Task not found" });

  tasks = tasks.filter((task) => task.id !== id);

  res.status(200).json({ message: "Task deleted" });
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`Server is running on port ${PORT}`);
});
