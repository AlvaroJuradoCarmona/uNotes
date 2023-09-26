import { Router } from "express";

const router = Router();

import { methods as achievementCtrl } from "../controllers/achievement.controller";

router.get('/:id', achievementCtrl.getAchievementsByUser)
router.get('/', achievementCtrl.getAchievementsCount)
router.get('/count/:id', achievementCtrl.getAchievementsByUserCount)

export default router;
