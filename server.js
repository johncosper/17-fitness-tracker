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
    .then(workout => {
      res.json(workout)
    })
      .catch(err => {
        res.json(err);
      });
});

app.post("/api/workouts", (req,res) => {
  db.Workout.create({
    day: new Date().setDate(new Date().getDate())
  })
  .then(newWorkout => {
      res.json(newWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

app.put("/api/workouts/:id", (req,res) => {
  db.Workout.updateOne( {_id: req.params.id }, {$push: {exercises:  [
    {
      "type" : req.body.type,
      "name" : req.body.name,
      "duration" : req.body.duration,
      "distance" : req.body.distance,
      "weight" : req.body.weight,
      "reps" : req.body.reps,
      "sets" : req.body.sets
    }
  ] 
  }}).then(update => {
    res.json(update);
  })
  .catch(err => {
    res.json(err);
  });
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('App connected to database!')
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});