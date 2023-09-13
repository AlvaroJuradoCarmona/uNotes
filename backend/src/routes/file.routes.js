import { Router } from "express";

const router = Router();

import { methods as fileCtrl } from "../controllers/file.controller";

router.get('/', fileCtrl.getFiles)
router.post('/', fileCtrl.addFile)

export default router;
