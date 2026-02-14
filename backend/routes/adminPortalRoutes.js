import express from "express"
import { addCourse, addStudent, addTeacher, allCourses, allStudents, dropStudent, getCourseCount, getStudentData, getStudentStats, teacherCount, verifyAdmission } from "../controller/adminPortal.js"

const adminPortalRoutes = express.Router()


adminPortalRoutes.post("/verifyAdmission", verifyAdmission);

adminPortalRoutes.post("/addStudent" , addStudent);

adminPortalRoutes.get("/getStudentStats", getStudentStats);

adminPortalRoutes.get("/getStudentsData", getStudentData);

adminPortalRoutes.post("/addCourse", addCourse);

adminPortalRoutes.get("/getCourseCount", getCourseCount);

adminPortalRoutes.post("/addTeacher", addTeacher);

adminPortalRoutes.get("/teacherCount", teacherCount);

adminPortalRoutes.get("/allStudents", allStudents);

adminPortalRoutes.delete("/dropStudent/:id", dropStudent);

adminPortalRoutes.get("/allCourses", allCourses);

export default adminPortalRoutes

