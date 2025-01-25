const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

let uri="mongodb+srv://fa21bscs0095:hashtag1234@cluster0.flo3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const taskSchema = new mongoose.Schema({
  task: String,
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new task
app.post('/tasks', async (req, res) => {
  const { task } = req.body;
  const newTask = new Task({ task });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Server listen
app.listen(5000, () => console.log('Server is running on port 5000'));
