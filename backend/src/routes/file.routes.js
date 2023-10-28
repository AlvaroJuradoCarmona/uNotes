import { Router } from "express";

const router = Router();

import { methods as fileCtrl } from "../controllers/file.controller";

router.get('/', fileCtrl.getFiles)
router.get('/getReports', fileCtrl.getReports)
router.get("/getFileCountLastWeek", fileCtrl.getFileCountLastWeek)
router.get("/getReportCountLastWeek", fileCtrl.getReportCountLastWeek)
router.get("/getFileCountByCategory", fileCtrl.getFileCountByCategory)
router.get('/weekviews', fileCtrl.getViewsByWeekDay)
router.get('/:id', fileCtrl.getFileById)
router.post('/file', fileCtrl.addFile)
router.post('/code', fileCtrl.addCode)
router.get('/subject/:idSubject', fileCtrl.getFilesBySubjectId)
router.get('/profile/:idUser', fileCtrl.getFilesByUserId)
router.post('/view', fileCtrl.addViewLog)
router.get('/weekviewsbyuser/:idUser', fileCtrl.getViewsByWeekDayByUser)

router.delete('/:idDocument', fileCtrl.deleteFile)
router.post('/report', fileCtrl.addReport)

export default router;
