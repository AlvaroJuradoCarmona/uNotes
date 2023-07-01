import { Router } from "express";

const router = Router();

import { methods as authCtrl } from "../controllers/auth.controller";
router.post('/signup', authCtrl.signUp)

export default router;
