import express from "express"
import { admissionFrom } from "../controller/admissionFrom.js";

const admissionRoutes = express.Router();

admissionRoutes.post("/admissionForm", admissionFrom);

export default admissionRoutes