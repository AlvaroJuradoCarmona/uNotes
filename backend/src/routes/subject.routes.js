import { Router } from "express";

const router = Router();

import { methods as subjectCtrl } from "../controllers/subject.controller";
router.get('/', subjectCtrl.getSubjects)
router.get('/:id', subjectCtrl.getSubjectById)
router.get('/', subjectCtrl.getSubjectsByFaculty)

export default router;
