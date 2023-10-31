import { Router } from "express";
import { methods as authCtrl } from "../controllers/auth.controller"

const router = Router();

router.post('/signup', authCtrl.signUp)
router.get('/confirmAccount/:token', authCtrl.confirmAccount)
router.get('/:token', authCtrl.getAccount)
router.post('/signin', authCtrl.signIn)
router.put('/recover-password', authCtrl.recoverPassword)
router.put('/updateAvatar', authCtrl.updateAvatar)
router.put('/updateUsername', authCtrl.updateUsername)
router.put('/updateEmail', authCtrl.updateEmail)
router.put('/updatePassword', authCtrl.updatePassword)
router.put('/updateStudies', authCtrl.updateStudies)

export default router;
