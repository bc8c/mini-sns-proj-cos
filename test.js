const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/my_first_db")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    studentId: { type: String, required: true },
    age: Number,
    major: String,
    enrolled: Boolean,
    courses: [{ code: String, name: String, grade: String }],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "student" }
);

const Student = mongoose.model("Student", studentSchema);

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
