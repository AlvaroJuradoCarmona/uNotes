import { Router } from "express";
import { methods as authCtrl } from "../controllers/auth.controller"

const router = Router();

router.post('/signup', authCtrl.signUp)
router.get('/confirmAccount/:token', authCtrl.confirmAccount)
router.get('/:token', authCtrl.getAccount)

export default router;
