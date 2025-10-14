const express = require("express");
const router = express.Router();
const { generateTasks } = require("../services/llamaService");

// In-memory tasks for demo (replace with DB later)
let tasks = [];
let idCounter = 1;

// GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// POST add task
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });

  const newTask = {
    id: idCounter++,
    title,
    description,
    completed: false,
    estimated_days: 1
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT toggle complete
router.put("/:id/toggle", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  task.completed = !task.completed;
  res.json(task);
});

// PUT edit task
router.put("/:id", (req, res) => {
  const { title, description } = req.body;
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (title) task.title = title;
  if (description) task.description = description;
  res.json(task);
});

// DELETE task
router.delete("/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Deleted" });
});

// POST generate tasks from goal
router.post("/generate", async (req, res) => {
  const { goal } = req.body;
  if (!goal) return res.status(400).json({ message: "Goal required" });
  try {
    const generated = await generateTasks(goal);
    generated.forEach(task => {
      tasks.push({ id: idCounter++, completed: false, ...task });
    });
    res.json({ message: "Tasks generated", tasks: generated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate tasks" });
  }
});

module.exports = router;







