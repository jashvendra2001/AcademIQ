import express from "express";
import {
  courseSchema,
  editCreatorCourse,
  getCreatorCourses,
  getDatabyId,
} from "../controller/course_Controller.js";
import isAuthenticate from "../middleware/isAuthenticate.js";
import { uploadCourseThambnail } from "../utils/multer.js";

const router = express.Router();
router.route("/courseCreate").post(isAuthenticate, courseSchema);
router.route("/creatorCourse").get(isAuthenticate, getCreatorCourses);
router
  .route("/courseEdit/:id")
  .put(isAuthenticate, uploadCourseThambnail, editCreatorCourse);
router.route("/getCourseById/:id").get(isAuthenticate, getDatabyId);

export default router;
