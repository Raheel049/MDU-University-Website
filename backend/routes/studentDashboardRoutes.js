import express from "express"
import { admissionFrom, examQuestions, submitExam } from "../controller/studentPortal.js";
import { checkAuthMiddleware } from "../controller/middleware.js";

const studentDashboardRoutes = express.Router();

studentDashboardRoutes.use(checkAuthMiddleware)

studentDashboardRoutes.post("/admission-form", admissionFrom);

studentDashboardRoutes.get("/exam-questions", examQuestions);

studentDashboardRoutes.post("/submit-exam", submitExam);

export default studentDashboardRoutes