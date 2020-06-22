const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

app.get('/api/workouts', (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
      .catch(err => {
        res.json(err);
      });
});

app.post('/api/workouts', (req, res) => {
  db.Workout.create({
    
  })
})

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('App connected to database!')
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});