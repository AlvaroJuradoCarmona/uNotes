import { Router } from "express";

const router = Router();

import { methods as categoryCtrl } from "../controllers/category.controller";

router.get('/', categoryCtrl.getCategories)

export default router;
