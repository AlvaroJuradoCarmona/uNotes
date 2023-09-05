import { Router } from "express";
import {methods as userController} from "../controllers/user.controller";

const router = Router();

router.get("/getUserById/:idUser", userController.getUserById);

export default router;