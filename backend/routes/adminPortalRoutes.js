import express, { Router } from "express"
import { addCourse, addExamQuestions, addStudent, addTeacher, allCourses, allStudents, dropStudent, getCourseCount, getStudentData, getStudentStats, teacherCount, verifyAdmission } from "../controller/adminPortal.js";
import { checkAuthMiddleware } from "../controller/middleware.js";

const adminPortalRoutes = express.Router()



adminPortalRoutes.use(checkAuthMiddleware)

adminPortalRoutes.post("/add-student", addStudent);
adminPortalRoutes.get("/get-student-stats", getStudentStats);
adminPortalRoutes.get("/get-students-data", getStudentData);
adminPortalRoutes.post("/add-course", addCourse);
adminPortalRoutes.get("/get-course-count", getCourseCount);
adminPortalRoutes.post("/add-teacher", addTeacher);
adminPortalRoutes.get("/teacher-count", teacherCount);
adminPortalRoutes.get("/all-students", allStudents);
adminPortalRoutes.delete("/drop-student/:id", dropStudent);
adminPortalRoutes.get("/all-courses", allCourses);
adminPortalRoutes.post("/add-question", addExamQuestions);
adminPortalRoutes.post("/verify-admission",verifyAdmission);


export default adminPortalRoutes;

