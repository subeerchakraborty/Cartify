const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// connection to mongoDB
const uri = "mongodb+srv://deveshk28:6DsgooiaNWy3Z5iC@clustur.xvadqep.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then( () => console.log("Connected to MongoDB!") )
  .catch( () => console.error.bind(console, "MongoDB connection error:") );

const StudentsSchema = new mongoose.Schema({
    uid : {
        type: Number,
        required: true,
        unique: true,
    },
    sem1: {
        type: Number,
        required: true,
    },
    sem2: {
        type: Number,
        required: true,
    },
    cgpa: {
        type: Number,
        required: true,
    }
});
  
// create Users collection
const StudentsCollection = mongoose.model("Students", StudentsSchema);

// get will retrieve all the students available in students table
app.get("/students", (req, res) => {
  StudentsCollection.find({}, (err, students) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(students);
    }
  });
});

// post will add a new student into table
app.post("/students", (req, res) => {
  const newStudent = new StudentsCollection(req.body);
  newStudent.save((err, student) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(student);
    }
  });
});

// put will update 2 fields of a student
app.put("/students/:uid", (req, res) => {
  const uid = req.params.uid;
  const update = req.body;
  StudentsCollection.findOneAndUpdate({uid: uid}, update, {new: true}, (err, student) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(student);
    }
  });
});

// patch will update 1 field of a student
app.patch("/students/v1/:uid", (req, res) => {
  const uid = req.params.uid;
  const update = req.body;
  StudentsCollection.findOneAndUpdate({uid: uid}, update, {new: true}, (err, student) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(student);
    }
  });
});

// delete will remove a student from the table  
app.delete("/students/d1/:uid", (req, res) => {
  const uid = req.params.uid;
  StudentsCollection.findOneAndDelete({uid: uid}, (err, student) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(student);
    }
  });
});

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

// For errors
app.get("/*", (req, res) => {
    res.send("You got the route error");
});
