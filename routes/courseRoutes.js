import express  from "express"
import { addLecture, createCourse, getAllCourses, getCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// Get all course without lecture
router.route('/courses').get(getAllCourses);

// create new course - only admin
router.route('/createcourse').post(singleUpload,  createCourse);

//Add lecture, delete course, get course details

router.route('/course/:id').get(getCourseLectures).post(singleUpload, addLecture);


export default router;