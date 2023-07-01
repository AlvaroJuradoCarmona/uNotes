import { Router } from "express";

const router = Router();

import { methods as universityCtrl } from "../controllers/university.controller";
router.get('/', universityCtrl.getUniversities)
router.get('/:id', universityCtrl.getUniversityById)

export default router;
