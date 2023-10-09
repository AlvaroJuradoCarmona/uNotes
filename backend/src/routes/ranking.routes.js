import { Router } from "express";

const router = Router();

import { methods as rankingCtrl } from "../controllers/ranking.controller";
router.get('/exp/:id', rankingCtrl.getExperienceRanking)
router.get('/pts/:id', rankingCtrl.getPointsRanking)
router.get('/expsum', rankingCtrl.getExperienceSum)
router.get('/ptssum', rankingCtrl.getPointsSum)

export default router;
