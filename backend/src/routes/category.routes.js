import { Router } from "express";

const router = Router();

import { methods as categoryCtrl } from "../controllers/category.controller";

router.get('/category', categoryCtrl.getCategories)
router.get('/language', categoryCtrl.getLanguages)
router.get('/:id', categoryCtrl.getLanguageByCategoryId)

export default router;
