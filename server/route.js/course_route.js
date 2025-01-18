import express from "express";
import {
  courseSchema,
  deleteCourseLecture,
  editCreatorCourse,
  getCourseLecture,
  getCreatorCourses,
  getDatabyId,
  lecture,
  lectureUpadate,
  videoUpload,
} from "../controller/course_Controller.js";
import isAuthenticate from "../middleware/isAuthenticate.js";
import {
  upload,
  uploadCourseThambnail,
  videoUpload12,
} from "../utils/multer.js";

const router = express.Router();
router.route("/courseCreate").post(isAuthenticate, courseSchema);
router.route("/creatorCourse").get(isAuthenticate, getCreatorCourses);
router
  .route("/courseEdit/:id")
  .put(isAuthenticate, uploadCourseThambnail, editCreatorCourse);
router.route("/getCourseById/:id").get(isAuthenticate, getDatabyId);
router.route("/lectureCreate/:id").post(isAuthenticate, lecture);
router.route("/lectureCreate/:id").get(isAuthenticate, getCourseLecture);
router.route("/videoUpload").post(videoUpload12, videoUpload);
router.route("/lectureUpdate/:id").put(isAuthenticate,lectureUpadate)
router.route("/courseDelete/:courseId").delete(isAuthenticate,deleteCourseLecture)
export default router;
