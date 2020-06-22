const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now
        },
        exercises: [
            {
                type: {
                    type: String,
                    required: "Please enter an exercise type"
                },
                name: {
                    type: String,
                    required: "Please enter an exercise name"
                },
                duration: {
                    type: Number,
                    required: "Please enter a duration for this exercise"
                },
                weight: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                }
            }
        ]
    }, {
        toJSON: {
            virtuals: true
        }
    }
);

WorkoutSchema.virtual('totalDuration').get(function() {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});


module.exports = mongoose.model("Workout", workoutSchema);