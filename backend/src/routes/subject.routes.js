import { Router } from "express";

const router = Router();

import { methods as subjectCtrl } from "../controllers/subject.controller";
router.get('/', subjectCtrl.getSubjects)
router.get('/:id', subjectCtrl.getSubjectById)
router.get('/faculty/:idFaculty', subjectCtrl.getSubjectsByFacultyId)
router.get('/search/info', subjectCtrl.getSearchInfo)
router.delete('/:idSubject', subjectCtrl.deleteSubject)

export default router;
