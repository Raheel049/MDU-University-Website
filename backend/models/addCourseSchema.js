import mongoose from "mongoose";

const addCourseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    courseCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    creditHours: {
      type: Number,
      required: true,
      min: 1,
    },

    department: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
    },

    courseType: {
      type: String,
      enum: ["Core Subject", "Lab", "Elective"],
      default: "theory",
    },

    assignedTeacher: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", addCourseSchema);
export default Course;
