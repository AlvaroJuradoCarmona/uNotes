import { Router } from "express";

const router = Router();

import { methods as facultyCtrl } from "../controllers/faculty.controller";
router.get('/', facultyCtrl.getFaculties)
router.get('/:id', facultyCtrl.getFacultyById)

export default router;
