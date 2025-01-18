import mongoose from "mongoose";

const createCourse = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    courseLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"], // Ensure 'Intermediate' is included
    },
    coursePrice: {
      type: Number,
    },
    courseThumbnail: {
      type: String,
    },
    enrolledStudent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", createCourse);
