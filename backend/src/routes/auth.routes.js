import { Router } from "express";
import { methods as authCtrl } from "../controllers/auth.controller"

const router = Router();

router.post('/signup', authCtrl.signUp)

export default router;
