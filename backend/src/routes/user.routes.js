import { Router } from "express";

import {methods as userCtrl} from "../controllers/user.controller";

const router = Router();

router.get("/users", userCtrl.getUsers);
router.get("/getUserById/:idUser", userCtrl.getUserById);
router.delete('/:idUser', userCtrl.deleteUser)

export default router;