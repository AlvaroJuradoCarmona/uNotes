import { Router } from "express";

const router = Router();

import { methods as fileCtrl } from "../controllers/file.controller";

router.get('/', fileCtrl.getFiles)
router.get('/:id', fileCtrl.getFileById)
router.post('/file', fileCtrl.addFile)
router.post('/code', fileCtrl.addCode)
router.get('/subject/:idSubject', fileCtrl.getFilesBySubjectId)

export default router;
